<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo '<div class="alert alert-error">Invalid request.</div>';
    exit;
}

$myemail = 'contact@enclosurespecialist.com';
$name = trim((string) filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$phone = trim((string) filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$comments = trim((string) filter_input(INPUT_POST, 'comments', FILTER_UNSAFE_RAW));
$service = trim((string) filter_input(INPUT_POST, 'service', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$sourcePage = trim((string) filter_input(INPUT_POST, 'source', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$estimateDetails = trim((string) filter_input(INPUT_POST, 'estimate_details', FILTER_UNSAFE_RAW));

if ($phone === '' || $service === '') {
    echo '<div class="alert alert-error">Please fill out all required fields.</div>';
    exit;
}

if ($name === '' && $phone === '' && $service === '') {
    echo '<div class="alert alert-error">Please fill out at least one field.</div>';
    exit;
}

$subjectName = $name !== '' ? $name : 'Estimate request';
$email_subject = "Contact form submission: $subjectName";

$lines = [
    "Name: $name",
    "Phone Number: $phone",
    "Service: $service",
    "Source Page: $sourcePage"
];

if ($comments !== '') {
    $lines[] = "Comments: $comments";
}

if ($estimateDetails !== '') {
    $lines[] = '';
    $lines[] = 'Estimate Details:';
    $lines[] = $estimateDetails;
}

$email_body = implode("\n", $lines);
$headers = "From: no-reply@enclosurespecialist.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

if (mail($myemail, $email_subject, $email_body, $headers)) {
    echo "<div class='alert alert-success'><h3>Email Sent Successfully.</h3><p>Thank you, your message has been submitted to us.</p></div>";
} else {
    echo "<div class='alert alert-error'>Error processing request.</div>";
}
?>