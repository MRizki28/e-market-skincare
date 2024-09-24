<?php

namespace App\Helper;

use App\Mail\NotificationPayment;
use Illuminate\Support\Facades\Mail;

class EmailHandler {
    public static function sendEmail($email,$infoPayment){
        $data = [
            'name' => $infoPayment['name'],
            'email' => $infoPayment['email'],
            'amount' => $infoPayment['amount'],
            'payment_date' => $infoPayment['payment_date'],
            'payment_method' => $infoPayment['payment_method'],
            'payment_status' => $infoPayment['payment_status'],
        ];

        Mail::to($email)->send(new NotificationPayment($data));
    }
}