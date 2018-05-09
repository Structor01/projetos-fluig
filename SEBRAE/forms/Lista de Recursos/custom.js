$('#inputAdicionar').click(function() {
    wdkAddChild('ingre');
    i++;
    reloadZoomFilterValues('colaborador___'+i, 'FILIAL,' + $('#filial_n').val());

    var calend = FLUIGC.calendar('#dt_ferias___'+i, {
        pickDate: true,
        pickTime: false
    });
});