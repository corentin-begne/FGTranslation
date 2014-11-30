<?
	class userManager{
		public static function isAuthentificated(){
			return isset($_SESSION['userData']);
		}
		public static function check($name){
			$user = User::getByName(array(':name'=>$name));
			if($user['id'] == ''){
				$user = User::create(array(':name'=>$name));
			}
			$_SESSION['userData'] = $user;
		}
	}
?>