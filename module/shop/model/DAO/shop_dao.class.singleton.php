<?php
class shop_dao
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

	public static function select_all_buildings($db)
	{
		$sql = "SELECT *
		FROM building b, type t, operations o, city c
		WHERE b.id_type = t.id_type 
		AND b.id_operations = o.id_operations 
		AND b.id_city = c.id_city ";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public static function select_all_images($db)
	{
		$sql = "SELECT *
		FROM image";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public static function select_building($db, $id)
	{
		$sql = "SELECT *
		FROM building b, type t, operations o, city c
		WHERE b.id_type = t.id_type 
		AND b.id_operations = o.id_operations 
		AND b.id_city = c.id_city 
		AND b.id_building = '$id' ";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public static function select_images($db, $id)
	{
		$sql = "SELECT *
		FROM image
		WHERE id_building = '$id'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}



	public static function select_buildings($db, $filters, $total_prod, $items_page)
	{

		$sql = "SELECT * FROM building";

		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			$sql .= ", $column[0]";
		}

		$sql .= " WHERE building.id_building = building.id_building";


		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			if ($column[0] !== "price" && $column[0] !== "order" && $column[0] !== "in_poligon") {
				$sql .= " AND building.id_" . $column[0] . " LIKE " . $column[0] .  ".id_" . $column[0];
			}
		}




		foreach ($filters as $column) {
			if ($column[0] === "price") {
				$sql .= " AND building.price  BETWEEN " . $column[1][0] .  " AND " . $column[1][1];
				continue;
			}

			if ($column[0] === "in_poligon") {

				if (!empty($column[1])) {

					$sql .= " AND (building.id_building = '0' ";

					foreach ($column[1] as $value) {
						$sql .= " OR building.id_building = '" . $value . "'";
					}

					$sql .= ")";
				}


				continue;
			}

			if (isset($column[2]) && $column[2] == '1' || $column[2] == "3") {
				if ($column[1] !== "%" && $column[0] !== "price") {
					$sql .= " AND  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $column[1] . "'";
				}
			}

			if (isset($column[2]) && $column[2] == '2') {
				$sql .= " AND  (" . $column[0] . ".id_" . $column[0] . " LIKE '0'";
				foreach ($column[1] as $value) {
					$sql .= " OR  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $value . "'";
				}
				$sql .= ")";
			}

			if ($column[0] === "order") {
				$order = " ";

				if ($column[1] === "1") {
					$order = " ORDER BY building.m2 ASC";
				} elseif ($column[1] === "2") {
					$order = " ORDER BY building.m2 DESC";
				} elseif ($column[1] === "3") {
					$order = " ORDER BY building.price ASC";
				} elseif ($column[1] === "4") {
					$order = " ORDER BY building.price DESC";
				} else {
					$order = " ";
				}
			}
		}
		if (isset($order)) {
			$sql .= $order;
		}


		$sql .= " LIMIT $total_prod, $items_page";


		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	public static function filters_shop_refill($db, $filters, $items_page)
	{

		$sql = "SELECT *
        FROM building
        WHERE id_building NOT IN (SELECT id_building FROM building";

		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			$sql .= ", $column[0]";
		}

		$sql .= " WHERE building.id_building = building.id_building";


		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			if ($column[0] !== "price" && $column[0] !== "order" && $column[0] !== "in_poligon") {
				$sql .= " AND building.id_" . $column[0] . " LIKE " . $column[0] .  ".id_" . $column[0];
			}
		}




		foreach ($filters as $column) {
			if ($column[0] === "price") {
				$sql .= " AND building.price  BETWEEN " . $column[1][0] .  " AND " . $column[1][1];
				continue;
			}

			if ($column[0] === "in_poligon") {

				if (!empty($column[1])) {

					$sql .= " AND (building.id_building = '0' ";

					foreach ($column[1] as $value) {
						$sql .= " OR building.id_building = '" . $value . "'";
					}

					$sql .= ")";
				}


				continue;
			}

			if (isset($column[2]) && $column[2] == '1' || $column[2] == "3") {
				if ($column[1] !== "%" && $column[0] !== "price") {
					$sql .= " AND  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $column[1] . "'";
				}
			}

			if (isset($column[2]) && $column[2] == '2') {
				$sql .= " AND  (" . $column[0] . ".id_" . $column[0] . " LIKE '0'";
				foreach ($column[1] as $value) {
					$sql .= " OR  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $value . "'";
				}
				$sql .= ")";
			}

			if ($column[0] === "order") {
				$order = " ";

				if ($column[1] === "1") {
					$order = " ORDER BY building.m2 ASC";
				} elseif ($column[1] === "2") {
					$order = " ORDER BY building.m2 DESC";
				} elseif ($column[1] === "3") {
					$order = " ORDER BY building.price ASC";
				} elseif ($column[1] === "4") {
					$order = " ORDER BY building.price DESC";
				} else {
					$order = " ";
				}
			}
		}



		$sql .= " )";
		if (isset($order)) {
			$sql .= $order;
		}


		$sql .= " LIMIT $items_page ";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}

	public static function count_click_details($db, $id)
	{
		$sql = "UPDATE building 
        SET building.views = building.views + 1 WHERE building.id_building = '$id'";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}



	public static function likes_user($db, $username)
	{
		$sql = "SELECT l.id_building FROM likes l WHERE l.username like '$username' ";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}



	public static function table_likes($db)
	{
		$sql = "SELECT * FROM likes ";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	public static function action_like($db, $username, $id_building)
	{
		$sql = "SELECT like_user_function('$username',  $id_building) AS message;";

		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	public static function total_prod($db, $filters)
	{
		$sql = "SELECT COUNT(*) as total FROM building";

		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			$sql .= ", $column[0]";
		}

		$sql .= " WHERE building.id_building = building.id_building";


		foreach ($filters as $column) {
			if ($column[0] === "price" || $column[0] === "order" || $column[0] === "in_poligon") {
				continue;
			}
			if ($column[0] !== "price" && $column[0] !== "order" && $column[0] !== "in_poligon") {
				$sql .= " AND building.id_" . $column[0] . " LIKE " . $column[0] .  ".id_" . $column[0];
			}
		}




		foreach ($filters as $column) {
			if ($column[0] === "price") {
				$sql .= " AND building.price  BETWEEN " . $column[1][0] .  " AND " . $column[1][1];
				continue;
			}

			if ($column[0] === "in_poligon") {

				if (!empty($column[1])) {

					$sql .= " AND (building.id_building = '0' ";

					foreach ($column[1] as $value) {
						$sql .= " OR building.id_building = '" . $value . "'";
					}

					$sql .= ")";
				}


				continue;
			}

			if (isset($column[2]) && $column[2] == '1' || $column[2] == "3") {
				if ($column[1] !== "%" && $column[0] !== "price") {
					$sql .= " AND  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $column[1] . "'";
				}
			}

			if (isset($column[2]) && $column[2] == '2') {
				$sql .= " AND  (" . $column[0] . ".id_" . $column[0] . " LIKE '0'";
				foreach ($column[1] as $value) {
					$sql .= " OR  " . $column[0] . ".id_" . $column[0] . " LIKE '" . $value . "'";
				}
				$sql .= ")";
			}
		}


		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}


	public static function select_tabla_content($db, $n_filter)
	{
		$sql = "SELECT *
		FROM $n_filter ";


		$stmt = $db->ejecutar($sql);
		return $db->listar($stmt);
	}
}
