<?
	class Import{
		public static function insert($params){
			pdoManager::prepare("
				replace into 
					Import 
				(french, english, categoryId)
				    values
				(:fr, :en, :categoryId)
			");
			pdoManager::execute($params);
		}
		public static function get($params){
			pdoManager::prepare("
				select french as fr, english as en from 
					Import where 
				categoryId = :categoryId 
				order by rand()
			");
			pdoManager::execute($params);
			return pdoManager::$statement->fetchAll();
		}
	}
?>