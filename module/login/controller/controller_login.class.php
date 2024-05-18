<?php
class controller_login
{
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

    function register()
    {
        echo json_encode(common::load_model('login_model', 'get_register', [
            [$_POST['email']],
            [$_POST['username']],
            [$_POST['username'], $_POST['email'], $_POST['password'], $_POST['name'], $_POST['surname'], $_POST['tlf']]
        ]));
    }
    function login()
    {
        echo json_encode(common::load_model('login_model', 'get_login', [[$_POST['username']],[$_POST['password']]]));
    }
    function verify_email() {
        echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
    }

    function logout()
    {
        // echo json_encode(common::load_model('login_model', 'get_logout', [$_SESSION['username'], $_SESSION['tiempo']]));
        echo json_encode("Done");
    }

    function data_user()
    {
    echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
    }

    function actividad()
    {
        echo json_encode(common::load_model('login_model', 'get_actividad', $_SESSION["tiempo"]));
    }
    function controluser()
    {
        echo json_encode(common::load_model('login_model', 'get_controluser', [[$_POST["access_token"], $_POST["refresh_token"]],
        [$_SESSION['username']]]));
    }

    function refresh_cookie()
    {
        echo json_encode(common::load_model('login_model', 'get_refresh_cookie'));
    }

    function send_recover_email() {
        echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
    }
}
