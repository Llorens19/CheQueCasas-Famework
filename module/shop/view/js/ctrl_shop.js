function ajaxForSearch(url, sData = undefined, module, total_prod = 0, items_page = 9) {
    localStorage.setItem('page', 1);
    let filters = sData;
    print_buildings(url, { 'filters': filters, op: module, 'total_prod': total_prod, 'items_page': items_page });
    load_pagination();

}


function ajaxForSearchScroll(url, sData = undefined, module, total_prod = 0, items_page = 4) {
    let filters = sData;
    print_scroll(url, { 'filters': filters, op: module, 'total_prod': total_prod, 'items_page': items_page });
    load_scroll();
}


function print_points() {
    let filters = JSON.parse(localStorage.getItem("filters")) || undefined;
    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'filters': filters, 'total_prod': 0, 'items_page': 100000, op: 'load_buildings' })
        .then(function (data) {
            mapBox_all(data);//
        })
        .catch(function () {
            console.error("error en print_points");
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Points SHOP";
        }

        );
}

function load_pagination() {
    let filters = JSON.parse(localStorage.getItem("filters")) || undefined;

    ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { 'filters': filters, op: 'total_prod' })
        .then(function (data) {
            let total_prod = data[0].total;

            $(".pagination").empty();

            $("<div></div>").attr("class", "d-flex justify-content-center my-3 pagination_content").appendTo(".pagination")
                .html(`
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link page_down" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        ` + (function () {
                        let button_pages = [];
                        let pages = Math.ceil(total_prod / 9);
                        localStorage.setItem("total_pages", pages);
                        for (let page = 1; page <= pages; page++) {

                            button_pages.push(
                                `<li class="page-item"><a class="page-link page" value = '` + page + `'>` + page + `</a></li>`
                            );

                        }
                        return button_pages.join("");
                    })() +
                    `<li class="page-item">
                            <a class="page-link page_up" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            `);

            $(".page").each(function () {
                if ($(this).attr("value") === "1") {
                    $(this).addClass("active");
                }
            });

            disable_buttons(1, Math.ceil(total_prod / 9));

            $(".page_down").click(function () {
                let page = parseInt(localStorage.getItem("page")) || 1;

                if (page <= 1) {
                    return;
                }

                page = page - 1;
                localStorage.setItem("page", page);

                let offset_prod = (page - 1) * 9;
                print_buildings(friendlyURL('?module=shop'), { 'filters': filters, 'total_prod': offset_prod, 'items_page': 9, op: 'load_buildings' });

                window.scrollTo(0, 0);

                $(".page").eq(page - 1).addClass("active");
                $(".page").not($(".page").eq(page - 1)).removeClass("active");

                disable_buttons(page, Math.ceil(total_prod / 9));
            });

            $(".page_up").click(function () {
                let page = parseInt(localStorage.getItem("page")) || 1;
                let total_pages = parseInt(localStorage.getItem("total_pages"));

                if (page < total_pages) {
                    page = page + 1;
                    localStorage.setItem("page", page);
                    let offset_prod = (page - 1) * 9;
                    print_buildings(friendlyURL('?module=shop'), { 'filters': filters, 'total_prod': offset_prod, 'items_page': 9, op: 'load_buildings' });

                    window.scrollTo(0, 0);

                    $(".page").eq(page - 1).addClass("active");
                    $(".page").not($(".page").eq(page - 1)).removeClass("active");

                    disable_buttons(page, total_pages);
                }
            });

            $(".page").click(function () {
                let page = $(this).attr("value");
                localStorage.setItem("page", page);
                let offset_prod = (page - 1) * 9;
                print_buildings(friendlyURL('?module=shop'), { 'filters': filters, 'total_prod': offset_prod, 'items_page': 9, op: 'load_buildings' });

                window.scrollTo(0, 0);

                $(this).addClass("active");
                $(".page").not(this).removeClass("active");

                disable_buttons(parseInt(page), Math.ceil(total_prod / 9));
            });

        })
        .catch(function () {
            console.error("error en ajaxForSearch");
        });
}

function disable_buttons(currentPage, totalPages) {
    if (currentPage <= 1) {
        $(".page_down").parent().addClass("disabled");
    } else {
        $(".page_down").parent().removeClass("disabled");
    }

    if (currentPage >= totalPages) {
        $(".page_up").parent().addClass("disabled");
    } else {
        $(".page_up").parent().removeClass("disabled");
    }
}



