function resolve(process,colleague){

var userList = new java.util.ArrayList();
	
	//obtém o usuário selecionado no formulário
	var usuarioSelecionado = hAPI.getCardValue("codigoAssessor");
	
	/*
	 * Adiciona na lista de usuário que a atividade será direcionada
	 * No meu caso é apenas 1 (um) responsável
	 */ 
	userList.add(usuarioSelecionado);

	// retorna a lista criada
	return userList;

}