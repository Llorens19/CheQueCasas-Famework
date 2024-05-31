<?php
    class cart_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = cart_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }


        public function get_loadCart($args) {
            return $this -> bll -> get_loadCart_BLL($args);
        }

        public function get_delete_line_cart($args) {
            return $this -> bll -> get_delete_line_cart_BLL($args);
        }

        public function get_selected_line($args) {
            return $this -> bll -> get_selected_line_BLL($args);
        }
        public function get_increment($args) {
            return $this -> bll -> get_increment_BLL($args);
        }

        public function get_decrement($args) {
            return $this -> bll -> get_decrement_BLL($args);
        }

        public function get_total_money($args) {
            return $this -> bll -> get_total_money_BLL($args);
        }

        public function get_buy($args) {
            return $this -> bll -> get_buy_BLL($args);
        }

        public function get_load_facturas($args) {
            return $this -> bll -> get_load_facturas_BLL($args);
        }

    }
