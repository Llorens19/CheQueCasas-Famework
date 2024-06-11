function loadCart() {

    ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'loadCart' })
        .then(function (data) {

            for (row in data) {

                $("<li></li>").attr('class', 'list-group-item d-flex justify-content-between align-items-center item_cart rounded col-lg-12').attr('id', "line_" + data[row].id_line)
                    .appendTo('.list_cart')
                    .html(`
            <div class="form-check d-flex align-items-center col-lg-3">
                <input class="form-check-input selected_line selected_line_`+ data[row].id_line + `" type="checkbox" id="` + data[row].id_line + `">
                <label class="form-check-label mx-2" for="checkbox1">
                    <img src="`+ absoluteURL('view/img/cart/' + data[row].image_url) + `" alt="Producto 1" style="width: 150px; height: 100px;">
                    
                </label>
            </div>

            <div class = "col-lg-3">
                <h5 class="my-0">`+ data[row].n_product + `</h5>
                <p class="text-muted">`+ data[row].d_product + `</p>
            </div>
            
            <div class="d-flex align-items-center col-lg-6">
                <div class="d-flex align-items-center col-lg-4">
                    <button class="btn btn-secondary btn-sm decrement" id="`+ data[row].id_line + `" = >-</button>
                    <input type="number" class="form-control form-control-sm mx-2 text-center input_card_`+ data[row].id_line + `" value="` + data[row].total_quantity + `" min="1" max= "` + data[row].stock + `" style="width: 60px;">
                    <button class="btn btn-secondary btn-sm increment" id="`+ data[row].id_line + `">+</button>
                </div> 
                <div class="d-flex align-items-center col-lg-4">
                    <h6 class="text-muted mx-2">`+ data[row].price_product + `</h6>
                </div>
                <div class="d-flex align-items-center col-lg-4">
                    <button class="btn btn-danger btn-sm delete_line_cart" id="`+ data[row].id_line + `">Eliminar</button>
                </div>
                </div>
                
        `);

                if (data[row].selected == 1) {
                    $(".selected_line_" + data[row].id_line).prop('checked', true);
                }

            }
            buttons_cart();
            total_money();

        })
        .catch(function () {
            console.error('error');
        });
}




function increment() {
    $(".increment").click(function () {

        let id = $(this).attr('id');
        let input = $(".input_card_" + id);
        let value = parseInt(input.val()) + 1;
        let max = parseInt(input.attr('max'));
        if (value <= max) {
            input.val(value);
            ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'increment', id_line: id })
                .then(function (data) {
                    
                    total_money()
                })
                .catch(function () {
                    console.error('error');
                });
        }
    });


}
function decrement() {
    $(".decrement").click(function () {

        let id = $(this).attr('id');
        let input = $(".input_card_" + id);
        let value = parseInt(input.val()) - 1;
        let min = parseInt(input.attr('min'));
        if (value >= min) {
            input.val(value);
            ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'decrement', id_line: id })
                .then(function (data) {
                    total_money();
                })
                .catch(function () {
                    console.error('error');
                });
        }
    });
}

function deleteLine() {
    $(".delete_line_cart").click(function () {
        
        let id = $(this).attr('id');
     
        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'delete_line_cart', id_line: id })
            .then(function (data) {
               
                // $(".list_cart").empty();
                // loadCart();
                $("#line_" + id).remove();
                total_money();
            })
            .catch(function () {
                console.error('error');
            });
    });

}

function selected_line() {
    $(".selected_line").click(function () {
        
        let id = $(this).attr('id');
        


        let state = $(this).prop('checked');
        let state_bd = state ? 1 : 0;
    


        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'selected_line', id_line: id, state: state_bd })
            .then(function (data) {
                total_money();
            })
            .catch(function () {
                console.error('error');
            });

    });

}

function total_money() {

    ajaxPromise("POST", "JSON", friendlyURL("?module=cart"), { op: "total_money" })
        .then(function (data) {
            if (data[0].total == null) {
                $(".total_money").html("Total: 0.00 €");
            } else {
                $(".total_money").html("Total:  " + data[0].total + "€");
            }
        })
        .catch(function () {
            console.error("error");
        });
}

