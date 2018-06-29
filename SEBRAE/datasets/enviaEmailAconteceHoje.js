function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("EnviouEmail");
    try{
        //Monta mapa com parâmetros do template
        var parametros = new java.util.HashMap();
        parametros.put("TODAY_DATE", "Teste");
        parametros.put("BODY_EMAIL", "Teste");

        //Este parâmetro é obrigatório e representa o assunto do e-mail
        parametros.put("subject", "Acontece hoje!");

        //Monta lista de destinatários
        var destinatarios = new java.util.ArrayList();

        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                if (constraints[i].fieldName == "to") {
                    destinatarios.add(constraints[i].initialValue);
                }
            }
        }
        notifier.notify("xuku1xhwrsq2n8jj1505395346785", "eventoDia", parametros, destinatarios, "text/html");
        dataset.addRow(new Array("sim"));
    } catch(e) {
        log.info(e);
        dataset.addRow(new Array(e));
    }
    return dataset;
}