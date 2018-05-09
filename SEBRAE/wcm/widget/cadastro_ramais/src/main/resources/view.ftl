<div id="Instance_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="">
    <style>
        .fluig-style-guide .panel-default>.panel-heading {
            color: #FFF !important;
            background-color: #0080ff!important;
            border-color: #0080ff!important;
        }

        /* .fluig-style-guide #limpaZoomPortaria { */
        /*     border-right: solid 1px #0366c7 !important; */
        /* } */

        .fluig-style-guide .input-group-addon {
            border: 1px solid #0080ff!important;
            background-color: #0080ff!important;
            color: #FFF !important;
        }

        .fluigicon.fluigicon-trash.fluigicon-md {
            line-height: 0px;
        }

        .btn-default {
            border: 1px solid #0080ff!important;
            background-color: #0080ff!important;
            color: #FFF !important;
        }

        .btn-default:hover {
            background-color: #0A8ECC!important;
        }

        button {
            margin-right: .5rem;
        }
    </style>
    <div class="container-fluid">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><span class="fluigicon fluigicon-user fluigicon-sm"></span> Cadastro de Ramais</h3>
                </div>
                <div class="panel-body" id="cadRamal">
                    <div class="form-group col-md-6">
                        <label for="Nome">Nome</label>
                        <input type="text" class="form-control editable" id="nome" name="nome" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Email">E-mail</label>
                        <input type="text" class="form-control" id="email" name="email" readonly>
                    </div>

                    <div class="form-group col-md-3">
                        <label for="DatedeNascimento">Data de Nascimento</label>
                        <div class="input-group date">
                            <input type="text" class="form-control editable date" id="DatedeNascimento" name="DatedeNascimento" readonly>
                            <div class="input-group-addon">
                                <span class="fluigicon fluigicon-calendar"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="Telefone">Telefone</label>
                        <input type="text" class="form-control telefone editable" id="telefone" name="telefone">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="Celular">Celular</label>
                        <input type="text" class="form-control telefone editable" id="Celular" name="Celular">
                    </div>
                    <div class="form-group col-md-1">
                        <label for="Ramal">Ramal</label>
                        <input type="text" class="form-control editable" id="ramal" name="ramal">
                    </div>
                    <div class="fs-clear-both">
                        <div class="form-group col-md-6">
                            <label for="Unidade">Unidade</label>
                            <select class="form-control editable" name="Unidade" id="Unidade">
                                <option value="">Selecione</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Cargo">Cargo</label>
                            <select class="form-control editable" name="cargo" id="cargo">
                                <option value="">Selecione</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group fs-float-right hide">
                <button type="button" id="novo" class="btn btn-primary">Salvar Novo</button>
            </div>

            <div class="form-group fs-float-right hide">
                <button type="button" id="editar" class="btn btn-default"><span class="fluigicon fluigicon-pencil fluigicon-sm"></span> Editar</button>
            </div>
            <div style="margin-right: .5rem" class="form-group fs-float-right hide">
                <button type="button" id="salvar" class="btn btn-success">Salvar</button>
            </div>
            <div style="margin-right: .5rem" class="form-group fs-float-right hide">
                <button type="button" id="cancelar" class="btn btn-danger">Cancelar</button>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</div>
