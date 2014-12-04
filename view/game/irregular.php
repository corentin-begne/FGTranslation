<?=partial::includeCore('/header')?>
<?=partial::includeCore('result')?>
<div class="irregularContainer"><!--
	<? foreach($heads as $head => $titleHead): ?>
		--><div class="<?=$head?>">
			<div class="head">
				<?=$titleHead?>
			</div>			
		</div><!--
	<? endforeach; ?>	
--></div>	
<?=partial::includeCore('/footer')?>