<?php
require_once("connections.php");
$mysqli = false;

function connectDB()
{
	global $mysqli, $host, $login, $password, $dbname;
	$mysqli = new mysqli($host, $login, $password, $dbname);

	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
}

function closeDB()
{
	global $mysqli;
	$mysqli->close();
}

function resultToArray($result)
{
	$array = array();
	
	for ($i = 0; ($row = $result->fetch_assoc()) != false; $i++) 
		$array[$i] = $row;
	
	return $array;
}
?>