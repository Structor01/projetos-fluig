<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="HelloWorld.instance({message: 'Hello world'})">
    <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <style>
        .fluig-style-guide .panel-default>.panel-heading {
            color: #FFF !important;
            background-color: #0080ff!important;
            border-color: #0080ff!important;
        }


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

        #locationField, #controls {
            position: relative;
            width: 480px;
        }
        #autocomplete {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 99%;
        }
        .label {
            text-align: right;
            font-weight: bold;
            width: 100px;
            color: #303030;
        }
        #address {
            border: 1px solid #000090;
            background-color: #f0f0ff;
            width: 480px;
            padding-right: 2px;
        }
        #address td {
            font-size: 10pt;
        }
        .field {
            width: 99%;
        }
        .slimField {
            width: 80px;
        }
        .wideField {
            width: 200px;
        }
        #locationField {
            height: 20px;
            margin-bottom: 2px;
        }
    </style>
    <div class="fluig-style-guide">
        <div class="container-fluid">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><span class="fluigicon fluigicon-flag fluigicon-sm"></span> Dados do Contato</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group col-md-3">
                            <label for="nomeEvento"> Nome do Evento</label>
                            <input type="text" class="form-control" id="exampleAutocomplete" name="nomeEvento" placeholder="Favor informar o nome do evento.">
                        </div>
                        <!--<div class="form-group col-md-3">-->
                            <!--<label for="nomeEvento">Nome do Evento</label>-->
                            <!--<input type="text" class="form-control" id="nomeEvento" name="nomeEvento" placeholder="Favor informar o nome do evento.">-->
                        <!--</div>-->
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
