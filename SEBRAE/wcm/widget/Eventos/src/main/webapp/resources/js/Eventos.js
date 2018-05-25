var HelloWorld = SuperWidget.extend({
    message: null,
    calendarEv: [],
    init: function () {
        var constraints = new Array();
        var today = new Date();
        var m = today.getMonth() + 1 < 10 ? '0'+ parseInt(today.getMonth() + 1) : today.getMonth() + 1;
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "", "", ConstraintType.MUST_NOT));
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "undefined", "undefined", ConstraintType.MUST_NOT));
        var c5 = DatasetFactory.createConstraint("dtInicio", "%/"+m+"/%", "%/"+m+"/%", ConstraintType.MUST);
        constraints.push(c5);
        var dataset = DatasetFactory.getDataset("dsEventos", null, constraints, ["dtInicio"]);
        this.eventos = dataset.values;
        this.htmlC = ''
        this.calendarEv = new Array();
        // return sync(this.eventos);
        for(var i in this.eventos) {
            this.calendarEv.push({
                title: this.eventos[i]['nomeEvento'],
                start: switchMonth(this.eventos[i]['dtInicio']),
                end: switchMonth(this.eventos[i]['dtFinal'])
            });
            this.htmlC += '<tr>' +
                '<td>' + this.eventos[i]['nomeEvento'] + '</td>' +
                '<td>' + this.eventos[i]['tipoEvento'] + '</td>' +
                '<td>' + this.eventos[i]['unidadeVinculada'] + '</td>' +
                '<td>' + this.eventos[i]['dtInicio'] + '</td>' +
                '<td>' + this.eventos[i]['dtFinal'] + '</td>' +
                '<td>' + this.eventos[i]['location'] + '</td>' +
                '</tr>';
        }
        $('#rowEventos').html(this.htmlC);
        $('#calendar').fullCalendar({
            lang: 'pt',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultView: 'listWeek',
            events: this.calendarEv,
            eventClick: function(calEvent, jsEvent, view) {
                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
                $(this).css('border-color', 'red');
            },
            viewRender: function(view, element) {
                $('a.fc-time-grid-event, .fc-content').css('color', 'grey');
                $('a.fc-time-grid-event').css('padding', '5px');
                $('a.fc-time-grid-event, .fc-content').css('background-color', 'rgba(0, 0, 0, 0)');
                $('.fc-day-grid-event, .fc-time-grid-event').css('border', 'none');
                $('.fc-list-item').find('td').css('padding','5px');
                $('.fc-widget-header').css('padding','5px');
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
    },
    SAS: function () {
        $.ajax({
            type: "post",
            url: "/api/public/2.0/authorize/client/invoke",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                serviceCode: 'SAS',
                tenantCode: '1',
                endpoint: '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial=2018-01-01&PeriodoFinal=2018-31-12',
                method: 'get'
            }),
            dataType: "json",
            success: function(data){
                this.eventos = JSON.parse(data.content.result);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
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

function sync(ev) {
    console.log('start');
    for(var i in ev) {
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("codSAS", ev[i]['CodEvento'], ev[i]['CodEvento'], ConstraintType.MUST));
        var checkev = DatasetFactory.getDataset("dsEventos", null, constraints, null);
        if(checkev && checkev.values.length > 0) continue; else constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("CardData", "dtFinal;" + disarrangeData(ev[i]['PeriodoFinal']), "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "codSAS;" + ev[i]['CodEvento'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "codCidade;" + ev[i]['CodCidade'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "dtInicio;" + disarrangeData(ev[i]['PeriodoInicial']), "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "endereco;" + ev[i]['Local'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "location;" + ev[i]['Local'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "nomeEvento;" + ev[i]['TituloEvento'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "publicoAlvo;" + ev[i]['PublicoEvento'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "tipoEvento;" + verificaTipoEv(ev[i]['DescProduto']), "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "unidadeVinculada;" + ev[i]['DescUnidadeOrganizacional'], "", ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CardData", "valorInscricao;" + ev[i]['Preco'], "", ConstraintType.MUST));
        salvarForm(constraints);
    }
}

function criaRegistro(id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
    return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
}

function salvarForm(constraints) {
    FLUIGC.loading(window).show();
    var registro = criaRegistro(36117);
    var cardId = registro.values[0]['Retorno'];
    console.log('Foi gravado um novo registro ' + cardId);
    constraints.push(DatasetFactory.createConstraint("CardId", parseInt(cardId), "", ConstraintType.MUST));
    var insere = DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
    var msg = 'O registro ' + cardId + ' foi alterado!';
    console.log(msg);
}

function verificaTipoEv(ev) {
    var tipoEventos = DatasetFactory.getDataset("dsTipoEvento", null, null, null);
    if(tipoEventos.values && tipoEventos.values.length) {
        for(var i in tipoEventos.values) {
            var rec = tipoEventos.values[i]['Tipo'];
            if(ev.indexOf(rec) > -1) return rec;
        }
    }
}

function switchMonth(el) {
    var v = el.split(' ');
    var v1 = v[0].split('/');

    return v1[1] + '/' + v1[0] + '/' +v1[2] + ' ' + v[1];
}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = day + '/' + month + '/' + year;
    var currentTime = currentDate + "  " + currentHour;
    return currentTime;
}

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
//
// function getContrast50(hexcolor){
//     return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'black':'white';
// }