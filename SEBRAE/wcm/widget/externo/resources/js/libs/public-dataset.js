console.log('%c [v.up.0.0.1] public-dataset.js', 'color:gray');


var DatasetPublic = new Object();
DatasetPublic = {
	createConstraint: function(field, initVal, endVal, type){
		var constraints = {
		    _field :		field,
		    _initialValue:	initVal,
		    _finalValue : 	endVal,
		    _type:			type,
		    _likeSearch:	false
		}
		
		return constraints;
	},
	getDataset: function(datasetName, fields, constraints, order){
		(fields === undefined  		||  fields === null) 		? fields = [] : '' ;
		(order === undefined   		||  order === null)  		? order  = [] : '' ;
		(constraints === undefined  ||  constraints === null)  	? constraints  = [] : '' ;
		
		var api 	 = "/api/public/ecm/dataset/datasets";
		var paramObj = { 
			name: 		 datasetName,
			fields: 	 fields, 
			constraints: constraints, 
			order: 		 order
		};

		var dataset = new Object();
		dataset = {
			columns: 	[],
			values: 	[],
			rowsCount: 	0
		}
		
		var returnAjax = requestAjax('POST', api, paramObj);
		if(!returnAjax.error){
			dataset.columns 	= returnAjax.data.content.columns;
			dataset.values 		= returnAjax.data.content.values;
			dataset.rowsCount 	= returnAjax.data.content.values.length;
		}
		
		return dataset;
	},
	validateReturn: function(dataset, returnType){

		var aux = false;
		if(dataset !== null){
			if(dataset.values.length > 0){
				aux = true
			}
		}
		
		return aux;
	}
}


var ConstraintTypePublic = {
	'FILTER': 	0, // Reconstroi os campos de filtro padrão.
	'MUST': 	1, // O valor informado precisa estar nos resultados. 
	'SHOULD': 	2, // O valor informado pode estar ou não nos resultados. 
	'MUST_NOT': 3, // O valor informado não pode estar nos resultados.
	'NULL': 	4, // Indica que todos os registros devem ser do tipo NULL.
	'ID': 		5, // Indica que todos os registros devem ser numéricos.
	'TEXT': 	6, // Indica que todos os registros devem ser numéricos.
	'DATE': 	7, // Indica que todos os registros devem ser do tipo data.
	'RANGE': 	8, // O valor deve estar entre o intervalo de dados.
	'CLAUSE': 	9, // Início ou Fim de uma cláusula de filtro.
	'WHERE': 	10 // Iclui a cláusula "AND" ou "OR" no filtro.
};