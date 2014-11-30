<?
	class cli{
		const ERROR = 41;
		const WARNING = 43;
		const SUCCESS = 42;
		const GREEN = "0;32";
		const BLACK = "0;30";

		public static function colorBackgroundString($string, $color){
			return "\033[".cli::BLACK."m\033[".$color."m".$string."\033[0m"; 
		}

		public static function colorString($string, $color=self::GREEN){
			return "\033[".$color."m".$string."\033[0m"; 
		}

		public static function error($string){
			return self::colorBackgroundString($string, cli::ERROR);
		}
		public static function success($string){
			return self::colorBackgroundString($string, cli::SUCCESS);
		}
		public static function warning($string){
			return self::colorBackgroundString($string, cli::WARNING);
		}
	}
?>