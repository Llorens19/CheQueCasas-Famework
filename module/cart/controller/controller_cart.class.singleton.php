<?php
    class controller_cart {

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
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
        }

        function loadCart() {
            echo json_encode(common::load_model('cart_model', 'get_loadCart', [$_SESSION['username'], $_SESSION['type_user']]));
        }

        function delete_line_cart() {
            echo json_encode(common::load_model('cart_model', 'get_delete_line_cart', $_POST['id_line']));
        }

        function selected_line() {
            echo json_encode(common::load_model('cart_model', 'get_selected_line', [$_POST['id_line'], $_POST['state']]));
        }

        function increment () {
            echo json_encode(common::load_model('cart_model', 'get_increment', $_POST['id_line']));
        }

        function decrement () {
            echo json_encode(common::load_model('cart_model', 'get_decrement', $_POST['id_line']));
        }
        function total_money() {
            echo json_encode(common::load_model('cart_model', 'get_total_money', [$_SESSION['username'], $_SESSION['type_user']]));
        }   

        function buy() {
            echo json_encode(common::load_model('cart_model', 'get_buy', [$_SESSION["username"], $_POST["name"], $_POST["surname"], $_POST['email'], $_POST['adress'], $_POST["adress2"], $_SESSION['type_user']]));
        }

        function load_facturas() {
            echo json_encode(common::load_model('cart_model', 'get_load_facturas', [$_SESSION["username"], $_SESSION['type_user']]));
        }

        function check_stock() {
            echo json_encode(common::load_model('cart_model', 'get_check_stock', [$_SESSION["username"], $_SESSION['type_user']]));
        }

        function products() {
            error_log("products");
            echo json_encode(common::load_model('cart_model', 'get_products'));
        }

        function add_product() {
            error_log("add_product");
            echo json_encode(common::load_model('cart_model', 'get_add_product',  [$_SESSION['username'], $_POST['id_product'], $_SESSION['type_user']]));
        }
    }
