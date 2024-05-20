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

function absoluteURL(url) {

    return "http://localhost/CheQueHabitaculos_MVC/CheQueCasas_Framework/" + url;
}


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


// $(document).on("click", '.shop_building_all', function () {
//     var filters = [];
//     localStorage.removeItem('filters');
//     filters.push({ "no": ["no"] });
//     localStorage.setItem('filters', JSON.stringify(filters));
//     setTimeout(function () {
//         window.location.href = '?page=controller_shop&op=list';
//     }, 1000);
// });




function load_menu() {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
        console.log("dentro");
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'token': token, op: 'data_user'})
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


        load_login_modal();

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

function load_login_modal(){

    const modal = $("#loginModal");
    if (modal.length) {
        modal.remove();
    }


    $("<div></div>").attr("class", "modal fade loginModal").attr("id", "loginModal").attr("tabindex", "-1")
    .attr("aria-labelledby", "loginModalLabel").attr("aria-hidden", "true").attr("style", " top: 80px;").appendTo(".header_div")
    .html(`
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Login/Register</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body modal_login_body">



                <!-- Botones -->
                <ul class="nav nav-pills nav-justified mb-3 buttons_modal_login" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link " id="tab-register" data-bs-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="tab-recover" data-bs-toggle="pill" href="#pills-recover" role="tab" aria-controls="pills-recover" aria-selected="false">Recover</a>
                    </li>
                </ul>





                <!-- Pills content -->
                <div class="tab-content login_modal_content">



                    <!-- ////////////////////////////////////login//////////////////////////////////////////////// -->
                    
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form id="login__form" method="POST">


                            <!-- Social login -->
                            <div class="text-center mb-3">
                                <p>Sign in with:</p>
                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>



                            <!-- login normal -->
                            <p class="text-center">or:</p>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="login_username">Email or username</label>
                                <input type="email" id="login_username" class="form-control" />
                                <span id="error_login_username" class="error"></span>

                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="login_password">Contraseña</label>
                                <input type="password" id="login_password" class="form-control" />
                                <span id="error_login_password" class="error"></span>

                            </div>

                            <!--Recuerdame -->
                            <!-- Botod de login -->
                            <button type="submit" id="login" class="btn btn-primary btn-block mb-4">Sign in</button>

                            <!-- Register buttons -->
                            <div class="text-center">
                                <p>Not a member? <a href="#!">Register</a></p>
                            </div>
                        </form>
                    </div>


                    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////// -->
                    <!-- register -->
                    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////// -->


                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">


                        <form id="register__form" method="post">
                            <!-- <div class="text-center mb-3">
                                <p>Sign up with:</p>
                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>

                            <p class="text-center">or:</p> -->

                            <!-- Name input -->
                            <div class="form-outline mb-3 row">
                                <div class="col-md-4 ">
                                    <label class="form-label" for="register_name">Nombre</label>
                                    <input type="text" id="register_name" class="form-control" />
                                    <span id="error_register_name" class="error"></span>
                                </div>

                                <div class="col-md-8">
                                    <label class="form-label" for="register_surname">Apellidos</label>
                                    <input type="text" id="register_surname" class="form-control" />
                                    <span id="error_register_surname" class="error"></span>
                                </div>
                            </div>

                            <!-- Username input -->
                            <div class="form-outline mb-3 row">
                                <div class="col-md-7 ">
                                    <label class="form-label" for="register_username">Nombre de Usuario</label>
                                    <input type="text" id="register_username" class="form-control" />

                                    <span id="error_register_username" class="error"></span>
                                </div>
                                <div class="col-md-5">
                                    <label class="form-label" for="register_tlf">Teléfono</label>
                                    <input type="text" id="register_tlf" class="form-control" />

                                    <span id="error_register_tlf" class="error"></span>
                                </div>
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="register_email">Email</label>
                                <input type="email" id="register_email" class="form-control" />

                                <span id="error_register_email" class="error"></span>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="register_password">Contraseña</label>
                                <input type="password" id="register_password" class="form-control" />

                                <span id="error_register_password" class="error"></span>
                            </div>

                            <!-- Repeat Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="register_password_repeat">Repite la Contraseña</label>
                                <input type="password" id="register_password_repeat" class="form-control" />

                                <span id="error_register_password_repeat" class="error"></span>
                            </div>

                            <!-- Checkbox -->
                            <div class="form-check d-flex justify-content-center mb-3">
                                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked aria-describedby="registerCheckHelpText" />
                                <label class="form-check-label" for="registerCheck">
                                    I have read and agree to the terms
                                </label>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" id="register" class="btn btn-primary btn-block mb-3">Sign in</button>
                        </form>
                    </div>


                    <!-- ////////////////////////////////////recover//////////////////////////////////////////////// -->
                    <div class="tab-pane fade" id="pills-recover" role="tabpanel" aria-labelledby="tab-recover">
                        <form id="recover__form" method="POST">
                            <div class="form-outline mb-4">
                                <label class="form-label" for="recover_email">Email</label>
                                <input type="email" id="recover_email" class="form-control  recover_input" />
                                <span id="error_recover_email" class="error"></span>
                            </div>
                            <button type="submit" id="recover" class="btn btn-primary btn-block mb-3 recover_button">Recover</button>
                        </form>
                    </div>

                </div>
                <!-- Pills content -->
            </div>
        </div>
    </div>
`);



}







$(document).ready(function () {
    load_menu();
    click_logout();
    click_shop();
    $('.login_button').show();
    $('.loged_button').hide();
});