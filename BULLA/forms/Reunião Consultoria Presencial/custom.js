var beforeSendValidate = function(numState,nextState) {
    var correto = true;
    var incorreto = new Array();

    $('.ob').each(function () {
        var obj = $(this).find('input, textarea, select');
        if ($(this).is(':visible') && obj.prop('readonly') == false && obj.is(':visible')) {
            var value = null;

            if (obj.attr('type') == 'radio' && $(obj).prop('checked')) {
                $('[name=' + $(obj).attr('name') + ']').each(function () {
                    if ($(this).prop('checked') == true) {
                        value = obj.val()
                    } else {
                        return true;
                    }
                });
            } else {
                value = obj.val();
            }

            if (value == "" || value == undefined || value == null) {
                incorreto.push(' ' + $(this).children('label').html());
                $(this).addClass('has-error');
                correto = false;
            }

            console.log(value);
        }
    });

    if (correto == false) throw "Por favor, preencha os campos em vermelho"+incorreto.toString();

    if($('[id*=idx___]').length == 0) throw 'Por favor, registre pelo menos um periodo.'

    if(numState == 6) {
        var roleResp = $('#roleResp').val();
        var validaCheckList = true;
        $('[id*=checklistRow___]').each(function() {
            var id = $(this).attr('id').split('___');
            if($('#papel___'+id[1]) != dsReuniao[roleResp.replace('Pool:Role:', '')].nome) return true;
            if($(this).find('.markInput').val() != 'true') validaCheckList = false
        });

        if(validaCheckList == true) {
            var role = $('#roleResp').val().replace("Pool:Role:",'');
            var d = dsReuniao[role];
            if($('#sequencia').val() == '') $('#sequencia').val('1');
            var seq = $('#sequencia').val();
            var constraint = new Array();
            $('[id*=checklistRow___]').each(function() {
                var id = $(this).attr('id').split('___');
                if($(this).find('.markInput').val() == 'true')
                    constraint.push(DatasetFactory.createConstraint("nome", $('#atividade___'+id[1]).val(), $('#atividade___'+id[1]).val(), ConstraintType.MUST_NOT));
            });
            var dataset = DatasetFactory.getDataset(sequencia[seq], null, constraint, new Array("metadata#id"));
            if(dataset.values.length > 0) {
                var invertDs = swapJsonKeyValues(dsReuniao);
                roleResp = 'Pool:Role:'+ invertDs[dataset.values[0].roleName];
            } else {
                if(seq == 3) {
                    var sol = $('#solicitacao').val().split('-')[0];
                    var constraint = new Array();
                    constraint.push(DatasetFactory.createConstraint("solicitacao", sol, sol, ConstraintType.MUST));
                    var dataset = DatasetFactory.getDataset("dsConsultoriaPresencial", null, constraint, null);
                    if(dataset.values.length > 0) {
                        var constraint = new Array();
                        constraint.push(DatasetFactory.createConstraint("CardId", dataset.values[0]['metadata#id'], "", ConstraintType.MUST));
                        constraint.push(DatasetFactory.createConstraint("CardData", "terminou;S", "", ConstraintType.MUST));
                        var dataset = DatasetFactory.getDataset("dsAlteraForm", null, constraint, null);
                        if(dataset.values[0].Result == 'ok') {
                            var constraint = new Array();
                            constraint.push(DatasetFactory.createConstraint("Solicitação", sol, "", ConstraintType.MUST));
                            constraint.push(DatasetFactory.createConstraint("Sequencia", "0", "", ConstraintType.MUST));
                            constraint.push(DatasetFactory.createConstraint("Atividade", "98", "", ConstraintType.MUST));
                            constraint.push(DatasetFactory.createConstraint("Usuário Executor", "bulla.consultoria", "", ConstraintType.MUST));
                            var dataset = DatasetFactory.getDataset("dsMoverAtividade", null, constraint, null);
                        }
                    }
                } else {
                    var constraint = new Array();
                    seq = parseInt($('#sequencia').val()) + 1;
                    var dataset = DatasetFactory.getDataset(sequencia[seq], null, constraint, new Array("metadata#id"));
                    var invertDs = swapJsonKeyValues(dsReuniao);
                    roleResp = 'Pool:Role:' + invertDs[dataset.values[0].roleName];
                }
            }
        }

        var constraint = new Array();
        constraint.push(DatasetFactory.createConstraint("NomeProcesso", "ReuniãoConsultoriaPresencial", "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("User", roleResp, "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "solicitacao;"+$('#solicitacao').val()+'-'+numSol, "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "clienteId;"+$('#clienteId').val(), "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "roleResp;"+roleResp, "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "sequencia;"+seq, "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("Requisitante", 'bulla.consultoria', "", ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset("dsStartProces", null, constraint, null);
        if(dataset.values.length > 0) {
            if(!dataset.values[0]['ERROR'])
                alert('Processo para Reunião foi iniciado ('+ dataset.values[0]['iProcess'] +')');
            else
                throw dataset.values[0]['ERROR'];
        } else {
            throw 'Processo de Reunião não foi iniciado!';
        }
    }
}

var clientes = new Array();
var relatorio = {};
var dsNomePapel = {};
var ativ = {};
var sequencia = {
    1: 'dsCheckListAdministrativo',
    2: 'dsCheckListEstoque',
    3 : 'dsCheckListVendas'
};

var dsReuniao = {
    'Consultor_Setor_Caixa': { nome: 'Consultor Setor Caixa' },
    'Consultor_Relatorios': { nome: 'Consultor Relatórios' },
    'Consultor_Setor_Estoque': { nome: 'Consultor Setor Estoque' },
    'Consultor_Setor_Vendas': { nome: 'Consultor Setor Vendas' },
    'Consultor_Setor_Financeiro': { nome: 'Consultor Setor Financeiro' },
    'Consultor_Setor_Compras': { nome: 'Consultor Setor Compras' }

};

function swapJsonKeyValues(input) {
    var keys = Object.keys(input);
    var values = Object.values(input);
    var output = {};
    for (var i in keys) {
        output[values[i].nome] = keys[i];
    }
    return output;
}

$(document).ready(function () {

    timeDate();

    if(numState != 23) {
        $('.marcarReuniao').addClass('hide');
    } else {
        if ($('#solicitacao').val().indexOf('-') > -1) {
            var constraints = new Array();
            var sol = $('#solicitacao').val().split('-');
            var vS = '';
            for(var i in sol) {
                if(i != sol.length - 1) {
                    if(i == 0) vS += sol[i]; else vS += '-'+sol[i];
                }
            }

            constraints.push(DatasetFactory.createConstraint("solicitacao", vS, vS, ConstraintType.MUST));
            var dataset = DatasetFactory.getDataset("dsReuniaoConsultoriaPresencial", null, constraints, null);
            if (dataset.values.length > 0) {
                var rec = dataset.values[0];
                $('.clientes').addClass('hide');
                $('.clienteDes').removeClass('hide');
                $('#clienteDes').val(rec.clienteDes);
                // $('#roleResp').val(rec.roleResp);

                var constraints = new Array();
                constraints.push(DatasetFactory.createConstraint("metadata#id", rec['metadata#id'], rec['metadata#id'],ConstraintType.MUST));
                constraints.push(DatasetFactory.createConstraint("tablename", 'ingre', 'ingre',ConstraintType.MUST));
                var dtPeriodo = DatasetFactory.getDataset("dsReuniaoConsultoriaPresencial", null, constraints, null);
                if(dtPeriodo.values.length > 0) {
                    for(var i in dtPeriodo.values) {
                        var rec = dtPeriodo.values[i];
                        var idx = wdkAddChild('ingre');
                        $('#inicio___'+idx).val(rec.inicio);
                        $('#fim___'+idx).val(rec.fim);
                        $('#obsHorario___'+idx).val(rec.obsHorario);
                    }
                }

                var constraints = new Array();
                constraints.push(DatasetFactory.createConstraint("metadata#id", rec['metadata#id'], rec['metadata#id'],ConstraintType.MUST));
                constraints.push(DatasetFactory.createConstraint("tablename", 'checklist', 'checklist',ConstraintType.MUST));
                var historico = DatasetFactory.getDataset("dsReuniaoConsultoriaPresencial", null, constraints, null);
                if(historico.values.length > 0) {
                    $('.historico').removeClass('hide');
                    var content = '';
                    var validaCheck = true;
                    for(var i in historico.values) {
                        var rec = historico.values[i];
                        var idx = wdkAddChild('checklist');
                        $('#atividade___'+idx).val(rec.atividade);
                        $('#papel___'+idx).val(rec.papel);
                        $('#relatorio___'+idx).val(rec.relatorio);
                        $('#mark___'+idx).val(rec.mark);

                        relatorio[rec.id] = rec;
                        if(rec.mark == 'true') {
                            content += '<p onclick="openModal('+rec.id+')"><a>'+rec.atividade+'</a></p>';
                        }
                    }
                    $('.historico .panel-body').html(content);
                }

                if($('#sequencia').val() != 1) {
                    $('[id*=checklistRow___]').hide();
                    makeList($('#sequencia').val());
                }
            }
        } else {
            setTimeout(function () {
                reloadZoomFilterValues('cliente', 'cod,' + $('#clienteId').val().replace(',', '-'));
            }, 1000);
        }
    }

    if(numState == 8) {
        $('.acaoReuniao').removeClass('hide');
    }

    if(numState == 6) {
        $('.marcarReuniao').removeClass('hide');
        $('.marcarReuniao').find('input, textarea').prop('readonly', true);
        $('#inputAdicionar, .excluirPaiFilho').addClass('hide');
        $('.checklist').removeClass('hide');
        $('.clientes').addClass('hide');
        $('.clienteDes').removeClass('hide');
        if($('[id*=checklistRow___]').length > 0) {
            $('[id*=checklistRow___]').each(function (el) {
                var id = $(this).attr('id').split('___');
                if($(this).find('.markInput').val() == 'true') {
                    $(this).find('.material-icons').parent().click();
                    $('#relatorio___'+id[1]).prop('readonly', true);
                    $('#mark___'+id[1]).parent().attr('onclick', '');
                }
                if($('#papel___'+id[1]).val() != dsReuniao[$('#roleResp').val().replace('Pool:Role:','')].nome) {
                    $('#mark___'+id[1]).parent().attr('onclick', '');
                    $('#relatorio___'+id[1]).parent().addClass('hide');
                }
            });
        } else makeList(1);
    }

    $('#inputAdicionar').click(function() {
        var idx = wdkAddChild('ingre');
        timeDate();
    });
});

var clientes;

function setSelectedZoomItem(selectedItem) {
    if(selectedItem.inputId == 'cliente') {
        clientes = $('#cliente').val();
    }

    var val = '';

    for(var i in clientes) {
        if(i == 0) val = clientes[i]
        else  val += ', '+clientes[i];
    }

    $('#clienteDes').val(val);
}

function removedZoomItem(removedItem) {

    if(removedItem.inputId == 'cliente') {
        clientes = $('#cliente').val();
    }

    var val = '';

    for(var i in clientes) {
        if(i == 0) val = clientes[i]
        else  val += ', '+clientes[i];
    }

    $('#clienteDes').val(val);
}

function timeDate() {
    FLUIGC.calendar('.time', {
        pickDate: false,
        pickTime: true
    });
    FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: false
    });

    $('.time').find('input').mask('00:00');
    $('.date').find('input').mask('00/00/0000');
}

function delPaiFilho(e) {
    Javascript:fnWdkRemoveChild(e);
}

function formatDate(e) {
    var date = e.split("/");
    var dayFormatted = date[2]+'-'+date[1]+'-'+date[0];
    return dayFormatted;
}

function verificaDataReuniao(e) {
    var today = getDateNow();
    today = today.split(" ");
    var from = $(e).val();
    var dayFormatted = formatDate(today[0]);

    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Data", dayFormatted, dayFormatted, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("Prazo", "120", "120", ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("Periodo", "PADRÃO", "PADRÃO", ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("dsCalculaDeadLine", null, constraints, null);
    if(dataset.values.length > 0) {
        if(formatDate(from) > dataset.values[0]['Result']) {
            FLUIGC.toast({
                title: 'Atenção: ',
                message: 'A reunião deve acontecer em até 15 dias úteis.',
                type: 'danger'
            });
            $(e).val('');
        } else {
            $('#dtFormatted').val(dataset.values[0]['Result'])
        }
    }
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

function getWeekDay(e) {
    var from = e;
    var f = new Date(from[2], from[1] - 1, from[0]);
    switch (f.getDay()) {
        case 0:
            return "Domingo"
            break;
        case 1:
            return "Segunda-Feira"
            break;
        case 2:
            return "Terça-Feira"
            break;
        case 3:
            return "Quarta-Feira"
            break;
        case 4:
            return "Quinta-Feira"
            break;
        case 5:
            return "Sexta-Feira"
            break;
        case 6:
            return "Sábado"
    }
}

function makeList(seq) {
    var role = $('#roleResp').val().replace("Pool:Role:",'');
    $('#sequencia').val(seq);
    var d = dsReuniao[role];
    var constraints = new Array();
    var dataset = DatasetFactory.getDataset(sequencia[seq], null, constraints, new Array("metadata#id"));
    if(dataset.values.length > 0) {
        for(var ind in dataset.values) {
            dsNomePapel[ind] = { roleName: dataset.values[ind]['roleName'], metaId: dataset.values[ind]['metadata#id']};
            var idx = wdkAddChild('checklist');
            $('#atividade___'+idx).val(dataset.values[ind]['nome']);
            $('#papel___'+idx).val(dataset.values[ind]['roleName']);

            if(d.nome != dataset.values[ind]['roleName']) {
                $('#mark___'+idx).parent().attr('onclick', '');
            }
        }
    }
}

function mark(e) {
    var v = $(e).children('i');
    var id = $(e).find('input').attr('id').replace('mark___','');

    if(v.html() == 'check_box_outline_blank') {
        v.html('check_box');
        $('#checklistRow___'+id).find('.relatorioPai').removeClass('hide');
        $('#mark___'+id).val('true');
    } else {
        v.html('check_box_outline_blank');
        $('#checklistRow___'+id).find('.relatorioPai').addClass('hide');
        $('#mark___'+id).val('false');
    }
}

function checkList(e) {
    if($(e).prop('checked') == true)
        $(e).parent().parent().addClass('list-group-item-success');
    else
        $(e).parent().parent().removeClass('list-group-item-success');
}

function setZoomData(instance, value){
    window[instance].setValue(value);
}

function openModal(e) {
    var r = relatorio[e];
    var myModal = FLUIGC.modal({
        title: 'Relatório',
        content: '<p>'+r.relatorio+'</p>',
        id: 'fluig-modal',
        size: 'full',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    });

    $('.modal-body').css('max-height', '200px');
}