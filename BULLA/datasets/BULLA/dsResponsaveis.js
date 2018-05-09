function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var filter = ['*', ''];
    var where = '';

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "FILTER") {
                filter[0] = constraints[i].initialValue;
                filter[1] = constraints[i].finalValue;
            }
            if (constraints[i].fieldName == "nomeResp") {
                where = "WHERE nomeResp LIKE '%" + constraints[i].initialValue + "%'";
                filter[1] = where;
            }
        }
    }

    return getDataset(filter);
}

function getDataset(filter) {
    //Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("query", "select " + filter[0] + " from responsavel " + filter[1], "", ConstraintType.MUST);
    var constraints = new Array(c1);

    //Busca o dataset
    var dataset = DatasetFactory.getDataset("dsConsultaBanco", null, constraints, null);
    return dataset;
}