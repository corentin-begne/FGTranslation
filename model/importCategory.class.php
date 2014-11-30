<?
	class ImportCategory{
		public static function insert($params){
			pdoManager::prepare("
				replace into 
					ImportCategory 
				(name)
				    values
				(:name)
			");
			pdoManager::execute($params);
		}
		public static function get(){
			pdoManager::prepare("
				select *, 
				(select count(*) from Import where categoryId = ImportCategory.id) as nb from 
					ImportCategory 
				order by name asc
			");
			pdoManager::execute();
			return pdoManager::$statement->fetchAll();
		}
		public static function getName($params){
			pdoManager::prepare("
				select name from 
					ImportCategory 
				where id = :categoryId
			");
			pdoManager::execute($params);
			return pdoManager::$statement->fetch();
		}
	}
?>