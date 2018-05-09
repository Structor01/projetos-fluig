var beforeSendValidate = function(numState, nextState){
  var v = $('.ob').length;
  var correto = true;
  $('.rowPF:eq(0)').children('.ob').removeClass('ob');
  for(var i=0; i<v; i++) {
    var value = $('.ob:eq('+i+')').filter(':visible').children('.form-control').val();
    if(value == "" || value == undefined || value == null) {
        $('.ob:eq('+i+')').addClass('has-error');
        correto = false;
    }
    console.log(value);
  }

  if(correto == false) throw "Por favor, preencha os campos em vermelho";
}

function delPaiFilho(e) {
  Javascript:fnWdkRemoveChild(e);
  valorTotal();
}

function valorTotal(){
  var l = $('.rowPF').length;
  var cafe=0;
  var almoco=0;
  var jantar=0;
  var ceia=0;

  for(var i=1; i<l; i++) {
    var id = $('.rowPF:eq('+i+')').attr('id');
    id = id.replace('idx___', '');
    if($('#cafe___'+id).val() != "") cafe += parseInt($('#cafe___'+id).val());
    if($('#almoco___'+id).val() != "") almoco += parseInt($('#almoco___'+id).val());
    if($('#jantar___'+id).val() != "") jantar += parseInt($('#jantar___'+id).val());
    if($('#ceia___'+id).val() != "") ceia += parseInt($('#ceia___'+id).val());
  }

  $('#cafeTotal').val(cafe);
  $('#almocoTotal').val(almoco);
  $('#jantarTotal').val(jantar);
  $('#ceiaTotal').val(ceia);
}

$(document).ready(function(){

  var i=0;
  var myCalarr = new Array();

  $('#inputAdicionar').click(function() {
    wdkAddChild('ingre');
    i++;

    var calend = FLUIGC.calendar('#date___'+i, {
      pickDate: true,
      pickTime: false
    });

    myCalarr.push(calend);
  });

});
