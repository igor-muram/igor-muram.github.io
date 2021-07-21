<div class="popup popup-remove">
    <div class="popup__content">
        <button class="close">
            <i class="fas fa-times"></i>
        </button>

        <div class="popup-text">Вы уверены, что хотите удалить новость?</div>

        <form method="post" action="php/delete-article.php?id=<?= $article[0]['id'] ?>">
            <button class="btn btn--sm" type="submit">Да</button>
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