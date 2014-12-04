<?
	class javascript{
		const BASEPATH = 'js';

		public static function includeCore(){
			foreach(module::$config[route::$action]["javascript"] as $js){
				echo self::get($js);
			}
		}
		public static function get($js){
			return '<script type="text/javascript" src="'.route::$basePath.'/'.self::BASEPATH.'/'.$js.'"></script>';
		}
	}
?>