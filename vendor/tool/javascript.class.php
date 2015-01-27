<?
	class javascript{
		const BASEPATH = 'js';

		public static function includeCore(){
			$name = (isset(module::$config['template'])) ? module::$config['template'] : route::$action;
			foreach(module::$config[$name]["javascript"] as $js){
				echo self::get($js);
			}
		}
		public static function get($js){
			return '<script type="text/javascript" src="'.route::$basePath.'/'.self::BASEPATH.'/'.$js.'"></script>';
		}
	}
?>