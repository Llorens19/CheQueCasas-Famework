<?php
    class controller_search {

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
