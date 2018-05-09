$("document").ready(function() {
	escondeDivs();
	requiredFields();
	init();
});

function cleanFields(fields){
	for(var i=0;i<fields.length;i++){
		$("#"+fields[i]).val("");
	}
}

function escondeDivs(){
	if(CURRENT_STATE == "null"){
		return false;
	}
	if((CURRENT_STATE == FIM || CURRENT_STATE == FIM_CANCELADO_GERENTE || CURRENT_STATE == FIM_CANCELADO_SOLICITANTE) && FORM_MODE == "VIEW"){
		return false;
	}
	
	$("#painelSolicitacao").hide();
	$("#painelCabecalho").hide();
	$("#painelDados").hide();
	$("#painelOrcamento").hide();
	$("#painelMetas").hide();
	$("#painelGerencia").hide();
	$("#painelValidaOrc").hide();
	$("#painelUGE").hide(); 
	$("#painelSuper").hide();
	$("#painelProvidenciaSGE").hide();
	$("#painelProjetoSGE").hide();
	$("#painelNovoProjeto").hide();
	$("#painelQuando").hide();
	$("#painelQuadroAjuste").hide();
	var histGerente = $("#cpHistGerencia").val();
	var histOrc = $("#cpHistOrc").val();
	var histUge = $("#cpHistUGE").val();
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
	}
	if(CURRENT_STATE == ANALISA_SOLICITACAO_GERENTE){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
			if ($("#PassouCorrecao").val() == "1" || $("#PassouOrcUGE").val() == "1" || ($("#PassouGerUGE").val() == "1"))
			{
				$("#painelHistoricoGerencia").show();
				histGerente += "Em " + $("#dtAutorizaGer").val() + " - Observação Gerente: " + $("#cpObsGerencia").val() + "\n"; 
				$("#cpHistGerencia").val(histGerente);
			}
			else{
				$("#painelHistoricoGerencia").hide();
			}
			
			if ($("#PassouOrcUGE").val() == "1")
			{
				$("#painelValidaOrc").show();
			}
			
			if ($("#PassouGerUGE").val() == "1")
			{
				$("#painelUGE").show();
			}
			if($("#cmbTipoAlteracao").val() == "1"){
		    	$("#painelNovoProjeto").show(); 	
		    }
		cleanFields(['cmbAutorizaGer','cpObsGerencia']);
		$("#PassouGerencia").val('1');
		
	}
	if(CURRENT_STATE == REALIZAR_CORRECAO || CURRENT_STATE == REALIZAR_CORRECAO2){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
			if ($("#PassouGerencia").val() == "1")
			{
				$("#painelGerencia").show();
			}
			if ($("#PassouOrcUGE").val() == "1")
				{
					$("#painelValidaOrc").show();
				}
			if ($("#PassouGerUGE").val() == "1")
			{
				$("#painelUGE").show();
			}
		$("#PassouCorrecao").val("1");
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
	if(CURRENT_STATE == VERIFICAR_ORCAMENTO){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
			if ($("#PassouOrcUGE").val() == "1" || ($("#PassouGerUGE").val() == "1"))
			{
				$("#painelHistoricoOrc").show();
				histOrc += "Em " + $("#dtValidaOrc").val() + " - Observação Validador: " + $("#ObsValidadorOrc").val() + "\n"; 
				$("#cpHistOrc").val(histOrc);
			}
			else{
				$("#painelHistoricoOrc").hide();
			}
			
			if ($("#PassouGerencia").val() == "1")
			{
				$("#painelGerencia").show();
			}
			if ($("#PassouGerUGE").val() == "1")
			{
				$("#painelUGE").show();
			}
		$("#PassouOrcUGE").val('1');
		cleanFields(['cmbValidaOrc','ObsValidadorOrc']);
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
	if(CURRENT_STATE == GERENCIA_UGE){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show();
			if ($("#PassouGerUGE").val() == "1")
			{
				$("#painelHistoricoUGE").show();
				histUge += "Em " + $("#dtParecerUGE").val() + " - Parecer UGE: " + $("#cpParecerUGE").val() + "\n"; 
				$("#cpHistUGE").val(histUge);
			}
			else{
				$("#painelHistoricoUGE").hide();
			}
			
			if ($("#PassouGerencia").val() == "1")
			{
				$("#painelGerencia").show();

			}
			if ($("#PassouOrcUGE").val() == "1")
				{
					$("#painelValidaOrc").show();
			
				}
			
		$("#PassouGerUGE").val('1');
		cleanFields(['cmbAutorizaUGE','cpParecerUGE']);
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
	
	if(CURRENT_STATE == AUTORIZA_SUPER){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show(); 
		$("#painelSuper").show(); 
		$("#PassouSuper").val('1');
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}

	if(CURRENT_STATE == ALTERAR_PROJETO_SGE){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show(); 
		$("#painelSuper").show(); 
		$("#painelProjetoSGE").show();
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}

	if(CURRENT_STATE == CONFIRMAR_DATA_ALTERACAO){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show(); 
		$("#painelSuper").show();
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
	if(CURRENT_STATE == GUARDAR_PROCESSO){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show(); 
		$("#painelSuper").show();
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
	if(CURRENT_STATE == FIM || CURRENT_STATE == null){
		$("#painelSolicitacao").show();
		$("#painelCabecalho").show();
		$("#painelDados").show();
		$("#painelOrcamento").show();
		$("#painelMetas").show();
		$("#painelGerencia").show();
		$("#painelValidaOrc").show();
		$("#painelUGE").show(); 
		$("#painelSuper").show();
		$("#painelProvidenciaSGE").show();
		if($("#cmbTipoAlteracao").val() == "1"){
	    	$("#painelNovoProjeto").show(); 	
	    }
	}
}

function init() {
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == REALIZAR_CORRECAO2) {		
		if (CURRENT_STATE == 0 || CURRENT_STATE == INICIO){		
			$("#_txtDataSolicitacao").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
			$("#_txtNomeSolicitante").val(parent.WCMAPI.getUser());
			$("#txtDataSolicitacao").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
			$("#txtNomeSolicitante").val(parent.WCMAPI.getUser());
			FLUIGC.calendar('.date', {
				minDate : new Date(),
				maxDate : new Date(new Date().getFullYear(), 11, 31)		
			});
			$("#postArquivoAnexo").on("change", function(event){
				var form = new FormData();
				form.append("fileUpload", event.target.files[0]);
				uploadFile(form);
			});
		}
		$(".add-metas").on("click", function(){
			wdkAddChild('tblMetas');
//			$("input.dinheiro").maskMoney({
//				showSymbol : true,
//				symbol : "R$",
//				decimal : ",",
//				thousands : ".",
//				allowNegative : true,
//				allowZero : true
//			});
//			$(".dinheiro").on("blur", function(){
//				if(this.value.indexOf(",") > -1){
//					var value = this.value.split(",")[0];
//					this.value = value + ",00";
//				}
//				calculaValores();
//			});
			$("input.dinheiro").maskMoney({
				showSymbol : true,
				symbol : "R$",
				decimal : ",",
				thousands : ".",
				allowNegative : true,
				allowZero : true
			});
			$(".dinheiro3").on("blur", function(){
				if(this.value.indexOf(",") > -1){
					var value = this.value.split(",")[0];
					//this.value = value + ",00";
				}
				calcMetas(this.id);
			});
		});
		
		if(CURRENT_STATE != INICIO){
			//getUnidade();
			getSituacao();
		}
			
	}
	if(CURRENT_STATE == ANALISA_SOLICITACAO_GERENTE) {		
		$("#dtAutorizaGer").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#txtAutorizaGer").val(parent.WCMAPI.getUser());
		$("#_dtAutorizaGer").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#_txtAutorizaGer").val(parent.WCMAPI.getUser());
		FLUIGC.calendar('.date');
	}
	if(CURRENT_STATE == VERIFICAR_ORCAMENTO) {	
		$("#dtValidaOrc").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#txtValidaOrc").val(parent.WCMAPI.getUser());
		$("#_dtValidaOrc").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#_txtValidaOrc").val(parent.WCMAPI.getUser());
		FLUIGC.calendar('.date');
	}
	if(CURRENT_STATE == GERENCIA_UGE) {	
		$("#dtParecerUGE").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#txtParecerUGE").val(parent.WCMAPI.getUser());
		$("#_dtParecerUGE").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#_txtParecerUGE").val(parent.WCMAPI.getUser());
		FLUIGC.calendar('.date');
	}
	if(CURRENT_STATE == AUTORIZA_SUPER) {	
		$("#dtParecerSuper").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#txtParecerSuper").val(parent.WCMAPI.getUser());
		$("#_dtParecerSuper").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#_txtParecerSuper").val(parent.WCMAPI.getUser());
		FLUIGC.calendar('.date');
	}
	if(CURRENT_STATE == ALTERAR_PROJETO_SGE) {	
		$("#txtAlteraSGE").val(parent.WCMAPI.getUser());
		$("#_txtAlteraSGE").val(parent.WCMAPI.getUser());
		$("#dtAlteraSGE").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		$("#_dtAlteraSGE").val(FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt'));
		FLUIGC.calendar('.data-sge', { maxDate : new Date() });
		$("#txtCsnOrig1").val($("#txtCsnOrig").val());
		$("#txtCsnProp1").val($("#txtCsnPropOrig").val());
		$("#txtCsoOrig1").val($("#txtCsoOrig").val());
		$("#txtEbOrig1").val($("#txtEbOrig").val());
		$("#txtConvenioOrig1").val($("#txtConvenioOrig").val());
		$("#txtTotalOrig1").val($("#txtTotalOrig").val());
		
		$("#txtCsnAjuste1").val($("#txtCsnAjuste").val()); 
		$("#txtCsnPropAjuste1").val($("#txtCsnPropAjuste").val()); 
		$("#txtCsoAjuste1").val($("#txtCsoAjuste").val()); 
		$("#txtEbAjuste1").val($("#txtEbAjuste").val()); 
		$("#txtConvenioAjuste1").val($("#txtConvenioAjuste").val()); 
	}
	if(CURRENT_STATE == CONFIRMAR_DATA_ALTERACAO){
		FLUIGC.calendar('.date', {
			minDate : new Date(),
			maxDate : new Date(new Date().getFullYear(), 11, 31)		
		});
	}
	if (CURRENT_STATE = REALIZAR_CORRECAO){
		//alert('Estou aqui');
		$(".dinheiro3").on("blur", function(){
			if(this.value.indexOf(",") > -1){
				var value = this.value.split(",")[0];
				//this.value = value + ",00";
			}
			calcMetas(this.id);
		});
	}
}
function verificaData(){

	var parsedDate = $("#txtQuando").val();
 	var d = new Date();
 	var todayDate = ((d.getDate() < 10) ? "0"+d.getDate() : d.getDate()) + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	
			var dif = dayDiff(parseDate(todayDate),parseDate(parsedDate));
		    $("#diasGuardarProcesso").val(dif);
}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

function dayDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function novoProjeto() {
    if($("#cmbTipoAlteracao").val() == "1"){
    	$("#painelNovoProjeto").show(); 	
    }
    else{
    	$("#painelNovoProjeto").hide(); 
    }
}

function prioridade() {
    if($("#cmbPrioridade").val() == "Futura"){
    	$("#painelQuando").show();
    	if($("#alertou").val() == null || $("#alertou").val() == ""){
    	$("#alerta").append("<div class='alert alert-info' role='alert'>Os valores orçamentários refletem aqueles que estavam válidos na data de criação do processo.</div> <input type='hidden' name='alertou' id='alertou' value='1' />");
    	}	
    }
    else{
    	$("#painelQuando").hide(); 
    }
}
function mostraQuadro() {
    if($("#cmbValorAlterado").val() == "Sim"){
    	$("#painelQuadroAjuste").show();
    	calculaValoresNovo();
    }
    else{
    	$("#painelQuadroAjuste").hide(); 
    }
}


function calculaValores() {
	
	var CsnOrig = $("#txtCsnOrig").val();
	var CsnPropOrig = $("#txtCsnPropOrig").val();
	var CsoOrig = $("#txtCsoOrig").val(); 
	var EbOrig = $("#txtEbOrig").val(); 
	var ConvenioOrig = $("#txtConvenioOrig").val();
	
	var CsnAjuste = $("#txtCsnAjuste").val();
	var CsnPropAjuste = $("#txtCsnPropAjuste").val();
	var CsoAjuste = $("#txtCsoAjuste").val(); 
	var EbAjuste = $("#txtEbAjuste").val(); 
	var ConvenioAjuste = $("#txtConvenioAjuste").val(); 
	

	
	CsnOrig = parseFloat(CsnOrig.replace(".","").replace(".","").replace(",", "."));
	CsnPropOrig = parseFloat(CsnPropOrig.replace(".","").replace(".","").replace(",", "."));
	CsoOrig = parseFloat(CsoOrig.replace(".","").replace(".","").replace(",", "."));
	EbOrig = parseFloat(EbOrig.replace(".","").replace(".","").replace(",", "."));
	ConvenioOrig = parseFloat(ConvenioOrig.replace(".","").replace(".","").replace(",", "."));
	
	CsnAjuste = parseFloat(CsnAjuste.replace(".","").replace(".","").replace(",", "."));
	CsnPropAjuste = parseFloat(CsnPropAjuste.replace(".","").replace(".","").replace(",", "."));
	CsoAjuste = parseFloat(CsoAjuste.replace(".","").replace(".","").replace(",", "."));
	EbAjuste = parseFloat(EbAjuste.replace(".","").replace(".","").replace(",", "."));
	ConvenioAjuste = parseFloat(ConvenioAjuste.replace(".","").replace(".","").replace(",", "."));

	var somaOrig = CsnOrig + CsnPropOrig + CsoOrig  + EbOrig + ConvenioOrig;	
	var somaAjuste = CsnAjuste + CsnPropAjuste+ CsoAjuste  + EbAjuste + ConvenioAjuste;	
	var somaCSN = CsnOrig + CsnAjuste;
	var somaPropCSN = CsnPropOrig + CsnPropAjuste;
	var somaCSO = CsoOrig + CsoAjuste;
	var somaEB = EbOrig + EbAjuste;
	var somaConvenio = ConvenioOrig + ConvenioAjuste;
	var somaTotal = somaOrig + somaAjuste;
	
	somaOrig = somaOrig.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaAjuste = somaAjuste.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaTotal = somaTotal.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaCSN = somaCSN.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaPropCSN = somaPropCSN.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaCSO = somaCSO.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaEB = somaEB.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaConvenio = somaConvenio.toFixed(2).toString().replace(",", ".").replace(".", ",");
	
	
	 somaOrig=somaOrig.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaOrig.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaOrig=somaOrig.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }
	 
	 somaAjuste=somaAjuste.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaAjuste.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaAjuste=somaAjuste.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }

	 somaTotal=somaTotal.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaTotal.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaTotal=somaTotal.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }
	 
	 somaCSN=somaCSN.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaCSN.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaCSN=somaCSN.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }
	 
	 somaPropCSN=somaPropCSN.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaPropCSN.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaPropCSN=somaPropCSN.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }
	 
	 somaCSO=somaCSO.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaCSO.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaCSO=somaCSO.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }

	 somaEB=somaEB.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaEB.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaEB=somaEB.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }
	 
	 somaConvenio=somaConvenio.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
	 var qtdLoop = (somaConvenio.length-3)/3;
	 var count = 0;
	 while (qtdLoop > count)
	 {
	 count++;
	 somaConvenio=somaConvenio.replace(/(\d+)(\d{3}.*)/,"$1.$2");
	 }

	$("#txtTotalOrig").val(somaOrig);

	$("#txtTotalAjuste").val(somaAjuste);
	$("#txtTotalFinal").val(somaTotal);
	$("#txtCsnFinal").val(somaCSN);
	$("#txtCsnPropFinal").val(somaPropCSN);
	$("#txtCsoFinal").val(somaCSO);
	$("#txtEbFinal").val(somaEB);
	$("#txtConvenioFinal").val(somaConvenio);
	
	
}

