// Global
var valor_total = 0;
var valor_reembolso = 0;
var i=1;

var beforeSendValidate = function(numState, nextState){
  if(numState == 8) {
    $('.gestor').prop('disabled', false);
  }

  var contarPaiFilho = $('.rowPF').length;
	contarPaiFilho = contarPaiFilho - 1;
	console.log("Qt. de Pai Filho " + contarPaiFilho);

	for(var i=1; i<= contarPaiFilho; i++) {
		var id = $('.rowPF:eq('+i+')').attr('id');
    id = id.replace('idx___', '');
    if($('#dt_ferias___'+id).val().trim() == "") throw "Por favor, preencha a data inicial";
    if($('#q_dias___'+id).val().trim() == "") throw "Por favor, preencha a quantidade de dias";
    if($('#motivo').val() == '2')
      if($('#dt_anterior___'+id).val().trim() == "") throw "Por favor, preencha a data anterior";
	}

}

$(document).ready(function() {

  var atv = $('#atividade').val();
  if(atv <= 1) {
    $('.disable-0').prop('disabled', true);
  } else {
    $('.inicio').prop('readonly', true);
  }

  if(atv == 2) {
    $('.gestor').prop('disabled', false);
  } else {
    $('.gestor').prop('disabled', true);
  }

  if(atv == 8) {
    $('.rh').prop('disabled', false);
  } else {
    $('.rh').prop('disabled', true);
  }

  $('#aprovacao_gestor').change(function() {
    var v = $(this).val();
    console.log('alterou gestor');
    (v != 1) ? $('#obs_gestor').removeClass('hide') : $('#obs_gestor').addClass('hide');
  });

  $('#aprovacao_rh').change(function() {
    var v = $(this).val();
    (v != 1) ? $('#obs_rh').removeClass('hide') : $('#obs_rh').addClass('hide');
  });

  $('#motivo').change(function() {
    if($(this).val() == 2) {
      $('.dataAnterior').removeClass('hide');
    } else {
      $('.dataAnterior').addClass('hide');
    }
  });

  // calendar
  var dateTime = FLUIGC.calendar('.date', {
    pickDate: true,
    pickTime: false
  });

  var myCalarr = new Array();
  i = 1;
  $('#inputAdicionar').click(function() {
    //Verificar Filial
    var f = $('#filial').val();
    if(f == "" || f == undefined || f == null) {
      mensagemAlerta('Atenção!', 'Para prosseguir é necessário a escolha de uma filial.');
      return;
    } else {
      wdkAddChild('ingre');
    }

    i++;

    reloadZoomFilterValues('colaborador___'+i, 'FILIAL,' + $('#filial_n').val());

    var calend = FLUIGC.calendar('#dt_ferias___'+i, {
      pickDate: true,
      pickTime: false
    });

    if($('#motivo').val() == "2") {
      var calend2 = FLUIGC.calendar('#dt_anterior___'+i, {
        pickDate: true,
        pickTime: false
      });
      myCalarr.push(calend2);
    }

    myCalarr.push(calend);
    console.log('Count=' + i);
  });

  // OnlyNumber

  $(".number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A, Command+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
});

function setSelectedZoomItem(selectedItem){
	if(selectedItem.inputId.indexOf("colaborador___") > -1 ){
    console.log(selectedItem);
		var id = selectedItem.inputId.split("___")[1];
		document.getElementById('pf_matricula___'+id).value = selectedItem.MATRICULA;
	}
  if(selectedItem.inputId == "filial") {
      document.getElementById('filial_n').value = selectedItem.CCODIGO;
      document.getElementById('empresa_n').value = selectedItem.CCODIGO.substring(0,2);
  }
  if(selectedItem.inputId == 'gestor_imediato') {
      document.getElementById('gestor_n').value = selectedItem.Matricula;
  }
}

function removedZoomItem(removedItem) {
  if(removedItem.inputId == 'filial') {
    for(var c=1; c <= i; c++) {
      $('#delPaiFilho___'+c).click();
    }
  }

  console.log('removeu'+i);
}

function mensagemAlerta(titulo, mensagem, fechar){
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

function delPaiFilho(e) {
  Javascript:fnWdkRemoveChild(e);
}