function load_scroll() {

    let filters = JSON.parse(localStorage.getItem("filters")) || undefined;



    ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { 'filters': filters, op: 'total_prod' })
        .then(function (data) {
            let total_prod = data[0].total;
            let total_cliks = Math.ceil(total_prod / 4);
            let extra_buildings = (total_cliks * 4) - total_prod;
            localStorage.removeItem("cliks");
            console.log(total_prod);
            console.log(extra_buildings);




            $("<div></div>").attr("class", "d-flex justify-content-center my-3 div_button_scroll").appendTo(".recharge_scroll")
                .html(`
                    <button class="btn btn-primary scroll_button">Ver más</button>
                `);



            $(".scroll_button").click(function () {
                let cliks = parseInt(localStorage.getItem("cliks")) || 0;
                cliks = cliks + 1;
                localStorage.setItem("cliks", cliks);

                let offset_prod = (cliks) * 4;
                print_scroll(friendlyURL('?module=shop'), { 'filters': filters, 'total_prod': offset_prod, 'items_page': 4, op: 'load_buildings' });
                if (cliks >= total_cliks - 1) {
                    print_scroll(friendlyURL('?module=shop'), { 'filters': filters, 'items_page': extra_buildings, op: 'load_buildings'});
                    $(".div_button_scroll").empty();
                }

            });

        })

        .catch(function () {
            console.error("error en ajaxForSearch");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}



function clicks() {
    $(document).on("click", ".list_content_shop", function () {
        console.log("clicks");
        let id_building = this.getAttribute("id");
        loadDetails(id_building);
    });


}

function loadDetails(id_building) {
    console.log("loadDetails");
    ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { id_building: id_building, op: 'details_building' })
        .then(function (data) {

            $("#content_shop_building").hide();
            $(".details-shop").show();
            $(".shop_filters").hide();
            $(".footer").removeClass("col-lg-7");

            window.scrollTo(0, 0);

            let lasts_views = JSON.parse(localStorage.getItem('idsArray'));
            console.log(lasts_views);
            if (lasts_views == null) {
                localStorage.setItem('idsArray', JSON.stringify([id_building]));
            } else {

                let id = id_building;

                ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { id: id, op: 'count_click_details' })
                    .then(function (data) {

                    })
                    .catch(function () {
                        console.error("error en count_click_details");
                        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
                    });

                let idsArray = JSON.parse(localStorage.getItem("idsArray")) || [];

                if (!idsArray.includes(id)) { // Si el id no está en el array, lo añade
                    if (idsArray.length >= 5) {
                        idsArray.shift(); // Borra el primer elemento del array
                        idsArray.push(id);
                    } else {
                        idsArray.push(id);
                    }
                }
                localStorage.setItem("idsArray", JSON.stringify(idsArray));

            }

            console.log(data);

            $("<div></div>")
                .attr({ id: data[1].id_image, class: "carrousel-details " }).attr("style", "margin-top: 20vh;")
                .appendTo(".details-shop")
                .html(
                    (function () {
                        let slides = [];
                        for (let row_images in data[1]) {
                            slides.push(
                                "<img src='view/img/shop/test/" +
                                data[1][row_images].url_image +
                                "'>"
                            );
                        }
                        return slides.join("");
                    })()
                );


            $("<div></div>")
                .attr({
                    id: data[0][0].id_building,
                    class: "details col-lg-10 mx-auto row mt-4",
                })
                .appendTo(".details-shop")
                .html(
                    "<div class='col-lg-6 my-4'>" +
                    "<h3>Detalles de la Vivienda</h3>" +
                    "<p class='fst-italic'><strong>Tipo de Propiedad:</strong>" +data[0][0].n_type+"</p>" +
                    "<p><strong>Habitaciones:</strong>  " + data[0][0].room_number + " </p>" +
                    "<p><strong>Baños:</strong>  " + data[0][0].bathroom_number + "</p>" +
                    "<p><strong>Garaje:</strong>  " + data[0][0].garage + "</p>" +
                    "<p><strong>Ubicación:</strong>  " + data[0][0].n_city + "</p>" +
                    "<p><strong>Superficie:</strong> " + data[0][0].m2 + " m2</p>" +
                    "<p><strong>Descripción:</strong> Esta encantadora casa cuenta con amplias habitaciones y un hermoso jardín. Ideal para familias.</p>" +
                    "<button class='btn btn-primary back'>Volver</button>" +
                    "<div class='col-md-12 row justify-content-end buttons_card_shop'>" +


                    "<div class='col-md-2'>" +
                    "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/compartir.png' style='height: 50px;' alt='Compartir'></button>" +
                    "</div>" +

                    "<div class='col-md-2 chat'>" +
                    "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/chat.png' style='height: 50px;' alt='Chat'></button>" +
                    "</div>" +

                    "<div class='col-md-2' like_building>" +
                    "<button type='button' id= " + data[0][0].id_building + " class='btn btn-link button_like_building' onclick='event.stopPropagation();' data-bs-toggle='modal' data-bs-target='#loginModal'>" +
                    "<img src='view/img/shop/img_card/sin_megusta.png' class='img_like_building img_" + data[0][0].id_building + "' id= img_" + data[0][0].id_building + " style='height: 50px;' alt='Me gusta'></button>" +
                    "</div>" +
                    

                    "<div class='col-md-2' cart_building>" +
                    "<button type='button' id= " + data[0][0].id_building + " class='btn btn-link button_cart_building' onclick='event.stopPropagation();' data-bs-toggle='modal' data-bs-target='#loginModal'>" +
                    "<img src='view/img/shop/img_card/cart.png' class='img_cart_building' style='height: 50px;' alt='Me gusta'></button>" +
                    "</div>" +


                    "</div>" +
                    "</div>" +
                    "<div class='col-lg-6 container my-4'>" +
                    "<iframe width='100%' height='100%' id='gmap_canvas'" +
                    "src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621'" +
                    "frameborder='0' allowfullscreen></iframe>" +
                    "</div>"
                );

            $("<div></div>").attr("class", "offset-lg-1 col-lg-10 row scroll-details").appendTo(".details-shop");
            $("<div></div>").attr("class", "recharge_scroll").appendTo(".details-shop");

            $(".back").click(function () {
                $(".details-shop").empty();
                $(".details-shop").hide();
                $(".shop_filters").show();
                $("#content_shop_building").show();
                $(".footer").addClass("col-lg-7");
                window.scrollTo(0, 0);

                if (localStorage.getItem("id_details")) {
                    localStorage.removeItem("id_details");
                    recharge_filters();
                }

            });

            filters = JSON.parse(localStorage.getItem("filters")) || undefined;
            console.log(filters);

            ajaxForSearchScroll(friendlyURL('?module=shop'), filters, 'load_buildings');

            have_like(data[0].id_building);
            load_menu();


        })
        .catch(function () {
            console.error("error en loadDetails SHOP");
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });
}

