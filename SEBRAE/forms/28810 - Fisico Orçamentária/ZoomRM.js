var LASTVALUE = "";
var ELEMENT = ""
function initQuickSerch() {
	$(".zoom").click(function() {
				var reference = this.previousElementSibling.getAttribute("id");
				if(!$("#"+reference).prop("disabled") && !$("#"+reference).prop("readonly")){
					prepareZoom(
						$("#" + reference).attr("fields"), 
						getSimpleFilter($("#" + reference).attr("filter"), reference), 
						$("#" + reference).attr("datasetId"), 
						$("#" + reference).attr("zoom-type"),
						$("#" + reference).attr("dataFields"));
				}
			});
	
	$(".quick-search").click(function() {
		LASTVALUE = this.value;
	});

	$(".quick-search").blur(function() {
		if (this.value.trim().length > 0 && !this.getAttribute("readonly") && replaceSpecialChars(LASTVALUE) != replaceSpecialChars(this.value)) {
			searchValues(this);
			ELEMENT = this;
		} else if(this.value.trim().length == 0){
			var fields = getFieldNamesAndIds(this.getAttribute("fields").split(","));
			clearFields(fields);
			
			if(this.getAttribute("id") == "cpCodEmpresa"){
				cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpArea','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade']);
				$("#restricoes").empty();
			}
			if(this.getAttribute("id") == "cpArea"){	
				cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade']);
				$("#restricoes").empty();
			}
			if(this.getAttribute("id") == "cpCodColaborador"){	
				cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade']);
				$("#restricoes").empty();
			}
		}
	});
}

function searchValues(element) {
	var datasetId = element.getAttribute("datasetId");
	var fields = element.getAttribute("fields").split(",");
	var filter = element.getAttribute("filter").split(",");
	fields = getFieldNamesAndIds(fields);
	filter = getFilterNamesAndValues(filter);
	var data = getDatasetData(datasetId, fields, filter);
	getDataset(data, fields);
}

function getFieldNamesAndIds(fields) {
	var names = new Array();
	var ids = new Array();
	for (var i = 0; i < fields.length; i++) {
		names.push(fields[i]);
		i++;
		ids.push(fields[i]);
	}
	return {
		names : names,
		ids : ids
	};
}

function getFilterNamesAndValues(filter) {
	var names = new Array();
	var values = new Array();
	for (var i = 0; i < filter.length; i++) {
		names.push(filter[i]);
		i++;
		values.push(filter[i] == "" ? "" : ($("#" + filter[i]).length ? $("#" + filter[i]).val() : filter[i]));
	}
	return {
		names : names,
		values : values
	};
}

function getSimpleFilter(filter, id){
	var newFilter = new Array();
	var splittedFilter = filter.split(",")
	for(var i=0;i<splittedFilter.length;i++){
		if(i%2==0){
			//console.log("splittedFilter[i]: "+splittedFilter[i]);
			newFilter.push(splittedFilter[i]);
		}else{
			//console.log("splittedFilter[i] ELSE: "+splittedFilter[i])
			if(splittedFilter[i] == ""){
				newFilter.push("");
			}else{
				var campo = $("#"+splittedFilter[i]);
				//console.log("CAMPO: "+campo.length);				
				if(campo.length){		
					//console.log("IF: "+campo.val());		
					newFilter.push(campo.val());
				}
				else{
					//console.log("ELSE: "+splittedFilter[i]);		
					newFilter.push(splittedFilter[i]);
				}
			}
		}
	}
	return newFilter.toString();
}

function getFormatedFilter(filter){
	var newFilter = new Array();
	var splittedFilter = filter.split(",")
	for(var i=0;i<splittedFilter.length;i++){
		if(i%2==0){
			newFilter.push(splittedFilter[i]);
		}else{
			//console.log("splittedFilter[i] ELSE: "+splittedFilter[i])
			if(splittedFilter[i] == ""){
				newFilter.push("");
			}else{
				var campo = $("#"+splittedFilter[i]);
				//console.log("CAMPO: "+campo.length);				
				if(campo.length){		
					//console.log("IF: "+campo.val());		
					newFilter.push(campo.val());
				}
				else{
					//console.log("ELSE: "+splittedFilter[i]);		
					newFilter.push(splittedFilter[i]);
				}
			}
		}
	}
	return newFilter.toString();
}

function formatDate(date){
	var newDate = date.split("T")[0];
	newDate = newDate.split("-");
	return newDate[2]+"/"+newDate[1]+"/"+newDate[0];
}

function getDatasetData(datasetId, fields, filter) {
	var constraints = new Array();
	constraints.push(getConstraint("codSentenca", datasetId));
	constraints.push(getConstraint("companyid", "1"));
	constraints.push(getConstraint("codAplicacao", "P"));

	for (var i = 0; i < filter.names.length; i++) {
		constraints.push(getConstraint(filter.names[i], filter.values[i]));
	}

	var data = {
		"name" : "ds_generic_rm_sql_localiza",
		"fields" : fields.names,
		"constraints" : constraints
	}
	return data;
}

function getConstraint(field, value) {
	return {
		"_field" : field,
		"_initialValue" : value,
		"_finalValue" : value,
		"_type" : 0,
		"_likeSearch" : false
	};
}