function calculaValoresNovo() {
	var CsnOrig1 = $("#txtCsnOrig1").val();
	var CsnPropOrig1 = $("#txtCsnProp1").val();
	var CsoOrig1 = $("#txtCsoOrig1").val(); 
	var EbOrig1 = $("#txtEbOrig1").val(); 
	var ConvenioOrig1 = $("#txtConvenioOrig1").val();
	
	var CsnAjuste1 = $("#txtCsnAjuste1").val();
	var CsnPropAjuste1 = $("#txtCsnPropAjuste1").val();
	var CsoAjuste1 = $("#txtCsoAjuste1").val(); 
	var EbAjuste1 = $("#txtEbAjuste1").val(); 
	var ConvenioAjuste1 = $("#txtConvenioAjuste1").val(); 
	
	CsnOrig1 = parseFloat(CsnOrig1.replace(".","").replace(".","").replace(",", "."));
	CsnPropOrig1 = parseFloat(CsnPropOrig1.replace(".","").replace(".","").replace(",", "."));
	CsoOrig1 = parseFloat(CsoOrig1.replace(".","").replace(".","").replace(",", "."));
	EbOrig1 = parseFloat(EbOrig1.replace(".","").replace(".","").replace(",", "."));
	ConvenioOrig1 = parseFloat(ConvenioOrig1.replace(".","").replace(".","").replace(",", "."));
	
	CsnAjuste1 = parseFloat(CsnAjuste1.replace(".","").replace(".","").replace(",", "."));
	CsnPropAjuste1 = parseFloat(CsnPropAjuste1.replace(".","").replace(".","").replace(",", "."));
	CsoAjuste1 = parseFloat(CsoAjuste1.replace(".","").replace(".","").replace(",", "."));
	EbAjuste1 = parseFloat(EbAjuste1.replace(".","").replace(".","").replace(",", "."));
	ConvenioAjuste1 = parseFloat(ConvenioAjuste1.replace(".","").replace(".","").replace(",", "."));

	var somaOrig = CsnOrig1 + CsnPropOrig1 + CsoOrig1  + EbOrig1 + ConvenioOrig1;
	var somaAjuste = CsnAjuste1 + CsnPropAjuste1+ CsoAjuste1  + EbAjuste1 + ConvenioAjuste1;	
	var somaCSN = CsnOrig1 + CsnAjuste1;
	var somaPropCSN = CsnPropOrig1 + CsnPropAjuste1;
	var somaCSO = CsoOrig1 + CsoAjuste1;
	var somaEB = EbOrig1 + EbAjuste1;
	var somaConvenio = ConvenioOrig1 + ConvenioAjuste1;
	var somaTotal = somaOrig + somaAjuste;
	
	somaOrig = somaOrig.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaAjuste = somaAjuste.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaTotal = somaTotal.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaCSN = somaCSN.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaPropCSN = somaPropCSN.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaCSO = somaCSO.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaEB = somaEB.toFixed(2).toString().replace(",", ".").replace(".", ",");
	somaConvenio = somaConvenio.toFixed(2).toString().replace(",", ".").replace(".", ",");
	
	$("#txtTotalOrig1").val(somaOrig);	
	$("#txtTotalAjuste1").val(somaAjuste);
	$("#txtTotalFinal1").val(somaTotal);
	$("#txtCsnFinal1").val(somaCSN);
	$("#txtCsnPropFinal1").val(somaPropCSN);
	$("#txtCsoFinal1").val(somaCSO);
	$("#txtEbFinal1").val(somaEB);
	$("#txtConvenioFinal1").val(somaConvenio);
	
	comparaValores();
	alteraCorCampo();
}

