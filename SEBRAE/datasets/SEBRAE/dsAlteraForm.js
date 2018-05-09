function createDataset(fields, constraints, sortFields) {
    var cardId = "";
    var cardData = new Array();

    try {
        var ECMCardService = ServiceManager.getService('ECMCardService');
        log.warn("--Debbug-- ECMCardService: " + ECMCardService);
        var serviceLocator = ECMCardService.instantiate('com.totvs.technology.ecm.dm.ws.ECMCardServiceService');
        log.warn("--Debbug-- serviceLocator: " + serviceLocator);
        var service = serviceLocator.getCardServicePort();
        log.warn("--Debbug-- service: " + service);

        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                if (constraints[i].fieldName == "CardId") {
                    cardId = constraints[i].initialValue;
                    log.warn("--Debbug-- cardId: " + cardId);
                }
                if (constraints[i].fieldName == "CardData") {
                    var cardDataValue = constraints[i].initialValue;
                    log.warn("--Debbug-- cardDataValue: " + constraints[i].initialValue);
                    cardData.push(cardDataValue.split(';'));
                    log.warn("--Debbug-- cardData: " + cardData.toString());
                }
            }
        }

        if (cardId == "") throw "Insira o Card Id!";
        if (cardData == "") throw "Insira o Card Data!";

        var serviceObj = ECMCardService.instantiate('com.totvs.technology.ecm.dm.ws.ObjectFactory');
        log.warn("--Debbug-- serviceObj: " + serviceObj.toString());
        var cardFieldDtoArray = serviceObj.createCardFieldDtoArray();
        log.warn("--Debbug-- cardFieldDtoArray: " + cardFieldDtoArray.toString());

        for (var index in cardData) {
            log.warn("--Debbug-- Entrou no field");
            var cardFieldDto = serviceObj.createCardFieldDto();
            log.warn("--Debbug-- cardFieldDto: " + cardFieldDto);
            cardFieldDto.setField(cardData[index][0]);
            cardFieldDto.setValue(cardData[index][1]);
            cardFieldDtoArray.getItem().add(cardFieldDto);
            log.warn("--Debbug-- cardData: " + cardData[index][0]);
            log.warn("--Debbug-- cardData: " + cardData[index][1]);
        }

        var result = service.updateCardData(
            1,
            'arthur.barros@totvs.com.br',
            '3009Artfbgyn@',
            cardId,
            cardFieldDtoArray
        );

        var dataset = DatasetBuilder.newDataset();

        //Cria as colunas
        dataset.addColumn("Card Id");
        dataset.addColumn("Card Data");
        dataset.addColumn("Result");

        dataset.addRow(new Array(cardId, cardData[0], result.getItem().get(0).getWebServiceMessage()));

        return dataset;
    } catch (e) {
        log.warn("--Debbug-- Erro: "+ e +" "+e.lineNumber);
        var dataset = DatasetBuilder.newDataset();
        dataset.addColumn("Erro");
        dataset.addColumn("Linha");
        dataset.addRow(new Array(e, e.lineNumber));
        return dataset;
    }
}