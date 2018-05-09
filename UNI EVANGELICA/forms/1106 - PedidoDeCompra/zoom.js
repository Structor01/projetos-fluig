/**
 * Função do leave do Zoom
 * @param selectedItem - Item selecionado
 */
function setSelectedZoomItem(selectedItem){
	/*
	 * Adiciona o id obtido com o zoom no input hidden.
	 * Função: Armazenar a matrícula do usuário selecionado para realizar a assessoria.
	 */
	$('#codigoAssessor').val(selectedItem.colleagueId);
}


function removedZoomItem(removedItem) {
	/*
	 * Remove o id obtido com o zoom no input hidden.
	 * Função Limpar a matrícula do usuário do input hidden para evitar lixo de processo.
	 */
	$('#codigoAssessor').val("");
}