function comparaValores(){
	var origem = ["_txtCsnAjuste", "_txtCsnPropAjuste", "_txtCsoAjuste", "_txtEbAjuste", "_txtConvenioAjuste"];
	var destino = ["txtCsnAjuste1", "txtCsnPropAjuste1", "txtCsoAjuste1", "txtEbAjuste1", "txtConvenioAjuste1"];
	
	for(var i=0;i<origem.length;i++){
		var valorOrigem = $("#"+origem[i]).val().replace(/\./g,"").replace(",",".");
		var valorDestino = $("#"+destino[i]).val().replace(/\./g,"").replace(",",".");
		if(parseInt(valorDestino,10) > parseInt(valorOrigem, 10)){
			FLUIGC.toast({
		        message: 'O valor do ajuste n\u00E3o pode ser maior que o de origem.',
		        type: 'warning'
		    });
			$("#"+destino[i]).val($("#"+origem[i]).val());
		}
	}
}

function alteraCorCampo(){
	var origem = ["_txtCsnAjuste", "_txtCsnPropAjuste", "_txtCsoAjuste", "_txtEbAjuste", "_txtConvenioAjuste"];
	var destino = ["txtCsnAjuste1", "txtCsnPropAjuste1", "txtCsoAjuste1", "txtEbAjuste1", "txtConvenioAjuste1"];
	for(var i=0;i<origem.length;i++){
		if($("#"+origem[i]).val() != $("#"+destino[i]).val()){
			$($("#"+destino[i]).parent()).addClass("has-error");
		}else{
			$($("#"+destino[i]).parent()).removeClass("has-error");
		}
	}
}

