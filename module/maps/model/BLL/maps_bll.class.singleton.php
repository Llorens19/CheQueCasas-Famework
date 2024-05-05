<?php
	class maps_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = maps_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		

		public function get_points_BLL() {
			try {
				$points_building = $this -> dao -> total_points($this -> db);
			} catch (Exception $e) {
				return "error";
			}
			if (!empty( $points_building)) {
				return $points_building;
			} else {
				return "error";
			}

		}

	
	}