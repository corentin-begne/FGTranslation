<?
	class route{
		public static $basePath;
		public static $action;
		public static $module;
		public static $layout;
		public static $routes;
		public static $currentRoute;

		public static function check(){
			self::$basePath = requireCore::$config["path"];
			self::$routes = yaml_parse_file(requireCore::$basePath.'/config/yml/routes.yml');			
			self::$currentRoute = explode('/', trim(substr($_SERVER["REQUEST_URI"], strlen(requireCore::$config["wsPath"])) , '/'));
			$routed = false;
			// check existing routes
			foreach(self::$routes as $route => $config){
				if(isset($config['url'])){
					$route = explode('/', $config['url']);
					if(count($route) === count(self::$currentRoute)){
						for($i=0; $i<count($route); $i++){
							if($route[$i] !== self::$currentRoute[$i] && self::$currentRoute[$i] !== "*"){
								break;
							}						
						}
						if($i === count($route)){
							self::redirect($config);
							$routed = true;
							break;
						}
					}
				}
			}
			// redirect default if no route found
			if(!$routed && isset(self::$routes["default"])){
				self::redirect(self::$routes["default"]);
			}
		}
		public static function redirect($config){
			self::$module = $config['module'];
			self::$action = $config['action'];
			if(isset($config['layout'])){
				self::$layout = $config['layout'];
			}	
			// get module/action
			$data = module::get();
			if($data != null){
				echo $data;
			}else{
				// include view in layout
				view::includeCore();
			}	
		}
		public static function redirectByName($name){
			$url = self::$basePath.'/'.self::$routes[$name]['url'];
			header('Location: '.$url);
		}
	}
?>