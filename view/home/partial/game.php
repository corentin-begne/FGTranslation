<div class="gameContainer hide">
	<div class="title">
			<?=$gameTitle?>
	</div><!--
	--><div class='left'><</div><!--
	<? for($i=0 ; $i<count($games); $i++): ?>
		--><div pos=<?=$i?> id="<?=$games[$i]['id']?>" class="game <?=($i>0) ? 'hide' : ''?>">
			<?=$games[$i]['name']?>
		</div><!--
	<? endfor; ?>
	--><div class='right'>></div><!--
--></div>