/**
* Função do leave do Zoom
* @param selectedItem - Item selecionado
*/

var arr = new Array();

function setSelectedZoomItem(selectedItem){

	// var tableId = selectedItem.inputId.substring(selectedItem.inputId.indexOf("___") + 3, selectedItem.inputId.indexOf("___") + 6);

	// var zoom = $('div.form-field.alinhaTable').find('span.select2.select2-container.fluig-container.select2-container--default.select2-container--above.select2-container--focus').find('span.selection').find('span.select2-selection.select2-selection--multiple').show();
	// zoom.width('300px');

	//if(selectedItem.inputId.startsWith('zoomCr')){


	for(var i=1; i < $('.rowPF').length; i++) {
		var idx = $('.rowPF:eq('+i+')').attr('id').replace('idx___', '');
		if(selectedItem.inputId == 'zoomProduto___'+idx) {
			$('#unidade___'+idx).val(selectedItem.UM);
			$('#codProduto___'+idx).val(selectedItem.CCODIGO);
			if(arr.indexOf(selectedItem.CCODIGO) > -1)
				limparItem('zoomProduto___'+idx);
			else
				arr.push(selectedItem.CCODIGO);
		}
	}

	if(selectedItem.inputId == 'zoomGrupoProduto'){
		$('#grupoProd').val(selectedItem.CCODIGO);
		consultaCompradorProtheus(selectedItem.CDESCRICAO);
	}

	if(selectedItem.inputId == 'zoomFilial'){
		$('#codFilial').val(selectedItem.CFILEMP);
	}

	if(selectedItem.inputId == 'zoomFilialEntrega'){
		$('#codFilialEnt').val(selectedItem.CFILEMP);
	}
}

function limparItem(instance) {
	mensagemAlerta("Atenção", "O item escolhido já consta na solicitação.", false);
	window[instance].clear();
}

/**
* Função acionada ao eliminar uma tag(valor) de um campo zoom
* @param removedItem
* @returns
*/
function removedZoomItem(removedItem) {

	var tableId = removedItem.inputId.substring(removedItem.inputId.indexOf("___") + 3, removedItem.inputId.indexOf("___") + 6);
	var zoom = $('div.form-field.alinhaTable').find('span.select2.select2-container.fluig-container.select2-container--default.select2-container--above.select2-container--focus').find('span.selection').find('span.select2-selection.select2-selection--multiple').show();
	zoom.width('300px');

	if(removedItem.inputId.indexOf('zoomProduto___') > -1) {
		var idx = removedItem.inputId.replace('zoomProduto___', '');
		if(arr.indexOf(removedItem.CCODIGO) > -1) arr.splice(arr.indexOf(removedItem.CCODIGO), 1);
		$('#idx___'+idx).children('td:eq(0)').children().children('span').click();
	}

	if (removedItem.inputId == 'zoomProduto___'+tableId){
		$('#descrProduto___'+tableId).val('');
	}

	if(removedItem.inputId == 'zoomProduto___'+tableId){
		$('#unidade___'+tableId).val('');
	}

	if(removedItem.inputId == 'zoomGrupoProduto'){
		clearTable('tbSolCompras');
		$('#zoomGrupoProduto option').remove();
		$('#grupoProd').val('');
	}
}

/**
* Setar valor em um zoom
* @param instance - id do campo zoom
* @param value - valor setado
* @returns
*/
function setZoomData(instance, value){
	window[instance].setValue(value);
}
/**
* Função de exclusão de registros da table
* @param tablename
* @returns
*/
function clearTable(tablename){
	if (!tablename || $("table[tablename="+tablename+"]").length == 0) return;
	window.rowIndex[""+tablename+""] = 0;
	$('table[tablename=' + tablename + '] tbody tr').not(':first').remove();
}

function consultaCompradorProtheus(grupo){
	var c1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('zoomGrupoProduto', grupo, grupo, ConstraintType.MUST);
	var datasetDsGestaoCompradores = DatasetFactory.getDataset('dsGestaoCompradores', null, new Array(c1, c2), null);

	if( datasetDsGestaoCompradores.values.length > 0){
		$("#codComprador").val(datasetDsGestaoCompradores.values[0]["codigoSolicitante"]);
	} else{
		MensagemAlerta("Atenção","Não existe comprador cadastrado para este grupo de produto. Favor cadastrar!")
		window['zoomGrupoProduto'].clear();
	}
}
