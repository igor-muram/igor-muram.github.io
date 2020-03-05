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
	

	<script src="js/scripts.min.js"></script>
</body>

</html>