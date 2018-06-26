/**
 * JS CUSTOM
 */
console.log('custom.js Loading...');

/** Objects Api Google Maps **/
var apiMap, directionsService, directionsDisplay, DistanceMatrixService;
var address = new Array();
var countPages = 0;
/** Instancia Classes **/
var myApps = new MyFunctions();
var myUtils = new MyUtils();

/** Object Tables **/
var components = new Object({
	myid: new Object(),
	modal: new Object(),
	myModal: new Object(),
	theard: new Object(),
	numprogress: 0
});

/** Object DataTable **/
var dataTable = new Object({
	myTable: null,
	tableData: null,
	mydata: new Array(),
	dataActionRow: new Array(),
	mypages: new Array(),
	mypage: 0
});

/** Object Ramais **/
var ramais_ = new Object({
	mydata: new Array()
});

/**
 * Função de inicialização
 * 
 * Todas as funções chamadas dentro dessa função serão chamadas na inicialização do script.
 **/
$(function(){

	myApps.initLoading.loadCustom();
});

function setSelectedZoomItem(selectedItem){//NOTE: Função do leave do Zoom
	if(selectedItem.inputId == 'munorigem'){
		myUtils.appComponents.setElement('codorigem', selectedItem.cdMunicipio);
		myUtils.appComponents.setElement('cidorigem', selectedItem.nmMunicipio);
	}else if(selectedItem.inputId == 'mundestino'){
		myUtils.appComponents.setElement('coddestino', selectedItem.cdMunicipio);
		myUtils.appComponents.setElement('ciddestino', selectedItem.nmMunicipio);
	}else{
		var item = selectedItem.inputId.replace(/[0-9]+/g, '');
		var zoomName = item.replace('___', '');
		var id = selectedItem.inputId.replace(zoomName+'___', ''); //NOTE: Id do zoomfield no PaixFilho
		if (zoomName != '' && zoomName != null && zoomName == ''){

		}
	}	
	myUtils.byFluig.zoomRemoveDiplay('#'+selectedItem.inputId);
}
