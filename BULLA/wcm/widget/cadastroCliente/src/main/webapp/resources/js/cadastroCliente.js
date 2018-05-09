$(document).ready(function () {
    mask();

    $('.ambos, .fisica, .juridica').hide();

    $('[name=tipoPessoa]').on('change', function () {
        $(this).val() == 'F' ? $('.ambos, .fisica').show("fast", function () {
            $('.juridica').hide();
        }) : $('.ambos, .juridica').show("fast", function () {
            $('.fisica').hide();
        });
    });
    
    $('#cpfResp').on('blur', function () {
        if($(this).val() == '') return $('input').val('');
        var res = verficaExistente($('#cpfResp').val());
        if (res.values.length > 0) {
            res = res.values[0];
            DADOS.push(res);
            $('#codResp').val(res['codResp']);
            $('#nomeResp').val(res['nomeResp']);
            $('#rgResp').val(res['rgResp']);
            $('#telefoneResp').val(res['telefoneResp']);
            $('#skypeResp').val(res['skypeResp']);
            $('#emailResp').val(res['emailResp']);
            $('#nascimentoResp').val(res['nascimentoResp']);
            $('#nomeResp, #rgResp, #telefoneResp, #skypeResp, #emailResp, #nascimentoResp').prop('readonly', true);
            $('#salvar').addClass('hide');
            $('.opcoesJur').removeClass('hide');
        } else {
            // $('#codResp, #nomeResp, #rgResp, #telefoneResp, #skypeResp, #emailResp, #nascimentoResp').val('');
            $('#nomeResp, #rgResp, #telefoneResp, #skypeResp, #emailResp, #nascimentoResp').prop('readonly', false);
            $('.opcoesJur').addClass('hide');
            $('#salvar').removeClass('hide');
        }
    });

    var onlyDate = FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: false
    });
});

var DADOS = [];

function mask() {
    $('.date > .form-control').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');
    $('.cnpj').mask('00.000.000/0000-00');
    $('.cep').mask('00.000-000');
    $('.fone').mask('(00) 0000-0000#');
    $('.fone').on('blur', function () {
        $(this).val().length == 15 ? $(this).mask('(00) 0 0000-0000') : $(this).mask('(00) 0000-0000#');
    });
}

function verficaExistente(cpf) {
    var c1 = DatasetFactory.createConstraint("cpfResp", cpf, cpf, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("dsFormResp", null, new Array(c1), null);
    return dataset;
}

function salvarNovo(id) {
    var criar = criaRegistro(id);
    if(!criar.values[0]['ERROR']) {
        var dados = {};

        $('#respMod').find('input, textarea').each(function () {

            if($(this).attr('type') == 'radio' && !$(this).is(':checked')) return true;

            if($(this).is(':visible'))
                dados[$(this).attr('name')] = $(this).val();
        });

        dados["codResp"] = criar.values[0]['Retorno'];

        var reg = insere(dados, criar.values[0]['Retorno']);
        if(!reg.values[0]['ERROR']) {
            FLUIGC.toast({
                title: '',
                message: "Salvo com sucesso!",
                type: 'success'
            });

            $('#cpfResp').blur();
        } else {
            FLUIGC.toast({
                title: '',
                message: "Erro: "+reg.values[0]['ERROR'],
                type: 'danger'
            });
        }
    }
}

function openModal(e) {
    var id;
    if(e == 'contentModalNovaFarmacia') {
        getRegimeTributario();
        id = 34568;
    }

    var contentModal = $('#contentModalNovaFarmacia').html();

    var myModal = FLUIGC.modal({
        title: 'Novo',
        content: '<div id="instanceModal">' + contentModal + '</div>',
        id: 'fluig-modal',
        size: 'full',
        actions: [{
            'label': 'Salvar',
            'bind': 'data-salvar',
            'classType': 'btn-success'
        }, {
            'label': 'Cancelar',
            'classType': 'btn-danger',
            'autoClose': true
        }]
    });

    $('[data-salvar]').on('click', function () {
        var criar = criaRegistro(id);
        var dados = {};

        if(!criar.values[0]['ERROR']) {
            $('#instanceModal').find('input, textarea, select').each(function () {
                if($(this).attr('type') == 'radio' && !$(this).is(':checked')) return true;

                if($(this).is(':visible'))
                    dados[$(this).attr('name')] = $(this).val();
            });

            dados['cod'] = criar.values[0]['Retorno'];
            dados['responsavel'] = $('#codResp').val();
        }

        var reg = insere(dados, criar.values[0]['Retorno']);
        if(!reg.values[0]['ERROR']) {
            FLUIGC.toast({
                title: '',
                message: "Salvo com sucesso!",
                type: 'success'
            });
            myModal.remove();
        } else {
            FLUIGC.toast({
                title: '',
                message: "Erro: "+reg.values[0]['ERROR'],
                type: 'danger'
            });
        }
    });

    mask()
}

function criaRegistro(id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
    return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
}

function insere(val, id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CardId", id, "", ConstraintType.MUST));
    var keys = Object.keys(val);
    for(k in keys) {
        constraints.push(DatasetFactory.createConstraint("CardData", keys[k]+";" + val[keys[k]], "", ConstraintType.MUST));
    }
    return DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = day + '/' + month + '/' + year;
    var currentTime = currentDate + "  " + currentHour;
    return currentTime;
}

function getRegimeTributario() {
    $('[name=regimeTributario]').html('<option value="">Selecione</option>');
    var r = DatasetFactory.getDataset("dsRegimeTributario", null, null, null);
    var html = '';
    for(var i in r.values) {
        html += '<option value="'+r.values[i]['nome']+'">'+r.values[i]['nome']+'</option>';
    }
    $('[name=regimeTributario]').append(html);

    $('[name=tipoContrato]').html('<option value="">Selecione</option>');
    var r = DatasetFactory.getDataset("dsTiposdeContrato", null, null, null);
    var html = '';
    for(var i in r.values) {
        html += '<option value="'+r.values[i]['nome']+'">'+r.values[i]['nome']+'</option>';
    }
    $('[name=tipoContrato]').append(html);
}