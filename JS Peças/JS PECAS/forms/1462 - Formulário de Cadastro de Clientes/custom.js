console.log('custom');

$(document).ready(function() {
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('00.000.000/0000-00');
	$('.phone').mask('(00) 00000-0000');
	$('.cep').mask('00000-000');
	$('.phone').blur(function() {
		var v = $(this).val();
		var vS = v.split('');
		var l = vS.length;
		var vT = vS[10];
		var vN = vS[9];
		vS[10] = vS[9];
		vS[9] = vT;
		if(l == 14) $(this).val(vS.join(''));
	});
});

(function(){

	//EVENTO DO CLICK DO TIPO DE CADASTRO
	var radioTipoDeCadastro = document.querySelectorAll("#tipoDeCadastro");
	for(var i = 0; i < radioTipoDeCadastro.length; i++){
		radioTipoDeCadastro[i].addEventListener('click', function(){AlterarPropriedadesCpfOuCnpj(this.value)});
	}

	var divZoomNaturalidadeUF = document.getElementById("divZoomNaturalidadeUF");
	divZoomNaturalidadeUF.addEventListener('click', function(e){
		if(e.target.className == "select2-selection__choice__remove"){
			var inputs = [
				{'name':'zoomNaturalidadeMunicipio', 'type':'zoom'}
			];
			limparCamposZoom(inputs);
		}
	})

	var divZoomEnderecoUF = document.getElementById("divZoomEnderecoUF");
	divZoomEnderecoUF.addEventListener('click', function(e){
		if(e.target.className == "select2-selection__choice__remove"){
			var inputs = [
				{'name':'zoomEnderecoCidade', 'type':'zoom'},
				{'name':'enderecoCidadeID', 'type':'string'}
			];
			limparCamposZoom(inputs);
		}
	})

	var divZoomEnderecoCidade = document.getElementById("divZoomEnderecoCidade");
	divZoomEnderecoCidade.addEventListener('click', function(e){
		if(e.target.className == "select2-selection__choice__remove"){
			var inputs = [
				{'name':'enderecoCidadeID', 'type':'string'}
			];
			limparCamposZoom(inputs);
		}
	})

	//BOTÃO VALIDAR CPF OU CNPJ
	var btnValidarCpfOuCnpj = document.getElementById("btnValidarCpfOuCnpj");
	btnValidarCpfOuCnpj.addEventListener('click', function(e){
		e.preventDefault();

		var tipoPessoa = ValorCampoRadio("tipoDeCadastro");
		var cpfOuCnpj = document.getElementById('cpfOuCnpj');

		if(tipoPessoa == 'F'){
			if(ValidarCPF(cpfOuCnpj.value)){
				document.getElementById('fsCadastroPessoaFisica').style.display = "block";
				document.getElementById('fsCadastroPessoaJuridica').style.display = "none";
				//consultaPessoaFisica(cpfOuCnpj.value.replace(/[^\d]+/g, ''));
				getPessoaFisica(cpfOuCnpj.value.replace(/[^\d]+/g, ''));
			}
			document.getElementById("pfCpf").value = cpfOuCnpj.value;
		}else if(tipoPessoa == 'J'){
			if(ValidarCnpj(cpfOuCnpj.value.replace(/[^\d]+/g, ''))){
				document.getElementById('fsCadastroPessoaJuridica').style.display = "block";
				document.getElementById('fsCadastroPessoaFisica').style.display = "none";
				getPessoaJuridica(cpfOuCnpj.value.replace(/[^\d]+/g, ''))
			}
			document.getElementById("pjDadosEmprsaCnpj").value = cpfOuCnpj.value;
		}


	});

	var btnPFNovoEndereco = document.getElementById("btnPFNovoEndereco");
	btnPFNovoEndereco.addEventListener('click', function(e){
		var id = wdkAddChild('pfTabelaEndereco');
	})

	var btnPFNovoReferenciaPessoal = document.getElementById("btnPFNovoReferenciaPessoal");
	btnPFNovoReferenciaPessoal.addEventListener('click', function(e){
		var id = wdkAddChild('pfTabelaReferenciaPessoal');
	})

	var btnPFNovoReferenciaComercial = document.getElementById("btnPFNovoReferenciaComercial");
	btnPFNovoReferenciaComercial.addEventListener('click', function(e){
		var id = wdkAddChild('pfTabelaReferenciaComercial');
	})

	populaSelects();

})()

