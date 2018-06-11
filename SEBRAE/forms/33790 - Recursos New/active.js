$(document).ready(
	function(){
		ativa();
		ativaRec();
	}
);

function ativaRec(){
	if ($("input[id='rcObservacao']:checked").length == 1){
		$('#rcObservacaoObs').removeAttr('readonly');
	}else{
		$('#rcObservacaoObs').attr('readonly',true);
	}
	if ($("input[id='rcParticipante']:checked").length == 1){
		$('#rcParticipanteObs').removeAttr('readonly');
	}else{
		$('#rcParticipanteObs').attr('readonly',true);
	}
	if ($("input[id='rcFinalidade']:checked").length == 1){
		$('#rcFinalidadeObs').removeAttr('readonly');
	}else{
		$('#rcFinalidadeObs').attr('readonly',true);
	}
	
	
	
	
}

function validaAprovacao(obsObriga){
	
	if ($("#slAprova").val() == "Reprovado" || $("#slAprova").val() == "Refazer"){
		$('#dsObsAprovaTop').attr('style','display:block');
	}else{
		$('#dsObsAprovaTop').attr('style','display:none');
	}
	
	if ($("#slAprova").val() == "Reprovado" && $("#dsObsAprova").val() == "" && obsObriga == 'S'){
		alert('É necessário informar o motivo da reprovação!')
	}
	
	if ($("#slAprova").val() == "Refazer" && $("#dsObsAprova").val() == "" && obsObriga == 'S'){
		alert('É necessário informar o motivo de refazer solicitação!')
	}
	
}

///*Desabilita os campos*/
//function disableInputs(){
//	 console.log(getWKNumState());
//	
//	if (getWKNumState() == 5){
//	
//		$('#fdInformacao').removeAttr("style");
//		
//	}
//}
//$(document).ready(
//	function(){
//		disableInputs();
//	}
//);
///*Desabilita os campos*/
//function disableInputs(){
//	 console.log(getWKNumState());
//	
//	if (getWKNumState() != 4 && getWKNumState() != 0){
//	
//		$('span[class="fluig-style-guide fs-display-block fs-md-space"]').addClass("fs-display-none");
//		$('span[data-role="remove"]').attr("style","display:none");
//		
//		
//		$('input[name*="dsDiretor"],'+			
//		  'input[name*="dtInicio"],'+
//		  'input[name*="hrInicio"],'+
//		  'input[name*="dtFim"],'+
//		  'input[name*="hrFim"],'+
//		  'input[name*="smHora"],'+
//		  'input[name*="dsColaborador"]'
//		  ).each(function () { 
//			this.readOnly = true;		 
//		});
//		
//		if (getWKNumState() == 4 || getWKNumState() == 7 || getWKNumState() == 9){
//			
//			
//			$('textarea[name*="dsJustificativaHE"],'+
//			  'textarea[name*="dsObservacao"],'+
//			  'select[name*="dsAprovado___"]'
//			  ).each(function () { 
//				this.readOnly = true;		 
//			});
//			$('select option:not(:selected)').prop('disabled', true);
//		}
//		var buttons = document.getElementsByClassName('btn btn-primary');
//		for (var i = 0; i < buttons.length; i++){
//			buttons[i].style.display = "none";
//		}
////	
////		var buttonsPaiXFilho2 = document.getElementsByClassName('input-group-addon');
////		for (var i = 0; i < buttonsPaiXFilho2.length; i++){
////			buttonsPaiXFilho2[i].style.display = "none";
////		}
//	
//		var buttons = document.forms[0].getElementsByTagName("input");		
//	
//		for(var i=0;i<buttons.length;i++){			
//			if(buttons[i].type == "button")
//				buttons[i].style.display = "none";			
//		}
//		
////		disablePaiXFilho();
//	}
//}
//
///*Desabilita os campos de um pai X filho*/
//function disablePaiXFilho(){
//	$('input[name*="country___"],'+
//	  'input[name*="city___"]'+
//	  'input[name*="dsNome___"],'+
//	  'input[name*="dsEmailContato___"],'+
//	  'input[name*="dsFoneContato___"],'+
//	  'input[name*="dsCeluContato___"],'+
//	  'input[name*="dsCPFContato___"]'
//	  ).each(function () { 
//		this.readOnly = true;		 
//	});
//	
//	$('input[name*="country___"],'+
//	  'input[name*="city___"]'
//	  ).each(function () { 
//		this.onclick = false;		 
//	});
//}
//
//
function ativa(){
		
		
		if (getWKNumState() != 4 && getWKNumState() != 0 ){
			$( "div[id^='rec0']" ).css('display','block');
			$( "div[id^='rec71']" ).css('display','none');
			$( "div[id^='rec8']" ).css('display','block');
			$( "fieldset[id^='fdAprovacao']" ).css('display','block');
			
		}
		
		if (getWKNumState() == 4 || getWKNumState() == 13 ){
			$( "div[id^='rec0']" ).css('display','block');
			$( "fieldset[id^='fdAprovacao']" ).css('display','block');
			$( "#dsObsAprovaTop" ).css('display','block');
			
		}
		
		switch (getWKNumState()) {
		    case "evAgendar":
		    	activedFieldset('fdParticipantes');
		        break;
		    case "evNecessitaRecurso":
		    	activedFieldset('fdControle');
		        break;
		    case "evRecursoPessoal":
		    	activedFieldset('1');
		        break;
		    case "evRecursoMaterialServico":
		    	activedFieldset('1');
		        break;
		    case "evRecursoPatrimonial":
		    	activedFieldset('1');
		        break;
		    case "evRecursoComunicacao":
		    	activedFieldset('1');
		        break;
		    case "evRecursoDeslocamento":
		    	activedFieldset('1');
		        break;
		    //default:
		    	//if()
		    	//$( "div[id^='rec0___']" ).css('display','none');
		    
		}
	
}

