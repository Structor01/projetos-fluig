$(document).ready(function() {
  var vAprov = $('#ecp_aprovacao').val();
  if($('#ativ').val() != 0) $('#aviso').hide(); else $('#ecp_aprovacaoPai').hide();
  ($('#ativ').val() == 'fim' && $('#ecp_aprovacao').html() == 'Negado') ? $("#ecp_motivoNegadoPai").show() : $("#ecp_motivoNegadoPai").hide();
  $('#ecp_aprovacao').on('change', function() {
    var v = $(this).val();
    (v == 2) ? $("#ecp_motivoNegadoPai").show() : $("#ecp_motivoNegadoPai").hide();
  });

  $("#ecp_codigoCliente").keydown(function (e) {
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

  $("#ecp_codigoCliente").focus(function() {
    if($(this).val() == "") $(this).val('00000000');
  });

  $("#ecp_codigoCliente").blur(function() {
    var vl = $(this).val().length;
    var dif = 8 - vl;
    var zeros = '';
    for(var i=0; i<dif; i++) {
      zeros += '0';
    }

    $(this).val(zeros+$(this).val());
  });

  $('#ecp_codigoCliente').mask('0000000#', {reverse:true});
});
