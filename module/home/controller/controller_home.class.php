<?php
    class controller_home {
        function view() {
            error_log("cargamos modulo home");
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

    }
