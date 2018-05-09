function displayFields(form,customHTML){
    customHTML.append('<script>');
    customHTML.append('var numState = "'+getValue('WKNumState')+'";');
    customHTML.append('var numSol = "'+getValue('WKNumProces')+'";');
    customHTML.append('</script>');
}