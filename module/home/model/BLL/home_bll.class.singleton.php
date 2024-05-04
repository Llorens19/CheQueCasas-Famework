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
		
	}