function uploadFile(form, saveGED){
	var loading = FLUIGC.loading(window, {textMessage: $(".template-upload").html()});
	loading.show();
	var that = this;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/ecm/upload',
		processData: false,
        contentType: false,
        cache:false,
		data: form,
		xhr: function() {
             var myXhr = $.ajaxSettings.xhr();
             if(myXhr.upload){
                 myXhr.upload.addEventListener('progress', progress, false);
             }
             return myXhr;
		},
		success: function (data, status, xhr) {
			if(data != null && data.files.length > 0){
				addAttachment(data.files[0].name);
			}
			loading.hide();
		},
		error: function(xhr, status, error) {
			FLUIGC.toast({message: 'Erro ao realizar upload do arquivo.',type: 'danger'});
			loading.hide();
		}
	});
}

function addAttachment(fileName) {
	var dataAttachment = {
			"id" : 1,
			"fullPath" : "BPM",
			"droppedZipZone" : false,
			"name" : fileName,
			"newAttach" : true,
			"description" : fileName,
			"documentId" : 0,
			"attachments" : [ {
				"attach" : false,
				"principal" : true,
				"fileName" : fileName
			} ],
			"hasOwnSubMenu" : true,
			"enablePublish" : false,
			"enableEdit" : false,
			"enableEditContent" : false,
			"iconClass" : "fluigicon-file-upload",
			"iconUrl" : false,
			"colleagueId" : parent.WCMAPI.getUserCode()
	};
	parent.WKFViewAttachment.renderItem(dataAttachment);
}

