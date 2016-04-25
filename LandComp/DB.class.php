<?php 

class DB extends PDO{

	public function Create($nome, $email,$telefone, $idade,$tabela){
		$data 	= 	date('Y/m/d  H:i:s');
		$stmt	= 	$this -> prepare("INSERT INTO $tabela (nome, email, telefone,idade, cadastro) VALUES (:nome,:email,:telefone,:idade,:data) ");
		$stmt	-> 	bindParam(':nome',$nome,PDO::PARAM_STR);
		$stmt	->	bindParam(':email',$email,PDO::PARAM_STR);
		$stmt	-> 	bindParam(':telefone',$telefone,PDO::PARAM_STR);
		$stmt	-> 	bindParam(':idade',$idade,PDO::PARAM_INT);
		$stmt 	-> 	bindValue(':data',$data);
		$stmt	->	execute();
		
	}



}


 ?>






