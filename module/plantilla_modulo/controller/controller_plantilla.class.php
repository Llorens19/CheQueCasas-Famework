<?php
    class controller_plantilla {

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
        function view() {
            common::load_view('top_page_plantilla.html', VIEW_PATH_PLANTILLA . 'plantilla.html');
        }

        function carrusel_type() {
            echo json_encode(common::load_model('planyilla_model', 'get_carrusel_type'));
        }
        
    }
