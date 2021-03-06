function limparCamposZoom(input){
  for(var i = 0; i < input.length; i++){
    if(input[0].type == 'zoom'){
      window[input[i].name].clear();
    }else{
      document.getElementById(input[i].name).value = "";
    }
  }
}

function removedZoomItem(removedItem) {
  if (removedItem.inputId === "colaborador") {
		window["gestor"].clear();
	}
}

function setSelectedZoomItem(selectedItem) {
  if( selectedItem.inputId == "gestor"){
    $("#gestor_matricula").val(selectedItem["colleagueId"]);
  }

  if( selectedItem.inputId == "colaborador"){
    validar(selectedItem["colleagueId"]);
    $("#colaborador_matricula").val(selectedItem["colleagueId"]);
  }
}

function setSelectedZoomItem(selectedItem) {
  if( selectedItem.inputId == "gestor"){
    $("#gestor_matricula").val(selectedItem["colleagueId"]);
  }

  if( selectedItem.inputId == "colaborador"){
    validar(selectedItem["colleagueId"]);
    $("#colaborador_matricula").val(selectedItem["colleagueId"]);
  }
}

function validar(e) {
  var c1 = DatasetFactory.createConstraint("colaborador_matricula", e, e, ConstraintType.MUST);
  var datasetUser = DatasetFactory.getDataset("ds_Gestor_Colab", null, [ c1 ], null);
  var colleague = new Array();
  (datasetUser.values.length == 0) ? $('#gestor').prop('disabled', false) : mensagemAlerta("Atenção", "Este usuário já foi adicionado!", false);
}

var modalMyLoading,
autoClose = false;

function mensagemAlerta(titulo, mensagem, fechar) {
  window["gestor"].clear();
  $('#gestor').prop('disabled', true);
  autoClose = fechar == true ? (true) : (false);

  modalMyLoading = FLUIGC.modal({
    title: titulo,
    content: mensagem,
    id:  'fluig-modal',
    size:  'larger',
    actions: [{
      'label':  'Ok',
      'bind':  'data-open-modal',
      'autoClose': true
    }]
  });

  $(".modal-title").text(titulo);
  $(".modal-body").text(mensagem);
}
