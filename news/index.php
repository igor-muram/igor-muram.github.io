<!DOCTYPE html>
<html lang="ru">

<?php
$title="Новости";
require_once("components/blocks/head.php");
?>

<body>
	<?php
	
	require_once("components/blocks/preloader.php"); ?>

	<div class="container">
		<?php
		require_once("components/blocks/header.php");
		require_once("templates/index-template.php");
		require_once("components/blocks/footer.php");
		?>
	</div>

	<?php
	require_once("components/modals/registration.php");
	require_once("components/modals/authorization.php");
	require_once("components/modals/contact.php");
	require_once("components/modals/add-news.php");
	?>


	<?php if (isset($_SESSION['errors'])) : ?>
		<?php foreach ($_SESSION['errors'] as $error) : ?>
			<div class="error">
				<?php echo $error ?>
			</div>
		<?php endforeach; ?>
		<?php $_SESSION['errors'] = array() ?>
	<?php endif; ?>


	<script src="js/scripts.min.js"></script>
</body>

</html>