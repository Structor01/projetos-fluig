/**
 * JS CUSTOM INSTANCE 
 */

console.log('customSum.js Loading...');

var MyUtils = function(){};

MyUtils.prototype.customDate = {
		adaptDate_ofRm: function(dateRM){//NOTE: Função para formatar a data do RM e popular o campo
			var dateAdapt = '';
			if(dateRM != '' && dateRM != null){
				var date = dateRM.slice(0, 10);
				dateAdapt = date.split('-').reverse().join('/');
			}
			return dateAdapt;
		},
		adaptDate_toRm: function(dateForm){//NOTE: Função para formatar a data do campo para inserir no RM
			var dateAdapt = '';
			if(dateForm != '' && dateForm != null){
				var date = dateForm.slice(0, 10);
				var dtAdapt = date.split('/').reverse().join('-');
				var dtCurrent = new Date();
				var hours = ((dtCurrent.getHours() < 10) ? "0" : "")+ dtCurrent.getHours();
				var minutes = ((dtCurrent.getMinutes() < 10) ? "0" : "")+ dtCurrent.getMinutes();
				var seconds = ((dtCurrent.getSeconds() < 10) ? "0" : "")+ dtCurrent.getSeconds();
				var timeAtual = (hours+':'+minutes+':'+seconds);
				dateAdapt = dtAdapt+'T'+timeAtual;
			}
			return dateAdapt;
		},
		dateFormat: function(dateFormat, format){//NOTE: Função para formatar a data
			var formatAdapt = '';
			if(dateFormat != '' && dateFormat != null){
				var date = dateFormat;
				var day = ((date.getDate() < 10) ? "0" : "")+ date.getDate();
				var month = ((date.getMonth() < 9) ? "0" : "")+ (date.getMonth()+1);
				var year = (date.getFullYear()).toString();
				if(format != '' && format != null && format == 'PTBR'){
					formatAdapt = (day+'/'+month+'/'+year);
				}else if(format == 'ENG'){					
					formatAdapt = (year+'-'+month+'-'+day);
				}else{
					formatAdapt = (year+'-'+month+'-'+day);
				}
			}
			return formatAdapt;
		},
		currentDate: function(){//NOTE: Retorna Data Atual Dia - Mês - Ano
			var date = new Date();
			var day = ((date.getDate() < 10) ? "0" : "")+ date.getDate();
			var month = ((date.getMonth() < 9) ? "0" : "")+ (date.getMonth()+1);
			var year = (date.getFullYear()).toString();
			var dayWeek = (date.getDay()+1).toString();
			var result = new Object({'day': day, 'month': month, 'year': year, 'dayWeek': dayWeek});
			return result;
		},
		currentTime: function(){//NOTE: Retorna Hora Atual Hora - Minuto - Segundo - Milissegundo
			var date = new Date();
			var hours = ((date.getHours() < 10) ? "0" : "")+ date.getHours();
			var minutes = ((date.getMinutes() < 10) ? "0" : "")+ date.getMinutes();
			var seconds = ((date.getSeconds() < 10) ? "0" : "")+ date.getSeconds();
			var milliseconds = ((date.getMilliseconds() < 10) ? "0" : "")+ date.getMilliseconds();		
			var result = new Object({'hours': hours, 'minutes': minutes, 'seconds': seconds, 'milliseconds': milliseconds});
			return result;
		},
		currentQuarter: function(date) {//NOTE: Retorna Trimestre
			var parts = date.match(/(\d+)/g);
			var month = parts[1];
			var quarter = (Math.floor((month-1)/3)+1);
			return quarter;
		},
		lastDayMonth: function(month, year){//NOTE: Retorna Último dia do mês
			var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (month != 2){
				return m[month - 1];
			}
			if (year % 4 != 0){
				return m[1];
			}
			if (year % 100 == 0 && year%400 != 0){
				return m[1];
			}
			return m[1] + 1;
		},
		differenceDay: function(date){//NOTE: Retorna quantidade de dias entre a data e o dia atual
			var initialDate = new Date(date.split('/').reverse().join('/'));
			var endDate = new Date();
			var timeDiff = Math.abs(endDate.getTime() - initialDate.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			return diffDays;
		}
};

MyUtils.prototype.appComponents = {
		createTagXML: function (field, value){//NOTE: Função para Criar Elementos/Tag do XML
			var result =  "";
			if(field == 'CEP'){
				var value = value.replace(/[^\d]+/g, '');
			}
			if ((value != null) && (value != "")){
				var element = "<"+field+">"+value+"</"+ field + "> ";
				result = element;
			}else{
				result = "";
			}
			return result;
		},
		capitalizeField: function(element, value){//NOTE: Colocar todos letras iniciais maiusculas, e pronone entre de junção minusculos
			var string = (element != null)? myUtils.appComponents.getElement(element): value;			
			var valor = string.toLowerCase();
			if(valor.length > 1){
				var capitalize = '';
				for(var i = 0; i < valor.length; i++){
					capitalize = (valor[i - 1] == ' ' || i == 0)? capitalize + valor[i].toUpperCase(): capitalize + valor[i];
				}
				capitalize = capitalize.replace(/( (Da|Das|E|De|Do|Dos|Para|Na|Nas|No|Nos) )/gi,function(m){
					return m.toLowerCase();
				});
				return capitalize;
			}else{
				return "";
			}
		},
		removeAccent: function (element, value) {//NOTE: Função para remover acentos de Strings
			var string = (element != null)? myUtils.appComponents.getElement(element): value;
			var vString = string.toLowerCase();
			vString = vString.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
			vString = vString.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
			vString = vString.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
			vString = vString.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
			vString = vString.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
			vString = vString.replace(new RegExp('[Ç]','gi'), 'c');
			return vString.toUpperCase();
		},
		addNumberRow: function (tableName){//NOTE: Adiciona Numeros nas linhas no PaixFilho 
			var i = 0;
			$('table#'+tableName+' >tbody >tr >td').find('label[name^="contador"]').each(function(){
				$(dataTable).html(i);
				i++;
			});
		},
		numberRowTable: function (tableId){//NOTE: Retorna numero linha de uma tabela do PaixFilho
			var rowTable = $("table#"+tableId).find("tbody").find("tr").length - 1;
			return rowTable;
		},
		calculateAge: function(field_dtNasc, field_idade){//NOTE: Calcula a idade conforme a Data de Nascimento
			var dataNascimento = document.getElementById(field_dtNasc).value;
			if(dataNascimento != '' && dataNascimento != null){
				var idade = document.getElementById(field_idade);
				var d = new Date;
				var anoAtual = d.getFullYear();
				var mesAtual = d.getMonth() + 1;
				var diaAtual = d.getDate();
				var diaAniversario = dataNascimento.substring(0, 2);
				var mesAniversario = dataNascimento.substring(3, 5);
				var anoAniversario = dataNascimento.substring(6, 10);
				idade.value = anoAtual - anoAniversario;
				if (mesAtual < mesAniversario || (mesAtual == mesAniversario && diaAtual < diaAniversario)) {
					idade.value--;
				}
				if(idade.value < 0){
					idade.value = 0;
				}
			}else{
				return '';
			}
		},
		selectedReadonly: function (){//NOTE: Função para adicionar Readonly Select
			$('select[readonly=readonly]').closest('div.form-field').css({'cursor': 'not-allowed'})
			$('select[readonly=readonly]').css({'pointer-events': 'none', 'touch-action': 'none'});
		},
		loadingOption: function(element) {
			myUtils.appComponents.removeOption(element, 'option');
			var option = myUtils.appComponents.appendOption("carregando", "Carregando...");
			$('select#'+element).append(option);
			myUtils.appComponents.setElement(element, "carregando");
		},
		appendOption: function(key, value){//NOTE: Função para adicionar Elementos/Tag do hmtl Select
			var result = "";
			if ((value != null) && (value != "")){
				var element = '<option value="'+key+'">'+value+'</option>';
				result = element;
			}else{
				result = "";
			}
			return result;
		},
		removeOption: function(element, value){//NOTE: Remover options do Select
			if ((element != null) && (element != "")){
				$('select#'+element).find('option').remove();
				if(value == 'optionFull'){
					$('select#'+element).append('<option value="--">Selecione...</option>');
					$('select#'+element).append('<option value="todos">TODOS</option>');
				}else{
					$('select#'+element).append('<option value="">Selecione...</option>');
				}
			}
		},
		appendButton: function(_class, value, atribut) {//NOTE: Cria button para append
			var result = "";
			if ((value != null) && (value != "")){
				var element = '<button class="'+_class+'" '+atribut+'>'+value+'</button>';
				result =  element;
			}else{
				result = "";
			}
			return result;
		},
		existElement: function(element) {//NOTE: Função para verificar se existe elemento
			var result = false;
			if($("#"+element).length){
				result = true;
			}
			if(document.getElementById(element) != null){
				result = true;
			}
			return result;			
		},
		getByIdPaiFilho: function(element, field, value){//NOTE: Função retorna id da linha no paixfilho
			var row;
			$('[id^='+element+'___]').each(function() {
				var id = $(this).attr('id').replace(element, '');
				if(document.getElementById(field+id).value == value){
					row = id;
				}
			});
			return row;
		},
		getElementHmtl: function(tag, element, value) {
			var result = document.querySelectorAll(tag+'#'+element)[0].innerHTML = value;
			if(result == '' || result == null){
				$(tag+'#'+element).html();
			}else{
				result = result;
			}
			return result;
		},
		getTextSelect: function (element){//NOTE: Buscar valor em Elemento
			var result = document.getElementById(element).options[document.getElementById(element).selectedIndex].text;
			if(result == '' || result == null){
				result = $('#'+element).find('option:selected').text();
			}else{
				result = result;
			}
			return result;
		},
		getElement: function(element){//NOTE: Buscar valor em Elemento
			var result = document.getElementById(element).value;
			if(result == '' || result == null){
				result = $('#'+element).val();
			}else{
				result = result;
			}
			return result;
		},
		getElements: function(element, atribut, active){//NOTE: Buscar valor em Elemento e Seta atributos
			var result = document.getElementById(element).value;
			if(result == '' || result == null){
				result = $('#'+element).val();
				$('#'+element).attr(atribut, active);
			}else{
				result = result;
				document.getElementById(element).setAttribute(atribut, active);
			}
			return result;
		},
		setElementHmtl: function(tag, element, value) {
			document.querySelectorAll(tag+'#'+element)[0].innerHTML = value;
			$(tag+'#'+element).html(value);
		},
		setElementSelect: function (element, value){//NOTE: Seta valor em Elemento
			document.getElementById(element).options[document.getElementById(element).value=value];
			$('#'+element+' option[value="'+value+'"]').prop('selected', true);
		},
		setElementSelects: function (element, value , atribut, active){//NOTE: Seta valor em Elemento
			document.getElementById(element).options[document.getElementById(element).value=value];
			document.getElementById(element).setAttribute(atribut, active);
			$('#'+element+' option[value="'+value+'"]').prop('selected', true);
			$('#'+element).attr(atribut, active);
			if(atribut == "readonly"){				
				myUtils.appComponents.selectedReadonly();
			}

		},
		setElement: function(element, value){//NOTE: Seta valor em Elemento
			document.getElementById(element).value = value;
			$('#'+element).val(value);
		},
		setElements: function(element, value, atribut, active){//NOTE: Seta valor em Elemento e Seta atributos
			document.getElementById(element).value = value;
			document.getElementById(element).setAttribute(atribut, active);
			$('#'+element).attr(atribut, active);
			$('#'+element).val(value);
		},
		addRowTable: function(element){
			if(components.myid[element] == undefined){
				components.myid[element] = {count: 1};
			}else{
				var cont = components.myid[element].count;
				components.myid[element].count = parseInt((cont + 1));
			}
			$('table#'+element).find('tbody').find('tr.tableHeadRow:first').clone().insertAfter($('table#'+element).find('tbody').find('tr.tableHeadRow:last'));
			$('table#'+element).find('tbody').find('tr.tableHeadRow:last').find('input, select, span').each(function(){
				var id = $(this).attr('id')+'___'+components.myid[element].count;
				if($(this).attr('type') == 'radio'){
					$(this).attr({'id': id});
				}else{
					$(this).attr({'id': id, 'name': id});
				}
			});
			$.each($('span[data-removechild]'), function(){
				$(this).on('click', function(){
					var element = $(this).closest('table[tablename]').attr('id');
					if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
						$(this).closest('tr.tableHeadRow').remove();
					}
				});
			});
			$('table#'+element).find('tbody').find('tr.tableHeadRow:last').show();
			return components.myid[element].count;
		},
		removeRowTable: function(element){
			$('table#'+element).find('tbody').find('tr.tableHeadRow').find('td').find('span[data-removechild]').on('click', function(){
				if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
					$(this).closest('tr.tableHeadRow').remove();
					var cont = components.myid[element].count;
					components.myid[element].count = parseInt((cont - 1));
				}
			});
			return components.myid[element].count;
		},
		removeRowsTable: function(element){
			var tableElement = $('table#'+element).find('tbody').find('tr.tableHeadRow:first');
			$('table#'+element).find('tbody').find('tr.tableHeadRow').remove();
			$('table#'+element).find('tbody').append(tableElement);
			delete components.myid[element];
		},
		orderByArray: function(key, array){//NOTE: Função para ordenar array
			array.sort(function(a,b){
				if (a[key] < b[key]){
					return -1;
				}
				if (a[key] > b[key]){
					return 1;
				}
				return 0;
			});
			return array;
		},
		twoDecimal: function(f_num) {
			var i_num = parseFloat(f_num);
			i_num = parseInt(i_num * 100) / 100;
			return i_num;
		}
};

