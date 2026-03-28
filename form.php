<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля.']);
        exit;
    }

    $token = "8748464741:AAF1iQfnk3WH2afjKJcY5nKaq7OdyISRc_Q";
    $chat_id = "1618059904";
    
    $text = "🎉 <b>Новая заявка с сайта!</b>\n\n";
    $text .= "👤 <b>Имя:</b> " . $name . "\n";
    $text .= "📞 <b>Телефон:</b> " . $phone . "\n";
    if (!empty($email)) {
        $text .= "📧 <b>Email:</b> " . $email . "\n";
    }

    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = array(
        'chat_id' => $chat_id,
        'text' => $text,
        'parse_mode' => 'HTML'
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );
    
    $context  = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);

    if ($result === FALSE) {
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке в Telegram.']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена!']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
}
?>
