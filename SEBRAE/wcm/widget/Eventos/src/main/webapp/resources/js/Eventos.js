var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        $('#calendar').fullCalendar({
            events: [
                {
                    title  : 'event1',
                    start  : '2018-05-01'
                },
                {
                    title  : 'event2',
                    start  : '2018-05-05',
                    end    : '2018-05-07'
                },
                {
                    title  : 'event3',
                    start  : '2018-05-09T12:30:00',
                    allDay : false // will make the time show
                }
            ],
            eventClick: function(calEvent, jsEvent, view) {
                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
                // change the border color just for fun
                $(this).css('border-color', 'red');
            }
        });

        $.ajax({
            type: "post",
            url: "/api/public/2.0/authorize/client/invoke",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                serviceCode: 'SAS',
                tenantCode: '1',
                endpoint: '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial=2018-01-03&PeriodoFinal=2018-12-03',
                method: 'get'
            }),
            dataType: "json",
            success: function(data){
               this.eventos = JSON.parse(data.content.result);
               this.htmlC = ''
               for(var i in this.eventos) {
                    this.htmlC += '<tr>' +
                        '<td>' + this.eventos[i]['TituloEvento'] + '</td>' +
                        '<td>' + this.eventos[i]['DescProduto'] + '</td>' +
                        '<td>' + this.eventos[i]['DescUnidadeOrganizacional'] + '</td>' +
                        '<td>' + disarrangeData(this.eventos[i]['PeriodoInicial']) + '</td>' +
                        '<td>' + disarrangeData(this.eventos[i]['PeriodoFinal']) + '</td>' +
                        '<td>' + this.eventos[i]['NomeCidade'] + '</td>' +
                        '</tr>';
               }
               $('#rowEventos').html(this.htmlC);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },
    eventos: null,
    htmlC: '',
    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    }
});

function arrangeData(e) {
    var date = e.split('/');
    var newDate = date[2] + '-' + date[1] + '-' + date[0] + 'T00:00:00';
    return newDate;
}

function disarrangeData(e) {
    var date = e.split('T');
    date = date[0].split('-');
    var hora = e.split('T')[1];
    date = date[2]+'/'+date[1]+'/'+date[0] + ' ' + hora;
    return date;
}