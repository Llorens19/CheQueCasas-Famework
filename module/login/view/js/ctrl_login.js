function login() {
    console.log("login");
    if (validate_login() != 0) {
        username = document.getElementById('login_username').value;
        password = document.getElementById('login_password').value;

        let data_imput =
        {
            username: username,
            password: password,
            op: 'login'
        };

        localStorage.setItem('username', username);

        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'get_trys', username: username })
            .then(function (data) {

                let user_trys = data[0].login_trys;
                let phone = data[0].tlf;
                localStorage.setItem('phone', phone);
                if (user_trys < 3) {

                    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), data_imput)
                        .then(function (result) {
                            console.log(result);
                            if (result == "error_user") {
                                document.getElementById('error_login_username').innerHTML = "El usario no existe."
                            } else if (result == "error_passwd") {
                                document.getElementById('error_login_password').innerHTML = "La contraseña es incorrecta"

                                count_trys(username);

                            } else if (result == "error_active") {
                                document.getElementById('error_login_username').innerHTML = "El usuario no esta activo"
                            } else {
                                console.log("result", result);
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                localStorage.setItem("access_token", result[0]);
                                localStorage.setItem("refresh_token", result[1]);
                                localStorage.removeItem("type_user");
                                localStorage.setItem("type_user", "normal");

                                new Noty({
                                    text: 'Logeado correctamente',
                                    type: 'success',
                                    layout: 'topRight',
                                    timeout: 3000
                                }).show();


                                setTimeout(function () {
                                    location.reload();
                                }, 1000);
                            }
                        }).catch(function (textStatus) {
                            if (console && console.log) {
                                console.error("Error login", textStatus);
                            }
                        });

                }
                else {

                    $(".close_login_button").click();
                    $("#load_moda_verify_identity").modal("show");
                    send_sms_identity(phone, username);
                    compare_idenity(username);
                }

            })
            .catch(function (textStatus) {

                console.error('Fallo al obtener el número de intentos');
            });

    }
}

function send_sms_identity(phone, username) {
    console.log("send_sms");

    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { phone: phone, username: username, op: 'send_sms_identity' })
        .then(function (data) {
            console.log(data);
            console.log("Código enviado", data);
        }).catch(function () {
            console.error("Error al guardar el teléfono");
        });
}





function validate_login() {
    let error = false;

    if (document.getElementById('login_username').value.length === 0) {
        document.getElementById('error_login_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('login_username').value.length < 5) {
            document.getElementById('error_login_username').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_login_username').innerHTML = "";
        }
    }

    if (document.getElementById('login_password').value.length === 0) {
        document.getElementById('error_login_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_login_password').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}


function count_trys(username) {
    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'count_trys', username: username })
        .then(function (data) {
        })
        .catch(function (textStatus) {
            console.error('Error al incrementar el númerode intentos');
        });
}



function send_recover_password() {
    if (validate_mail_recover_password() != 0) {
        let data =
        {
            email: document.getElementById('recover_email').value,
            op: 'send_recover_email'
        };
        console.table(data);
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), data)
            .then(function (data) {
                if (data == "error") {
                    $("#error_recover_email").html("Este Correo no esta registrado");
                } else {

                    $(".modal_login_body").empty();

                    $("<div></div>")
                        .attr("class", "d-flex flex-column justify-content-center align-items-center full-height")
                        .html(`
                    <div class="text-center">
                        <h6>Email de recuperación enviado a <strong>`+ data + `</strong></h6>
                        <img src='` + absoluteURL("view/img/login/mensaje.gif") + `'style = "height: 100px; width: auto;" alt="Imagen de verificación" class="img-fluid my-3">
                        <h6>Por favor, revisa tu bandeja de entrada.</h6>
                    </div>
    
                    `).appendTo(".modal_login_body");

                    setTimeout(() => {
                        window.location.href = friendlyURL("?module=home");
                    }, 2000);

                }
            })
            .catch(function (textStatus) {
                console.log('Error: Recover password error');
            });
    }
}



function click_login() {
    $("#login_password").keypress(function (e) {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });

    $('#login').on('click', function (e) {
        e.preventDefault();
        login();
    });

    $('.google_button').on('click', function (e) {
        console.log("google");
        social_login('google');
    });

    $('.github_button').on('click', function (e) {
        console.log("github");
        social_login('github');
    });

    $(".recover_input").keypress(function (e) {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_recover_password();
        }
    });

    $('.recover_button').on('click', function (e) {
        e.preventDefault();
        send_recover_password();
    });

}


