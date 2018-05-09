var beforeSendValidate = function(numState,nextState){
    if($('#rateio').val() == 'S') {
        var v = validaRateios(true);
        if(v === false) throw "Erro! Por favor, corrija os rateios.";
    }
}

function Inicio() {
    var atividade = WKNumState;
    var processo = WKNumProces;
    Carregajquery();
    console.log('atividade: '+atividade);
    /**
     * Atividade Inicio
     **/
    if	(atividade == 08 || atividade == 01 || atividade == 00)  {
        if ($('#nomeFavorecido').val() != '') {
            $('#fsDadosAprovacao').css('display', 'none');
            //tratarAccordion('0');
            desabilitaCampos('#accordion');
            $('#aNavPagamento').css('display', 'block');
            $('#navPagamento').addClass('active');
            // $('#fsDadosPesquisa').css('display', 'none');
            $('#fsDadosAprovacao').css('display', 'block');
        } else {
            $("#idDirf").val('2');
        }
    } else{
        if ($('#idRateio').val() == 'S') {
            $('#aNavRateio').css('display', 'block');
        }
        $('#valorRateioTotal').val($('#valorPagamento').val());
        $('#percRateioTotal').val('100,0');
        desabilitaCampos('#fsNav');
        $('#aNavPagamento').css('display', 'block');
        $('#navPagamento').addClass('active');
        // $('#fsDadosPesquisa').css('display', 'none');
        $('#fsDadosAprovacao').css('display', 'block');
//*Validar Preenchimento
        if	(atividade == 09 || atividade == 15)  {
            tratarAccordion('0');
        } else
//*Aprovar Diretoria
        if	(atividade == 16 || atividade == 18)  {
            tratarAccordion('1');
        } else
//*Aprovar Diretoria Financeira
        if	(atividade == 17 || atividade == 23)  {
            tratarAccordion('2');
        } else
//*Análise Tributária - NF
        if	(atividade == 11 || atividade == 28)  {
            $('#divGeraDirf').css('display', 'block');
            habilitaCampos('#divRetencao');
            tratarAccordion('3');
        } else
//*Conferir Valores / Lançamento Contas a Pagar
        if	(atividade == 13 || atividade == 32)  {
            $('#divGeraDirf').css('display', 'block');
            $('#divRetencao').css('display', 'block');
            tratarAccordion('4');
        } else
//*Corrigir os valores
        if	(atividade == 22 || atividade == 44)  {
            desabilitaCampos('#accordion');
            habilitaCampos('#fsNav');
            $('#divGeraDirf').css('display', 'block');
            $('#divRetencao').css('display', 'block');
            $('#descNatureza').attr('readonly', true);
            $('#contaContabil').attr('readonly', true);
            $('#valorRateioTotal').attr('readonly', true);
            $('#percRateioTotal').attr('readonly', true);
        }
    }
}

/**
 * Desabilita os campos da DIV
 * @param idcampo
 * @returns
 */
function desabilitaCampos(idcampo){

    $(idcampo).find("input, textarea, select").each(function(){
        $('#'+this.id).attr('readonly', true);
    })

    $(idcampo).find("select").each(function(){
        $('select#'+this.id+' option:not(:selected)').prop('disabled', true);
    })

    $("#btnDtEmissao").unbind('click');
    $("#btnDtVenc").unbind('click');
}
/**
 * Função para habilitar DIV
 * @param idcampo
 * @returns
 */
function habilitaCampos(idcampo){

    $(idcampo).find("input, textarea, input[type=zoom], select").each(function(){
        $(this).attr("readonly", false);
    })

    $(idcampo).find("select").each(function(){
        $('select#' + this.id +' option').removeAttr('disabled');
    })

    $(idcampo).find("input[type=checkbox]").each(function(){
        $('#' + this.id).removeAttr('disabled');
    })
    $("#btnDtEmissao").bind('click');
    $("#btnDtVenc").bind('click');

}


