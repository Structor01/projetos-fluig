function setSelectedZoomItem(selectObject) {
    var obj = selectObject['inputId'];
    indexProduto = getIndex(selectObject['inputId']);
    var grupo = ""
    if (obj == 'dsRecurso'){

        $( "div[id^='rec0']" ).css('display','block');


        var cst1 = DatasetFactory.createConstraint('id', selectObject['Id'], selectObject['Id'], ConstraintType.MUST);
        var cst2 = DatasetFactory.createConstraint('metadata#active', '1', '1', ConstraintType.MUST);
        var cnst = new Array(cst1,cst2)
        var dataset = DatasetFactory.getDataset('sebrae_cadastra_recursos', null, cnst, null);

        console.log(dataset.values.length);
        if(dataset.values.length > 0){

            console.log(dataset.values[0]['cdResponsavelRecurso']);
            console.log(dataset.values[0]);
            console.log(dataset.values);

            var cst3 = DatasetFactory.createConstraint('mail', dataset.values[0]['cdResponsavelRecurso'], dataset.values[0]['cdResponsavelRecurso'], ConstraintType.MUST);
            var cst4 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
            var cnst2 = new Array(cst3,cst4)
            var datasetUser = DatasetFactory.getDataset('colleague', null, cnst2, null);



            document.getElementById("nmRecurso").value = dataset.values[0]['dsRecurso'];
            document.getElementById("dsResponsavelAprovacao").value = dataset.values[0]['dsResponsavelRecurso'];
            document.getElementById("cdResponsavelAprovacao").value = datasetUser.values[0]['colleaguePK.colleagueId'];
            document.getElementById("dsQuantidadeDisponivel").value = dataset.values[0]['dsQuantidade'];
            document.getElementById("dsQuantidadeReal").value = dataset.values[0]['dsQuantidade'];
            document.getElementById("dsTermoAceite").value = dataset.values[0]['dsTermoAceite'];


            var mydata = new Array();
            var numforms = dataset.values[0]['metadata#id'];
            var fields = new Array(numforms.toString());

            var datasetHr = DatasetFactory.getDataset("recursos_cadastro_pai_filho_horario", fields, new Array(), new Array());
            console.log(datasetHr);
            dataHr(numforms, mydata, datasetHr, indexProduto);

            //Desativa recursos extras
            console.log('entrou0');
            if (dataset.values[0]['rcBolacha'] == null){
                $('#rcBolacha').attr('disabled',true);
                $('#rcBolachaII').attr('style','display:none');
            }else{
                console.log('entrou1');
                $('#rcBolacha').removeAttr('disabled');
                $('#rcBolachaII').removeAttr('style');
            }
            if (dataset.values[0]['rcEquipamentos'] == null){
                $('#rcEquipamentos').attr('disabled',true);
                $('#rcEquipamentosII').attr('style','display:none');
            }else{
                console.log('entrou2');
                $('#rcEquipamentos').removeAttr('disabled');
                $('#rcEquipamentosII').removeAttr('style');
            }
            if (dataset.values[0]['rcFilme'] == null){
                $('#rcFilme').attr('disabled',true);
                $('#rcFilmeII').attr('style','display:none');
            }else{
                console.log('entrou3');
                $('#rcFilme').removeAttr('disabled');
                $('#rcFilmeII').removeAttr('style');
            }
            if (dataset.values[0]['rcSala'] == null){
                $('#rcSala').attr('disabled',true);
                $('#rcSalaII').attr('style','display:none');
            }else{
                console.log('entrou4');
                $('#rcSala').removeAttr('disabled');
                $('#rcSalaII').removeAttr('style');
            }
            if (dataset.values[0]['rcCafe'] == null){
                $('#rcCafe').attr('disabled',true);
                $('#rcCafeII').attr('style','display:none');
            }else{
                console.log('entrou5');
                $('#rcCafe').removeAttr('disabled');
                $('#rcCafeII').removeAttr('style');
            }
            if (dataset.values[0]['rcCha'] == null){
                $('#rcCha').attr('disabled',true);
                $('#rcChaII').attr('style','display:none');
            }else{
                console.log('entrou6');
                $('#rcCha').removeAttr('disabled');
                $('#rcChaII').removeAttr('style');
            }
            if (dataset.values[0]['rcParticipante'] == null){
                $('#rcParticipante').attr('disabled',true);
                $('#rcParticipanteII').attr('style','display:none');
                $('#rcParticipanteObsII').attr('style','display:none');
            }else{
                console.log('entrou7');
                $('#rcParticipante').removeAttr('disabled');
                $('#rcParticipanteII').removeAttr('style');
                $('#rcParticipanteObsII').removeAttr('style');
            }
            if (dataset.values[0]['rcFinalidade'] == null){
                $('#rcFinalidade').attr('disabled',true);
                $('#rcFinalidadeII').attr('style','display:none');
                $('#rcFinalidadeObsII').attr('style','display:none');

            }else{
                console.log('entrou8');
                $('#rcFinalidade').removeAttr('disabled');
                $('#rcFinalidadeII').removeAttr('style');
                $('#rcFinalidadeObsII').removeAttr('style');
            }
            if (dataset.values[0]['rcObservacao'] == null){
                $('#rcObservacao').attr('disabled',true);
                $('#rcObservacaoII').attr('style','display:none');
                $('#rcObservacaoObsII').attr('style','display:none');

            }else{
                console.log('entrou8');
                $('#rcObservacao').removeAttr('disabled');
                $('#rcObservacaoII').removeAttr('style');
                $('#rcObservacaoObsII').removeAttr('style');
            }
        }
    }



}

