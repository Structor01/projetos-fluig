<div id="HelloWorld_${instanceId}"
     class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">
    <style>
        .gride {
            padding: 1rem;
        }
        .gride img {
            width: 60%;
        }
        .gride div {
            padding: 1rem;
        }
        .gride div:hover {
            background: #dddddd;
            cursor: pointer;
        }
    </style>
    <div class="page-header">
        <h2>
            <span class="fluigicon fluigicon-th fluigicon-sm"></span> Painel de Widgets
        </h2>
    </div>
    <div class="fluig-style-guide">
        <div class="row gride text-center">
            <div class="col-md-4 hide iconAnalytics" onclick="location.assign('/portal/p/1/analyticsIntegra')">
                <img src="https://s33.postimg.cc/m1nvnpf0f/analytics.png">
                <h3>Analytics</h3>
            </div>
            <div class="col-md-4" onclick="location.assign('/portal/p/1/listaEventos')">
                <img src="https://s33.postimg.cc/i5ajrrjr3/events.png">
                <h3>Eventos</h3>
            </div>
            <div class="col-md-4" onclick="location.assign('/portal/p/1/ramais')">
                <img src="https://s33.postimg.cc/thn59kv0v/ramais.png">
                <h3>Ramais</h3>
            </div>
            <div class="col-md-4 hide iconRecurso" onclick="location.assign('/portal/p/1/gestaoRecurso')">
                <img src="https://s33.postimg.cc/ii1xy0mm7/recursos.png">
                <h3>Recursos</h3>
            </div>
            <div class="col-md-4" onclick="location.assign('/portal/p/1/LinksExternos')">
                <img src="https://s33.postimg.cc/t4vr3gpmn/web.png">
                <h3>Links</h3>
            </div>
        </div>
    </div>
</div>



