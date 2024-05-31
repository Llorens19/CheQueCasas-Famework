<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;

class DompdfFactory
{
    public static function create()
    {
        return new Dompdf();
    }

    public static function createDompdf($order,$user_order, $id_order)
    {
        $id =$user_order[0]['id_order'];

        $html = html_creator($order, $user_order);

        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
        $dompdf->stream('factura' . $id . '.pdf', ['Attachment' => 0]);
    }
}


function html_creator($order, $user_order)
{
    $order_data = $user_order[0];

    ob_start(); 
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Factura</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                margin: 0;
            }
            .details, .items {
                margin-bottom: 20px;
            }
            .details th, .details td, .items th, .items td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            .total {
                text-align: right;
                margin-top: 20px;
                font-size: 1.2em;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Factura</h1>
        </div>
        <div class="details">
            <table width="100%">
                <tr>
                    <th>ID Pedido</th>
                    <td><?php echo htmlspecialchars($order_data['id_order']); ?></td>
                </tr>
                <tr>
                    <th>Cliente</th>
                    <td><?php echo htmlspecialchars($order_data['name_buyer'] . ' ' . $order_data['surname_buyer']); ?></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><?php echo htmlspecialchars($order_data['email_buyer']); ?></td>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <td><?php echo htmlspecialchars($order_data['address_buyer'] . ', ' . $order_data['address2_buyer']); ?></td>
                </tr>
                <tr>
                    <th>Fecha del Pedido</th>
                    <td><?php echo htmlspecialchars($order_data['date_order']); ?></td>
                </tr>
            </table>
        </div>
        <div class="items">
            <table width="100%">
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
                    <?php foreach ($order as $item): ?>
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
        <div class="total">
            <p>Total: $<?php echo htmlspecialchars($order_data['total_price']); ?></p>
        </div>
        <div class="footer">
            <p>Gracias por su compra</p>
        </div>
    </body>
    </html>
    <?php
    return ob_get_clean();
}

