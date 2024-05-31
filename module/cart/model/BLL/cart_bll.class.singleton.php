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
			$res = $this->dao->delete_line_cart($this->db, $args);
			return $res;
		}

		public function get_selected_line_BLL($args) {
			$this->dao->selected_line_cart($this->db, $args[0], $args[1]);
			return "done";
		}

		public function get_increment_BLL($args) {
			$this->dao->increment($this->db, $args);
			return "done";
		}

		public function get_decrement_BLL($args) {
			$this->dao->decrement($this->db, $args);
			return "done";
		}

		public function get_total_money_BLL($args) {
			$res = $this->dao->total_money($this->db, $args[0], $args[1]);
			return $res;
		}

		public function get_buy_BLL($args) {
			
			$res = $this->dao->buy($this->db, $args[0], $args[1], $args[2], $args[3], $args[4], $args[5], $args[6]);

			

			$id = $res[0]['message'];
			if(isset($id)){

				$res2 = $this->dao->save_lines($this->db, $id, $args[0], $args[6]);
				
				$this->dao->update_stock($this->db, $args[0], $args[6]);
				
				$order = $this->dao->select_order($this->db, $id);
				$user_order = $this->dao->select_user_order($this->db, $id);
				
				PDF::create_Bill($order, $user_order, $id);

				error_log($id);
				$this->dao->delete_cart($this->db, $args[0], $args[6]);
				
				$url_pdf = 'pdf/factura' . $id . '.pdf';

				$this->dao->save_pdf_url($this->db, $id, $url_pdf);

			return $order;

			}else{
				return 'fail';
			}
			
		}

		public function get_load_facturas_BLL($args){

			$facturas = $this->dao->factura_user($this->db, $args[0], $args[1]);
			
			if (empty($facturas)){

				return "error";

			}else{
				return $facturas;
			}

		}

	}