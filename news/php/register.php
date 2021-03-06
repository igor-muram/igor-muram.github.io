<?
session_start();
require_once("db.php");

$_SESSION['errors'] = array();

function isEmailExist($mysqli, $email)
{
    if (!($stmt = $mysqli->prepare("SELECT * FROM users WHERE email=?"))) return -1;
    if (!($stmt->bind_param('s', $email))) return -1;
    if (!$stmt->execute()) return -1;

    $result = $stmt->get_result();
    $stmt->close();

    return $result->num_rows === 0 ? 0 : 1;
}

function isPhoneExist($mysqli, $phone)
{
    if (!($stmt = $mysqli->prepare("SELECT * FROM users WHERE phone=?"))) return -1;
    if (!($stmt->bind_param('s', $phone))) return -1;
    if (!$stmt->execute()) return -1;

    $result = $stmt->get_result();
    $stmt->close();

    return $result->num_rows === 0 ? 0 : 1;
}

if (isset($_POST['signup'])) {
    connectDB();

    $name = $_POST['input-name'];
    $email = $_POST['input-email'];
    $phone = $_POST['input-phone'];
    $password = $_POST['input-password'];

    $emailCheck = isEmailExist($mysqli, $email);
    $phoneCheck = isPhoneExist($mysqli, $phone);

    if ($emailCheck === 0 && $phoneCheck === 0) {
        $stmt = $mysqli->prepare("INSERT INTO users (name, email, phone, password, type) VALUES (?, ?, ?, ?, 'user')");
        $stmt->bind_param('ssss', $name, $email, $phone, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        $_SESSION['user'] = $name;
        $_SESSION['account_type'] = 'users';
    }

    if ($emailCheck === 1)
        $_SESSION['errors'][] = "Такой E-mail уже зарегистрирован!";

    if ($emailCheck === -1)
        $_SESSION['errors'][] = "Неверный E-mail!";

    if ($phoneCheck === 1)
        $_SESSION['errors'][] = "Такой номер телефона уже зарегистрирован!";

    if ($phoneCheck === -1)
        $_SESSION['errors'][] = "Неверный номер телефона!";

    closeDB();
}

header('Location: /news/index.php');
