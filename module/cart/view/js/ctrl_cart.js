function loadCart() {

    ajaxPromise('POST', 'JSON', friendlyURL('?modul=cart'), { op: 'loadCart' })
        .then(function (data) {

            for (row in data) {

                console.log(data[row].id_line);

                $("<li></li>").attr('class', 'list-group-item d-flex justify-content-between align-items-center item_cart rounded col-lg-12').attr('id', data[row].id_line)
                    .appendTo('.list_cart')
                    .html(`
            <div class="form-check d-flex align-items-center col-lg-3">
                <input class="form-check-input" type="checkbox" id="checkbox1">
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

            }
            increment();
            decrement();


        })
        .catch(function () {
            console.error('error');
        });
}




function increment() {
    console.log('increment');
    $(".increment").click(function () {
        console.log('click');
        console.log($(this).attr('id'));
        let id = $(this).attr('id');
        let input = $(".input_card_" + id);
        let value = parseInt(input.val()) + 1;
        let max = parseInt(input.attr('max'));
        if (value <= max) {
            input.val(value);
        }
    });


}
function decrement() {
    $(".decrement").click(function () {
        console.log('click');
        console.log($(this).attr('id'));
        let id = $(this).attr('id');
        let input = $(".input_card_" + id);
        let value = parseInt(input.val()) - 1;
        let min = parseInt(input.attr('min'));
        if (value >= min) {
            input.val(value);
        }
    });
}


$(document).ready(() => {
    console.log('cart ready');
    loadCart();

    $('.footer').attr('class', 'footer col-lg-7');
});

