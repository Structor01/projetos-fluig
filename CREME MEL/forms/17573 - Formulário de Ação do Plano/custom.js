$(document).ready(function(){
  if(state == '6') {
    var calend = FLUIGC.calendar('.date', {
      pickDate: true,
      pickTime: false
    });

    $('#dtInicial').prop('readonly', false);
    $('#prazoConclusao').prop('readonly', false);
  } else {
    $('#dtInicial').prop('readonly', true);
    $('#prazoConclusao').prop('readonly', true);
  }
});
