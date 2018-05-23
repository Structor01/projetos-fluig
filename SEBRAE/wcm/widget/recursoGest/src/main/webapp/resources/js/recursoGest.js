var HelloWorld = SuperWidget.extend({
    message: null,
    calendarEv: [],
    init: function () {
        this.calendarEv = new Array();
        $('#rowEventos').html(this.htmlC);
        this.recursos();

        $('#porRecurso').on('fluig.autocomplete.itemAdded', function () {
            alert('fewqwe');
            // $('#calendar').html('');
            HelloWorld.recursos($(this).val());
            console.log($(this).val());
        })
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
    },
    recursos: function (filtro) {
        if(!filtro) {
            var filtroRecursos = DatasetFactory.getDataset(
                "sebrae_cadastra_recursos",
                null,
                [DatasetFactory.createConstraint("cdResponsavelRecurso", this.email, this.email, ConstraintType.MUST)],
                null);
            console.log(filtroRecursos.values);

            var rec = [];
            for (var i in filtroRecursos.values) {
                rec.push(filtroRecursos.values[i]['dsNome']);
            }

            var myAutocomplete = FLUIGC.autocomplete('#porRecurso', {
                source: substringMatcher(rec),
                name: 'recursos',
                displayKey: 'description',
                tagClass: 'tag-gray',
                type: 'tagAutocomplete'
            });
        }

        var constraintCA = new Array();
        constraintCA.push(DatasetFactory.createConstraint("responsavelAprovacao", "F640", "F640", ConstraintType.MUST));

        if(filtro) {
            var f = filtro.split(',');
            for(var i in f) {
                constraintCA.push(DatasetFactory.createConstraint("recurso", f[i], f[i], ConstraintType.MUST));
            }
        }

        var processosAtivos = DatasetFactory.getDataset(
            "dsReserva_Recursos",
            null,
            constraintCA,
            null);

        var calendarEventos = new Array();
        for(var i in processosAtivos.values) {
            calendarEventos.push({
                title: processosAtivos.values[i]['recurso'],
                start: switchMonth(processosAtivos.values[i]['dtInicio']),
                end: switchMonth(processosAtivos.values[i]['dtFinal'])
            });
        }

        if(filtro) {
            $('#calendar').fullCalendar('removeEventSources');
            $('#calendar').fullCalendar('addEventSource', calendarEventos);
            return;
        }

        $('#calendar').fullCalendar({
            lang: 'pt',
            events: calendarEventos,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultView: 'listWeek',
            eventClick: function(calEvent, jsEvent, view) {
                // alert('Event: ' + calEvent.title);
                // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                // alert('View: ' + view.name);
                // $(this).css('border-color', 'red');
                var myModal = FLUIGC.modal({
                    title: 'Evento',
                    content: '<div id="instanceModal_C">'+$('#modalEventos').html()+'</div>',
                    id: 'fluig-modal',
                    size:'full',
                    actions: [{
                        'label': 'Fechar',
                        'autoClose': true
                    }]
                }, function(err, data) {
                    if(err) {
                        // do error handling
                    } else {
                        // do something with data
                    }
                });

                $('#instanceModal_C').find('.title').val(calEvent.title);
                $('#instanceModal_C').find('.start').val(transformDate(calEvent.start));
                $('#instanceModal_C').find('.end').val(transformDate(calEvent.end));
            },
            viewRender: function(view, element) {
                $('a.fc-time-grid-event, .fc-content').css('color', 'grey');
                $('a.fc-time-grid-event').css('padding', '5px');
                $('a.fc-time-grid-event, .fc-content').css('background-color', 'rgba(0, 0, 0, 0)');
                $('.fc-day-grid-event').css('border', 'none');
                $('.fc-list-item').find('td').css('padding','5px');
                $('.fc-widget-header').css('padding','5px');
            }
        });
    },
    email: "karoline.souza@sebraego.com.br"
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

function transformDate(e) {
    var date = new Date(e);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

    return  day + '/' + month + '/' + date.getFullYear();
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