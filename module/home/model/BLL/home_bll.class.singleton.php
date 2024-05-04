<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_type_BLL() {
			try {
				$select_type = $this -> dao -> select_type($this -> db);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($select_type)) {
				return $select_type;

			} else {
				return "error";
			}
		}

		public function get_operations_BLL() {

			try {
				$select_type = $this -> dao -> select_operations($this -> db);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($select_type)) {
				return $select_type;

			} else {
				return "error";
			}
		}

		public function get_city_BLL() {

			try {
				$select_type = $this -> dao -> select_city($this -> db);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($select_type)) {
				return $select_type;

			} else {
				return "error";
			}
		}



		public function get_most_viewed_BLL() {


			try {
				$data_building = $this -> dao -> select_most_viewed($this -> db);
			} catch (Exception $e) {
				return "error";
			}
			try {
				
				$data_img = $this -> dao -> select_images($this -> db);
			} catch (Exception $e) {
				return "error";
			}
		
			if (!empty($data_building || $data_img)) {
				$rdo = array();
				$rdo[0]= $data_building;
				$rdo[1]= $data_img;
		
				return $rdo;
			} else {
				return "error";
			}


		}

		public function get_lasts_views_BLL($args) {

			try {
				$data_building = $this -> dao -> select_lasts_views($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			try {
				
				$data_img = $this -> dao -> select_images($this -> db);
			} catch (Exception $e) {
				return "error";
			}
		
			if (!empty($data_building || $data_img)) {
				$rdo = array();
				$rdo[0]= $data_building;
				$rdo[1]= $data_img;
		
				return $rdo;
			} else {
				return "error";
			}

		}
		
	}