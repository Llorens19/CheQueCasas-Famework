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

	public function select_verify_email($db, $token_email){

		$sql = "SELECT token_email FROM user WHERE token_email = '$token_email'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	} 

	public function update_verify_email($db, $token_email){

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


	function insert_user($db, $username, $email, $name, $surname, $tlf, $active, $token_email, $avatar, $hashed_pass )
	{
		if ($tlf == "") {
			$tlf = 'NULL';
		}

		if ($surname == "") {
			$surname = NULL;
		}

		$sql = "INSERT INTO `user`(`name`,`surname`,`tlf`,`username`, `password`, `email`, `type_user`, `avatar`, `active`, `token_email`) 
		VALUES ('$name','$surname',$tlf,'$username','$hashed_pass','$email','client','$avatar', '$active', '$token_email')";
		error_log($sql);
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
		error_log("/*/**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*");
		error_log($sql);
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


	public function select_recover_password($db, $email){
		$sql = "SELECT email FROM user WHERE email = '$email' AND password NOT LIKE ('')";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function update_recover_password($db, $email, $token_email){
		$sql = "UPDATE user SET token_email= '$token_email', active = 0 WHERE `email` = '$email'";
		
		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	public function update_new_passwoord($db, $token_email, $password){
		$sql = "UPDATE user SET password= '$password', token_email= '', active = '1' WHERE token_email = '$token_email'";

		error_log($sql);
		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	public function update_phone( $db, $username, $tlf){
		$sql = "UPDATE user SET tlf = '$tlf' WHERE username = '$username'";
		
		$stmt = $db->ejecutar($sql);
		return "ok";
	}

	function save_otp($db, $tlf, $code, $username)
	{
		$sql = "UPDATE user set code_OTP= '$code' where tlf = '$tlf' and username = '$username'";
		error_log($sql);
		$stmt = $db->ejecutar($sql);
		return "ok";

	}

	function get_OTP($db, $tlf, $username)
	{
		$sql = "SELECT code_OTP FROM user WHERE tlf = '$tlf' and username = '$username'";
		
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

}
