<div class="popup popup-registration">
	<div class="popup__content">
		<button class="close">
			<i class="fas fa-times"></i>
		</button>

		<h3 class="title popup__title">Регистрация</h3>

		<form class="form">
			<div class="form__group">
				<label class="form__label" for="input-name">Фамилия и имя</label>
				<input class="form__input" name="input-name" type="text" placeholder="Введите фамилию и имя" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-email">E-mail</label>
				<input class="form__input" name="input-email" type="email" placeholder="Введите E-mail" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-phone">Телефон</label>
				<input class="form__input" name="input-phone" type="tel" placeholder="Введите номер" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-password">Пароль</label>
				<input class="form__input" name="input-password" type="password" placeholder="Введите пароль" required>
			</div>

			<button class="btn btn--sm" type="submit">Зарегистрироваться</button>
			<input class="btn btn--sm reset" type="reset" placeholder="Сбросить">
		</form>
	</div>
</div>