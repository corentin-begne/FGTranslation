<?
	class homeAction{
		public function index(){
			if(userManager::isAuthentificated()){
				$this->title = "Accueil";
				$this->categoryTitle = "Choisir une catégorie";
				$this->gameTitle = "Choisir un jeux";
				$this->langTitle = "Choisir une langue";
				$this->difficultyTitle = "Choisir la difficulté";
				$this->playTitle = "Jouer";
				$this->categories = ImportCategory::getInfos();
				$this->games = Game::getAll();
				$this->difficulties = Difficulty::getAll();
			}else{
				route::redirectByName('login');
			}
		}
	}
?>