MyUtils.prototype.validMaskField = {//NOTE: Validação para campos & Mascaras para campos
		inscricaoEstadual: function (campo) {//NOTE: public method valid for Inscricao Estadual
			var ie = campo.value;
			var strIE = ie.replace(/[^\d]+/g, '');
			var soma = 0;
			var resto;
			var dgv;
			if (strIE != "" && strIE != null){
				if ((strIE.length != 9) || (this.valordataTabletido(strIE.length, strIE))){
					myUtils.byMessage.messageAlert("Atenção","A Inscrição Estadual digitada é inválida!");
					campo.value = '';
					return false;
				}
				for (i = 1; i <= 8; i++){
					soma = soma + parseInt(strIE.substring(i - 1, i)) * (10 - i);
				}
				resto = (soma % 11);
				if(resto == 0) {
					dgv = 0;
				}
				if(resto == 1){
					dgv = ((parseInt(strIE.substring(0,(str.length - 1))) >= parseInt(10103105)) && (parseInt(strIE.substring(0,(str.length - 1))) <= parseInt(10119997))) ? 1 : 0;
				}
				if(resto != 1 && resto != 0){
					dgv = (11 - resto);
				}
				if(dgv != parseInt(strIE.substring(8, 9))){
					myUtils.byMessage.messageAlert("Atenção","A Inscrição Estadual digitada é inválida!");
					campo.value = '';
					return false;
				}
				return true;
			}
		},
		cpf: function (campo) {//NOTE: public method valid for CPF
			var cpf = campo.value;
			var strCPF = cpf.replace(/[^\d]+/g, '');
			var soma = 0;
			var resto;
			if (strCPF != "" && strCPF != null){
				if ((strCPF.length != 11) || (this.valorRepetido(strCPF.length, strCPF))){
					myUtils.byMessage.messageAlert("Atenção","O CPF digitado é inválido!");
					campo.value = '';
					return false;
				}
				for (i = 1; i <= 9; i++){
					soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
				}
				resto = (soma * 10) % 11;
				if ((resto == 10) || (resto == 11)){
					resto = 0;
				}
				if (resto != parseInt(strCPF.substring(9, 10))) {
					myUtils.byMessage.messageAlert("Atenção","O CPF digitado é inválido!");
					campo.value = '';
					return false;
				}
				soma = 0;
				for (i = 1; i <= 10; i++){
					soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
				}
				resto = (soma * 10) % 11;
				if ((resto == 10) || (resto == 11)){
					resto = 0;
				}
				if (resto != parseInt(strCPF.substring(10, 11))) {
					myUtils.byMessage.messageAlert("Atenção","O CPF digitado é inválido!");
					campo.value = '';
					return false;
				}
				return true;
			}
		},
		cnpj: function (campo) {//NOTE: public method valid for Inscricao Estadual
			var cnpj = campo.value;
			var strCNPJ = cnpj.replace(/[^\d]+/g, '');
			var soma = 0;
			if (strCNPJ != "" && strCNPJ != null){
				if ((strCNPJ.length != 14) || (this.valorRepetido(strCNPJ.length, strCNPJ))){
					myUtils.byMessage.messageAlert("Atenção","O CNPJ digitado é inválido!");
					campo.value = '';
					return false;
				}
				var tamanho = strCNPJ.length - 2
				var numeros = strCNPJ.substring(0, tamanho);
				var digitos = strCNPJ.substring(tamanho);
				soma = 0;
				var pos = (tamanho - 7);
				for (i = tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--;
					if (pos < 2){
						pos = 9;
					}
				}
				var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
				if (resultado != digitos.charAt(0)){
					myUtils.byMessage.messageAlert("Atenção","O CNPJ digitado é inválido!");
					campo.value = '';
					return false;
				}
				tamanho = tamanho + 1;
				numeros = strCNPJ.substring(0, tamanho);
				soma = 0;
				pos = (tamanho - 7);
				for (i = tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--;
					if (pos < 2){
						pos = 9;
					}
				}
				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
				if (resultado != digitos.charAt(1)){
					myUtils.byMessage.messageAlert("Atenção","O CNPJ digitado é inválido!");
					campo.value = '';
					return false;
				}
			}
		},
		date: function(campo) {
			var date = campo.value;
			var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
			if (re.test(date)) { 
				var dateArray = date.split("/"); 
				var toDate = data.split('/').reverse().join('-');
				var d = new Date(toDate);
				var day = ((d.getDate() < 10) ? "0" : "")+ (d.getDate()+1);
				var month = ((d.getMonth() < 9) ? "0" : "")+ (d.getMonth()+1);
				var year = (d.getFullYear()).toString();		    	
				return (day == dateArray[0] && month == dateArray[1] && year == dateArray[2]); 
			} else { 
				return false; 
			}
		},
		valorRepetido: function(tam, campo){//NOTE: Função de comparação numerica (Ex: CPF: 11111111111, 22222222222...)
			var str = '';
			var rest = false;
			var c = 1;
			do{
				if(c != 10){
					for(var i = 0; i < tam; i++){
						str = str + c;
					}
					rest = (campo == str) ? true : false;
					str = '';
					c++;
				}
			}while(rest == false && c != 10);
			return rest;
		},
		cpfCnpj: function (campo,teclapres){//NOTE: public method mask for CPF/CNPJ
			if(teclapres != null){
				var tecla = teclapres.keyCode;
				if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9){
					return false;
				}
			}
			var vr = campo.value;
			vr = vr.replace( /[^\d,]/g, "" );
			vr = vr.replace( /\//g, "" );
			vr = vr.replace( /-/g, "" );
			vr = vr.replace( /\./g, "" );
			var tam = vr.length;
			if(tam <= 2){
				campo.value = vr;
			}
			if((tam > 2) && (tam <= 5)){
				campo.value = vr.substr( 0, tam - 2) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam >= 6) && (tam <= 8)){
				campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam >= 9) && (tam <= 11)){
				campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam == 12)){
				campo.value = vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam > 12) && (tam <= 14)){
				campo.value = vr.substr(0, tam - 12) + '.' + vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
			}
			if(tam > 13){ 	
				if (tecla != 8){
					return false;
				}
			}
		},
		telefone: function (campo,teclapres){//NOTE: public method mask for Telefone/Celular ddd + 8/9 digitos
			if(teclapres != null){
				var tecla = teclapres.keyCode;
				if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9){
					return false;
				}
			}
			var vr = campo.value;
			vr = vr.replace( /[^\d,]/g, "" );
			vr = vr.replace( /-/g, "" );
			vr = vr.replace( /\(/g, "" );
			vr = vr.replace( /\)/g, "" );
			var tam = vr.length;
			if(tam <= 2){
				campo.value = vr;
			}
			if((tam >= 4) && (tam <= 8)){
				campo.value = vr.substr(0, tam - 4) + '-' + vr.substr(tam - 4, tam);
			}
			if((tam >= 9) && (tam <= 10)){
				campo.value = '(' + vr.substr(0, tam - 8) + ')' + vr.substr(tam - 8, 4) + '-' + vr.substr(tam - 4, 4);
			}
			if(tam == 11){
				campo.value = '(' + vr.substr(0, tam - 9) + ')' + vr.substr(tam - 9, 5) + '-' + vr.substr(tam - 4, 4);
			}
			if (tam > 11){ 	
				if (tecla != 8){
					return false;
				}
			}
		},
		cpfCnpjView: function (campo,teclapres){//NOTE: public method mask for CPF/CNPJ
			if(teclapres != null){
				var tecla = teclapres.keyCode;
				if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9){
					return false;
				}
			}
			var vr = campo.value;
			vr = vr.replace( /[^\d,]/g, "" );
			vr = vr.replace( /\//g, "" );
			vr = vr.replace( /-/g, "" );
			vr = vr.replace( /\./g, "" );
			var tam = vr.length;
			if(tam <= 2){
				campo.value = vr;
				campo.innerHTML = vr;
			}
			if((tam > 2) && (tam <= 5)){
				campo.value = vr.substr(0, tam - 2) + '-' + vr.substr(tam - 2, tam);
				campo.value = vr.substr(0, tam - 2) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam >= 6) && (tam <= 8)){
				campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
				campo.innerHTML = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam >= 9) && (tam <= 11)){
				campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
				campo.innerHTML = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
			}
			if((tam == 12)){
				campo.value = vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
				campo.innerHTML = vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
			}
			if ((tam > 12) && (tam <= 14)){
				campo.value = vr.substr(0, tam - 12) + '.' + vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
				campo.innerHTML = vr.substr(0, tam - 12) + '.' + vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
			}
			if (tam > 13){ 	
				if (tecla != 8){
					return false;
				}
			}
		},
};

