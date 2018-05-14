function displayFields(form,customHTML){
    var html = '<script> var mode = "' + form.getFormMode() + '"; var task = "'+getValue('WKNumState')+'" </script>';
    customHTML.append(html);

    if(getValue('WKNumState') != 0 && getValue('WKNumState') != 1) {
        form.setEnabled('nome', false);
        form.setEnabled('tipoUniforme', false);
        form.setEnabled('tamanho', false);
        form.setEnabled('quantidade', false);
    }
}