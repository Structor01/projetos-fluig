<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<div id="Legado_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Legado.instance({message: 'Hello world'})">
    <div class="fluig-style-guide">
        <div class="container-fluid">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#home" role="tab" data-toggle="tab">Home</a></li>
                <li><a href="#images" role="tab" data-toggle="tab">Imagens</a></li>
                <li><a href="#docs" role="tab" data-toggle="tab">Documentos</a></li>
                <li><a href="#videos" role="tab" data-toggle="tab">Vídeos</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="home">
                    <div class="wcm-widget-timeline super-widget fluig-style-guide" id="socialTimeline_8208" data-params="SocialTimeline.instance({alias: &quot;arthur.barros.totvs.com.br.1&quot;, aliasPage: &quot;arthur.barros.totvs.com.br.1&quot;, community: &quot;&quot;, context: &quot;contextAll&quot;, continueScroll: true, enableScroll: true, instanceId: 8208, limit: 20, locale: &quot;pt_BR&quot;, orderType: &quot;LAST_UPDATE&quot;, permissionOrder: false, postId: 0, quantityPublication: &quot;20&quot;, socialAlias: &quot;arthur.barros.totvs.com.br.1&quot;, socialName: &quot;Arthur Barros&quot;, socialType: &quot;USER&quot;, style: &quot;default&quot;, tenantId: 1, tenantURI: &quot;/portal/p/1&quot;})">
                    </div>
                </div>
                <div class="tab-pane" id="images"></div>
                <div class="tab-pane" id="docs"></div>
                <div class="tab-pane" id="videos">
                    <div class="row" ng-app="videos" ng-controller="myCtrl">
                        <!--<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">-->
                        <!--<div class="pull-right">-->
                        <!--<div class="dropdown" data-timeline-order="">-->
                        <!--<button class="btn btn-default dropdown-toggle" type="button" id="timeline-ordering-posts" data-toggle="dropdown">-->
                        <!--Comentários recentes-->
                        <!--<span class="caret"></span>-->
                        <!--</button>-->
                        <!--<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="timeline-ordering-posts">-->
                        <!--<li role="presentation">-->
                        <!--<a role="menuitem" tabindex="-1" href="#" data-timeline-action="order" data-order-type="MY_PUBLICATIONS">Minhas publicações</a>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->
                        <div class="col-md-12">
                            <select class="form-group fs-float-right" onchange="filtraVideos(this)">
                                <option>Categoria</option>
                                <option ng-repeat="i in categoriaV" value="{{ i }}">{{ i }}</option>
                            </select>
                        </div>
                        <div class="videosW col-md-4" ng-repeat="x in records">
                            <div class="fadeOutVideo">
                                <h5>{{ x['nmTitulo'] }}</h5>
                                <p class="subtitle">{{ x['nmCategoria'] }}</p>
                                <button class="controlV" ng-click="playVideo(x.docId, x.nmTitulo)"><i class="material-icons">play_arrow</i></button>
                            </div>
                            <video src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/{{x['docId']}}?.mp4" type="video/mp4" class="fp-engine" preload="metadata" x-webkit-airplay="allow"></video>
                            <h5 class="title">{{ x['nmTitulo'].length > 50 ? x['nmTitulo'].substring(0,50) + '...' :  x['nmTitulo'] }}</h5>
                            <p class="subtitle">{{ x['nmCategoria'] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

    <style type="text/css">
        .videosW {
            float: left;
            padding: 1rem;
            overflow: hidden;
            height: 200px;
        }

        .videosW video {
            position: absolute;
            width: 100%;
            z-index: 0;
        }

        .controlV {
            position: absolute;
            bottom: 30px;
            right: 30px;
            background: none;
            color: white;
            border: none !important;
        }

        .videosW:hover {
            cursor: pointer;
        }

        .videosW .title {
            background: rgba(0,0,0,0.8);
            padding: 10px;
            position: absolute;
            z-index: 100;
            color: white;
        }

        .subtitle {
            font-weight: lighter;
            font-style: italic;
        }

        .fadeOutVideo {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.9);
            margin: 1rem;
            margin-top: -.5rem;
            margin-left: -.5rem;
            padding-top: .5rem;
            padding-left: .5rem;
            z-index: 500;
            color: white;
            display: none;
        }

        .modal-body {
            text-align: center;
            max-height: 100% !important;
        }
        .modal-header {
            color: white;
        }
        .modal {
            box-shadow: none !important;
        }
        .modal-content {
            background: none !important;
            border: none !important;
        }
    </style>

    <script>
        var app = angular.module("videos", []);
        app.controller("myCtrl", function($scope) {
            $scope.records = Legado.videos();
            $scope.categoriaV = [];
            $scope.categoriaV = Legado.categoriaVideos.sort();
            $scope.playVideo = function (e,t) {
                var myModal = FLUIGC.modal({
                    title: t,
                    content: '<video style="max-width: 80%;max-height: 80%" src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/'+e+'?.mp4" type="video/mp4" class="fp-engine" preload controls autoplay x-webkit-airplay="allow"></video>',
                    id: 'fluig-modal',
                    size:'full',
                    actions: []
                });
            }
        });
    </script>
</div>