function validate_buy_data() {
    let name_ex = /^[a-zA-Z\s]{3,30}$/;
    let surnames_ex = /^[a-zA-Z\s]{3,30}$/;
    let direction_ex = /^[a-zA-Z0-9\s]{3,30}$/;
    let name_card_ex = /^[a-zA-Z\s]{3,50}$/;
    let credit_card_ex = /^[0-9]{16}$/;
    let cvv_ex = /^[0-9]{3}$/;
    let expiration_date_ex = /^[0-9]{2}[/][0-9]{2}$/;

    let name = document.getElementById('firstName').value;
    let surnames = document.getElementById('lastName').value;
    let direction = document.getElementById('address').value;
    let direction2 = document.getElementById('address2').value;
    let name_card = document.getElementById('nameCard').value;
    let credit_card = document.getElementById('creditCard').value;
    let expiration_date = document.getElementById('expiration').value;
    let cvv = document.getElementById('cvv').value;
    let error = false;

    if (name.length === 0) {
        document.getElementById('firstName_error').innerHTML = "El campo es obligatorio";
        let error = true;
    } else {

        if (!name_ex.test(name)) {
            document.getElementById('firstName_error').innerHTML = "El nombre no es valido";
            error = true;
        } else {
            document.getElementById('firstName_error').innerHTML = "";
        }
    }

    if (surnames.length === 0) {
        document.getElementById('lastName_error').innerHTML = "El campo es obligatorio";
        let error = true;

    } else {

        if (!surnames_ex.test(surnames)) {
            document.getElementById('lastName_error').innerHTML = "Los apellidos no son validos";
            error = true;
        } else {
            document.getElementById('lastName_error').innerHTML = "";
        }
    }

    if (direction.length === 0) {
        document.getElementById('address_error').innerHTML = "El campo es obligatorio";
        let error = true;

    } else {

        if (!direction_ex.test(direction)) {
            document.getElementById('address_error').innerHTML = "La direccion no es valida";
            error = true;
        } else {
            document.getElementById('address_error').innerHTML = "";
        }
    }

    if (direction2.length === 0) {
        document.getElementById('address2_error').innerHTML = "";


    } else {
        if (!direction_ex.test(direction2)) {
            document.getElementById('address2_error').innerHTML = "La direccion 2 no es valida";
            error = true;
        } else {
            document.getElementById('address2_error').innerHTML = "";
        }
    }

    if (name_card.length === 0) {
        document.getElementById('nameCard_error').innerHTML = "El campo es obligatorio";
        let error = true;

    } else {

        if (!name_card_ex.test(name_card)) {
            document.getElementById('nameCard_error').innerHTML = "El nombre de la tarjeta no es valido";
            error = true;
        } else {
            document.getElementById('nameCard_error').innerHTML = "";
        }
    }


    if (credit_card.length === 0) {
        document.getElementById('creditCard_error').innerHTML = "El campo es obligatorio";
        let error = true;

    } else {
        if (!credit_card_ex.test(credit_card)) {
            document.getElementById('creditCard_error').innerHTML = "La tarjeta de credito no es valida";
            error = true;
        } else {
            document.getElementById('creditCard_error').innerHTML = "";
        }
    }

    if (expiration_date.length === 0) {
        document.getElementById('expiration_error').innerHTML = "El campo es obligatorio";
        let error = true;

    } else {
        if (!expiration_date_ex.test(expiration_date)) {
            document.getElementById('expiration_error').innerHTML = "La fecha de caducidad no es valida";
            error = true;
        } else {
            document.getElementById('expiration_error').innerHTML = "";
        }
    }

    if (cvv.length === 0) {
        document.getElementById('cvv_error').innerHTML = "El campo es obligatorio";
        let error = true;
    } else {
        if (!cvv_ex.test(cvv)) {
            document.getElementById('cvv_error').innerHTML = "El cvv no es valido";
            error = true;
        } else {
            document.getElementById('cvv_error').innerHTML = "";
        }
    }

    if (error) {
        return false;
    } else {
        return true;
    }
}


function buy() {
    $(".buy_button").click(function () {

        data = {
            name: document.getElementById('firstName').value,
            surname: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            adress: document.getElementById('address').value,
            adress2: document.getElementById('address2').value,
            //name_card: document.getElementById('nameCard').value,
            //credit_card: document.getElementById('creditCard').value,
            //expiration_date: document.getElementById('expiration').value,
            //cvv: document.getElementById('cvv').value,
            op: 'buy'
        };

        check = validate_buy_data();
        if (check) {
            ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), data)
                .then(function (data) {
                    $(".list_cart").empty();
                    loadCart();
                    new Noty({
                        text: 'Compra efectuada.',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 3000
                    }).show();

                }).catch(function () {
                    console.error('error');
                });
        }
    });
}


