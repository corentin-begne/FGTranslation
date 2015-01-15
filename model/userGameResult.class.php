<?
	class UserGameResult extends model{

		public static function findUserPointsByGame($params){			
			return self::findOneWhereAll($params, array('fields'=>'points'));
		}

	}
?>