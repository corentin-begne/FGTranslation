<?	
	session_start();	
	define("ENV", "prod");
	require_once(dirname(__FILE__)."/../vendor/tool/yml.class.php");
	require_once(dirname(__FILE__)."/../vendor/core/require.class.php");
	requireCore::includeCore(array("class", "model", "vendor", "module"));
?>