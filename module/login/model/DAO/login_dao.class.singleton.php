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

	function insert_user($db, $username, $email, $password, $name, $surname, $tlf)
	{

		if ($tlf == "") {
			$tlf = 'NULL';
		}

		if ($surname == "") {
			$surname = NULL;
		}


		$hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
		$hashavatar = md5(strtolower(trim($email)));
		$avatar = "https://i.pravatar.cc/500?u=$hashavatar";
		$sql = "   INSERT INTO `user`(`name`,`surname`,`tlf`,`username`, `password`, `email`, `type_user`, `avatar`) 
		VALUES ('$name','$surname',$tlf,'$username','$hashed_pass','$email','client','$avatar')";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function select_user($db, $username)
	{
		$sql = "SELECT * FROM user WHERE username='$username'";

		error_log($sql);

		$stmt = $db->ejecutar($sql);
		$res = $db->listar($stmt);

		if ($res) {
			error_log("mmmmmmmmmmmmmmmmmmmmmmmm");
			
			return $res; // Return the object directly
		} else {
			error_log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
			return "error_user";
		}
	}


	function select_data_user($db, $username)
	{
		$sql = "SELECT * FROM user WHERE username='$username'";


		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}
}