function populaSelects(){
	populaSelecEstadoCivil();
}

function populaSelecEstadoCivil(){

	var datasetDsEstadoCivil = DatasetFactory.getDataset('dsEstadoCivil', null, null, null);
	var option;
	var select = document.getElementById("pfEstadoCivil");

	if(datasetDsEstadoCivil.values.length > 0){
		for(var i = 0; i < datasetDsEstadoCivil.values.length; i++){
			option = document.createElement("option");
			option.value = datasetDsEstadoCivil.values[i]['estado_civil'];
			option.text = datasetDsEstadoCivil.values[i]['descricao'];
			select.appendChild(option);
		}
	}

}


function ValorCampoRadio(campo){

	var radio = document.querySelectorAll("#"+campo);
	var retorno = "";

	for(var i = 0; i < radio.length; i++){
		if(radio[i].checked){
			retorno = radio[i].value;
			break;
		}
	}

	return retorno;
}

function AlterarPropriedadesCpfOuCnpj(valor){

	var label = document.querySelector('label[for="cpfOuCnpj"]');

	if(valor == 'F'){
		label.innerText = 'CPF';
		$('#cpfOuCnpj').removeClass('cnpj');
		$('#cpfOuCnpj').addClass('cpf');
	}else{
		label.innerText = 'CNPJ';
		$('#cpfOuCnpj').removeClass('cpf');
		$('#cpfOuCnpj').addClass('cnpj');
	}

	document.getElementById('divCpfOuCnpj').style.display = "block";

}


function ValidarCPF(valor){

	var strCPF = valor.replace(/[^\d]+/g, '');
	var soma = 0;
	var resto;

	if (valor != '' && valor != null){
		if (strCPF.length != 11 || strCPF == "00000000000"
		|| strCPF == "11111111111" || strCPF == "22222222222"
		|| strCPF == "33333333333" || strCPF == "44444444444"
		|| strCPF == "55555555555" || strCPF == "66666666666"
		|| strCPF == "77777777777" || strCPF == "88888888888"
		|| strCPF == "99999999999") {
			mensagemAlerta("Atenção","O CPF digitado é inválido!");
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
			mensagemAlerta("Atenção","O CPF digitado é inválido!");
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
			mensagemAlerta("Atenção","O CPF digitado é inválido!");
			return false;
		}
		return true;
	}
	return false;
}


function ValidarCnpj(valor) {
	var soma = 0;
	var resto;
	var cnpj = valor.replace(/[^\d]+/g, '');

	if(cnpj != '' && cnpj != null) {

		if (cnpj == "00000000000000" ||
		cnpj == "11111111111111" ||
		cnpj == "22222222222222" ||
		cnpj == "33333333333333" ||
		cnpj == "44444444444444" ||
		cnpj == "55555555555555" ||
		cnpj == "66666666666666" ||
		cnpj == "77777777777777" ||
		cnpj == "88888888888888" ||
		cnpj == "99999999999999"){
			mensagemAlerta("Atenção","O CNPJ digitado é inválido!");
			return false;
		}

		tamanho = cnpj.length - 2
		numeros = cnpj.substring(0,tamanho);
		digitos = cnpj.substring(tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
			pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0)){
			mensagemAlerta("Atenção","O CNPJ digitado é inválido!");
			return false;
		}

		tamanho = tamanho + 1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
			pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1)){
			mensagemAlerta("Atenção","O CNPJ digitado é inválido!");
			return false;
		}
		return true;
	}
}


function setSelectedZoomItem(selectedItem){
	if( selectedItem.inputId == "zoomNaturalidadeUF" ){
		reloadZoomFilterValues('zoomNaturalidadeMunicipio', 'UF,'+ selectedItem.UF);
	}else if( selectedItem.inputId.indexOf("zoomEnderecoUF___") > -1 ){
		var id = selectedItem.inputId.split("___")[1];
		reloadZoomFilterValues('zoomEnderecoCidade___'+id, 'UF,'+ selectedItem.UF);
		document.getElementById('enderecoCidadeUF___'+id).value = selectedItem.UF;
		maskInscricao(id);
	}else if( selectedItem.inputId.indexOf("zoomEnderecoCidade___") > -1 ){
		var id = selectedItem.inputId.split("___")[1];
		document.getElementById('enderecoCidadeID___'+id).value = selectedItem.CODIGO;

	}
}

