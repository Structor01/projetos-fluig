function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var estados = DatasetBuilder.newDataset();
	
	estados.addColumn("Sigla");
	estados.addColumn("Nome");
	estados.addColumn("Capital");
	estados.addColumn("Região");
	
	estados.addRow(new Array("SP", "São Paulo", "São Paulo", "Sudeste"));
	estados.addRow(new Array("SP", "Campinas", "São Paulo", "Sudeste"));
	estados.addRow(new Array("RJ", "Rio de Janeiro", "Rio de Janeiro", "Sudeste"));
	estados.addRow(new Array("MG", "Minas Gerais", "Belo Horizonte", "Sudeste"));
	
	return estados;
	
}

function onMobileSync(user) {

}