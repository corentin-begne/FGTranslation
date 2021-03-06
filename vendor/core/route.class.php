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
						$length = count($route);
						for($i=0; $i<$length; $i++){
							if($route[$i] !== self::$currentRoute[$i] && 
								$route[$i] !== "*" && 
								strpos($route[$i], ':') === false){
								break;
							}						
						}
						if($i === count($route)){
							if(strpos($config['url'], ':') !== false){
								self::setPostData($config['url']);
							}
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
		public static function setPostData($referer){
			$tags = explode('/', $referer);
			$length = count($tags);
			for($i=0; $i<$length; $i++){
				if(strpos($tags[$i], ':') !== false){				
					$_POST[str_replace(':', '', $tags[$i])] = self::$currentRoute[$i];
				}
			}
		}
		public static function redirect($config){
			self::$module = $config['module'];
			self::$action = $config['action']; 	
			// get module/action
			$data = module::get();
			if($data != null){
				echo $data;
			}else{
				// check layout
				if(isset($config['layout'])){
					self::$layout = $config['layout'];
				}
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