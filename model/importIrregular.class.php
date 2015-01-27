<?
	class ImportIrregular extends model{
		public static function findOrdered(){
			return self::findAll(null, array(
				'order'=>'english'
			));
		}
	}
?>