var HelloWorld = SuperWidget.extend({
    message: null,
    calendarEv: [],
    init: function () {
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
                this.calendarEv = new Array();
                for(var i in this.eventos) {
                    this.calendarEv.push({
                        title: this.eventos[i]['TituloEvento'],
                        start: this.eventos[i]['PeriodoInicial'],
                        end: this.eventos[i]['PeriodoFinal']
                    });
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
                $('#calendar').fullCalendar({
                    lang: 'pt',
                    events: this.calendarEv,
                    eventClick: function(calEvent, jsEvent, view) {
                        alert('Event: ' + calEvent.title);
                        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                        alert('View: ' + view.name);
                        // change the border color just for fun
                        $(this).css('border-color', 'red');
                    }
                });
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

function changeView(e) {
    $('.btn').removeClass('btn-primary active');
    $('#btn-'+e).addClass('btn-primary active');
    $('.viewEv').addClass('hide');
    $('#'+e).removeClass('hide');
}