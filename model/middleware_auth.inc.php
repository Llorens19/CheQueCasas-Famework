<?php

include($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/model/JWT.class.php');
class middleware{
static function decode_access_token($token)
{
    require_once $_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/model/JWT.class.php';

    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $secret = $jwt['JWT_SECRET'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

static function decode_refresh_token($token)
{
    require_once $_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/model/JWT.class.php';

    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $secret = $jwt['JWT_SECRET_2'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}


static function create_access_token($username)
{
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (6000) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}


static function create_refresh_token($username)
{
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET_2'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (12000) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}

static function create_recover_token($email)
{
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET_3'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (120) . '","email":"' .  $email .'"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}

static function decode_recover_token($token)
{
    require_once $_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/model/JWT.class.php';

    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CheQueHabitaculos_MVC/CheQueCasas_Framework/utils/constants.ini');
    $secret = $jwt['JWT_SECRET_3'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}



}