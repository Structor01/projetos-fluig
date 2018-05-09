<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide">
    <form name="form" role="form">
        <div class="container-fluid" id="respMod">
            <div class="panel panel-default">
                <div class="panel-heading">Cadastro</div>
                <div class="panel-body">
                    <div class="col-md-12">
                        <label>Tipo de Pessoa</label>
                        <div class="form-group">
                            <label class="radio-inline">
                                <input type="radio" name="tipoPessoa" value="J"> Jurídica
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="tipoPessoa" value="F"> Física
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-2 ambos">
                        <label for="codResp">Código</label>
                        <input type="text" class="form-control" name="codResp" id="codResp" placeholder="" readonly>
                    </div>
                    <div class="form-group col-md-5 ambos">
                        <label for="nomeResp">Responsável</label>
                        <input type="text" class="form-control" name="nomeResp" id="nomeResp">
                    </div>
                    <div class="form-group col-md-3 ambos">
                        <label for="cpfResp">CPF</label>
                        <input type="text" onblur="" class="form-control cpf" name="cpfResp" id="cpfResp">
                    </div>
                    <div class="form-group col-md-2 ambos">
                        <label for="rgResp">RG</label>
                        <input type="text" class="form-control" name="rgResp" id="rgResp">
                    </div>
                    <div class="form-group col-md-2 ambos">
                        <label for="telefoneResp">Telefone</label>
                        <input type="text" class="form-control fone" name="telefoneResp" id="telefoneResp">
                    </div>
                    <div class="form-group col-md-3 ambos">
                        <label for="skypeResp">Skype</label>
                        <input type="text" class="form-control" name="skypeResp" id="skypeResp">
                    </div>
                    <div class="form-group col-md-4 ambos">
                        <label for="emailResp">E-mail</label>
                        <input type="text" class="form-control email" name="emailResp" id="emailResp">
                    </div>
                    <div class="form-group col-md-3 ambos">
                        <label for="nascimentoResp">Nascimento</label>
                        <div class="input-group date">
                            <input type="text" class="form-control" id="nascimentoResp" name="nascimentoResp" placeholder="dd/mm/aaaa">
                            <span class="input-group-addon">
                                    <span class="fluigicon fluigicon-calendar"></span>
                                </span>
                        </div>
                    </div>

                    <div class="panel panel-default fisica fs-clear-both">
                        <div class="panel-heading">
                            <h3 class="panel-title">Endereço</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group col-md-2">
                                <label for="cep">CEP</label>
                                <input type="text" onblur="getAddress(this)" class="form-control" name="cepFisica">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="rua">Rua</label>
                                <input type="text" class="form-control" name="ruaFisica">
                            </div>
                            <div class="form-group col-md-1">
                                <label for="numeroFisica">Número</label>
                                <input type="text" class="form-control" name="numeroFisica">
                            </div>
                            <div class="form-group col-md-5">
                                <label for="complemento">Complemento</label>
                                <input type="text" class="form-control" name="complementoFisica">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="bairro">Bairro</label>
                                <input type="text" class="form-control" name="bairroFisica">
                            </div>
                            <div class="form-group col-md-5">
                                <label for="cidade">Cidade</label>
                                <input type="text" class="form-control" name="cidadeFisica">
                            </div>
                            <div class="form-group col-md-1">
                                <label for="uf">UF</label>
                                <input type="text" class="form-control" name="ufFisica">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 fisica">
                        <label>Observação</label>
                        <textarea class="form-control" style="resize:vertical" name="obsFisica" class="obsFisica" rows="2"></textarea>
                    </div>
                    <div style="margin-top:2rem" class="col-md-12 ambos">
                        <button onclick="salvarNovo(34416)" id="salvar" type="button" class="btn btn-success fs-float-right">
                            Salvar
                        </button>
                        <div class="col-md-2 fs-float-right opcoesJur addContato hide">
                            <button onclick="openModal(this)" data-obj="Novo Contato" data-cod="" type="button" class="btn btn-info">
                                <span class="fluigicon fluigicon-plus-sign fluigicon-sm"></span> Adicionar Contatos
                            </button>
                        </div>
                        <div class="col-md-2 fs-float-right opcoesJur addFarmacia hide">
                            <button onclick="openModal('contentModalNovaFarmacia')" type="button" class="btn btn-warning">
                                <span class="fluigicon fluigicon-plus-sign fluigicon-sm"></span> Adicionar Farmácia
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hide" id="contentModalNovaFarmacia">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Adicionar Cliente</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group col-md-3">
                            <label for="tipoContrato">Tipo de Contrato</label>
                            <select class="form-control" name="tipoContrato">
                                <option value="">Selecione</option>
                                <option value="Física">Física</option>
                                <option value="Jurídica">Jurídica</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="fantasia">Fantasia</label>
                            <input data-table='clientes' type="text" class="form-control" name="fantasia">
                        </div>
                        <div class="form-group col-md-5">
                            <label for="razaoSocial">Razão Social</label>
                            <input type="text" data-table='clientes' class="form-control" name="razaoSocial">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="regimeTributario">Regime Tributário</label>
                            <select class="form-control" name="regimeTributario">
                                <option value="">Selecione</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="cnpj">CNPJ</label>
                            <input type="text" data-table='clientes' class="form-control cnpj" name="doc">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inscricaoEstadual">Inscrição Estadual</label>
                            <input type="text" data-table='clientes' class="form-control" name="inscricaoEstadual">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="email">E-mail</label>
                            <input type="email" data-table='clientes' class="form-control" name="email">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="telefoneComercial">Telefone Comercial</label>
                            <input type="text" data-table='clientes' class="form-control fone" name="telefoneComercial">
                        </div>
                        <div class="form-group col-md-2">
                            <label for="telefoneCelular">Telefone Celular</label>
                            <input type="text" data-table='clientes' class="form-control fone" name="celular">
                        </div>
                        <div class="panel panel-default fs-clear-both">
                            <div class="panel-heading">
                                <h3 class="panel-title">Endereço</h3>
                            </div>
                            <div class="panel-body">
                                <div class="form-group col-md-2">
                                    <label for="cep">CEP</label>
                                    <input type="text" data-table='clientes' onblur="getAddress(this)" class="form-control" name="cep">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="rua">Rua</label>
                                    <input type="text" data-table='clientes' class="form-control" name="rua">
                                </div>
                                <div class="form-group col-md-1">
                                    <label for="numero">Número</label>
                                    <input type="text" data-table='clientes' class="form-control" name="numero">
                                </div>
                                <div class="form-group col-md-5">
                                    <label for="complemento">Complemento</label>
                                    <input type="text" class="form-control" name="complemento">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="bairro">Bairro</label>
                                    <input type="text" class="form-control" name="bairro">
                                </div>
                                <div class="form-group col-md-5">
                                    <label for="cidade">Cidade</label>
                                    <input type="text" class="form-control" name="cidade">
                                </div>
                                <div class="form-group col-md-1">
                                    <label for="uf">UF</label>
                                    <input type="text" class="form-control" name="uf">
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="sistemaFarmacia">Sistema da Farmácia</label>
                            <input type="text" data-table='informacao' class="form-control" name="sistemaFarmacia">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="tempoUsoSistema">Tempo de Uso do Atual Sistema</label>
                            <input type="text" data-table='informacao' class="form-control" name="tempoUsoSistema">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="numeroColaboradores">Número de Colaboladores</label>
                            <input type="text" data-table='informacao' class="form-control" name="numeroColaboradores">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="metroQuadrado">Metro Quadrado</label>
                            <input type="text" data-table='informacao' class="form-control" name="metroQuadrado">
                        </div>

                        <div class="panel panel-default fs-clear-both">
                            <div class="panel-heading">
                                <h3 class="panel-title">Valor aproximado da venda líquida</h3>
                            </div>
                            <div class="panel-body">
                                <div class="form-group col-md-4">
                                    <label for="antepenultimoVenda">Antepenúltimo</label>
                                    <input type="text" data-table='informacao' class="form-control" name="antepenultimoVenda">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="penultimoVenda">Penultimo</label>
                                    <input type="text" data-table='informacao' class="form-control" name="penultimoVenda">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="ultimoVenda">Último</label>
                                    <input type="text" data-table='informacao' class="form-control" name="ultimoVenda">
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default fs-clear-both">
                            <div class="panel-heading">
                                <h3 class="panel-title">Valor aproximado de contas a pagar</h3>
                            </div>
                            <div class="panel-body">
                                <div class="form-group col-md-4">
                                    <label for="valorContasaPagar30">30 dias</label>
                                    <input type="text" data-table='informacao' class="form-control" name="valorContasaPagar30">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="60dias">60 dias</label>
                                    <input type="text" data-table='informacao' class="form-control" name="valorContasaPagar60">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="90dias">90 dias</label>
                                    <input type="text" data-table='informacao' class="form-control" name="valorContasaPagar90">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label>Existem impostos atrasados?</label>
                            <div class="form-group">
                                <label class="radio-inline">
                                    <input type="radio" class="impostoAtrasado" name="impostoAtrasado" value="S"> Sim
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" class="impostoAtrasado" name="impostoAtrasado" value="N"> Não
                                </label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Todas as vendas no balcão são registradas via cupom?</label>
                            <div class="form-group">
                                <label class="radio-inline">
                                    <input type="radio"  name="registraCupom" value="S"> Sim
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="registraCupom" value="N"> Não
                                </label>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <label>Todas as notas fiscais de entrada são registradas no sistema?</label>
                            <div class="form-group">
                                <label class="radio-inline">
                                    <input type="radio" name="notaFiscal" value="S"> Sim
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="notaFiscal" value="N"> Não
                                </label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label>Observação</label>
                            <textarea class="form-control obsInfo" style="resize:vertical" name="obsInfo" rows="2"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <link rel="stylesheet" type="text/css" href="/portal/resources/css/fluig-style-guide-filter.min.css">
    <script src="/portal/resources/js/fluig-style-guide-filter.min.js"></script>
    <script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
</div>