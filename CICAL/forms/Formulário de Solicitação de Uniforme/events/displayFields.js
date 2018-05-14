function displayFields(form,customHTML){
    var html = '<script> var mode = "' + form.getFormMode() + '"; var task = "'+getValue('WKNumState')+'" </script>';
    customHTML.append(html);
}