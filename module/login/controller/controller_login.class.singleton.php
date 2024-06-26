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
        error_log("Entra en login");
        echo json_encode(common::load_model('login_model', 'get_login', [[$_POST['username']],[$_POST['password']]]));
    }
    function verify_email() {
        error_log("777777777777777777777777777777777777");
        error_log("Entra en verify_email");
        echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
    }

    function logout()
    {
        echo json_encode(common::load_model('login_model', 'get_logout'));
        
    }

    function data_user()
    {
    echo json_encode(common::load_model('login_model', 'get_data_user', [$_POST['token'], $_POST['type_user']]));
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
        error_log("Entra en send_recover_email");
        echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
    }

    function verify_token() {
        echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
    }

    function new_password() {
        error_log("Entra en new_password");
            echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        }  
    
    function save_phone() {
        echo json_encode(common::load_model('login_model', 'get_save_phone', [$_POST['username'], $_POST['phone']]));
    }

    function send_sms() {
        echo json_encode(common::load_model('login_model', 'get_send_sms', $_POST['phone']));
    }

    function verify_OTP() {
        echo json_encode(common::load_model('login_model', 'get_verify_OTP', [$_POST['phone'], $_POST['code']]));
    }

    function count_trys(){
        echo json_encode(common::load_model('login_model', 'get_count_trys', $_POST['username']));
    }

    function get_trys(){
        echo json_encode(common::load_model('login_model', 'get_trys', $_POST['username']));
    }

    function reset_trys(){
        echo json_encode(common::load_model('login_model', 'get_reset_trys', $_POST['username']));
    }

    function send_sms_identity() {
        echo json_encode(common::load_model('login_model', 'get_send_sms_identity', [$_POST['phone'], $_POST['username']]));
    }   

    function verify_code_identity() {
        echo json_encode(common::load_model('login_model', 'get_verify_code_identity', [$_POST['phone'], $_POST['username'], $_POST['code']]));
    } 

    function social_login() {
        echo json_encode(common::load_model('login_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar'], $_POST['type_user']]));
    } 

    function upload_photo () {
        error_log("Entra en upload_photo");
        error_log(print_r($_FILES['file'], true));
        echo json_encode(common::load_model('login_model', 'get_upload_photo', $_FILES['file']));
    }

    function save_profile() {
        echo json_encode(common::load_model('login_model', 'get_save_profile', [$_POST['name'], $_POST['surname'], $_POST['phone'], $_SESSION['username'], $_SESSION['type_user']]));
    }

    function find_likes_user() {
        error_log("Entra en find_likes_user");
        echo json_encode(common::load_model('login_model', 'get_find_likes_user', [$_SESSION['username'], $_SESSION['type_user']]));
    }


    function delete_like() {
        echo json_encode(common::load_model('login_model', 'get_delete_like', $_POST['id_like']));
    }

}
