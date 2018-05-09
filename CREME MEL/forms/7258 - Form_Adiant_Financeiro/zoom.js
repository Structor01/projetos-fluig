function openZoom() {			
		window.open(
	"/webdesk/zoom.jsp?datasetId=Gestores&dataFields=Colaborador,Colaborador,Email,Email&resultFields=Matricula,Colaborador,Email&type=Gestores&title=zoom", "zoom" , "status , scrollbars=no ,width=400, height=350 , top=0 , left=0"
		);
}

function setSelectedZoomItem(selectedItem) {
    document.Form_Sol_Adiant_Financeiro.GestCol.value=selectedItem.Colaborador;
	document.Form_Sol_Adiant_Financeiro.GestMat.value=selectedItem.Matricula;
}