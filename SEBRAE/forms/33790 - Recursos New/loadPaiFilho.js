function loadPaiFilho(type){
	  
	  var numforms= document.getElementById("documentIdPai").value;	
	  var tpLocalidade= document.getElementById("tpParticipante").value;	
	  var mydata = new Array();
	  var fields = new Array(numforms);
	  
	  switch (type) {
	    case "CC":
	    	var datasetCC = DatasetFactory.getDataset("fs_sav_faeg_solicitacao_viagem_pai_filho_CC", fields, new Array(), new Array());
	  	  	dataCC(numforms, mydata, datasetCC);
	        break;
	  }
   
}

function dataCC(numforms, mydataCC, datasetCC) {
	 for (var i = 0; i < datasetCC.values.length; i++) {
			if (datasetCC.values[i]["NumFormulario"] == numforms){	
			  var group = {
		    	          id: datasetCC.values[i]["idCentroCusto"],
		    			  name: datasetCC.values[i]["dsCentroCusto"],
		    	        };
		    	     mydataCC.push( group );
			}	     
		  }
	    var myTableCC = FLUIGC.datatable('#tableDatasetCC', {
		     dataRequest: mydataCC,
		     renderContent: ['id', 'name'],
		     header: [
		         {'title': 'C&oacute;digo'},
		         {'title': 'Centro de Custo'}
		     ],
		    search: {
		        enabled: false	        
		    },
		    scroll: {
		    	enabled: false
		    },
		    navButtons: {
		        enabled: false
		    },
		    emptyMessage: '<div class="text-center">Não possui dados.</div>',
		    tableStyle: 'table-striped',
		    draggable: {
		        enabled: false,
		        onDrag: function(dragInfo) {
		            // Do something
		            return false; // If it returns false, will cancel the draggable
		        }
		    }
		 }, function(err, data) {
		 
			 // DO SOMETHING (error or success)
		 });
}

