<?
	abstract class model{
		public static function getLastInsertId(){
			return pdoManager::$pdoHandle->lastInsertId() ;
		}
		public static function prepare($query){
			pdoManager::prepare($query);        	
		}		
		public static function execute($params){
			pdoManager::$statement->execute($params);
		}
		public static function delete($params=null){
			pdoManager::prepare("
				delete from
					".get_called_class()."
				".(isset($params) ? " where ".self::setWhereFields($params) : '')	
			);
			pdoManager::execute($params);
		}
		public static function insert($params, $type="insert"){
 			$fields = implode(',', array_keys($params));
        	$values = implode(',:', array_keys($paramss));
        	pdoManager::prepare("
				$type into 
					".get_called_class()." 
				($fields)
				    values
				(:$values)
			");
			pdoManager::execute($params);
		}
		public static function replace($params){
			self::insert($params, "replace");
		}
		public static function update($params, $clause=null){
			pdoManager::prepare("
				update ".get_called_class()." 
				set ".self::setUpdateFields(array_keys($params))." 
				".(isset($clause['where']) ? " where ".self::setWhereFields($clause['where']) : '')
			);
			pdoManager::execute($params);
		}
		public static function getOne($params=null, $clause=null){
			self::get($params, $clause);
			return pdoManager::$statement->fetch();
		}
		public static function getAll($params=null, $clause=null){
			self::get($params, $clause);
			return pdoManager::$statement->fetchAll();
		}
		public static function getOneWhereAll($params=null, $clause=null){
			$clause['where'] = array_keys($params);
			self::get($params, $clause);
			return pdoManager::$statement->fetch();
		}
		public static function getAllWhereAll($params=null, $clause=null){
			$clause['where'] = array_keys($params);
			self::get($params, $clause);
			return pdoManager::$statement->fetchAll();
		}
		public static function get($params=null, $clause=null){
			pdoManager::prepare("
				select ".self::getFields($clause['fields'])." 
				from ".get_called_class()." 
				".(isset($clause['where']) ? " where ".self::setWhereFields($clause['where']) : '')."
				".(isset($clause['order']) ? " order by ".$clause['order'] : '')."
				".(isset($clause['limit']) ? " limit ".$clause['limit'][0].', '.$clause['limit'][1] : '')
			);
			pdoManager::execute($params);
		}
		public static function getFields(&$fields){
			return (isset($fields)) ? $fields : '*';
		}
    	public static function setUpdateFields(&$fields){
    		return self::setFields($fields, ',');
    	}
    	public static function setWhereFields(&$fields, $include=true){
    		return self::setFields($fields, ($include) ? 'and' : 'or');
    	}
		public static function setFields(&$fields, $separator){
			$data = '';
			foreach($fields as &$field){
				$data .= " $field = :$field $separator ";
			}
			return substr($data, 0, (strlen($data) - strlen($separator) - 1));
		}    	
	}
?>