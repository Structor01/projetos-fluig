/***
 * Mostra a imagem selecionada
 */
function VisualizarImagem(index){

	var imagem = document.getElementById('imagem___'+index); //seleciona a imagem
	var reader  = new FileReader();

	reader.onloadend = function () {
	imagem.src = reader.result;
	}	
	
	//if(btnIMagem.files.length > 0){
	if (document.getElementById('testeupload'+'___'+index).files.length >0){
		reader.readAsDataURL(document.getElementById('testeupload'+'___'+index).files[0]); //le a imagem
		return true
	} else {
		imagem.src = "";
		return false;
	}
}

/***
 * Valida o formato da imagem selcionado
 * @param campo - Id do File
 */
function ValidaFormato(campo){
	//console.log("campo : " + campo)
    var extensao = new Array("jpg");
    //console.log("extensao : " + extensao)
    var imagem = document.getElementById(campo).value
    //console.log("imagem : " + imagem)
    var extensaoArquivo = imagem.split('.').pop();
    //console.log("extensaoArquivo : " + extensaoArquivo)
    for(var i = 0; i <= extensao.length; i++){
    	//console.log("extensao[i] " +extensao[i]) 
        if(extensao[i]==extensaoArquivo){
        	var index = campo.substring(campo.indexOf("___") + 3, campo.indexOf("___") + 6);
        	var retornoImagem = VisualizarImagem(index);
        	if (retornoImagem){
        		ConverteBase64ParaHexadecimal(index);
        	}
//        	$('#btnImagem___'+index).css('display', 'none');
        	return true;
        }else{
        	MensagemAlerta('Atenção','Formato inválido, favor selecionar uma imagem .JPG!')
        	return false;
        }
    }    
}

function ConverteBase64ParaHexadecimal(index){
	var imagem = document.getElementById('imagem___'+index).src;
	//console.log(imagem)
	var imagemHex = document.getElementById('imagemHex___'+index);
	//console.log(imagemHex)
	var retorno = ""
	var imagem2 = imagem.split('=');
	//console.log("imagem: " +imagem)
	if(imagem2[1].substring(0,1) == '/'){		
		imagem = imagem2[1].substring(1,imagem2[1].length)
	}
	//imagemHex.value = imagem;
	return imagem;
}

function ConverteBase64ParaHexadecimalx(index){
	var imagem = document.getElementById('imagem___'+index).src;
	//console.log(imagem)
	var imagemHex = document.getElementById('imagemHex___'+index);
	//console.log(imagemHex)
	var retorno = ""
	imagem = imagem.substring(22,imagem.length)
	//console.log("imagem: " +imagem)
	if(imagem.substring(0,1) == ','){		
		imagem = imagem.substring(1,imagem.length)
	}
	//imagemHex.value = imagem;
	return imagem;
}

function ExibeImagem(imagemHex,campoImagem){
	//var imagemBase64 = hexToBase64(imagemHex);
	document.getElementById(campoImagem).src = "data:image/jpeg;base64,"+imagemHex;
}

function hexToBase64(str){
	var convertido = btoa(String.fromCharCode.apply(null,
			str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
	);
	return convertido ;
}