<?
	class generate{
		public static function models(){

		}
		public static function schema(){
			$schemaYml = requireCore::$basePath.'/config/yml/schema.yml';
			// save old schema
			if(file_exists($schemaYml)){
				exec("mv $schemaYml $schemaYml.BAK".time());
			}
			// get tables list
			pdoManager::prepare("show tables");
			pdoManager::execute();
			$tables = pdoManager::$statement->fetchAll(PDO::FETCH_NUM);
			foreach($tables as $table){

			}
		}
	}
?>