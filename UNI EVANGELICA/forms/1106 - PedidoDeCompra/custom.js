var beforeSendValidate = function(numState,nextState){
  var solicitacaoId = $('#numeroPedidoProtheus').val();

  if(numState == "5") {
    $('[data-aprov]').each(function(index){
      if($('[data-aprov]').eq(index).attr('id').indexOf('aprovadoCamp___') > -1) {
        var idx = $('[data-aprov]').eq(index).attr('id').replace('aprovadoCamp___', '');
        var cItem = $('#item___'+idx).val();
        var status = $('#aprovadoCamp___'+idx).val();
        if(status == "") status = "L";
        if($('#parecerLiberacao').val() == 'C') status = "R";
        console.log('Item a ser reprovado: ' + cItem);
        var c1 = DatasetFactory.createConstraint('CIDPROTHEUS', solicitacaoId, solicitacaoId, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('CITEM', cItem, cItem, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint('CSTATUS', status, status, ConstraintType.MUST);
        var dtReprova = DatasetFactory.getDataset('dsReprovarItemPedidoCompra', null, new Array(c1, c2, c3), null);
        if(dtReprova.values[0]["RETORNO"] && dtReprova.values[0]["RETORNO"] == false) {
          throw("Erro com sincronização com o Protheus. Por favor, tente novamente!");
        }
      }
    });
  }

  var v = $('.ob').length;

  var correto = true;
  for(var i=0; i<v; i++) {
    if($('.ob:eq('+i+')').is(':visible') == false) continue;
    var value = $('.ob:eq('+i+')').children('.form-control').val();
    if(value == "" || value == undefined || value == null) {
      $('.ob:eq('+i+')').addClass('has-error');
      correto = false;
    }
    console.log(value);
  }

  if(correto == false) throw "Por favor, preencha os campos em vermelho";
  else
  $('.has-error').removeClass('has-error');
}

function setSelectedZoomItem(selectedItem) {
  if(selectedItem.inputId == "zoomColleagueParecer"){
    $('#ColleagueParecerId').val(selectedItem["colleagueId"]);
  }
}

$(document).ready(function() {
  if($('#justificativa').val().trim() == "") {
    $('.justificativa').hide();
  } else {
    $('.justificativa').show();
  }

  if(numState == 19) {
    window.parent.$("[data-send]").hide();
    window.parent.$("[data-take-decision]").hide();
    window.parent.$("[data-take-task]").hide();
    window.parent.$("#workflowActions").hide();
  }

  if(numState != 5) {
    $('.aprovacao').addClass('hide');
    $('[id*=aprovacao___]').hide();
    $('[data-iconaprov]').hide();
  }

  if(numState == 15) {
    $('.justifica').removeClass('hide');
    $('#dtJustifica').val(dtNow);
    $('#respJustifica').val(nomeUser);
  }

  if(numState == 35) {
    $('.parecer').removeClass('hide');
    $('#respParecer').val(nomeUser);
    $('#dtParecer').val(dtNow);
  }

  if(numState == 5) {

    $('#respAprov').val(nomeUser);
    $('#dtAprov').val(dtNow);
    $('#parecerLiberacao').change(function() {
      if($(this).val() == "P")
      $('.zoomColleagueParecer').removeClass('hide');
      else
      $('.zoomColleagueParecer').addClass('hide');
    });

    var solicitacaoId = $('#numeroSolicitacaoProtheus').val();
    var pedidoId = $('#numeroPedidoProtheus').val();

    /******* Cabeçalho do Pedido ********/
    var cCabecalho = DatasetFactory.createConstraint('CIDINISOLPROTHEUS', solicitacaoId, solicitacaoId, ConstraintType.MUST);
    var dtCabecalho = DatasetFactory.getDataset('dsPedidoCompraCabecalho', null, new Array(cCabecalho), null);
    if(dtCabecalho.values.length > 0) {
      $('#emissao').val(dtCabecalho.values[0]["CEMISSAO"]);
      $('#fornecedor').val(dtCabecalho.values[0]["CNOMEFORNECEDOR"]);
      $('#contato').val(dtCabecalho.values[0]["CCONTATO"]);
      $('#condicaoPagamento').val(dtCabecalho.values[0]["CDESCCONDICAO"]);
      $('#filial').val(getFilial(dtCabecalho.values[0]["CFILSOLICITAN"]));
      // $('#localEntrega').val(getFilial(dtCabecalho.values[0]["CFILENTREGA"]));
      $('#numeroCotacaoProtheus').val(dtCabecalho.values[0]["CIDCOTACAO"]);

      if(dtCabecalho.values[0]["CJUSTIFICATIVA"] == "")
      $('.justificativa').addClass('hide');
        else
      $('#justificativa').val(dtCabecalho.values[0]["CJUSTIFICATIVA"]);

      var cLink = dtCabecalho.values[0]["CLINK"];
      $('#verAnexo').children('a').attr('href', cLink.trim());
      $("[data-date]").val($("[data-date]").val().substring(6,8)+"/"+$("[data-date]").val().substring(4,6)+"/"+$("[data-date]").val().substring(0,4));
    }
  }

  getContent(numState);

});

function getDateNow() {
  var today = new Date();
  log.warn("--Debbug--Vinicius Entrada no display fields");
  var year = today.getFullYear();
  var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
  var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
  var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
  var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
  var currentHour = hour + ":" + minute + ":" + second;
  var currentDate = day + '/' + month + '/' + year;
  var currentTime = currentDate + "  " + currentHour;
  return currentTime;
}

function tudoEntregue(tipo) {
  console.log("tudoEntregue");
  var tabelaItensPedido = $("#tabelaItensPedido tbody [id*=tr_itensPedido___]");
  if(tipo == "val"){
    for(var i = 1, iLen = tabelaItensPedido.length; i <= iLen; i++){
      if($('#aprovadoCamp___' + i).val() == 'R') continue;
      if(parseFloat($("#quantidade___" + i).val()) == parseFloat($("#quantidadeEntregue___" + i).val())){
        return true;
      }
    }
    return false;
  } else {
    for(var i = 1, iLen = tabelaItensPedido.length; i <= iLen; i++){
      if($('#aprovadoCamp___' + i).val() == 'R') continue;
      if(parseFloat($("#quantidade___" + i).html()) == parseFloat($("#quantidadeEntregue___" + i).html())){
        return true;
      }
    }
    return false;
  }
}

function reprovar(e) {
  var obj = $(e);
  var parent = obj.parent('td');
  var idx = obj.attr('id').replace('aprovacao___', '');
  var val = obj.html();
  if(val == 'check_circle') {
    $('#aprovadoCamp___'+idx).val('R');
    $('#aprovadoCamp___'+idx).attr('data-aprov', 'R');
    obj.html('cancel');
    parent.css('background', 'red');
    FLUIGC.toast({
      title: '',
      message: "Item do pedido de compras será cancelado.",
      type: 'danger'
    });
  } else {
    $('#aprovadoCamp___'+idx).val('L');
    $('#aprovadoCamp___'+idx).attr('data-aprov', 'L');
    obj.html('check_circle');
    parent.css('background', 'green');
    FLUIGC.toast({
      title: '',
      message: "Item o pedido de compras será aprovado.",
      type: 'success'
    });
  }
}

function getContent(numState) {
  var c1 = DatasetFactory.createConstraint("choosedColleagueId", idUser, idUser, ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", WKNumProces, WKNumProces, ConstraintType.MUST);
  var c3 = DatasetFactory.createConstraint("choosedSequence", numState, numState, ConstraintType.MUST);
  var dtConsultaResp = DatasetFactory.getDataset("processTask", null, new Array(c1, c2, c3), null);
  var dtConsultaRespLenght = dtConsultaResp.values.length;

  if(dtConsultaRespLenght > 0) {
    var solicitacaoId = $('#numeroSolicitacaoProtheus').val();
    var pedidoId = $('#numeroPedidoProtheus').val();

    /******* Itens da Contação ********/
    var cCot = DatasetFactory.createConstraint("CIDINISOLPROTHEUS", solicitacaoId, solicitacaoId, ConstraintType.MUST);
    var datasetCot = DatasetFactory.getDataset("dsConsultaHistoricoCotacao", null, new Array(cCot), null);
    var dtCotLenght = datasetCot.values.length;
    $("#tabelaHistCotacao tbody [id*=tr_tabelaHistCot___]").remove();
    WdksetNewId('{"tabelaHistCotacao":0}');

    if(dtCotLenght > 0) {
      for(var j=0; j < dtCotLenght; j++) {
        var id = wdkAddChild('tabelaHistCotacao');
        $('#itemCot___'+id).val(datasetCot.values[j]["CITEMCO"]);
        $('#descricaoCot___'+id).val(datasetCot.values[j]["CDESCPRODUTO"]);
        $('#fornecedorCot___'+id).val(datasetCot.values[j]["CFORNECEDOR"]);
        $('#qtdCot___'+id).val(datasetCot.values[j]["NQUANT"]);
        $('#valorUnCot___'+id).val(datasetCot.values[j]["NVUNIT"]);
        $('#totalCot___'+id).val(datasetCot.values[j]["NTOTAL"]);
        $('#condPgCot___'+id).val(datasetCot.values[j]["CCOND"]);
        $('#entregaCot___'+id).val(datasetCot.values[j]["NPRAZO"]);
      }
    }

    /******* Itens do Pedido ********/

    var c1 = DatasetFactory.createConstraint("CIDINISOLPROTHEUS", solicitacaoId, solicitacaoId, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CIDINICIALPEDIDO", pedidoId, pedidoId, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("dsConsultaPedidoCompras", null, new Array(c1, c2), null);
    var dtLenght = dataset.values.length;

    if(numState == 19 || numState == 21 || numState == 26 || numState == 38) {

      $("#tabelaItensPedido tbody [id*=tr_itensPedido___]").each(function(index, el){
        var ap = true;
        var id = $(this).attr('id').replace('tr_itensPedido___', '');
        var item = $('#produto___'+id).val();
        for(var c=0; c<dtLenght; c++){
          var dtvalue = dataset.values[c]["CDESCPRODUTO"];
          if(item == dtvalue.trim()) {
            ap = true;
            $('#quantidadeEntregue___'+id).val(dataset.values[c]["NQTDENTREGUE"]);
            break;
          } else {
            ap = false;
          }
        }

        if(ap == false) {
          $(this).children('td:eq(0)').css('background','red');
        }
      });

      var tdEnt = tudoEntregue("val");

      if(tdEnt == true)
      $('#tipoEntrega').val('T');
      else
      $('#tipoEntrega').val('P');

    } else {
      $("#tabelaItensPedido tbody [id*=tr_itensPedido___]").remove();
      WdksetNewId('{"tabelaItensPedido":0}');

      console.log('Número de itens: '+ dtLenght);
      if(dtLenght > 0) {
        var valorTotalPedido=0;
        var valorDesconto = 0;
        for(var i=0; i < dtLenght; i++) {
          var id = wdkAddChild('tabelaItensPedido');
          var status = dataset.values[i]["CSTATUS"];
          $('#item___'+id).val(dataset.values[i]["CITEM"]);
          // $('#aprovadoCamp___'+id).val(status);

          if(status == "R")
          $('#tr_itensPedido___'+id).children('td:eq(0)').css('background', 'red');
          else
          $('#tr_itensPedido___'+id).children('td:eq(0)').css('background', 'green');

          $('#quantidade___'+id).val(dataset.values[i]["NQUANTIDADE"]);
          $('#quantidadeEntregue___'+id).val(dataset.values[i]["NQTDENTREGUE"]);
          $('#quantidadeEntregue___'+id).parent('div').removeClass('hide');
          $('#unidadeMedida___'+id).val(dataset.values[i]["CUM"]);
          $('#produto___'+id).val(dataset.values[i]["CDESCPRODUTO"]);
          $('#preco___'+id).val(dataset.values[i]["NPRECO"]);
          $('#desconto___'+id).val(dataset.values[i]["NDESCONTOTOTAL"]);
          $('#total___'+id).val(parseFloat(dataset.values[i]["NTOTAL"]) - parseFloat(dataset.values[i]["NDESCONTOTOTAL"]));
          valorTotalPedido = parseFloat(valorTotalPedido) + parseFloat(dataset.values[i]["NTOTAL"]);
          valorDesconto = parseFloat(valorDesconto) + parseFloat(dataset.values[i]["NDESCONTOTOTAL"]);
        }
        $('#valorFrete').val(dataset.values[0]["FRETE"]);
        $('#valorTotalPedido').val(valorTotalPedido);
        $('#valorDesconto').val(valorDesconto);
        $('#valorTotalIPI').val(parseFloat(valorTotalPedido) - parseFloat(valorDesconto) + parseFloat(dataset.values[0]["FRETE"]));

        var tdEnt = tudoEntregue("val");

        if(tdEnt == true)
        $('#tipoEntrega').val('T');
        else
        $('#tipoEntrega').val('P');
      }
    }

    $('.form-control').each(function(index){
      $('.form-control').eq(index).val($('.form-control').eq(index).val().trim());
    });

    $('.money').each(function(index){
      $('.money').eq(index).val(parseFloat($('.money').eq(index).val()).toFixed(2));
      // console.log($('.money').eq(index).val());
    });

    $('.money').mask("#.##0.00", {reverse: true});
    $('.money').mask("#.##0,00", {reverse: true});

  } else {

    $("#tabelaItensPedido tbody [id*=tr_itensPedido___]").each(function(index, el){
      var id = $(this).attr('id').replace('tr_itensPedido___', '');
      var ap = $('#aprovadoCamp___'+id).val();
      if(ap == 'R') {
        $(this).children('td:eq(0)').css('background','red');
        $('.verDetalhes:eq('+ parseInt(index + 1) +')').addClass('hide');
      }
    });

    if(numState != 19 && numState == 21 && numState == 26 && numState == 38) {
      var solicitacaoId = $('#numeroSolicitacaoProtheus').html();
      var pedidoId = $('#numeroPedidoProtheus').html();

      /******* Itens do Pedido ********/
      var c1 = DatasetFactory.createConstraint("CIDINISOLPROTHEUS", solicitacaoId, solicitacaoId, ConstraintType.MUST);
      var c2 = DatasetFactory.createConstraint("CIDINICIALPEDIDO", pedidoId, pedidoId, ConstraintType.MUST);
      var dataset = DatasetFactory.getDataset("dsConsultaPedidoCompras", null, new Array(c1, c2), null);
      var dtLenght = dataset.values.length;

      $("#tabelaItensPedido tbody [id*=tr_itensPedido___]").remove();
      WdksetNewId('{"tabelaItensPedido":0}');

      console.log('Número de itens: '+ dtLenght);
      if(dtLenght > 0) {
        var valorTotalPedido=0;
        var valorDesconto = 0;
        for(var i=0; i < dtLenght; i++) {
          var id = wdkAddChild('tabelaItensPedido');
          var status = dataset.values[i]["CSTATUS"];
          $('#item___'+id).html(dataset.values[i]["CITEM"]);
          // $('#aprovadoCamp___'+id).val(status);

          if(status == "R") {
            $('#tr_itensPedido___'+id).children('td:eq(0)').css('background', 'red');
            continue;
          } else
          $('#tr_itensPedido___'+id).children('td:eq(0)').css('background', 'green');

          $('#quantidade___'+id).html(dataset.values[i]["NQUANTIDADE"]);
          $('#quantidadeEntregue___'+id).html(dataset.values[i]["NQTDENTREGUE"]);
          $('#quantidadeEntregue___'+id).parent('div').removeClass('hide');
          $('#unidadeMedida___'+id).html(dataset.values[i]["CUM"]);
          $('#produto___'+id).html(dataset.values[i]["CDESCPRODUTO"]);
          $('#preco___'+id).html(dataset.values[i]["NPRECO"]);
          $('#desconto___'+id).html(dataset.values[i]["NDESCONTOTOTAL"]);
          $('#total___'+id).html(dataset.values[i]["NTOTAL"]);
          valorTotalPedido = parseFloat(valorTotalPedido) + parseFloat(dataset.values[i]["NTOTAL"]);
          valorDesconto = parseFloat(valorDesconto) + parseFloat(dataset.values[i]["NDESCONTOTOTAL"]);
        }
        $('#valorTotalPedido').html(valorTotalPedido);
        $('#valorDesconto').html(valorDesconto);
        $('#valorTotalIPI').html(parseFloat(valorTotalPedido) - parseFloat(valorDesconto));
        $('#valorFrete').html(0.00);

        var tdEnt = tudoEntregue("html");

        if(tdEnt == true)
        $('#tipoEntrega').html('T');
        else
        $('#tipoEntrega').html('P');
      }

      $('.form-control').each(function(index){
        $('.form-control').eq(index).html($('.form-control').eq(index).html().trim());
      });

      $('.money').each(function(index){
        $('.money').eq(index).html(parseFloat($('.money').eq(index).html()).toFixed(2));
        // console.log($('.money').eq(index).val());
      });

      $('.money').mask("#.##0.00", {reverse: true});
      $('.money').mask("#.##0,00", {reverse: true});
    }
  }
}

function getFilial(filial) {
  var cFilial = DatasetFactory.createConstraint('CFILEMP', filial, filial, ConstraintType.MUST);
  var dtCabecalho = DatasetFactory.getDataset('dsConsultaFilial', null, new Array(cFilial), null);
  var dtCabecalhoLenght = dtCabecalho.values.length;
  if(dtCabecalhoLenght > 0) {
    return dtCabecalho.values[0]["CNOMEFIL"];
  } else {
    return "Erro";
  }
}

function modalMaisDetalhes(item) {
  var solicitacaoId = $('#numeroSolicitacaoProtheus');
  var pedidoId = $('#numeroPedidoProtheus');

  if(solicitacaoId.is('input') && pedidoId.is('input')) {
    solicitacaoId = solicitacaoId.val();
    pedidoId = pedidoId.val();
  } else {
    solicitacaoId = solicitacaoId.html();
    pedidoId = pedidoId.html();
  }

  var c1 = DatasetFactory.createConstraint("CIDINISOLPROTHEUS", solicitacaoId, solicitacaoId, ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint("CIDINICIALPEDIDO", pedidoId, pedidoId, ConstraintType.MUST);
  var dataset = DatasetFactory.getDataset("dsConsultaPedidoCompras", null, new Array(c1, c2), null);
  var dtLenght = dataset.values.length;

  var id = $(item).parent().parent().parent().attr("id"); //obtem o id do elemento clicado
  var arr = id.split('___');

  var produto 				= $('#produto___'+arr[1]);
  var unidadeMedida 				= $('#unidadeMedida___'+arr[1]);
  var quantidade		 			= $('#quantidade___'+arr[1]);
  var preco	 					= $('#preco___'+arr[1]);
  var desconto 					= $('#desconto___'+arr[1]);
  var total		 				= $('#total___'+arr[1]);
  var ultimoQuantidade 			= $('#ultimoQuantidade___'+arr[1]);
  var ultimoUnidade 				= $('#ultimoUnidade___'+arr[1]);
  var ultimoValor 				= $('#ultimoValor___'+arr[1]);
  var penultimoQuantidade 		= $('#penultimoQuantidade___'+arr[1]);
  var penultimoUnidade 			= $('#penultimoUnidade___'+arr[1]);
  var penultimoValor 				= $('#penultimoValor___'+arr[1]);
  var antePenultimoQuantidade 	= $('#antePenultimoQuantidade___'+arr[1]);
  var antePenultimoUnidade 		= $('#antePenultimoUnidade___'+arr[1]);
  var antePenultimoValor 			= $('#antePenultimoValor___'+arr[1]);
  var observacao = $('#observacao___'+arr[1]);

  if(produto.is('input')) {
    produto 				= $('#produto___'+arr[1]).val();
    unidadeMedida 				= $('#unidadeMedida___'+arr[1]).val();
    quantidade		 			= $('#quantidade___'+arr[1]).val();
    preco	 					= $('#preco___'+arr[1]).val();
    desconto 					= $('#desconto___'+arr[1]).val();
    total		 				= $('#total___'+arr[1]).val();
  } else {
    produto 				= $('#produto___'+arr[1]).html();
    unidadeMedida 				= $('#unidadeMedida___'+arr[1]).html();
    quantidade		 			= $('#quantidade___'+arr[1]).html();
    preco	 					= $('#preco___'+arr[1]).html();
    desconto 					= $('#desconto___'+arr[1]).html();
    total		 				= $('#total___'+arr[1]).html();
  }

  for(var c=0; c<dtLenght; c++){
    var dtvalue = dataset.values[c]["CDESCPRODUTO"];
    if(produto == dtvalue.trim()) {
      ap = true;
      ultimoQuantidade 		= dataset.values[c]["NQUANT1"];
      ultimoUnidade 				= unidadeMedida;
      ultimoValor 				= dataset.values[c]["NVUNIT1"];
      ultimoValor 				= parseFloat(ultimoValor).toFixed(2);
      penultimoQuantidade 		= dataset.values[c]["NQUANT2"];
      penultimoUnidade 			= unidadeMedida;
      penultimoValor 				= dataset.values[c]["NVUNIT2"];
      penultimoValor 				= parseFloat(penultimoValor).toFixed(2);
      antePenultimoQuantidade 	= dataset.values[c]["NQUANT3"];
      antePenultimoUnidade 		= unidadeMedida;
      antePenultimoValor 			= dataset.values[c]["NVUNIT3"];
      antePenultimoValor = parseFloat(antePenultimoValor).toFixed(2);
      observacao = dataset.values[c]["MOTIVO"];
      break;
    } else {
      ap = false;
    }
  }

  var tituloModal = 'Detalhes do item: '+ produto;
  var conteudoModal = ''+
  '<div class="row">'+
  '	<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
  '		<label>Qtd. </label>'+
  '		<p>' + quantidade + '</p>' +
  '	</div>'+
  '	<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
  '		<label>Un.</label>'+
  '		<p>' + unidadeMedida + '</p>' +
  '	</div>'+
  '	<div class="col-md-4 col-sm-4 col-xl-12" >'+
  '		<label>Produto</label>'+
  '		<p>' + produto + '</p>' +
  '	</div>'+
  '	<div class="col-md-2 col-sm-2 col-xl-12 text-center" >'+
  '		<label>Pre&ccedil;o</label>'+
  '		<p>' + preco + '</p>' +
  '	</div>'+
  '	<div class="col-md-2 col-sm-2 col-xl-12 text-center" >'+
  '		<label>Desconto</label>'+
  '		<p>' + desconto + '</p>' +
  '	</div>'+
  '	<div class="col-md-2 col-sm-2 col-xl-12 text-center" >'+
  '		<label>Total</label>'+
  '		<p>' + total + '</p>' +
  '	</div>'+
  '</div>'+
  '<div class="row" >'+
  '		<div class="col-md-4 col-sm-4 col-xl-12 text-center text-success" >'+
  '			<label><span class="badge badge-success-custom">U</span> &Uacute;ltima</label>'+
  '		</div>'+
  '		<div class="col-md-4 col-sm-4 col-xl-12 text-center text-warning" >'+
  '			<label><span class="badge badge-warning-custom">P</span> Pen&uacute;ltima</label>'+
  '		</div>'+
  '		<div class="col-md-4 col-sm-4 col-xl-12 text-center text-info" >'+
  '			<label><span class="badge badge-info-custom">A</span> Antepen&uacute;ltima </label>'+
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-right" >'+
  ultimoQuantidade +
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
  ultimoUnidade +
  '		</div>'+
  '		<div class="col-md-2 col-sm-2 col-xl-12 text-left money" >'+
  ultimoValor +
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-right" >'+
  penultimoQuantidade +
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
  penultimoUnidade +
  '		</div>'+
  '		<div class="col-md-2 col-sm-2 col-xl-12 text-left money" >'+
  penultimoValor +
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-right" >'+
  antePenultimoQuantidade +
  '		</div>'+
  '		<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
  antePenultimoUnidade +
  '		</div>'+
  '		<div class="col-md-2 col-sm-2 col-xl-12 text-left money" >'+
  antePenultimoValor +
  '		</div>'+
  '</div>'+
  '<div class="row" style="margin-top:1rem;">'+
  '	<div class="col-md-12 col-sm-12 col-xl-12" >'+
  '		<label>Observação</label>'+
  '		<p>' + observacao + '</p>' +
  '	</div>'+
  '</div>';

  FLUIGC.modal({
    title: tituloModal,
    content: conteudoModal,
    id: "fluig-modal",
    size: "full",
    actions:
    [{
      'label': 'Fechar',
      'autoClose': true
    }]
  });

}
