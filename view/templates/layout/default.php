<html>
	<head>
		<?=partial::includeCore("/meta")?>
		<?=javascript::includeCore()?>
		<?=stylesheet::includeCore()?>
	</head>
	<title><?=$title?></title>
	<body basepath="<?=route::$basePath?>">
		<?=partial::includeCore("/backdrop")?>	
		<div class="contentContainer">
        	<?=$content?>
        </div>	
    </body>
</html>