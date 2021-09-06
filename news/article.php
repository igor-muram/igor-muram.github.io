<!DOCTYPE html>
<html lang="ru">

<?php
require_once("php/news.php");
$article = getArticleByID($_GET['id']);
$title = $article[0]['title'];
require_once("components/blocks/head.php");
?>

<body>
	<?php require_once("components/blocks/preloader.php"); ?>

	<div class="container">
		<?php
		require_once("components/blocks/header.php");
		require_once("templates/article-template.php");
		require_once("components/blocks/footer.php");
		?>
	</div>

	<?php
	require_once("components/modals/registration.php");
	require_once("components/modals/authorization.php");
	require_once("components/modals/contact.php");
	require_once("components/modals/change.php");
	require_once("components/modals/remove.php");
	?>

	<script src="js/scripts.min.js"></script>
</body>

</html>