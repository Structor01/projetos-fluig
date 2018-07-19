<div id="HelloWorld_${instanceId}"
     class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">
    <style type="text/css">
        .gride {
            padding-left: 1rem;
        }
        #rowUl li:hover  {
            background: #dddddd;
            cursor: pointer;
        }
        #rowUl li:hover h3 {
            text-decoration: underline;
        }
        #rowUl li {
            clear: both;
        }
        #rowUl img, #rowUl h3 {
            float: left !important;
        }
        #rowUl img {
            width: 30px;
        }
        #rowUl h3 {
            margin-top: 0;
            padding: 0.5rem;
        }
    </style>
    <div class="page-header">
        <h2>
            <span class="fluigicon fluigicon-th fluigicon-sm"></span> Acesso Rápido
        </h2>
    </div>
    <ul id="rowUl">
        <li onclick="location.assign('/portal/p/1/ramais')">
            <img src="https://s33.postimg.cc/thn59kv0v/ramais.png">
            <h3>Ramais</h3>
        </li>
        <li onclick="location.assign('/portal/p/1/eventosLista')">
            <img src="https://s33.postimg.cc/i5ajrrjr3/events.png">
            <h3>Eventos</h3>
        </li>
        <!--<li onclick="location.assign('/portal/p/1/gestaoRecurso')">-->
            <!--<img src="https://s33.postimg.cc/ii1xy0mm7/recursos.png">-->
            <!--<h3>Recursos</h3>-->
        <!--</li>-->
        <li onclick="location.assign('/portal/p/1/LinksExternos')">
            <img src="https://s33.postimg.cc/t4vr3gpmn/web.png">
            <h3>Links Externos</h3>
        </li>
    </ul>
</div>



