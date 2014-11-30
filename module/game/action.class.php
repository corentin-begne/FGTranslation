<?
	class gameAction{
		public function getList(){
			if(userManager::isAuthentificated()){
				$this->categories = ImportCategory::get();
				foreach($this->categories as $category){
					Import::update(array(':id'=>$category["id"], ':name'=>$category["name"]));
				}
				die;
			}else{
				route::redirectByName('login');
			}
		}
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
	}
?>