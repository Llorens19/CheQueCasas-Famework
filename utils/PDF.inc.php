<?php
require __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;

class PDF
{
    public static function create()
    {
        return new Dompdf();
    }

    public static function create_Bill($order, $user_order, $id_order)
    {
        $save_path = SITE_ROOT . 'pdf/';
        $html = self::html_creator($order, $user_order);


        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');  
        $dompdf->render();
        
        $output = $dompdf->output();
        $file_path = $save_path . 'factura' . $id_order . '.pdf';
        file_put_contents($file_path, $output);

      
        return $html;
    }

    
public static function html_creator($order, $user_order)
{
    $user_order_data = $user_order[0];
    $order_data = $order;
    
    // error_log(print_r($user_order_data, true));
    // error_log(print_r($order, true));
    // error_log($user_order_data['name_buyer'] . ' ' . $user_order_data['surname_buyer']);

    ob_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div>
        <h1>Factura</h1>
    </div>
    <div>
        <table>
            <tr>
                <th>ID Pedido</th>
                <td><?php echo htmlspecialchars($user_order_data['id_order']); ?></td>
            </tr>
            <tr>
                <th>Cliente</th>
                <td><?php echo htmlspecialchars($user_order_data['name_buyer'] . ' ' . $user_order_data['surname_buyer']); ?></td>
            </tr>
            <tr>
                <th>Email</th>
                <td><?php echo htmlspecialchars($user_order_data['email_buyer']); ?></td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td><?php echo htmlspecialchars($user_order_data['address_buyer'] . ', ' . $user_order_data['address2_buyer']); ?></td>
            </tr>
            <tr>
                <th>Fecha del Pedido</th>
                <td><?php echo htmlspecialchars($user_order_data['date_order']); ?></td>
            </tr>
        </table>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($order_data as $item): ?>
                <tr>
                    <td><?php echo htmlspecialchars($item['n_product']); ?></td>
                    <td><?php echo htmlspecialchars($item['d_product']); ?></td>
                    <td><?php echo htmlspecialchars($item['total_quantity']); ?></td>
                    <td><?php echo htmlspecialchars($item['price_product']); ?></td>
                    <td><?php echo htmlspecialchars($item['price_line']); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div>
        <p>Total: <?php echo htmlspecialchars($user_order_data['total_price']); ?> €</p>
    </div>
</body>
</html>

<?php
    return ob_get_clean();
}


}
