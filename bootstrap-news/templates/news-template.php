<?
require_once("php/news.php");
?>

<div class="news-item">
	<div class="news-item__dots">
		<i class="fas fa-circle"></i>
		<i class="fas fa-circle"></i>
		<i class="fas fa-circle"></i>
	</div>

	<div class="news-item__options">
		<a href="#!">Поделиться</a>
		<a href="#!">Скопировать картинку</a>
	</div>

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

<div class="popup popup-remove">
	<div class="popup__content">
		<button class="close">
			<i class="fas fa-times"></i>
		</button>

		<div class="popup-text">Вы уверены, что хотите удалить новость?</div>
		<form method="post">
			<input type="text" name="id" value="<? echo $news[$i]["id"] ?>">
			<button class="btn btn--md btn--remove js-yes" name="yes" type="submit">Да</button>
		</form>
		<button class="btn btn--md btn--remove js-no">Нет</button>
	</div>

	<div class="popup-preloader">
		<div class="preloader">
			<div class="load load-one"></div>
			<div class="load load-two"></div>
			<div class="load load-three"></div>
		</div>
	</div>

	<div class="confirm-text">Новость удалена.</div>
</div>