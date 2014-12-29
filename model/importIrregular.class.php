<?
	class ImportIrregular extends model{
		public static function getOrdered(){
			return self::findAll(null, array(
				'order'=>'english'
			));
		}
	}
?>