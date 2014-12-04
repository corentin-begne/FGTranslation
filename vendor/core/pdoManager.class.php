<?
	class pdoManager{
		private static $pdoHandle = null;
		public static $statement = null;

		public static function getConnection(){
			if(self::$pdoHandle === null){
				$config = yaml_parse_file(requireCore::$basePath."/config/yml/db.yml")[ENV];
			  	self::$pdoHandle = new PDO('mysql:dbname='.$config["db"].';host='.$config["host"].";charset=UTF8", $config["user"], $config["pass"], array(
		  			PDO::ATTR_CASE => PDO::CASE_NATURAL, // keep orginal columns names
		  			PDO::ATTR_PERSISTENT => true, // persistent conection
		  			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // error generate pdo exception
		  			PDO::ATTR_ORACLE_NULLS => PDO::NULL_EMPTY_STRING, // convert empty string to null
		  			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // return an associative array on query result
			  	));
			} 
		 }
		public static function prepare($query){
		 	self::getConnection();
		 	self::$statement = self::$pdoHandle->prepare($query);
		}
		public static function execute($params=null){
			self::$statement->execute($params);
		}
	}  	
?>