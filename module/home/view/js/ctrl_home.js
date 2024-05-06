console.log("/////////////////////////////////////////////////////////////////");

function carrousel_operations() {
    ajaxPromise('GET', 'JSON', 'index.php?module=home', {op: "carrusel_operations" })
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "element_operations col-lg-3 col-md-6 service-item d-flex").attr('id', data[row].id_operations).appendTo(".carrousel_list")
                    .html(
                        "<div class='icon flex-shrink-0'>" +
                        "<img src='" + data[row].img_operations + "' class='img-operations'></div>" +
                        "<div>" +
                        "<h4 class='title'>" + data[row].n_operations + "</h4>" +
                        "</div>"
                    );
            }
        })

        .catch(function () {
            console.error("Error en la peticion carrousel_operations");
            console.log("Error en la peticion carrousel_operations");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

function carrousel_type() {
    ajaxPromise('GET', 'JSON', 'index.php?module=home', {op: "carrusel_type" })
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "card element_type").attr('id', data[row].id_type).appendTo(".carrousel_list2")
                    .html(

                        "<img src='" + data[row].img_type + "' class='card-img-top'>" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title'>" + data[row].n_type + "</h5>" +
                        "<p class='card-text'>Lorem ipsum dolor sit amet, consde ctetur adipi scing elit.</p>" +
                        "</div>"

                    );
            }
        })
        .catch(function () {
            console.error("error en la peticion carrousel_type");
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

function carrousel_city() {
    ajaxPromise('GET', 'JSON', 'index.php?module=home', {op: "carrusel_city" })
        .then(function (data) {
            for (row in data) {
                $('<swiper-slide></swiper-slide>').attr('class', "element_city").attr('id', data[row].id_city).appendTo(".carrousel_list3")
                    .html(

                        "<div class='card' >" +
                        "<img src='view/img/home/city/" + data[row].img_city + "' class='card-img-top'>" +
                        "<div class='card-body mx-auto'>" +
                        "<h5 class='card-title '>" + data[row].n_city + "</h5>" +
                        "</div>" +
                        "</div>"
                    );
            }
        })
        .catch(function () {
            console.error("Error en la peticion carrousel_city");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

function most_viewed() {
    ajaxPromise('GET', 'JSON', 'index.php?module=home', {op: "most_viewed" })
        .then(function (data) {
            for (row in data[0]) {
                $('<swiper-slide></swiper-slide>').attr('class', "element_lasts_views").attr('id', data[0][row].id_building).appendTo(".carrousel_list4")
                    .html(`


                    <div class="container mt-5">
                        <div class="custom-card">
                            <div class="custom-card-item" >`

                        +
                        (function () {
                            let image = "";
                            let first_image = false;
                            for (let row_images in data[1]) {
                                if (data[1][row_images].id_building == data[0][row].id_building && first_image == false) {

                                    image = "<img src='view/img/shop/test/" + data[1][row_images].url_image + "' class='img-control-secundary' >";
                                    first_image = true;
                                }
                            }
                            return image;
                        })() +

                        `   <div class  = "col-md-12 row" >
                                    <h5 class="card-title col-md-12 mt-1">` + data[0][row].price + ` €</h5>
                                    <h6 class="col-md-12 mt-1 text-muted"><em>` + data[0][row].n_city + `</em></h6>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <ul>
                                                <li><strong>Hab.: </strong>` + data[0][row].room_number + `</li>
                                                <li><strong>Cat.: </strong>` + data[0][row].n_category + `</li>
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

                    `
                    );
            }
        })
        .catch(function () {
            console.error("Error en la peticion carrousel_city");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        }
        );
}

function lasts_views() {

    let lasts_views = JSON.parse(localStorage.getItem('idsArray'));
    console.log(lasts_views);
    if (lasts_views != null) {

        ajaxPromise('POST', 'JSON', 'index.php?module=home&op=lasts_views', { lasts_views: lasts_views, op: "lasts_views"})
            .then(function (data) {
                for (row in data[0]) {
                    $('<swiper-slide></swiper-slide>').attr('class', "element_lasts_views").attr('id', data[0][row].id_building).appendTo(".carrousel_list5")
                        .html(`


                        <div class="container mt-5">
                            <div class="custom-card">
                                <div class="custom-card-item" >`

                            +
                            (function () {
                                let image = "";
                                let first_image = false;
                                for (let row_images in data[1]) {
                                    if (data[1][row_images].id_building == data[0][row].id_building && first_image == false) {

                                        image = "<img src='view/img/shop/test/" + data[1][row_images].url_image + "' class='img-control-secundary' >";
                                        first_image = true;
                                    }
                                }
                                return image;
                            })() +

                            `   <div class  = "col-md-12 row" >
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

                        `
                        );
                }
            })
            .catch(function () {
                console.error("Error en la peticion lasts_views");
                //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
            }
            );
    }
}


function clicks() {
    $(document).on("click", '.element_operations', function () {
        localStorage.removeItem("id_details");       //click en el boton de ir a filtro 
        localStorage.removeItem('operations');
        localStorage.removeItem('type');
        localStorage.removeItem('city');
        localStorage.setItem('operations', this.getAttribute('id'));
        setTimeout(function () {
            window.location.href = 'index.php?module=shop&op=view';
        }, 200);
    });

    $(document).on("click", '.element_type', function () {
        localStorage.removeItem("id_details");
        localStorage.removeItem('operations');
        localStorage.removeItem('type');
        localStorage.removeItem('city');

        localStorage.setItem('type', this.getAttribute('id'));
        setTimeout(function () {
            window.location.href = 'index.php?module=shop&op=view';
        }, 200);
    });

    $(document).on("click", '.element_city', function () {
        localStorage.removeItem("id_details");
        localStorage.removeItem('operations');
        localStorage.removeItem('type');
        localStorage.removeItem('city');

        localStorage.setItem('city', this.getAttribute('id'));

        setTimeout(function () {
            window.location.href = 'index.php?module=shop&op=view';
        }, 200);
    });


    $(document).on("click", ".shop_building_all", function () {
        localStorage.removeItem("id_details");
        localStorage.removeItem('operations');
        localStorage.removeItem('type');
        localStorage.removeItem('city');
    });

    $(document).on("click", ".element_most_viewed", function () {
        localStorage.removeItem('id_details');
        localStorage.setItem('id_details', this.getAttribute('id'));
        setTimeout(function () {
            window.location.href = 'index.php?module=shop&op=view';
        }, 200);
    });

    $(document).on("click", ".element_lasts_views", function () {
        localStorage.removeItem('id_details');
        localStorage.setItem('id_details', this.getAttribute('id'));
        setTimeout(function () {
            window.location.href = 'index.php?module=shop&op=view';
        }, 200);
    });
}

function prepare_filters() {

    localStorage.removeItem("price");
    localStorage.removeItem("order");

    ajaxPromise("POST", "JSON", "index.php?module=shop", {op: "filters_table" })
        .then(function (data) {
            localStorage.removeItem("data_filters_table");
            localStorage.setItem("data_filters_table", JSON.stringify(data));
            let data_table = data;


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

        })
        .catch(function () {
            console.error("Error en la peticion prepare_filters");
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=prepare_filters HOME";
        });

}


$(document).ready(function () {
    prepare_filters();
    carrousel_operations();
    carrousel_type();
    carrousel_city();
    lasts_views();
    most_viewed();
    clicks();


});