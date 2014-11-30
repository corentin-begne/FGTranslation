<?
	try{
		require_once(dirname(__FILE__)."/../config/require.php");
		$baseUrl = "http://www.babelcoach.net";
		$url = "$baseUrl/fr/vocabulaire_anglais/vocabulaire_thematique_index" ;
		$html = file_get_contents($url);
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		foreach($doc->getElementById("vocabulaire_anglais_index")->getElementsByTagName("a") as $a){
			if($a->getAttribute("class") == "textLnk"){
				echo cli::colorString(a->nodeValue)."\n";
				importData($baseUrl.$a->getAttribute("href"), trim($a->nodeValue));
			}
		}
	} catch (Exception $e){
		echo cli::error($e->getMessage());
	}
	function importData($url, $type){
		$html = file_get_contents($url);
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		foreach($doc->getElementsByTagName("table") as $table){
			if($table->getAttribute("class") == "v3Table"){
				foreach($table->getElementsByTagName("tr") as $tr)
				{
					$fr = "";
					$en = "";
					foreach($tr->getElementsByTagName("td") as $td){
						if($td->getAttribute("class") == "first"){
							$en = trim($td->nodeValue);
						}else if($td->getAttribute("class")){
							$fr = trim($td->nodeValue);
						}						
					}
					echo cli::colorString("$fr <--> $en")."\n";
					if($fr !== "" && $en !== ""){						
						Import::insert(array(":fr"=>$fr, ":en"=>$en, ":type"=>$type));
					}
				}
			}
		}
	}
?>