<?php

require 'autoload.php';

$path = $_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/';
include($path . "utils/common.inc.php");
// include($path . "utils/mail.inc.php");
include_once($path . "paths.php");

ob_start(); //Activamos el buffer de salida
session_start();

class router
{
    private $uriModule;
    private $uriFunction;
    private $nameModule;
    static $_instance;

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self(); // Si no existe lo crea
        }
        return self::$_instance;
    }

    function __construct()
    {    //Si no cargamos ningun módulo, forzamos el home
        if (isset($_GET['module'])) {
            

            $this->uriModule = $_GET['module'];

        } else {

            $this->uriModule = 'home';
        }
        if (isset($_POST['op'])) {

            if($_POST['op'] == 'verify' or $_POST['op'] == 'recover'){

                $this->uriFunction  = 'view';
                $this->uriModule = 'home';
            }else{

                $this->uriFunction = ($_POST['op'] === "") ? 'view' : $_POST['op'];

            }


        } else if (isset($_GET['op'])) {  

            if($_GET['op'] == 'verify' or $_GET['op'] == 'recover'){

                $this->uriFunction  = 'view';
                $this->uriModule = 'home';
            }else{
            
            //Si no cargamos ninguna función, forzamos la de view

            $this->uriFunction = ($_GET['op'] === "") ? 'view' : $_GET['op'];
            }
            
        }  else {
            $this->uriFunction = 'view';
        }
    }

    function routingStart()
    {
        try {
            call_user_func(array($this->loadModule(), $this->loadFunction())); //Llamamos a la función que hemos cargado
        } catch (Exception $e) {
            common::load_error();  //Si no se ha cargado bien, cargamos la página de error
        }
    }

    //Cargamos el módulo que queremos cargar
    private function loadModule()
    {
        if (file_exists('resources/modules.xml')) { //Si existe el archivo de módulos
            $modules = simplexml_load_file('resources/modules.xml'); //Cargamos los módulos
            foreach ($modules as $row) { //Recorremos los módulos
                if (in_array($this->uriModule, (array) $row->uri)) { //Si el módulo que queremos cargar está en la lista
                    $path = MODULES_PATH . $row->name . '/controller/controller_' . (string) $row->name . '.class.php';

                    if (file_exists($path)) { //Si existe el archivo del controlador
                        require_once($path); //Lo cargamos
                        $controllerName = 'controller_' . (string) $row->name; //Guardamos el nombre del controlador
                        $this->nameModule = (string) $row->name; //Guardamos el nombre del módulo
                        return $controllerName::getInstance(); // Devolvemos el controlador que queremos cargar 
                    }
                }
            }
        }
        throw new Exception('Not Module found.');
    }

    private function loadFunction()
    {
        $path = MODULES_PATH . $this->nameModule . '/resources/function.xml'; //Cargamos las funciones del módulo que esta dentro de cada carpeta de modulo


        if (file_exists($path)) {
            $functions = simplexml_load_file($path);
            foreach ($functions as $row) {
                if (in_array($this->uriFunction, (array) $row->uri)) { //Si la función que queremos cargar está en la lista
                    return (string) $row->name; //Devolvemos el nombre de la función que queremos cargar 
                }
            }
        }
        throw new Exception('Not Function found.');
    }
}

router::getInstance()->routingStart();
