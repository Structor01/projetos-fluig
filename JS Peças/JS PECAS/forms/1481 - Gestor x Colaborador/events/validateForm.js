function validateForm(form){
    if(form.getValue("gestor") === null) throw ("Por favor, preencha todos os campos!");
    if(form.getValue("colaborador") === null) throw ("Por favor, preencha todos os campos!");
}
