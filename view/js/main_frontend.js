async function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    try {
        const data = await $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        });
        return data;
    } catch (errorThrow) {
        throw errorThrow;
    }
};


function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
        cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
            link += "/" + aux[1] + "/";
        } else {
            link += "/" + aux[1];
        }
    }
    return "http://localhost/CheQueHabitaculos_MVC/CheQueCasas_Framework" + link;
}


$(document).on("click", '.shop_building_all', function () {
    var filters = [];
    localStorage.removeItem('filters');
    filters.push({ "no": ["no"] });
    localStorage.setItem('filters', JSON.stringify(filters));
    setTimeout(function () {
        window.location.href = 'index.php?page=controller_shop&op=list';
    }, 1000);
});




function load_menu() {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
        console.log("dentro");
        ajaxPromise('POST', 'JSON', 'index.php?module=login&op=data_user', { 'token': token })
            .then(function (data) {
                console.log(data[0]);

                $(".login_bar").empty();


                $("<div></div>").attr("class", "ms-2 loged_button round_button").attr("data-toggle", "modal")
                    .attr("data-target", "#userModal").appendTo(".login_bar").html(`<img src="` + data[0].avatar + `">`);

                $("<div></div>").attr("class", "modal fade").attr("id", "userModal")
                    .attr("tabindex", "-1")
                    .attr("aria-labelledby", "userMuserModalLabelodal")
                    .attr("aria-hidden", "true")
                    .appendTo(".login_bar").html(`


                    <div class="modal-dialog modal-dialog-centered modal-sm">
                        <div class="modal-content modal-dialog-centered modal-dialog-scrollable">

                            <div class="modal-header">
                                <h5 class="modal-title" id="userModalLabel">Datos de usuario</h5>
                            </div>
    
                            <div class="modal-body ">
                                <div class="text-center">
                                    <div class="user-photo round_img">
                                        <img src="`+ data[0].avatar + `">
                                    </div>
                                    <div>
                                        <p class="user-id">User ID: <span id="userId">`+ data[0].id_user + `</span></p>
                                    </div>
                                </div>
    
                                <div class="my-3 mx-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <p class="card-text"><strong>Nmobre:</strong> `+ data[0].name + `</p>
                                            <p class="card-text"><strong>Apellidos:</strong> `+ data[0].surname + `</p>
                                            <p class="card-text"><strong>Email:</strong> `+ data[0].email + `</p>
                                            <p class="card-text"><strong>Teléfono:</strong> `+ data[0].tlf + `</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex">
                                    <button type="button" class="btn btn-secondary offset-md-8 col-md-4" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>`)


                $("<div></div>").attr("class", "ms-2 loged_button").appendTo(".login_bar").html(
                    `<button class="btn btn-primary logout" >Cerrar Sesión</button>`);

                $(".button_like_building").removeAttr("data-bs-toggle");

                $(".button_like_building").removeAttr("data-bs-target");
                $(".button_like_building").removeAttr("onclick");

                $(".button_like_building").addClass("button_like_building_active");


                if (data[0].type_user == "admin") {
                    console.log("Admin loged");

                    $("<div></div>").attr("class", "ms-2 admin_options").appendTo(".login_bar").html(
                        `<button onclick="window.location.href='index.php?page=controller_admin&op=list'" class="btn btn-danger">Opciones Admin</button>`);

                    $(".delete_building").remove();

                    // $("<div></div>").attr("class", "col-md-2 chat").appendTo(".buttons_card_shop")
                    // .html( "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/chat.png' style='height: 50px;' alt='Me gusta'></button>");


                    // $("<div></div>").attr("class", "col-md-2 like_building").appendTo(".buttons_card_shop")
                    // .html( "<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/sin_megusta.png' style='height: 50px;' alt='Me gusta'></button>");


                    $("<div></div>").attr("class", "col-md-2 delete_building").appendTo(".buttons_card_shop")
                        .html("<button type='button' class='btn btn-link'><img src='view/img/shop/img_card/borrar.png' style='height: 50px;' alt='Me gusta'></button>");




                } else {
                    console.log("Client loged");
                    $('.opc_CRUD').show();
                    $('.opc_exceptions').show();
                }
                $('.log-icon').empty();
                $('#user_info').empty();
                $('<img src="' + data[0].avatar + '"alt="Robot">').appendTo('.log-icon');
                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
                    .html(
                        '<a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>' +
                        '<a>' + data[0].username + '<a/>'
                    )

            }).catch(function () {
                console.log("Error al cargar los datos del user");
            });
    } else {

        $(".login_bar").empty();

        $("<div></div>").attr("class", "ms-2 login_button").appendTo(".login_bar").html(
            `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login/Register</button>`);

        console.log("No hay token disponible");

    }
}



function click_logout() {
    $(document).on('click', '.logout', function () {
        localStorage.removeItem('total_prod');
        // toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

function logout() {
    ajaxPromise('POST', 'JSON', 'index.php?module=login&op=logout')
        .then(function (data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = "index.php?module=home&op=view";
        }).catch(function () {
            console.log('Something has occured');
        });
}


function click_shop() {
    $(document).on('click', '#opc_shop', function () {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}

$(document).ready(function () {
    load_menu();
    click_logout();
    click_shop();
    $('.login_button').show();
    $('.loged_button').hide();
});