$(document).ready(function(){

    FLUIGC.switcher.init('#rateio');

    var dtVenc = calculaLimiteDtVenc();
    var alerta =  '<strong>Atenção!</strong> Solicitação apenas para datas de vencimento a partir de '+dtVenc+'.';
    $('#divAlert').html(alerta);

    $('#valorPagamentoRateio').html($('#valorPagamento').val());

    $(".navbar-default").css('background', '#FFF');
    //$(".navbar-default").css('color', '#FFF');

    // $("#aNavPagamento").hover(function(){
    //     $(this).css("background-color", "#00824a");
    //     $(this).css("color", "white");
    // }, function(){
    //     $(this).css("background-color", "none");
    //     $(this).css("color", "#555");
    // });

    // $("#aNavRateio").hover(function(){
    //     $(this).css("background-color", "#00824a");
    //     $(this).css("color", "white");
    // }, function(){
    //     $(this).css("background-color", "none");
    //     $(this).css("color", "#555");
    // });
    //
    // $("h3.ui-accordion-header").hover(function(){
    //     $(this).css("background-color", "#00824a");
    //     $(this).css("color", "white");
    // }, function(){
    //     $(this).css("background-color", "white");
    //     $(this).css("color", "#00824a");
    // });

    // $("#btnPesquisar").on('click',function(){
    //     var fornecedor = consultaFornecedor($('#cpfPessoaFisica').val());
    //     FLUIGC.loading(window).show();
    //     if (fornecedor == 0) {
    //         setTimeout(function () {
    //             $('#aNavPagamento').css('display', 'block');
    //             $('#navPagamento').addClass('active');
    //             $('#fsDadosPesquisa').css('display', 'none');
    //             FLUIGC.loading(window).hide();
    //         }, 2000);
    //     }
    // });

    $("#btAddRateio").on('click',function(){
        var atividade = WKNumState;

        if	(atividade == 08 || atividade == 01 || atividade == 00)  {
            if (parseInt($('#valorRateioTotal').val().replace(/[^\d]+/gi,'')) > parseInt($('#valorPagamento').val().replace(/[^\d]+/gi,''))) {
                MensagemAlerta('Solicitação de Pagamento', 'Não foi possível inserir outro registro pois o valor de rateio ultrapassará o valor do pagamento. Favor verificar.');
            } else {
                var idx = wdkAddChild('tableRateio');
                $('#valorRateio___' + idx).val(000);
                $('#percRateio___' + idx).val(00);
                var filtro = "CCODIGO," + $('#cFilEmp').val();
                reloadZoomFilterValues("zoomCr___"+idx, filtro);
                var inputs = $("[mask]");
                MaskEvent.initMask(inputs);
            }
        } else {MensagemAlerta('Solicitação de Pagamento', 'Proibido a inserção de rateio nessa etapa do processo.');}
    });

    $("#cpfPessoaFisica").on('blur',function(){
        if($(this).val() != '' && $(this).val() != undefined && $(this).val() != null) {
            var fornecedor = consultaFornecedor(this.value);
            if(fornecedor == 0) {
                $('#aNavPagamento').css('display', 'block');
                $('#navPagamento').addClass('active');
                $('.tgSlide').slideToggle();
                FLUIGC.loading(window).hide();
            }
        }
    });

    $("#valorPagamento").on('blur',function(){
        $('.has-error').removeClass('has-error');
        if ($('#zoomUnidade').val() == '' || $('#zoomUnidade').val() == null || $('#zoomUnidade').val() == undefined) {
            MensagemAlerta('Solicitação de Pagamento', 'Selecione primeiro a Unidade.');
        } else
        if ($('#idRateio').val() == 'S') {
            if (isNaN(parseInt($('#valorPagamento').val().replace(/[^\d]+/gi,'')))) {
                $('#valorPagamento').parent( 'div' ).addClass('has-error');
                MensagemAlerta('Solicitação de Pagamento', 'Valor do Pagamento obrigatório');
            } else {
                $('#valorPagamentoRateio').html($('#valorPagamento').val());
                $('#aNavRateio').css('display', 'block');
            }
        } else {
            // $('#aNavRateio').css('display', 'none');
        }
    });

    $("#f_divDtVenc").on('blur',function(){
        $('.has-error').removeClass('has-error');
        if (validaData($('#dtVenc').val()) != 4) {
            $('#dtVenc').parent( 'div' ).addClass('has-error');
            MensagemAlerta('Solicitação de Pagamento', 'Data de Vencimento Inválida!');
        } else
        if (validaPrazo($('#dtVenc').val()) != 0) {
            $('#dtVenc').parent( 'div' ).addClass('has-error');
            MensagemAlerta('Solicitação de Pagamento', 'Data de Vencimento informada abaixo da Data Limite de Vencimento '+$('#dtLimVenc').val()+'!');
        }
    });

    FLUIGC.switcher.onChange('#rateio', function(event, state){
        if (state == true) {
            $("#idRateio").val('S');
            if (isNaN(parseInt($('#valorPagamento').val().replace(/[^\d]+/gi,'')))) {
                $('#valorPagamento').parent( 'div' ).addClass('has-error');
                MensagemAlerta('Solicitação de Pagamento', 'Valor do Pagamento obrigatório');
                $('#rateio').click();
            } else {
                $('#valorPagamentoRateio').html($('#valorPagamento').val());
                $('#aNavRateio').css('display', 'block');
                $('#qtTotalRateio').val($('#valorPagamento').val());
            }
        } else {
            $('#aNavRateio').css('display', 'none');
            $("#idRateio").val('N');
        }
    });

    $("#dirf").on('click change',function(){
        if ( $("#dirf").is(':checked') ) {
            $("#idDirf").val('1');
            $('#divRetencao').css('display', 'block');
        } else {
            $('#divRetencao').css('display', 'none');
            $("#idDirf").val('2');
        }
    });
});

