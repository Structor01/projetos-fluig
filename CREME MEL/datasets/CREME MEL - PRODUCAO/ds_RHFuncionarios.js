function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();

	//Cria as colunas
	var listaCliente = ServiceManager.getService('ZWSFLUIGRH');
	log.warn("--Debbug-- listaCliente: " +listaCliente);
	var serviceLocator = listaCliente.instantiate('_217._157._168._192._8085.ZWSFLUIGRH');

	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
	var service = serviceLocator.getZWSFLUIGRHSOAP();

	dataset.addColumn("EMPRESA");
	dataset.addColumn("NOME");
	dataset.addColumn("FILIAL");
	dataset.addColumn("MATRICULA");
	var q = getFilial();
	var c_filial;
	var nome_colab = '';
	var filial;

	if(constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "FILIAL") {
				c_filial = constraints[i].initialValue;
			}

			if (constraints[i].fieldName == "NOME") {
				nome_colab = constraints[i].initialValue;
			}
		}

		var result = service.consultafuncionario('', c_filial, '', nome_colab);
		for(var i=0;i<result.getZWSFLUIGRHSTRUCTFUNCIONARIO().size();i++){
			var registro = result.getZWSFLUIGRHSTRUCTFUNCIONARIO().get(i);
			//Cria os registros
			dataset.addRow(new Array(
				registro.getCFUNEMP(),
				registro.getCFUNNOME(),
				registro.getCFUNFIL(),
				registro.getCFUNMAT()
			));
		}

		return dataset;

	} else {
		c_filial = '';
	}

	try {
		for(c=0; c<q.rowsCount; c++) {
			filial = q.getValue(c, "Filial");
			if(c_filial == '') c_filial = filial;
			var result = service.consultafuncionario('', c_filial, '', nome_colab);
			for(var i=0;i<result.getZWSFLUIGRHSTRUCTFUNCIONARIO().size();i++){
				var registro = result.getZWSFLUIGRHSTRUCTFUNCIONARIO().get(i);
				//Cria os registros
				dataset.addRow(new Array(
					registro.getCFUNEMP(),
					registro.getCFUNNOME(),
					registro.getCFUNFIL(),
					registro.getCFUNMAT()
				));
			}
		}
	} catch (erro){
		var mensagem = erro.message;
		dataset.addRow(new Array('ERRO', mensagem.substr(38,1000)));
	}

	return dataset;
}

function getFilial() {
	var dataset = DatasetFactory.getDataset("ds_filial", null, null, null);
	return dataset;
}
