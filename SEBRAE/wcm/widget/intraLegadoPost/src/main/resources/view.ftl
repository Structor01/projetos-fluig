<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<div id="Legado_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Legado.instance({message: 'Hello world'})">
    <div class="fluig-style-guide">
        <div class="container-fluid">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#home" role="tab" data-toggle="tab">Home</a></li>
                <li><a href="#profile" role="tab" data-toggle="tab">Profile</a></li>
                <li><a href="#messages" role="tab" data-toggle="tab">Messages</a></li>
                <li><a href="#videos" role="tab" data-toggle="tab">Vídeo</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="home"></div>
                <div class="tab-pane" id="profile"></div>
                <div class="tab-pane" id="messages"></div>
                <div class="tab-pane" id="videos">
                    <div class="row" ng-app="videos" ng-controller="myCtrl">
                        <!--<h1 ng-repeat="x in records">{{x}}</h1>-->
                        <div class="col-md-4">
                            <video src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine" autoplay="autoplay" preload="none" x-webkit-airplay="allow"></video>
                        </div>
                        <div class="col-md-4">
                            <video src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine" autoplay="autoplay" preload="none" x-webkit-airplay="allow"></video>
                        </div>
                        <div class="col-md-4">
                            <video src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/40816?.mp4" controls type="video/mp4" class="fp-engine" autoplay="autoplay" preload="none" x-webkit-airplay="allow"></video>
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