function dataHr(numforms, mydataHr, datasetHr, indexProduto) {
    for (var i = 0; i < datasetHr.values.length; i++) {
        if (datasetHr.values[i]["NumFormulario"] == numforms){
            var group = {
                sq: datasetHr.values[i]["Sequencie"],
                hrI: datasetHr.values[i]["hrInicio"],
                hrF: datasetHr.values[i]["hrFim"]
            };
            mydataHr.push( group );
        }
    }
    console.log('Horas Buscadas'+mydataHr);
    loadFormHr(mydataHr,indexProduto)
}

function loadFormHr(mydataHr,indexProduto){

    var html = "";
    var divCorpo = $("#carrega-horario___"+indexProduto);
    html += "<fieldset id='fdHorarioS__"+indexProduto+"' name='fdHorarioS__"+indexProduto+"'>";
    html += "<div class='panel panel-default'>";
    html += "	<div class='panel-heading'>";
    html += "		<h3 class='panel-title'>Horários Disponíveis</h3>";
    html += "	</div>";
    html += "	<div class='panel-body'>";
    html += "		<div class='form-group'>";
    html += "			<div class='col-sm-12 col-xs-12'>";
    $.each( mydataHr, function( i, val ) {

        var count = (i+1);
        var hours = (val.hrI+' - '+val.hrF);

        html += "				<label class='checkbox-inline'>";
        html += "				    <input type='checkbox' id='horario"+count+"___"+indexProduto+"' name=id='horario"+count+"___"+indexProduto+"' value='"+hours+"'> "+hours+"";
        html += "				</label>";
    });
    html += "			</div>";
    html += "		</div>";
    html += "	</div>";
    html += "</div>";
    html += "</fieldset>";

    divCorpo.append(html);
}

function getIndex(typeSelected) {
    var id = typeSelected.split('___');
    if (id.length == 2) {
        return id[1];
    } else {
        return id[2];
    }
}

// function getIndex(typeSelected){
//
// var id = typeSelected.id.split('___');

// if (id.length == 2) {
// return id[1];
// } else {
// index =
// typeSelected.parentElement.parentElement.getElementsByTagName("input")[0].id.split('___')[1];
// }
// return index;
// }

function carregaZoom(table){
    if (table == 'tableItem'){
        var row = wdkAddChild('tableItem');
        reloadZoomFilterValues("dsGrupoProdutoI___"+ row , "CODCOLIGADA," + $('#codColigadaInicial').val());
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

/**
 * Função para remove valor campo Zoom
 * @param inputObj
 * @returns
 */
function removeValeuZoomData(inputObj){
    if($.type(inputObj)  === "string"){
        window[inputObj].removeAll();
    }else{
        inputObj.removeAll();
    }
}

/**
 * Função para setar campo Zoom
 * @param inputObj
 * @param item
 * @returns
 */
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
