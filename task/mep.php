<?
	require_once(dirname(__FILE__)."/../config/init.php");
	echo "minify css starting...\n";
	$files = requireCore::globRecursive(requireCore::$basePath.'/web/css/*.less');
	foreach($files as $file)
	{
		$targetFile = str_replace($basePath, $targetPath, $file);
		// compile and compress css
		exec('lessc -sm=on -x --url-args="releaseDate='.time().'" --global-var=\'basepath="'.$configYml['prod']['path'].'"\' '.$file.' '.$targetFile);
		echo $targetFile."\n";
	}
	echo "minify css finished\n";
?>