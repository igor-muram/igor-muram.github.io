<?
require_once("news.php");
$id = $_GET["id"];
deleteArticle($id);
header('Location: /news/index.php');
