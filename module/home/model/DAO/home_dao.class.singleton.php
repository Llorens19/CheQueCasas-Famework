<?php

class home_dao
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

	public function select_operations($db)
	{
		$sql = "SELECT * FROM `operations` ORDER BY id_operations ASC";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function select_city($db)
	{
		$sql = "SELECT * FROM `city` ORDER BY id_city ASC";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function select_most_viewed($db)
	{
		$sql = "SELECT *
		FROM building b, type t, operations o, city c
		WHERE b.id_type = t.id_type 
		AND b.id_operations = o.id_operations 
		AND b.id_city = c.id_city 
        order by b.views desc limit 5";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public function select_lasts_views($array, $db)
	{

		$sql = "SELECT *
                    FROM building b, type t, operations o, city c
                    WHERE b.id_type = t.id_type
                    AND b.id_operations = o.id_operations
                    AND b.id_city = c.id_city ";

		if (!empty($array)) {
			$ids = implode(',', $array);
			$sql .= " AND b.id_building IN ($ids)";
		}

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	

	function select_images($db)
	{
		$sql = "SELECT *
		FROM image";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	
}
