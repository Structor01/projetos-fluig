function beforeSendData(customField, customFact) {

    var field0 = hAPI.getCardValue('num_solicitao');
    field0 = +field0;
    if (!isNaN(field0)) {
        customFact[0] = field0;
    }

    var field1 = hAPI.getCardValue('vr_pro_total');
    field1 = +field1;
    if (!isNaN(field1)) {
        customFact[1] = field1;
    }
}
