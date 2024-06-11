function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });


    for (row in data[0]) {

        const marker = new mapboxgl.Marker();
        const minPopup = new mapboxgl.Popup();
        const popupContent = `
            <div class="col-lg-12 my-2 point_map" id="${data[0][row].id_building}">
                <div class="custom-card">
                    <div class="custom-card-item">
                        <swiper-container class='mySwiper swiper-slide-centered carrousel_scroll' 
                         onclick='event.stopPropagation();'
                            navigation='true' keyboard='true' pagination='true' pagination-clickable='true'
                            space-between='0' slides-per-view='1' slides-per-group='1'> 
                            ${(() => {
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
                            })()}
                        </swiper-container>
                        <div class="col-md-12 row">
                            <h5 class="card-title col-md-12 mt-1">${data[0][row].price} €</h5>
                            <h6 class="col-md-12 mt-1 text-muted"><em>${data[0][row].n_city}</em></h6>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <ul>
                                    <li><strong>Hab.: </strong>${data[0][row].room_number}</li>
                                    <li><strong>Baños: </strong>${data[0][row].bathroom_number}</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul>
                                    <li><strong>Tipo: </strong>${data[0][row].n_type}</li>
                                    <li><strong>TamañoS: </strong>${data[0][row].m2}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;


minPopup.setHTML(popupContent);
minPopup.options.maxWidth = '450px'; 


marker.setPopup(minPopup).setLngLat([data[0][row].longitude, data[0][row].latitude]).addTo(map);
            
        marker.setPopup(minPopup)
            .setLngLat([data[0][row].longitude, data[0][row].latitude])
            .addTo(map);
    }
}

function click_point_map() {

    $(document).on("click", ".point_map", function () {
        let id = $(this).attr("id");
        loadDetails(id);
    }
    );
}

function mapBox(id) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id.longi, id.lat], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<h4>' + id.brand_name + '</h4><p>Modelo: ' + id.modelo + '</p>' +
        '<p>Precio: ' + id.precio + '€</p>' +
        '<img src=" ' + id.img + '"/>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([id.longi, id.lat])
        .addTo(map);
}


function map_search() {
    $('#exampleModal').on('shown.bs.modal', function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
        const map_search = new mapboxgl.Map({
            container: 'map_search',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [ -3.703010444736488, 40.418737777527504], // starting position [lng, lat]
            zoom: 5.5// starting zoom
        });

        let draw;

        map_search.on('load', function () {
            map_search.addSource('drawing', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });

            draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true
                },
                // Configura el estilo del polígono
                styles: [{
                    'id': 'gl-draw-polygon-fill-inactive',
                    'type': 'fill',
                    'paint': {
                        'fill-color': '#00FF00', // Cambia este color como desees
                        'fill-outline-color': '#00FF00',
                        'fill-opacity': 0.5
                    }
                }, {
                    'id': 'gl-draw-polygon-stroke-inactive',
                    'type': 'line',
                    'paint': {
                        'line-color': '#00FF00',
                        'line-dasharray': [2, 2],
                        'line-width': 2,
                        'line-opacity': 0.7
                    }
                }]
            });

            map_search.addControl(draw);

            map_search.on('draw.create', updateArea);
            map_search.on('draw.delete', updateArea);
            map_search.on('draw.update', updateArea);

            function updateArea() {
                let data = draw.getAll();
                map_search.getSource('drawing').setData(data);

                // Muestra las coordenadas en la consola
                if (data.features.length > 0) {
                    localStorage.setItem('poligon', JSON.stringify(data.features[0].geometry.coordinates[0]));
                }
            }
        });
    });
}


function check_points(){

    poligon = JSON.parse(localStorage.getItem('poligon'));

    ajaxPromise('POST', 'JSON', friendlyURL('?module=maps'), {op:"points"})
    .then(function(data) {
        let in_poligon = [];
        for (row in data) {
            poligon = JSON.parse(localStorage.getItem('poligon'));

            const point = [data[row].longitude, data[row].latitude];
            if (pointInPolygon(point, poligon)) {
                in_poligon.push(data[row].id_building);
            }
        }
        localStorage.setItem('in_poligon', JSON.stringify(in_poligon));
        recharge_filters();

    })
    .catch((error) => {
        console.error(error);
    }
    );


}


function map_search_buttons() {
    $(document).on("click", ".accept_poligon_map", function () {
        check_points();
        $("#exampleModal").modal("hide");
    });
}




function pointInPolygon(point, polygon) {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

$(document).ready(() => {
    map_search_buttons();
});