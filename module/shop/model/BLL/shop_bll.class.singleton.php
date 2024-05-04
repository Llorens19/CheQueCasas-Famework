<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_buildings_BLL($args) {





			try {
				$filters_shop =  $this -> dao -> select_buildings($this -> db, $args[0], $args[1], $args[2]);
			} catch (Exception $e) {
				return "error";
			}
			try {
				$data_img = $this -> dao -> select_all_images($this -> db);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($filters_shop || $data_img)) {
				$rdo = array();
				$rdo[0] = $filters_shop;
				$rdo[1] = $data_img;
	
				return $rdo;
			} else {
				return "error";
			}

		}

		public function get_details_BLL($args) {

			try {
				$data_building = $this -> dao -> select_building($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			try {
				$data_img = $this -> dao -> select_images($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($data_building || $data_img)) {
				$rdo = array();
				$rdo[0] = $data_building;
				$rdo[1] = $data_img;
	
				return $rdo;
			} else {
				return"error";
			}
		}

		public function get_filters_shop_refill_BLL($args) {

			try {
				$filters_shop =  $this -> dao -> filters_shop_refill($this -> db, $args[0], $args[1]);
			} catch (Exception $e) {
				return "error";
			}
			try {
				$data_img = $this -> dao -> select_all_images($this -> db);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($filters_shop || $data_img)) {
				$rdo = array();
				$rdo[0] = $filters_shop;
				$rdo[1] = $data_img;
	
				return $rdo;
			} else {
				return "error";
			}
		}

		public function get_filters_table_BLL() {
			
			try {
				$data_filters_table = $this -> dao -> select_tabla_content($this -> db, 'filters_table');
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($data_filters_table)) {
				$count = 0;
				$rdo = array();
				$rdo[0] = $data_filters_table;
				foreach ($data_filters_table as $column) {
					$count++;
					$rdo[$count] = $this -> dao -> select_tabla_content($this -> db, $column['n_table']);
				}
				return $rdo;
			} else {
				return "error" ;
			}

		}

		public function get_count_click_details_BLL($args) {
			try {
				$rdo = $this -> dao -> count_click_details($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			return $rdo;

		}

		public function get_total_prod_BLL($args) {

			try {
				$rdo = $this -> dao -> total_prod($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			return $rdo;

		}


		public function get_likes_user_BLL($args) {
			try {
				$rdo = $this -> dao -> likes_user($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			return $rdo;

		}


		public function get_table_likes_BLL() {

			try {
				$rdo = $this -> dao -> table_likes($this -> db);
			} catch (Exception $e) {
				return "error";
			}
			return $rdo;


	}


	public function get_action_like_BLL($args) {

		try {
            $rdo = $this -> dao -> action_like($this -> db, $args[0], $args[1]);
        } catch (Exception $e) {
            return "error";
        }
        return $rdo ;


}
}
