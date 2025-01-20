<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $country = $_POST['country'] ?? '';
    $currency = $_POST['currency'] ?? '';
    $notes = $_POST['notes'] ?? '';

    $to = "lanimysticl@gmail.com";
    $subject = "طلب شراء مكتبة المصمم";
    $message = "الاسم: $name\nرقم الهاتف: $phone\nالبريد الإلكتروني: $email\nالبلد: $country\nالعملة المفضلة: $currency\nملاحظات إضافية: $notes";
    $headers = "From: ahmedgodzillax@gmail.com";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo "تم الإرسال بنجاح";
    } else {
        http_response_code(500);
        echo "حدث خطأ أثناء الإرسال";
    }
} else {
    http_response_code(405);
    echo "طريقة الطلب غير مسموحة";
}
?>
