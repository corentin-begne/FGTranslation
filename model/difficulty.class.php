<?
	class Difficulty{
		public static function get(){
			pdoManager::prepare("
				select * from 
					Difficulty 
				order by nb desc
			");
			pdoManager::execute();
			return pdoManager::$statement->fetchAll();
		}
	}
?>