<?php
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}


		public function get_loadCart_BLL($args) {

			$res = $this->dao->get_cart_user($this->db, $args[0], $args[1]);
			return $res;
		}

		public function get_delete_line_cart_BLL($args) {
			$res = $this->dao->delete_line_cart($this->db, $args[0]);
			return $res;
		}
	}