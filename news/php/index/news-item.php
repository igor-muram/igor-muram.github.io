<div class="news-item">
	<div class="news-item__img">
		<img src=<? echo $news[$i]["image"] ?> alt=<? echo $news[$i]["category"] ?>>

		<div class="news-item__info">
			<div class="news-item__info-title">
				<? echo $news[$i]["category"] ?>
			</div>

			<div class="news-item__info-stats">
				<div class="likes">
					<span class="likes__count" data-likes="<? echo $news[$i]["likes"] ?>"><? echo $news[$i]["likes"] ?></span>

					<i class="fas fa-heart"></i>
				</div>

				<div class="comments">
					<span class="comments__count">50</span>

					<i class="fas fa-comment-alt"></i>
				</div>
			</div>
		</div>

		<a class="news-item__img-link" href="article.php?id=<? echo $news[$i]["id"] ?>" target="_blank"></a>
	</div>

	<div class="news-item__text">
		<? echo $news[$i]["short_text"] ?>
	</div>

	<div class="news-item__footer">
		<a class="news-item__btn btn btn--sm" href="article.php?id=<? echo $news[$i]["id"] ?>" target="_blank">Подробнее</a>
		<div class="news-item__date"><? echo $news[$i]["date"] ?></div>
	</div>
</div>