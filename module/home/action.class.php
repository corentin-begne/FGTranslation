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
				$this->categories = ImportCategory::get();
				$this->games = Game::get();
				$this->difficulties = Difficulty::get();
			}else{
				route::redirectByName('login');
			}
		}
	}
?>