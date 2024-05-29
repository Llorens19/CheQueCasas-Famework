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

    }
