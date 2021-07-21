<?
require_once("news.php");

$id = $_GET['id'];
$category = $_POST['input-category'];
$likes = $_POST['input-likes'];
$date = $_POST['input-date'];
$title = $_POST['input-title'];
$image = $_POST['input-image'];
$short = $_POST['input-short'];
$full = $_POST['input-full'];

updateArticle($id, $category, $likes, $date, $title, $image, $short, $full);

$location = "/news/article.php?id=" . $id;
header('Location: ' . $location);
