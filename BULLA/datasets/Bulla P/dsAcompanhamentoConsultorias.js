//function defineStructure() {
//
//}
//function onSync(lastSyncDate) {
//
//}

function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();
    // Código do processo que será buscado
    var processId = 'ConsultoriaBullaPresencial';

    //Cria as colunas

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "processId") {
                processId = constraints[i].initialValue;
            }
        }
    }

    if (processId == '') {
        dataset.addColumn("ERRO");
        dataset.addColumn("processId");
        dataset.addRow(new Array("Insira o código do processo"));
        return dataset;
    }

    try {
        var c1 = DatasetFactory.createConstraint("processId", processId, processId, ConstraintType.MUST);
        var processos = DatasetFactory.getDataset("workflowProcess", null, new Array(c1), null);
        if (processos.rowsCount > 0) {
            dataset.addColumn("processId"); // Nome identificador do processo (string)
            dataset.addColumn("processInstanceId"); // Número da solicitação (int) 
            dataset.addColumn("requesterId"); // ID de login do solicitante (string)
            dataset.addColumn("active"); // Estado do processo (bool)
            dataset.addColumn("version"); // Versão do processo (int)
            dataset.addColumn("expired"); // Estado de validade do processo (bool)
            dataset.addColumn("codTask"); // Número da tarefa no fluxo (int)
            dataset.addColumn("percentual"); // Percentual de conclusão do processo (int)
            dataset.addColumn("cardId"); // Número identificador do processo (int)
            dataset.addColumn("task"); // Nome da tarefa (string)
            
            dataset.addColumn("cliente"); // Nome fantasia da farmácia
            dataset.addColumn("idCliente"); // Id da farmácia no dsFarmacia
            dataset.addColumn("nomeResp"); // Nome do responsável pela farmácia
            dataset.addColumn("codResp"); // Código do responsável pela farmácia
            dataset.addColumn("consultor"); // Nome do consultor em atendimento na tarefa
            dataset.addColumn("inicioTarefa"); // Data em que a tarefa foi assumida
            dataset.addColumn("prazoTarefa"); // Prazo para cumprir a tarefa atual
            
            dataset.addColumn("emailCliente"); // Email do cliente (farmácia)
            dataset.addColumn("emailResp"); // Email do responsável pela farmácia
            dataset.addColumn("celularCliente"); // Celular do cliente  
            dataset.addColumn("telefoneCliente"); // Telefone comercial do cliente
            dataset.addColumn("telefoneResp"); // Telefone do responsável pela farmácia      
            dataset.addColumn("skypeResp"); // Skype do responsável pela farmácia            

            for (var i = 0; i < processos.rowsCount; i++) {
                log.warn('#################### Dataset dsAcompanhamentoConsultorias');
            	var solicitacao = processos.getValue(i, "workflowProcessPK.processInstanceId");
                var ativ = getAtividade(solicitacao, processos.getValue(i, "version"), processId);
                
                if(ativ == false) continue;
                
                var processHistory = ativ[0];
                var procesState = ativ[1];          
                
                // Tarefa 14 é o loop do Sucesso do Cliente e 16 é o join ao encerrar as reuniões do sucesso
            	if (processHistory.getValue(0, "stateSequence") == 14 || processHistory.getValue(0, "stateSequence") == 16) {
            		var codTarefa = processHistory.getValue(1, "stateSequence");
            		var movementSequence = processHistory.getValue(1, "processHistoryPK.movementSequence");
            	} else {
            		var codTarefa = processHistory.getValue(0, "stateSequence");
            		var movementSequence = processHistory.getValue(0, "processHistoryPK.movementSequence");
            	}
//            	if (procesState.getValue(0, "processStatePK.sequence") == 14 || procesState.getValue(0, "processStatePK.sequence") == 16) {
//            		var codTarefa = procesState.getValue(1, "processStatePK.sequence");
//            	} else {
//            		var codTarefa = procesState.getValue(0, "processStatePK.sequence");
//            	}
            	            	
//                var movementSequence = processHistory.getValue(0, "processHistoryPK.movementSequence");
                var infos = getInfosClienteTarefa(solicitacao, movementSequence);
                if (infos == false) continue;
              	
                var infosCliente = infos[0]; // dsConsultoriaPresencial
                var infosTarefa = infos[1]; // processTask
                
                var empresaCod = infosCliente.getValue(0, "empresaCod");
                if (empresaCod.indexOf(',') > -1) {
                	empresaCod = empresaCod.split(',');
                	empresaCod = empresaCod[0];
                }
                var dadosCliente = getDadosCliente(empresaCod); // dsFarmacia
                if (dadosCliente == false) continue;
                
                var dadosResp = getDadosResp(dadosCliente.getValue(0, "responsavel")); // dsFormResp
                if (dadosResp == false) continue;
                
                var consultor = getConsultor(infosTarefa.getValue(0, "processTaskPK.colleagueId"));
                             
                
                dataset.addRow(new Array(
                    processos.getValue(i, "processId"), // Nome (código) do processo
                    processos.getValue(i, "workflowProcessPK.processInstanceId"), // Solicitação
                    processos.getValue(i, "requesterId"), // Solicitante do processo
                    processos.getValue(i, "active"),
                    processos.getValue(i, "version"),
                    processos.getValue(i, "expired"),
                    codTarefa, // Número (código) da tarefa
                    getPercentual(solicitacao),
                    processos.getValue(i, "cardDocumentId"),
                    procesState.getValue(0, "stateName").toUpperCase(), // Nome da tarefa

//                    infosCliente.getValue(0, "empresa").toUpperCase(), // Fantasia
                    dadosCliente.getValue(0, "fantasia").toUpperCase(), // Fantasia
//                    dadosCliente.getValue(0, "razaoSocial").toUpperCase(),
                    dadosCliente.getValue(0, "id"), // Id da Farmacia
                    dadosResp.getValue(0, "nomeResp").toUpperCase(), // Nome responsável
                    dadosCliente.getValue(0, "responsavel").toUpperCase(), // Código responsável
                    consultor, // Consultor em atendimento
                    infosTarefa.getValue(0, "assignDate"), // Data em que a tarefa foi assumida
                    infosTarefa.getValue(0, "warningDate"), // Prazo para encerrar a tarefa
                    
                    dadosCliente.getValue(0, "email"), // Email do cliente (farmácia)
                    dadosResp.getValue(0, "emailResp"), // Email do responsável pela farmácia
                    dadosCliente.getValue(0, "celular"), // Celular do cliente
                    dadosCliente.getValue(0, "telefoneComercial"), // Telefone comercial do cliente
                    dadosResp.getValue(0, "telefoneResp"), // Telefone do responsável pela farmácia
                    dadosResp.getValue(0, "skypeResp") // Skype do responsável pela farmácia
                ));              	
            }
        } else {
            dataset.addRow(new Array("Não existe Solicitações Abertas para esse processo."));
        }
    } catch (e) {
        dataset.addColumn("ERRO");
        dataset.addRow(new Array(e + " " + e.lineNumber));
    }

    return dataset;
}

