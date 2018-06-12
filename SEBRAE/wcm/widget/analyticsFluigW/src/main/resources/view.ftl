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
        <div class="col-md-6">
            <div class="Chartjs">
                <h3>Esta Semana vs Última Semana (by sessions)</h3>
                <figure class="Chartjs-figure" id="chart-1-container"></figure>
                <ol class="Chartjs-legend" id="legend-1-container"></ol>
            </div>
        </div>
        <div class="col-md-6">
            <div class="Chartjs">
                <h3>Este Ano vs Último Ano (by users)</h3>
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

        gapi.analytics.ready(function() {
            gapi.analytics.auth.authorize({
                container: 'embed-api-auth-container',
                clientid: '495696357922-bmr7f91euvdengak62mh6segkcr2ha46.apps.googleusercontent.com'
            });

            var activeUsers = new gapi.analytics.ext.ActiveUsers({
                container: 'active-users-container',
                pollingInterval: 5
            });

            activeUsers.once('success', function() {
                var element = this.container.firstChild;
                var timeout;

                this.on('change', function(data) {
                    var element = this.container.firstChild;
                    var animationClass = data.delta > 0 ? 'is-increasing' : 'is-decreasing';
                    element.className += (' ' + animationClass);

                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        element.className =
                            element.className.replace(/ is-(increasing|decreasing)/g, '');
                    }, 3000);
                });
            });

            var viewSelector = new gapi.analytics.ext.ViewSelector2({
                container: 'view-selector-container',
            }).execute();

            viewSelector.on('viewChange', function(data) {
                var title = document.getElementById('view-name');
                title.textContent = data.property.name + ' (' + data.view.name + ')';
                activeUsers.set(data).execute();
                renderWeekOverWeekChart(data.ids);
                renderYearOverYearChart(data.ids);
                renderTopBrowsersChart(data.ids);
                renderTopCountriesChart(data.ids);
            });

            function renderWeekOverWeekChart(ids) {
                var now = moment();
                var thisWeek = query({
                    'ids': ids,
                    'dimensions': 'ga:date,ga:nthDay',
                    'metrics': 'ga:sessions',
                    'start-date': moment(now).subtract(1, 'day').day(0).format('YYYY-MM-DD'),
                    'end-date': moment(now).format('YYYY-MM-DD')
                });

                var lastWeek = query({
                    'ids': ids,
                    'dimensions': 'ga:date,ga:nthDay',
                    'metrics': 'ga:sessions',
                    'start-date': moment(now).subtract(1, 'day').day(0).subtract(1, 'week')
                        .format('YYYY-MM-DD'),
                    'end-date': moment(now).subtract(1, 'day').day(6).subtract(1, 'week')
                        .format('YYYY-MM-DD')
                });

                Promise.all([thisWeek, lastWeek]).then(function(results) {
                    var data1 = results[0].rows.map(function(row) { return +row[2]; });
                    var data2 = results[1].rows.map(function(row) { return +row[2]; });
                    var labels = results[1].rows.map(function(row) { return +row[0]; });
                    labels = labels.map(function(label) {
                        return moment(label, 'YYYYMMDD').format('ddd');
                    });
                    var data = {
                        labels : labels,
                        datasets : [
                            {
                                label: 'Última Semana',
                                fillColor : 'rgba(220,220,220,0.5)',
                                strokeColor : 'rgba(220,220,220,1)',
                                pointColor : 'rgba(220,220,220,1)',
                                pointStrokeColor : '#fff',
                                data : data2
                            },
                            {
                                label: 'Esta Semana',
                                fillColor : 'rgba(151,187,205,0.5)',
                                strokeColor : 'rgba(151,187,205,1)',
                                pointColor : 'rgba(151,187,205,1)',
                                pointStrokeColor : '#fff',
                                data : data1
                            }
                        ]
                    };

                    new Chart(makeCanvas('chart-1-container')).Line(data);
                    generateLegend('legend-1-container', data.datasets);
                });
            }
            function renderYearOverYearChart(ids) {
                var now = moment();
                var thisYear = query({
                    'ids': ids,
                    'dimensions': 'ga:month,ga:nthMonth',
                    'metrics': 'ga:users',
                    'start-date': moment(now).date(1).month(0).format('YYYY-MM-DD'),
                    'end-date': moment(now).format('YYYY-MM-DD')
                });
                var lastYear = query({
                    'ids': ids,
                    'dimensions': 'ga:month,ga:nthMonth',
                    'metrics': 'ga:users',
                    'start-date': moment(now).subtract(1, 'year').date(1).month(0)
                        .format('YYYY-MM-DD'),
                    'end-date': moment(now).date(1).month(0).subtract(1, 'day')
                        .format('YYYY-MM-DD')
                });
                Promise.all([thisYear, lastYear]).then(function(results) {
                    var data1 = results[0].rows.map(function(row) { return +row[2]; });
                    var data2 = results[1].rows.map(function(row) { return +row[2]; });
                    var labels = ['Jan','Fev','Mar','Abr','Mai','Jun',
                        'Jul','Aug','Set','Out','Nov','Dec'];

                    // Ensure the data arrays are at least as long as the labels array.
                    // Chart.js bar charts don't (yet) accept sparse datasets.
                    for (var i = 0, len = labels.length; i < len; i++) {
                        if (data1[i] === undefined) data1[i] = null;
                        if (data2[i] === undefined) data2[i] = null;
                    }

                    var data = {
                        labels : labels,
                        datasets : [
                            {
                                label: 'Último Ano',
                                fillColor : 'rgba(220,220,220,0.5)',
                                strokeColor : 'rgba(220,220,220,1)',
                                data : data2
                            },
                            {
                                label: 'Este Ano',
                                fillColor : 'rgba(151,187,205,0.5)',
                                strokeColor : 'rgba(151,187,205,1)',
                                data : data1
                            }
                        ]
                    };

                    new Chart(makeCanvas('chart-2-container')).Bar(data);
                    generateLegend('legend-2-container', data.datasets);
                })
                    .catch(function(err) {
                        console.error(err.stack);
                    });
            }

            function renderTopBrowsersChart(ids) {
                query({
                    'ids': ids,
                    'dimensions': 'ga:browser',
                    'metrics': 'ga:pageviews',
                    'sort': '-ga:pageviews',
                    'max-results': 5
                }).then(function(response) {

                    var data = [];
                    var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A'];

                    response.rows.forEach(function(row, i) {
                        data.push({ value: +row[1], color: colors[i], label: row[0] });
                    });

                    new Chart(makeCanvas('chart-3-container')).Doughnut(data);
                    generateLegend('legend-3-container', data);
                });
            }

            function renderTopCountriesChart(ids) {
                query({
                    'ids': ids,
                    'dimensions': 'ga:country',
                    'metrics': 'ga:sessions',
                    'sort': '-ga:sessions',
                    'max-results': 5
                })
                    .then(function(response) {

                        var data = [];
                        var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A'];

                        response.rows.forEach(function(row, i) {
                            data.push({
                                label: row[0],
                                value: +row[1],
                                color: colors[i]
                            });
                        });

                        new Chart(makeCanvas('chart-4-container')).Doughnut(data);
                        generateLegend('legend-4-container', data);
                    });
            }

            function query(params) {
                return new Promise(function(resolve, reject) {
                    var data = new gapi.analytics.report.Data({query: params});
                    data.once('success', function(response) { resolve(response); })
                        .once('error', function(response) { reject(response); })
                        .execute();
                });
            }

            function makeCanvas(id) {
                var container = document.getElementById(id);
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                container.innerHTML = '';
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
                container.appendChild(canvas);

                return ctx;
            }

            function generateLegend(id, items) {
                var legend = document.getElementById(id);
                legend.innerHTML = items.map(function(item) {
                    var color = item.color || item.fillColor;
                    var label = item.label;
                    return '<li><i style="background:' + color + '"></i>' +
                        escapeHtml(label) + '</li>';
                }).join('');
            }

            Chart.defaults.global.animationSteps = 60;
            Chart.defaults.global.animationEasing = 'easeInOutQuart';
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.maintainAspectRatio = false;

            function escapeHtml(str) {
                var div = document.createElement('div');
                div.appendChild(document.createTextNode(str));
                return div.innerHTML;
            }
        });
    </script>
</div>
