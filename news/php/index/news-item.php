<div class="news-item">
	<div class="news-item__img">
		<img src=<?php echo $news[$i]["image"] ?>>

		<div class="news-item__info">
			<div class="news-item__info-title">
				<?php echo $news[$i]["category"] ?>
			</div>

			<div class="news-item__info-stats">
				<div class="likes">
					<span class="likes__count">221</span>

					<i class="fas fa-heart"></i>
				</div>

				<div class="comments">
					<span class="comments__count">50</span>

					<i class="fas fa-comment-alt"></i>
				</div>
			</div>
		</div>

		<a class="news-item__img-link" href="article.php?id=<?php echo $news[$i]["id"] ?>" target="_blank"></a>
	</div>

	<div class="news-item__text">
		<?php echo $news[$i]["short_text"] ?>
	</div>

	<div class="news-item__footer">
		<a class="news-item__btn btn btn--sm" href="article.php?id=<?php echo $news[$i]["id"] ?>" target="_blank">Подробнее</a>
		<div class="news-item__date"><?php echo $news[$i]["date"] ?></div>
	</div>
</div>