$(document).ready(function () {
    getRamais();

    $('#buscaRamal').on('keypress keyup blur focus', function () {
        if($(this).val() != '') {
            $('#rowsRamais').html('');
            var html = '';

            for(var i in RAMAIS.values) {
                var rec = RAMAIS.values[i];
                var nome = rec.nome == 'undefined' || rec.nome == null ? '' : rec.nome;
                var email = rec.email == 'undefined' || rec.email == null ? '' : rec.email;
                var ramal = rec.ramal == 'undefined' || rec.ramal == null  ? '' : rec.ramal;
                var unidade = rec.Unidade == 'undefined' || rec.Unidade == null  ? '' : rec.Unidade;
                var cargo = rec.cargo == 'undefined' || rec.cargo == null  ? '' : rec.cargo;
                var celular = rec.Celular == 'undefined' || rec.Celular == null  ? '' : rec.Celular;
                var telefone = rec.telefone == 'undefined' || rec.telefone == null  ? '' : rec.telefone;
                var dtNascimento = rec.DatedeNascimento == 'undefined' || rec.DatedeNascimento == null  ? '' : rec.DatedeNascimento;

                var link = '';


                if(
                    nome.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    email.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    cargo.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    unidade.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    celular.toUpperCase().indexOf($(this).val().toUpperCase()) > -1 ||
                    ramal.toUpperCase().indexOf($(this).val().toUpperCase()) > -1
                ) {

                    html += '<tr onclick="goToUser(this)" style="cursor: pointer">' +
                        '	<td>' + nome + '</td>' +
                        '	<td class="mail">' + email + '</td>' +
                        '	<td>' + dtNascimento + '</td>' +
                        '	<td>' + telefone + '</td>' +
                        '	<td>' + celular + '</td>' +
                        '	<td>' + ramal + '</td>' +
                        '	<td>' + unidade + '</td>' +
                        '	<td>' + rec.cargo + '</td>' +
                        '</tr>';
                }
            }

            $('#rowsRamais').html(html);
        } else {
            return paginate(PAGE[0],PAGE[1]);
        }

    });
});

RAMAIS = {};
PAGE = [];
var MAX_LENGHT = 10;

function paginate(min, max) {
    $('#rowsRamais').html('');
    var html = '';
    PAGE = new Array();
    for(var i=min; i < max; i++) {
        var rec = RAMAIS.values[i];
        var nome = rec.nome == 'undefined' || rec.nome == null ? '' : rec.nome;
        var email = rec.email == 'undefined' || rec.email == null ? '' : rec.email;
        var ramal = rec.ramal == 'undefined' || rec.ramal == null  ? '' : rec.ramal;
        var unidade = rec.Unidade == 'undefined' || rec.Unidade == null  ? '' : rec.Unidade;
        var cargo = rec.cargo == 'undefined' || rec.cargo == null  ? '' : rec.cargo;
        var celular = rec.Celular == 'undefined' || rec.Celular == null  ? '' : rec.Celular;
        var telefone = rec.telefone == 'undefined' || rec.telefone == null  ? '' : rec.telefone;
        var dtNascimento = rec.DatedeNascimento == 'undefined' || rec.DatedeNascimento == null  ? '' : rec.DatedeNascimento;

        html += '<tr onclick="goToUser(this)" style="cursor: pointer">' +
            '	<td>' + rec.nome + '</td>' +
            '	<td class="mail">' + rec.email + '</td>' +
            '	<td>' + dtNascimento + '</td>' +
            '	<td>' + telefone + '</td>' +
            '	<td>' + celular + '</td>' +
            '	<td>' + ramal + '</td>' +
            '	<td>' + unidade + '</td>' +
            '	<td>' + rec.cargo + '</td>' +
            '</tr>'
    }

    PAGE.push(min, max);

    $('#rowsRamais').html(html);
}

function editCad() {
    if(top.WCMAPI.userLogin == 'publico.sebrae-go.com.br.1')
        location.assign('http://fluig.sebraego.com.br/portal/p/1/externos/cadastra_ramais_externo');
    else
        location.assign('http://fluig.sebraego.com.br/portal/p/1/cadastro-ramais');
}

function goToUser(e) {
    var constraints = new Array();
    var email = $(e).find('.mail').html();
    constraints.push(DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST));
    var colleague = DatasetFactory.getDataset("colleague", null, constraints, null);
    colleague.values.length > 0 ?
    window.open('http://fluig.sebraego.com.br/portal/p/1/social/'+colleague['values'][0]['login'],'_blank') :
        false;
}

function getRamais() {
    var html;
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("ramal", "undefined", "undefined", ConstraintType.MUST_NOT));
    constraints.push(DatasetFactory.createConstraint("ramal", "", "", ConstraintType.MUST_NOT));
    RAMAIS = DatasetFactory.getDataset("dsRamais", null, constraints, null);
    return paginate(0,MAX_LENGHT);
}

function nextP() {
    PAGE[1]+MAX_LENGHT <= RAMAIS.values.length ? paginate(PAGE[0]+MAX_LENGHT, PAGE[1]+MAX_LENGHT) : false;
}

function prevP() {
    PAGE[0] != 0 ? paginate(PAGE[0]-MAX_LENGHT, PAGE[1]-MAX_LENGHT) : false;
}