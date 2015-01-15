<?
	class module{
		public static $config;
		public static $data;

		public static function get(){
			self::$config = yaml_parse_file(requireCore::$basePath.'/module/'.route::$module.'/config.yml');
			$class = route::$module.'Action';
			$action = route::$action;
			self::$data = new $class;
			self::includePostData();
			return self::$data->$action();
		}

		public static function includePostData(){
			foreach($_POST as $name => $value){
				self::$data->$name = $value;
			}
		}
	}
?>