<?php 
require_once('../core/DB.class.php');
$db = new DB("mysql:host=localhost;dbname=compuway_db", "compuway_user","sk36compuway");
switch ($_POST['acao']) {
	case "cadastro":
		$nome 		= $_POST['name'];
		$email 		= $_POST['email'];
		$telefone 	= $_POST['telefone'];
		$idade 		= $_POST['idade'];
		$soma 		= $_POST['captcha'];
		
		if (empty($nome) || empty($email) || empty($telefone) || empty($soma)|| empty($idade)) {
		
			echo "1";
		
		}else {
			if ($soma != "13") {
				echo "3";
			}else{
				
				$db -> Create($nome, $email,$telefone,$idade,$tabela);
				
				
				
			}
		}

	break;
	
	default:

		echo "2";
	
	break;
}




 ?>