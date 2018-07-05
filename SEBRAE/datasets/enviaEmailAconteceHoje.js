function defineStructure() {
    addColumn("DataEv");
    addColumn("Cidade");
    addColumn("nEnvios");
    addColumn("travaSeguranca");
    setKey(new Array("DataEv"));
    addIndex(new Array("DataEv"));
}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("DataEv");
    dataset.addColumn("Cidade");
    dataset.addColumn("nEnvios");
    dataset.addColumn("travaSeguranca");

    try{
        //Monta mapa com parâmetros do template
        var parametros = new java.util.HashMap();

        var date = getDateNow();
        parametros.put("TODAY_DATE", date);
        // Push dos eventos salvos no formulário.
        var constraints1 = new Array();
        constraints1.push(DatasetFactory.createConstraint("nomeEvento", "", "", ConstraintType.MUST_NOT));
        constraints1.push(DatasetFactory.createConstraint("nomeEvento", "undefined", "undefined", ConstraintType.MUST_NOT));
        constraints1.push(DatasetFactory.createConstraint("dtInicio", date, date, ConstraintType.MUST));
        constraints1[2].setLikeSearch(true);
        var eventos = DatasetFactory.getDataset("dsEventos", null, constraints1, ["dtInicio"]);

        //Este parâmetro é obrigatório e representa o assunto do e-mail
        parametros.put("subject", "Acontece hoje!");

        //Monta lista de destinatários
        var destinatarios = new java.util.ArrayList();
        var travaSeguranca = false;

        // log.info("--CONSTRAINTS " + constraints.toString());
        if (constraints != null) {
            // log.info("--CONSTRAINTS " + constraints.toString());
            for (var i = 0; i < constraints.length; i++) {
                if (constraints[i].fieldName == "travaSeguranca") {
                    travaSeguranca = true;
                    log.info('-- Trava Segurança TRUE')
                }
            }
        }

        var n = getHourNow();

        if(n == 9) {
            travaSeguranca = true;
        }

        destinatarios.add("1busy9shy78nqwqx1528812081880");
        log.info('--EVENTOS-- ' + eventos.rowsCount);
        var nEnvios = 0;

        var active = DatasetFactory.createConstraint("active", 'true', 'true', ConstraintType.MUST);
        active = new Array(active);
        var colleague = DatasetFactory.getDataset("colleague", null, active, null);

        for(var j=0; j < colleague.rowsCount; j++) {
            // destinatarios.add(colleague.getValue(j, "colleaguePK.colleagueId"));
            log.info('envio email: ' + colleague.getValue(j, "colleaguePK.colleagueId"));
            nEnvios++;
        }

        if(eventos.rowsCount > 0) {
            log.info('--Tem Eventos');

            var html = '<table>';
            for(var i=0; i < eventos.rowsCount; i++) {
                var codCidade = eventos.getValue(i, "codCidade");
                log.info('--CODCIDADE-- ' + codCidade);
                var descCidade = 'GOIANIA';
                log.info('--CIDADE-- ' + descCidade);
                var c1 = DatasetFactory.createConstraint("codCidade", parseInt(codCidade), parseInt(codCidade), ConstraintType.MUST);
                c1 = new Array(c1);
                var cidades = DatasetFactory.getDataset("dsCidades", null, c1, null);
                var cid = cidades.getValue(0, "descricaoCidade");
                var nomeEvento = cidades.getValue(i,"nomeEvento");
                var dtInicio = eventos.getValue(i,"dtInicio");
                var dtFinal = eventos.getValue(i,"dtFinal");
                html +=
                    '<tr>' +
                    '<td>' +
                    '   <small style="color: grey">'+ dtInicio + ' - ' + dtFinal + '</small>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><h3><a href="http://fluig.sebraego.com.br/portal/p/1/listaEventos">'+ cid +
                        ' | '+ nomeEvento +'</td>' +
                    '</a></h3></tr>';

                dataset.addRow(new Array(
                    dtInicio,
                    cid,
                    nEnvios,
                    travaSeguranca.toString()
                ));
            }
            html += '</table>';
            parametros.put("BODY_EMAIL", html);

            if(travaSeguranca == true) {
                log.info('--ENVIOU EMAIL--');
                notifier.notify("xuku1xhwrsq2n8jj1505395346785", "eventoDia", parametros, destinatarios, "text/html");
            } else {
                log.info('--NAO ENVIOU EMAIL--');
            }
        }
    } catch(e) {
        log.info(e);
        dataset.addRow(new Array(e));
    }
    return dataset;
}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = day + '/' + month + '/' + year;
    // var currentTime = currentDate + "  " + currentHour;
    return currentDate;
}

function getHourNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = day + '/' + month + '/' + year;
    // var currentTime = currentDate + "  " + currentHour;
    return hour;
}

function getCidade(e) {
    var c1 = DatasetFactory.createConstraint("codCidade", parseInt(e), parseInt(e), ConstraintType.MUST)
    var cidadeCo = new Array();
    cidadeCo.push(c1);
    return DatasetFactory.getDataset("dsCidadesSAS", null, cidadeCo, null);
}