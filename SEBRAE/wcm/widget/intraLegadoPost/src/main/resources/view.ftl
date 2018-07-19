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
                        <!--<h1 ng-repeat="x in records">{{x}}</h1>-->
                        <div class="col-md-12">
                            
                        </div>
                        <div class="col-md-4">
                            <video width="100%" src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine" preload="none" x-webkit-airplay="allow"></video>
                        </div>
                        <div class="col-md-4">
                            <video width="100%" src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine"  preload="none" x-webkit-airplay="allow"></video>
                        </div>
                        <div class="col-md-4">
                            <video width="100%" src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine"  preload="none" x-webkit-airplay="allow"></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var app = angular.module("videos", []);
        app.controller("myCtrl", function($scope) {
            $scope.records = [
                "Alfreds Futterkiste",
                "Berglunds snabbköp",
                "Centro comercial Moctezuma",
                "Ernst Handel",
            ]
        });
    </script>
</div>