MyUtils.prototype.utf8 = {//NOTE UTF8 Encode e Decode
		encode: function (vstring){//NOTE: public method for url encoding
			var string = vstring.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++){
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}else if((c > 127) && (c < 2048)){
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}else{
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		decode: function (utftext){//NOTE: public method for url decoding
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ){
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}else if((c > 191) && (c < 224)){
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}else{
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
};

MyUtils.prototype.byFluig = {
		removeValeuZoomData: function(inputObj){//NOTE: Função para remove valor campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].removeAll();
			}else{
				inputObj.removeAll();
			}
		},
		setZoomData: function(inputObj, item){//NOTE: Função para setar campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].add(item);
			}else{
				inputObj.add(item);
			}
		},
		disabledZoomData: function (inputObj, val){//NOTE: Função para disabilitar/habilitar campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].disable(val);
			}else{
				inputObj.disable(val);
			}
		},
		paiFilhoDelete: function(elementObj){//NOTE: Função para remover linha paixFilho
			if($.type(elementObj)  === "string"){
				fnWdkRemoveChild(window[elementObj]);
			}else{
				fnWdkRemoveChild(elementObj);
			}
		},
		zoomRemoveDiplay: function(input){//NOTE: Função para tratar campo zoom no fluig
			$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').on('click', function(){
				$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').show();
			});
		},
		zoomReloadFilter: function(element, value){//NOTE: Função do reload filters do Zoom
			var filter = value;
			if(filter != null && filter != ''){
				reloadZoomFilterValues(element, filter);				
			}
			myUtils.byLoading.loadDefault();
		},
		openModal: function(id, title, content, size, button) {
			var size = ((size == undefined) ? 'large': size); //NOTE: full | large | small
			var actions = new Array();
			if(button != null && button.length > 0){
				for(var i = 0; i < button.length; i++){
					actions.push({
						'label': button[i].label,
						'bind': 'data-open-'+(button[i].label).toLowerCase(),
						'classType': 'btn-'+button[i].type,
						'autoClose': button[i].autoClose
					});
				}
			}else if(button != null){
				actions.push({
					'label': 'Cancelar',
					'bind': 'data-open-cancelar',
					'classType': 'btn-danger',
					'autoClose': true
				});
			}else{
				actions.push({
					'label': 'Fechar',
					'bind': 'data-open-fechar',
					'classType': 'btn-primary',
					'autoClose': true
				});
			}
			if(components.myModal[id] != undefined){
				components.myModal[id].remove();
			}			
			components.myModal[id] = FLUIGC.modal({
				title: title,
				content: content,
				id: 'fluig-modal',
				size: size,
				actions: actions
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});
		},
		progressBarShow: function() {
			$('div#progressBar').parent('div.progress').slideDown('slow');
			$('div#progressBar').css('width', '0%');
			$('div#progressBar').html('0%');
		},
		progressBarHide: function() {
			$('div#progressBar').css('width', '100%');
			$('div#progressBar').html('100%%');
			$('div#progressBar').parent('div.progress').slideUp('slow').delay(800);
		},
		progressBarIncrement: function(progress) {						
			var i_num = (parseInt(parseFloat(progress) * 100) / 100);
			$('div#progressBar').css('width', i_num+'%');
			$('div#progressBar').html(i_num+'%');
		}
};

