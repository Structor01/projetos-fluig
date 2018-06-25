function setSelectedZoomItem(selectObject) {
    console.log('test');
    console.log(selectObject);

    var obj = selectObject['inputId'];

    indexProduto = getIndex(selectObject['inputId']);

    if (obj == 'dsResponsavelRecurso'){
        document.getElementById("cdResponsavelRecurso").value = selectObject['mail'];
    }
    if (obj == 'Unidade'){
        document.getElementById("Codigo").value = selectObject['Codigo'];
    }
}

function getIndex(typeSelected) {
    var id = typeSelected.split('___');
    if (id.length == 2) {
        return id[1];
    } else {
        return id[2];
    }
}


function buscaDadosForm(indexProduto, grupo){
    var result =  $(grupo+indexProduto).val();
    return result;
}

function openFornecedor() {

    var datasetId = "rm_fcfo";
    var dataFields = "CGCCFO,"+escape('CPF/CNPJ')+",NOME,Nome,NOMEFANTASIA,"+escape('Nome Fantasia')+",PESSOAFISOUJUR,Tipo";
    var resultFields = "CGCFO,NOME,NOMEFANTASIA,PESSOAFISOUJUR";
    var type = "fornecedor";
    var title = "Fornecedor";

    var codcoligada = document.getElementById('country').value;
    var codetd = document.getElementById('country').value;

    if (codcoligada == '' || codetd == ''){
        alert('Favor validar se Filial e Estado do Cliente Fornecedor já foram selecionadas!');
        return;
    }

    var filterValues = "CODCOLIGADA,"+codcoligada+",CODETD,"+codetd+"";

    window.open("/webdesk/zoom.jsp?" +
        "datasetId=" +datasetId+
        "&dataFields=" +dataFields+
        "&resultFields=" +resultFields+
        "&type=" + type +
        "&filterValues=" + filterValues+
        "&title="+title, "zoom" , "status , scrollbars=no ,width=600, height=350 , position:absolute,top:50%,left:50%");

}

function removeValeuZoomData(inputObj){
    if($.type(inputObj)  === "string"){
        window[inputObj].removeAll();
    }else{
        inputObj.removeAll();
    }
}


function setZoomData(inputObj, item){
    if($.type(inputObj)  === "string"){
        window[inputObj].add(item);
    }else{
        inputObj.add(item);
    }
}

function setZoomDataII(instance, value){
    window[instance].setValue(value);
}