<?
	try{
		require_once(dirname(__FILE__)."/../config/init.php");
		$categoryId = 2; // verbes irréguliers
		$url = "http://www.verbes-irreguliers-anglais.fr/" ;
		$html = utf8_decode(file_get_contents($url));
		$doc = new DOMDocument();
		$doc->loadHTML($html);
		foreach($doc->getElementById("zone_liste")->getElementsByTagName('tr') as $tr){
			if($tr->getElementsByTagName('td')->length > 0){
				$items = array();
				for($i=0; $i<4; $i++){
					if($i === 0){
						$items[] = trim($tr->getElementsByTagName('td')->item($i)->getElementsByTagName('strong')->item(0)->nodeValue);
					}else{
						$items[] = trim($tr->getElementsByTagName('td')->item($i)->nodeValue);
					}
				}
				if(count($items) === 4){
					ImportIrregular::insert(array(
						':fr'=>$items[3],
						':en'=>$items[0],
						':preterit'=>$items[1],
						':past'=>$items[2]
					));
					echo implode(' ', $items)."\n";
				}
			}	
		}
	} catch (Exception $e){
		echo cli::error($e->getMessage());
	}		
?>