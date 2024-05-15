<?php
require __DIR__ . '/vendor/autoload.php';

class mail
{
    public static function send_email($email)
    {
        switch ($email['type']) {
            case 'contact';
                $email['title'] = 'Email verification';
                $email['message'] = "<h2>Email verification.</h2><a href='http://localhost/CheQueHabitaculos_MVC/CheQueCasas_Framework/index.php?module=login&op=verify/$email[token]'>Click here for verify your email.</a>";
                break;
            case 'validate';
              
                $email['title'] = 'Email verification';
                $email['message'] = "<h2>Email verification.</h2><a href='http://localhost/CheQueHabitaculos_MVC/CheQueCasas_Framework/login/verify/$email[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                
                $email['title'] = 'Recover password';
                $email['message'] = "<a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_mail_resend($email);
    }

    public static function send_mail_resend($values)
    {
        $jwt = parse_ini_file(UTILS . 'resend.ini');
        
        $apy_key = $jwt['MAIL_APY_KEY'];
        $from = $jwt['MAIL_FROM'];


        $resend = Resend::client($apy_key );

        try {
            $result = $resend->emails->send([
                'from' => 'Acme <'. $from .'>',
                'to' => ['llorenssorianodiego@gmail.com'],
                'subject' => $values['title'],
                'html' =>$values['message'],
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        return $result->toJson();
    }
}
