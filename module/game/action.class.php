<?
	class gameAction{
		public function result(){
			$result = array('success'=>true);
			$userResult = UserGameResult::get(array(
				":userId"=>$_SESSION["userData"]["id"],
				":categoryId"=>$_POST['categoryId'],
				":gameId"=>$_POST['gameId'],
				":lang"=>$_POST["lang"],
				":difficultyId"=>$_POST['difficultyId']
			));
			if(!$userResult || ((int)$userResult["points"] > 0 && (int)$userResult["points"] < (int)$_POST['points'])){
				UserGameResult::insert(array(
					":userId"=>$_SESSION["userData"]["id"],
					":categoryId"=>$_POST['categoryId'],
					":gameId"=>$_POST['gameId'],
					":lang"=>$_POST["lang"],
					":difficultyId"=>$_POST['difficultyId'],
					":points"=>$_POST['points']
				));
			}	
			return json_encode($result);
		}
		public function play(){
			if(userManager::isAuthentificated()){
				$this->gameData = Import::get(array(":categoryId"=>$_POST["categoryId"]));
				$result = UserGameResult::get(array(
					":userId"=>$_SESSION["userData"]["id"],
					":categoryId"=>$_POST['categoryId'],
					":gameId"=>$_POST['gameId'],
					":lang"=>$_POST["lang"],
					":difficultyId"=>$_POST['difficultyId']
				));
				$this->gameId = $_POST['gameId'];
				$this->lang = $_POST['lang'];
				$this->gameInfos = Game::getInfos(array(":gameId"=>$_POST['gameId'], ":difficultyId"=>$_POST['difficultyId']));
				$this->points = (!$result) ? 0 : $result["points"];
				$category = ImportCategory::getName(array(":categoryId"=>$_POST['categoryId']));
				$this->title = $category['name'];
				$this->categoryId = $_POST['categoryId'];
				$this->difficultyId = $_POST['difficultyId'];
			}else{
				route::redirectByName('login');
			}
		}
		public function irregular(){
			if(userManager::isAuthentificated()){
				$this->gameData = ImportIrregular::get();
				$result = UserGameResult::get(array(
					":userId"=>$_SESSION["userData"]["id"],
					":categoryId"=>0,
					":gameId"=>$_POST['gameId'],
					":lang"=>$_POST["lang"],
					":difficultyId"=>$_POST['difficultyId']
				));
				$this->gameId = $_POST['gameId'];
				$this->gameInfos = Game::getInfos(array(":gameId"=>$_POST['gameId'], ":difficultyId"=>$_POST['difficultyId']));
				$this->lang = $_POST['lang'];
				$this->points = (!$result) ? 0 : $result["points"];
				$category = ImportCategory::getName(array(":categoryId"=>$_POST['categoryId']));
				$this->title = $this->gameInfos['name'];
				$this->categoryId = 0;
				$this->difficultyId = $_POST['difficultyId'];
			}else{
				route::redirectByName('login');
			}
		}
	}
?>