function progress(e) {
	if (e.lengthComputable) {
		var max = e.total;
		var current = e.loaded;
		var total = (current * 100) / max;
		$(".progresso-upload").css("width", total+"%");
		if (total >= 100) {
			$(".texto-upload").html("Arquivo enviado!");
		}
	}
}

function getUnidade() {
	var loading = FLUIGC.loading(window, {
		textMessage : "Buscando unidade..."
	});
	loading.show();
	var user = $("#loginSolicitante").val();
	
	$.ajax({
		type : 'POST',
		contentType : "application/json",
		dataType : 'json',
		url : '/api/public/ecm/dataset/datasets',
		data : JSON.stringify({
			name : "colleague",
			"constraints" : [ {
				"_field" : "login",
				"_initialValue" : user,
				"_finalValue" : user,
				"_type" : 0,
				"_likeSearch" : false
			} ]
		}),
		success : function(data, status, xhr) {
			if (data != null
					&& data.content.values.length > 0
					&& data.content.values[0].mail
							.indexOf("Erro na busca do Usuario") == -1) {
				
				loading.hide();
				getSearchUnidade(data.content.values[0].mail);
			} else {
				FLUIGC.toast({
					message : 'Solicitante n\u00E3o encontrada no Fluig. Procure o UTIC',
					type : 'danger'
				});
				loading.hide();
			}
		},
		error : function(xhr, status, error) {
			FLUIGC.toast({
				message : 'Erro ao consultar a Solicitante no Fluig',
				type : 'danger'
			});
			loading.hide();
		}
	});
}

