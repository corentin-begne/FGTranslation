<?
	class stylesheet{
		const BASEPATH = 'css';

		public static function includeCore(){
			foreach(module::$config[route::$action]["stylesheet"] as $css){
				echo self::get($css);
			}
		}
		public static function get($css){
			return '<link href="/'.route::BASEPATH.'/'.self::BASEPATH.'/'.$css.'" rel="stylesheet" type="text/css" >';
		}
	}
?>