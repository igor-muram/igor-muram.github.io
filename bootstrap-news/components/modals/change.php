<div class="popup popup-change">
    <div class="popup__content">
        <button class="close">
            <i class="fas fa-times"></i>
        </button>

        <form class="form" method="post" action="php/update-article.php?id=<? echo $article[0]['id']; ?>">
            <div class="form__group">
                <label class="form__label" for="input-category">Категория</label>
                <input class="form__input" name="input-category" type="text" placeholder="Введите категорию" value="<?= $article[0]['category'] ?>" required>
            </div>

            <div class="form__group">
                <label class="form__label" for="input-likes">Количество лайков</label>
                <input class="form__input" name="input-likes" type="number" placeholder="Введите количество лайков" value="<?= $article[0]['likes'] ?>" required>
            </div>

            <div class="form__group">
                <label class="form__label" for="input-date">Дата (гггг-мм-дд)</label>
                <input class="form__input" name="input-date" type="datetime" placeholder="Выберите дату" value="<?= $article[0]['date'] ?>" required pattern="2[0-9]{3}-(0[1-9]|[1][0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])">
            </div>

            <div class="form__group">
                <label class="form__label" for="input-title">Заголовок</label>
                <input class="form__input" name="input-title" type="text" placeholder="Введите заголовок" value="<?= $article[0]['title'] ?>" required>
            </div>

            <div class="form__group">
                <label class="form__label" for="input-image">Картинка</label>
                <input class="form__input" name="input-image" type="url" placeholder="Вставьте ссылку на картинку" value="<?= $article[0]['image'] ?>" required>
            </div>

            <div class="form__group">
                <label class="form__label" for="input-short">Краткое описание</label>
                <input class="form__input" name="input-short" type="text" placeholder="Введите краткое описание" value="<?= $article[0]['short_text'] ?>" required>
            </div>

            <div class="form__group">
                <label class="form__label" for="input-full">Текст новости</label>
                <textarea class="form__textarea" name="input-full" placeholder="Введите текст новости" required><?= $article[0]["full_text"] ?></textarea>
            </div>

            <button class="btn btn--sm" type="submit" name="update">Изменить</button>
        </form>
    </div>
</div>