function limparCamposZoom(input){
	for(var i = 0; i < input.length; i++){
		if(input[0].type == 'zoom'){
			window[input[i].name].clear();
		}else{
			document.getElementById(input[i].name).value = "";
		}
	}
}


/****************************************************************************************************************************/
/*													       UTILS													        */
/****************************************************************************************************************************/
var modalMyLoading,
autoClose = false;
//Mensagens no padrão Modal
//Ex: mensagemAlerta("Atenção","Exemplo", "Mensagem de Exemplo", false);
function mensagemAlerta(titulo, mensagem, fechar){

	autoClose = fechar == true ? (true) : (false);

	modalMyLoading = FLUIGC.modal({
		title: titulo,
		content: mensagem,
		id: 	'fluig-modal',
		size: 	'larger',
		actions: [{
			'label': 	'Ok',
			'bind': 	'data-open-modal',
			'autoClose': true
		}]
	});
	$(".modal-title").text(titulo);
	$(".modal-body").text(mensagem);
}


function setZoomData(input, item){
	window[input].setValue(item);
}


function maskInscricao(id) {
	switch($('#enderecoCidadeUF___'+id).val()) {
		case "RS":
		$('#pfInscricaoEstadual___'+id).mask('000-0000000');
		break;
		case "SC":
		$('#pfInscricaoEstadual___'+id).mask('000.000.000');
		break;
		case "PR":
		$('#pfInscricaoEstadual___'+id).mask('00000000-00');
		break;
		case "SP":
		$('#pfInscricaoEstadual___'+id).mask('000.000.000.000');
		break;
		case "MG":
		$('#pfInscricaoEstadual___'+id).mask('000.000.000/0000');
		break;
		case "RJ":
		$('#pfInscricaoEstadual___'+id).mask('00.000.00-0');
		break;
		case "ES":
		$('#pfInscricaoEstadual___'+id).mask('000.000.00-0');
		break;
		case "BA":
		$('#pfInscricaoEstadual___'+id).mask('000.000.00-0');
		break;
		case "SE":
		$('#pfInscricaoEstadual___'+id).mask('000000000-0');
		break;
		case "AL":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "PE":
		$('#pfInscricaoEstadual___'+id).mask('00.0.000.0000000-0');
		break;
		case "PB":
		$('#pfInscricaoEstadual___'+id).mask('00000000-0');
		break;
		case "RN":
		$('#pfInscricaoEstadual___'+id).mask('00.000.000-0');
		break;
		case "PI":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "MA":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "CE":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "GO":
		$('#pfInscricaoEstadual___'+id).mask(' 00.000.000-0');
		break;
		case "TO":
		$('#pfInscricaoEstadual___'+id).mask('00000000000');
		break;
		case "MT":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "MS":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
		break;
		case "DF":
		$('#pfInscricaoEstadual___'+id).mask('00000000000-00');
		break;
		case "AM":
		$('#pfInscricaoEstadual___'+id).mask('00.000.000-0');
		break;
		case "AC":
		$('#pfInscricaoEstadual___'+id).mask('00.000.000/000-00');
		break;
		case "PA":
		$('#pfInscricaoEstadual___'+id).mask('00-000000-0');
		break;
		case "RO":
		$('#pfInscricaoEstadual___'+id).mask('000.00000-0');
		break;
		case "RR":
		$('#pfInscricaoEstadual___'+id).mask('00000000-0');
		break;
		case "AP":
		$('#pfInscricaoEstadual___'+id).mask('000000000');
	}
}

