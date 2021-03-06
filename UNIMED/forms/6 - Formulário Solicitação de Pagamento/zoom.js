/**
 * Função do leave do Zoom
 * @param selectedItem - Item selecionado
 */
function setSelectedZoomItem(selectedItem){

    var tableId = selectedItem.inputId.substring(selectedItem.inputId.indexOf("___") + 3, selectedItem.inputId.indexOf("___") + 6);

    //if(selectedItem.inputId.startsWith('zoomCr')){
    if(selectedItem.inputId == 'zoomCCustoRateio___'+tableId){
        $('#codRateio___'+tableId).val(selectedItem.CCODIGO);
    }

    // var tableId = selectedItem.inputId.substring(selectedItem.inputId.indexOf("___") + 3, selectedItem.inputId.indexOf("___") + 6);
    //if(selectedItem.inputId.startsWith('zoomCr')){
    if(selectedItem.inputId == 'zoomRateio'){
        console.log(selectedItem);
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("tablename", 'tableRateio', 'tableRateio', ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("metadata#id", selectedItem.documentid, selectedItem.documentid, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("metadata#version", selectedItem['metadata#version'], selectedItem['metadata#version'], ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset("dsRateios", null, constraints, null);
        console.log(dataset.values);
        for(var i in dataset.values) {
            var rec = dataset.values[i];
            var idx = wdkAddChild('tableRateio');
            // $('#zoomCCustoRateio___' + idx).val(rec['zoomCCustoRateio']);
            setZoomData("zoomCCustoRateio___"+idx, rec['zoomCCustoRateio']);
            $('#valorRateio___' + idx).val(rec['valorRateio']);
            $('#codZRateio___' + idx).val(rec['codRateio']);
            $('#percentualRateio___' + idx).val(rec['percentualRateio']);
        }

        getRateioValoresPercent();
    }

    if(selectedItem.inputId == 'zoomUnidade' || selectedItem.inputId == 'zoomUnidadePesq'){
        if (selectedItem.inputId == 'zoomUnidadePesq') {
            setZoomData("zoomUnidade", selectedItem.CNOMEFIL);
            $("#zoomUnidade").attr('readonly', true);
        }
        var filtro = "CCODIGO," +selectedItem.CFILEMP;
        $('#cEmpresa').val(selectedItem.CEMPRESA);
        $('#cFilEmp').val(selectedItem.CFILEMP);
        // reloadZoomFilterValues("zoomTipoPagto", filtro);
        // reloadZoomFilterValues("zoomFormaPagto", filtro);
        // reloadZoomFilterValues("zoomNatureza", filtro);
        var filtro2 = "CFILEMP," +selectedItem.CFILEMP;
        // reloadZoomFilterValues("zoomCCusto", filtro2);
        $('.btn-sucess').removeClass('btn-sucess');
        if ($('#cpfPessoaFisica').val() != '' && $('#cpfPessoaFisica').val() != null && $('#cpfPessoaFisica').val() != undefined)  {
            $('.disabled').removeClass('disabled');
            var fornecedor = consultaFornecedor($('#cpfPessoaFisica').val());
        }
    }

    if(selectedItem.inputId == 'zoomFormaPagto') {
        $('#CODFORMPAGTO').val(selectedItem.CCODIGO);
        if (selectedItem.CCODIGO == '11' || selectedItem.CCODIGO == '30' || selectedItem.CCODIGO == '31') {
            $('#codBarra').attr('readonly', false);
        } else {
            $('#codBarra').attr('readonly', true);
        }
    }

    if(selectedItem.inputId == 'zoomConsultaRetencao') {
        $('#CODRETENCAO').val(selectedItem.CCODIGO);
    }

    if(selectedItem.inputId == 'zoomNatureza') {
        $('#contaContabil').val(selectedItem.CCONTACONTABIL);
        $('#descNatureza').val(selectedItem.CDESCRICAO);
        $('#CODNATUREZA').val(selectedItem.CNATUREZA);
    }

    if(selectedItem.inputId == 'zoomTipoPagto') {
        $('#CODTIPOPAGTO').val(selectedItem.CCODIGO);
    }

    if(selectedItem.inputId == 'zoomCCusto') {
        $('#CODCCUSTO').val(selectedItem.CCODIGO);
    }

    // if(selectedItem.inputId == 'zoomCCustoSolic') {
    //     $('#CODCCUSTOSOLIC').val(selectedItem.CCODIGO);
    //     if ($('#zoomUnidade').val() == '') {
    //         MensagemAlerta('Solicitação de Pagamento', 'Selecione primeiro a Unidade.');
    //     } else
    //     {
    //         if (selectedItem.CIDFLUIGRESP == '') {
    //             MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo sem Responsável Gerência Cadastrado. Favor selecionar outro Centro de Custo.');
    //         } else {
    //             $('#idRespGerencia').val(selectedItem.CIDFLUIGRESP.trim());
    //             var centroCusto = selectedItem.CCODIGO.substr(0, 3);
    //             var constraintDsCentroCustoUnimed1 = DatasetFactory.createConstraint('CDESCRICAO', centroCusto, centroCusto, ConstraintType.MUST);
    //             var dsCentroCustoUnimed = DatasetFactory.getDataset('dsCentroCustoUnimed', null, new Array(constraintDsCentroCustoUnimed1), null);
    //             if (dsCentroCustoUnimed.values.length > 0) {
    //                 if (dsCentroCustoUnimed.values[0].CIDFLUIGRESP == '' || dsCentroCustoUnimed.values[0].CIDFLUIGRESP == undefined) {
    //                     MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo sem Responsável Diretoria Cadastrado. Favor selecionar outro Centro de Custo.');
    //                 } else {
    //                     $('#idRespDiretoria').val(dsCentroCustoUnimed.values[0].CIDFLUIGRESP.trim());
    //                 }
    //             } else {
    //                 MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo Sintético ' + centroCusto + ' não encontrado ou sem Responsável Diretoria cadastrada. Favor selecionar outro Centro de Custo.');
    //             }
    //         }
    //     }
    // }
    if(selectedItem.inputId == 'zoomCCustoRateio___'+selectedItem.inputId.split('___')[1]) {
        if(selectedItem['CSTATUS'] == 'NAO BLOQUEADO' && selectedItem['CTIPO'] == "ANALITICO") {
            $('#codRateio___'+selectedItem.inputId.split('___')[1]).val(selectedItem['CCODIGO']);
        } else {
            alert('Centro de Custo bloqueado!');
            window['zoomCCustoRateio___'+selectedItem.inputId.split('___')[1]].clear();
        }
    }

    if(selectedItem.inputId == 'zoomCCustoSolic') {
        $('#CODCCUSTOSOLIC').val(selectedItem.CCODIGO);
        if ($('#zoomUnidade').val() == '') {
            MensagemAlerta('Solicitação de Pagamento', 'Selecione primeiro a Unidade.');
        } else
        {
            var respId = selectedItem.CIDFLUIGRESP;
            respId = respId.toString().trim();
            var cod = selectedItem.CCODIGO;
            cod = cod.toString().trim();

            if (respId.trim() == '') {
                MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo sem Responsável Gerência Cadastrado. Favor selecionar outro Centro de Custo.');
            } else {
                $('#idRespGerencia').val(respId);
                var centroCusto = cod.substr(0, 3);
                var dsCentroCustoUnimed = DatasetFactory.getDataset('dsCentroCustoUnimed', null, null, null);
                if (dsCentroCustoUnimed.values.length > 0) {
                    var dsResp = '';
                    for(var i in dsCentroCustoUnimed.values) {
                        var findCod = dsCentroCustoUnimed.values[i].CCODIGO;
                        var findDesc = dsCentroCustoUnimed.values[i].CDESCRICAO;

                        if (findCod == centroCusto.toString() + "010101") {
                            dsResp = dsCentroCustoUnimed.values[i].CIDFLUIGRESP;
                            dsResp = dsResp.trim();
                            $('#idRespDiretoria').val(dsResp);
                        }
                    }

                    if(dsResp == '') MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo sem Responsável Diretoria Cadastrado. Favor selecionar outro Centro de Custo.');
                } else {
                    MensagemAlerta('Solicitação de Pagamento', 'Centro de Custo Sintético ' + centroCusto + ' não encontrado ou sem Responsável Diretoria cadastrada. Favor selecionar outro Centro de Custo.');
                }
            }
        }
    }
}
/**
 * Função acionada ao eliminar uma tag(valor) de um campo zoom
 * @param removedItem
 * @returns
 */
function removedZoomItem(removedItem) {

    if (removedItem.inputId == 'zoomNatureza') {
        $('#contaContabil').val('');
        $('#descNatureza').val('');
    }

    if (removedItem.inputId == 'zoomCCustoSolic') {
        $('#idRespGerencia').val('');
        $('#idRespDiretoria').val('');
    }

    if(removedItem.inputId == 'zoomRateio'){
       $('[id*=zoomCCustoRateio___]').remove();
    }

    if (removedItem.inputId == 'zoomUnidade') {
        if (removedItem.inputId == 'zoomUnidadePesq') {
            $('#btnPesquisar').prop('disabled', true);
            $('#btnAdicionar').prop('disabled', true);
            $('.btn-sucess').removeClass('btn-sucess');
        }
        $('#cEmpresa').val('');
        $('#cFilEmp').val('');
        $('#zoomCCusto').val('');
        $('#zoomTipoPagto').val('');
        $('#zoomFormaPagto').val('');
        $('#zoomNatureza').val('');
        $('#zoomCCusto').val('');
        $('#contaContabil').val('');
        $('#descNatureza').val('');

        var filtro = "CCODIGO, XXXX";
        reloadZoomFilterValues("zoomTipoPagto", filtro);
        reloadZoomFilterValues("zoomFormaPagto", filtro);
        reloadZoomFilterValues("zoomNatureza", filtro);
        reloadZoomFilterValues("zoomCCusto", filtro);
    }
}

/**
 * Setar valor em um zoom
 * @param instance - id do campo zoom
 * @param value - valor setado
 * @returns
 */
function setZoomData(instance, value){
    window[instance].setValue(value);
}
