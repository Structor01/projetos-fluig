function beforeTaskSave(colleagueId,nextSequenceId,userList){
  var numProces = getValue("WKNumProces");
  var cardId = getValue("WKCardId");
  var numState = getValue("WKNumState");

  // var nSol = "";
  //
  // if(numState != 0 || numState != 5) {
  //   var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
  //   var c2 = DatasetFactory.createConstraint("metadata#id", cardId, cardId, ConstraintType.MUST);
  //
  //   var constraintsPai = new Array(c1, c2);
  //   var datasetPai = DatasetFactory.getDataset("dsAcaoDoPlano", null, constraintsPai, null);
  //
  //   if (datasetPai.rowsCount > 0) {
  //     nSol = datasetPai.getValue(0, 'nSol');
  //   }
  // }

  if(numState == 6) {
    // Recuperando a data informada no campo do formulário
    var prazoFormulario = hAPI.getCardValue('prazoConclusao');
    if (prazoFormulario != undefined && prazoFormulario != '') {
      var numeroDaSolicitacao = getValue('WKNumProces');
      var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
      var responsavelPelaTarefa = colleagueId;

      /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada,
      mudando assim as posições das informações dentro do array */

      /* Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript */
      var arrayPrazoConclusao = prazoFormulario.split("/");
      var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
      var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
      var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano

      var horaDoPrazo = (24*60*60) - 1; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja,
      o prazo de conclusão vai ser até o último segundo do dia informado no formulário */

      // Cria a data no Javascript
      var dataDoPrazo = new Date();
      dataDoPrazo.setDate(dia);
      dataDoPrazo.setMonth(mes);
      dataDoPrazo.setFullYear(ano);

      // Altera o prazo de conclusão
      hAPI.setDueDate(numeroDaSolicitacao, hAPI.getActualThread(getValue("WKCompany"), numeroDaSolicitacao, nextSequenceId), responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
    }
  }
}
