<?
	class partial{

		public static function get($partial){
			if($partial[0] === '/'){
				$path = view::$basePath.'/templates/partial/'.substr($partial, 1);
			}else{
				$path = view::$basePath.'/'.route::$module.'/partial/'.$partial;
			}
			// get all data from action
			foreach(module::$data as $name => &$value){
				${$name} = $value;
			}
			include($path.'.php');
		}
		public static function includeCore($partial){
			echo self::get($partial);
		}
	}
?>