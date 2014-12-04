<div class="categoryContainer hide">
	<div class="title">
			<?=$categoryTitle?>
	</div>
	<div class='up'>S</div><!--
	<? for($i=0 ; $i<count($categories); $i++): ?>
		--><div name="<?=$categories[$i]['name']?>" id="<?=$categories[$i]['id']?>" class="category <?=($i>0) ? 'hide' : ''?>">
			<?=$categories[$i]['name']?> (<?=$categories[$i]['nb']?>)
		</div><!--
	<? endfor; ?>
	--><div class='down'>T</div>
</div>
<?=partial::includeCore("game")?>
<div class='backdrop hide'>
	<div class='optionContainer'>
		<div class="title"></div>
		<div class="langContainer">
			<div class="flagContainer">
				<img id="en" class="lang selected" src="/<?=route::BASEPATH?>/images/flagEn.png" />
				<img id="fr" class="lang" src="/<?=route::BASEPATH?>/images/flagFr.png" />
			</div>
		</div>
		<div class="difficultyContainer">
			<? for($i=0 ; $i<count($difficulties); $i++): ?>
				<div id="<?=$difficulties[$i]['id']?>" class="difficulty<?=($i===0) ? ' selected' : ''?>">
					<?=$difficulties[$i]['name']?>
				</div>
			<? endfor; ?>
		</div>
		<div class="play">
			<?=$playTitle?>
		</div>
	</div>
</div>