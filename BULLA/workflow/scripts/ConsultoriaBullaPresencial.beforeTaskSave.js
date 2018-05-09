function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    if(nextSequenceId == 9) {
        var attachments = hAPI.listAttachments();
        if(attachments.size() > 0) {
            log.warn('--Debbug Docs: '+attachments.size());
            var text = '';
            var hasAttachment = new Array();
            for (var i = 0; i < attachments.size(); i++) {
                var attachment = attachments.get(i);
                var description = attachment.getDocumentDescription();
                description = description.split('_');
                log.warn('--Debbug description: ' + description[0]);
                log.warn('--Debbug hasAttachment: ' + hasAttachment);

                if (description[0] == "IF" || description[0] == "SIMPLES") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir o Extrato de Imposto";
                }

                if (description[0] == "SBC") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir o Saldo Bancário";
                }

                if (description[0] == "PB") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir a Planta Baixa";
                }

                if (description[0] == "RC") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir o Relatório de Coleta";
                }

                if (description[0] == "OCO") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir o DLP e DFC de Coleta";
                }

                if (description[0] == "QF") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir o Quadro de Funcionários";
                }

                if (description[0] == "FCO") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir as Fotos do Concorrente";
                }

                if (description[0] == "FF") {
                    hasAttachment.push(description[0]);
                } else {
                    if(hasAttachment.indexOf(description[0]) > -1) continue;
                    text = "Favor inserir as Fotos da Farmácia";
                }
            }

            if(hasAttachment.length < 7) throw text;

        } else {
            throw 'Por favor, insira os Documentos para Coleta.'
        }
    }
}