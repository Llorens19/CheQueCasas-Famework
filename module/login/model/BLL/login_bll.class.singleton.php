<?php
class login_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = login_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_verify_email_BLL($args)
	{
		if ($this->dao->select_verify_email($this->db, $args)) {
			$this->dao->update_verify_email($this->db, $args);
			return 'verify';
		} else {
			return 'fail';
		}
	}



	public function get_register_BLL($args)
	{
		try {

			$check = $this->dao->select_email($this->db, $args[0][0]);
		} catch (Exception $e) {

			return "error";
		}

		if ($check) { // Si es true es por que existe el email
			$check_email = false;
		} else {
			$check_email = true; // Si devuelve false es por que no existe el email, por lo que igualamos a true para que continue
		}

		try {
			$check_2 = $this->dao->select_username($this->db, $args[1][0]);
		} catch (Exception $e) {
			return "error_username";
		}

		if ($check_2) { // Si devuelve true es por que existe el email
			$check_username = false;
		} else {
			$check_username = true; // Si devuelve false es por que no existe el email, por lo que igualamos a true para que continue
		}
		// Si no existe el email creará el usuario
		if ($check_email && $check_username) {
			try {
				$token_email = common::generate_Token_secure(20);

				$hashed_pass = password_hash($args[2][2], PASSWORD_DEFAULT, ['cost' => 12]);
				$hashavatar = md5(strtolower(trim($args[2][1])));
				$avatar = "https://i.pravatar.cc/500?u=$hashavatar";

				$rdo = $this->dao->insert_user($this->db, $args[2][0], $args[2][1], $args[2][3], $args[2][4], $args[2][5], 0, $token_email, $avatar, $hashed_pass);

				$message = [
					'type' => 'validate',
					'token' => $token_email,
					'email' =>  $args[2][1]
				];

				$email = json_decode(mail::send_email($message), true); //Enviamos el email de verificación
				if (!empty($email)) {
					return "ok";
				}
			} catch (Exception $e) {
				return "error";
			}
			if (!$rdo) {
				return "error_register";
			} else {
				return "ok";
			}
		}

		if (!$check_email && $check_username) {

			return "error_email";
		}
		if ($check_email && !$check_username) {

			return "error_username";
		}
		if (!$check_email && !$check_username) {

			return "error_email_username";
		}
	}

	public function get_login_BLL($args)
	{

		try {
			$rdo = $this->dao->select_user_login($this->db, $args[0][0]);
			if ($rdo == "error_user") {
				return "error_user";
			} else {
				if (password_verify($args[1][0], $rdo[0]['password']) && $rdo[0]['active'] == 1) { //Si la contraseña es correcta creamos el token

					$tokens = [];
					$tokens[0] = create_access_token($rdo[0]["username"]);
					$tokens[1] = create_refresh_token($rdo[0]["username"]);
					$_SESSION['username'] = $rdo[0]['username']; //Guardamos el usario 
					$_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
					session_regenerate_id(); //Regeneramos la sesión
					return $tokens;
				} else if (password_verify($args[1][0], $rdo[0]['password']) && $rdo[0]['active'] == 0) {

					return "error_active";
				} else {
					return "error_passwd";
				}
			}
		} catch (Exception $e) {
			return "error";
		}
	}

	public function get_logout_BLL($args)
	{

		// unset($args[0]);
		// unset($args[1]);
		// session_destroy();

		return 'Done';
	}

	public function get_data_user_BLL($args)
	{

		$json = decode_access_token($args);

		$rdo = $this->dao->select_data_user($this->db, $json['username']);
		return $rdo;
	}
	public function get_actividad_BLL($args)
	{

		if (!isset($args)) {
			return "inactivo";
		} else {
			if ((time() - $args) >= 180) { //1800s=30min //
				return "inactivo";
			} else {
				return "activo";
			}
		}
	}
	public function get_controluser_BLL($args)
	{

		$access_token_dec = decode_access_token($args[0][0]);
		$refresh_token_dec = decode_refresh_token($args[0][1]);

		if (
			isset($args[1][0]) && ($args[1][0]) == $access_token_dec['username']
			&& ($args[1][0]) == $refresh_token_dec['username']
		) {



			if ($access_token_dec['exp'] < time() && $refresh_token_dec['exp'] > time()) { //comprobamos si el tiempo desesíon del tokes es menor que el tiempo de expiración

				$new_access_token = create_access_token($refresh_token_dec['username']);
				return $new_access_token;
			}

			if ($refresh_token_dec['exp'] < time()) { //comprobamos si el tiempo desesíon del tokes es menor que el tiempo de expiración
				return "Refresh_caducado";
			}

			if ($access_token_dec['exp'] > time() && $refresh_token_dec['exp'] > time()) { //comprobamos si el tiempo desesíon del tokes es menor que el tiempo de expiración

				return "Correct_User";
			}
			exit();
		} else {
			return "Wrong_User";
		}
	}


	public function get_recover_email_BBL($args)
	{
		$user = $this->dao->select_recover_password($this->db, $args);
		$token_email = common::generate_Token_secure(20);

		if (!empty($user)) {
			$this->dao->update_recover_password($this->db, $args, $token_email);
			$message = [
				'type' => 'recover',
				'token' => $token_email,
				'email' =>  $args
			];

			$email = json_decode(mail::send_email($message), true);
			if (!empty($email)) {
				return;
			}
		} else {
			return 'error';
		}
	}

	public function get_refresh_cookie_BLL()
	{
		session_regenerate_id();
		return "Done";
	}
}
