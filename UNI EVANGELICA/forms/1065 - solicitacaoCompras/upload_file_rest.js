$(function () {
	$('#teste').fileupload({
		dataType: 'json',
		done: function (e, data) {

			var myLoading1 = FLUIGC.loading('#upload-file');
			myLoading1.show();

			$.each(data.result.files, function (index, file) {
				$.ajax({
					async : true,
					type : "POST",
					contentType: "application/json",
					url : '/api/public/ecm/document/createDocument',

					data: JSON.stringify({
						"description": file.name,
						"parentId": 1163,
						"attachments": [{
							"fileName": file.name
						}],
					}),

					error: function() {
						FLUIGC.toast({
							title: '',
							message: "Falha ao enviar",
							type: 'danger'
						});
						myLoading1.hide();
					},

					success: function(data) {
						FLUIGC.toast({
							title: '',
							message: "Imagem salva- " + file.name +' - '+ data.content.id,
							type: 'info'
						});

						getPublicLink(data.content.id);

						myLoading1.hide();
						/*var tableId = this.id.substring(this.id.indexOf("___") + 3, this.id.indexOf("___") + 6);
						$('#idArquivo1___'+tableId).val(data.content.id);
						$.ajax({
						async : true,
						contentType : "aplication/json",
						type : "get",
						dataType : "json",
						url : "/api/public/ecm/document/downloadURL/"+$('#idArquivo1___'+tableId).val(),

						success : function(data) {
						console.log(data.content);
						//								$('<label id="excluir'+$('#idArquivo1').val()+'"><img id="'+$('#idArquivo1').val()+'" src="'+data.content+'" style="border: 2px solid blue; max-width: 25%;">Imagem "'+$('#idArquivo1').val()+'"</label><button onclick="excluirImagem(this.id);" class="btn btn-primary" id="'+$('#idArquivo1').val()+'"><span class="fluigicon fluigicon-remove-sign fluigicon-sm">Excluir</span></button>').appendTo($('#listaImagem'));
						$('#imagem___'+tableId).src(data.content);
					}});*/
				},
			});
		});
	}
});
});

function getPublicLink(e) {
	$.ajax({
		url: 'http://fluigteste.unievangelica.edu.br:8080/api/public/ecm/document/activedocument/' + e,
		type: 'GET',
		success: function(data) {
			$('#publiclink').val(data.content.fileURL);
			console.log(data.content.fileURL);
			$('#uploadId').html('<b>Arquivo salvo</b> (' + e + ')');
			$.getJSON( "http://is.gd/create.php?callback=?", {
				url: data.content.fileURL,
				format: "json",
				asyn:false
			}).done(function( data ) {
				$('#publiclink').val(data.shorturl);
				$('#verAnexo').attr('href', data.shorturl);
				$('#verAnexo').show();
				$('#removeBt').removeClass('hide');
				console.log(data.shorturl);
			});
		}
	});
}

function salvaImagem(id) {
	$('#'+id).fileupload({
		dataType: 'json',
		done: function (e, data) {

			var myLoading1 = FLUIGC.loading('#upload-file');
			myLoading1.show();

			$.each(data.result.files, function (index, file) {
				$.ajax({
					async : true,
					type : "POST",
					contentType: "application/json",
					url : '/api/public/ecm/document/createDocument',

					data: JSON.stringify({
						"description": file.name,
						"parentId": 1163,
						"attachments": [{
							"fileName": file.name
						}],
					}),

					error: function() {
						FLUIGC.toast({
							title: '',
							message: "Falha ao enviar",
							type: 'danger'
						});
						myLoading1.hide();
					},

					success: function(data) {
						FLUIGC.toast({
							title: '',
							message: "Imagem salva- " + file.name+' - '+data.content.id,
							type: 'info'
						});
						var tableId = id.substring(id.indexOf("___") + 3, id.indexOf("___") + 6);
						$('#idArquivo1___'+tableId).val(data.content.id);
						$.ajax({
							async : true,
							contentType : "aplication/json",
							type : "get",
							dataType : "json",
							url : "/api/public/ecm/document/downloadURL/"+$('#idArquivo1___'+tableId).val(),

							success : function(data) {
								console.log(data.content);
								$('#imagem___'+tableId).attr('src', data.content);
								$('#imagemHex___'+tableId).val(ConverteBase64ParaHexadecimal(tableId));
							}});

							myLoading1.hide();
						},
					});
				});
			}
		});
	};
