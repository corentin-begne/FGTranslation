<?
	class UserGameResult{
		public static function get($params){
			pdoManager::prepare("
				select points from 
					UserGameResult where 
				categoryId = :categoryId and 
				gameId = :gameId and 
				difficultyId = :difficultyId and 
				userId = :userId and 
				lang = :lang
			");
			pdoManager::execute($params);
			return pdoManager::$statement->fetch();
		}
		public static function insert($params){
			pdoManager::prepare("
				replace into 
					UserGameResult 
				(points, categoryId, userId, gameId, difficultyId, lang)
				    values
				(:points, :categoryId, :userId, :gameId, :difficultyId, :lang)
			");
			pdoManager::execute($params);
		}
	}
?>