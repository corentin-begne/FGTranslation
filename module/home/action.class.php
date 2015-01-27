<?
	class homeAction{

		public function __construct(){

			if(!userManager::isAuthentificated()){
				route::redirectByName('login');
				return false;
			}

		}

		public function index(){
			$this->title = "Accueil";
			$this->categoryTitle = "Choisir une catégorie";
			$this->gameTitle = "Choisir un jeux";
			$this->langTitle = "Choisir une langue";
			$this->difficultyTitle = "Choisir la difficulté";
			$this->playTitle = "Jouer";
			$this->categories = ImportCategory::getInfos();
			$this->games = Game::findAll();
			$this->difficulties = Difficulty::findAll();
		}
	}
?>