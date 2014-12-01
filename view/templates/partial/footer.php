</div>
<? if(isset($gameData)): ?>
	<script type="text/javascript">
		var gameData = <?=json_encode($gameData)?>; 
	</script>
<? endif; ?>	