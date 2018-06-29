<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">
    <script>
        (function(w,d,s,g,js,fs){
            g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
            js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
            js.src='https://apis.google.com/js/platform.js';
            fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
        }(window,document,'script'));
    </script>
    <div class="row" style="margin-bottom: 1rem">
        <div class="col-md-9">
            <div id="embed-api-auth-container"></div>
            <div id="logOut" class="hide"><a href="#">Sair</a></div>
        </div>
        <div class="col-md-3">
            <div id="active-users-container"></div>
        </div>
    </div>
    <div class="row hide" id="activeUser">
        <div class="form-group col-md-3">
            <label>Data Inicial</label>
            <div class="input-group date">
                <input class="form-control" readonly id="dataInicial">
                <span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span>
            </div>
        </div>
        <div class="form-group col-md-3">
            <label>Data Final</label>
            <div class="input-group date">
                <input class="form-control" readonly id="dataFinal">
                <span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span>
            </div>
        </div>
        <div class="form-group col-md-6">
            <label>&nbsp;</label>
            <div class="input-group">
                <span class="input-group-addon">Página</span>
                <input class="form-control" id="filtraPage">
            </div>
        </div>
        <div class="form-group col-md-12">
            <button class="fs-float-right btn btn-primary" onclick="filtra()">Aplicar Filtro</button>
            <button class="fs-float-left btn btn-clear" onclick="listPages()">Listar todas as páginas</button>
        </div>
        <div class="hide col-md-6">
            <div id="view-selector-container"></div>
        </div>
        <div class="hide col-md-6">
            <div id="view-name"></div>
        </div>
        <div class="col-md-12">
            <table class="table text-center">
                <th class="text-center">
                    Entradas
                </th>
                <th class="text-center">
                    Views
                </th>
                <th class="text-center">
                    Views Únicas
                </th>
                <tr>
                    <td>
                        <div class="form-group">
                            <div id="view-container-entradas"></div>
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <div id="view-container-views"></div>
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <div id="view-container-unique"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-12">
            <div class="Chartjs">
                <h3>Usuários por dia</h3>
                <figure class="Chartjs-figure" id="chart-3-container"></figure>
                <ol class="Chartjs-legend" id="legend-3-container"></ol>
            </div>
        </div>
        <div class="col-md-12">
            <div class="Chartjs">
                <h3>Top Páginas</h3>
                <figure class="Chartjs-figure" id="chart-4-container"></figure>
                <ol class="Chartjs-legend" id="legend-4-container"></ol>
            </div>
        </div>
        <div class="col-md-6">
            <div class="Chartjs">
                <h3>Esta Semana vs Última Semana (por sessão)</h3>
                <figure class="Chartjs-figure" id="chart-1-container"></figure>
                <ol class="Chartjs-legend" id="legend-1-container"></ol>
            </div>
        </div>
        <div class="col-md-6">
            <div class="Chartjs">
                <h3>Este Ano vs Último Ano (por usuário)</h3>
                <figure class="Chartjs-figure" id="chart-2-container"></figure>
                <ol class="Chartjs-legend" id="legend-2-container"></ol>
            </div>
        </div>
    </div>

    <div id="modalPages" class="hide">
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="checkbox-inline">
                            <input type="checkbox" data-show-col value="titulos" checked> Títulos
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" data-show-col value="caminhos" checked> Caminhos
                        </label>
                    </div>
                    <table class="table">
                        <thead>
                        <th class="titulo" width="20%">Título</th>
                        <th class="caminho" width="45%">Caminho</th>
                        <th width="10%">Views</th>
                        <th width="10%">Entradas</th>
                        <th width="15%">Acessos Únicos</th>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>

    <!-- Include the ViewSelector2 component script. -->
    <script src="https://ga-dev-tools.appspot.com/public/javascript/embed-api/components/view-selector2.js"></script>

    <!-- Include the DateRangeSelector component script. -->
    <script src="https://ga-dev-tools.appspot.com/public/javascript/embed-api/components/date-range-selector.js"></script>

    <!-- Include the ActiveUsers component script. -->
    <script src="https://ga-dev-tools.appspot.com/public/javascript/embed-api/components/active-users.js"></script>

    <!-- Include the CSS that styles the charts. -->
    <link rel="stylesheet" href="https://ga-dev-tools.appspot.com/public/css/chartjs-visualizations.css">

    <script>
        HelloWorld.execute(gapi);
    </script>
</div>
