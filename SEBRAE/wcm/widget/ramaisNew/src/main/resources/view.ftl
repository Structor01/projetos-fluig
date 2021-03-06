<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="myInstance_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="myInstance.instance({message: 'Iniciando...'})">
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

    <div class="page-content container-fluid">
        <div class="row">
            <div class="form-group col-md-12">
                <div class="input-group">
                    <span class="input-group-addon">
                        <span class="fluigicon fluigicon-search fluigicon-sm"></span>
                    </span>
                    <input class="form-control" placeholder="Buscar" id="buscaRamal">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><span class="fluigicon fluigicon-users fluigicon-sm"></span> Ramais</h3>
                </div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <thead>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Nascimento</th>
                        <th width="120px">Telefone</th>
                        <th width="120px">Celular</th>
                        <th>Ramal</th>
                        <th>Unidade</th>
                        <th>Cargo</th>
                        </thead>
                        <tbody id="rowsRamais"></tbody>
                    </table>
                </div>
                <div style="margin: 1rem" class="btn-group fs-float-right">
                    <button type="button" onclick="prevP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-left fluigicon-sm"></span></button>
                    <button type="button" onclick="nextP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-right fluigicon-sm"></span></button>
                </div>

                <button type="button" onclick="editCad()" id="editRamal" style="margin: 1rem" class="btn btn-default fs-float-left">Editar meu ramal</button>
            </div>
        </div>
    </div>
</div>
