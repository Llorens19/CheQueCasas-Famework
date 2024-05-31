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
		} else if ($type_user == 'google' and isset($type_user)) {
			$sql = "SELECT * FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_google WHERE username = '$username') and p.id_product = c.id_product";
		} else if ($type_user == 'github' and isset($type_user)) {
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

	public function total_money($db, $username, $type_user)
	{

		if ($type_user == 'normal' and isset($type_user)) {

			$sql = "SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1'";
		} else if ($type_user == 'google' and isset($type_user)) {

			$sql = "SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_google  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1'";
		} else if ($type_user == 'github' and isset($type_user)) {

			$sql = "SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_github  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1'";
		}
	

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function buy($db, $username, $name, $surname, $email, $adress, $adress2, $type_user)
	{


		if ($type_user == 'normal' and isset($type_user)) {


			$sql = "SELECT insert_user_order_by_username(
			'$username', 
			'$name', 
			'$surname', 
			'$email', 
			'$adress', 
			'$adress2',
			NOW(), 
			(SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1')
		) AS message;";
		} else if ($type_user == 'google' and isset($type_user)) {


			$sql = "SELECT insert_user_order_by_username_google(
			'$username', 
			'$name', 
			'$surname', 
			'$email', 
			'$adress', 
			'$adress2',
			NOW(), 
			(SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_google  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1')
		) AS message;";
		} else if ($type_user == 'github' and isset($type_user)) {


			$sql = "SELECT insert_user_order_by_username_github(
			'$username', 
			'$name', 
			'$surname', 
			'$email', 
			'$adress', 
			'$adress2',
			NOW(), 
			(SELECT SUM(p.price_product * c.total_quantity) as total FROM cart c, product p WHERE c.id_user = (SELECT id_user FROM user_github  WHERE username = '$username') and p.id_product = c.id_product and c.selected = '1')
		) AS message;";
		}

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	function save_lines($db, $id, $username, $type_user)
	{


		if ($type_user == 'normal' and isset($type_user)) {
			
			$sql = "SELECT transfer_to_order('$id', (SELECT id_user FROM user WHERE username = '$username')) AS message";
			
		} else if ($type_user == 'google' and isset($type_user)) {
			$sql = "SELECT transfer_to_order('$id', (SELECT id_user FROM user_google WHERE username = '$username')) AS message";
		} else if ($type_user == 'github' and isset($type_user)) {
			$sql = "SELECT transfer_to_order('$id', (SELECT id_user FROM user_github WHERE username = '$username')) AS message";
		}

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function update_stock($db, $username, $type_user)
	{

		if ($type_user == 'normal' and isset($type_user)) {
			$sql = "UPDATE product p SET p.stock = p.stock - (SELECT c.total_quantity FROM cart c WHERE c.id_product = p.id_product AND c.selected = '1' AND c.id_user = (SELECT id_user FROM user WHERE username = '$username')) WHERE p.id_product = (SELECT c.id_product FROM cart c WHERE c.id_product = p.id_product AND c.selected = '1' AND c.id_user = (SELECT id_user FROM user WHERE username = '$username'));";
		
			
		} else if ($type_user == 'google' and isset($type_user)) {

			$sql = "UPDATE product p SET p.stock = p.stock - (SELECT c.total_quantity FROM cart c WHERE c.id_product = p.id_product AND c.selected = '1' AND c.id_user = (SELECT id_user FROM user_google WHERE username = '$username'));";
		
		} else if ($type_user == 'github' and isset($type_user)) {

			$sql = "UPDATE product p SET p.stock = p.stock - (SELECT c.total_quantity FROM cart c WHERE c.id_product = p.id_product AND c.selected = '1' AND c.id_user = (SELECT id_user FROM user_github WHERE username = '$username'));";
		
		}


		return $db->ejecutar($sql);
	}

	function delete_cart($db, $username, $type_user)
	{
		if ($type_user == 'normal' and isset($type_user)) {

			$sql = "DELETE FROM cart WHERE id_user = (SELECT id_user FROM user WHERE username = '$username') and selected = '1'";
			
		} else if ($type_user == 'google' and isset($type_user)) {

			$sql = "DELETE FROM cart WHERE id_user = (SELECT id_user FROM user_google WHERE username = '$username') and selected = '1'";

		} else if ($type_user == 'github' and isset($type_user)) {

			$sql = "DELETE FROM cart WHERE id_user = (SELECT id_user FROM user_github WHERE username = '$username')and selected = '1'";

		}

		return $db->ejecutar($sql);
	}

	function select_order($db, $id)
	{
		$sql = "SELECT * FROM `order` o, product p WHERE id_order = '$id' and o.id_product = p.id_product";
		
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function select_user_order($db, $id)
	{
		$sql = "SELECT * FROM user_order WHERE id_order = '$id'";
	
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	function save_pdf_url($db, $id, $url)
	{
		$sql = "UPDATE user_order SET url_pdf = '$url' WHERE id_order = '$id'";
		return $db->ejecutar($sql);
	}


	function factura_user($db, $username, $type_user){

		if($type_user == 'normal' and isset($type_user)){
			$sql = "SELECT * FROM user_order WHERE id_user = (SELECT id_user FROM user WHERE username = '$username')";

		}else if($type_user == 'google' and isset($type_user)){

			$sql = "SELECT * FROM user_order WHERE id_user = (SELECT id_user FROM user_google WHERE username = '$username')";

		}else if($type_user == 'github' and isset($type_user)){

			$sql = "SELECT * FROM user_order WHERE id_user = (SELECT id_user FROM user_github WHERE username = '$username')";
		}
		error_log($sql);
		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);

	}
}
