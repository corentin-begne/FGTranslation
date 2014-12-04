<?	
	session_start();	
	define("ENV", "dev");
	require_once(dirname(__FILE__)."/../vendor/core/require.class.php");
	requireCore::includeCore(array("class", "model", "vendor", "module"));
?>