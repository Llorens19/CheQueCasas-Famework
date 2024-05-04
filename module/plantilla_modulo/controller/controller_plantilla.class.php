<?php
    class controller_plantilla {
        function view() {
            common::load_view('top_page_plantilla.html', VIEW_PATH_PLANTILLA . 'plantilla.html');
        }

        function carrusel_type() {
            echo json_encode(common::load_model('planyilla_model', 'get_carrusel_type'));
        }
        
    }
