function register() {
    if (validate_register() != 0) {
        let data = {
            op: 'register',
            name: document.getElementById('register_name').value,
            surname: document.getElementById('register_surname').value,
            tlf: document.getElementById('register_tlf').value,
            username: document.getElementById('register_username').value,
            email: document.getElementById('register_email').value,
            password: document.getElementById('register_password').value
        };

        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), data)
            .then(function (result) {
                if (result === "error_email") {
                    document.getElementById('error_register_username').innerHTML = " ";
                    document.getElementById('error_register_email').innerHTML = "El email ya esta en uso, intentalo con otro";

                } else if (result === "error_username") {
                    document.getElementById('error_register_username').innerHTML = "El usuario ya esta en uso, intentalo con otro";
                    document.getElementById('error_register_email').innerHTML = " ";
                } else if (result === "error_email_username") {
                    document.getElementById('error_register_username').innerHTML = "El usuario ya esta en uso, intentalo con otro";
                    document.getElementById('error_register_email').innerHTML = "El email ya esta en uso, intentalo con otro";
                } else {
                    location.reload();
                }

            }).catch(function (textStatus) {

                console.error("Error register", textStatus);

            });
    }
}

function key_register() {
    $("#register").keypress(function (e) {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function (e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    let username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    let mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    let tlf = /^[0-9]{9}$/;
    let name = /^[a-zA-Z\s]{3,30}$/;
    let error = false;

    if (document.getElementById('register_username').value.length === 0) {
        document.getElementById('error_register_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('register_username').value.length < 5) {
            document.getElementById('error_register_username').innerHTML = "El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('register_username').value)) {
                document.getElementById('error_register_username').innerHTML = "No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_register_username').innerHTML = "";
            }
        }
    }

    if (document.getElementById('register_email').value.length === 0) {
        document.getElementById('error_register_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('register_email').value)) {
            document.getElementById('error_register_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_register_email').innerHTML = "";
        }
    }

    if (document.getElementById('register_password').value.length === 0) {
        document.getElementById('error_register_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {

        if (document.getElementById('register_password').value.length < 8) {
            document.getElementById('error_register_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('register_password').value)) {
                document.getElementById('error_register_password').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_register_password').innerHTML = "";
            }
        }
    }

    if (document.getElementById('register_password_repeat').value.length === 0) {
        document.getElementById('error_register_password_repeat').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('register_password_repeat').value.length < 8) {
            document.getElementById('error_register_password_repeat').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('register_password_repeat').value === document.getElementById('register_password').value) {
                document.getElementById('error_register_password_repeat').innerHTML = "";
            } else {
                document.getElementById('error_register_password_repeat').innerHTML = "La password's no coinciden";
                error = true;
            }
        }
    }

    if (document.getElementById('register_name').value.length === 0) {
        document.getElementById('error_register_name').innerHTML = "Tienes que escribir tu nombre";
        error = true;
    } else {
        if (!name.test(document.getElementById('register_name').value)) {
            document.getElementById('error_register_name').innerHTML = "El nombre no puede contener numeros";
            error = true;
        } else {
            document.getElementById('error_register_name').innerHTML = "";
        }
    }


    if (document.getElementById('register_tlf').value.length !== 0) {
        if (!tlf.test(document.getElementById('register_tlf').value)) {
            document.getElementById('error_register_tlf').innerHTML = "El telefono tiene que tener 6 digitos numéricos";
            error = true;
        } else {
            document.getElementById('error_register_tlf').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

$(document).ready(function () {

    setTimeout(function () {
        key_register();
        button_register();
    }, 500);
});