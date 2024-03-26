<?php

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo '<div class="alert alert-error">Invalid request.</div>';
    exit;
}

$myemail = 'contact@enclosurespecialist.com';
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
// $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$comments = filter_input(INPUT_POST, 'comments', FILTER_SANITIZE_STRING);
$service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
$sourcePage = filter_input(INPUT_POST, 'source', FILTER_SANITIZE_STRING);
if (empty($phone) || empty($service)) {
    echo '<div class="alert alert-error">Please fill out all required fields.</div>';
    exit;
}

// Check if all fields are empty
if (empty($name)  && empty($phone)  && empty($service)) {
    echo '<div class="alert alert-error">Please fill out at least one field.</div>';
    exit;
}

$email_subject = "Contact form submission: $name";
$email_body = "Name: $name \n Phone Number: $phone \n Service: $service \n Comments: $comments \n Source Page: $sourcePage";
$headers = "From: no-reply@enclosurespecialist.com";
$headers .= "\r\nReply-To: $email";

if(mail($myemail, $email_subject, $email_body, $headers)) {
    echo "<div class='alert alert-success'><h3>Email Sent Successfully.</h3><p>Thank you, your message has been submitted to us.</p></div>";
} else {
    echo 'ERROR!';
}
?>
