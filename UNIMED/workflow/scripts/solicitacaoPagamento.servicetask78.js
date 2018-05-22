function servicetask78(attempt, message) {
	

	log.warn("--Debbug-- Atv Serviço - Inclusão de Titulos Protheus ");
	var numProces = getValue("WKNumProces");
	var cardId = getValue("WKCardId");
	
//*Obtendo dados do formulario	
    var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("metadata#id", cardId, cardId, ConstraintType.MUST);
	
    var constraints = new Array(cst1, cst2);   
    var datasetPrincipal = DatasetFactory.getDataset("dsFormSolicitacaoPagamento", null, constraints, null);
    log.warn("--Debbug-- datasetPrincipal");
    log.warn("--Debbug-- numProces: "+numProces);
    log.warn("--Debbug-- cardId: "+cardId);
    log.warn("--Debbug-- datasetPrincipal.rowsCount: " +datasetPrincipal.rowsCount);
    if (datasetPrincipal.rowsCount > 0) {
    	
//*Acesso ao WS de Inclusão de Titulos no Protheus
    	
   	    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
    	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
        var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
    	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
        var service = serviceLocator.getWSUNIMEDSOAP();
    	var serviceTitulo= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');
    	log.warn("--Debbug-- Tudo certo com o WS");    	
    	var titulo = serviceTitulo.createLISTAINCTITULOSPAGAR();
    	var arrayTitulo = serviceTitulo.createARRAYOFSTRUCTINCTITULOPAGAR();
    	var structTitulo = serviceTitulo.createSTRUCTINCTITULOPAGAR();
    	var arrayNatureza = serviceTitulo.createARRAYOFSTRUCTNATUREZAS();
    	var structNatureza = serviceTitulo.createSTRUCTNATUREZAS();
    	var arrayCCusto = serviceTitulo.createARRAYOFSTRUCTCENTROCUSTOPAGAR();
    	var structCCusto = serviceTitulo.createSTRUCTCENTROCUSTOPAGAR();
    	var structCCusto2 = serviceTitulo.createSTRUCTCENTROCUSTOPAGAR();
    	log.warn("--Debbug-- Tudo certo com o Obj do WS");
    	
//*Formatar os campos principais do Objeto TITULO - 
    	var CCODFILIAL = datasetPrincipal.getValue(0, 'cFilEmp');
    	log.warn("--Debbug-- CCODFILIAL: "+CCODFILIAL);
    	if (CCODFILIAL == '') {
    		throw 'Codigo da Filial não preenchido! Favor verificar.';
    	} else {
    		titulo.setCCODFILIAL(CCODFILIAL);
    	}
    	var CCODGRUPO = datasetPrincipal.getValue(0, 'cEmpresa');
    	log.warn("--Debbug-- CCODGRUPO: "+CCODGRUPO);
    	if (CCODGRUPO == '') {
    		throw 'Codigo da Empresa não preenchido! Favor verificar.';
    	} else {
        	titulo.setCCODGRUPO(CCODGRUPO);
        }    	
//*Formata STRUCT ARRAY DE TITULO
    	var CLOJA = datasetPrincipal.getValue(0, 'cLojaForn')
    	log.warn("--Debbug-- CLOJA: "+CLOJA);
    	if (CLOJA == '') {
    		throw 'Codigo da Loja do Fornecedor não preenchido! Favor verificar.';
    	} else {
    		structTitulo.setCLOJA('01');
    		//structTitulo.setCLOJA(CLOJA);
    	}    	
    	
    	var CFORNECEDOR = datasetPrincipal.getValue(0, 'cCodigoForn')
    	log.warn("--Debbug-- CFORNECEDOR: "+CFORNECEDOR);
    	if (CFORNECEDOR == '') {
    		throw 'Codigo do Fornecedor não preenchido! Favor verificar.';
    	} else {
    		structTitulo.setCFORNECEDOR(CFORNECEDOR);
    	}    	

    	var CHISTORICO = datasetPrincipal.getValue(0, 'historico');
    	if (CHISTORICO == null){CHISTORICO = '';};
   		structTitulo.setCHISTORICO(CHISTORICO);
    	
	    var data = ""+datasetPrincipal.getValue(0, 'dataAbertura');
	    data = data.split(' ');
	    var CEMISSAO = data[0].split('/').reverse().join('');        
	    
    	//var CEMISSAO = datasetPrincipal.getValue(0, 'dtEmissao').split('/').reverse().join('');
    	
    	log.warn("--Debbug-- CEMISSAO: "+CEMISSAO);
    	if (CEMISSAO == '') {
    		throw 'Data Emissão não preenchido! Favor verificar.';
    	} else {
    		structTitulo.setCEMISSAO(CEMISSAO);
    	}    	

/*    	var CAGENCIAFOR= parseInt(datasetPrincipal.getValue(0, 'cAgencia'));
    	log.warn("--Debbug-- CAGENCIAFOR: "+CAGENCIAFOR);
    	if (isNaN(CAGENCIAFOR) || CAGENCIAFOR == null) {
    		structTitulo.setCAGENCIAFOR('');
    	} else {
        	structTitulo.setCAGENCIAFOR(CAGENCIAFOR);
    	}*/    	
    	
    	var CAGENCIAFOR= datasetPrincipal.getValue(0, 'cAgencia');
    	log.warn("--Debbug-- CAGENCIAFOR: "+CAGENCIAFOR);
    	if (CAGENCIAFOR == '' || CAGENCIAFOR == null) {
    		structTitulo.setCAGENCIAFOR('');
    	} else {
        	structTitulo.setCAGENCIAFOR(CAGENCIAFOR);
    	}    	
    	
    	//structTitulo.setCAGENCIAFOR('');
/*    	var CBANCOFOR= parseInt(datasetPrincipal.getValue(0, 'cBanco'));
    	log.warn("--Debbug-- CBANCOFOR: "+CBANCOFOR);
    	if (isNaN(CBANCOFOR) || CBANCOFOR== null) {
    		structTitulo.setCBANCOFOR('');
    	} else {
        	structTitulo.setCBANCOFOR(CBANCOFOR)
    	}*/    	
    	
    	var CBANCOFOR= datasetPrincipal.getValue(0, 'cBanco');
    	log.warn("--Debbug-- CBANCOFOR: "+CBANCOFOR);
    	if (CBANCOFOR == '' || CBANCOFOR== null) {
    		structTitulo.setCBANCOFOR('');
    	} else {
        	structTitulo.setCBANCOFOR(CBANCOFOR)
    	}    	
    	
    	//structTitulo.setCBANCOFOR('');

/*    	var CCONTAFOR= parseInt(datasetPrincipal.getValue(0, 'cCCorrente'));
    	log.warn("--Debbug-- CCONTAFOR: "+CCONTAFOR);
    	if (isNaN(CCONTAFOR) || CCONTAFOR == null) {
    		structTitulo.setCCONTAFOR('');
    	} else {
        	structTitulo.setCCONTAFOR(CCONTAFOR)
    	}*/    	

    	var CCONTAFOR= datasetPrincipal.getValue(0, 'cCCorrente');
    	log.warn("--Debbug-- CCONTAFOR: "+CCONTAFOR);
    	if (CCONTAFOR == '' || CCONTAFOR == null) {
    		structTitulo.setCCONTAFOR('');
    	} else {
        	structTitulo.setCCONTAFOR(CCONTAFOR)
    	}    	

    	var CCODIGOBARRA= datasetPrincipal.getValue(0, 'codBarra');
    	log.warn("--Debbug-- CCODIGOBARRA: "+CCODIGOBARRA);
    	if (isNaN(CCODIGOBARRA) || CCODIGOBARRA == null) {
    		structTitulo.setCCODIGOBARRA('');
    	} else {
        	structTitulo.setCCODIGOBARRA(CCODIGOBARRA)
    	}    	
    	
    	//structTitulo.setCCONTAFOR('');
    	//structTitulo.setCCODIGOBARRA('');

    	var valor = datasetPrincipal.getValue(0, 'valorPagamento');
    	log.warn("--Debbug-- valor: "+valor);
    	var valor2 = valor.replace('.', '').replace(',', '.');
    	//teste.replace(/[^\d]+/g,'')
    	log.warn("--Debbug-- valor2: "+valor2);
    	//var NVALORTIT = new java.math.BigInteger(valor2);
    	var NVALORTIT = new java.math.BigDecimal(valor2);
    	log.warn("--Debbug-- NVALORTIT: "+NVALORTIT);
    	structTitulo.setNVALORTIT(NVALORTIT);
        
    	var CNUM = datasetPrincipal.getValue(0, 'notaFiscal')
    	log.warn("--Debbug-- CNUM: "+CNUM);
    	structTitulo.setCNUM(CNUM);

    	var CVENCIMENTO = datasetPrincipal.getValue(0, 'dtVenc').split('/').reverse().join('');
    	log.warn("--Debbug-- CVENCIMENTO: "+CVENCIMENTO);
    	structTitulo.setCVENCIMENTO(CVENCIMENTO);

    	var CTIPO = datasetPrincipal.getValue(0, 'CODTIPOPAGTO')
    	log.warn("--Debbug-- CODTIPOPAGTO: "+CTIPO);
    	structTitulo.setCTIPO(CTIPO);    	

    	var CFORMAPG = datasetPrincipal.getValue(0, 'CODFORMPAGTO')
    	log.warn("--Debbug-- CFORMAPG: "+CFORMAPG);
    	structTitulo.setCFORMAPG(CFORMAPG);
    	
    	//Retenção
    	
    	var CDIRF = datasetPrincipal.getValue(0, 'idDirf');
    	log.warn("--Debbug-- CDIRF: "+CDIRF);
    	structTitulo.setCDIRF(CDIRF);
    	var CCODRETENCAO = '';
    	
    	if (CDIRF == '1') {
    		CCODRETENCAO = datasetPrincipal.getValue(0, 'CODRETENCAO');
    	}
    	log.warn("--Debbug-- CCODRETENCAO: "+CCODRETENCAO);
    	structTitulo.setCCODRETENCAO(CCODRETENCAO);
    	
    	structTitulo.setCPARCELA('1')
    	var perc = new java.math.BigInteger(100);
    	
    	var CCENTROCUSTO = datasetPrincipal.getValue(0, 'idRateio')
    	log.warn("--Debbug-- CCENTROCUSTO: "+CCENTROCUSTO);
//*SE S, EXISTE RATEIO    	
    	if (CCENTROCUSTO == 'S') {
    		var documentId = datasetPrincipal.getValue(0, "metadata#id");
    	    var documentVersion = datasetPrincipal.getValue(0, "metadata#version");
    	    
    	    var c1 = DatasetFactory.createConstraint("tablename", 'tableRateio', 'tableRateio', ConstraintType.MUST);
    	    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    	    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);	    
    	    
    	    var constraintsFilho = new Array(c1, c2, c3);	    
    	    var datasetFilho = DatasetFactory.getDataset("dsFormSolicitacaoPagamento", null, constraintsFilho, null);
    	    
    	    for (var j = 0; j < datasetFilho.values.length; j++) {
//*FORMATA OBJETO ARRAY CENTRO CUSTO     	    	
    	    	var structCCusto = serviceTitulo.createSTRUCTCENTROCUSTOPAGAR();
    	    	log.warn("--Debbug-- [j]: "+j+ " // datasetFilho.values[j]: "+datasetFilho.values[j]);
    	    	log.dir(datasetFilho.values[j]);    	    	
    	    	structCCusto.setCCENTROCUSTO(datasetFilho.getValue(j, 'codRateio'));
    	    	//structCCusto.setCCENTROCUSTO(datasetFilho.values[j].zoomCr);
    	    	var valorRateio = datasetFilho.getValue(j, 'valorRateio');
				var valorRateio2 = valorRateio.replace('.', '').replace(',', '.');
				log.warn("--Debbug-- valorRateio2: "+valorRateio2);
    	    	//var NVALORRAT = new java.math.BigInteger(valorRateio2);
    	    	var NVALORRAT = new java.math.BigDecimal(valorRateio2);
    	    	log.warn("--Debbug-- NVALORRAT: "+NVALORRAT);
    	    	structCCusto.setNVALORRAT(NVALORRAT);
    	    	log.warn("--Debbug-- structCCusto.getCCENTROCUSTO: " +structCCusto.getCCENTROCUSTO());
    	    	log.warn("--Debbug-- structCCusto.getNVALORRAT: " +structCCusto.getNVALORRAT());
    	    	arrayCCusto.getSTRUCTCENTROCUSTOPAGAR().add(structCCusto);
    	    }
    	    log.warn("--Debbug-- ESTRUTURA NATUREZA");
	    	structNatureza.setNVALORRAT(NVALORTIT);
	    	log.warn("--Debbug-- NVALORTIT: " +structNatureza.getNVALORRAT());
	    	structNatureza.setNPERCENTNAT(perc);
	    	log.warn("--Debbug-- NPERCENTNAT: " +structNatureza.getNPERCENTNAT());	    	
	    	structNatureza.setCNATUREZA(datasetPrincipal.getValue(0, 'CODNATUREZA'));
	    	log.warn("--Debbug-- CNATUREZA: " +structNatureza.getCNATUREZA());
        	//structTitulo.setCCENTROCUSTO('')
        	//structTitulo.setCNATUREZA('')
        	structTitulo.setCCENTROCUSTO(datasetPrincipal.getValue(0, 'CODCCUSTO'));
        	log.warn("--Debbug-- CCENTROCUSTO: " +structTitulo.getCCENTROCUSTO());
        	structTitulo.setCNATUREZA(datasetPrincipal.getValue(0, 'CODNATUREZA'));
        	log.warn("--Debbug-- CNATUREZA: " +structTitulo.getCNATUREZA());

        	structTitulo.setLUSARATEIO(true)	
	    	
    	} else{
    		//var valorCC = new java.math.BigInteger(0);
    		var valorCC = new java.math.BigDecimal(0);
    		var structCCusto = serviceTitulo.createSTRUCTCENTROCUSTOPAGAR();
    		structCCusto.setNVALORRAT(valorCC);
    		structCCusto.setCCENTROCUSTO('');
	    	arrayCCusto.getSTRUCTCENTROCUSTOPAGAR().add(structCCusto);	
	    	structNatureza.setNVALORRAT(NVALORTIT);
	    	structNatureza.setNPERCENTNAT(perc);
	    	structNatureza.setCNATUREZA('');    		
        	structTitulo.setCCENTROCUSTO(datasetPrincipal.getValue(0, 'CODCCUSTO'));
        	log.warn("--Debbug-- CCENTROCUSTO: " +structTitulo.getCCENTROCUSTO());
        	structTitulo.setCNATUREZA(datasetPrincipal.getValue(0, 'CODNATUREZA'));
        	log.warn("--Debbug-- CNATUREZA: " +structTitulo.getCNATUREZA());
        	structTitulo.setLUSARATEIO(false)	
    	}
//*Aciona o DS para inclusão do titulo 
    	structNatureza.setACENTROSCUSTO(arrayCCusto);
    	arrayNatureza.getSTRUCTNATUREZAS().add(structNatureza);
    	structTitulo.setANATUREZAS(arrayNatureza);
    	arrayTitulo.getSTRUCTINCTITULOPAGAR().add(structTitulo);

    	titulo.setAINCTITULOSPAGAR(arrayTitulo);	
    	
    	try {
    		var result = service.cadastracontaspagar(titulo);
    		log.warn("--Debbug-- result: " +result); 
    		log.warn("--Debbug-- qt registros retornados: " + result.getARETTITULOSPAGAR().getSTRUCTINCRETTITULOSPAGAR().get(0).getCNUMERO());
    		log.warn("--Debbug-- SIZE: " + result.getARETTITULOSPAGAR().getSTRUCTINCRETTITULOSPAGAR().size());
    		var status = '';
    		
    		if (result.getARETTITULOSPAGAR().getSTRUCTINCRETTITULOSPAGAR().size() > 0){
    			
    			var registro = result.getARETTITULOSPAGAR().getSTRUCTINCRETTITULOSPAGAR().get(0);		
    			 //Cria os registros
    			status = (registro.isLSTATUS()) ? 'Ativo' : 'Bloqueado';
    			log.warn("--Debbug-- CERRO: " +registro.getCERRO());
    			log.warn("--Debbug-- CNUMERO: " +registro.getCNUMERO());
    			log.warn("--Debbug-- CPARCELA: " +registro.getCPARCELA());
    			log.warn("--Debbug-- CPREFIXO: " +registro.getCPREFIXO());
    			log.warn("--Debbug-- CTIPO: " +registro.getCTIPO());
    			log.warn("--Debbug-- status: " +status);    			
    			
    		    if (registro.getCERRO() != '') {
    		    	throw 'Erro na Inclusão do Titulo no Protheus: - ' + registro.getCERRO() + '.';
    		    } else {
    		    	return true;
    		    }
    		}
    		
    	}  catch (erro){
    		log.warn("--Debbug-- erro: " +erro);
    		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
    		throw 'Erro na Inclusão do Titulo no Protheus: - ' + erro.message + '.';
    	}
    	
    } else {
    	throw 'Não encontrado o formulário Id: ' + cardId + ' da Solicitação de Pagamento - ' + numProces +'.';
    }

}