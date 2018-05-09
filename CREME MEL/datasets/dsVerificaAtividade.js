function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();
  var proces = false;
  var userId = false;
  var inicial = "";
  var fim = "";

  dataset.addColumn("Solicitação");
  dataset.addColumn("Atividade");
  dataset.addColumn("User");
  dataset.addColumn("Inicial");
  dataset.addColumn("Final");


  if (constraints != null) {
    for (var c = 0; c < constraints.length; c++){
      if (constraints[c].fieldName == "Solicitação") {
        proces = constraints[c].initialValue;
      }
      if (constraints[c].fieldName == "User") {
        userId = constraints[c].initialValue;
      }
    }
  }

  try {
    var ECMWorkflowEngine = ServiceManager.getService('ECMWorkflowEngineService');
    var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    var service = serviceLocator.getWorkflowEngineServicePort();
    if(userId != false && proces != false) {
      var result = service.getAllActiveStates("arthurbarros", "Totvs@123", 1, userId, proces);
      inicial = service.getCardValue("arthurbarros", "Totvs@123", 1, proces, userId, 'dtInicial');
      fim = service.getCardValue("arthurbarros", "Totvs@123", 1, proces, userId, 'prazoConclusao');
    } else
     throw "Por favor, insira o numero da solicitação";

    dataset.addRow(new Array(proces, result.getItem().get(0), userId, inicial, fim));

  } catch(e) {
    dataset.addColumn("Erro");
  	dataset.addColumn("Linha");
    dataset.addRow(new Array(e, e.lineNumber));
  }

  return dataset;
}
