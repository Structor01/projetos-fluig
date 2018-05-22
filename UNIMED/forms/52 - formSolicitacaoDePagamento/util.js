function MensagemAlerta(titulo,mensagem){
    var myModal = FLUIGC.modal({
        title: titulo,
        content: mensagem,
        id: 'fluig-modal',
        size: 'larger',
        actions: [{
            'label': 'Ok',
            'bind': 'data-open-modal',
            'autoClose': true
        }]
    }, function(err, data) {
        if(err) {
        } else {
        }
    });
}

/**
 * Mascara do campo - CPF/CNPJ, altera dinamicamente
 * @param campo     - Campos do Formulário
 * @param teclapres - Tecla pressionada
 * @returns {Boolean}
 */

// function checkCpf(e) {
//     var val = $(e).val().replace(/\D+/g, "");;
//     val = val.split('');
//     var v = '';
//
//     if(val.length > 11) maskCpf(e);
//     if(val.length > 11 && val.length < 14) maskCnpj(e);
// }

function maskCpf(e) {
    var val = $(e).val().replace(/\D+/g, "");;
    val = val.split('');
    var v = '';

    for(var index in val) {
        if(index == 3 || index == 6)
            v += '.'+val[index];
        else if(index == 9)
            v += '-'+val[index];
        else if(index <= 11 && val.length <=11)
            v += val[index];
        else
            return maskCnpj(e);
    }

    $(e).val(v);
}

function maskCnpj(e) {
    var val = $(e).val().replace(/\D+/g, "");;
    val = val.split('');
    var v = '';
    for(var index in val) {
        if (index == 2 || index == 5)
            v += '.' + val[index];
        else if (index == 8)
            v += '/' + val[index];
        else if (index == 12)
            v += '-' + val[index];
        else if (index <= 14 && val.length <= 14)
            v += val[index];
    }

    $(e).val(v);
}

// function MascaraCpfCnpj(campo,teclapres) {
// 	var tecla = teclapres.keyCode;
//
// 	if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9) {
// 		return false;
// 	}
//
// 	var vr = campo.value;
// 	vr = vr.replace( /\//g, "" );
// 	vr = vr.replace( /-/g, "" );
// 	vr = vr.replace( /\./g, "" );
// 	var tam = vr.length;
//
// 	if ( tam <= 2 ) {
// 		campo.value = vr;
// 	}
// 	if ( (tam > 2) && (tam <= 5) ) {
// 		campo.value = vr.substr( 0, tam - 2 ) + '-' + vr.substr( tam - 2, tam );
// 	}
// 	if ( (tam >= 6) && (tam <= 8) ) {
// 		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
// 	}
// 	if ( (tam >= 9) && (tam <= 11) ) {
// 		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
// 	}
// 	if ( (tam == 12) ) {
// 		campo.value = vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
// 	}
// 	if ( (tam > 12) && (tam <= 14) ) {
// 		campo.value = vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
// 	}
// 	if (tam > 13){
// 		if (tecla != 8){
// 			return false
// 		}
// 	}
// }

/**
 * Mascara para digitação do valor no campo valorPagamento
 * @param w - objeto
 * @param e - evento
 * @param m - mascara
 * @param r - true / false
 * @param a
 * @returns - variavel editada
 */
function maskIt(w,e,m,r,a){
    // Cancela se o evento for Backspace
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    // Variáveis da função
    var txt  = (!r) ? w.value.replace(/[^\d]+/gi,'') : w.value.replace(/[^\d]+/gi,'').reverse();
    var mask = (!r) ? m : m.reverse();
    var pre  = (a ) ? a.pre : "";
    var pos  = (a ) ? a.pos : "";
    var ret  = "";
    if(code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g,'').length) return false;
    // Loop na máscara para aplicar os caracteres
    for(var x=0,y=0, z=mask.length;x<z && y<txt.length;){
        if(mask.charAt(x)!='#'){
            ret += mask.charAt(x); x++; }
        else {
            ret += txt.charAt(y); y++; x++; } }
    // Retorno da função
    ret = (!r) ? ret : ret.reverse()
    w.value = pre+ret+pos; }
// Novo método para o objeto 'String'
String.prototype.reverse = function(){
    return this.split('').reverse().join('');
};

/***
 * Valida data digitada
 */
function validaData(stringData)
{
    /******** VALIDA DATA NO FORMATO DD/MM/AAAA *******/

    var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter não-numérico.
    var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espaços em branco.

    if(stringData.length != 10)
    {
        return 1;
    }

    splitData = stringData.split('/');

    if(splitData.length != 3)
    {
        return 1;
    }

    /* Retira os espaços em branco do início e fim de cada string. */
    splitData[0] = splitData[0].replace(regExpEspaco, '');
    splitData[1] = splitData[1].replace(regExpEspaco, '');
    splitData[2] = splitData[2].replace(regExpEspaco, '');

    if ((splitData[0].length != 2) || (splitData[1].length != 2) || (splitData[2].length != 4))
    {
        return 1;
    }

    /* Procura por caracter não-numérico. EX.: o "x" em "28/09/2x11" */
    if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2]))
    {
        return 2;
    }

    dia = parseInt(splitData[0],10);
    mes = parseInt(splitData[1],10)-1; //O JavaScript representa o mês de 0 a 11 (0->janeiro, 1->fevereiro... 11->dezembro)
    ano = parseInt(splitData[2],10);

    var novaData = new Date(ano, mes, dia);

    if ((novaData.getDate() != dia) || (novaData.getMonth() != mes) || (novaData.getFullYear() != ano))
    {
        return 3;
    }
    else
    {
        return 4;
    }
};
