//Pega os Valores dos Horários marcados dos recursos e armazena em um Json para exibir posteriormente
function populaJson(linha) {
	var tabelaCentroDeCusto = $("#tabelaCentroDeCusto___" + linha + " tbody tr");//Pega a tabela de centro de custo do pai x filho
	var codigo, descricao;
	var objTabela = [] //cria objeto para armazenar o json

	for (var i = 0; i < tabelaCentroDeCusto.length; i++) { //Laço de 0 até a quantidade de linhas 
		codigo = tabelaCentroDeCusto[i].children["0"].textContent; //Armazena Código do Centro de Custo
		descricao = tabelaCentroDeCusto[i].children["1"].textContent; //Armazena Nome do Centro de Custo
		objTabela.push({ //Insere no objeto o código e o nome do Centro de Custo
			'codigo' : codigo,
			'descricao' : descricao
		});
	}
	if (objTabela.length > 0) { //Se houver registros no objeto 
		
		$("#centroDeCustoJson___" + linha).val(JSON.stringify(objTabela)); //Armazena o conteúdo 'código' e 'nome' no campo 'centroDeCustoJson'
	}

}

