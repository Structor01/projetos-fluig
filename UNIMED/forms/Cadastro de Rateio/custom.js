$(document).ready(function () {
    mask();
    $('#qtTotalRateio').on('blur', function () {
        VALOR_TOTAL = $(this).val().replace(".","");
        VALOR_TOTAL = VALOR_TOTAL.replace(",",".");
    });
});

var VALOR_TOTAL;

function addChild() {
    if(parseFloat(VALOR_TOTAL) > 0) {
        var add = wdkAddChild('tableRateio');

        $('#valorRateio___'+add).on('keyup', function () {
            var temp = $(this).val().replace(".","");
            var v = (parseFloat(temp.replace(",",".")) * 100) / VALOR_TOTAL;
            $('#percentualRateio___'+add).val(v+'%');
            $('#percentualRateio___'+add).mask('00.00%', {reverse: true});
        });

        $('#percentualRateio___'+add).on('keyup', function () {
            var v = $(this).val().replace('%','') / 100 * VALOR_TOTAL;
            $('#valorRateio___'+add).val(v);
            $('#valorRateio___'+add).mask('000.000.000.000.000,00', {reverse: true});
        });

        mask();
    }
    else
        FLUIGC.toast({
            title: '',
            message: "Por favor, preencha o valor total!",
            type: 'danger'
        });
}

function mask() {
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.percentual').mask('00.00%', {reverse: true});
}

function setSelectedZoomItem(selectedItem){
    if(selectedItem.inputId == 'zoomCCustoRateio___'+selectedItem.inputId.split('___')[1]) {
        if(selectedItem['CSTATUS'] == 'NAO BLOQUEADO' && selectedItem['CTIPO'] == "ANALITICO") {
            $('#codRateio___'+selectedItem.inputId.split('___')[1]).val(selectedItem['CCODIGO']);
        } else {
            alert('Centro de Custo bloqueado!');
            window['zoomCCustoRateio___'+selectedItem.inputId.split('___')[1]].clear();
        }
    }
}

function setZoomData(instance, value){
    window[instance].setValue(value);
}