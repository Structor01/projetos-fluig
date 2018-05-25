function reqListener () {
    console.log(this.responseText);
}

function getMapDetails(vPlace, map) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: vPlace
    }, function (place, status) {
        console.log('Place details:', place);
        $('#endereco').val(place.formatted_address);
        $('#nomeLocal').val(place.name);
        $('#rotas').attr('href', place.url);
        $('#rotas').removeClass('hide');
    });
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -16.696341, lng: -49.281054},
        zoom: 14
    });

    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    var geocoder = new google.maps.Geocoder();
    var marker = new google.maps.Marker({
        map: map
    });

    google.maps.event.addListener(map, 'click', function(event) {
        geocoder.geocode({
            'latLng': event.latLng
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results[0].formatted_address);
                }

                marker.setPlace({
                    location: event.geometry.location,
                    placeId: event.place_id
                });

                marker.setVisible(true);
            }
        });
    });

    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            location: place.geometry.location,
            placeId: place.place_id
        });

        marker.setVisible(true);

        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent =
            place.formatted_address;
        infowindow.open(map, marker);

        console.log(place.place_id);
        getMapDetails(place.place_id, map);
    });

    $('#map').css('height', '300px');
}

function tryCon() {
    $.ajax({
        type: 'GET',
        url: 'http://sashomolog.sebraego.com.br/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial=2018-05-03&PeriodoFinal=2018-05-03',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },

        headers: {
            'x-req': '7Q5BupbP1iAH7LkWIn4jgJeE1bdJBkE4Xn0HZFs3SfixVXB8I7xZcjI3+pmHWVVoS9FuHclSxCGkwpI4pHtPuRdPa52G973JU6JLqLFTx4s='
        },
        success: function() {
            // Here's where you handle a successful response.
        },

        error: function() {
            alert('fqwefqw');
        }
    });
}

$(document).ready(function() {
    $(this).mask('(00) 0000-0000#');

    FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: true,
        sideBySide: true
    });

    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.dateReserva').mask('00/00/0000 00:00');

    $('.telefone').on('focus', function () {
        $(this).val().length == 15 ?
            $(this).mask('(00) 0 0000-0000') : $(this).mask('(00) 0000-0000#')
    });

    $('.telefone').on('blur', function () {
        $(this).val().length == 15 ?
            $(this).mask('(00) 0 0000-0000') : $(this).mask('(00) 0000-0000')
    });

    var html = '';
    var tipoEventos = DatasetFactory.getDataset("dsTipoEvento", null, null, null);
    if(tipoEventos.values && tipoEventos.values.length) {
        for(var i in tipoEventos.values) {
            var rec = tipoEventos.values[i];
            html += '<option value"' + rec['Tipo'] + '">' + rec['Tipo'] + '</option>';
        }
        $('#tipoEvento').append(html);
    }

    html = ''
    var unidadeEv = DatasetFactory.getDataset("dsUnidadeEvento", null, null, null);
    if(unidadeEv.values && unidadeEv.values.length) {
        for(var i in unidadeEv.values) {
            var rec = unidadeEv.values[i];
            html += '<option value"' + rec['Unidade'] + '">' + rec['Unidade'] + '</option>';
        }
        $('#unidadeVinculada').append(html);
    }

    var states = new Array();
    var resp = DatasetFactory.getDataset("colleague", null, null, null);
    if(resp.values && resp.values.length) {
        for(var i in resp.values) {
            var rec = resp.values[i];
            states.push(rec['colleagueName']);
        }
    }

    var myAutocomplete = FLUIGC.autocomplete('#responsavel', {
        source: substringMatcher(states),
        name: 'responsavel',
        limit:1,
        displayKey: 'description',
        tagClass: 'tag-gray',
        type: 'tagAutocomplete'
    });
});

function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        matches = [];

        substrRegex = new RegExp(q, 'i');

        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    description: str
                });
            }
        });
        cb(matches);
    };
}

function getSASdata() {
    $.ajax({
        type: "post",
        url: "/api/public/2.0/authorize/client/invoke",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            serviceCode: 'SAS',
            tenantCode: '1',
            endpoint: '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial=2017-05-03&PeriodoFinal=2018-05-03',
            method: 'get'
        }),
        dataType: "json",
        success: function(data){
            console.log(JSON.parse(data.content.result));
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}