/**
 * JS CUSTOM INSTANCE 
 */

console.log('customInstance.js Loading...');

var MyFunctions = function(){};

MyFunctions.prototype.initLoading = {
		loadCustom: function() {
			myApps.custom.loadDistance();
			myUtils.byLoading.loadDefault();
			components.modal = new Object({
				'modalProgressBar': $('div#modalProgressBar').html()
			});
			$('div#modalProgressBar').remove();
			$(window).scrollTop(0);
		}
};

MyFunctions.prototype.searchs = {
		searchRamais: function(){//NOTE: Busca Distancias na Tabela ZMD
			var cst = DatasetFactory.createConstraint('Situação', 'Ativo', 'Ativo', ConstraintType.MUST);
			var constraint = new Array(cst);			
			var ds_ramais = DatasetFactory.getDataset('ramais_intra', null, constraint, null);
			if(ds_ramais.values.length > 0){
				return ds_ramais;
			}else{
				return "";
			}
		}
};

MyFunctions.prototype.custom = {
		loadDistance: function(){
			ramais_.mydata = new Array();
			var ramais = myApps.searchs.searchRamais();
			if (ramais != null && ramais.values != null && ramais.values.length > 0){
				var records = ramais.values;
				var itens = 1;
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					ramais_.mydata.push(new Object({
						id: itens,
						nome: c.Nome,
						email: c.Email,
						datadenascimento: c.DatadeNascimento,
						telefone: c.Telefone,
						celular: c.Celular,
						ramal: c.Ramal,
						departamento: c.Departamento,
						unidade: c.Unidade,
						cargo: c.Cargo,
						papel: c.Papel
					}));
					itens++;
				}
				myUtils.byDataTable.initTable();
			}			
		},
		loadCadastro: function(){
			$('div#modalCadastro').show();
			$(window).scrollTop($(document).height());
			myUtils.appComponents.setElementSelect('uforigem', 'GO');
			myUtils.appComponents.setElementSelect('ufdestino', 'GO');
			$('select#uforigem').change(function() {
				var value = $(this).val();
				if(value != '' && value != '--' && value != null){
					var filter = 'cdEstado,'+value;
					myUtils.byFluig.zoomReloadFilter('munorigem', filter);
				}
			});
			$('select#ufdestino').change(function() {
				var value = $(this).val();
				if(value != '' && value != '--' && value != null){
					var filter = 'cdEstado,'+value;
					myUtils.byFluig.zoomReloadFilter('mundestino', filter);
				}
			});
			$('button#btnCalculate').on('click', function() {
				var uforigem = myUtils.appComponents.getElement('uforigem');
				var cidorigem = myUtils.appComponents.getElement('cidorigem');
				var ufdestino = myUtils.appComponents.getElement('ufdestino');
				var ciddestino= myUtils.appComponents.getElement('ciddestino');
				if((uforigem != null && uforigem != '') && (cidorigem != null && cidorigem != '') && (ufdestino != null && ufdestino != '') && (ciddestino != null && ciddestino != '')){
					var mydata = new Object({
						'uforigem': uforigem,
						'cidorigem': cidorigem,
						'ufdestino': ufdestino,
						'ciddestino': ciddestino
					});
					var progress = setInterval(function(){    
						$.ajax({
							success: function(){
								var distante = myApps.custom.newDistance(mydata);
							}
						}).done(function () {
							clearInterval(progress);
						});
					}, 100);
				}			
			});
			$('button#btnSave').on('click', function() {
				var mydata = new Object({
					uforigem: myUtils.appComponents.getElement('uforigem'),
					codorigem: myUtils.appComponents.getElement('codorigem'),
					cidorigem: (myUtils.appComponents.getElement('cidorigem')).toUpperCase(),
					ufdestino: myUtils.appComponents.getElement('ufdestino'),
					coddestino: myUtils.appComponents.getElement('coddestino'),
					ciddestino: (myUtils.appComponents.getElement('ciddestino')).toUpperCase(),
					distancia: myUtils.appComponents.getElement('distancia')
				});
				myUtils.byDataTable.addRow(mydata);
			});
		},
		openModalProgessBar: function(title){
			var modalProgressBar = components.modal.modalProgressBar;
			myUtils.byFluig.openModal('modalProgressBar', title+' Aguarde...', modalProgressBar, 'large', null);
		}
};