function shopAll() {

    if (localStorage.getItem("id_details")) {
        loadDetails(localStorage.getItem("id_details"));
    } else {
        recharge_filters();
    }


}

function printFilters() {

    ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { op: 'filters_table' })
        .then(function (data) {
            localStorage.removeItem("data_filters_table");
            localStorage.setItem("data_filters_table", JSON.stringify(data));

            $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(`
                <button class="btn btn-primary delete_button col-md-12">Borrar</button>
            `);


            $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(`
            
            <div>
            <button type="button" class="btn btn-primary col-md-12" data-toggle="modal" data-target="#exampleModal">
                Zona
            </button>
            </div>
            `);


            $("<div></div>").attr("class", "modal fade").attr("id", "exampleModal").attr("tabindex", "-1").attr("role", "dialog")
                .attr("aria-labelledby", "exampleModalLabel").attr("aria-hidden", "true").appendTo(".modal_filters").html(`
                
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="max-width: 80%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Título del Modal</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div>
                            <div class="col-lg-12 card_filter_map" style = 'height: 700px;'>
                                <div id='map_search' class='map_container'></div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Dibujar zona</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary accept_poligon_map">Guardar cambios</button>

                    </div>
                </div>
            </div>
        
        `);


            $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(`
                <div>
                    <select class="form-select order" aria-label="Default select example">
                        <option value ="%">Orden</option>
                        <option value="1">Metros Cuadrados Ascendente</option>
                        <option value="2">Metros Cuadrados Descendente</option>
                        <option value="3">Precio Ascendente</option>
                        <option value="4">Precio Descendente</option>
                    </select>
                </div>
            `);






            $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(`
            
                <div>
                    <button type="button" class="btn btn-light button_price col-md-12" data-toggle="modal" data-target="#exampleModal2">
                        Precio
                    </button>
                </div>

            `);

            $("<div></div>").attr("class", "modal fade").attr("id", "exampleModal2").attr("tabindex", "-1").attr("role", "dialog")
                .attr("aria-labelledby", "exampleModalLabel").attr("aria-hidden", "true").appendTo(".modal_filters")
                .html(`

                    
                    <div class="modal-dialog" role="document" style=" position: absolute; top: 17%; left: 10%; transform: translate(0, 10px); ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel" style="color: black">
                                    Rango de Precio
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                                    <span aria-hidden="true">x</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container mt-1">
                                    <form >
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="precioMinimo" class="form-label" style="color: black">Precio
                                                    mínimo:</label>
                                                <input type="number" class="form-control min_price" id="precioMinimo"
                                                    placeholder="Mínimo" />
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="precioMaximo" class="form-label" style="color: black">Precio
                                                    máximo:</label>
                                                <input type="number" class="form-control max_price" id="precioMaximo"
                                                    placeholder="Máximo" />
                                            </div>
                                        </div>
                                        <div class="mt-3" id="rangoPrecioSlider"></div>
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                    Cerrar
                                </button>
                                <button type="button" class="btn btn-primary accept_price" data-dismiss="modal">
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
            `);

            scrollbar_price();


            count = 0;

            for (row in data[0]) {
                count = count + 1;
                name_element = "n_" + data[0][row].n_table;
                id_element = "id_" + data[0][row].n_table;

                switch (data[0][row].id_type_filter) {
                    case "1": //tipo selec
                        $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(
                            "<select class='form-select " + data[0][row].n_table + "' id='" + data[0][row].n_table + "'>" +
                            (function () {
                                let options = [];
                                options.push(
                                    "<option selected class = 'text-center' value='%'>" +
                                    data[0][row].text_filter +
                                    "</option>"
                                );
                                for (let row_filter in data[count]) {
                                    options.push(
                                        "<option  value='" + data[count][row_filter][id_element] + "'>" + data[count][row_filter][name_element] + "</option>"
                                    );
                                }
                                return options.join("");
                            })() +
                            "</select>"
                        );
                        break;

                    case "2": //tipo radio button

                        $("<div></div>").attr("class", "col-md-1").appendTo(".shop_filters").html(
                            "<div>" +
                            "<button type='button' class=' col-md-12  btn btn-light " + data[0][row].n_table + "' data-toggle='modal' data-target='#modal_" + data[0][row].n_table + "'> " + data[0][row].text_filter + "</button>" +
                            "</div>"
                        );

                        $("<div></div>").attr("class", "modal fade").attr("id", "modal_" + data[0][row].n_table).attr("tabindex", "-1").attr("role", "dialog")
                            .attr("aria-labelledby", "exampleModalLabel").attr("aria-hidden", "true").appendTo(".modal_filters").html(

                                "<div class='modal-dialog' role='document' style=' position: absolute; top: 20%; left: 50%; transform: translate(0, 10px); '>" +
                                "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                "<h5 class='modal-title' id='exampleModalLabel' style='color: black'>" +
                                "Rango de Precio" +
                                "</h5>" +
                                "<button type='button' class='close' data-dismiss='modal' aria-label='Cerrar'>" +
                                "<span aria-hidden='true'>x</span>" +
                                "</button>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                "<div class='container mt-1'>" +
                                "<form>" +


                                (function () {
                                    let options = [];
                                    options.push(

                                        "<div class='col-lg-12 mx-auto' style='max-height: 200px; overflow-y: auto;'>" +
                                        "<table class='table'>"

                                    );
                                    for (let row_filter in data[count]) {
                                        options.push(
                                            "<tr>" +
                                            "<td style='color: black;'>" + data[count][row_filter][name_element] + "</td>" +
                                            "<td><input type='checkbox' class = 'class_" + data[0][row].n_table + "' value='" + data[count][row_filter][id_element] + "'></td>" +
                                            "</tr>"
                                        );
                                    }
                                    options.push(
                                        "</table>" +
                                        "</div>"
                                    );

                                    return options.join("");
                                })() +

                                "</form>" +
                                "</div>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                "<button type='button' class='btn btn-secondary' data-dismiss='modal'>" +
                                "Cerrar" +
                                "</button>" +
                                "<button type='button' class='btn btn-primary button_" + data[0][row].n_table + "' data-dismiss='modal'>" +
                                "Guardar cambios" +
                                "</button>" +
                                "</div>" +
                                "</div>" +
                                "</div>"

                            );

                        break;

                    case "3": //tipo select oculto
                        break;

                    case "4": //tipo precio
                        break;

                    case "5": //tipo numerico habitaciones
                        break;

                    default:
                        break;
                }
            }

            filter_button();
            shopAll();
            map_search();
        })
        .catch(function (error) {
            console.error(error);
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });
}

