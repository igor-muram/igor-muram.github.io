<div class="popup popup-add-news">
	<div class="popup__content">
		<button class="close">
			<i class="fas fa-times"></i>
		</button>

		<form class="form" method="post" action="php/add-article.php">
			<div class="form__group">
				<label class="form__label" for="input-category">Категория</label>
				<input class="form__input" name="input-category" type="text" placeholder="Введите категорию" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-likes">Количество лайков</label>
				<input class="form__input" name="input-likes" type="number" placeholder="Введите количество лайков" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-date">Дата (гггг-мм-дд)</label>
				<input class="form__input" name="input-date" type="datetime" placeholder="Выберите дату" required pattern="2[0-9]{3}-(0[1-9]|[1][0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])">
			</div>

			<div class="form__group">
				<label class="form__label" for="input-title">Заголовок</label>
				<input class="form__input" name="input-title" type="text" placeholder="Введите заголовок" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-image">Картинка</label>
				<input class="form__input" name="input-image" type="url" placeholder="Вставьте ссылку на картинку" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-short">Краткое описание</label>
				<input class="form__input" name="input-short" type="text" placeholder="Введите краткое описание" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-full">Текст новости</label>
				<textarea class="form__textarea" name="input-full" placeholder="Введите текст новости" required></textarea>
			</div>

			<button class="btn btn--sm" type="submit" name="add">Добавить</button>
			<input class="btn btn--sm reset" type="reset" placeholder="Сбросить">
		</form>
	</div>
</div>