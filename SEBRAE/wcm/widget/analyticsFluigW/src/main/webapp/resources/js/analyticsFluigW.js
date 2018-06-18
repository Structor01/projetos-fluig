var GLOBAL_PARAMS = {};

var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        FLUIGC.calendar('.date', {
            pickDate: true,
            pickTime: false
        })

        $('.date').each(function () {
            var el = $(this).find('input');
            var now = moment();
            var dateInicio = moment(now).subtract(30, 'days').format('YYYY-MM-DD');
            var dateFim = moment(now).format('YYYY-MM-DD');
            $(this).val() != '' && $(this).attr('id') == 'dataInicial' ? dateInicio = adjustDate($(this).val()) : 'false';
            $(this).val() != '' && $(this).attr('id') == 'dataFinal' ? dateFim = adjustDate($(this).val()) : 'false';
            HelloWorld.execute.renderPerDay(data.ids, dateInicio, dateFim);
        });
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    },
    execute:function (gapi) {
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
                var now = moment();
                renderPerDay(data.ids,moment(now).subtract(30, 'days').format('YYYY-MM-DD'), moment(now).format('YYYY-MM-DD'));
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
                    labels = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
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

            function renderPerDay(ids, start, end) {
                var now = moment();
                var date = new Date;
                var thisYear = query({
                    'ids': ids,
                    'dimensions': 'ga:day,ga:nthDay',
                    'metrics': 'ga:entrances',
                    'sort':'ga:nthDay',
                    'start-date': start,
                    'end-date': end
                });

                Promise.all([thisYear]).then(function(results) {
                    var labels = results[0].rows.map(function(row) { return +row[0]; });
                    var data1 = results[0].rows.map(function(row) { return +row[2]; });
                    var data = {
                        labels : labels,
                        datasets : [
                            {
                                label: 'Últimos',
                                fillColor : 'rgba(220,220,220,0.5)',
                                strokeColor : 'rgba(220,220,220,1)',
                                pointColor : 'rgba(220,220,220,1)',
                                pointStrokeColor : '#fff',
                                data : data1
                            }
                        ]
                    };

                    new Chart(makeCanvas('chart-3-container')).Line(data);
                    generateLegend('legend-3-container', data.datasets);
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
    }
});

function adjustDate(e) {
    var v1 = e.split('/');
    return v1[2]+'-'+v[1]+'-'+v[0]
}