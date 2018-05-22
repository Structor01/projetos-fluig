$(document).ready(function () {
    if(getWKNumState() == 0) {
        $('#dtSolicitacao').val(getDateNow());
        $('#solicitante').val(top.WCMAPI.user);
        $('#solicitanteId').val(top.WCMAPI.userCode);
        // setZoomData('solicitanteInformado', top.WCMAPI.user);
    }

    if(getWKNumState() == 5 || getWKNumState() == 4 || formMode == 'VIEW') {
        $('.aprovacao').removeClass('hide');
        $('.horarios').removeClass('hide');
        $('.recursos').removeClass('hide');
    }

    FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: true,
        sideBySide: true
    });

    $('.dateReserva').on('blur', function (ev) {
        onChangeDate(ev);
    });

    $('.dateReserva').on('change', function (ev) {
        onChangeDate(ev);
    });
});

function dateSet(e) {
    $(e).parent().parent().find('.dateReserva').focus();
}

function onChangeDate(ev) {
    $('.dateReserva').mask('00/00/0000 00:00');

    if($('#qtSolicitada').val() == '') return toast('Atenção!', "Por favor, preencha a quantidade de recursos.", 'danger');

    if(
        $('.dateReserva').eq(0).val().trim() != '' &&
        $('.dateReserva').eq(1).val().trim() != '' &&
        arrangeData($('.dateReserva').eq(0).val()) < arrangeData($('.dateReserva').eq(1).val())
    ) {
        verificaDisponibildade( $('.dateReserva').eq(0).val(), $('.dateReserva').eq(1).val());
    } else if(
        $('.dateReserva').eq(0).val().trim() != '' &&
        $('.dateReserva').eq(1).val().trim() != '' &&
        (
            arrangeData($('.dateReserva').eq(0).val()) != arrangeData($('.dateReserva').eq(1).val() ||
            arrangeData($('.dateReserva').eq(0).val()) > arrangeData($('.dateReserva').eq(1).val())
            ))
    ) {
        if(ev.type == 'blur') {
            toast('Atenção!', "Datas inválidas.", 'danger');
            $('.dateReserva').eq(1).val('');
        }
    }
}

var beforeSendValidate = function(numState,nextState) {
    if(numState == 0 || numState == 4) {
        getData($('#codigoRecurso').val());
        var v = verificaDisponibildade($('#dtInicio').val(), $('#dtFinal').val());
        if (v === false) {
            throw 'Datas indisponíveis!';
            location.reload(true);
        }
    }
}

var DATAS = [];

function verificaDisponibildade(inicio,fim) {
    var html = '';
    $('#rowReserva').html('');
    var qtTotal = 0;

    for(var i in DATAS) {
        var dI = DATAS[i]['dtInicio'];
        var dF = DATAS[i]['dtFinal'];
        var diaI = dI.split(' ')[0].split('/')[0];
        var diaF = dF.split(' ')[0].split('/')[0];
        var mesI = dI.split(' ')[0].split('/')[1];
        var mesF = dF.split(' ')[0].split('/')[1];
        var horaI = dI.split(' ')[1];
        var horaF = dF.split(' ')[1];
        if(
            (arrangeData(dI) <= arrangeData(inicio) && arrangeData(dF) >= arrangeData(fim)) ||
            (
                inicio.split(' ')[0].split('/')[0] == diaI &&
                inicio.split(' ')[0].split('/')[1] == mesI &&
                inicio.split(' ')[1] >= horaI && inicio.split(' ')[1] <= horaF
            ) || (
                fim.split(' ')[0].split('/')[0] == diaF &&
                fim.split(' ')[0].split('/')[1] == mesF &&
                fim.split(' ')[1] <= horaI && fim.split(' ')[1] >= horaF
            ) || (
                arrangeData(inicio) < arrangeData(dI) && arrangeData(fim) > arrangeData(dF)
            ) || (
                arrangeData(fim) >= arrangeData(dI) && (arrangeData(fim) <= arrangeData(dF) && arrangeData(inicio) <= arrangeData(dI))
            ) || (
                arrangeData(inicio) >= arrangeData(dF) && (arrangeData(fim) <= arrangeData(dF) && arrangeData(inicio) <= arrangeData(dI))
            )
        ) {
            html += '<tr>' +
                '   <td>'+ DATAS[i]["sol"] +'</td>' +
                '   <td>'+ DATAS[i]["qtSolicitada"] +'</td>' +
                '   <td>'+ dI +'</td>' +
                '   <td>'+ dF +'</td>' +
                '</tr>';
            qtTotal += parseInt(DATAS[i]["qtSolicitada"]);
        }
    }

    $('#rowReserva').append(html);
    if(qtTotal + parseInt($('#qtSolicitada').val()) <= parseInt($('#quantidade').val())) return true;

    if(html != '') {
        toast('Atenção!', "Já exitem reservas para essas datas", 'danger');
        return false
    } else {
        return true;
    }
}

function verTodos() {
    var html = '<table class="table table-hover">' +
        '<thead>' +
        '   <th>Solicitante</th>' +
        '   <th>Quantidade</th>' +
        '   <th>Início</th>' +
        '   <th>Fim</th>' +
        '</thead><tbody>';

    for(var i in DATAS) {
        html +='<tr><td>'+DATAS[i]['sol']+'</td>';
        html +='<td>'+DATAS[i]['qtSolicitada']+'</td>';
        html +='<td>'+DATAS[i]['dtInicio']+'</td>';
        html +='<td>'+DATAS[i]['dtFinal']+'</td></tr>';
    }
    html +='</tbody></table>';

    FLUIGC.modal({
        title: 'Reservas',
        content: html,
        id: 'fluig-modal',
        size: 'full',
        actions: [{
            'label': 'Fechar',
            'autoClose':true
        }]
    });
}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute;
    var currentDate = day + '/' + month + '/' + year;
    var currentTime = currentDate + " " + currentHour;
    return currentTime;
}

