<? $new = getNewByID($_GET['id']); ?>

<main class="main">
	<div class="wrapper">

		<section class="article">
			<h1 class="article__title title">
				<? echo $new[0]["title"] ?>
			</h1>

			<div class="article__img">
				<img src=<? echo $new[0]["image"] ?> alt=<? echo $new[0]["category"] ?>>
			</div>

			<div class="article__text">
				<p><? echo $new[0]["full_text"] ?></p>
			</div>

			<div class="article__info">
				<div class="article__stats">
					<div class="likes">
						<span class="likes__count" data-likes="<? echo $new[0]["likes"] ?>"><? echo $new[0]["likes"] ?></span>

						<i class="fas fa-heart"></i>
					</div>

					<div class="comments">
						<span class="comments__count">50</span>

						<i class="fas fa-comment-alt"></i>
					</div>
				</div>

				<span class="article__date">
					<? echo $new[0]["date"] ?>
				</span>
			</div>
		</section>

	</div>

	<? require("php/blocks/top.php"); ?>
</main>