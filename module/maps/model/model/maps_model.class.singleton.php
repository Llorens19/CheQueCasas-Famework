<?php
    class maps_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = maps_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_points() {
            return $this -> bll -> get_points_BLL();
        }



    }
