<div class="popup popup-authorization">
	<div class="popup__content">
		<button class="close">
			<i class="fas fa-times"></i>
		</button>

		<h3 class="title popup__title">Авторизация</h3>

		<form class="form tab-form active" method="post" action="php/login.php">
			<div class="form__group">
				<label class="form__label" for="input-email">E-mail</label>
				<input class="form__input" name="input-email" type="email" placeholder="Введите E-mail" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-password">Пароль</label>
				<input class="form__input" name="input-password" type="password" placeholder="Введите пароль" required>
			</div>

			<div class="form__footer">
				<button class="btn btn--sm" type="submit" name="login">Войти</button>
				<a href="#!" class="forgot">Забыли пароль?</a>
			</div>
		</form>

		<form class="form tab-form" method="post" action="php/login.php">
			<div class="form__group">
				<label class="form__label" for="input-phone">Телефон</label>
				<input class="form__input" name="input-phone" type="tel" placeholder="Введите номер" required>
			</div>

			<div class="form__group">
				<label class="form__label" for="input-password">Пароль</label>
				<input class="form__input" name="input-password" type="password" placeholder="Введите пароль" required>
			</div>

			<div class="form__footer">
				<button class="btn btn--sm" type="submit" name="login">Войти</button>
				<a href="#!" class="forgot">Забыли пароль?</a>
			</div>
		</form>
	</div>

	<div class="tabs">
		<label class="tab active">Вход по E-mail</label>
		<label class="tab">Вход по номеру</label>
	</div>
</div>