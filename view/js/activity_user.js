function protecturl() {
    var access_token = localStorage.getItem('access_token') || 0;
    var refresh_token = localStorage.getItem('refresh_token') || 0;

    if(access_token !=0 && refresh_token != 0){

    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'access_token': access_token, 'refresh_token': refresh_token, op: 'controluser'})
        .then(function (data) {
            if (data == "Correct_User") {

                console.log("CORRECTO-->El usario coincide con la session");

            } else if (data == "Wrong_User") {

                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
            
            } else if (data == "Refresh_caducado") {

                logout_auto();

            }else{
                console.log("token refreescado");
                localStorage.setItem("access_token", data);
                load_menu();
            }
        })
        .catch(function (error) { 
            console.error(error) });
        }
}

function control_activity() {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), {op: 'actividad'})
            .then(function (response) {
                if (response == "inactivo") {
                    console.log("usuario INACTIVO");
                    logout_auto();
                    
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logeado");
    }
}

// function refresh_token() {
//     var access_token = localStorage.getItem('token');
//     if (access_token) {
//         ajaxPromise('POST', 'JSON', 'module/login/controller/controller_login.php?op=refresh_token', { 'token': access_token })
//             .then(function (data_token) {
//                 console.log("Refresh token correctly");
//                 localStorage.setItem("access_token", data_token);
//                 load_menu();
//             });
//     }
// }

function refresh_cookie() {
    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), {op: 'refresh_cookie'})
        .then(function (response) {
            console.log("Refresh cookie correctly");
        });
}

function logout_auto() {

    //toastr.warning("Se ha cerrado la cuenta por seguridad!!");
    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'op': 'logout' })
        .then(function (data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = friendlyURL("?module=home");
        }).catch(function () {
            console.log('Something has occured');
        });

    setTimeout(function () {
        location.reload();
    }, 2000);

}

$(document).ready(function () {
    setInterval(function () { control_activity() }, 60000); //10min= 600000
    protecturl();
    
    setInterval(function () { refresh_cookie() }, 60000);
});