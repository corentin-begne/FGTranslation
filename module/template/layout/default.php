<html basePath="<?=requireCore::$config['wsPath']?>">
	<head>
		<?=partial::includeCore("/meta")?>
		<?=javascript::includeCore()?>
		<?=stylesheet::includeCore()?>
	</head>
	<title><?=$title?></title>
	<body>
		<?=partial::includeCore("/backdrop")?>	
		<div class="contentContainer">
        	<?=$content?>
        </div>	
    </body>
</html>