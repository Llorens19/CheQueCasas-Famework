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

    }
