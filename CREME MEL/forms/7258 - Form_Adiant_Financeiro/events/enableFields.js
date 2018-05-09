function enableFields(form){ 
    numAtividade = parseInt(getValue("WKNumState"));

    form.setEnabled("aprova",false);
    form.setEnabled("aprova_detalhe",false);

    switch(numAtividade) { 
     case 0:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;
     case 1:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;
     case 2:
	form.setEnabled("aprova",true);
	form.setEnabled("aprova_detalhe",true);
	break;
     case 3:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;
     case 4:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;
     case 5:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;
     case 6:
	form.setEnabled("aprova",false);
        form.setEnabled("aprova_detalhe",false);
	break;

  }
}