function toast(t,m,p) {
    FLUIGC.toast({
        title: t, message: m, type: p
    });
}

function getWeekDay() {
    var from = $("#registroData___1").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    switch (f.getDay()) {
        case 0:
            return "Domingo"
            break;
        case 1:
            return "Segunda-Feira"
            break;
        case 2:
            return "Terça-Feira"
            break;
        case 3:
            return "Quarta-Feira"
            break;
        case 4:
            return "Quinta-Feira"
            break;
        case 5:
            return "Sexta-Feira"
            break;
        case 6:
            return "Sábado"
    }
}

function ativaRec(){
    if ($("input[id='rcObservacao']:checked").length == 1){
        $('#rcObservacaoObs').removeAttr('readonly');
    }else{
        $('#rcObservacaoObs').attr('readonly',true);
    }
    if ($("input[id='rcParticipante']:checked").length == 1){
        $('#rcParticipanteObs').removeAttr('readonly');
    }else{
        $('#rcParticipanteObs').attr('readonly',true);
    }
    if ($("input[id='rcFinalidade']:checked").length == 1){
        $('#rcFinalidadeObs').removeAttr('readonly');
    }else{
        $('#rcFinalidadeObs').attr('readonly',true);
    }
}

function arrangeData(e) {
    var t = e.split(' ');
    var date = t[0].split('/');
    var newDate = date[2] + '-' + date[1] + '-' + date[0] + 'T' + t[1] + ':00';
    return new Date(newDate);
}

function atualizaProcessos(sol, atv, colab, comment) {
    var c1 = DatasetFactory.createConstraint("Solicitação", sol, sol, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("Atividade", atv, atv, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("Usuário Executor", colab, colab, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("Comentário", comment, comment, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("Usuário Destino", "System:Auto", "System:Auto", ConstraintType.MUST);
    var constraints = new Array(c1, c2, c3, c4, c5);
    return DatasetFactory.getDataset("dsMoverAtiv", null, constraints, null);
}

function getData(id) {
    // var constraints = new Array();
    // constraints.push(DatasetFactory.createConstraint("processId", 'reserva_recurso', 'reserva_recurso', ConstraintType.MUST));
    // var dataset = DatasetFactory.getDataset("dsGetAvailableProces", null, constraints, null);
    // DATAS = new Array();
    // for(var i in dataset.values) {
    //     var nconstraints = new Array();
    //     nconstraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[i]['cardId'], dataset.values[i]['cardId'], ConstraintType.MUST));
    //     nconstraints.push(DatasetFactory.createConstraint("codigoRecurso", id, id, ConstraintType.MUST));
    //     var doc = DatasetFactory.getDataset("dsReserva_Recursos", null, nconstraints, null);
    //     if(doc.values && doc.values.length > 0) {
    //         var process = false;
    //         if(dataset.values[i]['codTask'] == '6' && arrangeData(getDateNow()) > arrangeData(doc.values[0]['dtFinal']))
    //             process = atualizaProcessos(
    //                 dataset.values[i]["processInstanceId"],
    //                 7,
    //                 dataset.values[i]["requesterId"],
    //                 'Movimentado Automáticamente'
    //             );
    //
    //         if(process) return getData(id);
    //
    //         DATAS.push({
    //             sol: doc.values[0]['solicitanteInformado'],
    //             dtInicio: doc.values[0]['dtInicio'],
    //             dtFinal: doc.values[0]['dtFinal'],
    //             qt: doc.values[0]['qtSolicitada']
    //         });
    //     }
    // }

    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("codigoRecurso", id, id, ConstraintType.MUST));
    var doc = DatasetFactory.getDataset("dsRecursosDisponiveis", null, constraints, null);
    DATAS = doc.values;
}

function setSelectedZoomItem(selectObject) {
    var obj = selectObject['inputId'];
    indexProduto = getIndex(selectObject['inputId']);
    var grupo = ""
    if (obj == 'recurso'){
        getData(selectObject['Id']);
        $( ".recursos, .horarios" ).removeClass('hide');
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

            document.getElementById("descricaoRecurso").value = dataset.values[0]['dsRecurso'];
            document.getElementById("codigoRecurso").value = selectObject['Id'];
            document.getElementById("responsavel").value = dataset.values[0]['dsResponsavelRecurso'];
            document.getElementById("responsavelAprovacao").value = datasetUser.values[0]['colleaguePK.colleagueId'];
            document.getElementById("quantidade").value = dataset.values[0]['dsQuantidade'];
            document.getElementById("quantidade").value = dataset.values[0]['dsQuantidade'];
            // document.getElementById("dsTermoAceite").value = dataset.values[0]['dsTermoAceite'];


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
    if(obj == 'solicitanteInformado') {
        var constraint = new Array();
        constraint.push(DatasetFactory.createConstraint('mail', selectedItem.mail, selectedItem.mail, ConstraintType.MUST));
        var datasetUser = DatasetFactory.getDataset('colleague', null, constraint, null);
        $('#solicitanteId').val(datasetUser.values[0]['colleaguePK.colleagueId']);
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
// function setZoomData(inputObj, item){
//     if($.type(inputObj)  === "string"){
//         window[inputObj].add(item);
//     }else{
//         inputObj.add(item);
//     }
// }

function setZoomData(instance, value){
    window[instance].setValue(value);
}
