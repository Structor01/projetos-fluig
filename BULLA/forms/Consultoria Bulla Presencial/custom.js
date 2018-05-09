var beforeSendValidate = function(numState,nextState){
    var correto = true;
    var incorreto = new Array();

    $('.ob').each(function(){
        var obj = $(this).find('input, textarea, select');
        if($(this).is(':visible') && obj.prop('readonly') == false && obj.is(':visible')) {
            var value = null;

            if(obj.attr('type') == 'radio' && $(obj).prop('checked')) {
                $('[name='+$(obj).attr('name')+']').each(function () {
                    if($(this).prop('checked') == true) {
                        value = obj.val()
                    } else {
                        return true;
                    }
                });
            } else {
                value = obj.val();
            }

            if (value == "" || value == undefined || value == null) {
                incorreto.push(' '+$(this).children('label').html());
                $(this).addClass('has-error');
                correto = false;
            }

            console.log(value);
        }
    });

    if (correto == false) throw "Por favor, preencha os campos em vermelho"+incorreto.toString();

    if(numState == 1) {
        EnviarEmail();
        var empresas = $('#empresa').val();
        $('#empresaDesc').val(empresas.toString());
    }

    if(numState == 3) {
        var constraint = new Array();
        constraint.push(DatasetFactory.createConstraint("NomeProcesso", "ReuniãoConsultoriaPresencial", "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("User", "Pool:Role:Consultor_Setor_Caixa", "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "solicitacao;"+numSol, "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "clienteId;"+$('#empresaCod').val(), "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("CardData", "roleResp;Pool:Role:Consultor_Setor_Caixa", "", ConstraintType.MUST));
        constraint.push(DatasetFactory.createConstraint("Requisitante", 'bulla.consultoria', "", ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset("dsStartProces", null, constraint, null);
        if(dataset.values.length > 0) {
            if(!dataset.values[0]['ERROR'])
                alert('Processo para Primeira Reunião foi iniciado ('+ dataset.values[0]['iProcess'] +')');
            else
                throw dataset.values[0]['ERROR'];
        } else {
            throw 'Processo de Reunião não foi iniciado!';
        }
    }

    if(numState == 14) {
        var lcount = $('[id*=idx___]').length;
        // if($('#idx___1').find('#ligarClienteData___1').val() > getDateNow());
    }
}

$(document).ready(function () {
    $('#dtSolicitacao').val(getDateNow());
    var user = top.WCMAPI.user;
    $('#nomeSolicitante').val(user);

    if(numState != 0 && numState != 1) {
        $('.infoIni').find('.form-control').prop('readonly', true);
        $('.empresas').removeClass('hide');
        var empresas = $('#empresaDesc').val();
        empresas = empresas.split(',');
        var content = '<label>Empresas</label>';
        for(var i in empresas) {
            content += '<span class="form-control"><a>'+empresas[i]+'</a></span>';
        }
        $('.empresas').html(content);
    }

    $('#solicitacao').val(numSol);

    if(numState == 2) {
        $('.alinhamentoComercial').removeClass('hide');
        // $('.alinhamentoComercial').find('.form-control').prop('readonly', false);
    }

    if(numState == 3) {
        $('.alinhamentoCliente').removeClass('hide');
        // $('.alinhamentoCliente').find('.form-control').prop('readonly', false);
        $('#alinhamentoClienteConsultor').val(user);
        $('[name=conheceMetodoBulla]').on('change', function () {
            if($(this).prop('checked')) {
                if($(this).val() == 'S') {
                    $('#conheceMetodoBullaAplicacao').prop('readonly', false);
                    $('#conheceMetodoBullaAplicacao').addClass('ob');
                } else {
                    $('#conheceMetodoBullaAplicacao').prop('readonly', true);
                    $('#conheceMetodoBullaAplicacao').removeClass('ob');
                }
            }
        });
    }

    if(numState == 5) {
        $('.taxinomia').removeClass('hide');
    }
    if(numState == 10) {
        $('#tipoAprova').val('I');
    }
    if(numState == 86) {
        $('#tipoAprova').val('F');
    }

    if(numState == 76) {
        $('#tipoAprova').val('F');
    }

    if(numState == 14) {
        $('.ligarCliente').removeClass('hide');
        $('[id*=idx___]').find('.form-control').prop('readonly', true);

        var ligacoes = wdkAddChild('ingre');

        $('#ligarClienteData___'+ligacoes).val(getDateNow());

        FLUIGC.calendar('#ligarClienteData___'+ligacoes, {
            pickDate: true,
            pickTime: true,
            sideBySide: true
        });
    }

    if(numState == 11) {
        $('aprovaGestor').removeClass('hide');
    }

    FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: false
    });

    FLUIGC.calendar('.dateHour', {
        pickDate: true,
        pickTime: true,
        sideBySide: true
    });

    $('#workflowActions').children('hide');
});

var DADOS = {};
var empresaCods = {};
var cods = new Array();

function setSelectedZoomItem(selectedItem) {
    if(selectedItem.inputId == 'empresa'){
        empresaCods[selectedItem['fantasia']] = selectedItem['cod'];
        cods = new Array();
        for (var ind in Object.keys(empresaCods)) {
            cods.push(empresaCods[Object.keys(empresaCods)[ind]]);
        }



        $('#empresaCod').val(cods.toString());
    }

    if(selectedItem.inputId == 'responsavel') {
        reloadZoomFilterValues("empresa", "codResp," + selectedItem['codResp']);
        $('#responsavelCod').val(selectedItem['codResp']);
        DADOS = {nome: selectedItem["nomeResp"], email: selectedItem['emailResp']};
        FLUIGC.toast({
            title: 'Será enviado um E-mail de boas vindas para: ',
            message: selectedItem['emailResp'],
            type: 'info'
        });
        $('.empresaZoom').removeClass('hide');
    }
}


function removedZoomItem(removedItem) {
    if (removedItem.inputId === 'empresa') {
        cods = new Array();
        var empresas = $('#empresa').val();

        // cods.push(empresaCods[empresas[i]]);
        for (var ind in Object.keys(empresaCods)) {
            for(var i in empresas) {
                if (Object.keys(empresaCods)[ind] == empresas[i]) cods.push(Object.values(empresaCods)[ind]);
            }
        }

        $('#empresaCod').val(cods.toString());
    }

    if (removedItem.inputId === 'responsavel') {
        empresaCods = new Array();
        $('#empresaCod').val('');
        window['empresa'].clear();
        $('.empresaZoom').addClass('hide');
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

function EnviarEmail() {
    var api = "/api/public/alert/customEmailSender";
    var obj = {
        "to" : DADOS.email,
        "from" : "contato@bullaconsultoria.com.br",
        "subject" : "Bem vindo!",
        "templateId" : "bulla_welcome",
        "dialectId"  : "pt_BR",
        "param" : {
            "NOME_CLIENTE": DADOS.nome
        }
    }
    var email = $.ajax({
        async : false,
        contentType: "application/json",
        type : "post",
        dataType : "json",
        url : api,
        data : JSON.stringify(obj),
        success:function(obj){
            console.log(obj)
        }
    });
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