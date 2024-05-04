<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			//$this -> dao = home_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_type_BLL() {
			error_log("BLL cargado");
		}

		
	}