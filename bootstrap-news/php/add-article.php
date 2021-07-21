<? require_once("news.php");

$category = $_POST['input-category'];
$likes = $_POST['input-likes'];
$date = $_POST['input-date'];
$title = $_POST['input-title'];
$image = $_POST['input-image'];
$short = $_POST['input-short'];
$full = $_POST['input-full'];

addArticle($category, $likes, $date, $title, $image, $short, $full);
header('Location: /news/index.php');
