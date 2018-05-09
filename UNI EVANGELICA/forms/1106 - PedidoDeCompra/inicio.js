
function Inicio() {	
	
	/*
	 * O valor da variável atividadeAtual é definida no displayFields
	 * O idAtividadeAtual é um input do tipo hidden
	 */
	$('#idAtividadeAtual').val(atividadeAtual);

	/*
	 * Método que tem a função de exibir ou ocultar conteúdos da tela.
	 * Parametro: idAtividadeAtual
	 * Retorno: não tem retorno
	 */
	ExibeOcultaConteudo (atividadeAtual);
	
}

function botaoAdicionar(tabela){
	wdkAddChild(tabela);	
}

function imprimir() {	
	window.print();	
}


$(document).ready(function () {
    $("#marcarDesmarcarTodos").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
    });
});


/*
 * daqui para baixo é o script gerado automaticamente pelo fluig quando o formulário e criado via web
 * adicionei para fazer testes e análises
 */
var keyDown = false, ctrl = 17, vKey = 86, Vkey = 118;

$(document).keydown(function(e) {
	if (e.keyCode == ctrl)
		keyDown = true;
}).keyup(function(e) {
	if (e.keyCode == ctrl)
		keyDown = false;
});

$('[data-only-numbers]').on('keypress', function(e) {
	if (!e) {
		var e = window.event;
	}

	if (e.keyCode > 0 && e.which == 0) {
		return true;
	}

	if (e.keyCode) {
		code = e.keyCode;
	} else if (e.which) {
		code = e.which;
	}

	if (code == 46) {
		return true;
	}

	var character = String.fromCharCode(code);
	if (character == '\b' || character == ' ' || character == '\t') {
		return true;
	}
	if (keyDown && (code == vKey || code == Vkey)) {
		return (character);
	} else {
		return (/[0-9]$/.test(character));
	}
}).on('focusout', function(e) {
	var $this = $(this);
	if ($this.val() == "") {
		return true;
	}
	$this.val($this.val().replace(/[^0-9\.]/g, ''));
}).on('paste', function(e) {
	var $this = $(this);
	setTimeout(function() {
		$this.val($this.val().replace(/[^0-9\.]/g, ''));
	}, 5);
});

$('.create-form-components')
		.on(
				'keyup',
				'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]',
				function() {
					validationFieldsForm($(this), $(this).parents(
							'.form-field').data('type'));
				});

$('.create-form-components')
		.on(
				'change',
				'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]',
				function() {
					validationFieldsForm($(this), $(this).parents(
							'.form-field').data('type'));
				});

function validationFieldsForm(field, type) {
	if (type === "checkbox" || type === "radio") {
		if (!field.is(':checked')) {
			field.parents('.form-field').addClass('required');
		} else {
			field.parents('.form-field').removeClass('required');
		}
	} else {
		if (!field.val().trim()) {
			field.parents('.form-field').addClass('required');
		} else {
			field.parents('.form-field').removeClass('required');
		}
	}
}

var $zoomPreview = $(".zoom-preview");
if ($zoomPreview.length) {
	$zoomPreview.parent().removeClass("input-group");
	$zoomPreview.remove();
}

var ratings = $(".rating");
if (ratings.length > 0)
	ratingStars(ratings);
function ratingStars(stars) {
	$.each(stars, function(i, obj) {
		var field = $(this).closest(".form-group")
				.find(".rating-value");
		var tgt = $(obj);
		tgt.html("");
		var rating = FLUIGC.stars(tgt, {
			value : field.val()
		});
		rating.on("click", function(o) {
			field.val($(this).index() + 1);
		});
	});
}

$.each($("[data-date]"), function(i, o) {
	var id = $(o).attr("id");
	FLUIGC.calendar("#" + id);
});

$(document).ready(function() {
	$.each($("[data-date]"), function(i, o) {
		var id = $(o).attr("id");
		if ($("#" + id).attr("readonly")) {
			$("#" + id).data('DateTimePicker').disable();
		}
	});
});
