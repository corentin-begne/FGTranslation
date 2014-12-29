<?	
	require_once(dirname(__FILE__)."/config/init.php");
	if(isset($argv[1])){
		if(strpos($argv[1], ':') !== false){
			list($action, $type) = explode(':', $argv[1]);
			$value = (isset($argv[2])) ? $argv[2] : null;
			if(class_exists($action) && method_exists($action, $type)){
				$action::$type($value);
			}
		}
	}else{
		echo cli::error("Missing params")."\n";
	}
?>