<?php
    class login_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = login_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        public function get_register($args) {
            return $this -> bll -> get_register_BLL($args);
        }

        public function get_verify_email($args) {
            return $this -> bll -> get_verify_email_BLL($args);
        }

        public function get_login($args) {
            return $this -> bll -> get_login_BLL($args);
        }

        public function get_logout() {
            return $this -> bll -> get_logout_BLL();
        }

        public function get_data_user($args) {
            return $this -> bll -> get_data_user_BLL($args);
        }
        public function get_actividad($args) {
            return $this -> bll -> get_actividad_BLL($args);
        }
        public function get_controluser($args) {
            return $this -> bll -> get_controluser_BLL($args);
        }

        public function get_refresh_cookie() {
            return $this -> bll -> get_refresh_cookie_BLL();
        }

        public function get_recover_email($args) {
            return $this -> bll -> get_recover_email_BBL($args);
        }

        public function get_verify_token($args) {
            return $this -> bll -> get_verify_token_BLL($args);
        }

        public function get_new_password($args) {
            return $this -> bll -> get_new_password_BLL($args);
        }

        public function get_save_phone($args) {
            return $this -> bll -> get_save_phone_BLL($args);
        }

        public function get_send_sms($args) {
            return $this -> bll -> get_send_sms_BLL($args);
        }

        public function get_verify_OTP($args) {
            return $this -> bll -> get_verify_OTP_BLL($args);
        }
        
        public function get_count_trys($args) {
            return $this -> bll -> get_count_trys_BLL($args);
        }   

        public function get_trys($args) {
            return $this -> bll -> get_trys_BLL($args);
        }

        public function get_reset_trys($args) {
            return $this -> bll -> get_reset_trys_BLL($args);
        }

        public function get_send_sms_identity($args) {
            return $this -> bll -> get_send_sms_identity_BLL($args);
        }

        public function get_verify_code_identity($args) {
            return $this -> bll -> get_verify_code_identity_BLL($args);
        }

        public function get_social_login($args) {
            return $this -> bll -> get_social_login_BLL($args);
        }

        public function get_upload_photo($args) {
            return $this -> bll -> get_upload_photo_BLL($args);
        }

        public function get_save_profile ($args) {
            return $this -> bll -> get_save_profile_BLL($args);
        }

        public function get_find_likes_user($args) {
            return $this -> bll -> get_find_likes_user_BLL($args);
        }

        public function get_delete_like($args) {
            return $this -> bll -> get_delete_like_BLL($args);
        }


    }
