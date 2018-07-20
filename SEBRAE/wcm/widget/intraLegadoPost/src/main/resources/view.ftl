<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
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
                <div class="tab-pane active" id="home"></div>
                <div class="tab-pane" id="images"></div>
                <div class="tab-pane" id="docs"></div>
                <div class="tab-pane" id="videos">
                    <div class="row" ng-app="videos" ng-controller="myCtrl">
                        <div class="col-md-12">

                        </div>
                        <div class="videosW col-md-4" ng-repeat="x in records">
                            <!--<div class="fadeOutVideo">-->
                                <!--play-->
                            <!--</div>-->
                            <video src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/{{x['docId']}}?.mp4" type="video/mp4" class="fp-engine" preload="metadata" x-webkit-airplay="allow"></video>
                            <h5>{{ x['nmTitulo'].length > 50 ? x['nmTitulo'].substring(0,50) + '...' :  x['nmTitulo'] }}</h5>
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

        .videosW:hover {
            cursor: pointer;
        }

        .videosW h5 {
            background: rgba(0,0,0,0.8);
            padding: 10px;
            position: absolute;
            z-index: 100;
            color: white;
        }

        .fadeOutVideo {
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            margin: 1rem;
            margin-top: -.5rem;
            margin-left: -.5rem;
        }
    </style>

    <script>
        var app = angular.module("videos", []);
        app.controller("myCtrl", function($scope) {
            $scope.records = Legado.videos();
        });
    </script>
</div>
