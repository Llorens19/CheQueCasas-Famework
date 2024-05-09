<?php
    class controller_shop {

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
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function load_buildings() {
            echo json_encode(common::load_model('shop_model', 'get_buildings', [$_POST['filters'], $_POST['total_prod'], $_POST['items_page']]));
        }

        function details_building() {
            echo json_encode(common::load_model('shop_model', 'get_details', $_POST['id_building']));
        }
        
        function filters_shop_refill() {
            echo json_encode(common::load_model('shop_model', 'get_filters_shop_refill', [$_POST['filters'],  $_POST['items_page']]));
        }
        function filters_table() {
            echo json_encode(common::load_model('shop_model', 'get_filters_table'));
        }

        function count_click_details() {
            echo json_encode(common::load_model('shop_model', 'get_count_click_details', $_POST['id'] ));
        }
        function total_prod() {
            echo json_encode(common::load_model('shop_model', 'get_total_prod', $_POST['filters']));
        }
        function likes_user() {
            echo json_encode(common::load_model('shop_model', 'get_likes_user', $_SESSION['username']));
        }
        function table_likes() {
            echo json_encode(common::load_model('shop_model', 'get_table_likes'));
        }

        function action_like() {
            echo json_encode(common::load_model('shop_model', 'get_action_like', [$_SESSION['username'], $_POST['id_building']]));
        }

    }
