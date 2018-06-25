function createDataset(fields, constraints, sortFields) {
    var c1 = DatasetFactory.createConstraint("groupId", "%REC-%", "%REC-%", ConstraintType.MUST)
    c1.setLikeSearch(true);
    var c = new Array(c1);
    var dataset = DatasetFactory.getDataset("group", null, c, null);
    log.info('--DATASET GRUPO RECURSO');
    return dataset;
}