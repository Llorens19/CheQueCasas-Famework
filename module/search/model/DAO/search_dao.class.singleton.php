<?php

class search_dao
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

	public function search($db, $table, $array_filters)
	{
		
        $sql = "SELECT DISTINCT ";

        if ($table == "type") {
            $sql .= "t.* ";
        } else if ($table == "operations") {
            $sql .= "o.* ";
        } else if ($table == "complete") {
            $sql .= "c.* ";
        }else {
            $sql .= "b.* ";
        }

        $sql .= "FROM building as b, type as t, operations as o, city as c WHERE b.id_type = t.id_type AND b.id_operations = o.id_operations AND b.id_city = c.id_city";

        if (isset($array_filters[0][0]) && $array_filters[0][0] != null) {
            $sql .= " AND b.id_type LIKE '".$array_filters[0][1] ."'";
        } else {
            $sql .= " AND b.id_type LIKE '%'";
        }

        if (isset($array_filters[1][0]) && $array_filters[1][0] != null) {
            $sql .= " AND b.id_operations LIKE '".$array_filters[1][1] ."'";
        } else {
            $sql .= " AND b.id_operations LIKE '%'";
        }

        if (isset($array_filters[2][0]) && $array_filters[2][0] != null) {
            $sql .= " AND c.n_city LIKE '%".$array_filters[2][1] ."%'";
        } else {
            $sql .= " AND c.n_city LIKE '%'";
        }

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	

	
}
