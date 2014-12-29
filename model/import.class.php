<?
	class Import extends model{
		public static function getByCategory($params){
			return self::findAllWhereAll($params, array(
				'fields'=>'french as fr, english as en',
				'order'=>'rand()'
			));
		}
	}
?>