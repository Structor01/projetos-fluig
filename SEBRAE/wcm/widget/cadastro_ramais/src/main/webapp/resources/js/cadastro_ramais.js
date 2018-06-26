// function sinc() {
//     // var constraints = new Array(;
//     // constraints.push(DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST));
//     // var dt = getDataset(dataset, constraint);
//     // var val = getDefaultValues();
//     // for(var i in val) {
//     //     var criar = criaRegistro(33980);
//     //     if(criar.values[0]['Retorno']) {
//     //         insere(val[i], criar.values[0]['Retorno']);
//     //     }
//     // }
// }

var Registros = {};
var load = FLUIGC.loading(window);

function criaRegistro(id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
    return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
}

function getDataset(dataset, constraint) {
    return DatasetFactory.getDataset(dataset, null, constraint, null);
}

function getUser() {
    var email = top.WCMAPI.userEmail;
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Email", email, email, ConstraintType.MUST));
    return DatasetFactory.getDataset("dsRamais", null, constraints, null);
}

function jsUcfirst(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function maskFone(e) {
    var val = $(e).val().replace(/\D+/g, "");;
    val = val.split('');
    var v = '';

    for(var index in val) {
        if(index == 0)
            v += '('+val[index];
        else if(index == 1)
            v += val[index]+')';
        else if(index == 2)
            v += ' '+val[index];
        else if(index == 4 && val.length == 11)
            v += val[index];
        else if(index == 5 && val.length < 11)
            v += val[index]+'-';
        else if(index == 10) {
            v += val[index];
            v = v.slice(0, 4) + ' ' + v.slice(5,6) +' '+ v.slice(6,10)+'-' + v.slice(10,15);
        } else if(index < 11)
            v += val[index];
    }

    $(e).val(v);
}

function maskDt(e) {
    var val = $(e).val().replace(/\D+/g, "");;
    val = val.split('');
    var v = '';

    for(var index in val) {
        if(index == 2 || index == 4)
            v += '/'+val[index];
         else if(index <= 7)
            v += val[index];
    }

    $(e).val(v);
}

function getCargos() {
    var dt = getDataset('dsCargos', null);
    for(var i in dt.values) {
        var v = dt.values[i];
        $('#cargo').append('<option value="'+v['Cargo']+'">'+v['Cargo']+'</option>');
    }
}

function getUnidades() {
    var dt = getDataset('dsUnidades', null);
    for(var i in dt.values) {
        var v = dt.values[i];
        $('#Unidade').append('<option value="'+v['Unidade']+'">'+v['Unidade']+'</option>');
    }
}

$(document).ready(function () {

    getCargos();
    getUnidades();

    var url = window.location.href
    if(url.indexOf('externos') > -1) {
        $('#visualizacaoPagina').css({
            position:'fixed',
            top:'-10px',
            left:0
        });
    }

    var onlyDate = FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: false
    });

    $('.telefone').on('change click blur keydown keyup', function () {
        maskFone($(this));
    });

    $('#DatedeNascimento').on('change click blur keydown keyup', function () {
        maskDt($(this));
    });

    $('.pageTitle').parent().hide();
    var usr = getUser();

    if(usr.values.length == 0) {
        alert('Usuário não cadastrado.');
        $('.form-control').prop('readonly',false);

        $('#email').val(top.WCMAPI.userEmail);
        $('#email').prop('readonly', true);

        $('#novo').parent().removeClass('hide');

        $('#novo').on('click', function () {

            FLUIGC.loading(window).show();

            $('#cadRamal').find('.form-control').each(function (index) {
                var name = $(this).attr('name');
                if($(this).val())
                    Registros[name] = $(this).val();
            });

            var criar = criaRegistro(33980);
            if(!criar.values[0]['ERROR']) {

                var reg = insere(Registros, criar.values[0]['Retorno']);
                if(!reg.values[0]['ERROR']) {
                    FLUIGC.toast({
                        title: '',
                        message: "Salvo com sucesso!",
                        type: 'success'
                    });

                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            }
        });
    } else {
        var keys = Object.keys(usr.values[0]);
        Registros['id'] = usr.values[0]['metadata#id'];
        $('#cadRamal').find('.form-control').each(function (index) {
            $(this).attr('readonly', 'readonly');
            var name = $(this).attr('name');
            usr.values[0][name] == 'undefined' ? usr.values[0][name] = null : false;
            $(this).val(usr.values[0][name]);
            Registros[name] = $(this).val();
        });

        $('#editar').parent().removeClass('hide');

        $('#editar').on('click', function () {
            $('#cadRamal').find('.editable').removeAttr('readonly');
            $(this).parent().addClass('hide', function () {
                $('#salvar').parent().removeClass('hide');
                $('#cancelar').parent().removeClass('hide');
            });
        });

        $('#cancelar').on('click', function () {
            window.location.reload(true);
        });

        $('#salvar').on('click', function () {

            load.show();

            $('#cadRamal').find('.form-control').each(function (index) {
                var name = $(this).attr('name');
                if($(this).val())
                    Registros[name] = $(this).val();
            });

            var reg = insere(Registros, Registros['id']);
            if(!reg.values[0]['ERROR']) {
                FLUIGC.toast({
                    title: '',
                    message: "Editado com sucesso!",
                    type: 'success'
                });

                load.hide();

                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            } else {
                FLUIGC.toast({
                    title: '',
                    message: reg.values[0]['ERROR'],
                    type: 'danger'
                });
            }
        });
    }
});

function insere(val, id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CardId", id, "", ConstraintType.MUST));
    var keys = Object.keys(val);
    for(k in keys) {
        constraints.push(DatasetFactory.createConstraint("CardData", keys[k]+";" + val[keys[k]], "", ConstraintType.MUST));
    }
    return DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
}