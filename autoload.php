<?php
require_once("paths.php");
require_once(SITE_ROOT . 'model/middleware_auth.php');

spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');

function loadClasses($className)
{
    $classExplode = explode('_', $className);
    $module = $classExplode[0];
    $option = '';
    error_log("444444444444444444444444444444444444444444444444444");
    error_log($className);
    error_log($module);


    if (isset($classExplode[1])) {
        $option = $classExplode[1];
        error_log($option);
    }

    $modulePath = SITE_ROOT . 'module/' . $module . '/';
    $modelPath = SITE_ROOT . 'model/';
    $utilsPath = SITE_ROOT . 'utils/';


    $modules = simplexml_load_file('resources/modules.xml');
    foreach ($modules as $row) {
        if (in_array($module, (array) $row->uri)) { //Si el módulo que queremos cargar está en la lista

            if (file_exists($modulePath . 'model/' . $option . '/' . $className . '.class.singleton.php')) {
                set_include_path($modulePath . 'model/' . $option . '/');
                spl_autoload($className);

                error_log("////////////////////////////////////");
                error_log($modulePath . 'model/' . $option . '/' . $className . '.class.singleton.php');
            }
        }
    }


    if (file_exists($modelPath . $className . '.class.singleton.php')) {
        set_include_path($modelPath);
        spl_autoload($className);
    }


    if (file_exists($utilsPath . $className . '.inc.php')) {
        set_include_path($utilsPath);
        spl_autoload($className);
    }
}
