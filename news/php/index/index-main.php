<?php 
$news = getNews(6);
?>

<main class="main">
	<div class="wrapper">

		<section id="news" class="news">
			<h1 class="news__title title">
				Новости спорта
			</h1>

			<div class="news-items">
				<?php
				for($i = 0; $i < count($news); $i++) 
					require("news-item.php");
				?>
			</div>

			<div class="news__more">
				<div class="news__btn btn btn--md">Еще новости</div>
			</div>
		</section>

	</div>

	<?php
	require("php/blocks/top.php");
	?>
</main>