<?php
    class controller_home {
        function view() {
            error_log("cargamos modulo home");
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }
        function carrusel_type() {
            error_log('carga alguna funcion');
            echo json_encode(common::load_model('home_model', 'get_carrusel_type'));
        }

    }
