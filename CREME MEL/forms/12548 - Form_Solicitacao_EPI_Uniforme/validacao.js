function validateForm(form) {

    // validando solicitante
    if (form.getValue("solicitante")=="") {
        throw "Solicitante deve ser informado...";
    }

    // validando cargo
    if (form.getValue("cargo")=="") {
        throw "Cargo deve ser informado...";
    }

    // validando unidade
    if (form.getValue("unidade")=="0000") {
        throw "Unidade deve ser selecionada...";
    }

    // validando centro de custo
    if (form.getValue("centro_custo")=="") {
        throw "Centro de Custo deve ser informado...";
    }

	if(getValue("WKCompletTask") == "false"){
        throw "Usuário não completou a tarefa. Após preencher todos os campos, clicar no botão ENVIAR.";
    }
        
}


