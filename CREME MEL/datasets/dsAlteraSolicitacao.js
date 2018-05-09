function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();
  var action = "";
  var sol = 0;
  var user = "";
  var atv;
  var resp;

  if (constraints != null) {
    for (var c = 0; c < constraints.length; c++){
      if (constraints[c].fieldName == "action") {
        action = constraints[c].initialValue;
      }
      if (constraints[c].fieldName == "sol") {
        sol = constraints[c].initialValue;
      }
      if (constraints[c].fieldName == "user") {
        user = constraints[c].initialValue;
      }
      if (constraints[c].fieldName == "atv") {
        atv = constraints[c].initialValue;
      }
      if (constraints[c].fieldName == "resp") {
        resp = constraints[c].initialValue;
      }
    }
  }

  dataset.addColumn('Result');
  try {
    var ECMWorkflowEngine = ServiceManager.getService('ECMWorkflowEngineService');
    var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    var service = serviceLocator.getWorkflowEngineServicePort();
    var serviceObj= ECMWorkflowEngine.instantiate('net.java.dev.jaxb.array.ObjectFactory');
    var colleagueIni = serviceObj.createStringArray();
    colleagueIni.getItem().add(user);
    var serviceAttArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
    var serviceTaskArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');
    var cardData = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');
    var act;
    if(action == "move") {
      act = service.saveAndSendTaskClassic('arthurbarros','Totvs@123', 1, parseInt(sol), 10, colleagueIni, "Movido pelo Gestor do Plano de Ação", user, true, serviceAttArray, cardData,serviceTaskArray, true, 0);
      dataset.addRow(new Array("Foi"));
    }
    if(action == "assume") {
      act = service.takeProcessTask('arthurbarros','Totvs@123', 1, 'arthurbarros', parseInt(sol), 0);
      dataset.addRow(new Array(act));
    }
    if(action == "cancel") {
      act = service.cancelInstance('arthurbarros','Totvs@123', 1, sol, user, "Cancelado pelo Plano de Ação");
      dataset.addRow(new Array(act));
    }


  }catch(e){
    dataset.addRow(new Array(e.toString()));
  }

  return dataset;
}
