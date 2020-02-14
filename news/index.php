<?php
session_start();
//require("functions.php"); 
//connectDB();
?>

<!DOCTYPE html>
<html lang="ru">

<?php
require("head.php");
?>

<body>
	<?php
	require("preloader.php");
	?>

	<div class="container">
		<?php
		require("header.php");
		require("index-main.php");
		require("footer.php");
		?>
	</div>


	<script src="js/scripts.min.js"></script>
</body>
</html>