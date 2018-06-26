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
        var calendarEventos;
        $.ajax({
            type: "post",
            url: "/api/public/ecm/dataset/datasets",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "name" : "colleagueGroup",
                "fields" : ["groupId", "colleagueId"],
                "constraints" :
                    [{
                        "_field" : "groupId",
                        "_initialValue": "%REC-%",
                        "_finalValue" : "%REC-%",
                        "_type": 1,
                        "_likeSearch": true
                    },{
                        "_field" : "colleagueId",
                        "_initialValue": top.WCMAPI.userCode,
                        "_finalValue" : top.WCMAPI.userCode,
                        "_type": 1,
                        "_likeSearch": true
                    }],
                "order" : []
            }),
            dataType: "json",
            success: function(data){
                var constraint = new Array();
                for(var i in data.content.values) {
                    var v = data.content.values[i]['groupId'];
                    constraint.push(DatasetFactory.createConstraint("resp", 'Pool:Group:'+v, 'Pool:Group:'+v, ConstraintType.MUST));
                }
                constraint.push(DatasetFactory.createConstraint("resp", top.WCMAPI.userCode, v, ConstraintType.SHOULD));
                var recursos = DatasetFactory.getDataset(
                    "dsRecursosDisponiveis",
                    null,
                    constraint,
                    null);
                console.log(recursos.values);
                calendarEventos = new Array();
                for (var i in recursos.values) {
                    calendarEventos.push({
                        title: recursos.values[i]['cardId'] + ' - ' + recursos.values[i]['Recurso'],
                        start: switchMonth(recursos.values[i]['dtInicio']),
                        end: switchMonth(recursos.values[i]['dtFinal'])
                    });
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
                        });

                        var form = DatasetFactory.getDataset(
                            "dsReserva_Recursos",
                            null,
                            [DatasetFactory.createConstraint("documentid",
                                calEvent.title.split(' - ')[0],
                                calEvent.title.split(' - ')[0],
                                ConstraintType.MUST)],
                            null);

                        for(var i in form.values) {
                            var r = form.values[i];
                            for(var i in Object.keys(r)) {
                                if(Object.keys(r)[i].indexOf('rc') > -1 && Object.keys(r)[i].indexOf('Obs') == -1) {
                                    if(r[Object.keys(r)[i]] != '' && r[Object.keys(r)[i]] != undefined) {
                                        $('#instanceModal_C').find('[name=' + Object.keys(r)[i] + ']')
                                            .attr('checked','true');
                                    }
                                }
                            }
                        }

                        $('#instanceModal_C').find('.title').val(calEvent.title);
                        $('#instanceModal_C').find('.qtd').val(form.values[0]['qtSolicitada']);
                        $('#instanceModal_C').find('.dtSolicitacao').val(form.values[0]['dtSolicitacao']);
                        $('#instanceModal_C').find('.solicitante').val(form.values[0]['solicitante']);
                        $('#instanceModal_C').find('.solicitanteInformado').val(form.values[0]['solicitanteInformado']);
                        $('#instanceModal_C').find('[name=rcParticipanteObs]').val(form.values[0]['rcParticipanteObs']);
                        $('#instanceModal_C').find('[name=rcFinalidadeObs]').val(form.values[0]['rcFinalidadeObs']);
                        $('#instanceModal_C').find('[name=rcObservacaoObs]').val(form.values[0]['rcObservacaoObs']);
                        $('#instanceModal_C').find('.start').val(switchMonth(calEvent.start['_i']));
                        $('#instanceModal_C').find('.end').val(switchMonth(calEvent.end['_i']));
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
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    },
    email: top.WCMAPI.userEmail
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
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return  day + '/' + month + '/' + date.getFullYear() + ' ' + hour + ":" + minute;
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