function recharge_filters() {

    $('.footer').addClass('col-lg-7');

    let filter = [[], []];
    let data_table = JSON.parse(localStorage.getItem("data_filters_table")); // Add missing variable declaration

    filter[1].push(["price", JSON.parse(localStorage.getItem("price"))]);
    filter[1].push(["order", localStorage.getItem("order")]);
    filter[1].push(["in_poligon", JSON.parse(localStorage.getItem("in_poligon"))]);

    for (let row in data_table[0]) {

        if (data_table[0][row].id_type_filter == 1 || data_table[0][row].id_type_filter == 3) {  //Para los de tipo de select
            if (localStorage.getItem(data_table[0][row].n_table)) {
                filter[1].push(
                    [data_table[0][row].n_table, localStorage.getItem(data_table[0][row].n_table),]
                );
            } else {
                filter[1].push(
                    [data_table[0][row].n_table, "%",]
                );
            }
        }

        if (data_table[0][row].id_type_filter == 2) { //Para los de tipo de check

            if (localStorage.getItem(data_table[0][row].n_table)) {
                filter[1].push(
                    [data_table[0][row].n_table, JSON.parse(localStorage.getItem(data_table[0][row].n_table)),]
                );
            } else {
                filter[1].push(
                    [data_table[0][row].n_table, ["%",],]
                );
            }
        }


    }
    let filter_home = JSON.parse(localStorage.getItem("filters")) || undefined;


    let type_filter = [];
    for (let row in data_table[0]) {
        type_filter.push([data_table[0][row].n_table, data_table[0][row].id_type_filter]);
    }

    let array1 = filter[1];
    let array2 = type_filter;

    let filters = [];

    for (let item1 of array1) {
        let columnName = item1[0];
        let value1 = item1[1];
        let value2 = null;

        for (let item2 of array2) {
            if (item2[0] === columnName) {
                value2 = item2[1];
                break;
            }
        }

        filters.push([columnName, value1, value2]);
    }



    highlight(filters);
    localStorage.setItem("filters", JSON.stringify(filters));

    console.log("recharge_filters");
    console.table(filters);

    ajaxForSearch(friendlyURL('?module=shop'), filters, 'load_buildings');
}

