<?php
class home_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_carrusel_type()
    {
        return $this->bll->get_type_BLL();
    }

    public function get_carrusel_operations()
    {
        return $this->bll->get_operations_BLL();
    }

    public function get_carrusel_city()
    {

        return $this->bll->get_city_BLL();
    }

    public function get_most_viewed()
    {

        return $this->bll->get_most_viewed_BLL();
    }

    public function get_lasts_views($args)
    {

        return $this->bll->get_lasts_views_BLL($args);
    }

}
