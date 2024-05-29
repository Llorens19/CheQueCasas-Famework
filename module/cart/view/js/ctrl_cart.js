function loadCart() {

    ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'loadCart' })
        .then(function (data) {

            for (row in data) {

                console.log(data[row].id_line);

                $("<li></li>").attr('class', 'list-group-item d-flex justify-content-between align-items-center item_cart rounded col-lg-12').attr('id', "line_"+data[row].id_line)
                    .appendTo('.list_cart')
                    .html(`
            <div class="form-check d-flex align-items-center col-lg-3">
                <input class="form-check-input selected_line selected_line_`+data[row].id_line+`" type="checkbox" id="`+data[row].id_line+`">
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
                    <input type="number" class="form-control form-control-sm mx-2 text-center input_card_`+ data[row].id_line + `" value="1" min="1" max= "` + data[row].stock + `" style="width: 60px;">
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
                    $(".selected_line_"+data[row].id_line).prop('checked', true);
                }

            }
            butons_cart();


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
                $("#line_"+id).remove();
            })
            .catch(function () {
                console.error('error');
            });
    });
    
}

function selected_line () {
    $(".selected_line").click(function () {
        console.log('selected');
        let id = $(this).attr('id');
        console.log(id);


        let state = $(this).prop('checked');
        let state_bd = state ? 1 : 0;
        console.log(state_bd);


        ajaxPromise('POST', 'JSON', friendlyURL('?module=cart'), { op: 'selected_line', id_line: id, state: state_bd})
            .then(function (data) {
                console.log(data);
            })
            .catch(function () {
                console.error('error');
            });

    });
    
}

function total_money(){

    ajaxPromise("POST", "JSON", friendlyURL("?module=cart"), { op: "total_money" })
    .then(function (data) {
        console.log(data);
        $(".total_money").html(Total = data.total_money + "€");

    })
    .catch(function () {
        console.error("error");
    });




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

