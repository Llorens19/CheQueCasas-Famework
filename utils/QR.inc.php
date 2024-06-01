<?php
require __DIR__ . '/vendor/autoload.php';

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\Writer\PngWriter;

class QR
{
    public static function create()
    {
        return new Builder();
    }

    public static function QR_bill($html, $id_order)
    {
        $qr_url = SITE_ROOT . "QR/QR" . $id_order . ".png";
        error_log($qr_url);
        error_log($html);
        
        $base64Content = base64_encode($html);
        error_log($base64Content);
        
        $data_Url = 'data:text/html;base64,' . $base64Content;
        error_log($data_Url);
        try {
        $result = Builder::create()
            ->writer(new PngWriter())
            ->data($data_Url)
            ->encoding(new Encoding('UTF-8'))
            ->size(1000)
            ->margin(0.1)
            ->build();
        
        $result->saveToFile($qr_url);

        return $qr_url;

    } catch (Exception $e) {
        error_log("Error generating QR code: " . $e->getMessage());
        return false;
    }
    }

}

