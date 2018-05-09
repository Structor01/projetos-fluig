/*function createDataset(fields, constraints, sortFields) {

	var v = "0205;0206;0116;0115;0114;0204;0101;0201; 0202; 0203;0107;0106;0112;0109;0108;0105;0104;0110;0113;0103;0102;0111;"

	var vSplit = v.split(";");
	var dataset = DatasetBuilder.newDataset();
	var c;
	//Cria as colunas
	dataset.addColumn("Filial");
	dataset.addColumn("Municipio");
	dataset.addColumn("Estado");
	dataset.addColumn("CGC");
	var size = vSplit.length;
	var s = size/4;
	var i = 0;
	var count = 0;
	var c_filial;

	if(constraints != null && constraints.length > 1) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "Filial") {
				c_filial = constraints[i].initialValue;
			}
		}

		for(i = 0; i < 21; i++) {
			for(j=0; j<1; j++) {
				count = count + 4;
				var s = vSplit[count].toString();
				if(s.indexOf(c_filial.toString()) > -1) dataset.addRow(new Array(vSplit[count], vSplit[count + 1], vSplit[count + 2], vSplit[count + 3]));
			}
		}

	} else {
		for(i = 0; i < 21; i++) {
			for(j=0; j<1; j++) {
				count = count + 4;
				dataset.addRow(new Array(vSplit[count], vSplit[count + 1], vSplit[count + 2], vSplit[count + 3]));
			}
		}
	}

	return dataset;
}
*/
function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODRETORNO");
	dataset.addColumn("MSGRETORNO");

    //Cria as colunas

    var listaCliente = ServiceManager.getService('WSZFLUIG');
	log.warn("--Debbug-- listaCliente: " +listaCliente);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaCliente.instantiate('_217._157._168._192._8085.ZFLUIGCLIENTES');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getZFLUIGCLIENTESSOAP();

	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);

	var CCODIGO = '';
	var CDESCRICAO = '';

	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CCODIGO"){
				log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				CCODIGO = constraints[c].initialValue;
				//ccusto.setCCODFILIAL(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == "CDESCRICAO"){
				CDESCRICAO = constraints[c].initialValue;
				log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				//ccusto.setCCUSTO(constraints[c].initialValue);
			}
		}
	}

	try {

		var result = service.consultafiliais(CCODIGO, CDESCRICAO);
		log.warn("--Debbug-- result: " +result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getZFLUIGCLIENTESSTRUCTCANAIS().get(0).getCCODIGO());
		log.warn("--Debbug-- SIZE: " + result.getZFLUIGCLIENTESSTRUCTFILIAIS().size());


		dataset.addColumn("CCODIGO");
		dataset.addColumn("CDESCRICAO");

		for(var i=0;i<result.getZFLUIGCLIENTESSTRUCTFILIAIS().size();i++){

			var registro = result.getZFLUIGCLIENTESSTRUCTFILIAIS().get(i);
			 //Cria os registros
			dataset.addRow(new Array(	'OK', 'REGISTRO ENCONTRADO',
										registro.getCCODIGO(),
										registro.getCNOME()));
		}
	} catch (erro){
		var mensagem = erro.message;
		dataset.addRow(new Array('ERRO', mensagem.substr(38,1000)));
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
		//log.dir(erro);
	}

    return dataset;
}
