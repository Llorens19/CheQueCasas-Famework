<?php

class login_dao
{
	static $_instance;
	private function __construct()
	{
	}
	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function select_verify_email($db, $token_email)
	{

		$sql = "SELECT email FROM user WHERE token_email = '$token_email'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function update_verify_email($db, $token_email)
	{

		$sql = "UPDATE user SET active = 1, token_email= '' WHERE token_email = '$token_email'";
		

		$stmt = $db->ejecutar($sql);
		return "update";
	}


	function select_email($db, $email)
	{
		$sql = "SELECT email FROM user WHERE email='$email'";
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function select_username($db, $username)
	{
		$sql = "SELECT username FROM user WHERE username='$username'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	function insert_user($db, $username, $email, $name, $surname, $tlf, $active, $token_email, $avatar, $hashed_pass)
	{
		if ($tlf == "") {
			$tlf = 'NULL';
		}

		if ($surname == "") {
			$surname = NULL;
		}

		$sql = "INSERT INTO `user`(`name`,`surname`,`tlf`,`username`, `password`, `email`, `type_user`, `avatar`, `active`, `token_email`) 
		VALUES ('$name','$surname',$tlf,'$username','$hashed_pass','$email','client','$avatar', '$active', '$token_email')";
		
		return $stmt = $db->ejecutar($sql);
	}
	function select_user($db, $username)
	{
		$sql = "SELECT * FROM user WHERE username='$username'";

		$stmt = $db->ejecutar($sql);
		$res = $db->listar($stmt);

		if ($res) {
			return $res;
		} else {
			return "error_user";
		}
	}

	function select_user_login($db, $username)
	{
		$sql = "SELECT * FROM user WHERE username='$username'";
		
		$stmt = $db->ejecutar($sql);
		$res = $db->listar($stmt);

		if ($res) {
			return $res;
		} else {
			return "error_user";
		}
	}


	function select_data_user($db, $username)
	{
		$sql = "SELECT * FROM user WHERE username='$username'";


		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	public function select_recover_password($db, $email)
	{
		$sql = "SELECT email FROM user WHERE email = '$email' AND password NOT LIKE ('')";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function update_recover_password($db, $email, $token_email)
	{
		$sql = "UPDATE user SET token_email= '$token_email', active = 0 WHERE `email` = '$email'";

		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	public function update_new_passwoord($db, $token_email, $password)
	{
		$sql = "UPDATE user SET password= '$password', token_email= '', active = '1' WHERE token_email = '$token_email'";

		
		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	public function update_phone($db, $username, $tlf)
	{
		$sql = "UPDATE user SET tlf = '$tlf' WHERE username = '$username'";

		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	function save_otp($db, $tlf, $code, $username)
	{
		$sql = "UPDATE user 
		SET code_OTP = '$code', expire_OTP = NOW() + INTERVAL 1 MINUTE WHERE tlf = '$tlf' AND username = '$username'";
		
		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	function get_OTP($db, $tlf, $username)
	{
		$sql = "SELECT code_OTP FROM user WHERE tlf = '$tlf' and username = '$username' and expire_OTP > NOW()";

	

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function active_2fa($db, $username)
	{
		$sql = "UPDATE user SET 2fa_active = 1 WHERE username = '$username'";

		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	function update_trys($db, $username)
	{

		$sql = "UPDATE user SET login_trys = login_trys + 1 WHERE username = '$username'";

		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	function get_trys($db, $username)
	{

		$sql = "SELECT login_trys, tlf FROM user WHERE username = '$username'";
		
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function reset_trys($db, $username)
	{

		$sql = "UPDATE user SET login_trys = 0 WHERE username = '$username'";

		error_log($sql);

		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	public function select_user_google($db, $username, $email){

		$sql = "SELECT * FROM user_google WHERE username = '$username' OR email = '$email'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function insert_user_google($db, $id, $username, $email, $avatar)
	{
		$sql ="INSERT INTO user_google (id_user, username, email, type_user, avatar, active)     
		VALUES ('$id', '$username', '$email', 'client', '$avatar', 1)";

	return $stmt = $db->ejecutar($sql);

	}

	public function select_user_github($db, $username, $email){

		$sql = "SELECT * FROM user_github WHERE username = '$username' OR email = '$email'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function insert_user_github($db, $id, $username, $email, $avatar)
	{
		$sql ="INSERT INTO user_github (id_user, username, email, type_user, avatar, active)     
		VALUES ('$id', '$username', '$email', 'client', '$avatar', 1)";

	return $stmt = $db->ejecutar($sql);

	}

	function update_user_photo($db, $username, $avatar, $type_user)
	{

		if($type_user == 'normal' and isset($type_user)){

			$sql = "UPDATE user SET avatar = '$avatar' WHERE username = '$username'";
		}else if($type_user == 'google' and isset($type_user)){

			$sql = "UPDATE user_google SET avatar = '$avatar' WHERE username = '$username'";
		}else if($type_user == 'github' and isset($type_user)){

			$sql = "UPDATE user_github SET avatar = '$avatar' WHERE username = '$username'";
		}


			$stmt = $db->ejecutar($sql);
			return "ok";

	}

	function update_user_profile($db, $name, $surname, $tlf, $username, $type_user)
	{
		if($type_user == 'normal' and isset($type_user)){

			$sql = "UPDATE user SET name = '$name', surname = '$surname', tlf = '$tlf' WHERE username = '$username'";
		}else if($type_user == 'google' and isset($type_user)){
			
			$sql = "UPDATE user_google SET name = '$name', surname = '$surname', tlf = '$tlf' WHERE username = '$username'";
		}else if($type_user == 'github' and isset($type_user)){
			
			$sql = "UPDATE user_github SET name = '$name', surname = '$surname', tlf = '$tlf' WHERE username = '$username'";
		}

		$stmt = $db->ejecutar($sql);
		return "ok";

	}

	function select_likes_user($db, $username, $type_user)
	{
		if($type_user == 'normal' and isset($type_user)){

			$sql = "SELECT DISTINCT * FROM building 
			inner join city on building.id_city = city.id_city 
			inner join likes on building.id_building = likes.id_building
			inner join product on building.id_building = product.id_building 
			WHERE building.id_building IN (SELECT id_building 
										   FROM likes 
										   WHERE id_user = (SELECT id_user 
										   					FROM user 
															WHERE username = '$username'))
			AND likes.id_user = (SELECT id_user 
									FROM user 
									WHERE username = '$username')";
			

		}else if($type_user == 'google' and isset($type_user)){

			$sql = "SELECT DISTINCT * FROM building 
			inner join city on building.id_city = city.id_city 
			inner join likes on building.id_building = likes.id_building
			inner join product on building.id_building = product.id_building 
			WHERE building.id_building IN (SELECT id_building 
										   FROM likes 
										   WHERE id_user = (SELECT id_user 
										   					FROM user_google
															WHERE username = '$username'))
			AND likes.id_user = (SELECT id_user
									FROM user_google
									WHERE username = '$username')";
			
			
		}else if($type_user == 'github' and isset($type_user)){
			
			$sql = "SELECT DISTINCT  * FROM building 
			inner join city on building.id_city = city.id_city 
			inner join likes on building.id_building = likes.id_building
			inner join product on building.id_building = product.id_building 
			WHERE building.id_building IN (SELECT id_building 
										   FROM likes 
										   WHERE id_user = (SELECT id_user 
										   					FROM user_github 
															WHERE username = '$username'))
			AND likes.id_user = (SELECT id_user
									FROM user_github
									WHERE username = '$username')";
		}

		error_log($sql);

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function select_img ($db){

		$sql = "SELECT * FROM image";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function delete_like($db, $id_like)
	{
		$sql = "DELETE FROM likes WHERE id_like = '$id_like'";

		error_log($sql);
		$stmt = $db->ejecutar($sql);
		return "ok";
	}
	

}
