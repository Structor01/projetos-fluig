// JavaScript Document
//adiciona mascara ao CPF
function MascaraCPF(cpf){
        if(mascaraInteiro(cpf)==false){
                event.returnValue = false;
        }       
        return formataCampo(cpf, '000.000.000-00', event);
}
//valida o CPF digitado
function ValidarCPF(Objcpf){
        var cpf = Objcpf.value;
        exp = /\.|\-/g
        cpf = cpf.toString().replace( exp, "" ); 
        var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
        var soma1=0, soma2=0;
        var vlr =11;

        for(i=0;i<9;i++){
                soma1+=eval(cpf.charAt(i)*(vlr-1));
                soma2+=eval(cpf.charAt(i)*vlr);
                vlr--;
        }       
        soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
        soma2=(((soma2+(2*soma1))*10)%11);

        var digitoGerado=(soma1*10)+soma2;
        if(digitoGerado!=digitoDigitado)        
                alert('CPF Invalido!');         
}

//valida numero inteiro com mascara
function mascaraInteiro(){
        if (event.keyCode < 48 || event.keyCode > 57){
                event.returnValue = false;
                return false;
        }
        return true;
}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) { 
        var boleanoMascara; 

        var Digitato = evento.keyCode;
        exp = /\-|\.|\/|\(|\)| /g
        campoSoNumeros = campo.value.toString().replace( exp, "" ); 

        var posicaoCampo = 0;    
        var NovoValorCampo="";
        var TamanhoMascara = campoSoNumeros.length;; 

        if (Digitato != 8) { // backspace 
                for(i=0; i<= TamanhoMascara; i++) { 
                        boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                                || (Mascara.charAt(i) == "/")) 
                        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                        if (boleanoMascara) { 
                                NovoValorCampo += Mascara.charAt(i); 
                                  TamanhoMascara++;
                        }else { 
                                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                                posicaoCampo++; 
                          }              
                  }      
                campo.value = NovoValorCampo;
                  return true; 
        }else { 
                return true; 
        }
}
//adiciona mascara ao RG
function MascaraRG(rg){
        if((rg)==false){
                event.returnValue = false;
        }       
        return formataCampo(rg, '00.000.000-0', event);
}

// Escuta valores digitados
function moeda(z){  		
v = z.value;		
v=v.replace(/\D/g,"")  //permite digitar apenas números	
v=v.replace(/[0-9]{12}/,"inválido")   //limita pra máximo 999.999.999,99	
v=v.replace(/(\d{1})(\d{8})$/,"$1.$2")  //coloca ponto antes dos últimos 8 digitos	
v=v.replace(/(\d{1})(\d{5})$/,"$1.$2")  //coloca ponto antes dos últimos 5 digitos	
v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2")	//coloca virgula antes dos últimos 2 digitos		
z.value = v;
}

function validaMoeda(){
	var valor = document.getElementById("valor_adiant_fin").value;
	if ((valor == '0,') || (valor == '0,0') || (valor == '0,00') || (valor == '00,00') || (valor == '0.000,00') || (valor == '00.000,00'))
		alert (valor + " " + "Favor, digitar um valor válido");
}

function mascaraData(campoData){
	  var data = campoData.value;
	  if (data.length == 2){
		  data = data + '/';
		  document.forms[0].dt_solic.value = data;
    return true;              
	  }
	  if (data.length == 5){
		  data = data + '/';
		  document.forms[0].dt_solic.value = data;
		  return true;
	  }
}

function mascaraData_fin(campoData){
	  var data = campoData.value;
	  if (data.length == 2){
		  data = data + '/';
		  document.forms[0].data_adiant_fin.value = data;
  return true;              
	  }
	  if (data.length == 5){
		  data = data + '/';
		  document.forms[0].data_adiant_fin.value = data;
		  return true;
	  }
}

function validaAprovacao(){
	
	var aprovacao = document.getElementById("aprova").checked;
	 if(!aprovacao){
		 alert("Favor selecionar uma opção");
	 }
	 else if(aprovacao.value == "aprova_nao"){
		 alert("Justificar a negação!");
	 }
}