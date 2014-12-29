<?
	class ImportCategory extends model{
		public static function getInfos(){
			return self::findAll(null, array(
				'fields'=>'*, (select count(*) from Import where categoryId = ImportCategory.id) as nb',
				'order'=>'name asc'
			));
		}
	}
?>