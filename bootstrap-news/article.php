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
		require_once("templates/article-template.php");
		require_once("components/blocks/footer.php");
		?>
	</div>

	<?
	require_once("components/modals/registration.php");
	require_once("components/modals/authorization.php");
	require_once("components/modals/contact.php");
	require_once("components/modals/change.php");
	require_once("components/modals/remove.php");
	?>

	<script src="js/scripts.min.js"></script>
</body>

</html>