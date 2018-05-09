function showColabDS(matricula, indice) {
	var fil = document.form_alt_ferias.unidade.value;
    if (fil=="0000") { 
        alert("Unidade deve ser selecionada.");  
		///// if (indice==1) {
        /////   document.form_alt_ferias.num_mat.focus();
		///// } else {
           document.getElementById("num_mat"+indice).focus();
		///// }   
    } else {
		if (fil=="0100") {var fil="0101";}
		var emp = fil.substr(0,2); 
		if (emp=="02") {var valemp = 3;} else {var valemp = 1;}
		var c1 = new DatasetFactory.createConstraint("empresa"  , emp, emp, ConstraintType.MUST);
		var c2 = new DatasetFactory.createConstraint("filial"   , fil, fil, ConstraintType.MUST);
		var c3 = new DatasetFactory.createConstraint("matricula", matricula.value, matricula.value, ConstraintType.MUST);
		var constraints = new Array(c1,c2,c3);
		// Define os campos para ordenação
		var sortingFields = new Array("empresa","filial","matricula");
		// Busca o dataset
		try {
	        var dataset = DatasetFactory.getDataset("consultaFuncionario", null, constraints, sortingFields);
			var localizou = false;
	        for(r = 0; r < dataset.values.length; r++) {
				var record = dataset.values[r];
				var codemp = "record[\"" + dataset.columns[0] + "\"]";
				var codfil = "record[\"" + dataset.columns[1] + "\"]";
				var codmat = "record[\"" + dataset.columns[2] + "\"]";
				if ( (eval(codemp)==valemp) && (eval(codfil)==fil) && (eval(codmat)==matricula.value) ) {
					var nomfun = "record[\"" + dataset.columns[3] + "\"]";
					var carfun = "record[\"" + dataset.columns[4] + "\"]";
					///// if (indice==1) {
					/////   document.form_alt_ferias.nome_col.value = eval(nomfun);
					/////   document.form_alt_ferias.quant_dias.focus();
					///// } else {
					   document.getElementById("nome_col"+indice).value = eval(nomfun);
					   document.getElementById("quant_dias"+indice).focus();
					///// }
					var localizou = true;
					break;
				}
			}
	        if (!localizou) {
				///// if (indice==1) {
		        /////   document.form_alt_ferias.nome_col.value = "NAO LOCALIZADO..."
		        /////   document.form_alt_ferias.num_mat.focus();
                ///// } else {
		           document.getElementById("nome_col"+indice).value = "NAO LOCALIZADO..."
		           document.getElementById("num_mat"+indice).focus();
				///// }   
	        }
		} catch(erro) {
			///// if (indice==1) {
	        /////   document.form_alt_ferias.nome_col.value = erro
	        /////   document.form_alt_ferias.num_mat.focus();
			///// } else {
	           document.getElementById("nome_col"+indice).value = erro
	           document.getElementById("num_mat"+indice).focus();
			///// }   
		}
    }
}

function openZoom() {			
		window.open(
	"/webdesk/zoom.jsp?datasetId=Gestores&dataFields=Colaborador,Colaborador,Email,Email&resultFields=Matricula,Colaborador,Email&type=Gestores&title=zoom", "zoom" , "status , scrollbars=no ,width=400, height=350 , top=0 , left=0"
		);
}

function setSelectedZoomItem(selectedItem) {
	document.form_alt_ferias.GestMat.value=selectedItem.Matricula;
	document.form_alt_ferias.GestCol.value=selectedItem.Colaborador;
	document.form_alt_ferias.GestEmail.value=selectedItem.Email;    
}


/*
function openZoom(chamado) {
	var matric = "";
    var filtro = "";
    var filial = document.form_alt_ferias.unidade.value;
    if (filial=="0000") {
    	alert("Unidade deve ser selecionada.");
    } else {
		var empres = filial.substr(0,2);
	    
	    if (chamado==99) {
	    	window.open(
	             "/webdesk/zoom.jsp?datasetId=Gestores&dataFields=Colaborador,Colaborador,Email,Email&resultFields=Matricula,Colaborador,Email&type=99&title=zoom", "zoom" , "status , scrollbars=no ,width=400, height=350 , top=0 , left=0"
	        );
	    } else {
		    if (filial == "0100") {
		    	var filial = "0101"; 
		    }
		    var filtro = "&likeField=filial&likeValue="+filial;  
		    if (empres=="01") {
		       var empres="1";
	           window.open("/webdesk/zoom.jsp?datasetId=consultaFuncionarioCremeMel&dataFields=empresa,Empresa,filial,Filial,matricula,Matricula,funcionario,Funcionario,cargo,Cargo&resultFields=empresa,filial,matricula,funcionario,cargo&type="+chamado+"&title=zoom"+filtro, "zoom" , "status , scrollbars=yes ,width=700, height=350 , top=0 , left=0");
		    } else {
		       var empres="3";
		       window.open("/webdesk/zoom.jsp?datasetId=consultaFuncionarioZecas&dataFields=empresa,Empresa,filial,Filial,matricula,Matricula,funcionario,Funcionario,cargo,Cargo&resultFields=empresa,filial,matricula,funcionario,cargo&type="+chamado+"&title=zoom"+filtro, "zoom" , "status , scrollbars=yes ,width=700, height=350 , top=0 , left=0");
		    }
	    }
    }
}


function setSelectedZoomItem(selectedItem) {
	if (selectedItem.type==99) {
       document.form_alt_ferias.GestMat.value   = selectedItem.Matricula;
       document.form_alt_ferias.GestCol.value   = selectedItem.Colaborador;
       document.form_alt_ferias.GestEmail.value = selectedItem.Email;    
	   }

	if (selectedItem.type==1) {
       document.form_alt_ferias.num_mat.value  = selectedItem.matricula;    
       document.form_alt_ferias.nome_col.value = selectedItem.funcionario;
       } 
    	   
    if (selectedItem.type>=2 && selectedItem.type<=15) {
       document.getElementById("num_mat"+selectedItem.type).value  = selectedItem.matricula; 
       document.getElementById("nome_col"+selectedItem.type).value = selectedItem.funcionario;
    } 
}
*/

