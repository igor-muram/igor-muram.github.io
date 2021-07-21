<?
session_start();
session_destroy();
header('Location: /news/index.php');
