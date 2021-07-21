<?
require_once("db.php");

function getArticles($limit)
{
	global $mysqli;
	connectDB();
	$stmt = $mysqli->prepare("SELECT * FROM articles ORDER BY id DESC LIMIT ?");

	if ($stmt->bind_param("i", $limit)) {
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();

		closeDB();
		return resultToArray($result);
	}

	closeDB();
}

function getArticleByID($id)
{
	global $mysqli;
	connectDB();

	$stmt = $mysqli->prepare("SELECT * FROM articles WHERE id = ?");

	if ($stmt->bind_param("i", $id)) {
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();

		closeDB();
		return resultToArray($result);
	}

	closeDB();
}


function deleteArticle($id)
{
	global $mysqli;
	connectDB();

	$stmt = $mysqli->prepare("DELETE FROM articles WHERE id = ?");

	if ($stmt->bind_param("i", $id))
		$stmt->execute();

	$stmt->close();
	closeDB();
}

function addArticle($category, $likes, $date, $title, $image, $short, $full)
{
	global $mysqli;
	connectDB();

	$stmt = $mysqli->prepare(
		"INSERT INTO articles (category, likes, date, title, image, short_text, full_text) VALUES (?, ?, ?, ?, ?, ?, ?)"
	);

	if ($stmt->bind_param("sisssss", $category, $likes, $date, $title, $image, $short, $full))
		$stmt->execute();

	$stmt->close();
	closeDB();
}

function updateArticle($id, $category, $likes, $date, $title, $image, $short, $full)
{
	global $mysqli;
	connectDB();

	$stmt = $mysqli->prepare(
		"UPDATE articles SET category = ?, likes = ?, date = ?, title = ?, image = ?, short_text = ?, full_text = ? WHERE id = ?"
	);

	if ($stmt->bind_param("sisssssi", $category, $likes, $date, $title, $image, $short, $full, $id))
		$stmt->execute();

	$stmt->close();
	closeDB();
}
