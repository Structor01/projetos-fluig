
function consultaSolicitante ( solicitante ) {
	
	var cst1 = DatasetFactory.createConstraint("codigoSolicitante", solicitante, solicitante, ConstraintType.MUST);
	var constraints = new Array(cst1);   
	var dataset = DatasetFactory.getDataset('dsHierarquiaAprovacao', null, constraints, null);
	return dataset;
	
	
		
	
}



function consultaUsuario ( idUsuario ) {
	
	if (idUsuario == '' || idUsuario == '..' ) {
		return false;
	} else {
		var cst1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', idUsuario, idUsuario, ConstraintType.MUST);
		var colunas = new Array('colleaguePK.colleagueId', 'colleagueName', 'adminUser', 'mail', 'currentProject', 'especializationArea');
		var datasetUsuario = DatasetFactory.getDataset('colleague', colunas, new Array(cst1), null);	
		if (datasetUsuario.values.length > 0) {		
			return new Array ( 
					datasetUsuario.values[0]['colleaguePK.colleagueId'], 
					datasetUsuario.values[0].colleagueName, 
					datasetUsuario.values[0].adminUser,	
					datasetUsuario.values[0].mail, 
					datasetUsuario.values[0].currentProject,	
					datasetUsuario.values[0].especializationArea);
		}	
	}
	
}

function obterDataHoraAtual () {	
	var today = new Date();
	var year = today.getFullYear();
	var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
	var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
	var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
	var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
	var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
	var currentHour = hour + ":" + minute + ":" + second;
	var currentDate = day + '/' + month + '/' + year;
	var currentTime = currentDate + "  " + currentHour;	
	return currentTime;	
}