MyUtils.prototype.byMessage = {
		messageAlert: function (titulo, mensagem){//NOTE: Função Mensagem de alerta customizado fluig
			FLUIGC.message.alert({
				title: titulo,
				message: mensagem,
				label: 'OK'
			}, function(el, ev) {

			});
		},
		messageConfirm: function(titulo, mensagem){
			FLUIGC.message.confirm({
				title: titulo,
				message: mensagem,
				labelYes: 'Sim',
				labelNo: 'Não'
			}, function(result, el, ev) {
				return result;
			});
		},
		messageError: function(titulo, mensagem, detalhes) {
			FLUIGC.message.error({
				title: titulo,
				message: mensagem,
				details: detalhes
			}, function(el, ev) {

			});
		},
		alertSuccess: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'success',
				timeout: 'slow'
			});
		},
		alertWarning: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'warning',
				timeout: 'slow'
			});
		},
		alertInfo: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'info',
				timeout: 'slow'
			});
		},
		alertError: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'danger',
				timeout: 'slow'
			});
		}
};

MyUtils.prototype.byLoading = {
		loadDefault: function() {
			$('body').on('keypress', '[data-only-numbers]', function(ev) {//NOTE: permite digitar somente numeros
				var k = ev.keyCode || ev.which;//NOTE: Permite apagar o conteúdo do campo usando as teclas 'backspace' ou 'delete' no firefox. Nos outros navegadores o keypress não gera evento.
				if(k == 8 || k == 46){
					return true;
				}
				k = String.fromCharCode(k);
				if(isNaN(k)){
					return false;
				}
				return true;
			});
			$('.create-form-components').on('keyup', 'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]', function() {
				validationFieldsForm($(this), $(this).parents( '.form-field').data('type'));
			});
			$('.create-form-components').on('change', 'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]', function() {
				validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
			});
			function validationFieldsForm(field, type) {
				if (type === "checkbox" || type === "radio") {
					if(!field.is(':checked')){
						field.parents('.form-field').addClass('required');
					}else{
						field.parents('.form-field').removeClass('required');
					}
				}else{
					if(!field.val().trim()){
						field.parents('.form-field').addClass('required');
					}else{
						field.parents('.form-field').removeClass('required');
					}
				}
			}
			var $zoomPreview = $(".zoom-preview");
			if($zoomPreview.length){
				$zoomPreview.parent().removeClass("input-group");
				$zoomPreview.remove();
			}
			var ratings = $(".rating");
			if(ratings.length > 0){
				ratingStars(ratings);
			}
			function ratingStars(stars){
				$.each(stars, function(i, obj) {
					var field = $(this).closest(".form-group").find(".rating-value");
					var tgt = $(obj);
					tgt.html("");
					var rating = FLUIGC.stars(tgt, {
						value : field.val()
					});
					rating.on("click", function(o) {
						field.val($(this).index() + 1);
					});
				});
			}
			$.each($("[data-date]"), function(i, o) {
				var id = $(o).parent().attr("id");
				FLUIGC.calendar("#" + id);
			});
			$.each($('table[tablename]'), function(){
				$(this).find('tbody').find('tr.tableHeadRow:first').hide();
				$(this).find('thead').find('tr.tableHeadRow:first').append('<th></th>');
				$(this).find('tbody').find('tr.tableHeadRow:first').append('<td><span class="fluigicon fluigicon-trash fluigicon-md" data-removeChild></span></td>');
			});
			$.each($('span[data-removechild]'), function(){
				$(this).on('click', function(){
					var element = $(this).closest('table[tablename]').attr('id');
					if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
						$(this).closest('tr.tableHeadRow').remove();
					}
				});
			});			
		}
};