function filter_button() {

    let data_table = [];
    data_table = JSON.parse(localStorage.getItem("data_filters_table"));

    if (data_table[0][row].id_type_filter == 1) {

        for (let row in data_table[0]) {
            $(function () {
                localStorage.setItem(data_table[0][row].n_table, "%");
            });
        }
    }

    let min_price = 0;
    let max_price = 2000000;
    localStorage.setItem("price", JSON.stringify([min_price, max_price]));
    localStorage.setItem("order", "%");
    localStorage.setItem("in_poligon", JSON.stringify([]));

    $(function () {
        $(".accept_price").click(function () {
            min_price = document.getElementById("precioMinimo").value;
            max_price = document.getElementById("precioMaximo").value;
            localStorage.setItem("price", JSON.stringify([min_price, max_price])
            );
            recharge_filters();
        });
    });

    $(function () {
        $(".order").change(function () {
            localStorage.setItem("order", $(this).val());
            recharge_filters();
        });
    });

    if (localStorage.getItem("order")) {
        $(".order").val(localStorage.getItem("order"));
    }

    for (let row in data_table[0]) {

        switch (data_table[0][row].id_type_filter) {
            case "1": //tipo select

                $(function () {
                    $("." + data_table[0][row].n_table).change(function () {
                        localStorage.setItem(data_table[0][row].n_table,
                            $(this).val()
                        );

                        recharge_filters();
                    });
                    if (localStorage.getItem(data_table[0][row].n_table)) {
                        $("." + data_table[0][row].n_table).val(
                            localStorage.getItem(data_table[0][row].n_table)
                        );
                    }
                });
                break;



            case "2": //tipo check
                localStorage.removeItem(data_table[0][row].n_table);
                $(function () {
                    $(".button_" + data_table[0][row].n_table).click(function () {
                        let content = [];
                        localStorage.removeItem(data_table[0][row].n_table);
                        $(".class_" + data_table[0][row].n_table + "").each(function () {
                            if ($(this).prop('checked')) {

                                content.push($(this).val());
                                localStorage.setItem(data_table[0][row].n_table, JSON.stringify(content));
                            }
                        });
                        recharge_filters();
                    });
                }
                );
                break;
        }
    }
}

