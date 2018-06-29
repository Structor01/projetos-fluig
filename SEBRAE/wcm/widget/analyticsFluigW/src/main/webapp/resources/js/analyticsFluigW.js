var now = moment();
var GLOBAL_PARAMS = {};
GLOBAL_PARAMS['start'] = moment(now).subtract(30, 'days').format('YYYY-MM-DD');
GLOBAL_PARAMS['end'] = moment(now).format('YYYY-MM-DD');
GLOBAL_PARAMS['listPages'] = [];
var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        FLUIGC.calendar('.date', {
            pickDate: true,
            pickTime: false
        })

        $('.date').on('click', function () {
            $(this).find('input').blur();
        });

        $('#filtraPage').on('fluig.autocomplete.itemRemoved', function () {
            console.log('Removido');
        });

        $('#logOut').on('click', function () {
            gapi.analytics.auth.signOut();
            window.location.reload();
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
            try {
                gapi.analytics.auth.authorize({
                    container: 'embed-api-auth-container',
                    clientid: '495696357922-bmr7f91euvdengak62mh6segkcr2ha46.apps.googleusercontent.com'
                });

            }catch (e) {

            } finally {
                var activeUsers = new gapi.analytics.ext.ActiveUsers({
                    container: 'active-users-container',
                    pollingInterval: 5
                });

                activeUsers.once('success', function() {
                    if(gapi.analytics.auth.isAuthorized()) {
                        $('#activeUser, #logOut').removeClass('hide');
                    }

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
                    // All calls
                    renderPages(data.ids, GLOBAL_PARAMS['start'], GLOBAL_PARAMS['end']);
                    renderWeekOverWeekChart(data.ids);
                    renderYearOverYearChart(data.ids);
                    renderPerDay(data.ids, GLOBAL_PARAMS['start'], GLOBAL_PARAMS['end'], GLOBAL_PARAMS['filter']);
                    GLOBAL_PARAMS['data'] = data;
                    renderViews(data.ids, GLOBAL_PARAMS['start'], GLOBAL_PARAMS['end'],GLOBAL_PARAMS['filter']);
                    renderTopPages(data.ids, GLOBAL_PARAMS['start'], GLOBAL_PARAMS['end'],GLOBAL_PARAMS['filter']);
                    renderList(data.ids, GLOBAL_PARAMS['start'], GLOBAL_PARAMS['end'],GLOBAL_PARAMS['filter']);
                });

                Chart.defaults.global.animationSteps = 60;
                Chart.defaults.global.animationEasing = 'easeInOutQuart';
                Chart.defaults.global.responsive = true;
                Chart.defaults.global.maintainAspectRatio = false;
            }
        });
    }
});

function renderList(ids, start, end, filter) {
    var now = moment();
    var q = query({
        'ids': ids,
        'dimensions': 'ga:pagePath,ga:pageTitle',
        'metrics': 'ga:pageViews',
        'filters':filter,
        'start-date': start,
        'end-date': end,
        'sort':'-ga:pageViews'
    });
    Promise.all([q]).then(function (res) {
        GLOBAL_PARAMS['listPages'] = res[0].rows;
    });
}

function renderWeekOverWeekChart(ids, filter) {
    var now = moment();
    var thisWeek = query({
        'ids': ids,
        'dimensions': 'ga:date,ga:nthDay',
        'metrics': 'ga:sessions',
        'start-date': moment(now).subtract(1, 'day').day(0).format('YYYY-MM-DD'),
        'end-date': moment(now).format('YYYY-MM-DD'),
        'filters':filter,
    });

    var lastWeek = query({
        'ids': ids,
        'dimensions': 'ga:date,ga:nthDay',
        'metrics': 'ga:sessions',
        'start-date': moment(now).subtract(1, 'day').day(0).subtract(1, 'week')
            .format('YYYY-MM-DD'),
        'end-date': moment(now).subtract(1, 'day').day(6).subtract(1, 'week')
            .format('YYYY-MM-DD'),
        'filters':filter
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

function renderViews(ids, start, end, filter) {
    var thisYear = query({
        'ids': ids,
        'metrics': 'ga:uniquePageviews,ga:pageviews, ga:entrances',
        'filters':filter,
        'start-date': start,
        'end-date': end
    });
    Promise.all([thisYear]).then(function (res) {
        document.getElementById('view-container-views').innerText = res[0].rows[0][1];
        document.getElementById('view-container-unique').innerText = res[0].rows[0][0];
        document.getElementById('view-container-entradas').innerText = res[0].rows[0][2];
    });
}

function renderYearOverYearChart(ids, filter) {
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

function renderPages(ids, start, end) {
    var thisYear = query({
        'ids': ids,
        'metrics': 'ga:entrances',
        'dimensions':'ga:pagePath',
        'start-date': start,
        'end-date': end
    });
    Promise.all([thisYear]).then(function (res) {
        var states = res[0].rows.map(function(row) { return row[0]; })
        var myAutocomplete = FLUIGC.autocomplete('#filtraPage', {
            source: substringMatcher(states),
            name: 'cities',
            displayKey: 'description',
            tagClass: 'tag-gray',
            type: 'tagAutocomplete'
        });
    });
}

function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        matches = [];

        substrRegex = new RegExp(q, 'i');

        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    description: str
                });
            }
        });
        cb(matches);
    };
}

