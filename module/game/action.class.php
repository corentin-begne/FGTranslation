<?
	class gameAction{
		public $data;

		public function hook(){
			if(!userManager::isAuthentificated()){
				route::redirectByName('login');
				return false;
			}

			$this->data = array(
				'userId'		=> $_SESSION['userData']['id'],
				'categoryId'	=> $this->categoryId,
				'gameId'		=> $this->gameId,
				'lang'			=> $this->lang,
				'difficultyId'	=> $this->difficultyId
			);
		}

		public function result(){
			$result = array('success'=>true);		
			$userResult = UserGameResult::findUserPointsByGame($this->data);

			if(!$userResult || ((int)$this->points > 0 && (int)$userResult['points'] < (int)$this->points)){
				$data['points'] = $this->points;
				UserGameResult::replace($this->data);
			}	

			return json_encode($result);
		}

		public function play(){
			$userResult = UserGameResult::findUserPointsByGame($this->data);
			$this->points = (!$userResult) ? 0 : $userResult['points'];
			$this->gameInfos = Game::getInfos(array(
				'id'			=> $this->gameId, 
				'difficultyId'	=> $this->difficultyId
			));
			$this->category = ImportCategory::findCategoryById(array(
				'id' => $this->categoryId
			));
			module::$config['template'] = $this->type;		

			if(method_exists($this, $this->type)){
				$fn = $this->type;
				$this->$fn();
			}				

		}

		public function shuffle(){

		}

		public function translation(){
			$this->gameData = Import::findByCategory(array(
				'categoryId' => $this->categoryId
			));
			$this->title = $this->category['name'];		
		}

		public function irregular(){
			$this->gameData = ImportIrregular::findOrdered();
			$this->heads = array(
				'french'	=> 'français', 
				'english'	=> 'anglais', 
				'preterit'	=> 'preterit', 
				'past'		=> 'participe passé');
			$this->title = $this->gameInfos['name'];
		}

	}
?>