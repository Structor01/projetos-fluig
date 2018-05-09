// Global
var valor_total = 0;
var valor_reembolso = 0;
var i=1;

var beforeSendValidate = function(numState, nextState){
  var v = $('.ob').length;
  var correto = true;
  $('.rowPF:eq(0)').children('.ob').removeClass('ob');
  for(var i=0; i<v; i++) {
    var value = $('.ob:eq('+i+')').children('.form-control').val();
    if(value == "" || value == undefined || value == null) {
        $('.ob:eq('+i+')').addClass('has-error');
        correto = false;
    }
    console.log(value);
  }

  if(correto == false) throw "Por favor, preencha os campos em vermelho";
}

$(document).ready(function() {

  var atv = $('#atividade').val();

  if(atv == 0) {
    $('.disable-0').prop('disabled', true);
  }

  if(atv != 0) {
    $('.disable-0').prop('disabled', true);
  }

  if(atv == 6) {
    $('.gestor').prop('disabled', false);
  }

  if(atv == 8) {
    $('.financeiro').prop('disabled', false);
  }


  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length !== 0 ? '000.000.000.000.000,00' : '000.000.000.000.000,00';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), {reverse:true});
      }
  };

  // Tipo de Despesa e Utilizador
  var outro_utilizador_despesa = $('#outro_utilizador_despesa').hide();
  var outro_tipo_despesa = $('#outro_tipo_despesa').hide();

  $('#utilizador_despesa').change(function() {
    var v = $(this).val();
    (v == '3') ? outro_utilizador_despesa.show() : outro_utilizador_despesa.hide();
  });

  $('#tipo_despesa').change(function() {
    var v = $(this).val();
    (v == '3') ? outro_tipo_despesa.show() : outro_tipo_despesa.hide();
  });

  // Em caso de Viagem
  ($('#tipo_despesa').val() == 1 || $('#tipo_despesa').html() == 'Viagem') ? $('.viagem').show() : $('.viagem').hide();
  ($('#meio_transporte').val() == 3 || $('#tipo_despesa').html() == 'Veículo Creme Mel') ? $('.veiculo_creme_mel').show() : $('.veiculo_creme_mel').hide();

  $('#empresa').change(function(){
    ($(this).val() == "Creme Mel") ? $('#resp_fin').val("contasapagar") : $('#resp_fin').val('1224');
  });

  $('#tipo_despesa').change(function() {
    var v = $(this).val();
    ($(this).val() == 1) ? $('.viagem').show() : $('.viagem').hide();
  });

  $('#meio_transporte').change(function() {
    var v = $(this).val();
    ($(this).val() == 3) ? $('.veiculo_creme_mel').show() : $('.veiculo_creme_mel').hide();
  });

  // Adiantamento Financeiro?
  ($('#adiantamento_financeiro').val() == 1 || $('#adiantamento_financeiro').html() == 'Sim') ? $('.adiantamento').show() : $('.adiantamento').hide();

  $('#adiantamento_financeiro').change(function() {
    var v = $(this).val();
    (v==1) ? $('.adiantamento').show() : $('.adiantamento').hide();
  });

  // calendar
  var dateTime = FLUIGC.calendar('.date', {
    pickDate: true,
    pickTime: false
  });

  var myCalarr = new Array();
  i = 1;
  $('#inputAdicionar').click(function() {
    i++;
    var calend = FLUIGC.calendar('#dt_doc___'+i, {
      pickDate: true,
      pickTime: false
    });

    $('#dt_doc___'+i).width($(this).width() + 30);
    // $('#valor___'+i).width($(this).width() - 10);

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

  // Mask
  $('.valor').mask('000.000.000.000.000,00', {reverse: true});
});

function delPaiFilho(e) {
  Javascript:fnWdkRemoveChild(e);
  valorTotal();
}

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

function valorTotal() {
  valor_total = 0;
  valor_reembolso = $('#valor_adiantamento').val();
  if(valor_reembolso == "" || valor_reembolso == undefined) {
    vR = 0;
  } else {
    var vR = valor_reembolso;
    vR = vR.replace(".","");
    vR = vR.replace(",",".");
    vR = parseFloat(vR).toFixed(2);
  }
  for(var co = 1; co <= i; co++) {
    var v = $('#valor___'+co).val();
    if(v == undefined || v == "") v = 0; else {
      v = v.replace(".","");
      v = v.replace(",",".");
    }
    valor_total = valor_total + parseFloat(v);
    // console.log(valor_total);
  }

  $('#valor_total').val(parseFloat(valor_total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  var vt_r = valor_total - vR;
  $('#valor_reembolso').val(parseFloat(vt_r).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}