function addChild() {
    var VALOR_TOTAL = $('#qtTotalRateio').val().replace('.','');
    VALOR_TOTAL = VALOR_TOTAL.replace(',','.');

    if(parseFloat(VALOR_TOTAL) > 0) {
        var add = wdkAddChild('tableRateio');
        // $('#')
    }
    else
        FLUIGC.toast({
            title: '',
            message: "Por favor, preencha o valor total!",
            type: 'danger'
        });
}


function getRateioValoresPercent() {
    var VALOR_TOTAL = $('#qtTotalRateio').val().replace('.','');
    VALOR_TOTAL = VALOR_TOTAL.replace(',','.');

    $('[id*=percentualRateio___]').each(function () {
        var id = $(this).attr('id').split('___')[1];
        var v = $(this).val().replace('%','') / 100 * parseFloat(VALOR_TOTAL);
        $('#valorRateio___'+id).val(parseFloat(v).toFixed(2));
    });

    validaRateios();
}

function getRateioValores() {
    var VALOR_TOTAL = $('#qtTotalRateio').val().replace('.','');
    VALOR_TOTAL = VALOR_TOTAL.replace(',','.');

    $('[id*=valorRateio___]').each(function () {
        var v = (parseFloat($(this).val()) * 100) / VALOR_TOTAL;
        var id = $(this).attr('id').split('___')[1];
        $('#percentualRateio___'+id).val(v+'%');
    });

    validaRateios();
}

function validaRateios(final) {
    var VALOR_TOTAL = $('#qtTotalRateio').val().replace('.','');
    VALOR_TOTAL = VALOR_TOTAL.replace(',','.');

    var valorT = 0;
    $('[id*=valorRateio___]').each(function () {
        valorT = parseFloat(valorT) +  parseFloat($(this).val());
    });

        if(valorT > VALOR_TOTAL) {
        console.log('A soma dos valores é maior que o valor total');
        FLUIGC.toast({
            title: '',
            message: "A soma dos valores é maior que o valor total!",
            type: 'danger'
        });

        return false;
    } else if(valorT < VALOR_TOTAL && final) {
        FLUIGC.toast({
            title: '',
            message: "A soma dos valores é menor que o valor total!",
            type: 'danger'
        });

        return false;
    }

    var valorP = 0;

    $('[id*=percentualRateio___]').each(function () {
        var id = $(this).attr('id').split('___')[1];
        var v = $(this).val().replace('%','');
        valorP = parseFloat(valorP) + parseFloat(v);
    });

    if(valorP > 100) {
        console.log('A soma dos percentuais é maior que 100%');
        FLUIGC.toast({
            title: '',
            message: "A soma dos percentuais é maior que 100%!",
            type: 'danger'
        });

        return false;
    }  else if(valorP < 100 && final) {
        FLUIGC.toast({
            title: '',
            message: "A soma dos percentuais é menor que 100%!",
            type: 'danger'
        });

        return false;
    }

    return true;
}


