$(document).ready(function () {
    var date = FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: true,
        sideBySide: true
    });

    if(task != 9 && mode == "ADD") {
        $('#agendamentoR').hide();
    }
});
