<?php
class search_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = search_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_search_BLL($args)
	{

		try {
			$search = $this->dao->search($this->db, $args[0], $args[1]);

			if (!empty($search)) {
				return $search;
			} else {
				return "error";
			}
		} catch (Exception $e) {
			return "error";
		}
	}
}
