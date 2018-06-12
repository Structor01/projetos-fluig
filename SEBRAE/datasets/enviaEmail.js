function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Response");

    var obj = {
        "to" : "artfbgyn@gmail.com",
        "from" : "intra@sebraego.com.br",
        "subject" : "Bem vindo!",
        "templateId" : "eventoDia",
        "dialectId"  : "pt_BR",
        "param" : {
            "TODAY_DATE": "Teste",
            "BODY_EMAIL": "Teste",
        }
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://fluig.sebraego.com.br/api/public/alert/customEmailSender", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(obj);

    dataset.addRow(new Array(xhttp.responseText));

    // var response = JSON.parse(xhttp.responseText);
}

// function EnviarEmail() {
//     var api = "/api/public/alert/customEmailSender";
//     var obj = {
//         "to" : "artfbgyn@gmail.com",
//         "from" : "intra@sebraego.com.br",
//         "subject" : "Bem vindo!",
//         "templateId" : "eventoDia",
//         "dialectId"  : "pt_BR",
//         "param" : {
//             "TODAY_DATE": "Teste",
//             "BODY_EMAIL": "Teste",
//         }
//     }
//     var email = $.ajax({
//         async : false,
//         contentType: "application/json",
//         type : "post",
//         dataType : "json",
//         url : api,
//         data : JSON.stringify(obj),
//         success:function(obj){
//             console.log(obj)
//         }
//     });
// }