<?php
require_once("php/news.php");
$article = getArticleByID($_GET['id']);
?>

<main class="main">
	<div class="wrapper">

		<section class="article">
			<h1 class="article__title title">
				<?php echo $article[0]['title'] ?>
			</h1>

			<div class="article__img">
				<img src=<?php echo $article[0]['image'] ?> alt=<?php echo $article[0]['category'] ?>>
			</div>

			<div class="article__text">
				<p><?php echo $article[0]['full_text'] ?></p>
			</div>

			<div class="article__info">
				<div class="article__stats">
					<div class="likes">
						<span class="likes__count" data-likes="<?php echo $article[0]['likes'] ?>"><?php echo $article[0]['likes'] ?></span>

						<i class="fas fa-heart"></i>
					</div>

					<div class="comments">
						<span class="comments__count">50</span>

						<i class="fas fa-comment-alt"></i>
					</div>
				</div>

				<span class="article__date">
					<?php echo $article[0]['date'] ?>
				</span>
			</div>
		</section>

		<?php if (isset($_SESSION['account_type']) && $_SESSION['account_type'] === 'admin') : ?>
			<button class="btn btn--sm remove-link">Удалить</button>
			<button class="btn btn--sm change-link" type="submit">Изменить</button>
		<?php endif; ?>

	</div>

	<?php require_once("components/blocks/top.php"); ?>
</main>