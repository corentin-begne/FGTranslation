<?
	try{
		require_once(dirname(__FILE__)."/../config/require.php");
		$type = "Media - Planning";
		$url = "http://www.alcimia.com/lexique-francais-anglais-du-media-planning/" ;
		$html = utf8_decode(file_get_contents($url));
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		foreach($doc->getElementsByTagName("div") as $div){
			if($div->getAttribute("class") === "et_pb_text et_pb_bg_layout_light et_pb_text_align_left"){
				$lines = explode("\n", $div->nodeValue);
				foreach($lines as &$line){
					if(strpos($line, ':') !== false){
						$line = trim($line);
						$fr = trim(substr($line, 0, strpos($line, ':')));
						$en = str_replace(" :", ",",trim(substr($line, strpos($line, ':')+1)));
						echo cli::colorString("$fr <--> $en")."\n";
						if($fr !== "" && $en !== ""){
							Import::insert(array(":fr"=>$fr, ":en"=>$en, ":type"=>$type));
						}
					}
				}
			}
		}
	} catch (Exception $e){
		echo cli::error($e->getMessage());
	}		
?>