function getAtividade(numProcesso, version, processId) {
    log.warn('#################### getAtividade Processo: ' + numProcesso);// + ' - ' + version);
    var c1 = DatasetFactory.createConstraint("processInstanceId", numProcesso, numProcesso, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
    var val = DatasetFactory.getDataset("processHistory", null, new Array(c1, c2), null);
    var result = new Array();
    if (val.rowsCount > 0) {
    	// Tarefa 14 é o loop do Sucesso do Cliente e 16 é o join ao encerrar as reuniões do Sucesso do Cliente
    	if (val.getValue(0, "stateSequence") == 14 || val.getValue(0, "stateSequence") == 16) {
    		var stateSequence = val.getValue(1, "stateSequence");
    	} else {
    		var stateSequence = val.getValue(0, "stateSequence");
    	}
        log.warn('#################### getAtividade stateSequence: ' + stateSequence);

        var c3 = DatasetFactory.createConstraint("version", version, version, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("sequence", stateSequence, stateSequence, ConstraintType.MUST);
        var c5 = DatasetFactory.createConstraint("processId", processId, processId, ConstraintType.MUST);
        var val2 = DatasetFactory.getDataset("processState", null, new Array(c3, c4, c5), null);
    
        result.push(val);
        result.push(val2);
        return result;
    } else {
        return false;
    }
}

function getInfosClienteTarefa(solicitacao, movementSequence) {
    // Busca informações do cliente da tarefa atual
    var c1 = DatasetFactory.createConstraint("solicitacao", solicitacao, solicitacao, ConstraintType.MUST);
  	var dsConsultoriaPresencial = DatasetFactory.getDataset("dsConsultoriaPresencial", null, new Array(c1), null);
  	var info = new Array();
  	if (dsConsultoriaPresencial.rowsCount > 0) {  		
  	    log.warn('#################### getInfosClienteTarefa solicitacao: ' + solicitacao);    
  	    log.warn('#################### getInfosClienteTarefa movementSequence: ' + movementSequence);
  		// Busca informações da tarefa atual
        var c2 = DatasetFactory.createConstraint("processInstanceId", solicitacao, solicitacao, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("processTaskPK.movementSequence", movementSequence, movementSequence, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
      	var processTask = DatasetFactory.getDataset("processTask", null, new Array(c2, c3, c4), null);
      	
      	if (processTask.rowsCount > 0) {
	      	log.warn('#################### getInfosClienteTarefa processTask-colleagueId: ' + processTask.getValue(0, "processTaskPK.colleagueId"));  
	  		info.push(dsConsultoriaPresencial);
	  		info.push(processTask);
	  		return info;
  		} else {
  			return false;
  		}
  	} else {
  		return false;
  	}
}

function getDadosCliente(empresaCod) {
	var constraint = DatasetFactory.createConstraint("documentid", empresaCod, empresaCod, ConstraintType.MUST);
	var dsFarmacia = DatasetFactory.getDataset("dsFarmacia", null, new Array(constraint), null);
	
	if (dsFarmacia.rowsCount > 0) {
  	    log.warn('#################### getDadosCliente: true');  
		return dsFarmacia;
	} else {
		return false;
	}
}

function getDadosResp(codResp) {
	var constraint = DatasetFactory.createConstraint("codResp", codResp, codResp, ConstraintType.MUST);
	var dsFormResp = DatasetFactory.getDataset("dsFormResp", null, new Array(constraint), null);
	
	if (dsFormResp.rowsCount > 0) {
  	    log.warn('#################### getDadosResp: true');  
		return dsFormResp;
	} else {
		return false;
	}	
}

function getConsultor(userCode) {
	var constraint = DatasetFactory.createConstraint("colleagueId", userCode, userCode, ConstraintType.MUST);
	var colleague = DatasetFactory.getDataset("colleague", null, new Array(constraint), null);
	var consultor = userCode;
	
	if (colleague.rowsCount > 0) {
		consultor = colleague.getValue(0, "colleagueName");
	} else {
    	consultor = userCode.slice(userCode.lastIndexOf(":")+1);
	}
    log.warn('#################### getConsultor: '+consultor);
	
	return consultor.toUpperCase();
}


function getPercentual(solicitacao) {
    var c1 = DatasetFactory.createConstraint("_solicitacaoChecklist", solicitacao, solicitacao, ConstraintType.MUST);
    var val = DatasetFactory.getDataset("dsChecklistConsultoria", null, new Array(c1), new Array("_dataChecklist"));
	
    if (val.rowsCount > 0) {
    	var percentual = val.getValue(0, "_percentual");
        log.warn('#################### percentual: '+percentual);
    	return percentual;
    } else {
    	return 0;
    }
}


//function onMobileSync(user) {

//}