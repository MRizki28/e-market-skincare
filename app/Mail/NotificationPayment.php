<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotificationPayment extends Mailable
{
    use Queueable, SerializesModels;

    public $infoPayment;

    /**
     * Create a new message instance.
     */
    public function __construct($infoPayment)
    {
        $this->infoPayment = $infoPayment;
    }

    /**
     * Build the message.
     */

    public function build(){
        return $this->view('emails.notificationPayment')
        ->with([
            'name' => $this->infoPayment['name'],
            'email' => $this->infoPayment['email'],
            'amount' => $this->infoPayment['amount'],
            'payment_date' => $this->infoPayment['payment_date'],
            'payment_method' => $this->infoPayment['payment_method'],
            'payment_status' => $this->infoPayment['payment_status'],
        ])
        ->subject('Notification Payment');
    }
}
