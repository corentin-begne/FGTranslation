<?
	class ImportIrregular extends model{
		public static function getOrdered(){
			return self::getAll(null, array(
				'order'=>'english'
			));
		}
	}
?>