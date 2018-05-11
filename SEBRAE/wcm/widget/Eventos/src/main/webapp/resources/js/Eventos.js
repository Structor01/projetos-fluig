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
    },
    sync: function () {
        var constraints = new Array();
        for(var i in this.eventos) {
            constraints.push(DatasetFactory.createConstraint("CardData", "dtFinal;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "dtInicio;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "email;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "endereco;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "location;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "nomeEvento;" + this.eventos[i]['TituloEvento'], "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "observacao;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "publicoAlvo;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "responsavel;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "telefone;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "tipoEvento;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "unidadeVinculada;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("CardData", "valorInscricao;" + $("#cpfPesquisa").val(), "", ConstraintType.MUST));

            this.htmlC += '<tr>' +
                '<td>' + this.eventos[i]['TituloEvento'] + '</td>' +
                '<td>' + this.eventos[i]['DescProduto'] + '</td>' +
                '<td>' + this.eventos[i]['DescUnidadeOrganizacional'] + '</td>' +
                '<td>' + disarrangeData(this.eventos[i]['PeriodoInicial']) + '</td>' +
                '<td>' + disarrangeData(this.eventos[i]['PeriodoFinal']) + '</td>' +
                '<td>' + this.eventos[i]['NomeCidade'] + '</td>' +
                '</tr>';
        }
    },
    criaRegistro: function (id) {
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
        return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
    },
    salvarForm: function (cardId, constraints) {
        FLUIGC.loading(window).show();
        var registro = criaRegistro(205485);
        var cardId = registro.values[0]['Retorno'];
        console.log('Foi gravado um novo registro ' + cardId);
        var insere = DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
        msg == '' ? msg = 'O registro ' + cardId + ' foi alterado!' : false;
        console.log(msg);
    },
    verificaTipoEv: function (ev) {
        
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