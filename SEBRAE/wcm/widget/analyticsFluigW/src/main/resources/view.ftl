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
    <div class="row">
        <div class="col-md-12 panel-default">
            <div class="panel-heading">
                Filtros
            </div>
            <div class="panel-body">
                <div class="form-group col-md-3">
                    <label>Data Inicial</label>
                    <div class="input-group date">
                        <input class="form-control" id="dataInicial">
                        <span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span>
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label>Data Final</label>
                    <div class="input-group date">
                        <input class="form-control" id="dataFinal">
                        <span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="hide col-md-6">
            <div id="embed-api-auth-container"></div>
        </div>
        <div class="hide col-md-6">
            <div id="view-selector-container"></div>
        </div>
        <div class="hide col-md-6">
            <div id="view-name"></div>
        </div>
        <div class="col-md-12">
            <div id="active-users-container"></div>
        </div>
        <div class="col-md-12">
            <div class="Chartjs">
                <h3>Usuários por dia</h3>
                <figure class="Chartjs-figure" id="chart-3-container"></figure>
                <ol class="Chartjs-legend" id="legend-3-container"></ol>
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