function consultaPessoaFisica(cpf){

	var c1 = DatasetFactory.createConstraint('ID_PESSOA', cpf, cpf, ConstraintType.MUST);
	var datasetDsPessoaFisica = DatasetFactory.getDataset('dsPessoaFisica', null, new Array(c1), null);

	if(datasetDsPessoaFisica.values.length > 0){
		//Pessoa
		document.getElementById("pfNome").value = datasetDsPessoaFisica.values[0]["NOME"];
		document.getElementById("pfRG").value = datasetDsPessoaFisica.values[0]["RG"];
		document.getElementById("pfOrgaoEmissaoRG").value = datasetDsPessoaFisica.values[0]["ORGAO_EMISSOR_RG"];
		document.getElementById("pfDataNascimento").value = datasetDsPessoaFisica.values[0]["DATA_NASCIMENTO"].substring(0,10);
		document.getElementById("pfEstadoCivil").value = datasetDsPessoaFisica.values[0]["ESTADO_CIVIL"];
		document.getElementById("pfTelefone").value = datasetDsPessoaFisica.values[0]["TELEFONE"];
		document.getElementById("pfEmail").value = datasetDsPessoaFisica.values[0]["EMAIL"];

		//Endereco
		if(datasetDsPessoaFisica.values[0]["CEP"]){
			var id = wdkAddChild('pfTabelaEndereco');
			document.getElementById("pfEnderecoCEP___"+id).value = datasetDsPessoaFisica.values[0]["CEP"];
			document.getElementById("pfEnderecoLogradouro___"+id).value = datasetDsPessoaFisica.values[0]["LOGRADOURO"];
			document.getElementById("pfEnderecoComplemento___"+id).value = datasetDsPessoaFisica.values[0]["COMPLEMENTO"];
			document.getElementById("pfEnderecoBairro___"+id).value = datasetDsPessoaFisica.values[0]["BAIRRO"];
			document.getElementById("pfEnderecoComplemento___"+id).value = datasetDsPessoaFisica.values[0]["RENDIMENTO"];
			setZoomData("zoomEnderecoUF___"+id, {'UF': "SP",'DESCRICAO_UF': "SÃO PAULO"});
			setZoomData("zoomEnderecoCidade___"+id, {'CODIGO': datasetDsPessoaFisica.values[0]["ID_CIDADE"],'UF': datasetDsPessoaFisica.values[0]["UF"], "DESCRICAO_CIDADE": datasetDsPessoaFisica.values[0]["DESCRICAO"]});
		}
	}

}

function getPessoaJuridica(codigo){
	$.ajax({
		url: 'http://10.2.7.20/fluig/public/fluig/index/listarpessoajuridica?idPessoa=' + codigo,
		type: 'GET',
		success: function(data) {
			document.getElementById("pjDadosEmpresaRazaoSocial").value = data.data[0].nome;
			document.getElementById("pjDadosEmpresaFantasia").value = data.data[0].nomeFantasia;
			document.getElementById("pjDadosEmpresaCnpj").value = data.data[0].idPessoa;
			document.getElementById("pjDadosEmpresaInscEstadual").value = data.data[0].inscricaoEstadual;
			document.getElementById("pjDadosEmpresaInscMunicipal").value = data.data[0].inscricaoMunicipal;
		}
	});
}

function getPessoaFisica(codigo){
		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listarpessoafisica?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				document.getElementById("pfNome").value = data.data[0].nome;
				document.getElementById("pfRG").value = data.data[0].rg;
				document.getElementById("pfOrgaoEmissaoRG").value = data.data[0].orgaoEmissorRg;
				document.getElementById("pfDataNascimento").value = data.data[0].dataNascimento;
				document.getElementById("pfEstadoCivil").value = data.data[0].estadoCivil;
				document.getElementById("pfEmail").value = data.data[0].email;
			}
		});

		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listartelefonepessoa?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				document.getElementById("pfTelefone").value = data.data[0].telefone;
			}
		});

		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listarenderecopessoa?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				for(var c=0; c < data.data.length; c++) {
					var id = wdkAddChild('pfTabelaEndereco');
					document.getElementById("pfEnderecoCEP___"+id).value = data.data[c].cep;
					document.getElementById("pfEnderecoLogradouro___"+id).value = data.data[c].logradouro;
					document.getElementById("pfEnderecoComplemento___"+id).value = data.data[c].complemento;
					document.getElementById("pfEnderecoBairro___"+id).value = data.data[c].bairro;
					setZoomData("zoomEnderecoUF___"+id, {'UF': data.data[c].uf,'DESCRICAO_UF': data.data[c].estado });
					setZoomData("zoomEnderecoCidade___"+id, {'CODIGO': data.data[c].idCidade, 'UF': data.data[c].uf, "DESCRICAO_CIDADE": data.data[c].cidade});
				}
			}
		});
	}
