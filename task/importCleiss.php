<?
	try{
		require_once(dirname(__FILE__)."/../config/require.php");
		$type = "La protection sociale";
		$url = "http://www.cleiss.fr/docs/glossaires/anglais.html" ;
		$html = file_get_contents($url);
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		foreach($doc->getElementsByTagName("dl") as $dl){
			$en = array();
			$fr = array();
			foreach($dl->getElementsByTagName("dt") as $dt)
			{
				$en[] = trim(trim($dt->nodeValue), ':');
			}
			foreach($dl->getElementsByTagName("dd") as $dd)
			{
				$fr[] = trim($dd->nodeValue);
			}
			for($i=0 ; $i<count($en) ; $i++){
				echo cli::colorString($fr[$i]." <--> ".$en[$i])."\n";
				if($fr[$i] !== "" && $en[$i] !== ""){
					Import::insert(array(":fr"=>$fr[$i], ":en"=>$en[$i], ":type"=>$type));
				}	
			}
		}
	} catch (Exception $e){
		echo cli::error($e->getMessage());
	}		
?>