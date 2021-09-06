<?php
require_once("news.php");
 
$countView = (int)$_POST['count_add'];      // Количество записей, получаемых за один раз
$startIndex = (int)$_POST['count_show'];    // С какой записи начать выборку
$news = array();

$news = getArticles($startIndex, $countView);
 
if (empty($news)) {
    // Если новостей нет
    echo json_encode(array('result' => 'finish'));
} else {
    // Если новости получены из базы, то формируем html и отправляем клиенту
    $html = "";
    
    foreach ($news as $item) {
        $html .= "
            <div class=\"news-item\">
            	<div class=\"news-item__img\">
            		<img src={$item['image']} alt={$item['category']}>
            
            		<div class=\"news-item__info\">
            			<div class=\"news-item__info-title\">
            				{$item['category']}
            			</div>
            
            			<div class=\"news-item__info-stats\">
            				<div class=\"likes\">
            					<span class=\"likes__count\" data-likes=\"{$item['likes']}\">{$item['likes']}</span>
            
            					<i class=\"fas fa-heart\"></i>
            				</div>
            
            				<div class=\"comments\">
            					<span class=\"comments__count\">50</span>
            
            					<i class=\"fas fa-comment-alt\"></i>
            				</div>
            			</div>
            		</div>
            
            		<a class=\"news-item__img-link\" href=\"article.php?id={$item['id']}\" target=\"_blank\"></a>
            	</div>
            
            	<div class=\"news-item__text\">
            		{$item['short_text']}
            	</div>
            
            	<div class=\"news-item__footer\">
            		<a class=\"news-item__btn btn btn--sm\" href=\"article.php?id={$item['id']}\" target=\"_blank\">Подробнее</a>
            		<div class=\"news-item__date\">{$item['date']}</div>
            	</div>
            </div>
            
            <div class=\"popup popup-remove\">
            	<div class=\"popup__content\">
            		<button class=\"close\">
            			<i class=\"fas fa-times\"></i>
            		</button>
            
            		<div class=\"popup-text\">Вы уверены, что хотите удалить новость?</div>
            		<form method=\"post\">
            			<input type=\"text\" name=\"id\" value=\"{$item['id']}\">
            			<button class=\"btn btn--md btn--remove js-yes\" name=\"yes\" type=\"submit\">Да</button>
            		</form>
            		<button class=\"btn btn--md btn--remove js-no\">Нет</button>
            	</div>
            
            	<div class=\"popup-preloader\">
            		<div class=\"preloader\">
            			<div class=\"load load-one\"></div>
            			<div class=\"load load-two\"></div>
            			<div class=\"load load-three\"></div>
            		</div>
            	</div>
            
            	<div class=\"confirm-text\">Новость удалена.</div>
            </div>
        ";
    }
    
    echo json_encode(array(
        'result' => 'success',
        'html'   => $html
    ));
}

?>