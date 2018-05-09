function setSelectedZoomItem(selectObject) {
	var obj = selectObject['inputId'];
	
	indexProduto = getIndex(selectObject['inputId']);
	
	if (obj == 'dsUf'){
		document.getElementById("cdEstado").value = selectObject['cdEstado'];
		removeValueZoomData("filter_dsCidade");
		reloadZoomFilterValues("dsCidade", "CODETDMUNICIPIO," + selectObject['cdEstado']);
	}
//	if (obj == 'dsFornecedor'){
//		console.log('dsFornecedor');
//					
//		if(($('#dsCnpjFornecedor').val()) == '' || ($('#dsCnpjFornecedor').val() != selectObject['CGCCFO']) ){
//			reloadZoomFilterValues("dsCnpjFornecedor", "CODCOLIGADA," + $('#codColigadaInicial').val()+",CODETD," + $('#dsUfFornecedor').val()+",NOME,"+$('#dsFornecedor').val());
//			//Filter de dados e seta dados 
//			var itemSelected = {"CGCCFO": selectObject['CGCCFO'], "NOME": selectObject['NOME'], "NOMEFANTASIA": selectObject['NOMEFANTASIA'], "PESSOAFISOUJUR": selectObject['PESSOAFISOUJUR']};
//			setZoomData('filter_dsCnpjFornecedor', itemSelected);
//			
//			document.getElementById("codCFO").value = selectObject['CODCFO'];
//			document.getElementById("codcolCFO").value = selectObject['CODCOLIGADA'];
//		}
//	}
	
//	if (indexProduto != undefined){
//		var grupo = ""
//		if (obj == 'dsGrupoProdutoI___'+ indexProduto){
//			document.getElementById("dsGrupoProdutoI___"+ indexProduto).value = selectObject['NOMEFANTASIA'];
//			document.getElementById("codGrupoI___"+ indexProduto).value = selectObject['CODIGOPRD'];
//			reloadZoomFilterValues("dsGrupoProdutoII___"+ indexProduto, "CODCOLIGADA," + $('#codColigadaInicial').val()+",PRODUTOTIPO," + $("#codGrupoI___"+ indexProduto).val());
//
//		}
//	}
		
}

function getIndex(typeSelected) {
	var id = typeSelected.split('___');
	if (id.length == 2) {
		return id[1];
	} else {
		return id[2];
	}
}


function buscaDadosForm(indexProduto, grupo){
	var result =  $(grupo+indexProduto).val();
	return result;
}


/**
 * Função para remove valor campo Zoom
 * @param inputObj
 * @returns
 */
function removeValueZoomData(inputObj){
	if($.type(inputObj)  === "string"){
		window[inputObj].removeAll();
	}else{
		inputObj.removeAll();
	}
}

/**
 * Função para setar campo Zoom
 * @param inputObj
 * @param item
 * @returns
 */
function setZoomData(inputObj, item){
	if($.type(inputObj)  === "string"){
		window[inputObj].add(item);
	}else{
		inputObj.add(item);
	}
}