/**
 * Efetua calculo do total de Rateio, por percentual ou valor informado
 * @param objeto a ser calculado
 * @returns
 */
function formataTotal(param) {

    if (!param.readOnly) {
        $('.has-error').removeClass('has-error');

        if (isNaN(parseFloat(param.value)) || parseFloat(param.value.replace(/[^\d]+/gi,'.')) == 0) {
            $('#'+param.id).parent( 'div' ).addClass('has-error');
            MensagemAlerta('Solicitação de Pagamento', 'Favor preencher o Valor do Rateio ou Percentual.');
        }

        if (param.id.startsWith('valorRateio')) {
            var retorno = calculaTotalRateio();

            //var total = $('#valorPagamento').val().replace(/[^\d]+/g,'');
            //var reg1 = param.value.replace(/[^\d]+/g,'');
            var total = $('#valorPagamento').val().replace(/[^\d]+/g,'')
            var tableId = param.id.substring(param.id.indexOf("___") + 3, param.id.indexOf("___") + 6);

            $('#percRateio___'+tableId).val((parseInt(param.value.replace(/[^\d]+/g,'')) / parseInt(total) * 100).toFixed(1).replace('.', ','));


            //$('#percRateio___'+tableId).val(parseInt((reg2 / total2) * 100));

            if (retorno > total) {
                $('#'+param.id).parent( 'div' ).addClass('has-error');
                MensagemAlerta('Solicitação de Pagamento', 'Valor Total do Rateio ultrapassa o Valor do Pagamento. Favor verificar.');
            } else {
                $('#valorRateioTotal').val(formatBR(retorno.toString().replace('.', ''), 2));
                $('#percRateioTotal').val(((retorno / parseInt(total)) * 100).toFixed(1).replace('.', ','));
            }
        } else {

        }
    }
};

/**
 * Função para deletar elemento da tabela PaixFilho, e decrementar o valor do pagamento
 * @param oElement
 * @returns
 */
function fnCustomDelete(oElement, id){

    var atividade = WKNumState;

    if	(atividade == 08 || atividade == 01 || atividade == 00 || atividade == 22 || atividade == 44)  {
        fnWdkRemoveChild(oElement);
        calculaTotalRateio();
    } else{MensagemAlerta('Solicitação de Pagamento', 'Proibida exclusão de rateio nesta etapa do processo.');};
};

/**
 * Função para calculo de total de Rateio
 * @returns o total calculado
 */
function calculaTotalRateio() {

    var tableRateio = $('table#tableRateio tbody tr [id^="valorRateio___"]');
    var tablePerc = $('table#tableRateio tbody tr [id^="percRateio___"]');

    var totalRat = 0;
    var totalPerc = 0;

    for(var i = 0; i < tableRateio.length; i++){
        if (tableRateio[i].value != '') {
            var reg2 = tableRateio[i].value.replace(/[^\d]+/g,'');
            if (!isNaN(parseInt(reg2))) {
                totalRat = parseInt(totalRat) + parseInt(reg2);
                $('#valorRateioTotal').val(formatBR(totalRat.toString(), 2));
            }
        }
        if (tablePerc[i].value != '') {
            var reg3 = tablePerc[i].value.replace(/[^\d]+/g,'');
            if (!isNaN(parseInt(reg3))) {
                totalPerc = parseInt(totalPerc) + parseInt(reg3);
                $('#percRateioTotal').val(formatBR(totalPerc.toString(), 1));
            }
        }
    }

    return totalRat;
}

