/**
 * 
 */

function openZoom(obj) {
	var objTxt = obj.toString();
	var objTxt = ("00" + objTxt).slice(-2);
	produto = document.getElementById("des_epi"+objTxt).value; 
	if (produto!="") {
	   var filtro = "&likeField=b1_desc&likeValue="+produto;
       window.open("/webdesk/zoom.jsp?datasetId=consultaEPIS&dataFields=b1_cod,Codigo,b1_desc,Produto,b1_um,Unidade&resultFields=b1_cod,b1_desc,b1_um&type="+objTxt+"&title=zoom"+filtro, "zoom" , "status , scrollbars=yes ,width=700, height=350 , top=0 , left=0");
	} else {
       window.open("/webdesk/zoom.jsp?datasetId=consultaEPIS&dataFields=b1_cod,Codigo,b1_desc,Produto,b1_um,Unidade&resultFields=b1_cod,b1_desc,b1_um&type="+objTxt+"&title=zoom"       , "zoom" , "status , scrollbars=yes ,width=700, height=350 , top=0 , left=0");
	}
}


function setSelectedZoomItem(selectedItem) {
    var typeTxt = selectedItem.type.toString();
    document.getElementById("cod_epi"+typeTxt).value = selectedItem.b1_cod;
    document.getElementById("des_epi"+typeTxt).value = selectedItem.b1_desc;    
    document.getElementById("qtd_epi"+typeTxt).focus();
}


function SomenteNumero(e){
	var tecla=(window.event)?event.keyCode:e.which;   
	if((tecla>47 && tecla<58)) return true;
	else{
		if (tecla==8 || tecla==0) return true;
	else  return false;
	}
}

function calculaqtdtotal() {
	var qtd = 0;
	for(i = 1; i <= 25; i++) {
		if (i <= 9) {
			var qtd = qtd + parseInt(document.getElementById("qtd_epi0"+i).value*1, 10); 
		} else {
			var qtd = qtd + parseInt(document.getElementById("qtd_epi"+i).value*1, 10);
		}
	}
	document.form_solicita_epi.qtd_total.value = qtd*1;
}

function dataAtual(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //Janeiro é 0!
	var yyyy = today.getFullYear();
	if (dd<10) { dd='0'+dd } 
	if (mm<10) { mm='0'+mm } 
	today = dd+'/'+mm+'/'+yyyy;
	document.getElementById("data_solic").value = today;
}


//JavaScript Document
function mascara(o,f){
	v_obj=o
	v_fun=f
	setTimeout("execmascara()",1)
}

function execmascara(){
	v_obj.value=v_fun(v_obj.value)
}

function leech(v){
	v=v.replace(/o/gi,"0")
	v=v.replace(/i/gi,"1")
	v=v.replace(/z/gi,"2")
	v=v.replace(/e/gi,"3")
	v=v.replace(/a/gi,"4")
	v=v.replace(/s/gi,"5")
	v=v.replace(/t/gi,"7")
	return v
}

function soNumeros(v){
	return v.replace(/\D/g,"")
}

function telefone(v){
	v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
	v=v.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
	v=v.replace(/(\d{4})(\d)/,"$1 - $2") //Coloca hífen entre o quarto e o quinto dígitos
	return v
}

function cpf(v){
	v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
	v=v.replace(/(\d{3})(\d)/,"$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
	v=v.replace(/(\d{3})(\d)/,"$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
	//de novo (para o segundo bloco de números)
	v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
	return v
}

function cep(v){
	v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
	v=v.replace(/(\d{2})(\d)/,"$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
	v=v.replace(/(\d{3})(\d{1,3})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
	return v
}

function cnpj(v){
	v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
	v=v.replace(/^(\d{2})(\d)/,"$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
	v=v.replace(/^(\d{2}).(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
	v=v.replace(/.(\d{3})(\d)/,".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
	v=v.replace(/(\d{4})(\d)/,"$1-$2") //Coloca um hífen depois do bloco de quatro dígitos
	return v
}

function romanos(v){
	v=v.toUpperCase() //Maiúsculas
	v=v.replace(/[^IVXLCDM]/g,"") //Remove tudo o que não for I, V, X, L, C, D ou M
	//Essa é complicada! Copiei daqui: http://www.diveintopython.org/refactoring/refactoring.html21
	while(v.replace(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"")!="")
	v=v.replace(/.$/,"")
	return v
}

function site(v){
	//Esse sem comentarios para que você entenda sozinho :wink:
	v=v.replace(/^http:\/\/?/,"")
	dominio=v
	caminho=""
	if(v.indexOf("/")>-1)
	dominio=v.split("/")[0]
	caminho=v.replace(/[^\/]*/,"")
	dominio=dominio.replace(/[^\w.+-:@]/g,"")
	caminho=caminho.replace(/[^\w\d+-@:\?&=%().]/g,"")
	caminho=caminho.replace(/([\?&])=/,"$1")
	if(caminho!="")dominio=dominio.replace(/.+$/,"")
	v="http://"+dominio+caminho
	return v
}

function data(v){
	v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
	v=v.replace(/^(\d{2})(\d)/,"$1/$2") //Coloca ponto entre o segundo e o terceiro dígitos
	v=v.replace(/.(\d{2})(\d)/,".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
	v=v.replace(/(\d{2})(\d)/,"$1/$2") //Coloca um hífen depois do bloco de quatro dígitos
	return v
}

function moeda(v){ 
	v=v.replace(/\D/g,"") // permite digitar apenas numero 
	v=v.replace(/(\d{1})(\d{16})$/,"$1.$2") // coloca ponto antes dos ultimos digitos 
	v=v.replace(/(\d{1})(\d{12})$/,"$1.$2") // coloca ponto antes dos ultimos 13 digitos 
	v=v.replace(/(\d{1})(\d{9})$/,"$1.$2") // coloca ponto antes dos ultimos 10 digitos 
	v=v.replace(/(\d{1})(\d{6})$/,"$1.$2") // coloca ponto antes dos ultimos 7 digitos 
	v=v.replace(/(\d{1})(\d{1,3})$/,"$1,$2") // coloca virgula antes dos ultimos 4 digitos 
	return v;
}

function alteraMaiusculo(campo){
	if (campo == 0) {
	  var valor     = document.getElementById("cargo").value;
	  var novoTexto = valor.toUpperCase();
	  document.getElementById("cargo").value = novoTexto;
	}
	if (campo == 1) {
	  var valor     = document.getElementById("centro_custo").value;
	  var novoTexto = valor.toUpperCase();
	  document.getElementById("centro_custo").value = novoTexto;
	}
}