function activedFieldset(value){
	if(value == 1){
		console.log("Evento em Desenvolvimento")
	} else {
	document.getElementById(value).style.display = 'block';
	}
}

function disabledFieldset(value){
	if(value == 1){
		console.log("Evento em Desenvolvimento")
	} else {
	document.getElementById(value).style.display = 'none';
	}
}

function calculeReserva(validaTotal){
	console.log('Calculando a Reserva');
	
	var dsRecurso = $("#dsRecurso").val();
	var dtInicio = $("#dtInicio").val();
	var hrInicio = $("#hrInicio").val();
	var dtFim = $("#dtFim").val();
	var hrFim = $("#hrFim").val();
	var tabelaCorpo = $("#tabela tbody");
	var totalSolicitacao = $("#dsQuantidadeSolicitacao").val();
	
	var m1 = dtInicio+' '+hrInicio;
	var m2 = dtFim+' '+hrFim;
	
	$("#periodoFim").val(m2);
	$("#periodoInicio").val(m1);
	
	
	if(dsRecurso != "" && dtInicio != "" && dtFim != "" && hrInicio == "" && hrFim == ""  ) {
		
		console.log('ainda nao possui horas!');
		
		var cstRec1 = DatasetFactory.createConstraint('dsRecurso', dsRecurso[0], dsRecurso[0], ConstraintType.MUST);
		var cstRec2 = DatasetFactory.createConstraint('dtFim', dtInicio, dtFim, ConstraintType.MUST);
		var cstRec3 = DatasetFactory.createConstraint('dtInicio', dtInicio, dtFim, ConstraintType.MUST);
		var cstRec3 = DatasetFactory.createConstraint('metadata#active', 1, 1, ConstraintType.MUST);
		var cstRec = new Array(cstRec1, cstRec2, cstRec3);
		var datasetRec = DatasetFactory.getDataset('recursos_sebraego', null, cstRec, new Array('dtInicio', 'hrInicio'));
		
		$('#dsQuantidadeDisponivel').val(parseFloat($('#dsQuantidadeReal').val()));
		
		if(datasetRec.values.length > 0){
			$('#existeReserva').attr("style","display:block");
			$('#naoReserva').attr("style","display:none");
			$('#informeReserva').attr("style","display:none");
//			$('#dsQuantidadeSolicitacao').removeAttr("readonly");
			$("#tabela tbody tr").remove();
			
			var quantReal = parseFloat($('#dsQuantidadeReal').val());
			var totalDisponivel = quantReal - parseFloat(datasetRec.values.length);
			
			$('#dsQuantidadeDisponivel').val(totalDisponivel);
			
			console.log('valor sem hora: '+totalDisponivel);
			
			for(var i = 0; i < datasetRec.values.length; i++){
				
				var meta = datasetRec.values[i]["metadata#id"];
				var cstWP1 = DatasetFactory.createConstraint('cardDocumentId', meta , meta, ConstraintType.MUST);
				var colWP = new Array('workflowProcessPK.processInstanceId', 'cardDocumentId');
				var datasetWP = DatasetFactory.getDataset('workflowProcess', colWP, new Array(cstWP1), null);

				
				html = "<tr>";
				html += "<td>"+datasetWP.values[0]["workflowProcessPK.processInstanceId"]+"</td>";
				html += "<td>"+datasetRec.values[i].dsSolicitante+"</td>";
				html += "<td>"+datasetRec.values[i].dsSolicitanteCarregado+"</td>";
				html += "<td>"+moment(datasetRec.values[i].dtInicio, "YYYY-MM-DD").format("DD/MM/YYYY")+"</td>";
				html += "<td>"+datasetRec.values[i].hrInicio+"</td>";
				html += "<td>"+moment(datasetRec.values[i].dtFim, "YYYY-MM-DD").format("DD/MM/YYYY")+"</td>";
				html += "<td>"+datasetRec.values[i].hrFim+"</td>";
				html += "</tr>";
				
				tabelaCorpo.append(html);
				
			}
			
		}else {
			$('#existeReserva').attr("style","display:none");
			$('#naoReserva').attr("style","display:block");
			$('#informeReserva').attr("style","display:none");
		}
		
	}
	
	if(dsRecurso != "" && dtInicio != "" && dtFim != "" && hrInicio != "" && hrFim != "" ) {
		
		mI = moment(m1,'YYYY-MM-DD HH:mm');
		mII = moment(m2,'YYYY-MM-DD HH:mm');
		var diff = moment.preciseDiff(mI, mII, true);
		if(diff.firstDateWasLater == false){
		
				var cstRec1 = DatasetFactory.createConstraint('dsRecurso', dsRecurso[0], dsRecurso[0], ConstraintType.MUST);
				var cstRec2 = DatasetFactory.createConstraint('dtFim', dtInicio, dtFim, ConstraintType.MUST);
				var cstRec3 = DatasetFactory.createConstraint('dtInicio', dtInicio, dtFim, ConstraintType.MUST);
				var cstRec4 = DatasetFactory.createConstraint('hrFim', hrInicio, hrFim, ConstraintType.MUST);
				var cstRec5 = DatasetFactory.createConstraint('hrInicio', hrInicio, hrFim, ConstraintType.MUST);
				var cstRec = new Array(cstRec1, cstRec2, cstRec3, cstRec4, cstRec5);
				var datasetRec = DatasetFactory.getDataset('recursos_sebraego', null, cstRec, new Array('dtInicio', 'hrInicio'));
				
				console.log('entrou no com data');
				console.log('dataset '+datasetRec.values.length);
				
				$('#dsQuantidadeSolicitacao').removeAttr("readonly");
				$('#dsQuantidadeDisponivel').val(parseFloat($('#dsQuantidadeReal').val()));
				
				if(datasetRec.values.length > 0){
					$('#existeReserva').attr("style","display:block");
					$('#naoReserva').attr("style","display:none");
					$('#informeReserva').attr("style","display:none");
					$("#tabela tbody tr").remove();
					
					var quantReal = parseFloat($('#dsQuantidadeReal').val());
					var totalDisponivel = quantReal - parseFloat(datasetRec.values.length);
					
					$('#dsQuantidadeDisponivel').val(totalDisponivel);
					
					console.log('valor sem hora: '+totalDisponivel);
					
					for(var i = 0; i < datasetRec.values.length; i++){
						
						var meta = datasetRec.values[i]["metadata#id"];
						var cstWP1 = DatasetFactory.createConstraint('cardDocumentId', meta , meta, ConstraintType.MUST);
						var colWP = new Array('workflowProcessPK.processInstanceId', 'cardDocumentId');
						var datasetWP = DatasetFactory.getDataset('workflowProcess', colWP, new Array(cstWP1), null);
		
						
						html = "<tr>";
						html += "<td>"+datasetWP.values[0]["workflowProcessPK.processInstanceId"]+"</td>";
						html += "<td>"+datasetRec.values[i].dsSolicitante+"</td>";
						html += "<td>"+datasetRec.values[i].dsSolicitanteCarregado+"</td>";
						html += "<td>"+moment(datasetRec.values[i].dtInicio, "YYYY-MM-DD").format("DD/MM/YYYY")+"</td>";
						html += "<td>"+datasetRec.values[i].hrInicio+"</td>";
						html += "<td>"+moment(datasetRec.values[i].dtFim, "YYYY-MM-DD").format("DD/MM/YYYY")+"</td>";
						html += "<td>"+datasetRec.values[i].hrFim+"</td>";
						html += "</tr>";
						
						tabelaCorpo.append(html);
						
					}
					
				}else {
					$('#existeReserva').attr("style","display:none");
					$('#naoReserva').attr("style","display:block");
					$('#informeReserva').attr("style","display:none");
				}
			}else{
				alert("Valide a data/hora informada, pois a data/hora de inicio é maior ou igual que a data/hora de fim")
				$("#hrFim").val('');
				$("#dtFim").val('');
			}
		}	
	if(validaTotal == '1' && ($('#dsQuantidadeSolicitacao').val() > $('#dsQuantidadeDisponivel').val() || $('#dsQuantidadeSolicitacao').val() <= 0 )){
		  alert('Não é possível solicitar essa quantidade de Recursos! Reavalie a solicitação')
		  $('#dsQuantidadeSolicitacao').val(" ");
	}
	
}