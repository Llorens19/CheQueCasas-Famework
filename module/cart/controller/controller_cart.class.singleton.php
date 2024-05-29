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
        
    }
