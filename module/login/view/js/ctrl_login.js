async function login() {
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

        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'get_trys', username: username })
            .then(function (data) {
                console.log(data[0].login_trys);

                let user_trys = data[0].login_trys;
                console.log(user_trys);
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



                }

            })
            .catch(function (textStatus) {

                console.error('Fallo al obtener el número de intentos');
            });

    }
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

    $('#google').on('click', function (e) {
        social_login('google');
    });

    $('#github').on('click', function (e) {
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
        ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), { token_email: path[5], op: ' verify_email' })
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



$(document).ready(function () {
    console.log("ready");
    setTimeout(function () {
        click_login();
        load_content();
    }, 500);

});
