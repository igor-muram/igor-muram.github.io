<!DOCTYPE html>
<html lang="ru">

<?
$title = "Статья";
require("php/blocks/head.php");
?>

<body>
	<? require("php/blocks/preloader.php"); ?>

	<div class="container">
		<?
		require("php/blocks/header.php");
		require("php/article/article-main.php");
		require("php/blocks/footer.php");
		?>
	</div>

	<?
	require("php/modals/registration.php");
	require("php/modals/authorization.php");
	require("php/modals/contact.php");
	require("php/modals/remove.php");
	require("php/modals/change.php");
	require("php/modals/add-news.php");
	?>
	

	<script src="js/scripts.min.js"></script>
</body>

</html>