function Carregajquery()
{
    $("#accordion").accordion({
        collapsible : true,
        //event: "mouseover",
        icons: { "header": "ui-icon-circle-plus", "activeHeader": "ui-icon-circle-close" },
        active : false,
        heightStyle : "content",
        animate: 200
    });

    $(document).tooltip();
    $(".ui-accordion-header").css('background', '#fff');
    $(".navbar-default").css('background', '#fff');

}

function formatBR(value, decimais) {

    decimais = decimais || 2;
    var mi = value.length - parseInt(decimais);
    var sm = parseInt(mi / 3);
    var regx = "", repl = "";

    for (var i = 0; i < sm; i++) {
        regx = regx.concat('([0-9]{3})');
        repl = repl.concat('.$' + (i + 1));
    }

    regx = regx.concat('([0-9]{' + decimais + '})') + "$";
    repl = repl.concat(',$' + (sm + 1));
    value = value.toString().replace(new RegExp(regx, 'g'), repl);
    return (mi % 3) === 0 ? value.substr(1) : value;
}

/**
 * Rotina para consulta de Fornecedor
 * @param valor - CPF/CNPJ
 * @returns
 */

function consultaFornecedor(valor) {
    var c1 = DatasetFactory.createConstraint('CCODIGO', $('#cFilEmp').val(), $('#cFilEmp').val(),ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('CCNPJCPF', valor.replace(/[^\d]+/gi,''), valor.replace(/[^\d]+/gi,''),ConstraintType.MUST);

    var constraints = new Array(c1, c2);
    var fornecedor = DatasetFactory.getDataset("dsFornecedor", null,constraints, null);

    if (fornecedor.values.length > 0) {
        if (fornecedor.values[0].CSTATUS == 'Bloqueado') {
            $('#btnPesquisar').addClass('disabled');
            $('#btnAdicionar').addClass('disabled');
            MensagemAlerta('Solicitação de Pagamento', 'Fornecedor bloqueado. Favor verificar!');
            return 1;
        } else {
            $('#nomeFavorecido').val(fornecedor.values[0].CNOME);
            $('#idFornecedor').val($('#cpfPessoaFisica').val());
            $('#telefone').val(fornecedor.values[0].CDDD+' - '+fornecedor.values[0].CTELEFONE);
            $('#contato').val(fornecedor.values[0].CCONTATO);
            $('#cCodigoForn').val(fornecedor.values[0].CCODIGO);
            $('#cLojaForn').val(fornecedor.values[0].CLOJA);

            if (fornecedor.values[0].CBANCO.replace(/\s/g, '') != '' && fornecedor.values[0].CBANCO != undefined){
                $('#CBANCOFOR').val(fornecedor.values[0].CBANCO);
                $('#cBanco').val(fornecedor.values[0].CBANCO).attr('readonly', true);
            }

            if (fornecedor.values[0].CAGENCIA.replace(/\s/g, '') != '' && fornecedor.values[0].CAGENCIA != undefined) {
                $('#cAgencia').val(fornecedor.values[0].CAGENCIA).attr('readonly', true);
                $('#CAGENCIAFOR').val(fornecedor.values[0].CAGENCIA);
            }
            if (fornecedor.values[0].CDIGAGENCIA != '' && fornecedor.values[0].CDIGAGENCIA != undefined) {
                $('#cDigAgencia').val(fornecedor.values[0].CDIGAGENCIA).attr('readonly', true);
                $('#CDIGAGENCIAFOR').val(fornecedor.values[0].CDIGAGENCIA);
            }

            if (fornecedor.values[0].CCONTA.replace(/\s/g, '') != '' && fornecedor.values[0].CCONTA != undefined) {
                $('#cCCorrente').val(fornecedor.values[0].CCONTA).attr('readonly', true);
                $('#CCONTAFOR').val(fornecedor.values[0].CCONTA);
            }
            if (fornecedor.values[0].CDIGCONTA != '' && fornecedor.values[0].CDIGCONTA != undefined) {
                $('#cDigCCorrente').val(fornecedor.values[0].CDIGCONTA).attr('readonly', true);
                $('#CDIGCONTAFOR').val(fornecedor.values[0].CDIGCONTA);
            }

            $('#btnAdicionar').addClass('disabled');
            $('#btnPesquisar').addClass('btn-success');

            $('#fsNav').removeClass('hide');
            FLUIGC.loading(window).hide();

            return 0;
        }
    } else {
        $('#btnAdicionar').addClass('btn-success');
        $('#btnPesquisar').addClass('disabled');
        FLUIGC.modal({
            title: 'Solicitação de Pagamento',
            content: 'Fornecedor não existe para essa Filial. Deseja adicionar um novo fornecedor?',
            id: 'fluig-modal',
            size: 'larger',
            actions: [{
                'label': 'Sim',
                'bind': 'data-novoForn',
                'autoClose': true
            },{
                'label': 'Não',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
            } else {
            }
        });

        $('[data-novoForn]').on('click', function () {
            window.open("http://fluig.unimedgoiania.coop.br/portal/p/3/pageworkflowview?processID=cadastroFornecedor", "_blank");
        });

        return 3;
    }
}

/***
 * Valida Data de Vencimento
 */
function validaPrazo(str2){

    var dtLimtVenc = parseInt(calculaLimiteDtVenc().split('/').reverse().join(''));
    var dtVenc  = parseInt(str2.split('/').reverse().join(''));

    if(dtVenc < dtLimtVenc) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * Funcção para calculo de data limite de vencimento para abertura da solicitação
 * @returns - data limite de vencimento
 */
function calculaLimiteDtVenc() {

    var dias = 10;
    var dataAtual = new Date();
    var previsao = new Date();

    previsao.setDate(dataAtual.getDate() + dias);
    var day = previsao.getDate() < 10 ? '0' + previsao.getDate() : previsao.getDate();
    var month = (previsao.getMonth() + 1) < 10 ? '0' + (previsao.getMonth() + 1) : (previsao.getMonth() + 1);
    n = day  +"/" + month + "/" + previsao.getFullYear();
    $('#dtLimVenc').val(n);
    return n;

}

/**
 * Função para bloquear os outros accordions
 * @param id
 * @returns
 */
function tratarAccordion(id) {

    //var ativar = parseInt(id);
    $('#accordion').accordion('option', 'active', parseInt(id));

    switch(id) {
        case '0':
            $('#divRespDir').css('display', 'none');
            $('#divRespDirFin').css('display', 'none');
            $('#divRespCont').css('display', 'none');
            $('#divRespFin').css('display', 'none');
            $('#h3DivRespDir').css('display', 'none');
            $('#h3DivRespDirFin').css('display', 'none');
            $('#h3DivRespCont').css('display', 'none');
            $('#h3DivRespFin').css('display', 'none');
            break;
        case '1':
            desabilitaCampos('#divRespGer');
            $('#divRespDirFin').css('display', 'none');
            $('#divRespCont').css('display', 'none');
            $('#divRespFin').css('display', 'none');
            $('#h3DivRespDirFin').css('display', 'none');
            $('#h3DivRespCont').css('display', 'none');
            $('#h3DivRespFin').css('display', 'none');
            break;
        case '2':
            desabilitaCampos('#divRespGer');
            desabilitaCampos('#divRespDir');
            $('#divRespCont').css('display', 'none');
            $('#divRespFin').css('display', 'none');
            $('#h3DivRespCont').css('display', 'none');
            $('#h3DivRespFin').css('display', 'none');
            break;
        case '3':
            desabilitaCampos('#divRespGer');
            desabilitaCampos('#divRespDir');
            if ($('#respDirFin').val() != '') {
                desabilitaCampos('#divRespDirFin');
            } else {
                $('#divRespDirFin').css('display', 'none');
                $('#h3DivRespDirFin').css('display', 'none');
            }
            $('#divRespFin').css('display', 'none');
            $('#h3DivRespFin').css('display', 'none');
            break;
        case '4':
            if ($('#respDirFin').val() != '') {
                desabilitaCampos('#divRespDirFin');
            } else {
                $('#divRespDirFin').css('display', 'none');
                $('#h3DivRespDirFin').css('display', 'none');
            }
            desabilitaCampos('#divRespGer');
            desabilitaCampos('#divRespDir');
            desabilitaCampos('#divRespCont');
            break;
        default:
            break;
    }

}