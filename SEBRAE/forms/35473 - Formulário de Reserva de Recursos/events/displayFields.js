function displayFields(form, customHTML) {
    log.info('=================== getFormMode() '+form.getFormMode());
    if (form.getFormMode() == "MOD" || form.getFormMode() == "ADD"){

        var numActivity = getValue('WKNumState')
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
        var constraints = new Array(c1);
        var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);


        if (form.getValue('dsQuantidade') == ""){
            form.setValue('dsQuantidade', 1);
        }
        if (numActivity == 0 || numActivity == 4){
            form.setValue("solicitanteInformado", colaborador.getValue(0, "colleagueName"));
        }

        if(numActivity != 0 && numActivity != 4) {
            form.setEnabled('recurso', false);
            form.setEnabled('qtSolicitada', false);
            form.setEnabled('dtInicio', false);
            form.setEnabled('dtFinal', false);
            form.setEnabled('solicitanteInformado', false);
            form.setEnabled('rcBolacha', false);
            form.setEnabled('rcEquipamentos', false);
            form.setEnabled('rcFilme', false);
            form.setEnabled('rcSala', false);
            form.setEnabled('rcCha', false);
            form.setEnabled('rcCafe', false);
            form.setEnabled('rcParticipante', false);
            form.setEnabled('rcFinalidade', false);
            form.setEnabled('rcObservacao', false);
            form.setEnabled('rcParticipanteObs', false);
            form.setEnabled('rcFinalidadeObs', false);
            form.setEnabled('rcObservacaoObs', false);
        }
    }
    /*InteraÃ§Ã£o com o HTML*/
    customHTML.append("<script>function getWKNumState(){ return " + getValue('WKNumState') + ";}</script>");
}

