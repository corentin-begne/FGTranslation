<?
	class view{
		public static $basePath;

		public static function includeCore(){
			self::$basePath = requireCore::$basePath.'/view';
			// get all data from action
			foreach(module::$data as $name => &$value){
				${$name} = $value;
			}
			if(route::$layout != ""){
				ob_start();
				include(self::$basePath.'/'.route::$module.'/'.route::$action.'.php');
				$content = ob_get_contents();
				ob_end_clean();
				include(self::$basePath.'/templates/layout/'.route::$layout.'.php');
			}else{
				include(self::$basePath.'/'.route::$module.'/'.route::$action.'.php');
			}

		}
	}
?>