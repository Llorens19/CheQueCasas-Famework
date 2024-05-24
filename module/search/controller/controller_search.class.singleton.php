<?php
    class controller_search {
        static $_instance;

        public static function getInstance()
            {
                if (!(self::$_instance instanceof self)) {
                    self::$_instance = new self(); // Si no existe lo crea
                }
                return self::$_instance;
            }
    
            function __construct() {
    
            }

        function search_type() {
            echo json_encode(common::load_model('search_model', 'get_search_type', ['type', $_POST['array_filters']]));
        }

        function search_operations() {
            echo json_encode(common::load_model('search_model', 'get_search_type', ['operations', $_POST['array_filters']]));
        }

        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'get_search_type', ['complete', $_POST['array_filters']]));
        }

    }
