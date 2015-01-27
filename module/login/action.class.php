<?
	class loginAction{
		public function index(){

			if(userManager::isAuthentificated()){
				route::redirectByName('default');
				return false;
			}

			$this->title = "Authentification";
			$this->headTitle = "Entrer un nom";
		}

		public function connect(){			
			$result = array('success'=>false);

			if(!isset($this->name)){
				return json_encode($result);
			}

			userManager::check($this->name);
			
			if(isset($_SESSION['userData'])){
				$result['success'] = true;
			}

			return json_encode($result);
		}
	}
?>