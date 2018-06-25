function ativaStatus(select){

    console.log('select.value: ' + select.value);

    switch (select.value) {
        case "S":
            activeStatus('dsTermoAceite','','textarea','');
            break;
        case "N":
            disableStatus('dsTermoAceite','','textarea','');
            break;
    }
}

function disabledStatus(div,pf,type,indexS){
    $(''+type+'[name*="'+div+''+pf+''+indexS+'"]').css( "display", "none" );
}

function enabledStatus(div,pf,type,indexS){
    $(''+type+'[name*="'+div+''+pf+''+indexS+'"]').removeAttr("style");
}

function activeStatus(div,pf,type,indexS){
    console.log($(''+type+'[name*="'+div+''+pf+''+indexS+'"]'));
    $(''+type+'[name*="'+div+''+pf+''+indexS+'"]').removeAttr('readonly');
}

function disableStatus(div,pf,type,indexS){
    console.log($(''+type+'[name*="'+div+''+pf+''+indexS+'"]'));
    $(''+type+'[name*="'+div+''+pf+''+indexS+'"]').attr('readonly', 'readonly');
}