function getSearchUnidade(mail){
		$.ajax({
		type : 'POST',
		contentType : "application/json",
		dataType : 'json',
		url : '/api/public/ecm/dataset/datasets',
		data : JSON.stringify({
			name : "ds_Unidade_Solicitante_II",
			"constraints" : [ {
				"_field" : "MAIL",
				"_initialValue" : mail,
				"_finalValue" : mail,
				"_type" : 0,
				"_likeSearch" : false
			} ]
		}),
		success : function(data, status, xhr) {
			if (data != null
					&& data.content.values.length > 0
					&& data.content.values[0].CODUSUARIO
							.indexOf("Erro na comunicacao com o RM") == -1) {
				$("#txtUnidadeSolicitante").val(
						data.content.values[0].DESCRICAO);
				$("#secaoUsuario").val(data.content.values[0].CODSECAO);
				//loading.hide();
				getManager();
			} else {
				FLUIGC.toast({
					message : 'Unidade do solicitante n\u00E3o encontrada no RM. Procure o gestor orçamentário',
					type : 'danger'
				});
				loading.hide();
			}
		},
		error : function(xhr, status, error) {
			FLUIGC.toast({
				message : 'Erro ao consultar a Unidade no RM',
				type : 'danger'
			});
			loading.hide();
		}
	});
}

