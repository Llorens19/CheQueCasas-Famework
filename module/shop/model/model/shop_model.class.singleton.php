<?php
    class shop_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_buildings($args) {
            return $this -> bll -> get_buildings_BLL($args);
        }

        public function get_details($args) {
            return $this -> bll -> get_details_BLL($args);
        }


        public function get_filters_shop_refill($args) {
            return $this -> bll -> get_filters_shop_refill_BLL($args);
        }

        public function get_filters_table() {
            return $this -> bll -> get_filters_table_BLL();
        }

        public function get_count_click_details($args) {
            return $this -> bll -> get_count_click_details_BLL($args);
        }

        public function get_total_prod($args) {
            return $this -> bll -> get_total_prod_BLL($args);
        }


        public function get_likes_user($args) {
            return $this -> bll -> get_likes_user_BLL($args);
        }

        public function get_table_likes() {
            return $this -> bll -> get_table_likes_BLL();
        }

        public function get_action_like($args) {
            return $this -> bll -> get_action_like_BLL($args);
        }


    }
