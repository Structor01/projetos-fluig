function validateForm(form) {
  if(form.getValue('depto') == "" || form.getValue('depto') == null) throw "Por favor, preencha todos os campos";
  if(form.getValue('gestor_imediato') == "" || form.getValue('gestor_imediato') == null) throw "Por favor, preencha todos os campos";
  if(form.getValue('filial') == "" || form.getValue('filial') == null) throw "Por favor, preencha todos os campos";
  if(form.getValue('motivo') == "" || form.getValue('motivo') == null) throw "Por favor, preencha todos os campos";
  if((form.getValue('aprovacao_gestor') == "2" || form.getValue('aprovacao_gestor') == "3") && form.getValue('obs_gestor').trim() == "") throw "Por favor, preencha a observação";
  if((form.getValue('aprovacao_rh') == "2" || form.getValue('aprovacao_rh') == "3") && form.getValue('obs_rh').trim() == "") throw "Por favor, preencha a observação";

  if(form.getChildrenIndexes('ingre').length == 0) throw "Por favor, preencha a tabela";
}
