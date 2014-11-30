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
	<div class="lang">
		<div class="titleContainer">
			<div class="title">
			</div>
		</div>
	</div><!--
	--><div class="lang">
		<div class="titleContainer">
			<div class="title">
				<input type="text" id="answer" />
			</div>
		</div>
	</div>
	<div class="gameResult">
		<div class="result">
		</div>
		<div class="valid">
			OK
		</div>
	</div>
	<div class="backdrop hide">
		<div class="totalResult">
			<div class="title">
			</div>
			<div class="points">
			</div>
			<div class="actionContainer">
				<div class="menu">
					MENU
				</div>
				<div class="replay">
					REJOUER
				</div>
			</div>
		</div>
	</div>	
</div>
<script type="text/javascript">
	var gameData = <?=json_encode($gameData)?>; 
</script>