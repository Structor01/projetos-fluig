var HelloWorld = SuperWidget.extend({
    message: null,
    calendarEv: [],
    calendarEvTitle:[],
    init: function () {
        // Esconder o header padrão do Fluig
        $('.fl-header').hide();
        $('#wcm-content').css('margin-top','-7rem');
        // Push dos eventos salvos no formulário.
        var constraints = new Array();
        var today = new Date();
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "", "", ConstraintType.MUST_NOT));
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "undefined", "undefined", ConstraintType.MUST_NOT));
        var dataset = DatasetFactory.getDataset("dsEventos", null, constraints, ["dtInicio"]);
        this.eventos = dataset.values;
        this.calendarEv = new Array();
        HelloWorld.calendarEvTitle = new Array();

        for(var i in this.eventos) {
            HelloWorld.calendarEvTitle.indexOf(this.eventos[i]['nomeEvento']) == -1 ?
                HelloWorld.calendarEvTitle.push(this.eventos[i]['nomeEvento']) : false;
            this.calendarEv.push({
                id: this.eventos[i]['id'],
                city:this.eventos[i]['local'],
                title: this.eventos[i]['nomeEvento'],
                start: switchMonth(this.eventos[i]['dtInicio']),
                end: switchMonth(this.eventos[i]['dtFinal']),
                type: this.eventos[i]['tipoEvento']
            });
        }
        // Widget Calendar
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
                var myModal = FLUIGC.modal({
                    title: 'Evento',
                    content: '<div id="instanceModal_C">'+$('#modalEventos').html()+'</div>',
                    id: 'fluig-modal',
                    size:'full',
                    actions: [{
                        'label': 'Fechar',
                        'autoClose': true
                    }]
                });

                var form = DatasetFactory.getDataset(
                    "dsEventos",
                    null,
                    [DatasetFactory.createConstraint("id",
                        calEvent.id,
                        calEvent.id,
                        ConstraintType.MUST)],
                    null);

                for(var i in form.values) {
                    var r = form.values[i];
                    for(var i in Object.keys(r)) {
                        if(r[Object.keys(r)[i]] != '' && r[Object.keys(r)[i]] != undefined) {
                            $('#instanceModal_C').find('[name="'+Object.keys(r)[i]+'"]').val(r[Object.keys(r)[i]]);
                        }
                    }
                }

                $('#instanceModal_C').find('input, textarea, select').attr('disabled', true);
            },
            viewRender: function(view, element) {
                $('a.fc-time-grid-event, .fc-content').css('color', 'grey');
                $('a.fc-time-grid-event').css('padding', '5px');
                $('.fc-time').css('color','rgba(255,255,255,1) !important');
                // $('.fc-minor, .fc-widget-content').css('background-color','rgba(0,128,255,1) !important');
                $('a.fc-time-grid-event, .fc-content').css('background-color', 'rgba(0, 0, 0, 0)');
                $('.fc-day-grid-event, .fc-time-grid-event').css('border', 'none');
                $('.fc-list-item').find('td').css('padding','5px');
                $('.fc-widget-header').css('padding','5px');
                $('.fc-widget-content').css('background-color','rgba(255,255,255,1) !important');
                $('td.fc-axis.fc-time.fc-widget-content').css('background-color','rgba(0,128,255,1) !important');
                $('.fc-time-grid-event,.fc-v-event,.fc-event,.fc-start,.fc-end')
                    .css('background-color','rgba(0,128,255,1) !important');
                $('hr.fc-divider.fc-widget-header').css('padding','0px');
                $('td.fc-head-container.fc-widget-header')
                    .css('padding','0px');
                $('div.fc-row.fc-widget-header')
                    .css('padding','0px');
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

function filtrarEv() {
    var myModal = FLUIGC.modal({
        title: 'Filtros',
        content: '<div id="instanceModal_F">'+$('#modalFiltros').html()+'</div>',
        id: 'fluig-modal',
        size:'full',
        actions: [
            {
                'label': 'Cancelar',
                'autoClose': true
            },{
                'label': 'Filtrar',
                'bind':'data-filtrar'
            }
        ]
    });

    $('[data-filtrar]').on('click', function () {
       console.log('Filtro');
    });

    var myAutocomplete = FLUIGC.autocomplete('.eventTitle', {
        source: substringMatcher(HelloWorld.calendarEvTitle),
        name: 'titles',
        displayKey: 'description',
        tagClass: 'tag-gray',
        type: 'tagAutocomplete'
    });

    $('.eventTitle').on('fluig.autocomplete.itemAdded', function () {
        // this.calendarEv = new Array();
        // $('#calendar').fullCalendar('refetchResources');
        console.log('Hey');
    });
}