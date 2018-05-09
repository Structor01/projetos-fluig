function ExibeOcultaConteudo (atividade) {
	
	$('#div_aprovacao').hide();
	$('#div_assessoriaLiberacao').hide();
	$('#div_parecerAssessoria').hide();
	$('#div_justificativa').hide();
	$('#div_feedback').hide();	
	
	
	if (atividade == 05){
		/* 
		 * limpa campos da atividade de aprovação
		 */
		$('#parecerLiberacao option:selected').removeAttr("selected");
		$("#assessoriaLiberacao").val("");
		$("#codigoAssessor").val("");
		$("#obsLiberacao").val("");
		
		$('#div_aprovacao').show();//exibe o div com os campos da atividade de aprovação 
		
		/*
		 * Quando altera o parecer do pedido o campo de Assessor é exibido ou oculto.
		 */
		$("#parecerLiberacao").change(function(){	
			if($("#parecerLiberacao").val() == 'SA'){
				$('#div_assessoriaLiberacao').show();
			} else {
				$('#div_assessoriaLiberacao').hide();
			}
		});
		
	} else 
	if (atividade == 15) {
		/*
		 * limpa campo da atividade de justificativa de solicitação
		 */
		$('#parecerJustificativa option:selected').removeAttr("selected");
		$("#obsJustificativa").val("");
		
		$('#div_justificativa').show();
	} else 
	if (atividade == 21) {
		$('#div_feedback').show();
	} else 
	if (atividade == 35) {
		$("#obsParecer").val("");//limpa campo da atividade de assessoria
		$('#div_parecerAssessoria').show();
		
	}
}

function modalMaisDetalhes(item){
	
	var id = $(item).attr("id");//obtem o id do elemento clicado
    var arr = id.split('___');//coloca o id em um array separado as partes pela string ___ 

    var produto 					= $('#produto___'+arr[1]).val();
	var unidadeMedida 				= $('#unidadeMedida___'+arr[1]).val();
	var quantidade		 			= $('#quantidade___'+arr[1]).val();
	var preco	 					= $('#preco___'+arr[1]).val();
	var desconto 					= $('#desconto___'+arr[1]).val();
	var total		 				= $('#total___'+arr[1]).val();
    var entrega 					= $('#entrega___'+arr[1]).val();
	var codigoCentroCusto 			= $('#codigoCentroCusto___'+arr[1]).val();
	var nomeCentroCusto 			= $('#nomeCentroCusto___'+arr[1]).val();
	var observacao 					= $('#observacao___'+arr[1]).val();
	var ultimoQuantidade 			= $('#ultimoQuantidade___'+arr[1]).val();
	var ultimoUnidade 				= $('#ultimoUnidade___'+arr[1]).val();
	var ultimoValor 				= $('#ultimoValor___'+arr[1]).val();
	var penultimoQuantidade 		= $('#penultimoQuantidade___'+arr[1]).val();
	var penultimoUnidade 			= $('#penultimoUnidade___'+arr[1]).val();
	var penultimoValor 				= $('#penultimoValor___'+arr[1]).val();
	var antePenultimoQuantidade 	= $('#antePenultimoQuantidade___'+arr[1]).val();
	var antePenultimoUnidade 		= $('#antePenultimoUnidade___'+arr[1]).val();
	var antePenultimoValor 			= $('#antePenultimoValor___'+arr[1]).val();
	
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
			'	<div class="col-md-2 col-sm-2 col-xl-12" >'+
			'		<label>Entrega</label>'+
			'		<p>' + entrega + '</p>' +
			'	</div>'+
			'	<div class="col-md-2 col-sm-2 col-xl-12" >'+
			'		<label>Cod. C. Custo</label>'+
			'		<p>'+codigoCentroCusto  + '</p>' +
			'	</div>'+
			'	<div class="col-md-8 col-sm-8 col-xl-12" >'+
			'		<label>Centro de Custo</label>'+
			'		<p>'+nomeCentroCusto  + '</p>' +
			'	</div>'+
			'</div>'+
			'<div class="row" >'+
			'	<div class="col-md-12 col-sm-12 col-xl-12" >'+
			'		<label>Observa&ccedil;&atilde;o</label>'+
			'		<p>'+observacao  + '</p>' +
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
			'		<div class="col-md-2 col-sm-2 col-xl-12 text-left" >'+
						ultimoValor +
			'		</div>'+
			'		<div class="col-md-1 col-sm-1 col-xl-12 text-right" >'+
						penultimoQuantidade +
			'		</div>'+
			'		<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
						penultimoUnidade +
			'		</div>'+
			'		<div class="col-md-2 col-sm-2 col-xl-12 text-left" >'+
						penultimoValor +
			'		</div>'+													
			'		<div class="col-md-1 col-sm-1 col-xl-12 text-right" >'+
						antePenultimoQuantidade +
			'		</div>'+
			'		<div class="col-md-1 col-sm-1 col-xl-12 text-center" >'+
						antePenultimoUnidade +
			'		</div>'+
			'		<div class="col-md-2 col-sm-2 col-xl-12 text-left" >'+
						antePenultimoValor +
			'		</div>'+
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
