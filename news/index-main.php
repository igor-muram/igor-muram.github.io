<main>
	<div class="wrapper">

		<section id="news" class="news">
			<h1 class="news__title title">
				Новости спорта
			</h1>

			<div class="news-items">
				<?php
        // здесь в цикле загружается столько новостей, сколько надо
				require("news-item.php");
				?>
			</div> <!-- news-items end -->

			<div class="news__more">
				<div class="news__btn btn btn--md">Еще новости</div>
			</div>
		</section>

	</div>
</main>