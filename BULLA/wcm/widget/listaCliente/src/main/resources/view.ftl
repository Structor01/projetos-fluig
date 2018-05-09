<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide">
    <div class="page-content container-fluid">
        <div class="row">
            <div class="form-group col-md-12">
                <div class="input-group">
                    <span class="input-group-addon">
                        <span class="fluigicon fluigicon-search fluigicon-sm"></span>
                    </span>
                    <input class="form-control" placeholder="Buscar" id="buscaCad">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><span class="fluigicon fluigicon-users fluigicon-sm"></span> Clientes</h3>
                </div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <thead>
                        <th width="30%">Nome</th>
                        <th width="30%">Razão Social</th>
                        <th width="15%">CPF/CNPJ</th>
                        <th>E-mail</th>
                        <th width="15%">Telefone</th>
                        <th></th>
                        </thead>
                        <tbody id="rowsCAD"></tbody>
                    </table>
                </div>
                <div style="margin: 1rem" class="btn-group fs-float-right">
                    <button type="button" onclick="prevP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-left fluigicon-sm"></span></button>
                    <button type="button" onclick="nextP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-right fluigicon-sm"></span></button>
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
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <link rel="stylesheet" type="text/css" href="/portal/resources/css/fluig-style-guide-filter.min.css">
    <script src="/portal/resources/js/fluig-style-guide-filter.min.js"></script>
    <script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
</div>
