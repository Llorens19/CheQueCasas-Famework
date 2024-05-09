<?php
    class controller_home {

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
            error_log("cargamos modulo home");
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }
        function carrusel_type() {
            error_log('carga alguna funcion');
            echo json_encode(common::load_model('home_model', 'get_carrusel_type'));
        }
        
        function carrusel_operations() {
            echo json_encode(common::load_model('home_model', 'get_carrusel_operations'));
        }
        
        function carrusel_city() {
            echo json_encode(common::load_model('home_model', 'get_carrusel_city'));
        }

        function most_viewed() {
            echo json_encode(common::load_model('home_model', 'get_most_viewed'));
        }

        function lasts_views() {
            echo json_encode(common::load_model('home_model', 'get_lasts_views', $_POST["lasts_views"]));
        }

    }
