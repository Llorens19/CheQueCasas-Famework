<?php
require_once("paths.php");
require_once(SITE_ROOT . 'model/middleware_auth.inc.php');

spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');

function loadClasses($className)
{
    $classExplode = explode('_', $className);
    $module = $classExplode[0];
    $option = '';

    if (isset($classExplode[1])) {
        $option = $classExplode[1];
    }

    $modulePath = SITE_ROOT . 'module/' . $module . '/';
    $modelPath = SITE_ROOT . 'model/';
    $utilsPath = SITE_ROOT . 'utils/';


    $modules = simplexml_load_file('resources/modules.xml');
    foreach ($modules as $row) {
        if (in_array($module, (array) $row->uri)) { //Si el módulo que queremos cargar está en la lista

            if (file_exists($modulePath . 'model/' . $option . '/' . $className . '.class.singleton.php')) {
                include_once($modulePath . 'model/' . $option . '/' . $className . '.class.singleton.php');
            }
        }
    }


    if (file_exists($modelPath . $className . '.class.singleton.php')) {
        include_once($modelPath . $className . '.class.singleton.php');
    }

    if (file_exists($utilsPath . $className . '.inc.php')) {
        include_once($utilsPath . $className . '.inc.php');
    }
}