function getManager() {
	var loading = FLUIGC.loading(window, {
		textMessage : "Buscando gestor(a) da unidade..."
	});
	loading.show();
	var areaI = $("#secaoUsuario").val();
	var area = areaI.substr(0,((areaI).length - 3))+"%";
	$.ajax({
				type : 'POST',
				contentType : "application/json",
				dataType : 'json',
				url : '/api/public/ecm/dataset/datasets',
				data : JSON.stringify({
					name : "dt_gerUnidade",
					"constraints" : [ {
						"_field" : "UNIDADE",
						"_initialValue" : area,
						"_finalValue" : area,
						"_type" : 0,
						"_likeSearch" : false
					} ]
				}),
				success : function(data, status, xhr) {
					if (data != null
							&& data.content.values.length > 0
							&& data.content.values[0].CODUSUARIO
									.indexOf("Erro na comunicacao com o RM") == -1) {
						var mail = (data.content.values[0].EMAIL);				
						var constraintLogin = DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST);
						var dataset = DatasetFactory.getDataset("colleague", ["mail","colleaguePK.colleagueId"], [constraintLogin], null);
						console.log(dataset);
						try{
							$("#gerenteSolicitante").val(dataset.values[0]["colleaguePK.colleagueId"]);
						}catch(e){
							FLUIGC.toast({
								message : "Não foi possível localizar o gestor pelo email ("+mail+"). Verifique o cadastro no FLUIG!",
								type : 'danger'
							});
							loading.hide();
						}
						loading.hide();
					} else {
						FLUIGC.toast({
							message : 'Gestor(a) n\u00E3o encontrado(a)',
							type : 'danger'
						});
						loading.hide();
					}
				},
				error : function(xhr, status, error) {
					FLUIGC.toast({
						message : 'Erro ao consultar gestor(a) da unidade',
						type : 'danger'
					});
					loading.hide();
				}
			});
}

