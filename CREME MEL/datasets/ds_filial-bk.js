function createDataset(fields, constraints, sortFields) {

	var v = "0205;ZECAS - VITORIA DA CONQUISTA;BA;01238035000550;"
	+ "0206;ZECAS - TERESINA;PI;01238035000630;"
	+ "0116;CREME MEL - GOIANIA GALPAO;GO;03857539001717;"
	+ "0115;CREME MEL - TRANZILLI;GO;03857539001636;"
	+ "0114;CREME MEL - CARIACICA;ES;03857539001555;"
	+ "0204;ZECAS - PETROLINA - BROKER;PE;01238035000479;"
	+ "0101;CREME MEL - GOIANIA;GO;03857539000150;"
	+ "0201;ZECAS - MATRIZ;PE;01238035000126;"
	+ "0202;ZECAS - BAHIA;BA;01238035000207;"
	+ "0203;ZECAS - CEARA;CE;01238035000398;"
	+ "0107;CREME MEL - UBERLANDIA;MG;03857539000664;"
	+ "0106;CREME MEL - BETIM;MG;03857539001040;"
	+ "0112;CREME MEL - IMPERATRIZ;MA;03857539001474;"
	+ "0109;CREME MEL - VARZEA GRANDE;MT;03857539000400;"
	+ "0108;CREME MEL - CAMPO GRANDE;MS;03857539000745;"
	+ "0105;CREME MEL - BRASILIA;DF;03857539000311;"
	+ "0104;CREME MEL - VITORIA DA CONQUISTA;BA;03857539000907;"
	+ "0110;CREME MEL - RIBEIRAO PRETO;SP;03857539000583;"
	+ "0113;CREME MEL - PALMAS;TO;03857539001393;"
	+ "0103;CREME MEL - GALPAO MATERIA PRIMA;GO;03857539000826;"
	+ "0102;CREME MEL - GOIANIA GALPAO;GO;03857539001121;"
	+ "0111;CREME MEL - MONTES CLAROS;MG;03857539001202;";

	var vSplit = v.split(";");
	var dataset = DatasetBuilder.newDataset();
	var c;
	//Cria as colunas
	dataset.addColumn("Filial");
	dataset.addColumn("Municipio");
	dataset.addColumn("Estado");
	dataset.addColumn("CGC");
	var size = vSplit.length;
	var s = size/4;
	var i = 0;
	var count = 0;
	var c_filial;

	if(constraints != null && constraints.length > 1) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "Filial") {
				c_filial = constraints[i].initialValue;
			}
		}

		for(i = 0; i < 21; i++) {
			for(j=0; j<1; j++) {
				count = count + 4;
				var s = vSplit[count].toString();
				if(s.indexOf(c_filial.toString()) > -1) dataset.addRow(new Array(vSplit[count], vSplit[count + 1], vSplit[count + 2], vSplit[count + 3]));
			}
		}

	} else {
		for(i = 0; i < 21; i++) {
			for(j=0; j<1; j++) {
				count = count + 4;
				dataset.addRow(new Array(vSplit[count], vSplit[count + 1], vSplit[count + 2], vSplit[count + 3]));
			}
		}
	}

	return dataset;
}
