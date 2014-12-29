<?	
	session_start();	
	define("ENV", "dev");
	if(empty($_SERVER['DOCUMENT_ROOT'])){
		$_SERVER['DOCUMENT_ROOT'] = dirname(__FILE__);
	}
	require_once(dirname(__FILE__)."/../vendor/tool/yml.class.php");
	require_once(dirname(__FILE__)."/../vendor/core/require.class.php");
	requireCore::includeCore(array("vendor", "class", "model", "module"));
?>