function apenasNumeros(string) 
{
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}
function calcMetas(element){
	
	console.log("#################");
	console.log(element);
	console.log("#################");
	
	var index = element.substring(14, 10);
	var txtMetasAj = 0;
	var txtMetasDe = 0;
	
	
	if ($("#txtMetasAj" + index).val() != ""){
		txtMetasAj = $("#txtMetasAj" + index).val();
		console.log('txtMetasAj : ',txtMetasAj);
		txtMetasAj = parseFloat(txtMetasAj.replace(".","").replace(".","").replace(",", "."));
	}
	if ($("#txtMetasDe" + index).val() != ""){
		txtMetasDe = $("#txtMetasDe" + index).val();
		console.log('txtMetasDe : ',txtMetasDe);
		txtMetasDe = parseFloat(txtMetasDe.replace(".","").replace(".","").replace(",", "."));
	}
	var sum = txtMetasDe + txtMetasAj;
	//sum = sum.toFixed(2).toString().replace(",", ".").replace(".", ",");
	$("#txtMetasNovo"+ index).val(sum);

}

function getSituacao() {
	var loading = FLUIGC.loading(window, {
		textMessage : "Buscando siatuacao usuário..."
	});
	loading.show();
	var user = $("#loginSolicitante").val();
	console.log("Verificando usuário...." + user);
	$.ajax({
		type : 'POST',
		contentType : "application/json",
		dataType : 'json',
		url : '/api/public/ecm/dataset/datasets',
		data : JSON.stringify({
			name : "colleague",
			"constraints" : [ {
				"_field" : "login",
				"_initialValue" : user,
				"_finalValue" : user,
				"_type" : 0,
				"_likeSearch" : false
			} ]
		}),
		success : function(data, status, xhr) {
			if (data != null
					&& data.content.values.length > 0
					&& data.content.values[0].mail
							.indexOf("Erro na busca do Usuario") == -1) {
				
				loading.hide();
				getSituacaoUsuario(data.content.values[0].mail);
			} else {
				FLUIGC.toast({
					message : 'Solicitante n\u00E3o encontrada no Fluig. Procure o UTIC',
					type : 'danger'
				});
				loading.hide();
			}
		},
		error : function(xhr, status, error) {
			FLUIGC.toast({
				message : 'Erro ao consultar a Solicitante no Fluig',
				type : 'danger'
			});
			loading.hide();
		}
	});
}


function getSituacaoUsuario(mail){
	$.ajax({
	type : 'POST',
	contentType : "application/json",
	dataType : 'json',
	url : '/api/public/ecm/dataset/datasets',
	data : JSON.stringify({
		name : "ds_situacao_usuario",
		"constraints" : [ {
			"_field" : "MAIL",
			"_initialValue" : mail,
			"_finalValue" : mail,
			"_type" : 0,
			"_likeSearch" : false
		} ]
	}),
	success : function(data, status, xhr) {
		if (data != null
				&& data.content.values.length > 0
				&& data.content.values[0].CODSITUACAO
						.indexOf("Erro na comunicacao com o RM") == -1) {
			
			console.log("Situacao Codigo..:" + data.content.values[0].CODSITUACAO);
			console.log("Situacao..:" + data.content.values[0].SITUACAO)
			if ((data.content.values[0].CODSITUACAO == "A")||(data.content.values[0].CODSITUACAO == "F")){				
				getUnidade();
			}else{				
				$("#painelDados").hide();
				$("#painelOrcamento").hide();
				$("#painelMetas").hide();
				
				FLUIGC.toast({
					message : 'Não será possível criar a solicitação o usuário possui o seguinte status:\n\n' + data.content.values[0].SITUACAO,
					type : 'danger'
				});
			}									
									
		} else {
			FLUIGC.toast({
				message : 'Não será possível criar a solicitação, o usuário não possui situação no RM:',
				type : 'danger'
			});
			$("#painelDados").hide();
			$("#painelOrcamento").hide();
			$("#painelMetas").hide();
			loading.hide();
		}
	},
	error : function(xhr, status, error) {
		FLUIGC.toast({
			message : 'Erro ao consultar a Situacao no RM',
			type : 'danger'
		});
		loading.hide();
	}
});
}