function load_facturas() {

    ajaxPromise("POST", "JSON", friendlyURL("?module=cart"), { op: "load_facturas" })
        .then(function (data) {
            for (row in data) {

                $("<tr></tr>").attr('class', 'row_factura')
                    .appendTo('.bill_table_content')
                    .html(`
                    <td class="col text-center">`+ data[row].id_order + `</td>
                    <td class="col text-center">`+ data[row].date_order + `</td>
                    <td class="col text-center">`+ data[row].name_buyer + ` ` + data[row].surname_buyer + `</td>
                    <td class="col text-center">`+ data[row].total_price + `</td>
                    <td class="col text-center">
                    <button class="btn btn-primary load_factura" id = "`+ data[row].id_order + `">Ver Factura</button>
                    <button class="btn btn-primary load_qr" id = "`+ data[row].id_order + `">Ver QR</button>
                    </td>
                    `);
            }
            load_factura();
            load_qr();
        })
        .catch(function () {
            console.error('error');
        });
}

function load_factura() {
    $(".load_factura").click(function () {
        let id = $(this).attr('id');
        const url = absoluteURL('pdf/factura' + id + '.pdf');

        // Configurar la URL del worker de PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(pdf => {
            const viewer = document.getElementById('pdf-viewer');
            if (!viewer) {
                console.error('No se encontró el elemento #pdf-viewer en el DOM.');
                return;
            }

            viewer.innerHTML = '';
            const numPages = pdf.numPages;

            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                pdf.getPage(pageNum).then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale: scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    viewer.appendChild(canvas);

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            }
        }).catch(err => {
            console.error('Error al cargar el PDF:', err);
        });

        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;

        $('#pdfModal').modal('show');
    });

}


function load_qr() {
    
    $(".load_qr").click(function () {
        let id = $(this).attr('id');
        const url = absoluteURL('QR/QR' + id + '.png');

        $('.qr_img').empty();

        $("<img></img>").attr('src', url).attr('class', 'qr_code').css("max-width", "100%").appendTo('.qr_img');
        

        $('#imageModal').modal('show');
    });
}


function check_stock() {
    ajaxPromise("POST", "JSON", friendlyURL("?module=cart"), { op: "check_stock" })
        .then(function (data) {
            
        })
        .catch(function () {
            console.error("error");
        });
}




function button_close_qr() {
    $(".close_qr").click(function () {
    $('#imageModal').modal('hide');
    });
}



function button_close_pdf() {
    $(".close_pdf").click(function () {
    $('#pdfModal').modal('hide');
    });
}





function buttons_cart() {

    load_facturas();
    deleteLine();
    increment();
    decrement();
    selected_line();
    buy();
}


function carrousel_products() {
    ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), {op: "products" })
        .then(function (data) {
            for (row in data) {
                $('<swiper-slide></swiper-slide>').attr('class', "element_product").attr('id', data[row].id_product).appendTo(".carrousel_products")
                    .html(`
                    <div class="container mt-5">
                        <div class="custom-card">
                            <div class="custom-card-item" >
                                <img src="` + absoluteURL('view/img/cart/' + data[row].image_url) + `" class="card-img-top" style="width: 100%; height: 170px;">
                                <div class  = "col-md-12 row" >
                                    <h5 class="card-title col-md-12 mt-1">` + data[row].price_product + ` €</h5>
                                    <h6 class="col-md-12 mt-1 text-muted"><em>` + data[row].n_product + `</em></h6>
                                    <p class="col-md-12 mt-1">` + data[row].d_product + `</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
            }
            click_product() ;
        })
        .catch(function () {
            console.error("Error en carrousel products");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        }
        );
}

function click_product() {
    $(".element_product").click(function () {
        let id = $(this).attr('id');
        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'add_product', id_product: id })
            .then(function (data) {
                $(".list_cart").empty();
                loadCart();
            })
            .catch(function () {
                console.error('error');
            });
    });
}





$(document).ready(() => {
    check_stock();
    loadCart();
    button_close_pdf();
    button_close_qr();
    carrousel_products();
    $('.footer').attr('class', 'footer col-lg-7');
});

