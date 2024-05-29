function loadCart() {

    ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'loadCart' })
        .then(function (data) {

            for (row in data) {

                console.log(data[row].id_line);

                $("<li></li>").attr('class', 'list-group-item d-flex justify-content-between align-items-center item_cart rounded col-lg-12').attr('id', "line_" + data[row].id_line)
                    .appendTo('.list_cart')
                    .html(`
            <div class="form-check d-flex align-items-center col-lg-3">
                <input class="form-check-input selected_line selected_line_`+ data[row].id_line + `" type="checkbox" id="` + data[row].id_line + `">
                <label class="form-check-label mx-2" for="checkbox1">
                    <img src="`+ absoluteURL('view/img/shop/test/' + data[row].image_url) + `" alt="Producto 1" style="width: 150px; height: 100px;">
                    
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
            butons_cart();
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
                    console.log(data);
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
        console.log('delete');
        let id = $(this).attr('id');
        console.log(id);
        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'delete_line_cart', id_line: id })
            .then(function (data) {
                console.log(data);
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
        console.log('selected');
        let id = $(this).attr('id');
        console.log(id);


        let state = $(this).prop('checked');
        let state_bd = state ? 1 : 0;
        console.log(state_bd);


        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'selected_line', id_line: id, state: state_bd })
            .then(function (data) {
                console.log(data);
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
            console.log(data[0].total);
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
        document.getElementById('firstName_error').innerHTML = "El campo nombre es obligatorio";
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
        document.getElementById('lastName_error').innerHTML = "El campo apellidos es obligatorio";
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
        document.getElementById('address_error').innerHTML = "El campo direccion es obligatorio";
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
        document.getElementById('nameCard_error').innerHTML = "El campo nombre de la tarjeta es obligatorio";
        let error = true;

    } else {

        if (!name_card_ex.test(name_card)) {
            document.getElementById('nameCard_error').innerHTML = "El nombre de la tarjeta no es valido";
            error = true;
        } else {
            document.getElementById('nameCard_error').innerHTML = "";
        }



        if (credit_card.length === 0) {
            document.getElementById('creditCard_error').innerHTML = "El campo tarjeta de credito es obligatorio";
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
            document.getElementById('expiration_error').innerHTML = "El campo fecha de caducidad es obligatorio";
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
            document.getElementById('cvv_error').innerHTML = "El campo cvv es obligatorio";
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
        }

    }






}


function butons_cart() {
    deleteLine();
    increment();
    decrement();
    selected_line();
}


$(document).ready(() => {
    console.log('cart ready');
    loadCart();

    $('.footer').attr('class', 'footer col-lg-7');
});