function highlight(filter) {
    for (let row in filter) {
        if (filter[row][0] == "price") {
            if (filter[row][1][0] == 0 && filter[row][1][1] == 2000000) {
                $(".button_price").removeClass("highlight_select_using");
                continue;
            }
            $(".button_price").addClass("highlight_select_using");
            continue;
        }

        if (filter[row][1] == "%") {
            $("." + filter[row][0]).removeClass("highlight_select_using");
            continue;
        }
        $("." + filter[row][0]).addClass("highlight_select_using");

    }
}

function scrollbar_price() {
    let precioMinimoInput = $("#precioMinimo");
    let precioMaximoInput = $("#precioMaximo");
    let rangoPrecioInput = $("#rangoPrecio");
    let rangoPrecioSlider = $("#rangoPrecioSlider");

    rangoPrecioSlider.slider({
        range: true,
        min: 0,
        max: 2000000,
        step: 1000,
        values: [0, 2000000],
        slide: function (event, ui) {
            actualizarCampos(ui.values[0], ui.values[1]);
        }
    });
    function actualizarCampos(min, max) {
        rangoPrecioInput.val(min + "€ - " + max + "€");
        precioMinimoInput.val(min);
        precioMaximoInput.val(max);
    }
    precioMinimoInput.change(function () {
        let min = parseInt($(this).val()) || 0;
        let max = parseInt(precioMaximoInput.val()) || 1000;
        min = Math.min(min, max);

        rangoPrecioSlider.slider("values", 0, min);
        actualizarCampos(min, max);
    });
    precioMaximoInput.change(function () {
        let min = parseInt(precioMinimoInput.val()) || 0;
        let max = parseInt($(this).val()) || 1000;
        max = Math.max(min, max);

        rangoPrecioSlider.slider("values", 1, max);
        actualizarCampos(min, max);
    });

    // Inicialización de los valores iniciales en el campo de texto
    actualizarCampos(rangoPrecioSlider.slider("values", 0), rangoPrecioSlider.slider("values", 1));
}

function count_click_details() {
    $(document).on("click", ".list_content_shop", function () {


        let id = $(this).attr("id");


        ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { id: id, op: 'count_click_details' })
            .then(function (data) {

            })
            .catch(function () {
                console.error("error en count_click_details");
                // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
            });

        // let idsArray = JSON.parse(localStorage.getItem("idsArray")) || [];

        // if (!idsArray.includes(id)) { // Si el id no está en el array, lo añade
        //     if (idsArray.length >= 5) {
        //         idsArray.shift(); // Borra el primer elemento del array
        //         idsArray.push(id);
        //     } else {
        //         idsArray.push(id);
        //     }
        // }
        // localStorage.setItem("idsArray", JSON.stringify(idsArray));

    });
}

function delete_button() {
    $(document).on("click", ".delete_button", function () {
        localStorage.removeItem("price");
        localStorage.removeItem("order");
        localStorage.removeItem("in_poligon");

        let data_table = [];
        data_table = JSON.parse(localStorage.getItem("data_filters_table"));

        for (let row in data_table[0]) {
            $(function () {
                if (data_table[0][row].id_type_filter == 1 || data_table[0][row].id_type_filter == 3) {
                    localStorage.setItem(data_table[0][row].n_table, "%");
                }
                if (data_table[0][row].id_type_filter == 2) {
                    localStorage.setItem(data_table[0][row].n_table, JSON.stringify(["%"]));
                }
            });
        }


        let min_price = 0;
        let max_price = 2000000;
        localStorage.setItem("price", JSON.stringify([min_price, max_price]));
        localStorage.setItem("order", "%");

        shopAll();


    });
}


