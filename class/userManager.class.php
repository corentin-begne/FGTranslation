<?
	class userManager{
		public static function isAuthentificated(){
			return isset($_SESSION['userData']);
		}
		public static function check($name){
			$user = User::getOneWhereAll(array('name'=>$name));
			if($user['id'] == ''){
				User::insert(array('name'=>$name));
				$user = User::getOneWhereAll(array('name'=>$name));
			}
			$_SESSION['userData'] = $user;
		}
	}
?>