<?
	class Game{
		public static function get(){
			pdoManager::prepare("
				select * from 
					Game 
				order by name asc
			");
			pdoManager::execute();
			return pdoManager::$statement->fetchAll();
		}		
		public static function getInfos($params){
			pdoManager::prepare("
				select name, (select nb from Difficulty where id = :difficultyId) as nb from 
					Game 
				where id = :gameId
			");
			pdoManager::execute($params);
			return pdoManager::$statement->fetch();
		}
	}
?>