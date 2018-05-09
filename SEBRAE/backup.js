/**
 * JS RAMAIS
 */

console.log('ramais.js Loading...');

var myInstance = SuperWidget.extend({
	message: null,
	init: function () {
		//code
	},
	bindings: {
		local: {
			'datatable-reload': ['click_reload'],
			'datatable-calculate': ['click_calculate'],	
			'datatable-integrate': ['click_integrate'],
			'datatable-edit-row': ['click_editRow'],
			'datatable-update-row': ['click_updateRow'],
			'datatable-calculate-row': ['click_calculateRow'],
			'datatable-integrate-row': ['click_integrateRow'],
			'datatable-add-row': ['click_addRow'],
			'datatable-del-row': ['click_delRow'],
			'show-message': ['click_showMessage']
		},
		global: {
			//code
		}
	},

	showMessage: function () {
		$div = $('#helloMessage_' + this.instanceId);
		$message = $('<div>').addClass('message').append(this.message);
		$div.append($message);
	},
	editRow: function(el, ev) {
		myUtils.byDataTable.editRow();
	},
	addRow: function(el, ev) {
		myApps.custom.loadCadastro();
		//myUtils.byDataTable.addRow();
	},
	delRow: function(el, ev) {
		myUtils.byDataTable.delRow();
	},
	calculateRow: function() {
		if(dataTable.myTable.selectedRows()[0] != null && dataTable.myTable.selectedRows()[0] != undefined){
			var row = dataTable.myTable.getRow(dataTable.myTable.selectedRows()[0]);
			myApps.custom.calculateDistance(row);
		}else{
			myUtils.byMessage.alertWarning('Nenhuma Linha Selecionada!', 'Selecione a Linha para prosseguir com a Edição!');
		}
	},
	integrateRow: function() {
		if(dataTable.myTable.selectedRows()[0] != null && dataTable.myTable.selectedRows()[0] != undefined){
			var row = dataTable.myTable.getRow(dataTable.myTable.selectedRows()[0]);
			if(row.distancia != '1' && parseInt(row.distancia) != 1){
				retorno = myUtils.byMountXML.m_distance(row);
			}else{
				var mensagem = "<h3 class=\"text-danger\">Erro para gravar o registro!</h3>";
				myUtils.byMessage.messageError("ERRO", mensagem, "Por favor Calcule novamente a Distância.");
				return false;
			}
		}else{
			myUtils.byMessage.alertWarning('Nenhuma Linha Selecionada!', 'Selecione a Linha para prosseguir com a Integração!');
		}
		myUtils.byDataTable.reload();
	},
	updateRow: function(el, ev) {
		FLUIGC.message.confirm({
			title: "Salvar",
			message: "Deseja realmente salvar?",
			labelYes: 'Salvar',
			labelNo: 'Cancelar'
		}, function(result, el, ev) {
			if(result){
				var distancia = myUtils.appComponents.getElement('datatable-input-distancia');
				var codigo = myUtils.appComponents.getElement('datatable-input-codigo');
				var uforigem = myUtils.appComponents.getElement('datatable-input-uforigem');
				var codorigem = myUtils.appComponents.getElement('datatable-input-codorigem');
				var cidorigem = myUtils.appComponents.getElement('datatable-input-cidorigem');
				var ufdestino = myUtils.appComponents.getElement('datatable-input-ufdestino');
				var coddestino = myUtils.appComponents.getElement('datatable-input-coddestino');
				var ciddestino = myUtils.appComponents.getElement('datatable-input-ciddestino');
				if((codigo == "" || codigo == null) || (uforigem == "" || uforigem == null) || (codorigem == "" || codorigem == null) ||  (cidorigem == "" || cidorigem == null) || 
						(ufdestino == "" || ufdestino == null) ||  (coddestino == "" || coddestino == null) || (ciddestino == "" || ciddestino == null) || (distancia == "" || distancia == null)){
					myUtils.byMessage.messageError('Erro', 'Erro ao Salvar!', 'Por favor, informe a Todos os campos corretamente!". \n Caso o erro persista por favor, contate o Administrador do Sistema.');
				}else {
					myUtils.byDataTable.updateRow();
				}
			}
		});		
	},
	calculate: function() {
		if(dataTable.mypage == 0){
			var i = 0;
			var limit = 100;
		}else{
			var i = (100 * dataTable.mypage);
			var limit = (100 * (dataTable.mypage + 1));
		}
		var num = (100 / 100);
		var progressbar = num;
		myApps.custom.openModalProgessBar('Calculando Distancias!');
		myUtils.byFluig.progressBarShow();		
		var progress_table = setInterval(function(){
			var retorno = "";
			var progress = setInterval(function(){ 
				$.ajax({
					beforeSend: function(xhr){
						myUtils.byFluig.progressBarIncrement(progressbar);
						retorno = myApps.custom.getDistance(dataTable.mydata[i], i);
					}
				}).done(function () {
					clearInterval(progress);
					if(i < limit){
						i++;
					}
					progressbar = (progressbar + num);
				});				
			}, 500);
			if(i == limit){
				clearInterval(progress_table);
				myUtils.byFluig.progressBarHide();
				components.myModal.modalProgressBar.remove();
				$('button[data-datatable-calculate]').hide();
				$('button[data-datatable-integrate]').show();
				myUtils.byDataTable.reload();
			}
		}, 1500);
	},
	integrate: function() {
		if(dataTable.mypage == 0){
			var i = 0;
			var limit = 100;
		}else{
			var i = (100 * dataTable.mypage);
			var limit = (100 * (dataTable.mypage + 1));
		}
		var num = (100 / 100);
		var progressbar = num;
		myApps.custom.openModalProgessBar('Integrando dados!');
		myUtils.byFluig.progressBarShow();
		var progress_save = setInterval(function(){
			var retorno = "";
			var progress = setInterval(function(){    
				$.ajax({
					beforeSend: function(xhr){
						myUtils.byFluig.progressBarIncrement(progressbar);
						retorno = myUtils.byMountXML.m_distance(dataTable.mydata[i]);
					}
				}).done(function () {
					clearInterval(progress);
					if(i < limit){
						i++;
					}
					progressbar = (progressbar + num);
				});
			}, 250);
			if(i == limit){
				clearInterval(progress_save);
				myUtils.byFluig.progressBarHide();
				components.myModal.modalProgressBar.remove();
				$('button[data-datatable-calculate]').show();
				$('button[data-datatable-integrate]').hide();
				myApps.custom.loadDistance();
			}
		}, 1000);
	},
	reload: function(el, ev) {
		$('[data-datatable-edit-row]').prop("disabled", false);
		myUtils.byDataTable.reload();
	}
});