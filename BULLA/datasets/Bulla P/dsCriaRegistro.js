function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var parentId = '';
    var ECMCardService = ServiceManager.getService('ECMCardService');
    log.warn("--Debbug-- ECMCardService: " + ECMCardService);
    var serviceLocator = ECMCardService.instantiate('com.totvs.technology.ecm.dm.ws.ECMCardServiceService');
    log.warn("--Debbug-- serviceLocator: " + serviceLocator);
    var service = serviceLocator.getCardServicePort();
    log.warn("--Debbug-- service: " + service);
    var serviceObj = ECMCardService.instantiate('com.totvs.technology.ecm.dm.ws.ObjectFactory');
    var cardDtoArray = serviceObj.createCardDtoArray();

    dataset.addColumn("Retorno");

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "Parent Id") {
                parentId = constraints[i].initialValue;
            }
        }
    }

    var cardDto = serviceObj.createCardDto();
    cardDto.setParentDocumentId(parseInt(parentId));
    cardDtoArray.getItem().add(cardDto);

    var result = service.create(
        2,
        'adm',
        'adm',
        cardDtoArray
    );

    if(parentId != '')
        dataset.addRow(new Array(result.getItem().get(0).getDocumentId().toString()));
    else
        dataset.addRow(new Array('Insira o número do documento pai.'));

    return dataset;
}