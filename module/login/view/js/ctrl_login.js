function login() {
    console.log("login");
    if (validate_login() != 0) {
        var data =
        {
            username: document.getElementById('login_username').value,
            password: document.getElementById('login_password').value
        };

        console.table(data);

        ajaxPromise('POST', 'JSON', 'index.php?module=login&op=login', data)
            .then(function (result) {
                console.log(result);
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.setItem("access_token", result[0]);
                    localStorage.setItem("refresh_token", result[1]);
                    // toastr.success("Loged succesfully");

                    location.reload();
                }
            }).catch(function (textStatus) {
                if (console && console.log) {
                    console.error("Error login", textStatus);
                }
            });
    }
}

function validate_login() {
    var error = false;

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

function load_content() {
    console.log("load_content");
    let path = window.location.pathname.split('/');

    console.table(path);

    if (path[4] === 'recover') {
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[5]);
    } else if (path[4] === 'verify') {
        ajaxPromise('POST', 'JSON', friendlyURL("?module=login&op=verify_email"), { token_email: path[5] })
            .then(function (data) {
                //toastr.options.timeOut = 3000;
                //toastr.success('Email verified');
            })
            .catch(function () {
                console.error('Error: verify email error');
            });
    } else if (path[4] === 'view') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    } else if (path[4] === 'recover_view') {
        load_form_new_password();
    }
}


function send_recover_password() {
    if (validate_mail_recover_password() != 0) {
        var data =
        {
            email: document.getElementById('recover_email').value,
            op: 'send_recover_email'
        };
        console.table(data);
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), data)
            .then(function (data) {
            console.table("*/*/*/*/*/*/*/*/*/*/*/*/**/*");
                if (data == "error") {
                    $("#error_email_forg").html("Este Correo no esta registrado");
                } else {
                    
                    $(".modal_login_body").empty();

                    $("<div></div>")
                    .attr("class", "d-flex flex-column justify-content-center align-items-center full-height")
                    .html(`
                    <div class="text-center">
                        <h6>Email de recuperación enviado a <strong>`+ data +`</strong></h6>
                     
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
        var code = (e.keyCode ? e.keyCode : e.which);
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
        var code = (e.keyCode ? e.keyCode : e.which);
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


function validate_mail_recover_password(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('recover_email').value.length === 0){
		document.getElementById('error_recover_email').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('recover_email').value)){
            document.getElementById('error_recover_email').innerHTML = "El formato del mail es invalido"; 
            error = true;
        }else{
            document.getElementById('error_recover_email').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}







$(document).ready(function () {
    click_login();
    load_content();
    
});















// $("<div></div>").attr("class", "recover_div").appendTo(".login_modal_content").html(`
            
            
// <form id="recover__form" method="POST">

//     <!-- Email input -->
//     <div class="form-outline mb-4">
//         <label class="form-label" for="login_username">Email or username</label>
//         <input type="email" id="login_username" class="form-control" />
//         <span id="error_login_username" class="error"></span>

//     </div>

//     <!-- Password input -->
//     <div class="form-outline mb-4">
//         <label class="form-label" for="login_password">Contraseña</label>
//         <input type="password" id="login_password" class="form-control" />
//         <span id="error_login_password" class="error"></span>

//     </div>





//     <!-- Botod de login -->
//     <button type="submit" id="login" class="btn btn-primary btn-block mb-4">Sign in</button>

// </form>
// `);




