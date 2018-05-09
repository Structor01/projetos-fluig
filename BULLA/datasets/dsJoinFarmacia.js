function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    //Cria as colunas
    dataset.addColumn("Sigla");
    dataset.addColumn("Estado");
    dataset.addColumn("Capital");
    dataset.addColumn("Area");

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "Sigla") {
                company = constraints[i].initialValue;
            }
            else if (constraints[i].fieldName == "Estado") {
                initialDate = constraints[i].initialValue;
                finalDate = constraints[i].finalValue;
            }
        }
    }

    //Cria os registros
    dataset.addRow(new Array("AM", "Amazonas", "Manaus", 1570746));
    dataset.addRow(new Array("PA", "Pará", "Belém", 1247690));
    dataset.addRow(new Array("MT", "Mato Grosso", "Cuiabá", 903358));
    dataset.addRow(new Array("TO", "Tocantins", "Palmas", 277621));
    dataset.addRow(new Array("PI", "Piauí", "Teresina", 251529));

    return dataset;
}