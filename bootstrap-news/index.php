<!DOCTYPE html>
<html lang="ru">

<?
require_once("components/blocks/head.php");
?>

<body>
	<? require_once("components/blocks/preloader.php"); ?>

	<div class="container">
		<?
		require_once("components/blocks/header.php");
		require_once("templates/index-template.php");
		require_once("components/blocks/footer.php");
		?>
	</div>

	<?
	require_once("components/modals/registration.php");
	require_once("components/modals/authorization.php");
	require_once("components/modals/contact.php");
	require_once("components/modals/add-news.php");
	?>


	<? if (isset($_SESSION['errors'])) : ?>
		<? foreach ($_SESSION['errors'] as $error) : ?>
			<div class="err">
				<? echo $error ?>
			</div>
		<? endforeach; ?>
		<? $_SESSION['errors'] = array() ?>
	<? endif; ?>


	<script src="js/scripts.min.js"></script>
</body>

</html>