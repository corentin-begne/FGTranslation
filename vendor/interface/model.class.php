<?
	abstract class model{
		public static function getLastInsertId(){
			return pdoManager::$pdoHandle->lastInsertId() ;
		}
		public static function getFoundRows(){
			self::prepare('select found_rows() as nb');
			$row = self::executeOne();
			return $row['nb'] ;
		}
		public static function prepare($query){
			pdoManager::prepare($query);        	
		}		
		public static function execute($params, $multiple=null){
			pdoManager::$statement->execute($params);
			if($multiple === true){
				return pdoManager::$statement->fetchAll();
			}else if($multiple === false){
				return pdoManager::$statement->fetch();
			}
		}
		public static function executeOne($params=null){
			self::execute($params, false);
		}
		public static function executeAll($params=null){
			self::execute($params, true);
		}
		public static function delete($params=null){
			self::prepare("
				delete from
					".get_called_class()."
				".(isset($params) ? " where ".self::setWhereFields($params) : '')	
			);
			self::execute($params);
		}
		public static function insert($params, $type="insert"){
 			$fields = implode(',', array_keys($params));
        	$values = implode(',:', array_keys($params));
        	self::prepare("
				$type into 
					".get_called_class()." 
				($fields)
				    values
				(:$values)
			");
			self::execute($params);
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
		public static function findOne($params=null, $clause=null){
			return self::find($params, $clause, false);
		}
		public static function findAll($params=null, $clause=null){
			return self::find($params, $clause, true);
		}
		public static function findOneWhereAll($params=null, $clause=null){
			$clause['where'] = array_keys($params);
			return self::find($params, $clause, false);
		}
		public static function findAllWhereAll($params=null, $clause=null){
			$clause['where'] = array_keys($params);
			return self::find($params, $clause, true);
		}
		public static function find($params=null, $clause=null, $multiple=null){
			self::prepare("
				select ".self::getFields($clause['fields'])." 
				from ".get_called_class()." 
				".(isset($clause['where']) ? " where ".self::setWhereFields($clause['where']) : '')."
				".(isset($clause['order']) ? " order by ".$clause['order'] : '')."
				".(isset($clause['limit']) ? " limit ".$clause['limit'][0].', '.$clause['limit'][1] : '')
			);
			return self::execute($params, $multiple);
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