<?php
    class controller_maps {

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

        function points() {
            echo json_encode(common::load_model('maps_model', 'get_points'));
        }
        
    }