function print_buildings(url, sData) {

    Promise.all([find_likes_user(), get_all_table()])
        .then(

            ajaxPromise("POST", "JSON", url, sData)
                .then(function (data) {
                    $(".details-shop").hide();
                    $(".list_buildings").show();
                    $(".list_buildings").empty();
                    if (data == "error") {
                        $("<div></div>")
                            .attr("class", "list_content_shop row gy-4 align-items-center card_shop"
                            )
                            .appendTo(".list_buildings")
                            .html(
                                "<h3>¡No se encuentarn resultados con los filtros aplicados!</h3>"
                            );
                    } else {
                        for (row in data[0]) {
                            //Para cada elementoo del array de buildings
                            $("<div></div>").attr({
                                id: data[0][row].id_building,
                                class: "list_content_shop row gy-4 align-items-center card_shop-item",
                            }).appendTo(".list_buildings").html(
                                "<div class='col-md-7 mb-4' onclick='event.stopPropagation();'>" +
                                "<div class='col-lg-12 mx-auto'>" +
                                "<swiper-container class='mySwiper swiper-slide-centered carrousel_list3' " +
                                "navigation='true' keyboard='true' pagination='true' pagination-clickable='true'" +
                                "space-between='0' slides-per-view='1' slides-per-group='1'>" +
                                (function () {
                                    let slides = [];
                                    for (let row_images in data[1]) {
                                        if (data[1][row_images].id_building == data[0][row].id_building) {
                                            slides.push(
                                                "<swiper-slide>" +
                                                "<img src='view/img/shop/test/" +
                                                data[1][row_images].url_image +
                                                "' class= 'img-control'>" +
                                                "</swiper-slide>"
                                            );
                                        }
                                    }
                                    return slides.join("");
                                })() +
                                "</swiper-container>" +
                                "</div>" +
                                "</div>" +
                                "<div class='col-md-5 row'>" +
                                "<h3>" + data[0][row].price + "€</h3>" +
                                "<p class='fst-italic'>" +
                                " " + data[0][row].n_city + "" +
                                "</p>" +
                                "<ul>" +
                                "<li><i class='bi bi-check'></i>  " + data[0][row].m2 + " m<sup>2</sup></li>" +
                                "<li><i class='bi bi-check'></i>  " + data[0][row].room_number + " hab. <i class='bi bi-check'>" +
                                "</i>  " + data[0][row].bathroom_number + " baños</li>" +
                                "<li><i class='bi bi-check'></i> Tipo:  " + data[0][row].n_type + "</li>" +
                                "</ul>" +
                                "<div class='col-md-2 row '>" +
                                "<div class='col-md-1' like_building>" +
                                "<h5 class = 'count_likes" + data[0][row].id_building + "'></h5>" +
                                "</div>" +
                                "</div>" +
                                "<div class='col-md-10 row justify-content-end buttons_card_shop'>" +
                                "<div class='col-md-2'>" +
                                "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/compartir.png' style='height: 50px;' alt='Compartir'></button>" +
                                "</div>" +
                                "<div class='col-md-2 chat'>" +
                                "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/chat.png' style='height: 50px;' alt='Chat'></button>" +
                                "</div>" +

                                "<div class='col-md-2' like_building>" +
                                "<button type='button' id= " + data[0][row].id_building + " class='btn btn-link button_like_building' onclick='event.stopPropagation();' data-bs-toggle='modal' data-bs-target='#loginModal'><img src='view/img/shop/img_card/sin_megusta.png' class='img_like_building img_" + data[0][row].id_building + "' id= img_" + data[0][row].id_building + " style='height: 50px;' alt='Me gusta'></button>" +
                                "</div>" +

                                "<div class='col-md-2' cart_building>" +
                                "<button type='button' id= " + data[0][row].id_building + " class='btn btn-link button_cart_building' onclick='event.stopPropagation();' data-bs-toggle='modal' data-bs-target='#loginModal'>" +
                                "<img src='view/img/shop/img_card/cart.png'  id= " + data[0][row].id_building + " style='height: 50px;' alt='Carrito'></button>" +
                                "</div>" +
                                

                                "</div>" +

                                "</div>" +

                                "</div>"

                            );



                            have_like(data[0][row].id_building);
                            count_like(data[0][row].id_building);

                        }

                    }

                    print_points();
                    load_menu();



                })
                .catch(function () {
                    console.error("error en ajaxForSearch");
                    //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
                })

        );
}

function click_like_building() {
    $(document).on("click", ".button_like_building_active", function (event) {
        event.stopPropagation();
        let id = $(this).attr("id");

        console.log(id);



        ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { "id_building": id, op: 'action_like' })
            .then(function (data) {

                console.table(data[0].message);

                if (data[0].message == "add") {
                    console.table("Añadimos");
                    $(".img_" + id).attr("src", "view/img/shop/img_card/con_megusta.png");


                    let valor = parseInt($(".count_likes" + id).text());

                    $(".count_likes" + id).text(valor + 1);

                } else if (data[0].message == "remove") {
                    console.table("Borramos");
                    $(".img_" + id).attr("src", "view/img/shop/img_card/sin_megusta.png");
                    let valor = parseInt($(".count_likes" + id).text());

                    $(".count_likes" + id).text(valor - 1);

                }

            })
            .catch(function (error) {
                console.error("Maloooooooooo");

            });



    });
}


