<?php  
require("connections.php");
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

function getNews($limit)
{
	global $mysqli;
	connectDB();
	$result = $mysqli->query("SELECT * FROM articles ORDER BY id DESC LIMIT $limit");
	closeDB();
	return resultToArray($result);
}

function getNewByID($id)
{
	global $mysqli;
	connectDB();
	$result = $mysqli->query("SELECT * FROM articles WHERE id = $id");
	closeDB();

	return resultToArray($result);
}

function resultToArray($result)
{
	$array = array();
	while(($row = $result->fetch_assoc()) != false)
		$array[] = $row;

	return $array;
}
?>