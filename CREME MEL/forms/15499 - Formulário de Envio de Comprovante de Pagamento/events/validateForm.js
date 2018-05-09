function validateForm(form){
  if(form.getValue('ecp_pedidoVenda').trim() == "") {
	  throw "Informe pedido de venda!";
  }

  if(form.getValue('ecp_codigoCliente').trim() == "") {
	  throw "Informe o Código do Cliente!";
  }

  if(form.getValue('ecp_filial').trim() == "") {
	  throw "Informe a Filial!";
  }
}
