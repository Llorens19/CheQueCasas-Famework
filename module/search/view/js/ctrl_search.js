
function load_type(array_filters) {
    ajaxPromise( 'POST', 'JSON', 'index.php?module=search&op=search_type', {array_filters: array_filters})
        .then(function (data) {
            $('.type').empty();
            
            $('<option>Tipo</option>').attr('value', '%').appendTo('.type');
            for (row in data) {
                
                $('<option value="' + data[row].id_type + '">' + data[row].n_type + '</option>').appendTo('.type');
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
            //window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}
function load_operation (array_filters) {
    ajaxPromise( 'POST', 'JSON', 'index.php?module=search&op=search_operations', {array_filters: array_filters})
        .then(function (data) {
            $('.operations').empty();
            $('<option>Operación</option>').attr('value', '%').appendTo('.operations')
            for (row in data) {
                $('<option value="' + data[row].id_operations + '">' + data[row].n_operations + '</option>').appendTo('.operations')
            }
        }).catch(function () {
            console.error('error');
            //window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}



function load_autocomplete(array_filters) {
    console.log('dentro de load_autocomplete');
    console.table(array_filters);
    ajaxPromise( 'POST', 'JSON', 'index.php?module=search&op=autocomplete', {array_filters: array_filters})
    .then(function (data) {
        console.log('dentro de load_autocomplete');
        $('.search_auto').empty();
        $('.search_auto').fadeIn(300);

        for (row in data) {
            $('<div></div>').appendTo('.search_auto').html(data[row].n_city).attr({ 'class': 'option_completed', 'id': data[row].id_city });
        }

        $(document).on('click', '.option_completed', function () {
            $('.autocomplete').val($(this).html());
            $('.search_auto').fadeOut(300);
            localStorage.removeItem('copy_city');   
            localStorage.setItem('copy_city', $(this).attr('id'));
        });

    }).catch(function (error) {
        console.error(error);
        //$('.search_auto').fadeOut(500);
    });
}

function launch_search(){
    let array_filters = [
        ["type", '%%'],
        ["operations", '%%'],
        ["complete", '%%']
    ];
 
    load_type(array_filters);
    load_operation(array_filters);

    $(document).on('change', '.type', function () {
        //$('.search_operations').empty();
        array_filters[0][1] = $(this).val();
        //console.table(array_filters);
        load_operation(array_filters);
        localStorage.setItem('array_filters_search', JSON.stringify(array_filters));
    });

    $(document).on('change', '.operations', function () {
        //$('.search_type').empty();
        array_filters[1][1] = $(this).val();
        //console.table(array_filters);
        load_type(array_filters);
        localStorage.setItem('array_filters_search', JSON.stringify(array_filters));
    });

    $(".autocomplete").on("keyup", function () {
        
        array_filters[2][1] = $(this).val();
        load_autocomplete(array_filters);
        localStorage.setItem('array_filters_search', JSON.stringify(array_filters));
    });


    $('.search').on('click', function () {
        let array_filters = JSON.parse(localStorage.getItem('array_filters_search'));

        console.log(array_filters);
        localStorage.removeItem('array_filters_search');
        $("#autocom").val();
        console.log($("#autocom").val());

        localStorage.setItem('city', $("#autocom").val() || '%');
        localStorage.setItem('type', $('.type').val() || '%');
        localStorage.setItem('operations', $('.operations').val() || '%');
        window.location.href = 'index.php?module=shop&op=view';
        localStorage.setItem('copy_city', '%');

    });
}

$(document).ready(function () {
    launch_search();
});