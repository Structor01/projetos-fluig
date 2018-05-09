$(document).ready(function () {
    FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: true,
        sideBySide: true
    });

    $('.dateReserva').on('blur, focus, change', function () {
        $('.dateReserva').mask('00/00/0000 00:00');
        var keepGoing = false;
        $(this).val().trim() == '' ? keepGoing = false : keepGoing = true;
        if(
            $('.dateReserva').eq(0).val().trim() != '' &&
            $('.dateReserva').eq(1).val().trim() != '' &&
            $('.dateReserva').eq(0).val() > $('.dateReserva').eq(1).val()
        ) {
            toast('Atenção!', "Data inicial não pode ser maior que data final.", 'danger');
            $(this).val('');
            return false;
        }

        if(
            $('.dateReserva').eq(0).val().trim() != '' &&
            $('.dateReserva').eq(1).val().trim() != '' &&
            $('.dateReserva').eq(0).val() < $('.dateReserva').eq(1).val()
        )
            verificaDisponibildade( $('.dateReserva').eq(0).val(), $('.dateReserva').eq(1).val());
    });
});

function verificaDisponibildade(i,f) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("procesId", 'Reserva', 'Reserva', ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("dsGetAvailableProces", null, constraints, null);
}

function toast(t,m,p) {
    FLUIGC.toast({
        title: t, message: m, type: p
    });
}

function getWeekDay() {
    var from = $("#registroData___1").val().split("/");
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