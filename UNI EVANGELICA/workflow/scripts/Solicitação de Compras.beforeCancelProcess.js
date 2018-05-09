function beforeCancelProcess(colleagueId,processId){
  var state = getValue('WKNumState');
  if(state == 12 || state == 62 ||  state == 50 || state == 20 || state == 55  || state == 66)
    throw ("Não é possível cancelar esse processo.");
}
