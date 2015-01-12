<?	
	require_once(dirname(__FILE__)."/config/init.php");
	if(isset($argv[1])){
		if(strpos($argv[1], ':') !== false){
			list($action, $type) = explode(':', $argv[1]);
			if(class_exists($action) && method_exists($action, $type)){
				array_splice($argv, 0, 2);
				try{
					call_user_func_array(array($action, $type), $argv);
				}catch(Exception $e){
					echo cli::error($e->getMessage())."\n";
				}
			}
		}
	}else{
		echo cli::error("Missing params")."\n";
	}
?>