function validate_mail_recover_password() {
    let mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let error = false;

    if (document.getElementById('recover_email').value.length === 0) {
        document.getElementById('error_recover_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('recover_email').value)) {
            document.getElementById('error_recover_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_recover_email').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

function load_form_new_password() {
    token_email = localStorage.getItem('token_email');
    localStorage.removeItem('token_email');
    console.log(token_email);
    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { token_email: token_email, op: 'verify_token' })

        .then(function (data) {
            if (data == "verify") {
                setTimeout(function () {
                    charge_recover();
                    click_new_password(token_email);
                }, 1000);
            } else {
                console.log("error");
            }

        })
        .catch(function (textStatus) {
            console.error("Error: Verify token error", textStatus);
        });
}

function click_new_password(token_email) {
    $('#change_password_button').on('click', function (e) {
        e.preventDefault();
        send_new_password(token_email);
    });
}

function send_new_password(token_email) {
    if (validate_new_password() != 0) {
        console.log("send_new_password", token_email);
        let data = { token_email: token_email, password: $('#recover_password').val(), op: 'new_password' };

        ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), data)
            .then(function (data) {
                console.log(data);
                if (data == "done") {
                    new Noty({
                        text: 'Contraseña cambiada.',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 3000
                    }).show();

                    setTimeout('window.location.href = friendlyURL("?module=home")', 1000);
                } else {
                    new Noty({
                        text: 'Exrror cambiando la contraseña.',
                        type: 'error',
                        layout: 'topRight',
                        timeout: 3000
                    }).show();

                }
            })
            .catch(function (textStatus) {
                console.error("Error: New password error");
            });
    }
}

function load_content() {
    console.log("load_content");
    let path = window.location.pathname.split('/');

    console.table(path);

    if (path[4] === 'recover') {
        console.log("recover");

        load_form_new_password();

        localStorage.setItem("token_email", path[5]);

    } else if (path[4] === 'verify') {
        console.log("///////////////////////////////////////////////", path[5]);

        ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), { token_email: path[5], op: 'verify_email' })
            .then(function (data) {
                
                new Noty({
                    text: 'Email verificado.',
                    type: 'success',
                    layout: 'topRight',
                    timeout: 3000
                }).show();

            })
            .catch(function () {
                console.error('Error: verify email error');
            });
    }
}


function charge_recover() {

    $(".modal_login_body").empty();

    $(`<div></div>`).attr("class", "recover_div").appendTo(".modal_login_body").html(`
                        
        <form id="new_password__form" method="POST">

            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="recover_password">Nueva Contraseña</label>
                <input type="password" id="recover_password" class="form-control" />
                <span id="error_recover_password" class="error"></span>

            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="recover_password_repeat">Repite la Contraseña</label>
                <input type="password" id="recover_password_repeat" class="form-control" />
                <span id="error_recover_password_repeat" class="error"></span>

            </div>

            <button type="submit" id="change_password_button" class="btn btn-primary btn-block mb-4">Aceptar</button>
            <button id="recover_exit" class="btn btn-primary btn-block mb-4" style="float: right;">Salir</button>

        </form>
        `);

    $("#loginModal").modal("show");

    $("#recover_exit").on('click', function (e) {
        e.preventDefault();
        window.location.href = friendlyURL("?module=home");
    }
    );
}


function validate_new_password() {
    let error = false;
    let pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;

    if (document.getElementById('recover_password').value.length === 0) {
        document.getElementById('error_recover_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {

        if (document.getElementById('recover_password').value.length < 8) {
            document.getElementById('error_recover_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('recover_password').value)) {
                document.getElementById('error_recover_password').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_recover_password').innerHTML = "";
            }
        }
    }

    if (document.getElementById('recover_password_repeat').value.length === 0) {
        document.getElementById('error_recover_password_repeat').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('recover_password_repeat').value.length < 8) {
            document.getElementById('error_recover_password_repeat').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('recover_password_repeat').value === document.getElementById('recover_password').value) {
                document.getElementById('error_recover_password_repeat').innerHTML = "";
            } else {
                document.getElementById('error_recover_password_repeat').innerHTML = "La password's no coinciden";
                error = true;
            }
        }
    }

    if (error == true) {
        return 0;
    }
}



