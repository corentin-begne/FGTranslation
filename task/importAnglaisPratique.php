<?	
	try{
		require_once(dirname(__FILE__)."/../config/require.php");
		$url = "http://anglais-pratique.fr/index.php/rubriques/ecologie-environnement/209-vocabulaire-divers" ;
		$html = str_ireplace("<br />", "\n", file_get_contents($url));
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		$type = "Écologie, Environnement";
		foreach($doc->getElementsByTagName("table") as $table){
			foreach($table->getElementsByTagName("tr") as $tr){
				$fr = "";
				$en = "";	
				foreach($tr->getElementsByTagName("span") as $span){								
					if($span->getAttribute("class") === "fras"){
						$fr = str_replace("\n", ", ", trim($span->nodeValue));
					}
					if($span->getAttribute("class") === "engs"){
						$en = str_replace("\n", ", ", trim($span->nodeValue));
					}					
				}
				if($fr !== "" && $en !== ""){
					echo cli::colorString("$fr <--> $en")."\n";
					Import::insert(array(":fr"=>$fr, ":en"=>$en, ":type"=>$type));
				}
			}	
		}
	} catch (Exception $e){
		cli::error($e->getMessage());
	}
?>