function renderPerDay(ids, start, end, filter) {
    var thisYear = query({
        'ids': ids,
        'dimensions': 'ga:month,ga:day,ga:dayOfWeek,ga:dayOfWeekName,ga:nthDay',
        'metrics': 'ga:entrances',
        'sort':'ga:nthDay',
        'filters':filter,
        'start-date': start,
        'end-date': end
    });

    Promise.all([thisYear]).then(function(results) {
        var labels = results[0].rows.map(function(row) { return +row[1]+'/'+row[0]; });
        var data1 = results[0].rows.map(function(row) { return +row[5]; });
        var data = {
            labels : labels,
            datasets : [
                {
                    label: 'Acessos',
                    fillColor : 'rgba(151,187,205,0.5)',
                    strokeColor : 'rgba(151,187,205,1)',
                    pointColor : 'rgba(151,187,205,1)',
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

function renderTopPages(ids, start, end, filter) {
    query({
        'ids': ids,
        'dimensions': 'ga:pagePath',
        'metrics': 'ga:pageviews',
        'sort': '-ga:pageviews',
        'filters':filter,
        'max-results': 10,
        'start-date': start,
        'end-date': end
    }).then(function(response) {
        var data = [];
        var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A','#4D5F60','#949CB1','#D4ACC5','#E22AE9','#F7C64A'];

        response.rows.forEach(function(row, i) {
            data.push({ value: +row[1], color: colors[i], label: row[0] });
        });

        new Chart(makeCanvas('chart-4-container')).Doughnut(data);
        generateLegend('legend-4-container', data);
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

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function adjustDate(e) {
    var v1 = e.split('/');
    return v1[2]+'-'+v1[1]+'-'+v1[0]
}

function filtra() {
    $('.date').each(function () {
        var el = $(this).find('input');
        var now = moment();
        el.val() != '' && el.attr('id') == 'dataInicial' ? GLOBAL_PARAMS['start'] = adjustDate(el.val()) : 'false';
        el.val() != '' && el.attr('id') == 'dataFinal' ? GLOBAL_PARAMS['end'] = adjustDate(el.val()) : 'false';
    });

    if($('#filtraPage').val() != '') {
        var values = $('#filtraPage').val().indexOf(',') > -1 ? $('#filtraPage').val().split(',') :
            [$('#filtraPage').val()];


        GLOBAL_PARAMS['filter'] = 'ga:pagePath==' + values.toString();
    }

    return HelloWorld.execute(window.gapi);
}

function listPages() {
    var actions = [];
    var title = 'Recurso';
    actions = [{
        'label': 'Fechar',
        'autoClose': true
    }];
    title = 'Páginas';
    var myModal = FLUIGC.modal({
        title: title,
        content: '<div id="instanceModal_C">'+$('#modalPages').html()+'</div>',
        id: 'fluig-modal',
        size:'full',
        actions:actions
    });

    $('[data-show-col]').on('change', function () {
       var t = $(this);
        var isChecked = t.prop('checked');
        var v = t.val();

        if(v == 'caminhos' && !isChecked) {
            appendToTable(true);
        } else if(v == 'titulos') {
            isChecked ? $('.titulo').show() : $('.titulo').hide();
        } else {
            appendToTable(false);
        }
    });

    appendToTable(false);

}

function appendToTable(hideColumn) {
    var table = $('#instanceModal_C').find('.table');
    var tr = table.children('tbody').children('tr').remove();
    var title = {};

    GLOBAL_PARAMS['listPages'].map(res=>{
        var r0 = res[0];
        if(!hideColumn) {
            if(r0.indexOf('?') > -1 && r0.indexOf('&') > -1) {
                var r0a = r0.split('?');
                var r0b = r0a[1].split('&');
                r0 = r0a[0] + r0b[1];
            }
            $('#instanceModal_C').find('.table').children('tbody').append('<tr>' +
                '<td class="titulo" width="20%">'+ res[1]+'</td>' +
                '<td class="caminho" width="70%">'+ r0 +'</td>' +
                '<td width="10%">'+ res[2]+'</td>' +
                '</tr>');
        } else {
            if(title[res[1]]) {
                $('[data-path='+res[0]+']').html(parseInt(title[res[1]]) + parseInt(res[2]));
            } else {
                title[res[1]] = parseInt(res[2]);
                $('#instanceModal_C').find('.table').append(
                    '<tr>' +
                    '<td class="titulo" width="20%">'+ res[1] +'</td>' +
                    '<td class="caminho" width="70%">'+ r0 +'</td>' +
                    '<td data-path="'+ res[0] +'" width="10%">'+ res[2]+'</td>' +
                    '</tr>'
                );
            }
        }
    });
}