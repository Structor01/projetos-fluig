function createDataset(fields, constraints, sortFields) {
    var c1 = DatasetFactory.createConstraint("groupId", "%REC-%", "%REC-%", ConstraintType.MUST)
    c1.setLikeSearch(true);
    var c = new Array(c1);

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            log.info('--DATASET GRUPO RECURSO cons: ' + constraints[i].initialValue);
            if (constraints[i].fieldName == "groupDescription" || constraints[i].fieldName == "groupId") {
                var c1 = DatasetFactory.createConstraint("groupDescription", constraints[i].initialValue, constraints[i].initialValue, ConstraintType.MUST);
                c1.setLikeSearch(true);
                c.push(c1);
            }
        }
    }

    var dataset = DatasetFactory.getDataset("group", null, c, null);
    log.info('--DATASET GRUPO RECURSO');
    return dataset;
}