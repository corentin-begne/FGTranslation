<?
	class generate{
		public static function schema(){
			$indents = array("  ", "    ");
			$schemaYml = requireCore::$basePath.'/config/yml/schema.yml';
			$content = '';
			// save old schema
			if(file_exists($schemaYml)){
				exec("mv $schemaYml $schemaYml.BAK".time());
			}
			// get tables list
			pdoManager::prepare('show tables');
			pdoManager::execute();
			$tables = pdoManager::$statement->fetchAll(PDO::FETCH_NUM);			
			foreach($tables as &$table){
				$name = $table[0];				
				$content .= "$name:\n".
					$indents[0]."columns:\n";					
				/** get columns table desc */
				pdoManager::prepare("desc $name");
				pdoManager::execute();
				$fields = pdoManager::$statement->fetchAll();
				foreach($fields as &$field){
					$content .= $indents[1].$field['Field'].': ';
					$content .= '{type: '.$field['Type'];
					$content .= ', null: '.(($field['Null'] === 'NO') ? "false" : "true");
					$content .= (isset($field['Default'])) ? ', default: '.$field['Default'] : '';
					$content .= (isset($field['Extra'])) ? ', extra: '.$field['Extra'] : '';
					$content .= (isset($field['Key'])) ? ', Key: '.$field['Key'] : '';
					$content .= "}\n";

				}	
				/** get table relations desc */
				/*pdoManager::prepare("show index from $name");
				pdoManager::execute();
				$indexes = pdoManager::$statement->fetchAll();
				var_dump($indexes); die;*/		
			}
			file_put_contents($schemaYml, $content);
		}

		public static function module($module){
		    $targetPath = requireCore::$basePath."/module/".$module;
		    $sourcePath = dirname(__FILE__)."/template/php/module";
		    if(!file_exists($targetPath)){
				exec("mkdir -p $targetPath");
			}
		    $files = glob($sourcePath.'/*.*');
		    foreach($files as &$file){
		      $targetFile = $targetPath."/".basename($file);
		      if(!file_exists($targetFile)){
		        $content = file_get_contents($file);
		        $content = str_replace("module", $module, $content);
		        file_put_contents($targetFile, $content);
		      }
		    }
		    exec("cp -r $sourcePath/view $targetPath");
		}

		public static function task($name){
		    $targetFile = requireCore::$basePath."/task/$name.class.php";
		    $sourcePathFile = dirname(__FILE__)."/template/php/task/template.class.php";
			if(!file_exists($targetFile)){
				$content = file_get_contents($sourcePathFile);
				$content = str_replace("template", $name, $content);
				file_put_contents($targetFile, $content);
				echo $targetFile."\n";
			}
		}

		public static function models(){
		    $targetPath = requireCore::$basePath."/model";
		    $sourcePathFile = dirname(__FILE__)."/template/php/model/template.class.php";
			$shemaYml = yaml_parse_file(requireCore::$basePath.'/config/yml/schema.yml');	
		    foreach($shemaYml as $table => &$desc){
		      $targetFile = $targetPath.'/'.lcfirst($table).'.class.php';
		      if(!file_exists($targetFile)){
		        $content = file_get_contents($sourcePathFile);
		        $content = str_replace("Template", $table, $content);
		        file_put_contents($targetFile, $content);
		        echo $targetFile."\n";
		      }
		    }
		}

		public static function javascript($module, $action=null){
		    $path = "/".$module.(isset($action) ? "/".$action : "");
		    $name = isset($action) ? $action.ucfirst($module) : $module;
		    $tags = array("templateManager", "TemplateManager", "template", "Template", "module");
		    $replaces = array($name."Manager", ucfirst($name)."Manager", $name, ucfirst($name), $module);
		    $targetPath = requireCore::$basePath."/web/js".$path;
		    $sourcePath = dirname(__FILE__)."/template/js";
		    if(!file_exists($targetPath)){
				exec("mkdir -p $targetPath");
			}
		    $files = glob($sourcePath.'/*.js');
		    foreach($files as &$file){
		      $targetFile = $targetPath."/".basename($file);
		      if(!file_exists($targetFile)){		        
		        if(!isset($action) || basename($file) !== "action.js"){
		        	$content = file_get_contents($file);
		        	$content = str_replace($tags, $replaces, $content);
		        	file_put_contents($targetFile, $content);
		        }	
		      }
		    } 
		}

		public static function stylesheet($module, $action=null){
		    $path = "/".$module.(isset($action) ? "/".$action : "");
		    $replace = isset($action) ? true : false;
		    $targetPath = requireCore::$basePath."/web/css".$path;
		    $sourcePath = dirname(__FILE__)."/template/css";
		    if(!file_exists($targetPath)){
				exec("mkdir -p $targetPath");
			}
		    $files = glob($sourcePath.'/*.less');
		    foreach($files as &$file){
		      $targetFile = $targetPath."/".basename($file);
		      if(!file_exists($targetFile)){
		        $content = file_get_contents($file);
		        if($replace){
		        	$content = str_replace("../", "../../", $content);
		        }
		        file_put_contents($targetFile, $content);
		      }
		    } 
		}
	}
?>