MyUtils.prototype.byDataTable = {
		headerTable: function() {
			var header =  new Array({
				'title': 'id'
			}, {
				'title': 'Nome',
				'size': 'col-lg-3 col-md-3 col-sm-3 col-xs-12'
			}, {
				'title': 'E-mail',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			}, {
				'title': 'Data de Nascimento',
				'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
			}, {
				'title': 'Telefone',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			}, {
				'title': 'Celular',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			}, {
				'title': 'Ramal',
				'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
			}, {
				'title': 'Departamento',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			},{
				'title': 'Unidade',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			},{
				'title': 'Cargo',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			},{
				'title': 'Papel',
				'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
			});
			return header;
		},
		initTable: function() {			
			if(dataTable.mydata.length){
				dataTable.myTable.destroy();
				dataTable = new Object({
					myTable: null,
					tableData: null,
					mydata: new Array(),
					dataActionRow: new Array(),
					myparant: new Array(),
					mypages: new Array(),
					mypage: 0
				});
			}
			dataTable.mydata = ramais_.mydata;
			myUtils.byDataTable.pagination();
			myUtils.byDataTable.loadTable();
			$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
		},
		loadTable: function() {
			var pageData =  dataTable.mypages[dataTable.mypage];
			dataTable.myTable = FLUIGC.datatable('#tableRamal', {
				dataRequest: pageData.data,
				renderContent: ".template_datatable",
				header: myUtils.byDataTable.headerTable(),
				multiSelect: true,
				classSelected: 'info',
				search: {
					enabled: true, //true,
					onSearch: function(res) {
						dataTable.myTable.reload(dataTable.tableData);
						if (res) {
							var data = dataTable.mydata;
							var search = data.filter(function(el){
								
								for (var key in el) {
								    var busca = el[key];
								    if (busca != null){
								    	if ((busca.toString()).toUpperCase().indexOf(res.toUpperCase()) >= 0){
											return true;
										}
								    }
								} 
								return false;
								
								
							});
							dataTable.myTable.reload(search);
						}
					},
					onlyEnterkey: false,
					searchAreaStyle: 'col-lg-4 col-md-4 col-sm-12 col-xs-12'
				},
				scroll: {
					target: ".target",
					enabled: false
				},
				actions: {
					enabled: true,
					template: '.mydatatable-template-row-area-buttons',
					actionAreaStyle: 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
				},
				navButtons: {
					enabled: true,
					forwardstyle: 'btn-sm btn-info',
					backwardstyle: 'btn-sm btn-info',
				},
				tableStyle: 'table-condensed table-hover',
				draggable: {
					enabled: false
				}
			}, function(err, data) {
				if (err) {
					myUtils.byMessage.alertSuccess('Erro', err);
				}
			});
			dataTable.myTable.on('fluig.datatable.loadcomplete', function() {
				if (!dataTable.tableData) {
					dataTable.tableData = dataTable.myTable.getData();
				}
			});
			myUtils.byDataTable.btnPagination();
			myUtils.byDataTable.customButton();
			//myUtils.byDataTable.buttonActions();
			return true;
		},
		reload: function(el, ev) {
			dataTable.myTable.reload();
		},
		showColumn: function(el, ev) {
			var index = 1;
			dataTable.myTable.showColumn(index);
		},
		hideColumn: function(el, ev) {
			var index = 1;
			dataTable.myTable.hideColumn(index);
		},
		selected: function(el, ev) {
			var index = dataTable.myTable.selectedRows()[0];
			var selected = dataTable.myTable.getRow(index);
			myUtils.byMessage.alertSuccess('', "{\"id\" :" + selected.id + ", \"name\" :" + selected.name + " , \"uf\" :" + selected.uf + "}");
		},
		pagination: function(el, ev) {
			var itens = dataTable.mydata.length;
			var rows = 10;
			countPages = 0;
			countPages = Math.ceil(itens / rows);
			var pageData = dataTable.mydata;
			dataTable.mypages = new Array();
			var row = 0;
			var page = new Array();
			if(countPages > 1){
				for (var i = 0; i <= pageData.length; i++){
					if(row == rows){
						dataTable.mypages.push({'data': page});
						page = new Array();
						page.push(pageData[i]);
						row = 1;
					}else{
						page.push(pageData[i]);
						row++;
					}
				}
			}else{
				dataTable.mypages.push({'data': pageData});
			}
			return true;
		},
		customButton: function() {
			if(dataTable.mypages.length > 1 && (dataTable.mypage + 1) != dataTable.mypages.length){
				$("button[data-next]").removeClass("disabled");
			}else{
				$("button[data-next]").addClass("disabled");				
			}
			if(dataTable.mypage > 0){
				$("button[data-prev]").removeClass("disabled");
			}else{
				$("button[data-prev]").addClass("disabled");
			}
		},
		btnPagination: function() {
			$("button[data-nav-prev]").attr('data-prev', "");
			$("button[data-nav-next]").attr('data-next', "");
			$("button[data-nav-prev]").removeAttr("data-nav-prev");
			$("button[data-nav-next]").removeAttr("data-nav-next");
			$("button[data-next]").on('click', function(ev){
				ev.preventDefault();
				dataTable.mypage++;
				myUtils.byDataTable.pagination();
				myUtils.byDataTable.customButton();
				myUtils.byDataTable.loadTable();
				$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
			});
			$("button[data-prev]").on('click', function(ev){
				ev.preventDefault();
				dataTable.mypage--;
				myUtils.byDataTable.pagination();
				myUtils.byDataTable.customButton();
				myUtils.byDataTable.loadTable();
				$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
			});
		}
};

