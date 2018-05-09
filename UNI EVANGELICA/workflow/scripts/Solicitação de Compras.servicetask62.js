function servicetask62(attempt, message) {
	log.warn("--Debbug-- Solicitação de Compras - Gerar Pedido de compra");
	var listaEmpresas = ServiceManager.getService('WSPROTHEUS');

	var serviceLocator;
	var serviceProdutos
	try{
		serviceLocator = listaEmpresas.instantiate('br.edu.unievangelica.compras2._8085.WSINTFLUIG');
 		serviceProdutos = listaEmpresas.instantiate('br.edu.unievangelica.compras2._8085.ObjectFactory');
	}catch(erro){
		log.warn("--Debbug-- Algo de Errado não está certo: " + erro);
	}

	log.warn("--Debbug-- listaCliente: " +listaEmpresas);

	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
	var service = serviceLocator.getWSINTFLUIGSOAP();
	var produtos = serviceProdutos.createWSCADSOLICITACAOCOMPRA();
	var arrayProdutos = serviceProdutos.createARRAYOFWSPRODUTOSSOLICITACAOCOMPRA();

	var numProces = getValue("WKNumProces");
	var cardId = getValue("WKCardId");
	// Chamada
	var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("metadata#id", cardId, cardId, ConstraintType.MUST);

	var constraints = new Array(cst1, cst2);
	var datasetPrincipal = DatasetFactory.getDataset("dsFormSolicitacaoCompras", null, constraints, null);
	log.warn("--Debbug-- datasetPrincipal");
	log.warn("--Debbug-- numProces: "+numProces);
	log.warn("--Debbug-- cardId: "+cardId);
	log.warn("--Debbug-- datasetPrincipal.rowsCount: " +datasetPrincipal.rowsCount);

	if (datasetPrincipal.rowsCount > 0) {

		var documentId = datasetPrincipal.getValue(0, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(0, "metadata#version");
		var c1 = DatasetFactory.createConstraint("tablename", 'tbSolCompras', 'tbSolCompras', ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

		var constraintsFilho = new Array(c1, c2, c3);
		var datasetFilho = DatasetFactory.getDataset("dsFormSolicitacaoCompras", null, constraintsFilho, null);

		log.warn("--Debbug-- datasetFilho.rowsCount : " +datasetFilho.rowsCount);

		if (datasetFilho.rowsCount > 0 ) {
			for (var j = 0; j < datasetFilho.rowsCount; j++) {
				var structProduto = serviceProdutos.createWSPRODUTOSSOLICITACAOCOMPRA();

				//var cCusto = datasetFilho.getValue(j, "zoomCr");
				//var codCusto = cCusto.split('-');
				//var cProduto = datasetFilho.getValue(j, "codProduto");
				//var codProduto = cProduto.split('-');
				structProduto.setCCCUSTO(datasetPrincipal.getValue(0, "centroCusto_id"));
				structProduto.setCMOTIVOSOL(datasetFilho.getValue(j, "obsProduto"));
				structProduto.setCPRODUTO(datasetFilho.getValue(j, "codProduto"));
				structProduto.setCUM(datasetFilho.getValue(j, "unidade"));
				// structProduto.setCXIMG(datasetFilho.getValue(j, "publiclink"));
				structProduto.setCXOBS(datasetFilho.getValue(j, "obsProduto"));
				structProduto.setNPRECO(0);
				var qtde = datasetFilho.getValue(j, "qtde");
				var qtdeProd = qtde.replace('.', '').replace(',', '.');
				//teste.replace(/[^\d]+/g,'')
				log.warn("--Debbug-- qtdeProd: "+qtdeProd);
				//var NVALORTIT = new java.math.BigInteger(valor2);
				var qtdeProduto = new java.math.BigDecimal(qtdeProd);
				log.warn("--Debbug-- qtdeProduto: "+qtdeProduto);
				structProduto.setNQUANTIDADE(qtdeProduto);
				arrayProdutos.getWSPRODUTOSSOLICITACAOCOMPRA().add(structProduto);
			}
			produtos.setPRODUTOS(arrayProdutos);
			produtos.setCEMPRESA('01');
			produtos.setCPARFIL("0101");
			produtos.setCXIMG(datasetPrincipal.getValue(0, "publiclink"));
			produtos.setCCOMPRADOR(datasetPrincipal.getValue(0, "codComprador"));

			var today = new Date();
			var year = today.getFullYear();
			var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
			var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
			var currentDate = day + '/' + month + '/' + year;
			var currentDateInv = year + month + day;

			produtos.setCEMISSAO(currentDateInv);
			produtos.setCFILENT("0101");
			produtos.setCIDFLUIG(numProces);
			//produtos.setCSOLICITANTE(datasetPrincipal.getValue(0, "idUserProtheus"));
			produtos.setCSOLICITANTE("000012");

			try {
				log.warn("--Debbug-- Cadastro Solicicao produtos: " + produtos);
				var result = service.cadastraSOLICITACAOCOMPRA(produtos);
				log.warn("--Debbug-- Cadastro Solicicao result: " +result);
				if (result.isLRET()) {
					hAPI.setCardValue('solicitacaoCompra', result.getCNUMSOL());
					log.warn("--Debbug-- solicitacaoCompra: " + result.getCNUMSOL());
				} else {
					throw 'Solicitação de Compras. Erro na geração: ' + result.getCERROS();
					log.warn("--Debbug-- Erro: " +  result.getCERROS());
				}
			} catch (erro){
				log.warn("--Debbug-- erro: " +erro);
				log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
				throw 'Tente novamente!';
			}
		} else {
			throw 'Solicitação de Compra sem Pedido de Compra gerado. Favor verificar.';
		}
	} else {
		throw 'Não encontrado o formulário Id: ' + cardId + ' da Solicitação de Compras - ' + numProces +'.';
	}

	return true;
}
