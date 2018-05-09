function buscaDataAtual(){
	 var data = new Date();
	 var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	 return formatoData.format(data);
}