MyUtils.prototype.byMountXML = {
		m_distance: function(mydata) {
			if(mydata.distancia != '1' && parseInt(mydata.distancia) != 1){
				var fieldsXml = "<ZMDDISTANCIAS>";
				fieldsXml += myUtils.appComponents.createTagXML("ID", mydata.codigo); 
				fieldsXml += myUtils.appComponents.createTagXML("UFORIGEM", mydata.uforigem); 
				fieldsXml += myUtils.appComponents.createTagXML("CODORIGEM", mydata.codorigem); 
				fieldsXml += myUtils.appComponents.createTagXML("CIDORIGEM", mydata.cidorigem); 
				fieldsXml += myUtils.appComponents.createTagXML("UFDESTINO", mydata.ufdestino); 
				fieldsXml += myUtils.appComponents.createTagXML("CODDESTINO", mydata.coddestino); 
				fieldsXml += myUtils.appComponents.createTagXML("CIDDESTINO", mydata.ciddestino); 
				fieldsXml += myUtils.appComponents.createTagXML("DISTANCIA", mydata.distancia); 
				fieldsXml += "</ZMDDISTANCIAS>";
				if (myUtils.byRecordRM.rec_distance(fieldsXml)){
					dataTable.myTable.removeRow(0);
					return true;
				}else{
					return false;
				}
			}else{
				myUtils.byMessage.alertError('Atenção!','Erro para gravar o registro! Por favor Calcule novamente a Distância.');
				return false;
			}
		}
};

MyUtils.prototype.byRecordRM = {
		rec_distance: function(myXML) {
			var cts = DatasetFactory.createConstraint('fieldsXml', myXML, myXML, ConstraintType.MUST);
			var constraints = new Array(cts);
			var gravaRM = DatasetFactory.getDataset("rm_zmd_distancias_saverecord", null, constraints, null);
			if (gravaRM.values.length > 0 ){
				if(gravaRM.values.length == 1 && gravaRM.values[0].ERROR === undefined  && gravaRM.values[0].RESULT != null){
					var result = gravaRM.values[0].RESULT;
					myUtils.byMessage.alertSuccess("Sucesso", "Distância incluída com Sucesso!");
					return true;
				}else{
					var mensagem = "<h3 class=\"text-danger\">Erro para gravar o registro, contate o Administrador</h3>";
					myUtils.byMessage.messageError("ERRO", mensagem, gravaRM.values[0].ERROR);
					return false;
				}
			}else{
				var mensagem = "<h3 class=\"text-danger\">Erro na Comunica&ccedil;&atilde;o com o TOTVS TBC - RM!</h3>";
				myUtils.byMessage.messageError("ERRO", mensagem, "Contate o Administrador.");
				return false;
			}
		}
};
