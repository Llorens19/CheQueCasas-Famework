<?php
    class common {
        public static function load_error() {
            require_once (VIEW_PATH_INC . 'top_page.html');
            require_once (VIEW_PATH_INC . 'header.html');
            //require_once (VIEW_PATH_INC . 'error404.html');
            require_once (VIEW_PATH_INC . 'footer.html');
        }
        
        public static function load_view($topPage, $view) {
            error_log("Cargamos la vista: " . $view);
            $topPage = VIEW_PATH_INC . $topPage;
            if ((file_exists($topPage)) && (file_exists($view))) {
                require_once ($topPage);
                require_once (VIEW_PATH_INC . 'header.html');
                require_once ($view);
                require_once (VIEW_PATH_INC . 'footer.html');
                require_once (VIEW_PATH_INC . 'bottom_page.html');
            }else {
                self::load_error();
            }
        }
        
        public static function load_model($model, $function = null, $args = null) { //Cargamos el modelo que queremos cargar
            $dir = explode('_', $model); //Separamos el nombre del modelo
            $path = constant('MODEL_' . strtoupper($dir[0])) .  $model . '.class.singleton.php'; //Creamos la ruta del modelo
            if (file_exists($path)) { //Si existe el archivo del modelo
                require_once ($path); //Lo cargamos
                if (method_exists($model, $function)) { //Si existe la función que queremos cargar
                    $obj = $model::getInstance(); 
                    if ($args != null) {
                        return call_user_func(array($obj, $function), $args); //Llamamos a la función que queremos cargar
                    }
                    return call_user_func(array($obj, $function));
                }
            }
            throw new Exception();
        }

        public static function generate_token_secure($longitud){
            if ($longitud < 4) {
                $longitud = 4;
            }
            return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
        }

        function friendlyURL_php($url) {
            $link = "";
            if (URL_FRIENDLY) {
                $url = explode("&", str_replace("?", "", $url));
                foreach ($url as $key => $value) {
                    $aux = explode("=", $value);
                    $link .=  $aux[1]."/";
                }
            } else {
                $link = "index.php?" . $url;
            }
            return SITE_PATH . $link;
        }
    }
