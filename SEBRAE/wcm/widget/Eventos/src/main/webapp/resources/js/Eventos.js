var HelloWorld = SuperWidget.extend({
    message: null,
    calendarEv: [],
    calendarEvTitle:[],
    calendarEvType:[],
    calendarEvCity:[],
    unidadesVinculadas:[],
    filtros: {},
    tempCalendarEv: [],
    init: function () {
        getStates();
        tipoEv();

        // Esconder o header padrão do Fluig
        $('.fl-header').hide();
        $('#wcm-content').css('margin-top','-7rem');
        
        // Push dos eventos salvos no formulário.
        var constraints = new Array();
        var today = new Date();
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "", "", ConstraintType.MUST_NOT));
        constraints.push(DatasetFactory.createConstraint("nomeEvento", "undefined", "undefined", ConstraintType.MUST_NOT));
        var dataset = DatasetFactory.getDataset("dsEventos", null, constraints, ["dtInicio"]);
        HelloWorld.eventos = dataset.values;
        HelloWorld.calendarEv = new Array();
        HelloWorld.calendarEvTitle = new Array();

        for(var i in HelloWorld.eventos) {
            var cidades = '';
            var tipos = '';
            HelloWorld.calendarEvTitle.indexOf(this.eventos[i]['nomeEvento']) == -1 ?
                HelloWorld.calendarEvTitle.push(this.eventos[i]['nomeEvento']) : false;

            HelloWorld.calendarEvType.indexOf(this.eventos[i]['tipoEvento']) == -1 ?
                cidades += '<option value="">'+this.eventos[i]['tipoEvento'] : false;
            HelloWorld.calendarEvCity.indexOf(this.eventos[i]['codCidade']) == -1 ?
                this.eventos[i]['codCidade'] : false;

            if(HelloWorld.unidadesVinculadas.indexOf(HelloWorld.eventos[i]['unidadeVinculada']) == -1)
                HelloWorld.unidadesVinculadas.push(HelloWorld.eventos[i]['unidadeVinculada']);

            HelloWorld.calendarEv.push({
                id: HelloWorld.eventos[i]['id'],
                city:HelloWorld.eventos[i]['codCidade'],
                title: HelloWorld.eventos[i]['nomeEvento'],
                start: switchMonth(HelloWorld.eventos[i]['dtInicio']),
                end: switchMonth(HelloWorld.eventos[i]['dtFinal']),
                type: HelloWorld.eventos[i]['tipoEvento'],
                unidade: HelloWorld.eventos[i]['unidadeVinculada']
            });
        }

        getUnidadeVinculada();

        $('#modalFiltros').find('.eventTitle');
        
        // Widget Calendar
        $('#calendar').fullCalendar({
            lang: 'pt',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultView: 'listWeek',
            events: HelloWorld.calendarEv,
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
                        calEvent.id, calEvent.id,
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
                styleView();
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
                'label': 'Limpar Filtros',
                'bind':'data-clean',
                'classType':'btn-link'
            },{
                'label': 'Filtrar',
                'bind':'data-filtrar'
            },{
                'label': 'Cancelar',
                'bind':'data-clear',
                'autoClose': true,
                'classType':'btn-danger'
            }
        ]
    });

    var myAutocomplete;

    $('[data-clear]').on('click', function () {
        myModal.remove();
    });

    $('[data-clean]').on('click', function () {
        $('#instanceModal_F').find('input, select').each(function () {
            if($(this).attr('name') == 'eventTitle') myAutocomplete.removeAll();
            if($(this).attr('name') == 'eventCity') $(this).prop('disabled', true);
            $(this).val('');
        });

        $('[data-filtrar]').click();

        $('#calendar').fullCalendar('removeEventSource', HelloWorld.tempCalendarEv);
        $('#calendar').fullCalendar('addEventSource', HelloWorld.calendarEv);
        styleView();

    });

    $('[data-filtrar]').on('click', function () {
        console.log('Filtro');
        HelloWorld.filtros = [];
        $('#instanceModal_F').find('input, select').each(function (e) {
            if($(this).attr('name') != undefined)
                HelloWorld.filtros[$(this).attr('name')] = $(this).val();
            console.log($(this).val());
        });

        if(HelloWorld.tempCalendarEv && HelloWorld.tempCalendarEv.length > 0)
            $('#calendar').fullCalendar('removeEventSource', HelloWorld.tempCalendarEv);
        else
            $('#calendar').fullCalendar('removeEventSource', HelloWorld.calendarEv);

        HelloWorld.tempCalendarEv = [];

        for(var i in HelloWorld.calendarEv) {
            if(
                ($('#instanceModal_F').find('.eventTitle').val() != "" &&
                    HelloWorld.calendarEv[i]['title'].indexOf($('#instanceModal_F').find('.eventTitle').val()) > -1) ||
                ($('#instanceModal_F').find('.eventType').val() != "" &&
                    HelloWorld.calendarEv[i]['type'].indexOf($('#instanceModal_F').find('.eventType').val()) > -1) ||
                ($('#instanceModal_F').find('.eventCity').val() != "" &&
                    HelloWorld.calendarEv[i]['city'].indexOf($('#instanceModal_F').find('.eventCity').val()) > -1) ||
                ($('#instanceModal_F').find('.eventUnidade').val() != "" &&
                    HelloWorld.calendarEv[i]['unidade'].indexOf($('#instanceModal_F').find('.eventUnidade').val()) > -1)
            ) {
                if($('#instanceModal_F').find('.eventTitle').val() != "" && HelloWorld.calendarEv[i]['title'].indexOf($('#instanceModal_F').find('.eventTitle').val()) == -1) continue;
                if($('#instanceModal_F').find('.eventType').val() != "" && HelloWorld.calendarEv[i]['type'].indexOf($('#instanceModal_F').find('.eventType').val()) == -1) continue;
                if($('#instanceModal_F').find('.eventUnidade').val() != "" && HelloWorld.calendarEv[i]['unidade'].indexOf($('#instanceModal_F').find('.eventUnidade').val()) == -1) continue;
                    HelloWorld.tempCalendarEv.push(HelloWorld.calendarEv[i]);
            } else
            if(
                $('#instanceModal_F').find('.eventState').val() != "" &&
                HelloWorld.calendarEv[i]['title'].indexOf($('#instanceModal_F').find('.eventTitle').val()) > -1
            ) {

            }
        }

        $('#calendar').fullCalendar('addEventSource', HelloWorld.tempCalendarEv);
        styleView();
        myModal.remove();
    });

    var el = $('#instanceModal_F').find('.eventTitle');

    myAutocomplete = FLUIGC.autocomplete(el, {
        source: substringMatcher(HelloWorld.calendarEvTitle),
        name: 'titles',
        placeholder:'Filtre pelo Título do Evento',
        displayKey: 'description',
        tagClass: 'tag-gray',
        type: 'tagAutocomplete'
    });

    if(HelloWorld.filtros && Object.keys(HelloWorld.filtros).length > 0) {
        for(var i in HelloWorld.filtros) {
            if(i != 'eventTitle') {
                $('#instanceModal_F .'+i).val(HelloWorld.filtros[i]);
            }
        }
        if(HelloWorld.filtros['eventTitle'] != "") myAutocomplete.add({ description: HelloWorld.filtros['eventTitle'] });
    }

    $('#instanceModal_F .eventTitle').on('fluig.autocomplete.itemAdded', function () {
        // this.calendarEv = new Array();
        // $('#calendar').fullCalendar('refetchResources');
        console.log('Hey');
    });

    $('#instanceModal_F .eventState').on('change', function () {
        // Push dos estados salvos no SAS.
        var constraints = new Array();
        $('.eventCity').find('option').each(function () {
            if($(this).val() != '') {
                $(this).remove();
            }
            if($(this).attr('name') == 'eventCity') {
                $(this).prop('readonly', true);
            }
        });
        var dataset = DatasetFactory.getDataset("dsCidadesSAS", null, [DatasetFactory.createConstraint("codEstado", $(this).val(), $(this).val(), ConstraintType.MUST)  ], ["descricaoCidade"]);
        if(dataset && dataset.values.length > 0) {
            var html = '';
            for(var i in dataset.values) {
                html += '<option value="'+ dataset.values[i]['codCidade'] +'">'+ dataset.values[i]['descricaoCidade'] +'</option>';
            }
            $('.eventCity').prop('disabled', false)
            $('.eventCity').append(html);
        }
    });
}

function styleView() {
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

function getStates() {
    // Push dos estados salvos no SAS.
    var constraints = new Array();
    var dataset = DatasetFactory.getDataset("dsEstadosSAS", null, constraints, ["descEstado"]);
    if(dataset && dataset.values.length > 0) {
        var html = '';
        for(var i in dataset.values) {
            html += '<option value="'+ dataset.values[i]['codEstado'] +'">'+ dataset.values[i]['descEstado'] +'</option>';
        }

        $('.eventState').append(html);
    }
}

function getUnidadeVinculada() {
    var html = '';
    for(var i in HelloWorld.unidadesVinculadas) {
        html += '<option>'+ HelloWorld.unidadesVinculadas[i] +'</option>'
    }
    $('.eventUnidade').append(html);
}

function tipoEv() {
    var html = '';
    var tipoEventos = DatasetFactory.getDataset("dsTipoEvento", null, null, null);
    if(tipoEventos.values && tipoEventos.values.length) {
        for(var i in tipoEventos.values) {
            var rec = tipoEventos.values[i];
            html += '<option value"' + rec['Tipo'] + '">' + rec['Tipo'] + '</option>';
        }
        $('.eventType').append(html);
    }
}
