<?
	class Game extends model{	
		public static function getInfos($params){
			return self::findOne($params, array(
				'fields'=>'name, (select nb from Difficulty where id = :difficultyId) as nb',
				'where'=>array("id")
			));
		}
	}
?>