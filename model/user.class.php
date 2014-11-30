<?
	class User{
		public static function getByName($params){
			pdoManager::prepare("
				select * from 
					User 
				where
				    name = :name
			");
			pdoManager::execute($params);
			return pdoManager::$statement->fetch();
		}	
		public static function create($params){
			pdoManager::prepare("
				insert into
					User 
				(name)
					values 
				(:name)
			");
			pdoManager::execute($params);
		}	
	}
?>