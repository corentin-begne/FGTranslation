<?
	class loginAction{
		public function index(){
			if(!userManager::isAuthentificated()){
				$this->title = "Authentification";
				$this->headTitle = "Entrer un nom";
			}else{
				route::redirectByName('default');
			}
		}

		public function logUser(){			
			$result = array('success'=>false);
			if(isset($_POST['name'])){
				userManager::check($_POST['name']);
				if(isset($_SESSION['userData'])){
					$result['success'] = true;
				}
			}
			return json_encode($result);
		}
	}
?>