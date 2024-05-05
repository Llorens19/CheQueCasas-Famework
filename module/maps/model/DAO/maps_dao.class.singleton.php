<?php

class maps_dao
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

	public function total_points($db)
	{
		$sql = "SELECT b.id_building, b.latitude, b.longitude
		FROM building b";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);

	}
}