function click_cart_building() {

    $(document).on("click", ".button_cart_building_active", function (event) {
        event.stopPropagation();
        let id = $(this).attr("id");
        console.log(id);

        ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { "id_building": id, op: 'action_cart' })

            .then(function (data) {

                console.table(data);

                
            })
            .catch(function (error) {
                console.error("Maloooooooooo");

            });

    });
}





async function find_likes_user() {

    await ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { op: "likes_user" })
        .then(function (data) {


            let id_building_like_user = data.map(
                function (building) {
                    return building.id_building;
                }
            );

            console.log(id_building_like_user);



            //localStorage.setItem('all_likes_table', JSON.stringify(data));

            console.table(data);

            localStorage.setItem('id_likes_user', JSON.stringify(id_building_like_user));

            //console.log(JSON.parse(localStorage.getItem('id_likes_user')));

        })
        .catch(function (error) {
            console.log("Este usuario no ha dado likes");
            localStorage.setItem('id_likes_user', JSON.stringify([]));

        });

}




async function get_all_table() {

    await ajaxPromise("POST", "JSON", friendlyURL('?module=shop'), { op: 'table_likes' })
        .then(function (data) {

            localStorage.setItem('all_likes_table', JSON.stringify(data));

        })
        .catch(function (error) {
            console.error("No se ha podido obtener la tabla de likes");
            localStorage.setItem('all_likes_table', JSON.stringify([]));

        });

}




function have_like(id_building) {
    let ids = JSON.parse(localStorage.getItem('id_likes_user'));

    for (let id of ids) {
        console.log(id);
        if (id === String(id_building)) {
            console.log("Hay coincidencia");
            $(".img_" + id_building).attr("src", "view/img/shop/img_card/con_megusta.png");


        }
    }
}


function count_like(id_building) {
    let ids = JSON.parse(localStorage.getItem('all_likes_table'));
    let count = 0;
    for (let id of ids) {
        if (id.id_building === String(id_building)) {

            count = count + 1;




        }
    }
    $(".count_likes" + id_building).text(count);


}


function print_scroll(url, sData) {

    console.log(url);
    console.table(sData);

    ajaxPromise("POST", "JSON", url, sData)
        .then(function (data) {
            console.log(data);

            if (data == "error") {
                $("<div></div>").attr("class", "list_content_shop row gy-4 align-items-center card_shop").appendTo(".list_buildings").html("<h3>¡sin sugerencias!</h3>");

            } else {

                for (row in data[0]) {


                    $("<div></div>").attr("class", "col-lg-3 my-2").attr("id", data[0][row].id_building).appendTo(".scroll-details")
                        .html(`
            
            <div class="custom-card">
                <div class="custom-card-item">          
                <swiper-container class='mySwiper swiper-slide-centered carrousel_scroll' 
                navigation='true' keyboard='true' pagination='true' pagination-clickable='true'
                space-between='0' slides-per-view='1' slides-per-group='1'> `+
                            (function () {
                                let slides = [];
                                for (let row_images in data[1]) {
                                    if (
                                        data[1][row_images].id_building ==
                                        data[0][row].id_building
                                    ) {
                                        slides.push(
                                            "<swiper-slide>" +
                                            "<img src='view/img/shop/test/" +
                                            data[1][row_images].url_image +
                                            "' class= 'img-control'>" +
                                            "</swiper-slide>"
                                        );
                                    }
                                }
                                return slides.join("");
                            })() + `
                </swiper-container>

                <div class  = "col-md-12 row" >
                <h5 class="card-title col-md-12 mt-1">` + data[0][row].price + ` €</h5>
                <h6 class="col-md-12 mt-1 text-muted"><em>` + data[0][row].n_city + `</em></h6>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <ul>
                            <li><strong>Hab.: </strong>` + data[0][row].room_number + `</li>
                            <li><strong>Baños: </strong>` + data[0][row].bathroom_number + `</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul>
                            <li><strong>Tipo: </strong>` + data[0][row].n_type + `</li>
                            <li><strong>TamañoS: </strong>` + data[0][row].m2 + `</li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
</div>
                
            `);
                }
            }



        })
        .catch(function (error) {
            console.error(error);
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });

}




$(document).ready(() => {
    //count_click_details();
    printFilters();
    delete_button();
    clicks();
    click_like_building();
    click_cart_building();
    //map_search_buttons();
    $('.footer').attr('class', 'footer col-lg-7');

});


