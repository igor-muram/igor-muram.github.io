<?
session_start();
require_once("db.php");

$_SESSION['errors'] = array();

function authorizeByEmail($mysqli)
{
    $email = $_POST['input-email'];
    $password = $_POST['input-password'];

    $stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows === 1) {
        $rows = resultToArray($result);
        $_SESSION['user'] = $rows[0]['name'];
        $_SESSION['account_type'] = $rows[0]['type'];
    } else
        $_SESSION['errors'][] = "Wrong e-mail or password";
}

function authorizeByPhone($mysqli)
{
    $phone = $_POST['input-phone'];
    $password = $_POST['input-password'];

    $stmt = $mysqli->prepare("SELECT * FROM users WHERE phone = ? AND password = ?");
    $stmt->bind_param("ss", $phone, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows === 1) {
        $rows = resultToArray($result);
        $_SESSION['user'] = $rows[0]['name'];
        $_SESSION['account_type'] = $rows[0]['type'];
    } else
        $_SESSION['errors'][] = "Wrong phone or password";
}

if (isset($_POST['login'])) {
    connectDB();

    if (isset($_POST['input-email']))
        authorizeByEmail($mysqli);
    if (isset($_POST['input-phone']))
        authorizeByPhone($mysqli);

    closeDB();
}

header('Location: /news/index.php');
