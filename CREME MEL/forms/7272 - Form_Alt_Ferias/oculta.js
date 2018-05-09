function desabilitar(){
         if (document.getElementById('naosei').checked==true) {
            ///// document.getElementById("dt_inicial").disabled = true; //Desabilitando
            ///// document.getElementById("dt_prog").disabled = true; //Desabilitando        
            ///// document.getElementById("nova_dt").disabled = true; //Desabilitando
				for(i = 1; i < 16; i++){
					document.getElementById("dt_inicial"+i).disabled = true; //Desabilitando
					document.getElementById("dt_prog"+i).disabled = true; //Desabilitando        
					document.getElementById("nova_dt"+i).disabled = true; //Desabilitando
				}
			}
         }
        
function habilitar() 
{
	if (document.getElementById('alteracao').checked==true) {
		///// document.getElementById("dt_inicial").disabled = true; //Desabilitando
	    ///// document.getElementById("dt_prog").disabled = false; //habilita_alteracao       
	    ///// document.getElementById("nova_dt").disabled = false; //habilita_alteracao
		
		for(i = 1; i < 16; i++){
			document.getElementById("dt_inicial"+i).disabled = true; //Desabilitando
			document.getElementById("dt_prog"+i).disabled = false; //habilita_alteracao        
			document.getElementById("nova_dt"+i).disabled = false; //habilita_alteracao
		}
	}
	else if (document.getElementById('inclusao').checked==true) {
	
		///// document.getElementById("dt_inicial").disabled = false; //habilita_inclusao
		///// document.getElementById("dt_prog").disabled = true; //Desabilitando        
		///// document.getElementById("nova_dt").disabled = true; //Desabilitando
		
		for(i = 1; i < 16; i++){
			document.getElementById("dt_inicial"+i).disabled = false; //habilita_inclusao
			document.getElementById("dt_prog"+i).disabled = true; //Desabilitando        
			document.getElementById("nova_dt"+i).disabled = true; //Desabilitando
		}
	}
}

