function setSelectedZoomItem(selectedItem) {
  if(selectedItem.inputId == "ZoomSolicitante"){
    $('#codigoSolicitante').val(selectedItem["FLUIG"]);
  }
  if(selectedItem.inputId == "zoomGrupoProduto"){
    $('#codGrupo').val(selectedItem["CCODIGO"]);
  }
}