function load_moda_verify_identity() {

    var modal = $("<div></div>").attr("class", "modal fade").attr("id", "load_moda_verify_identity").attr("tabindex", "-1")
        .attr("aria-labelledby", "load_moda_verify_identityLabel").attr("aria-hidden", "true").appendTo(".login_bar").html(`
                    <div class="modal-dialog modal-dialog-centered modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="load_moda_verify_identityLabel">Verifica tu Teléfono</h5>
                                <button type="button" class="close close_verify_phone_identity" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body modal_phone_body">
                            <form id="phone_code_identity_form">
                                
                            <div class="form-outline mb-4">
                                <label class="form-label" for="phone_code_identity">Código Recibido</label>
                                <input type="email" id="phone_code_identity" class="form-control phone_code"/>
                                <span id="error_phone_code_identity" class="error"></span>

                            </div>

                            <button type="button" class="btn btn-primary col-md-4 offset-lg-4 compare_sms_identity">Comprobar</button>
                        </form>
                            </div>
                        </div>
                    </div>`);

    // Vincula el evento de cierre al botón de cierre
    modal.find('.close_verify_phone_identity').on('click', function () {
        $('#load_moda_verify_identity').modal('hide');
    });


}

function compare_idenity(username) {
    $(".compare_sms_identity").on("click", function () {

        let phone = localStorage.getItem('phone');
        let code = $("#phone_code_identity").val();

        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { phone: phone, username: username, code: code, op: 'verify_code_identity' })
            .then(function (data) {

                console.log(data);

                if (data == "done") {
                    console.log("Código correcto");
                    $('.close_verify_phone_identity').click();

                    new Noty({
                        text: 'Verificado.',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 3000
                    }).show();

                    reset_trys();

                    $("#loginModal").modal("show");



                } else {

                    document.getElementById('error_phone_code_identity').innerHTML = "Código incorrecto";
                    new Noty({
                        text: 'El pin no es correcto o ha caducado.',
                        type: 'error',
                        layout: 'topRight',
                        timeout: 3000
                    }).show();

                }


            }).catch(function () {
                console.error("Error al verificar identidad");
            });
    });
}

function reset_trys() {

    let username = localStorage.getItem('username');

    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { username: username, op: 'reset_trys' })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (textStatus) {
            console.error('Error al resetear los intentos');
        });
}

function social_login(param){

    authService = firebase_config();

    authService.signInWithPopup(provider_config(param)) 
    .then(function(result) {
        console.log('Hemos autenticado al usuario ', result.user);
        email_name = result.user.email;
        let username = email_name.split('@');
        console.log(username[0]);

        user = {
            id: result.user.uid, 
            username: username[0], 
            email: result.user.email, 
            avatar: result.user.photoURL,
            type_user: param,
            op: 'social_login'
        };

        console.log(user);
        
        if (result) {

            ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), user)
            .then(function(data) {
                

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.setItem("access_token", data[0]);
                localStorage.setItem("refresh_token", data[1]);
                localStorage.removeItem("type_user");
                localStorage.setItem("type_user", param);

                new Noty({
                    text: 'Inicio de sesión realizado.',
                    type: 'success',
                    layout: 'topRight',
                    timeout: 3000
                }).show();

                setTimeout(function () {
                    location.reload();
                }, 1000);


                // if(localStorage.getItem('likes') == null) {
                //     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
                // } else {
                //     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
                // }
            })
            .catch(function() {
                console.log('Error: Social login error');
            });
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        console.log(email);
        var credential = error.credential;
        console.log(credential);
    });
}


function firebase_config() {
    var config = {
        apiKey: apiKey(),
        authDomain: authDomain(),
        databaseURL: databaseURL(),
        projectId: projectId(),
        storageBucket: storageBucket(),
        messagingSenderId: messagingSenderId()
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    } else {
        firebase.app();
    }
    return authService = firebase.auth();
}


function provider_config(param){
    if(param === 'google'){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    }else if(param === 'github'){
        return provider = new firebase.auth.GithubAuthProvider();
    }
}

$(document).ready(function () {
    console.log("ready");
    setTimeout(function () {
        click_login();
        load_content();
        load_moda_verify_identity();
    }, 500);

});
