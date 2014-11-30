<?
	class requireCore{
		public static $basePath;

		public static function globRecursive($pattern, $flags = 0){
			$files = glob($pattern, $flags);
	     	foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir)
	     	{
	       		$files = array_merge($files, self::globRecursive($dir.'/'.basename($pattern), $flags));
	     	}
	  	 	return $files;
		}
		public static function includeCore($folders){
			self::$basePath = $_SERVER['DOCUMENT_ROOT']."..";
			foreach($folders as &$folder){
				$classes = self::globRecursive(self::$basePath."/$folder/*.class.php");
				foreach($classes as &$class){
					require_once($class);
				}
			}
		}
	}
?>