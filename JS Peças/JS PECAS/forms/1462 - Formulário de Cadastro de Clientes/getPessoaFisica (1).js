function getPessoaFisica(codigo){
		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listarpessoafisica?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				document.getElementById("pfNome").value = data.data[0].nome;
				document.getElementById("pfRG").value = data.data[0].rg;
				document.getElementById("pfOrgaoEmissaoRG").value = data.data[0].orgaoEmissorRg;
				document.getElementById("pfDataNascimento").value = data.data[0].dataNascimento;
				document.getElementById("pfEstadoCivil").value = data.data[0].estadoCivil;
				document.getElementById("pfEmail").value = data.data[0].email;
			}
		});

		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listartelefonepessoa?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				document.getElementById("pfTelefone").value = data.data[0].telefone;
			}
		});

		$.ajax({
			url: 'http://10.2.7.20/fluig/public/fluig/index/listarenderecopessoa?idPessoa='+codigo,
			type: 'GET',
			success: function(data) {
				for(var c=0; c < data.data.length; c++) {
					var id = wdkAddChild('pfTabelaEndereco');
					document.getElementById("pfEnderecoCEP___"+id).value = data.data[c].cep;
					document.getElementById("pfEnderecoLogradouro___"+id).value = data.data[c].logradouro;
					document.getElementById("pfEnderecoComplemento___"+id).value = data.data[c].complemento;
					document.getElementById("pfEnderecoBairro___"+id).value = data.data[c].bairro;
					setZoomData("zoomEnderecoUF___"+id, {'UF': data.data[c].uf,'DESCRICAO_UF': data.data[c].estado });
					setZoomData("zoomEnderecoCidade___"+id, {'CODIGO': data.data[c].idCidade, 'UF': data.data[c].uf, "DESCRICAO_CIDADE": data.data[c].cidade});
				}
			}
		});
	}
