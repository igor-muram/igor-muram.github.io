<?php  
$mysqli = false

function connectDB()
{
	global $mysqli = new mysqli("localhost", "root", "", "site");

	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
}