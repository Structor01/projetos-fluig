//validateForm

function validateForm(form){
	numAtividade = parseInt(getValue("WKNumState"));		

	if(numAtividade == 0 || numAtividade == 1){	
		if (form.getValue('nome_solic') == ""){
            throw "O campo NOME deve ser informado.";
        }
        
        if (form.getValue('mat_solic') == ""){
            throw "O campo MATRICULA deve ser informado.";
        }
        
        if (form.getValue('cargo_solic') == ""){
            throw "O campo CARGO deve ser informado.";
        }
        
        if (form.getValue('centrocusto_solic') == ""){
            throw "O campo CENTRO DE CUSTO deve ser informado.";
        }
        
        if (form.getValue('rg_solic') == ""){
            throw "O campo RG deve ser informado.";
        }
        
        if (form.getValue('cpf_solic') == ""){
            throw "O campo CPF deve ser informado.";
        }
        
        if (form.getValue('dt_solic') == ""){
            throw "O campo DATA DE NASCIMENTO deve ser informado.";
        }
        
        if (form.getValue('email_solic') == ""){
            throw "O campo EMAIL deve ser informado.";
        }
        
        if (form.getValue('unidade_solic') == ""){
            throw "O campo UNIDADE) deve ser informado.";
        }
        
        if (form.getValue('sit_func_solic') == ""){
            throw "O campo SITUAÇÃO FUNCIONAL deve ser informado.";
        }

        if (form.getValue('data_adiant_fin') == ""){
            throw "O campo DATA DO ADIANTAMENTO FINANCEIRO deve ser informado.";
        }
        
        if (form.getValue('unid_adiant_fin') == ""){
            throw "O campo UNIDADE DO ADIANTAMENTO FINANCEIRO) deve ser informado.";
        }
        
        if (form.getValue('valor_adiant_fin') == ""){
            throw "O campo VALOR DO ADIANTAMENTO FINANCEIRO deve ser informado.";
        }
        
        if (form.getValue('det_obj_adiant') == ""){
            throw "O campo JUSTIFICATIVA DO ADIANTAMENTO deve ser informado.";
        }
        
        if (form.getValue('det_obj_viagem') == ""){
            throw "O campo (Detalhar objetivo do adiantamento) deve ser informado.";
        }
		
		if (form.getValue('GestCol') == ""){
            throw "O campo GESTOR IMEDIATO deve ser informado.";
        }
		}
		else if(numAtividade == 2){	
			if (form.getValue('aprova') == "aprova_talvez"){
				throw "Favor, escolher uma das opções no campo APROVAÇÃO.";
			}
			else if((form.getValue('aprova') == "aprova_nao") && (form.getValue('aprova_detalhe') == "")){
				throw "O campo Detalhe da Aprovação deve ser informado.";
			}
		}	
		if(getValue("WKCompletTask") == "false"){
			throw "Usuário não completou a tarefa. Após preencher todos os campos, clicar no botão ENVIAR.";
		}
}
