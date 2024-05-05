<?php
    class controller_maps {

        function points() {
            echo json_encode(common::load_model('maps_model', 'get_points'));
        }
        
    }
