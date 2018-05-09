$(document).ready(function () {
    getCAD();

    $('#buscaCad').on('keypress keyup blur focus', function () {
        if($(this).val() != '') {
            $('#rowsCAD').html('');
            var html = '';
            for(var i in CAD.values) {
                var rec = CAD.values[i];
                var cod = rec.cod == 'undefined' ? '' : rec.cod;
                var fantasia = rec.fantasia == 'undefined' ? '' : rec.fantasia;
                var razaoSocial = rec.razaoSocial == 'undefined' ? '' : rec.razaoSocial;
                var doc = rec.doc == 'undefined' ? '' : rec.doc;
                var email = rec.email == 'undefined' ? '' : rec.email;
                var telefoneComercial = rec.telefoneComercial == 'undefined' ? '' : rec.telefoneComercial   ;

                if(
                    cod.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    fantasia.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    razaoSocial.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    doc.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    email.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    telefoneComercial.toUpperCase().indexOf($(this).val().toUpperCase()) > -1
                ) {

                    html += '<tr>' +
                        '	<td>' + fantasia + '</td>' +
                        '	<td>' + razaoSocial + '</td>' +
                        '	<td>' + doc + '</td>' +
                        '	<td>' + email + '</td>' +
                        '	<td>' + telefoneComercial + '</td>' +
                        '	<td class="fs-cursor-pointer" onclick="openCliente('+cod+')"><span class="fluigicon fluigicon-info-sign fluigicon-sm"></span></td>' +
                        '</tr>'
                }
            }

            $('#rowsCAD').html(html);
        } else {
            return paginate(PAGE[0],PAGE[1]);
        }

    });
});

CAD = {};
PAGE = [];
VALOR_TAB = 10;

function paginate(min, max) {
    $('#rowsCAD').html('');
    var html = '';
    PAGE = new Array();
    for(var i=min; i < max; i++) {
        var rec = CAD.values[i];
        if(rec == undefined) continue;
        var cod = rec.cod == 'undefined' ? '' : rec.cod;
        var fantasia = rec.fantasia == 'undefined' ? '' : rec.fantasia;
        var razaoSocial = rec.razaoSocial == 'undefined' ? '' : rec.razaoSocial;
        var doc = rec.doc == 'undefined' ? '' : rec.doc;
        var email = rec.email == 'undefined' ? '' : rec.email;
        var telefoneComercial = rec.telefoneComercial == 'undefined' ? '' : rec.telefoneComercial   ;

        html += '<tr>' +
            '	<td>' + fantasia + '</td>' +
            '	<td>' + razaoSocial + '</td>' +
            '	<td>' + doc + '</td>' +
            '	<td>' + email + '</td>' +
            '	<td>' + telefoneComercial + '</td>' +
            '	<td class="fs-cursor-pointer" onclick="openCliente('+cod+')"><span class="fluigicon fluigicon-info-sign fluigicon-sm"></span></td>' +
            '</tr>'
    }

    PAGE.push(min, max);

    $('#rowsCAD').html(html);
}

function getCAD() {
    var html;
    var constraints = new Array();
    CAD = DatasetFactory.getDataset("dsFarmacia", null, constraints, new Array('fantasia'));
    return paginate(0,10);
}

function nextP() {
    PAGE[1]+VALOR_TAB <= CAD.values.length+VALOR_TAB ? paginate(PAGE[0]+VALOR_TAB, PAGE[1]+VALOR_TAB) : false;
}

function prevP() {
    PAGE[0] != 0 ? paginate(PAGE[0]-VALOR_TAB, PAGE[1]-VALOR_TAB) : false;
}

function openCliente(e) {
    var constraints = [DatasetFactory.createConstraint("cod", e, e, ConstraintType.MUST)];
    var dt = DatasetFactory.getDataset("dsFarmacia", null, constraints, null);
    var dados = dt.values[0];
    var keys = Object.keys(dados);
    var contentModal = $('#contentModalNovaFarmacia').html();
    var myModal = FLUIGC.modal({
        title: 'Novo',
        content: '<div id="instanceModal">' + contentModal + '</div>',
        id: 'fluig-modal',
        size: 'full',
        actions: [{
            'label': 'Salvar',
            'bind': 'data-salvar',
            'classType': 'btn-success'
        }, {
            'label': 'Cancelar',
            'classType': 'btn-danger',
            'autoClose': true
        }]
    });

    getRegimeTributario();

    for(var i in keys) {
        $("[name='"+keys[i]+"']").val(dados[keys[i]]);
        $("[name='"+keys[i]+"']").prop('readonly', true);
    }

    $('.form-control').on('dblclick', function () {
       $(this).prop('readonly', false);
    });

    $('[data-salvar]').on('click', function () {
        var val = {};
        $('#instanceModal').find('input, textarea, select').each(function () {
            if($(this).attr('type') == 'radio' && !$(this).is(':checked')) return true;

            if($(this).is(':visible') && !$(this).attr('readonly'))
                val[$(this).attr('name')] = $(this).val();
        });

        var reg = insere(val, dados['metadata#id']);
        if(!reg.values[0]['ERROR']) {
            FLUIGC.toast({
                title: '',
                message: "Salvo com sucesso!",
                type: 'success'
            });
            location.reload(true);
            myModal.remove();
        } else {
            FLUIGC.toast({
                title: '',
                message: "Erro: "+reg.values[0]['ERROR'],
                type: 'danger'
            });
        }
    });

    mask();
}

function mask() {
    $('.date > .form-control').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');
    $('.cnpj').mask('00.000.000/0000-00');
    $('.cep').mask('00.000-000');
    $('.fone').mask('(00) 0000-0000#');
    $('.fone').on('blur', function () {
        $(this).val().length == 15 ? $(this).mask('(00) 0 0000-0000') : $(this).mask('(00) 0000-0000#');
    });
}

function getRegimeTributario() {
    $('[name=regimeTributario]').html('<option value="">Selecione</option>');
    var r = DatasetFactory.getDataset("dsRegimeTributario", null, null, null);
    var html = '';
    for(var i in r.values) {
        html += '<option value="'+r.values[i]['nome']+'">'+r.values[i]['nome']+'</option>';
    }
    $('[name=regimeTributario]').append(html);

    $('[name=tipoContrato]').html('<option value="">Selecione</option>');
    var r = DatasetFactory.getDataset("dsTiposdeContrato", null, null, null);
    var html = '';
    for(var i in r.values) {
        html += '<option value="'+r.values[i]['nome']+'">'+r.values[i]['nome']+'</option>';
    }
    $('[name=tipoContrato]').append(html);
}

function insere(val, id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CardId", id, "", ConstraintType.MUST));
    var keys = Object.keys(val);
    for(k in keys) {
        constraints.push(DatasetFactory.createConstraint("CardData", keys[k]+";" + val[keys[k]], "", ConstraintType.MUST));
    }
    return DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
}