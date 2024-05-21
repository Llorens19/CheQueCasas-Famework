<?php
require __DIR__ . '/vendor/autoload.php';

use Twilio\Rest\Client;

class OTP
{
    public static function send_sms($content)
    {
        return self::send_OTP_twilio($content);
    }

    public static function send_OTP_twilio($values)
    {
        $OTP = parse_ini_file(UTILS . 'twilio.ini');
        $sid    = $OTP['OTP_API_SID'];
        $token  = $OTP['OTP_API_KEY'];

        $twilio = new Client($sid, $token);

        $message = $twilio->messages->create(
            $OTP['OTP_PHONE'], 
        array(
            "from" => "+14013133624", 
            "body" => $values['code'] 
        )
    );
    return $message->sid;

    }
}
