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
                    <#attempt>
                    <#include '/social_widget_logged.ftl'>
                    <#include '/social_widget_context.ftl'>
                    <#include 'variables.ftl'>

                    <div class="wcm-widget-timeline wcm-widget-class wcm-widget-timeline-loading super-widget fluig-style-guide" id="socialTimeline_${instanceId}" data-params="SocialTimeline.instance(${params})">
                        <script type="text/template" class="social-timeline-master-template">
                            {{#viewOrdering}}
                            <div class="page-header fs-sm-space fs-no-padding-top fs-no-padding-right fs-no-padding-left">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="pull-right">
                                            {{>btnOrderAction}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/viewOrdering}}
                            <ul data-timeline-list-posts class="timeline-list-posts"></ul>
                        </script>

                        <script type="text/template" class="social-timeline-btn-order-template">
                            <div class="dropdown" data-timeline-order>
                                <button class="btn btn-default dropdown-toggle" type="button" id="timeline-ordering-posts" data-toggle="dropdown">
                                    {{order}}
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="timeline-ordering-posts">
                                    {{#orderActions}}
                                    <li role="presentation">
                                        <a role="menuitem" tabindex="-1" href="#" data-timeline-action="order" data-order-type="{{orderType}}">{{orderName}}</a>
                                    </li>
                                    {{/orderActions}}
                                </ul>
                            </div>
                        </script>

                        <script type="text/template" class="social-timeline-post-template">
                            <li data-post-id="{{postId}}" data-post-community-hidden="{{social.hidden}}" data-post-permissions="{{permissions}}" class="timeline-list-posts-item">
                                <div class="panel panel-default fs-no-margin">
                                    <div class="panel-body fs-sm-space clearfix">
                                        <div class="media">
                                            <a class="pull-left" href="{{tenantURI}}/{{user.page}}">
                                                <div data-user-popover="{{user.alias}}">
                                                    <img
                                                            src="/social/api/rest/social/image/profile/{{user.alias}}/SMALL_PICTURE"
                                                            alt="{{user.name}}"
                                                            class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy"
                                                            data-update-image-profile="{{user.alias}}"
                                                            data-image-size="SMALL_PICTURE"
                                                    >
                                                </div>
                                            </a>
                                            <div class="media-body">
                                                {{#postHeader}}
                                                <h5 class="media-heading">
                                                    <strong>
                                                        {{#person}}
                                                        <a href="{{tenantURI}}/{{personPage}}" data-user-popover="{{personAlias}}">{{personName}}</a>
                                                        {{/person}}
                                                        {{#verb}}
                                                        <span class="timeline-header-no-link"> {{verb}} </span>
                                                        {{/verb}}
                                                        {{#object}}
                                                        <a href="{{tenantURI}}{{objectUrl}}">{{objectType}}</a>
                                                        {{/object}}
                                                        {{#place}}
                                                        <span class="timeline-header-no-link"> {{i18n.on}} </span>
                                                        <a href="{{tenantURI}}/{{placePage}}" data-user-popover="{{placeAlias}}">{{placeName}}</a>
                                                        {{/place}}
                                                        {{#viaThe}}
                                                        <span class="timeline-header-no-link"> {{i18n.via}} </span>
                                                        <a href="{{tenantURI}}/{{viaThePage}}" data-user-popover="{{viaTheAlias}}">{{viaTheName}}</a>
                                                        {{/viaThe}}
                                                        {{#creationDate}}
                                                        <br/>
                                                        <h6>
                                                            <a href="{{tenantURI}}{{url}}" class="fs-no-bold" data-creation-date="{{creationDate}}"></a>&nbsp;
                                                            {{#updateDate}}
                                                            <span data-icon-edited-date-{{postId}} class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{i18n.edited}} {{i18n.in}} {{updateDate}}"></span>
                                                            {{/updateDate}}
                                                            {{^updateDate}}
                                                            <div data-edited-date-{{postId}}></div>
                                                            {{/updateDate}}
                                                        </h6>
                                                        {{/creationDate}}
                                                    </strong>
                                                </h5>
                                                {{/postHeader}}
                                                {{#allowsEditActions}}
                                                <div class="timeline-edit-area" data-edit-area-{{postId}}>
                                                </div>
                                                {{/allowsEditActions}}
                                                {{#text}}
                                                <p data-timeline-content-{{postId}} class="timeline-text-content">{{{text}}}</p>
                                                {{/text}}
                                                {{#variableContent}}
                                                <#-- Esse input será provisório para facilitar a manuteção dos templates. -->
                                                <input type="hidden" value="{{tlpName}}" data-variable-content-template>
                                                {{>postContent}}
                                                {{/variableContent}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-footer">
                                        <ul class="list-inline timeline-list-actions">
                                            {{#canLike}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#supported}}
									<a href="#" class="fluigicon fluigicon-thumbs-up-on fs-no-text-underline" title="{{i18n.dislike}}" data-request-running="false" data-timeline-action="support"></a>
								{{/supported}}
								{{^supported}}
									<a href="#" class="fluigicon fluigicon-thumbs-up fs-no-text-underline" title="{{i18n.like}}" data-request-running="false" data-timeline-action="support"></a>
								{{/supported}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberLikes}}" title="{{i18n.manylike}}" data-request-running="false" data-timeline-action="listLikes">{{numberLikes}}</a>
							</span>
                                            </li>
                                            {{/canLike}}
                                            {{#canComment}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-comment fs-no-text-underline" title="{{i18n.comment}}" data-timeline-action="comment"></a>
								<a href="{{tenantURI}}{{url}}" class="counter counter-warning pos-right-bottom {{existsNumberComments}}" title="{{i18n.manycomment}}">{{numberComments}}</a>
							</span>
                                            </li>
                                            {{/canComment}}
                                            {{#canNotify}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#watching}}
									<a href="#" class="fluigicon fluigicon-bell fs-no-text-underline" title="{{i18n.stopwatching}}" data-request-running="false" data-timeline-action="watch"></a>
								{{/watching}}
								{{^watching}}
									<a href="#" class="fluigicon fluigicon-bell-empty fs-no-text-underline" title="{{i18n.startwatching}}" data-request-running="false" data-timeline-action="watch"></a>
								{{/watching}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberWatchers}}" title="{{i18n.manywatch}}" data-request-running="false" data-timeline-action="listWatchers">{{numberWatchers}}</a>
							</span>
                                            </li>
                                            {{/canNotify}}
                                            {{#canShare}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#shared}}
									<a href="#" title="${i18n.getTranslation('recommend')}" data-clipboard-text="link to copy" data-timeline-action="share" class="fluigicon fluigicon-share-on fs-no-text-underline"></a>
								{{/shared}}
								{{^shared}}
									<a href="#" title="${i18n.getTranslation('recommend')}" data-clipboard-text="link to copy" data-timeline-action="share" class="fluigicon fluigicon-share fs-no-text-underline"></a>
								{{/shared}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberShares}}" title="{{i18n.manywatch}}" data-request-running="false" data-timeline-action="listShares">{{numberShares}}</a>
							</span>
                                            </li>
                                            {{/canShare}}
                                            {{#allowsEditActions}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-pencil fs-no-text-underline" title="{{i18n.edit}}" data-request-running="false" data-timeline-action="editPost"></a>
							</span>
                                            </li>
                                            {{/allowsEditActions}}
                                            {{#canDenounce}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-flag fs-no-text-underline" title="{{i18n.denounce}}" data-request-running="false" data-timeline-action="denounce"></a>
							</span>
                                            </li>
                                            {{/canDenounce}}
                                            {{#allowsRemoveActions}}
                                            <li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-trash fs-no-text-underline" title="{{i18n.remove}}" data-request-running="false" data-timeline-action="remove"></a>
							</span>
                                            </li>
                                            {{/allowsRemoveActions}}
                                        </ul>
                                    </div>
                                </div>
                                <ul class="fs-md-space fs-no-padding-top fs-no-padding-bottom timeline-list-comments" data-timeline-list-comments>
                                    {{#comments}}
                                    {{>postComments}}
                                    {{/comments}}
                                    {{#existsMoreComments}}
                                    {{>postMoreComments}}
                                    {{/existsMoreComments}}
                                </ul>
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-comment-template">
                            <li data-comment-id="{{id}}" class="panel panel-default fs-no-margin timeline-list-comments-item">
                                <div class="panel-body fs-sm-space clearfix">
                                    <div class="media">
                                        <a class="pull-left" href="{{tenantURI}}/{{user.page}}">
                                            <div data-user-popover="{{user.alias}}">
                                                <img
                                                        src="/social/api/rest/social/image/profile/{{user.alias}}/SMALL_PICTURE"
                                                        alt="{{user.name}}"
                                                        class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy"
                                                        data-update-image-profile="{{user.alias}}"
                                                        data-image-size="SMALL_PICTURE"
                                                >
                                            </div>
                                        </a>
                                        <div class="media-body">
                                            <h5 class="media-heading">
                                                <strong>
                                                    <a href="{{tenantURI}}/{{user.page}}" data-user-popover="{{user.alias}}">{{user.name}}</a>
                                                    <br/>
                                                    <h6>
                                                        <a href="{{tenantURI}}{{url}}" class="fs-no-bold" data-creation-date="{{creationDate}}"></a>&nbsp;
                                                        {{#updateDate}}
                                                        <span data-icon-edited-date-{{id}} class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{i18n.edited}} {{i18n.in}} {{updateDate}}"></span>
                                                        {{/updateDate}}
                                                        {{^updateDate}}
                                                        <div data-edited-date-{{id}}></div>
                                                        {{/updateDate}}
                                                    </h6>
                                                </strong>
                                            </h5>
                                            <p data-timeline-content-{{id}} class="timeline-text-content">{{{comment}}}</p>
                                        </div>
                                    </div>
                                    {{#allowsEditActions}}
                                    <div class="timeline-edit-area" data-edit-area-{{id}}>
                                    </div>
                                    {{/allowsEditActions}}
                                </div>
                                <div class="panel-footer fs-no-bg fs-no-border-top fs-no-padding-top">
                                    <ul class="list-inline">
                                        {{#canLike}}
                                        <li class="timeline-list-actions-item">
						<span class="counter-group">
							{{#supported}}
								<a href="#" class="fluigicon fluigicon-thumbs-up-on fs-no-text-underline" title="{{i18n.dislike}}" data-request-running="false" data-timeline-action="support"></a>
							{{/supported}}
							{{^supported}}
								<a href="#" class="fluigicon fluigicon-thumbs-up fs-no-text-underline" title="{{i18n.like}}" data-request-running="false" data-timeline-action="support"></a>
							{{/supported}}
							<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberLikes}}" title="{{i18n.manylike}}" data-request-running="false" data-timeline-action="listLikes">{{numberLikes}}</a>
						</span>
                                        </li>
                                        {{/canLike}}
                                        {{#allowsEditActions}}
                                        <li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-pencil fs-no-text-underline" title="{{i18n.edit}}" data-request-running="false" data-timeline-action="editComment"></a>
						</span>
                                        </li>
                                        {{/allowsEditActions}}
                                        {{#canDenounce}}
                                        <li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-flag fs-no-text-underline" title="{{i18n.denounce}}" data-request-running="false" data-timeline-action="denounce"></a>
						</span>
                                        </li>
                                        {{/canDenounce}}
                                        {{#allowsRemoveActions}}
                                        <li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-trash fs-no-text-underline" title="{{i18n.remove}}" data-request-running="false" data-timeline-action="remove"></a>
						</span>
                                        </li>
                                        {{/allowsRemoveActions}}
                                    </ul>
                                </div>
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-content-media-image-template">
                            {{^isRecommendation}}
                            <div class="panel panel-default fs-no-margin">
                                <div class="panel-body text-center">
                                    {{^multipleAttachments}}
                                    <a href="{{tenantURI}}{{linkedObject.url}}">
                                        <img class="timeline-photo" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}" src="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}" onerror="socialTimeline_${instanceId?c}.showUnreachableContentWarning(this, event);">
                                    </a>
                                    {{/multipleAttachments}}
                                    {{#multipleAttachments}}
                                    <div id="post_carousel_{{postId}}" class="start-images-carousel">
                                        <div data-attachments="{{attachments}}"></div>
                                    </div>
                                    {{/multipleAttachments}}
                                </div>
                            </div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    <div class="media-body">
                                        {{^removeText}}
                                        {{#originalText}}
                                        <div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{{originalText}}}</p>
                                            </div>
                                        </div>
                                        {{/originalText}}
                                        {{/removeText}}
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body text-center">
                                                {{^multipleAttachments}}
                                                <a href="{{tenantURI}}{{linkedObject.url}}">
                                                    <img class="timeline-photo" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}" src="/webdesk/streamcontrol/?WDCompanyId={{linkedObject.tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}" onerror="socialTimeline_${instanceId?c}.showUnreachableContentWarning(this, event);">
                                                </a>
                                                {{/multipleAttachments}}
                                                {{#multipleAttachments}}
                                                <div id="post_carousel_{{postId}}" class="start-images-carousel">
                                                    <div data-attachments="{{attachments}}"></div>
                                                </div>
                                                {{/multipleAttachments}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="image-carousel-template">
                            <div class="carousel-action" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{documentVersion}}"></div>
                        </script>

                        <script type="text/template" class="social-timeline-content-media-video-template">
                            {{^isRecommendation}}
                            <div class="panel panel-default fs-no-margin">
                                <div class="panel-body text-center">
                                    <div class="timeline-video-wrapper">
                                        <div
                                                id="timeline-video-{{documentId}}-{{postId}}"
                                                data-video-player
                                                data-video-type="{{videoType}}"
                                                data-url="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&replicationServer={{replicationServerAccessible}}"
                                                style="background-image: url('/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}') !important;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div data-url-media="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}" style="display:none"></div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    {{#originalText}}
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    <div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
                                        <div class="panel-body">
                                            <p class="fs-no-margin">{{{originalText}}}</p>
                                        </div>
                                    </div>
                                    {{/originalText}}
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body text-center">
                                                <div class="timeline-video-wrapper">
                                                    <div
                                                            id="timeline-video-{{documentId}}-{{postId}}"
                                                            data-video-player
                                                            data-video-type="{{videoType}}"
                                                            data-url="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&replicationServer={{replicationServerAccessible}}"
                                                            style="background-image: url('/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}') !important;"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-url-media="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}&replicationServer={{replicationServerAccessible}}" style="display:none"></div>
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-content-media-document-template">
                            {{^isRecommendation}}
                            <div class="media">
                                {{#linkedObject.thumbURL}}
                                <div class="pull-left media-center">
                                    <img src="{{linkedObject.thumbURL}}">
                                </div>
                                {{/linkedObject.thumbURL}}
                                <div class="media-body">
                                    <div class="panel panel-default fs-no-margin">
                                        <div class="panel-body">
                                            <p {{#isFolder}}class="fs-no-margin"{{/isFolder}}>{{linkedObject.description}}</p>
                                            {{^isFolder}}
                                            <p class="fs-no-margin">{{i18n.version}}/{{i18n.revision}}: {{documentVersion}}</p>
                                            {{/isFolder}}
                                        </div>
                                    </div>
                                    <a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}">{{i18n.details}}</a>
                                </div>
                            </div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    {{#originalText}}
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    <div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
                                        <div class="panel-body">
                                            <p class="fs-no-margin">{{{originalText}}}</p>
                                        </div>
                                    </div>
                                    {{/originalText}}
                                    {{#linkedObject.thumbURL}}
                                    <div class="pull-left media-center">
                                        <img src="{{linkedObject.thumbURL}}">
                                    </div>
                                    {{/linkedObject.thumbURL}}
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <p {{#isFolder}}class="fs-no-margin"{{/isFolder}}>{{linkedObject.description}}</p>
                                                {{^isFolder}}
                                                <p class="fs-no-margin">{{i18n.version}}/{{i18n.revision}}: {{documentVersion}}</p>
                                                {{/isFolder}}
                                            </div>
                                        </div>
                                        <a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}">{{i18n.details}}</a>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                        </script>


                        <script type="text/template" class="social-timeline-content-form-template">
                            <div class="well timeline-recommendation-content">
                                <div class="media gallery">
                                    <div class="pull-left media-center">
                                        <img src="/webdesk/assets/icons/formulario.png">
                                    </div>
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{linkedObject.description}}</p>
                                            </div>
                                        </div>
                                        <a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-form-id="{{documentId}}" data-timeline-action="openAnswerForm">{{i18n.anwser}}</a>
                                    </div>
                                </div>
                            </div>
                        </script>

                        <script type="text/template" class="social-timeline-content-gallery-template">
                            <div class="well timeline-recommendation-content">
                                <div class="media gallery">
                                    <div class="pull-left media-center">
                                        <img src="/webdesk/assets/icons/folder_24.png">
                                    </div>
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{linkedObject.description}}</p>
                                            </div>
                                        </div>
                                        <a href="{{tenantURI}}/{{urlOrigin}}">{{i18n.details}}</a>
                                    </div>
                                </div>
                            </div>
                        </script>

                        <script type="text/template" class="social-timeline-content-social-template">
                            {{^isRecommendation}}
                            <input type="hidden" value="social-timeline-content-social-template" data-untreated-content-post="{{postId}}">
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    {{#linkedObject.thumbURL}}
                                    <a class="pull-left" href="{{tenantURI}}{{linkedObject.url}}">
                                        <img class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" src="{{linkedObject.thumbURL}}">
                                    </a>
                                    {{/linkedObject.thumbURL}}
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <p class="fs-no-margin"><a href="{{tenantURI}}{{linkedObject.url}}">{{linkedObject.description}}</a> {{i18n.sharedsocial}}.</p>
                                            </div>
                                        </div>
                                        <a href="{{tenantURI}}{{linkedObject.url}}">{{i18n.details}}</a>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-content-article-template">
                            {{^isRecommendation}}
                            <div class="container-fluid row fs-cursor-pointer" data-timeline-action="articleLink" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
                                {{#hasShareText}}
                                <div class="panel panel-default"><div class="panel-body">
                                    {{/hasShareText}}
                                    {{#linkedObject.thumbURL}}
                                    <div class="col-xs-12">
                                        {{^hasShareText}}&nbsp;{{/hasShareText}}
                                        <div class="row embed-responsive embed-responsive-5by1 img-rounded">
                                            <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
                                                <img class="embed-responsive-item" src="{{linkedObject.thumbURL}}">
                                            </a>
                                        </div>
                                        &nbsp;
                                    </div>
                                    {{/linkedObject.thumbURL}}
                                    <h2 {{#hasShareText}}{{^linkedObject.thumbURL}}class="fs-no-margin-top"{{/linkedObject.thumbURL}}{{/hasShareText}}>
                                    <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{linkedObject.description}}</a>
                                    </h2>
                                    <p>
                                        <a class="fs-no-text-underline fs-break-text" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}">{{linkedObject.text}}</a> &nbsp;
                                        <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{i18n.details}}</a>
                                    </p>
                                    {{#hasShareText}}
                                </div></div>
                                {{/hasShareText}}
                            </div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    {{#originalText}}
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    {{/originalText}}
                                    <div class="media-body">
                                        {{#originalText}}
                                        <div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{{originalText}}}</p>
                                            </div>
                                        </div>
                                        {{/originalText}}
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <div class="container-fluid row fs-cursor-pointer" data-timeline-action="articleLink" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
                                                    {{#linkedObject.thumbURL}}
                                                    <div class="col-xs-12">
                                                        <div class="row embed-responsive embed-responsive-5by1 img-rounded">
                                                            <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
                                                                <img class="embed-responsive-item" src="{{linkedObject.thumbURL}}">
                                                            </a>
                                                        </div>
                                                        &nbsp;
                                                    </div>
                                                    {{/linkedObject.thumbURL}}
                                                    <h2 {{#originalText}}{{^linkedObject.thumbURL}}class="fs-no-margin-top"{{/linkedObject.thumbURL}}{{/originalText}}>
                                                    <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{linkedObject.description}}</a>
                                                    </h2>
                                                    <p>
                                                        <a class="fs-no-text-underline fs-break-text" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}">{{linkedObject.text}}</a> &nbsp;
                                                        <a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{i18n.details}}</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}

                        </script>

                        <script type="text/template" class="social-timeline-content-generic-template">
                            {{^isRecommendation}}
                            <input type="hidden" value="social-timeline-content-generic-template" data-untreated-content-post="{{postId}}">
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            {{#originalText}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    <div class="media-body">
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{{originalText}}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/originalText}}
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-content-generic-media-template">
                            {{^isRecommendation}}
                            <input type="hidden" value="social-timeline-content-generic-media-template" data-untreated-content-post="{{postId}}">
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <input type="hidden" value="social-timeline-content-generic-media-template - isRecommendation" data-untreated-content-post="{{postId}}">
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-content-youtube-template">
                            {{^isRecommendation}}
                            <div class="panel panel-default fs-no-margin">
                                <div class="panel-body text-center">
                                    <div class="embed-responsive embed-responsive-16by9">
                                        <iframe id="ytplayer-{{youtubeVideoId}}-{{postId}}" type="text/html"
                                                src="https://www.youtube.com/embed/{{youtubeVideoId}}"
                                                frameborder="0" allowfullscreen="allowfullscreen"/>
                                        <input type="hidden" data-post-youtube-id="{{postId}}" data-youtube-video-id="{{youtubeVideoId}}" data-youtube-video-link="{{formattedLink}}">
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="media">
                                    <div class="pull-left media-center">
                                        <span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
                                    </div>
                                    <div class="media-body">
                                        {{#text}}
                                        <div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
                                            <div class="panel-body">
                                                <p class="fs-no-margin">{{{text}}}</p>
                                            </div>
                                        </div>
                                        {{/text}}
                                        <div class="panel panel-default fs-no-margin">
                                            <div class="panel-body text-center">
                                                <div class="embed-responsive embed-responsive-16by9">
                                                    <iframe id="ytplayer-{{youtubeVideoId}}-{{postId}}" type="text/html"
                                                            src="https://www.youtube.com/embed/{{youtubeVideoId}}"
                                                            frameborder="0" allowfullscreen="allowfullscreen"/>
                                                    <input type="hidden" data-post-youtube-id="{{postId}}" data-youtube-video-id="{{youtubeVideoId}}" data-youtube-video-link="{{formattedLink}}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-content-removed-template">
                            {{^isRecommendation}}
                            <div class="panel panel-default fs-no-margin">
                                <div class="panel-body text-center">
                                    <div class="alert alert-warning fs-no-margin" role="alert">{{i18n.documentremoved}}</div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                            {{#isRecommendation}}
                            <div class="well timeline-recommendation-content">
                                <div class="panel panel-default fs-no-margin">
                                    <div class="panel-body text-center">
                                        <div class="alert alert-warning fs-no-margin" role="alert">{{i18n.documentremoved}}</div>
                                    </div>
                                </div>
                            </div>
                            {{/isRecommendation}}
                        </script>

                        <script type="text/template" class="social-timeline-unreachable-content-template">
                            <div class="alert alert-warning fs-no-margin" role="alert">{{unreachableContent}}</div>
                        </script>

                        <script type="text/template" class="social-timeline-add-comment-template">
                            <li class="panel panel-default fs-no-margin timeline-list-comments-item timeline-container-comment" data-timeline-container-comment style="display: none;">
                                <div class="panel-body fs-sm-space media clearfix fs-overflow-visible">
                                    <form role="form" action="#" data-timeline-submit-comment>
                                        <div class="form-group">
                                            <textarea class="form-control" rows="3" placeholder="{{i18n.leaveyourcomment}}" data-comment-textarea data-comment-textarea-mentions></textarea>
                                        </div>
                                        <div class="form-group text-right fs-no-margin">
                                            <button type="submit" class="btn btn-primary btn-sm" data-submit-comment data-loading-text="{{i18n.commentsending}}">{{i18n.comment}}</button>
                                        </div>
                                    </form>
                                </div>
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-show-more-posts-template">
                            <button type="button" class="btn btn-default fs-full-width timeline-show-more-posts" data-timeline-show-more-posts>
                                <span class="caret"></span>
                            </button>
                        </script>

                        <script type="text/template" class="social-timeline-show-more-comments-template">
                            <li class="panel panel-default fs-no-margin timeline-list-comments-item">
                                <button type="button" class="btn btn-default btn-xs fs-full-width timeline-show-more-comments" data-timeline-show-more-comments="{{postId}}">
                                    <span class="caret"></span>
                                </button>
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-message-no-results-template">
                            <li class="alert alert-info" role="alert" data-timeline-content-message>
                                <h3 class="fs-no-margin-top">
                                    <strong>{{i18n.timelinewithoutcontent}}</strong>
                                </h3>
                                {{i18n.notcontent}} {{#isCommunity}}{{i18n.incommunity}} <a href="{{tenantURI}}/subject/{{socialAlias}}">{{socialName}}</a>{{/isCommunity}}
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-message-post-not-found-template">
                            <li class="alert alert-warning" role="alert" data-timeline-content-message>
                                <h3 class="fs-no-margin-top">
                                    <strong>{{i18n.postnotfound}}</strong>
                                </h3>
                                {{i18n.postnotfoundmessage}}
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-message-list-error-template">
                            <li class="alert alert-warning" role="alert" data-timeline-content-message>
                                <h3 class="fs-no-margin-top">
                                    <strong>{{i18n.unavailabletimeline}}</strong>
                                </h3>
                                {{i18n.contactadministrator}}
                            </li>
                        </script>

                        <script type="text/template" class="social-timeline-mention-template">
                            <a href="{{{tenantURI}}}/social/{{alias}}" data-user-popover="{{alias}}">{{name}}</a>
                        </script>

                        <script type="text/template" class="social-timeline-tag-template">
                            <a href="#" data-timeline-action="search">$1</a>
                        </script>

                        <script type="text/template" class="social-timeline-link-template">
                            <a href="$1" target="_blank">$1</a>
                        </script>

                        <script type="text/template" class="social-timeline-line-break-template">
                            <br>
                        </script>

                        <script type="text/template" class="social-timeline-video-not-supported-template">
                            <div class="timeline-video-not-supported">
                                <div class="clearfix fs-margin-auto timeline-container-icon-download-video">
                                    <img class="fs-float-left timeline-icon-download-video" src="${basePath}/resources/images/image-video-error.svg">
                                    <h1 class="fs-txt-left fs-no-margin-top">Ops!</h1>
                                    <p class="fs-txt-left">{{i18n.videoNotSupported}}</p>
                                </div>
                                <p class="timeline-description-download-video text-center">
                                    <a href="#" class="fs-text-underline" data-timeline-action="downloadVideo">{{i18n.videoNotSupportedDownload}}</a> {{i18n.videoNotSupportedSulfix}}
                                </p>
                            </div>
                        </script>

                        <script type="text/template" class="social-timeline-edit-content-template">
                            <div class="">
                                <textarea name="content-text-edit-{{id}}" class="content-text-edit" id="content-text-edit" data-content-text-edit data-sociable-type="{{sociable}}">{{text}}</textarea>
                            </div>
                            <div class="edit-buttons-area fr">
                                <span class="post-text-limit-edit">{{count}}</span>
                                <button class="btn btn-default" data-timeline-action="cancelEdit">{{i18n.cancel}}</button>
                                <button class="btn btn-primary edit-content-button" data-timeline-action="saveEdit">{{i18n.publish}}</button>
                            </div>
                        </script>

                        <script type="text/template" class="social-edited-date">
                            <span class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{updateDate}}"></span>
                        </script>

                    </div>
                    <#recover>
                    <#include "/social_error.ftl">
                    </#attempt>
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
        }
        /*.modal-header {*/
            /*color: white;*/
        /*}*/
        /*.modal {*/
            /*box-shadow: none !important;*/
        /*}*/
        /*.modal-content {*/
            /*background: none !important;*/
            /*border: none !important;*/
        /*}*/
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
                    content: '<video style="max-height: 500px" src="/socialmedia/api/rest/media/mediafile/intranet-legado/VIDEO/'+e+'?.mp4" type="video/mp4" class="fp-engine" preload controls autoplay x-webkit-airplay="allow"></video>',
                    id: 'fluig-modal',
                    size:'full',
                    actions: []
                });
            }
        });

        $(document).ready(function () {
            $('.videosW').mouseenter(function (el) {
                $(this).find('.fadeOutVideo').fadeIn('fast');
            });
            $('.videosW').mouseleave(function (el) {
                $(this).find('.fadeOutVideo').fadeOut('fast');
            });
        });
    </script>
</div>
