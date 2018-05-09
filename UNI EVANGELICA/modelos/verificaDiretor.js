/****************************************************************************
Processo para verificar se é diretor por Papéis.

numSol -> será recebido automaticamente quando o solicitante iniciar o processo

Arthur Barros
****************************************************************************/


var verifica = verificarSolicitante(getValue("WKUser"));

if(verifica[0] == true) {
    $('#role').val('diretor');
} else {
    $('#gestor_imediato').val(verifica[1]);
    $('#centroCusto').val(verifica[2]);
}

function verificarSolicitante(numSol) {

    var isDiretor = false;
    var gestor = null;
    var centroCusto = null;

    var result = new Array();
    var c1 = DatasetFactory.createConstraint("colleagueId", numSol, numSol, ConstraintType.MUST);
    var constraints   = new Array(c1);
    //Define os campos para ordenação
    var sortingFields = new Array("colleagueId");

    //Busca o dataset
    var dataset = DatasetFactory.getDataset("workFlowColleagueRole", null, constraints, sortingFields);

    for(var i = 0; i < dataset.rowsCount; i++) {
        var role = dataset.getValue(i, "roleId");
        if(role == "diretor") isDiretor = true;
    }

    if(isDiretor == false) {
        c1 = DatasetFactory.createConstraint("subordinado", numSol, numSol, ConstraintType.MUST);
        dataset = DatasetFactory.getDataset("ds_gestorImediato", null, new Array(c1), new Array("colleagueId"));
        if(dataset.rowsCount > 0) {
            for(var i = 0; i < dataset.rowsCount; i++) {
                gestor = dataset.getValue(i, "gestor_imediato");
                centroCusto = dataset.getValue(i, "centroCusto");
            }
        } else {
            return false;
        }
    }

    var result = new Array(isDiretor, gestor, centroCusto);

    return result;
}
