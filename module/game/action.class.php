<?
	class gameAction{
		public function result(){
			$result = array('success'=>true);
			$userResult = UserGameResult::findOneWhereAll(array(
				"userId"=>$_SESSION["userData"]["id"],
				"categoryId"=>$_POST['categoryId'],
				"gameId"=>$_POST['gameId'],
				"lang"=>$_POST["lang"],
				"difficultyId"=>$_POST['difficultyId']
			), array('fields'=>'points'));
			if(!$userResult || ((int)$_POST['points'] > 0 && (int)$userResult["points"] < (int)$_POST['points'])){
				UserGameResult::replace(array(
					"userId"=>$_SESSION["userData"]["id"],
					"categoryId"=>$_POST['categoryId'],
					"gameId"=>$_POST['gameId'],
					"lang"=>$_POST["lang"],
					"difficultyId"=>$_POST['difficultyId'],
					"points"=>$_POST['points']
				));
			}	
			return json_encode($result);
		}
		public function play(){
			if(userManager::isAuthentificated()){
				$result = UserGameResult::findOneWhereAll(array(
					"userId"=>$_SESSION["userData"]["id"],
					"categoryId"=>$_POST['categoryId'],
					"gameId"=>$_POST['gameId'],
					"lang"=>$_POST["lang"],
					"difficultyId"=>$_POST['difficultyId']
				), array('fields'=>'points'));
				$this->gameId = $_POST['gameId'];
				$this->lang = $_POST['lang'];
				$this->gameInfos = Game::getInfos(array("id"=>$_POST['gameId'], "difficultyId"=>$_POST['difficultyId']));
				$this->points = (!$result) ? 0 : $result["points"];
				$this->category = ImportCategory::findOneWhereAll(array("id"=>$_POST['categoryId']));
				$this->categoryId = $_POST['categoryId'];
				$this->difficultyId = $_POST['difficultyId'];
				$this->type = $_POST['type'];
				module::$config['template'] = $this->type;				
				if(method_exists($this, $_POST['type'])){
					$this->$_POST['type']();
				}				
			}else{
				route::redirectByName('login');
			}
		}
		public function shuffle(){

		}
		public function translation(){
			$this->gameData = Import::getByCategory(array("categoryId"=>$_POST["categoryId"]));
			$this->title = $this->category['name'];		
		}
		public function irregular(){
			$this->gameData = ImportIrregular::getOrdered();
			$this->heads = array(
				"french"=>"français", 
				"english"=>"anglais", 
				"preterit"=>"preterit", 
				"past"=> "participe passé");
			$this->title = $this->gameInfos['name'];
		}
	}
?>