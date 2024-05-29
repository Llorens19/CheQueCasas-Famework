<?php

class cart_dao
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

	public function select_type($db)
	{
		$sql = "SELECT * FROM `type` ORDER BY id_type ASC";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function get_cart_user($db, $username, $type_user)
	{
		if ($type_user == 'normal' and isset($type_user)) {

			$sql = "SELECT * FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user WHERE username = '$username') and p.id_product = c.id_product";
		} 
		else if ($type_user == 'google' and isset($type_user)) {
			$sql = "SELECT * FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_google WHERE username = '$username') and p.id_product = c.id_product";
		}
		else if ($type_user == 'github' and isset($type_user)) {
			$sql = "SELECT * FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_github WHERE username = '$username') and p.id_product = c.id_product";
		}

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function delete_line_cart($db, $id_line)
	{
		$sql = "DELETE FROM cart WHERE id_line = '$id_line'";
		$stmt = $db->ejecutar($sql);
		return $stmt;
	}

	public function selected_line_cart($db, $id_line, $state)
	{
	$sql = "UPDATE cart SET selected = '$state' WHERE id_line = '$id_line'";
	error_log($sql);
		return $db->ejecutar($sql);
	}

	public function increment($db, $id_line)
	{
		$sql = "UPDATE cart SET total_quantity = total_quantity + 1 WHERE id_line = '$id_line'";
		return $db->ejecutar($sql);
	}
	
	public function decrement($db, $id_line)
	{
		$sql = "UPDATE cart SET total_quantity = total_quantity - 1 WHERE id_line = '$id_line'";
		return $db->ejecutar($sql);
	}

	

	
}
