
var beforeSendValidate = function(numState, nextState){
  $('.has-error').removeClass('has-error');
  if($('[id*=tr_itemPlano___]').length == 0) throw "Por favor, insira ao menos um registro no plano de ação.";
  var v = $('.ob').length;
  var correto = true;
  for(var i=0; i<v; i++) {
    var value = $('.ob:eq('+i+')').children('.form-control').val();
    if($('.ob:eq('+i+')').is(":visible") && (value == "" || value == undefined || value == null)) {
      $('.ob:eq('+i+')').addClass('has-error');
      correto = false;
    }
    console.log(value);
  }
  if(correto == false) throw "Por favor, preencha os campos em vermelho";
}

/* ---------------- */

var myCalarr = new Array();

function setStatus(color, idx, status) {
  $('#statusCor___'+idx).parent('td').css('background', color);
  $('#_statusItem___'+idx).val(status);
}

function moverSol(e) {
  var sol = $(e).parent().parent().find('.verSol').children().html();
  var that = $(e);
  var myModal = FLUIGC.modal({
    title: 'Atenção!',
    content: '<p>Esta acão moverá a solicitação '+sol+'. Deseja continuar?</p>',
    id: 'fluig-modal',
    actions: [{
      'label': 'Sim',
      'bind': 'data-mov',
      'buttonType':'submit',
      'autoClose': true
    },{
      'label': 'Fechar',
      'autoClose': true
    }]
  }, function(err, data) {
    if(err) {
      // do error handling
    } else {
      // do something with data
    }
  });

  $(document).on('click', '[data-mov]', function(ev) {
    var c1 = DatasetFactory.createConstraint("user", $('#matricula').val(), $('#matricula').val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("sol",parseInt(sol),parseInt(sol), ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("action", "move", "move", ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("dsAlteraSolicitacao", null, new Array(c1,c2, c3), null);
    var rs = dataset.values[0]["Result"];
    if(rs == "OK") {
      window.document.getElementById('workflowView-cardViewer').contentDocument.location.reload(true);
    }
  });
}

function assumirSol(e) {
  var sol = $(e).parent().parent().find('.verSol').children().html();
  var that = $(e);

  var c1 = DatasetFactory.createConstraint("User", $('#matricula').val(), $('#matricula').val(), ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint("Solicitação", sol, sol, ConstraintType.MUST);
  var dataset = DatasetFactory.getDataset("dsVerificaAtividade", null, new Array(c1,c2), null);
  var atv;

  if(dataset == undefined)
    atv = 'C';
  else
    atv = dataset.values[0]["Atividade"];

  var myModal = FLUIGC.modal({
    title: 'Atenção!',
    content: '<p>Você assumirá a solicitação '+sol+'. Deseja continuar?</p>',
    id: 'fluig-modal',
    actions: [{
      'label': 'Sim',
      'bind': 'data-assume',
      'buttonType':'submit',
      'autoClose': true
    },{
      'label': 'Fechar',
      'autoClose': true
    }]
  }, function(err, data) {
    if(err) {
      // do error handling
    } else {
      // do something with data
    }
  });

  $(document).on('click', '[data-assume]', function(ev) {
    var c1 = DatasetFactory.createConstraint("user", $('#matricula').val(), $('#matricula').val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("sol",parseInt(sol),parseInt(sol), ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("action", "assume", "assume", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("atv", parseInt(atv), parseInt(atv), ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset("dsAlteraSolicitacao", null, new Array(c1,c2,c3,c4), null);
    var rs = dataset.values[0]["Result"];
    if(rs == "OK") {
      window.document.getElementById('workflowView-cardViewer').contentDocument.location.reload(true);
    }
  });
}

function cancelarSol(e) {
  var sol = $(e).parent().parent().find('.verSol').children().html();
  var that = $(e);
  var myModal = FLUIGC.modal({
    title: 'Atenção!',
    content: '<p>Esta acão cancelará a solicitação '+sol+'. Deseja continuar?</p>',
    id: 'fluig-modal',
    actions: [{
      'label': 'Sim',
      'bind': 'data-cancel',
      'buttonType':'submit',
      'autoClose': true
    },{
      'label': 'Fechar',
      'autoClose': true
    }]
  }, function(err, data) {
    if(err) {
      // do error handling
    } else {
      // do something with data
    }
  });

  $(document).on('click', '[data-cancel]', function(ev) {
    var c1 = DatasetFactory.createConstraint("user", $('#matricula').val(), $('#matricula').val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("sol",parseInt(sol),parseInt(sol), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("action", 'cancel', 'cancel', ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset("dsAlteraSolicitacao", null, new Array(c1,c2, c3), null);
    var rs = dataset.values[0]["Result"];
    if(rs == "OK") {
      window.document.getElementById('workflowView-cardViewer').contentDocument.location.reload(true);
    }
  });
}

// Modal para aprovação da Ação;
function msgAlert(e) {
  var t = $(e).parent().parent().parent().find('[id*=_causa___]').val();
  var idx = $(e).parent().parent().parent().find('[id*=_causa___]').attr('id').replace('_causa___','');
  var c = "";
  c += '<div class="form-group col-md-12">';
    c += '<label>Aprovado?</label>';
    c += '<select class="form-control" name="aprovado___'+idx+'">';
    c += '<option value="">Selecione</option>';
    c += '<option value="S">Sim</option>';
    c += '<option value="N">Não</option>';
    c += '</select>';
  c += '</div>';
  c += '<div class="form-group col-md-12 obs">';
    c += '<label>Observação</label>';
    c += '<textarea class="form-control" rows="3" name="obs___'+idx+'"></textarea>';
  c += '</div>';

  var myModal = FLUIGC.modal({
    title: 'Aprovação',
    content: c,
    id: 'fluig-modal',
    actions: [{
      'label': 'Salvar',
      'bind': 'data-save',
      'buttonType':'submit'
    },{
      'label': 'Fechar',
      'autoClose': true
    }]
  }, function(err, data) {
    if(err) {
      // do error handling
    } else {
      // do something with data
    }
  });

  $(document).on('click', '[data-save]', function(ev) {
    $('[aprovado___'+idx+']').val($('[aprovado___'+idx+']').val());
  });
}

$(document).ready(function() {
  // css das opcões
  $('.opt span').css('margin','0.5rem');
  $('.opt span').css('cursor','pointer');

  // Bloqueia campos que devem ser preenchidos pelo processo Ação
  // $('[data-acao]').prop('readonly', true);
  if(state != 0 && state != 4) {
    $('[data-acao]').show();
    $('[data-mover]').hide();
    $('[data-cancelar]').show();
    $('[data-assumir]').show();
    $('#inputAdicionar').hide();
    $('.delPaiFilho').hide();
    $('.zoomIn').hide();
    $('[name=verSol]').parent().removeClass('hide');
    // $("[id*=causa___]").prop('readonly', true);
    // $("[id*=acao___]").prop('readonly', true);
    // $("[id*=setor___]").prop('disabled', true);
    // $("[id*=resp___]").prop('disabled', true);
  } else {
    $('[data-acao]').hide();
    $('[data-mover]').hide();
    $('[data-cancelar]').hide();
    $('[data-assumir]').hide();
  }

  if(state == 21) {
    $('[id*=statusCor___]').parent('td').css('background', 'grey');
    $('[id*=statusItem___]').val('Tarefa Recebida');

    var status, c1, c2;
    var nSol = $('#nSol').val();
    nSol = nSol.split(',');
    var l = $('.verSol').length;
    for(var i=1; i<=l; i++) {
      $('.verSol').eq(i).children('a').html(nSol[i]);
      $('.verSol').eq(i).children('a').attr('href','http://fluig.crememel.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+nSol[i]);
    }

    $('[id*=tr_itemPlano___]').each(function(){
      var that = $(this);
      var idx = that.attr('id').replace('tr_itemPlano___','');
      var userid = $('#resp_id___'+idx).val();
      var sol = parseInt(that.find('.verSol').children('a').html());
      c1 = DatasetFactory.createConstraint("User", userid, userid, ConstraintType.MUST);
      c2 = DatasetFactory.createConstraint("Solicitação", sol, sol, ConstraintType.MUST);
      var dataset = DatasetFactory.getDataset("dsVerificaAtividade", null, new Array(c1,c2), null);
      var atv;
      if(dataset == undefined)
        atv = 'C';
      else
        atv = dataset.values[0]["Atividade"];

      if(atv == 8) {
        setStatus("Gold", idx, "Em Andamento");
        $('#_dtInicial___'+idx).val(dataset.values[0]["Inicial"]);
        $('#_prazoConclusao___'+idx).val(dataset.values[0]["Final"]);
        $('#tr_itemPlano___'+idx).children().eq(2).find('[data-mover]').show();
      }
      if(atv == 6) {
        setStatus("DeepSkyBlue", idx, "Definindo Prazo");
      }
      if(atv == 10) {
        setStatus("LightGreen", idx, "Aguardando Aprovação");
        $('#_dtInicial___'+idx).val(dataset.values[0]["Inicial"]);
        $('#_prazoConclusao___'+idx).val(dataset.values[0]["Final"]);
        $(this).children().find('.aprova').removeClass('hide');
      }
      if(atv == 14) {
        setStatus("Black", idx, "Finalizado");
        $('#_dtInicial___'+idx).val(dataset.values[0]["Inicial"]);
        $('#_prazoConclusao___'+idx).val(dataset.values[0]["Final"]);
      }
      if(atv == 'C') {
        setStatus("Red", idx, "Cancelado");
        $(this).find('[data-cancelar]').children().html('Cancelado');
      }
    });

  }

  $('#inputAdicionar').click(function() {
    var idx = wdkAddChild('itemPlano');

    /*  Cor lateral que define o Status
    Incio Azul */
    $('#statusCor___'+idx).parent('td').css('background', 'grey');


    // Permite a utilização do calendário para definir data em tabelas Pai X Filho
    // var calend = FLUIGC.calendar('#dt_ferias___'+idx, {
    //   pickDate: true,
    //   pickTime: false
    // });
    //
    // myCalarr.push(calend);
    // console.log('Count=' + i);
  });
});

function delPaiFilho(e) {
  Javascript:fnWdkRemoveChild(e);
  // valorTotal();
}

function zoomIn(e) {
  $(e).parent().parent().parent().find('.zoomIn').toggle();
}

// ZOOM
function setSelectedZoomItem(selectedItem) {
  if(selectedItem.inputId.indexOf("resp___") > -1 ){
    var id = selectedItem.inputId.split("___")[1];
    $('#resp_id___'+id).val(selectedItem["colleagueId"]);
  }
  if(selectedItem.inputId == 'coGest'){
    $('#coGest_id').val(selectedItem["colleagueId"]);
  }
  // if(selectedItem.inputId.indexOf("setor___") > -1 ){
  //   var id = selectedItem.inputId.split("___")[1];
  //   $('#setor_id___'+id).val(selectedItem["colleagueId"]);
  // }
}
