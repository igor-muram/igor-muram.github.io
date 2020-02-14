<!DOCTYPE html>
<html lang="ru">

<?php
$title = "Статья";
require("php/blocks/head.php");
?>

<body>
	<?php
	require("php/blocks/preloader.php");
	?>

	<div class="container">
		<?php
		require("php/blocks/header.php");
		require("php/article/article-main.php");
		require("php/blocks/footer.php");
		?>
	</div>
	

	<script src="js/scripts.min.js"></script>
</body>

</html>