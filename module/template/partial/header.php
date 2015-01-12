<div class="heartContainer">
	<? for($i=0; $i<(int)$gameInfos['nb']; $i++): ?>
		<div class="heart">
			<div class="stand"></div>
			<div class="eyeOpen"></div>
		</div>
	<? endfor; ?>	
</div>
<div class="userResult">
	Meilleur score : <?=$points?>
</div>
<div class="gameContainer" gameId="<?=$gameId?>" categoryId="<?=$categoryId?>" difficultyId="<?=$difficultyId?>" lang="<?=$lang?>">
	<div class="title">
		<?=$gameInfos['name']?>
	</div>