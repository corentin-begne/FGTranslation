<?
	class ImportIrregular{
		public static function insert($params){
			pdoManager::prepare("
				replace into 
					ImportIrregular 
				(french, english, preterit, past)
				    values
				(:fr, :en, :preterit, :past)
			");
			pdoManager::execute($params);
		}
		public static function get(){
			pdoManager::prepare("
				select * from 
					ImportIrregular 
				order by english asc
			");
			pdoManager::execute();
			return pdoManager::$statement->fetchAll();
		}
	}
?>