function getDataset(data, fields) {
	var loading = FLUIGC.loading(window, {
		textMessage : '<h3>Consultando informa\u00E7\u00E3o no RM</h3>'
	});
	loading.show();
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : '/api/public/ecm/dataset/datasets',
		data : JSON.stringify(data),
		success : function(data, status, xhr) {
			if (data == null || data.content.values.length == 0 || eval("data.content.values[0]." + fields.names[0]) == "") {
				FLUIGC.toast({
					title : 'Aten\u00E7\u00E3o',
					message : "Nenhum registro encontrado.",
					type : 'danger'
				});
				if(ELEMENT.getAttribute("id") == "cpCodEmpresa"){
					cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpArea','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade','cpMotivoRescisao','cpCodMotivoRescisao']);
					$("#restricoes").empty();
				}
				if(ELEMENT.getAttribute("id") == "cpCodColaborador"){
					cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpArea','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade']);					
					$("#restricoes").empty();
				}
				clearFields(fields);
			} else if (data != null && data.content.values.length > 1) {				
				prepareZoom(ELEMENT.getAttribute("fields"), 
						getFormatedFilter(ELEMENT.getAttribute("filter")), 
						ELEMENT.getAttribute("datasetId"),
						ELEMENT.getAttribute("zoom-type"),
						ELEMENT.getAttribute("dataFields"));
				clearFields(fields);
			} else {
				putValuesOnFields(data.content, fields,ELEMENT.getAttribute("id"));
			}
			loading.hide();
		},
		error : function(xhr, status, error) {
			FLUIGC.toast({
				title : 'Aten\u00E7\u00E3o',
				message : "Erro ao realizar a consulta: " + error,
				type : 'danger'
			});
			clearFields(fields);
			loading.hide();
		}
	});
}

function clearFields(fields) {
	for ( var i in fields.ids) {
		$("#" + fields.ids[i]).val("");
	}
}

function putValuesOnFields(data, fields, id) {
	// Valida se possui necessidades especiais
	var necessities = ["DEFICIENTEFALA", "DEFICIENTEAUDITIVO", "DEFICIENTEFISICO", "DEFICIENTEINTELECTUAL", 
	                   "DEFICIENTEMENTAL", "DEFICIENTEMOBREDUZIDA", "DEFICIENTEVISUAL" , "DEFICIENTEOBSERVACAO"];
	for ( var i in data.columns) {
		for ( var j in fields.names) {
			if (fields.names[j] == data.columns[i]){
				var val = data.values[0][data.columns[i]];
				if(necessities.indexOf(data.columns[i]) > -1 && val.toString() == "1")
					$("#cpNescessidadeEspecial").val("SIM");
				
				val = val.indexOf("T00:00:00")>-1?formatDate(val):val;
				$("#" + fields.ids[j]).val(val);
			}
		}
	}
	
	if(id == "cpCodEmpresa"){
		cleanFields(['cpCodColaborador','cpNomeColaborador','cpFuncao','cpCodFuncao','cpClasse','cpSituacaoColaborador','cpArea','cpDataAdmissao','cpTempoDeCasa','cpNescessidadeEspecial','cpTipoNecessidade','cpMotivoRescisao','cpCodMotivoRescisao']);
		$("#restricoes").empty();		
	}
	if(id == "cpCodColaborador"){			
		verificaRestricoes();
	}
	if(id == "cpCodColaborador" && $("#cpNescessidadeEspecial").val() == ""){
		$("#cpNescessidadeEspecial").val("NAO");
		calculateYears();		
	}
}

function prepareZoom(fields, filter, id, type, dataFields) {
	//console.log("FILTER: "+filter);
	var sentenceId = datasetId;
	var datasetId = 'ds_generic_rm_sql_localiza';
	var codColigada = '1';
	var applicationId = 'P,';
	var title = 'Consulta';
	var sentenceId = id;
	var resultFields = getFieldNamesAndIds(fields.split(",")).names.toString();
	filterValues = 'codSentenca,' + sentenceId + ',companyid,' + codColigada + ',codAplicacao,' + applicationId
			+ filter;
	openZoom(title, datasetId, dataFields, resultFields, type, filterValues, 600, 400);
}
var windowRef;
function openZoom(title, datasetId, dataFields, resultFields, name, filterValues, w, h) {
	var url = '/webdesk/zoom.jsp?';
	url += 'title=' + title + '&';
	url += 'datasetId=' + datasetId + '&';
	url += 'dataFields=' + dataFields + '&';
	url += 'resultFields=' + resultFields + '&';
	url += 'type=' + name + '&';
	url += 'filterValues=' + filterValues;

	windowRef = window.open(url, 'zoom', 'status, scrollbars=no, width=' + w + ', height=' + h + ', top=0, left=0');
}

function replaceSpecialChars(str)
{
    str = str.toUpperCase()
	.replace(/[ÁÀÃÂÄ]/,"A")
	.replace(/[ÉÈÊË]/,"E")
	.replace(/[ÍÌÎÏ]/,"I")
	.replace(/[ÓÒÔÕÖ]/,"O")
	.replace(/[ÚÙÛÜ]/,"U")
	.replace(/[´`~¨^]/,"")
	.replace(/[Ç]/,"C");
    return str; 
}
