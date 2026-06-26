<?php
session_start();

$error = "";
$successMessage = "";
$prefilledEmail = "demo@example.com";
$prefilledPassword = "Welkom123!";

if (empty($_SESSION["csrf_token"])) {
    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
}

$email = trim($_POST["email"] ?? $prefilledEmail);
$wachtwoord = $_POST["password"] ?? $prefilledPassword;
$csrf = $_POST["csrf_token"] ?? "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!hash_equals($_SESSION["csrf_token"], $csrf)) {
        $error = "Ongeldige aanvraag.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Vul een geldig e-mailadres in.";
    } elseif (empty($wachtwoord)) {
        $error = "Vul je wachtwoord in.";
    } else {
        $expectedEmail = "demo@example.com";
        $expectedHash = "$2y$10$.TktVrB15QnIdKFFBJXZy.PXfbYPFlBsJwifUpL/gHGNaPl8jdJT.";

        if ($email === $expectedEmail && password_verify($wachtwoord, $expectedHash)) {
            session_regenerate_id(true);
            $_SESSION["user_id"] = 1;
            $_SESSION["email"] = $email;
            $successMessage = "Succesvol ingelogd";
        } else {
            $error = "E-mail of wachtwoord is onjuist.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Log In</title>

    <style>
        body {
            margin: 0;
            background-color: #dddddd;
            font-family: Arial, sans-serif;
        }

        .page-box {
            width: 91%;
            height: 625px;
            margin: 35px auto;
            background-color: white;
            border: 1.5px solid #2196f3;
            border-radius: 11px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-box {
            width: 495px;
            height: 277px;
            background-color: #eeeeee;
            border-radius: 8px;
            text-align: center;
            padding-top: 1px;
            box-sizing: border-box;
        }

        h1 {
            margin-top: -40px;
            margin-bottom: 32px;
            font-size: 30px;
            font-weight: bold;
            color: black;
            letter-spacing: 4px;
        }

        input {
            width: 450px;
            height: 40px;
            margin-bottom: 12px;
            padding-left: 10px;
            font-size: 16px;
            border: 1px solid #cccccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        button {
            width: 450px;
            height: 40px;
            background-color: #087df2;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background-color: #006bd1;
        }

        .error {
            color: red;
            margin-top: 15px;
            font-size: 14px;
        }

        .success {
            color: green;
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="page-box">
        <div class="login-box">
            <h1>Log In</h1>

            <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION["csrf_token"]); ?>">

                <input type="email" name="email" placeholder="E-mail" value="<?php echo htmlspecialchars($email); ?>" required>
                <input type="password" name="password" placeholder="Password" value="<?php echo htmlspecialchars($wachtwoord); ?>" required>

                <button type="submit">Log In</button>
            </form>

            <?php if (!empty($successMessage)): ?>
                <p class="success"><?php echo htmlspecialchars($successMessage); ?></p>
            <?php endif; ?>

            <?php if (!empty($error)): ?>
                <p class="error"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>
        </div>
    </div>

</body>
</html>