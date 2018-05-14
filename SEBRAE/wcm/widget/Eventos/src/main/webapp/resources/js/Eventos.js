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
                endpoint: '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial=2018-01-01&PeriodoFinal=2018-31-12',
                method: 'get'
            }),
            dataType: "json",
            success: function(data){
                this.eventos = JSON.parse(data.content.result);
                this.htmlC = ''
                this.calendarEv = new Array();
                return sync(this.eventos);
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
                    },
                    viewRender: function(view, element) {
                        $('.fc-content').each(function () {
                            // var hex = getRandomColor();
                            $(this).css('background-color', '#0080ff!important');
                            $(this).find('span').css('color', 'white');
                        });
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

function sync(ev) {
    console.log('start');
    for(var i in ev) {
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("codSAS", ev[i]['CodEvento'], ev[i]['CodEvento'], ConstraintType.MUST));
        var checkev = DatasetFactory.getDataset("dsEventos", null, constraints, null);
        if(checkev && checkev.values.length > 0) continue; else constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("CardData", "dtFinal;" + disarrangeData(ev[i]['PeriodoInicial']), "", ConstraintType.MUST));
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