var SocialTimeline = SuperWidget
	.extend({

		alias: null,
		aliasPage: null,
		community: null,
		context: null,
		continueScroll: null,
		enableScroll: null,
		instanceId: null,
		limit: null,
		locale: null,
		orderType: null,
		permissionOrder: null,
		postId: null,
		quantityPublication: null,
		socialAlias: null,
		socialName: null,
		socialType: null,
		style: null,
		tenantId: null,
		tenantURI: null,
		commandKey: false,

		$listPostDOM: null,
		$btnShowMore: null,
		thumbEnum: '640_AUTO',
		commentsLimit: 10,
		loggedUserAlias: null,
		configOrderType: null,
		entityRetrieveUndergoing: null,
		timeInteraction: null,
		validImagesFilesTypes: ['25.png', '77.png', '79.png', '26.png', 'jpeg.png', 'jpg.png', 'png.png', 'gif.png'],
		validVideosFilesTypes: ['104.png', '105.png', 'flv.png', 'mp4.png', '.flv', '.mp4'],
		mentionsObj: null,
		replicationServerAccessible: false,

		videoPlayers: [], /* FlowPlayer instances */

		i18n: {
			'titles': {
				'denounce': 'Denunciar',
				'publication': 'Publicação'
			},
			'labels': {
				'version': 'Versão',
				'revision': 'Revisão',
				'details': 'Ver mais',
				'sharedsocial': 'foi compartilhado(a)',
				'documentremoved': 'Conteúdo removido',
				'unreachableContent': 'Conteúdo inacessível',
				'lastpublications': 'Últimas publicações',
				'this.publication': 'uma publicação',
				'this.content': 'um conteúdo',
				'this.article': 'um artigo',
				'this.form': 'um formulário',
				'this.image': 'essa imagem',
				'this.video': 'esse video',
				'this.gallery': 'essa galeria',
				'this.connection': 'uma conexão',
				'this.document': 'um documento',
				'recommended': 'compartilhou',
				'on': 'em',
				'via': 'via',
				'LAST_UPDATE': 'Comentários recentes',
				'MORE_LIKE': 'Quantidade de apoios',
				'MY_PUBLICATIONS': 'Minhas publicações',
				'CREATION_DATE': 'Últimas publicações',
				'timelinewithoutcontent': 'Timeline sem conteúdo',
				'notcontent': 'Não existe conteúdo publicado',
				'incommunity': 'na comunidade',
				'errorvideo': 'Para visualizar o vídeo, por favor habilite o JavaScript, e considere a atualização para um navegador que suporte vídeo HTML5.',
				'like': 'Apoiar',
				'dislike': 'Cancelar apoio',
				'manylike': 'apoia(m)',
				'comment': 'Comentar',
				'leaveyourcomment': 'Deixe seu comentário',
				'startwatching': 'Notificar',
				'stopwatching': 'Parar de notificar',
				'manywatch': 'acompanha(m)',
				'recommend': 'Compartilhar',
				'denounce': 'Denunciar',
				'remove': 'Remover',
				'manycomment': 'comentaram',
				'postnotfound': 'Publicação não encontrada',
				'postnotfoundmessage': 'Esta publicação pode ter sido removida ou você não possui permissão suficiente para visualizá-la.',
				'unavailabletimeline': 'Timeline inacessível!',
				'contactadministrator': 'Entre em contato com o administrador para obter mais informações sobre restrições de acesso.',
				'commentsending': 'Enviando...',
				'documentView': 'Visualização de documento',
				'anwser': 'responder',
				'errorLoadingArticle': 'Erro ao carregar artigo.',
				'edit' :'Editar',
				'edited' :'Editado',
				'in' :'em',
				'cancel' :'Cancelar',
				'publish' :'Publicar',
			},
			'messages': {
				'genericerror': 'Ocorreu uma falha na comunicação. Atualize a página e tente novamente.',
				'confirm.post.exclusion': 'Confirma a exclusão do post?',
				'confirm.comment.exclusion': 'Confirma a exclusão do comentário?',
				'comment.empty': 'Preencha o comentário',
				'comment.max': 'O comentário deve ter até 600 caracteres',
				'comment.max.denounce': 'O comentário deve ter até 255 caracteres',
				'remove.post': 'Remover publicação',
				'remove.comment': 'Remover comentário',
				'video.not.supported': 'Ops, esse vídeo não é suportado pelo seu navegador. Faça o download do vídeo ou utilize outro navegador.',
				'post.denounced': 'O conteúdo foi denunciado por conter palavras restritas e não está mais disponível',
				'comment.denounced': 'Devido a suspeita de conteúdo ofensivo, seu comentário será temporariamente removido.',
				'denounce.reason.empty': 'O motivo da denúncia deve ser preenchido.',
				'denounce.content.invalid': 'Conteúdo da descrição da denúncia inválido',
				'videoNotSupported': 'Esse vídeo não é suportado pelo seu navegador.',
				'videoNotSupportedDownload': 'Faça o download do vídeo',
				'videoNotSupportedSulfix': 'ou utilize outro navegador.',
				'post.success.edited': 'Post editado',
				'comment.success.edited': 'Comentário editado'
			}
		},

		bindings: {
			local: {
				'timeline-action': ['click_timelineAction'],
				'timeline-submit-comment': ['submit_timelineCommentAction'],
				'timeline-show-more-posts': ['click_showMorePosts'],
				'timeline-show-more-comments': ['click_showMoreComments'],
				'fluig-share': ['click_share'],
				'content-text-edit': ['keyup_resetCountText', 'focus_resetCountText', 'blur_resetCountText', 'input_resetCountText']
			},
			global: {
				'denounce-post': ['click_denounce']
			}
		},

		init: function() {

			var that = this;
			this.timeInteraction = FLUIGC.timeInteraction;

			// Tratamento provisório para mudar o title da página
			// quando a visualização for "singlepost".
			if (this.style === 'singlepost') {
				$('head').find('title').text(this.i18n.titles['publication']);
			}

			this.loggedUserAlias = WCMAPI.getUserLogin();
			this.configOrderType = this.orderType;

			this.showTimeline();

			if (this.continueScroll && !this.isEditMode && this.style !== 'singlepost') {
				$(window).onScrollEnd(function() {
					if (!that.entityRetrieveUndergoing) {
						that.entityRetrieveUndergoing = true;
						that.listPosts();
					}
				});
			}

			WCMAPI.addListener(this, 'newpostalert', this.showPostedPost);
			WCMAPI.addListener(this, 'newPostEvent', this.showPostedPost);
			WCMAPI.addListener(this, 'removepostalert', this.removePostedPost);
		},

		articleLinkAction: function(el, ev) {
			var $el = $(el), that = this;
			if (FLUIGC.utilities.ctrlIsPressed(ev)) {
				var articleHref = $(el).data('href');
				window.open(articleHref, '_blank');
			} else {
				var articleId = $el.attr('data-articleId'), articleTitle = $el.attr('data-articleTitle'), communityAlias = this.socialAlias;
				SOCIALBC.viewArticle({
					'title': articleTitle,
					'articleId': articleId,
					'alias': communityAlias,
					'instanceId': that.instanceId
				}, function(error, data) {
					if (error) {
						FLUIGC.toast({
							message: that.i18n.labels['errorLoadingArticle'],
							type: 'danger'
						});
					}
					$('[data-close-articleview]').on('click', function() {
						$('#articleview-modal-' + that.instanceId).modal('hide');
					});
				});
			}
		},

		showTimeline: function() {
			var data = {}, html;

			data.i18n = this.i18n['labels'];
			data.order = this.i18n.labels[this.orderType];
			data.viewOrdering = this.style !== 'singlepost';
			data.orderActions = this.generateOrderAction();

			html = Mustache.render(this.templates['social-timeline-master-template'], data, {
				btnOrderAction: this.templates['social-timeline-btn-order-template']
			});

			this.DOM.removeClass('wcm-widget-timeline-loading').append(html);

			this.$listPostDOM = $('[data-timeline-list-posts]', this.DOM);

			if (this.style === 'default') {
				this.entityRetrieveUndergoing = true;
				this.listPosts();
			} else if (this.style === 'singlepost') {
				this.findPost(this.postId);
			}
		},

		listPosts: function() {
			var that = this;

			// Se estiver fazendo a listagem retorna false.
			if (!this.entityRetrieveUndergoing) {
				return false;
			}

			$('#timeline-ordering-posts', this.DOM).attr('disabled', true);

			if (this.$btnShowMore) {
				this.$btnShowMore.attr('disabled', true);
			}

			this.serviceListPosts(function(err, data) {
				if (err) {
					that.showListPostsMessage(err);
					return false;
				}

				if (data && data.content && data.content.length) {
					that.showPosts(data.content);
				} else {
					that.showListPostsMessage();
				}

				that.controlBtnShowMore(data.content.length);
			});
		},

		findPost: function(postId, isNew, evName) {
			var that = this, dataPost = [];

			this.serviceFindPost(postId, function(err, data) {
				if (err) {
					that.showListPostsMessage(err);
					return false;
				}

				if (data && data.content) {

					if (data.content.numberDenouncements == 0
						|| (data.content.numberDenouncements != 0 && data.content.permissionViewPostAdmUser == true
							&& evName != 'newPostEvent' && evName != 'newpostalert')) {
						dataPost.push(data.content);
						that.showPosts(dataPost, isNew);
					} else {
						that.showListPostsMessage();
					}

					// adicionado tratamento para exibir mensagem apenas no newPostEvent
					if (data.content.numberDenouncements != 0 && evName == 'newPostEvent') {
						that.showFeedbackMessage(that.i18n.messages['post.denounced'], 'warning');
					}
				}

			});

		},

		showPosts: function(posts, isNew) {
			var that = this;
			var data = {}, html = '', len = posts.length, i = 0, comLen, j;

			// Validar se o post a ser exibido já está na listagem.
			if (isNew && $('[data-post-id="' + posts[0].postId + '"]', this.DOM).length) {
				return false;
			}

			// Responsável por manipular os dados de posts retornados no objeto "posts" e enviar
			// os mesmos prontos para o mustache montar o post.
			for (i; i < len; i++) {
				// Garantir que a timeline apresente algum post sem quebrar o script.
				try {
					posts[i].tenantURI = this.tenantURI;
					posts[i].locale = this.locale;
					posts[i].text = this.generateContentTextFormatted(posts[i].text, posts[i].mentions);
					posts[i].variableContent = this.generateTemplateVariableContent(posts[i]);
					posts[i].postHeader = this.generatePostHeader(posts[i]);
					posts[i].i18n = this.i18n['labels'];
					posts[i].allowsRemoveActions = this.loggedUserAlias === posts[i].user.alias;
					posts[i].existsNumberLikes = this.generateListClass(posts[i].numberLikes);
					posts[i].existsNumberComments = this.generateListClass(posts[i].numberComments);
					posts[i].existsNumberWatchers = this.generateListClass(posts[i].numberWatchers);
					posts[i].existsNumberShares = this.generateListClass(posts[i].numberShares);
					posts[i].existsMoreComments = posts[i].numberComments > 2;
					posts[i].shared = 'fs-display-inline-block' == posts[i].existsNumberShares;
					posts[i].sourceShare = posts[i].originShare ? posts[i].originShare.alias : posts[i].user.alias;
					posts[i].canLike = this.hasPermission(posts[i].permissions,'LIKE');
					posts[i].canComment = this.hasPermission(posts[i].permissions,'COMMENT');
					posts[i].canNotify = this.hasPermission(posts[i].permissions,'NOTIFY_POST');
					posts[i].canShare = this.hasPermission(posts[i].permissions,'SHARE');
					posts[i].canDenounce = this.hasPermission(posts[i].permissions,'DENOUNCE');

					posts[i].allowsEditActions = ((this.loggedUserAlias === posts[i].user.alias) && (this.hasPermission(posts[i].permissions,'EDIT')));
					posts[i].updateDate =  posts[i].updateDate != null ? that.formatUpdateDate(posts[i].updateDate) : false;

					comLen = posts[i].comments.length;
					j = 0;

					// Responsável por manipular os dados de comentários retornados no objeto "posts".
					for (j; j < comLen; j++) {
						posts[i].comments[j].allowsRemoveActions = this.loggedUserAlias === posts[i].comments[j].user.alias;
						posts[i].comments[j].allowsEditActions = ((this.loggedUserAlias === posts[i].comments[j].user.alias) && (this.hasPermission(posts[i].permissions,'EDIT')));
						posts[i].comments[j].existsNumberLikes = this
							.generateListClass(posts[i].comments[j].numberLikes);
						posts[i].comments[j].comment = this.generateContentTextFormatted(posts[i].comments[j].comment,
							posts[i].comments[j].mentions);
						posts[i].comments[j].updateDate =  posts[i].comments[j].updateDate != null ? that.formatUpdateDate(posts[i].comments[j].updateDate) : false;
					}

					// Esse tratamento é feito pois quando um post é criado, o serviço de acompanhar
					// automaticamente é assincrono, então ao exibir o post na tela o mesmo não está
					// acompanhado pelo usuário criador ainda.
					if (isNew && this.loggedUserAlias === posts[i].user.alias) {
						posts[i].watching = true;
						posts[i].numberWatchers = 1;
						posts[i].existsNumberWatchers = 'fs-display-inline-block';
					}

					html += Mustache.render(this.templates['social-timeline-post-template'], posts[i], {
						postComments: this.templates['social-timeline-comment-template'],
						postMoreComments: this.templates['social-timeline-show-more-comments-template'],
						postContent: this.templates[posts[i].variableContent.tlpName]
					});

				} catch (err) {
					if (console) {
						console.log(posts[i] || '', err);
					}
				}
			}

			// Validar se é um novo post ou listagem/paginação.
			if (isNew) {
				$('[data-timeline-content-message]', this.DOM).remove();
				this.$listPostDOM.prepend(html);
			} else {
				this.$listPostDOM.append(html);
			}

			$('#timeline-ordering-posts', this.DOM).removeAttr('disabled');

			if (this.$btnShowMore) {
				this.$btnShowMore.removeAttr('disabled');
			}

			this.showVideos();
			this.showImages();
			this.showCardPopover();
			this.instanceTimeInteraction();
			this.entityRetrieveUndergoing = false;
		},

		hasPermission: function(permissions, permission) {
			return permissions && permissions.indexOf(permission) > - 1;
		},

		showComments: function(data, $post, isNew) {
			var len = data.length, i = 0, html = '';

			for (i; i < len; i++) {
				try {
					data[i].tenantURI = this.tenantURI;
					data[i].comment = this.generateContentTextFormatted(data[i].comment, data[i].mentions);
					data[i].i18n = this.i18n['labels'];
					data[i].allowsRemoveActions = this.loggedUserAlias === data[i].user.alias;
					data[i].existsNumberLikes = this.generateListClass(data[i].numberLikes);
					//novos comentários não tem o permissionamento do post

					if($post.data("post-permissions")){
						permissions = $post.data("post-permissions").split(",");
						data[i].canLike = this.hasPermission(permissions,'LIKE');
						data[i].canDenounce = this.hasPermission(permissions,'DENOUNCE');
						data[i].allowsEditActions = (this.loggedUserAlias === data[i].user.alias && this.hasPermission(permissions,'EDIT'));

					}

					html += Mustache.render(this.templates['social-timeline-comment-template'], data[i]);
				} catch (err) {
					if (console) {
						console.log(data[i] || '', err);
					}
				}
			}

			// Validar se é um novo comentário ou listagem/paginação.
			if (isNew) {
				$post.find('[data-timeline-container-comment]').after(html);
			} else {
				$post.find('[data-comment-id]:last').after(html);
			}

			this.showVideos();
			this.showCardPopover();
			this.instanceTimeInteraction();
		},

		showPostedPost: function(evName, data) {
			if (isNaN(data)) {
				if (this.socialType == "COMMUNITY" && data.postTargetAlias != this.socialAlias) {
					return false;
				}
				data = data.postId;
			}

			this.findPost(data, true, evName);
		},

		showUnreachableContentWarning: function(el, ev) {
			var html = Mustache.render(this.templates['social-timeline-unreachable-content-template'], this.i18n['labels']);
			$(el).parent().replaceWith(html);
		},

		removePostedPost: function(evName, data) {
			var idPost = data.postId;
			var post = $("[data-post-id=" + idPost + "]").empty();
			data.i18n = this.i18n['labels'];
			var html = Mustache.render(this.templates['social-timeline-content-removed-template'], data);
			post.append(html);
		},

		showMorePosts: function(el, ev) {
			this.entityRetrieveUndergoing = true;
			this.listPosts();
		},

		showMoreComments: function(el, ev) {
			var that = this, $el = $(el), $post = $el.parents('[data-post-id]'), postId = $el
				.data('timeline-show-more-comments'), offset = $post.find('[data-comment-id]').length;

			$el.attr('disabled', true);

			this.serviceListComments(postId, offset, function(err, data) {
				$el.removeAttr('disabled');

				if (err) {
					that.showMessageError(err);
					return false;
				}

				if (data && data.length) {
					if (data.length < that.commentsLimit) {
						$el.parent().remove();
					}
					that.showComments(data, $post, false);
				} else {
					$el.parent().remove();
				}
			});
		},

		showListPostsMessage: function(err) {
			var hasPosts = this.$listPostDOM.find('[data-post-id]').length, hasMessage = $(
				'[data-timeline-content-message]', this.DOM).length, tlpName = 'social-timeline-message-no-results-template', data = {}, html;

			$('#timeline-ordering-posts', this.DOM).removeAttr('disabled');

			if (err) {
				tlpName = 'social-timeline-message-list-error-template';
			} else if (this.style === 'singlepost') {
				tlpName = 'social-timeline-message-post-not-found-template';
			}

			if (!hasPosts && !hasMessage) {
				data.i18n = this.i18n['labels'];
				data.isCommunity = this.socialType === 'COMMUNITY';
				data.tenantURI = this.tenantURI;
				data.socialAlias = this.socialAlias;
				data.socialName = this.socialName;
				data.socialType = this.socialType;

				html = Mustache.render(this.templates[tlpName], data);

				this.$listPostDOM.append(html);
			}
		},

		showMessageError: function(err) {
			var errorMessage;

			try {
				errorMessage = JSON.parse(err.responseText);
				errorMessage = errorMessage.message.message;
			} catch (e) {
				errorMessage = err.responseText || '';
			}

			this.showFeedbackMessage(errorMessage, 'danger');
		},

		showFeedbackMessage: function(message, type) {
			message = message || this.i18n.messages['genericerror'];
			type = type || 'success';

			FLUIGC.toast({
				message: message,
				type: type
			});
		},

		showBtnShowMore: function() {
			var html = Mustache.render(this.templates['social-timeline-show-more-posts-template']);
			this.$listPostDOM.after(html);
			this.$btnShowMore = $('[data-timeline-show-more-posts]', this.DOM);
		},

		showVideos: function() {

			var that = this,
				$wrapper = $('.timeline-video-wrapper')
				loading = FLUIGC.loading($wrapper)
			;

			var forceRequestAnd = function(assetUrl, cbk) {

				loading.show();

				var download = new Image();
				download.src = assetUrl + '?n=' + Math.random();
				download.onload = cbk;
			};

			var mountPlayers = function() {

				$($wrapper, this.DOM).each(function() {

					var $videoEl = $('[data-video-player]', this);

					loading.hide();

					that.videoPlayers.push(FLUIGC.player(
						"#" + $videoEl.prop('id'),
						$videoEl.data('url') + '&.' + $videoEl.data('video-type'),
						{ ratio: 9/16 }
					));
				});
			};

			forceRequestAnd('/portal/resources/images/logo.png', mountPlayers);

		},

		showImages: function() {
			var that = this;
			var allCarousels = $("div.start-images-carousel", this.DOM);

			for (var i=0; i < allCarousels.length; i++) {
				var carousel = $(allCarousels[i]);
				var images = [];
				var imageObjs = carousel.children("div").data("attachments");

				for(var x = 0; x < imageObjs.length; x++) {
					var imageObj = imageObjs[x];
					var docId = imageObj.objectClass ? imageObj.objectClass.match(/(?:.*)\.(.+)/)[1] : '';
					var img = {
						documentId: docId,
						documentVersion: imageObj.objectId,
				        src: "/webdesk/streamcontrol/?WDCompanyId=" + imageObj.tenantId
				        	+ "&WDNrDocto=" + docId
				        	+ "&WDNrVersao=" + imageObj.objectId
				        	+ "&thumbnail=" + that.thumbEnum
				    }

					images.push(img);
				}

				var settings = {
				    images: images,
				    indicators: true,
				    startIndex: 0,
				    interval: false,
				    template: '.image-carousel-template'
				};

				var imagesCarousel = FLUIGC.carousel(carousel, settings);
				carousel.removeClass("start-images-carousel");
			}
		},

		showCardPopover: function() {
			socialGlobal.showCardPopover();
		},

		instanceTimeInteraction: function() {
			this.timeInteraction.init({
				parent: '#socialTimeline_' + this.instanceId,
				period: 15000
			});
		},

		controlBtnShowMore: function(postsLen) {
			if (postsLen < this.limit) {
				if (this.$btnShowMore) {
					this.$btnShowMore.remove();
				}
			} else if (!this.$btnShowMore) {
				this.showBtnShowMore();
			}
		},

		changeStatusOrderButton: function($el) {
			var data = {}, html;

			data.order = this.i18n.labels[this.orderType];
			data.orderActions = this.generateOrderAction();

			html = Mustache.render(this.templates['social-timeline-btn-order-template'], data);

			$el.parents('[data-timeline-order]').replaceWith(html);
		},

		timelineAction: function(el, ev) {
			var $el = $(el), type = $el.data('timeline-action'), id = $el.parents('[data-comment-id]').data(
				'comment-id')
				|| $el.parents('[data-post-id]').data('post-id');

			ev.preventDefault();
			ev.stopPropagation();

			this[type + 'Action'](el, ev, id);
		},

		downloadVideoAction: function(el, ev, id) {
			var $el = $(el), $post = $el.parents('[data-post-id="' + id + '"]'), restUrl = $post.find(
				'[data-video-rest-url]').data('video-rest-url');

			window.location = restUrl;
		},

		openDocumentAction: function(el, ev) {
			var $el = $(el), postInfo = {
			    that: this,
			    documentId: $el.data('timeline-document-id'),
			    version: $el.data('timeline-document-version')
			}
			WCMAPI.isReplicationServerAccessible(postInfo, this.openDocumentViewAction);
		},

        openDocumentViewAction : function(postInfo, replicationServerAccessible) {
            postInfo.that.replicationServerAccessible = replicationServerAccessible;
            var that = postInfo.that;
            WCMAPI.Read({
                type: "GET",
                url: ECM.restUrl + "documentView/contentVersion/" + postInfo.documentId + "/" + postInfo.version +
                    "/" + that.replicationServerAccessible,
                async: false,
                success: function(doc) {
                    if (doc != undefined && doc.documentType == "1") {
                        window.location = WCMAPI.getProtectedContextPath() + "/" + WCMAPI.tenantCode
                            + "/ecmnavigation?app_ecm_navigation_folder=" + postInfo.documentId;
                    } else {
                        ECM.documentView = new Object();
                        var cfg = {
                            url: "/ecm_documentview/documentView.ftl",
                            width: 750,
                            height: 500,
                            title: that.i18n.labels['documentView'],
                            styleGuide: true,
                            getDocument: function() {
                                setTimeout(function() {
                                    if (!ECM.documentView.getDocument) {
                                        cfg.getDocument();
                                        return;
                                    }
                                    if (doc != undefined) {
                                        ECM.documentView.loadDoc(doc);
                                    } else {
                                        ECM.documentView.getDocument(postInfo.documentId, postInfo.version);
                                    }
                                }, 500);
                            },
                            callBack: function() {
                                cfg.getDocument();
                            },
                            customButtons: new Array()
                        };

                        ECM.documentView.panel = WCMC.panel(cfg);
                        ECM.documentView.panel.bind("panel-load", function() {
                        });

                        ECM.documentView.panel.bind("panel-close", function() {
                            if (ECM.documentView.toUndefined == undefined || ECM.documentView.toUndefined) {
                                ECM.documentView = undefined;
                            }
                        });
                    }
                }
            });
        },

		orderAction: function(el, ev) {
			var $el = $(el), order = $el.data('order-type');

			this.$listPostDOM.empty();
			this.orderType = order;
			this.changeStatusOrderButton($el);
			this.entityRetrieveUndergoing = true;
			this.listPosts();
		},

		searchAction: function(el, ev) {
			socialGlobal.showSearch($(el).text());
		},

		denounceAction: function(el, ev, id) {
			var that = this, $el = $(el), requestRunning = $el.data('request-running');

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			// Migrar a ftl de denuncia para um componente no SOCIALBC.
			WCMAPI.convertFtlAsync('socialtimeline', 'denounce.ftl', '{"sociableId":"' + id + '"}', function(data) {
				$(data).dialog({
					title: that.i18n.titles['denounce'],
					dialogClass: 'w-fixed',
					width: 460
				});

				$el.data('request-running', false);
			});
		},

		// TO DO: Unificar as funções de "supportAction" e "watchAction"
		// pois são praticamente idênticas.
		supportAction: function(el, ev, id) {
			var that = this, $el = $(el), $listAction = $el.siblings(), isLiked = $el
				.hasClass('fluigicon-thumbs-up-on'), requestRunning = $el.data('request-running'), interactionType;

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			this.serviceSupport(id, function(err, data) {
				$el.data('request-running', false);

				if (err) {
					that.showMessageError(err);
					return false;
				}

				if (!isLiked) {
					$el.removeClass('fluigicon-thumbs-up').addClass('fluigicon-thumbs-up-on').attr('title',
						that.i18n.labels['dislike']);
					interactionType = 'add';
				} else {
					$el.removeClass('fluigicon-thumbs-up-on').addClass('fluigicon-thumbs-up').attr('title',
						that.i18n.labels['like']);
					interactionType = 'remove';
				}

				that.controlInteractionActions($listAction, interactionType);
			});
		},

		// TO DO: Unificar as funções de "supportAction" e "watchAction"
		// pois são praticamente idênticas.
		watchAction: function(el, ev, id) {
			var that = this, $el = $(el), $listAction = $el.siblings(), isWatched = $el.hasClass('fluigicon-bell'), requestRunning = $el
				.data('request-running'), interactionType;

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			this.serviceWatch(id, isWatched, function(err, data) {
				$el.data('request-running', false);

				if (err) {
					that.showMessageError(err);
					return false;
				}

				if (!isWatched) {
					$el.removeClass('fluigicon-bell-empty').addClass('fluigicon-bell').attr('title',
						that.i18n.labels['stopwatching']);
					interactionType = 'add';
				} else {
					$el.removeClass('fluigicon-bell').addClass('fluigicon-bell-empty').attr('title',
						that.i18n.labels['startwatching']);
					interactionType = 'remove';
				}

				that.controlInteractionActions($listAction, interactionType);
			});
		},

		// TO DO: Unificar as funções de "listLikesAction" e "listWatchersAction"
		// pois são praticamente idênticas.
		listLikesAction: function(el, ev, id) {
			var $el = $(el), requestRunning = $el.data('request-running'), widgetParams = {
				sociableId: id,
				listType: 'SOCIABLE',
				customInstance: WCMAPI.generateId()
			};

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			socialGlobal.likeUsersList(widgetParams, null, function(err, data) {
				$el.data('request-running', false);
			});
		},

		// TO DO: Unificar as funções de "listLikesAction" e "listWatchersAction"
		// pois são praticamente idênticas.
		listWatchersAction: function(el, ev, id) {
			var $el = $(el), requestRunning = $el.data('request-running'), widgetParams = {
				sociableId: id,
				listType: 'SOCIABLE',
				customInstance: WCMAPI.generateId()
			};

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			socialGlobal.watchUsersList(widgetParams, null, function(err, data) {
				$el.data('request-running', false);
			});
		},

		listSharesAction: function(el, ev, id) {
			SOCIALBC.shareListModal({
				sociableId: id,
				instanceId: Date.now()
			});
		},

		commentAction: function(el, ev, id) {
			var $el = $(el), $post = $el.parents('[data-post-id]'), data = {}, html;

			if (!$post.find('[data-timeline-container-comment]').length) {
				data.i18n = this.i18n['labels'];
				html = Mustache.render(this.templates['social-timeline-add-comment-template'], data);
				$post.find('[data-timeline-list-comments]').prepend(html);
				this.instanceMentions();
			}

			this.toogleCommentArea($post);
		},

		timelineCommentAction: function(el, ev) {
			var that = this, $el = $(el), $btn = $el.find('[data-submit-comment]'), $post = $el
				.parents('[data-post-id]'), $comment = $post.find('[data-comment-textarea]'), id = $post
				.data('post-id'), comment = $comment.val().trim(), $listAction, commentData = [], html;

			ev.preventDefault();
			ev.stopPropagation();

			$btn.button('loading');

			// Pegando o valor do comentario com as mentions.
			$comment.mentionsInput('val', function(text) {
				comment = text;
			});

			if (!comment) {
				socialGlobal.alert(this.i18n.messages['comment.empty']);
				$btn.button('reset');
				$comment.focus();
				return false;
			}

			if (comment.length > 600) {
				socialGlobal.alert(this.i18n.messages['comment.max']);
				$btn.button('reset');
				$comment.focus();
				return false;
			}

			this.serviceComment(id, comment, function(err, data) {
				var denounced = false;
				if (err) {
					$btn.button('reset');
					that.showMessageError(err);
					return false;
				}

				data = data.content;
				denounced = data.numberDenouncements > 0
				if (denounced) {
					that.showFeedbackMessage(that.i18n.messages['comment.denounced'], 'warning');
				} else {
					commentData.push(data);
				}
				$listAction = $post.find('[data-timeline-action="comment"]').siblings();

				that.toogleCommentArea($post);
				that.controlInteractionActions($listAction, 'add');
				that.showComments(commentData, $post, true);
			});
		},

		openAnswerFormAction: function(el, ev) {
			var $el = $(el), documentId = $el.data('timeline-form-id');
			if (FLUIGC.utilities.ctrlIsPressed(ev)) {
				var articleHref = $el.attr('href');
				window.open(articleHref, '_blank');
			} else {
				SOCIALBC.openAnswerForm(documentId);
			}
		},

		toogleCommentArea: function($post) {
			var that = this;

			$post.find('[data-timeline-container-comment]').stop(true, true).slideToggle('fast', function() {
				$post.find('[data-submit-comment]').button('reset');
				$(this).css('overflow', 'visible');
				that.resetMentions();
			}).find('[data-comment-textarea]').focus();
		},

		instanceMentions: function() {
			var element = 'data-comment-textarea-mentions';
			selector = '[' + element + ']';

			socialGlobal.mentionsInput(selector);

			// Tratamento feito para que nao seja instanciado novamente o plugin
			// mentions nos elementos que já foram instanciados.
			$(selector).removeAttr(element);
		},

		resetMentions: function(parent) {
			if (parent) {
				$('[data-comment-textarea]', parent).mentionsInput('reset', null);
				return false;
			}

			$('[data-comment-textarea]').mentionsInput('reset', null);
		},

		/* --- EDIÇÃO DE POSTS E COMENTÁRIOS --- */
		// ação para apendar um textarea e editar o post
		editPostAction: function(el, ev, id) {
			var that = this;
			// clique no botão de editar do mesmo post, ação nula.
			if($('[name="content-text-edit-' + id +'"]').length > 0){
				return;
			}
			this.cancelEditAction();
			$(el).addClass('fs-transparent-25');
			that.mentionsObj = null;
			var postText = $('[data-timeline-content-' + id + ']', this.DOM);
			// recupera o conteúdo do post
			this.serviceFindPost(id, function(err, data) {
				if (err) {
					that.showListPostsMessage(err);
					return false;
				}

				if (data && data.content) {
					var count = 600 - data.content.text.length;
					postText.hide(0, function() {
						var html = Mustache.render(that.templates['social-timeline-edit-content-template'], {
							id: id,
							text: data.content.formattedWithoutMention,
							count: count,
							sociable: 'editPost',
							i18n: that.i18n['labels']
						});
						$('[data-edit-area-' + id + ']', this.DOM).append(html);
						$('[data-edit-area-' + id + ']', this.DOM).css('margin-bottom', '70px');
						$('[data-edit-area-' + id + ']', this.DOM).css('margin-top', '35px');
						that.mentions();
						that.mentionsObj = data.content.mentions;
						// Posicionar no início da publicação
						var where = $(window).scrollTop();
						if(where > 200){
							$("html, body").animate({ scrollTop: $('[data-edit-area-' + id + ']').parent().offset().top - 70 + "px" });
						}
					});
				}
			});
		},

		// ação para apendar um textarea e editar o comentário
		editCommentAction: function(el, ev, id) {
			var that = this;
			// clique no botão de editar do mesmo comentário, ação nula.
			if($('[name="content-text-edit-' + id +'"]').length > 0){
				return;
			}
			this.cancelEditAction();
			$(el).addClass('fs-transparent-25');
			that.mentionsObj = null;
			// recupera o conteúdo do comentário
			var commentText = $('[data-timeline-content-' + id + ']', this.DOM);
			this.serviceFindComment(id, function(err, data) {
				if (err) {
					that.showListPostsMessage(err);
					return false;
				}
				if (data && data.content) {
					var count = 600 - data.content.commentWithoutMention.length;
					commentText.hide(0, function() {
						var html = Mustache.render(that.templates['social-timeline-edit-content-template'], {
							id: id,
							text: data.content.commentWithoutMention,
							count: count,
							sociable: 'editComment',
							i18n: that.i18n['labels']
						});
						$('[data-edit-area-' + id + ']', this.DOM).append(html);
						$('[data-edit-area-' + id + ']', this.DOM).css('margin-top', '35px');
						that.mentions();
						that.mentionsObj = data.content.mentions;
					});
				}
			});
		},

		// antes de abrir um textarea para edição, remove qualquer outra edição em aberto e volta a exibir o conteúdo atual
		// TODO verificar se está implementado da melhor maneira
		cancelEditAction: function(){
			$('a.fluigicon-pencil').removeClass('fs-transparent-25');
			$('.timeline-text-content').show();
			$('.timeline-edit-area').html("");
			$('.timeline-edit-area').css('margin-bottom', '0px');
		},

		// publica a edição do posts/comentario
		saveEditAction: function(el, ev, id){
			var that = this;
			var newText = "";
			var sociable = $('#content-text-edit').data('sociable-type');

			$('#content-text-edit').mentionsInput('val', function(text) {
				newText = text;
			});

			if (that.mentionsObj) {
				var listMentions = Object.keys(that.mentionsObj);
				listMentions.forEach(function(data, i) {
				    var regex = new RegExp('\\b' + that.mentionsObj[data] + '\\b', 'g');
				    newText = newText.replace(regex, '@[' + data + ']');
				});
			}

			this.serviceEditPostOrComment(sociable, id, newText, function(err, data) {
				if (err) {
					that.showMessageError(err);
					return false;
				}

				var msg = 'post.success.edited';
				if(sociable == 'editComment'){
					msg = 'comment.success.edited';
				};
				FLUIGC.toast({
					message: that.i18n.messages[msg],
					type: 'success'
				});
				that.getNewContent(id, sociable);
				if(sociable != 'editComment') {
					// Posicionar no início da publicação
					var where = $(window).scrollTop();
					console.log(where);
					if(where > 200){
						$("html, body").animate({ scrollTop: $('[data-edit-area-' + id + ']').parent().offset().top - 70 + "px" });
					}
				}
			});
		},

		// recupera o conteudo editado via API
		getNewContent: function(id, sociable){
			var that = this;
			if (sociable == 'editPost') {
				this.serviceFindPost(id, function(err, data) {
					if (err) {
						that.showListPostsMessage(err);
						return false;
					}

					if (data && data.content) {
						that.replaceContent(id, data.content.text, data.content.mentions);
					}
				});
			} else{
				this.serviceFindComment(id, function(err, data) {
					if (err) {
						that.showListPostsMessage(err);
						return false;
					}

					if (data && data.content) {
						that.replaceContent(id, data.content.comment, data.content.mentions);
					}
				});
			}
		},

		// troca o conteúdo na tela e aplicar efeito de highlight
		// TODO verificar se está implementado da melhor maneira
		replaceContent: function(id, text, mentions){
			this.cancelEditAction();
			this.insertEditedIcon(id);
			var el =  $('[data-timeline-content-' + id + ']', this.DOM);
			el.html(this.generateContentTextFormatted(text, mentions));
			el.parent().parent().effect("highlight", {color: "#f5f5f5"}, 1500);
		},

		insertEditedIcon: function(id){
			var div = $('[data-edited-date-' + id + ']');
			var title = this.i18n.labels['edited'] + " " + this.i18n.labels['in'] + " " + this.formatUpdateDate(new Date());
			if(div.length > 0){
				var html = Mustache.render(this.templates['social-edited-date'], {
					updateDate: title
				});
				$(html).insertAfter(div);
				div.remove();
			} else{
				$('[data-icon-edited-date-' + id +']').attr('title', title);
			}
		},

		// contador para edição de posts e comentários
		resetCountText: function() {
			var textLimitEdit = $('.post-text-limit-edit'),
				contentTextEdit = $('#content-text-edit'),
				saveEditButton  = $('.edit-content-button'),
				textLength = contentTextEdit.val().length,
				total = 600 - textLength;

				textLimitEdit.html(total);

			if (total < 0 || textLength < 2) {
				if (textLength < 2) {
					contentTextEdit.css({
						"outline": "none"
					});
					textLimitEdit.css({
						"color": "#656565"
					});
				} else {
					contentTextEdit.css({
						"outline": "#DAA8A9 solid 2px",
						"outline-offset": "-2px"
					});
					textLimitEdit.css({
						"color": "#f00"
					});
				}
				saveEditButton .attr("disabled", "disabled");
			} else {
				textLimitEdit.css({
					"color": "#656565"
				});
				saveEditButton .removeAttr("disabled");
				contentTextEdit.css({
					"outline": "none"
				});
			}
		},

		// adiciona o mecanismo de menção na edição de posts/comentários
		mentions: function() {
			var that = this;

			socialGlobal.mentionsInput('#content-text-edit', true, function(ev) {
				that.resetCountText();
			});
		},
		/* --- FIM: EDIÇÃO DE POSTS E COMENTÁRIOS --- */

		removeAction: function(el, ev, id) {
			var that = this, $el = $(el), type = 'post', message = this.i18n.messages['confirm.post.exclusion'], title = this.i18n.messages['remove.post'], requestRunning = $el
				.data('request-running'), $listAction;

			if (requestRunning) {
				return false;
			}

			$el.data('request-running', true);

			// Validar se é um post ou comentário que está sendo removido
			// e altera algumas informações.
			if ($el.parents('[data-comment-id]').length) {
				type = 'comment';
				message = this.i18n.messages['confirm.comment.exclusion'];
				title = this.i18n.messages['remove.comment'];
			}

			FLUIGC.message.confirm({
				message: message,
				title: title,
				size: 'small'
			}, function(result, el, ev) {
				if (result) {
					that.serviceRemove(id, type, function(err, data) {
						$el.data('request-running', false);
						if (err) {
							that.showMessageError(err);
							return false;
						}

						if (type === 'comment') {
							$listAction = $el.parents('[data-post-id]').find('[data-timeline-action="comment"]')
								.siblings();
							that.controlInteractionActions($listAction, 'remove');
						}

						$el.parents('[data-' + type + '-id]').remove();
						that.showListPostsMessage();
					});
				} else {
					$el.data('request-running', false);
				}
			});
		},

		shareAction: function(el, ev, id) {
			var $el = $(el), preview = this.processPreview($el), loggedUserAlias = WCMAPI.getUserLogin(), id = $el
				.parents('[data-comment-id]').data('comment-id')
				|| $el.parents('[data-post-id]').data('post-id'), onlyLink = $el
				.parents('[data-post-community-hidden]').data('post-community-hidden'), url = WCMAPI.getServerURL()
				+ $el.parents('.timeline-list-posts-item').find('a.fs-no-bold').attr("href")

			SOCIALBC.share($el, {
				showOnlyLink: onlyLink,
				shareType: 'SOCIABLE',
				type: 'POST',
				preview: preview,
				link: url,
				paramId: id,
				widthNoFlash: '200px'
			});
		},

		processPreview: function($el) {
			var $previewVideo = $el.parents('.timeline-list-posts-item').find('[data-url-media]'), imgEl, miniature, preview;

			if ($previewVideo.length) {
				imgEl = $('<img>');
				imgEl.attr('src', $previewVideo.data('url-media'));
				imgEl.addClass('media-photo');
				return imgEl.wrap('<p>').parent().html();
			} else {
				miniature = $el.parents('.timeline-list-posts-item').find('.panel-body');
				preview = $(miniature).find('.timeline-recommendation-content');
				if (preview.length) {
					preview = preview.clone().wrap('<p>').parent().html();
					preview = preview.replace(/well+/, '');
					return preview;
				}
				return miniature.clone().wrap('<p>').parent().html();
			}
		},

		controlInteractionActions: function($el, interactionType) {
			var numberInteraction = +$el.text();

			if (interactionType === 'add') {
				++numberInteraction;
			} else {
				--numberInteraction;
			}

			if (numberInteraction > 0) {
				$el.text(numberInteraction).removeClass('hidden').addClass('fs-display-inline-block');
			} else {
				$el.text(numberInteraction).removeClass('fs-display-inline-block').addClass('hidden');
			}
		},

		returnOthersOrderTypes: function() {
			var index, allOrderTypes;

			allOrderTypes = ['CREATION_DATE', 'LAST_UPDATE', 'MY_PUBLICATIONS', 'MORE_LIKE'];
			index = allOrderTypes.indexOf(this.orderType);
			allOrderTypes.splice(index, 1);
			return allOrderTypes;

		},

		generateOrderAction: function() {
			var orderType = this.orderType, otherOrderType = this.returnOthersOrderTypes(), permissionOrder = this.permissionOrder, actions = [];

			switch (orderType) {
				case 'MY_PUBLICATIONS':
					if (permissionOrder) {
						for (var i = 0; i < otherOrderType.length; i++) {
							var optionOrderType = otherOrderType[i];
							actions.push({
								orderType: optionOrderType,
								orderName: this.i18n.labels[optionOrderType]
							});
						}
					} else {
						actions.push({
							orderType: this.configOrderType,
							orderName: this.i18n.labels[this.configOrderType]
						});
					}

					break;

				case 'CREATION_DATE':
					if (permissionOrder) {
						for (var i = 0; i < otherOrderType.length; i++) {
							var optionOrderType = otherOrderType[i];
							actions.push({
								orderType: optionOrderType,
								orderName: this.i18n.labels[optionOrderType]
							});
						}
					} else {
						actions.push({
							orderType: 'MY_PUBLICATIONS',
							orderName: this.i18n.labels['MY_PUBLICATIONS']
						});
					}

					break;

				case 'LAST_UPDATE':
					if (permissionOrder) {
						for (var i = 0; i < otherOrderType.length; i++) {
							var optionOrderType = otherOrderType[i];
							actions.push({
								orderType: optionOrderType,
								orderName: this.i18n.labels[optionOrderType]
							});
						}
					} else {
						actions.push({
							orderType: 'MY_PUBLICATIONS',
							orderName: this.i18n.labels['MY_PUBLICATIONS']
						});
					}
					break;
				case 'MORE_LIKE':
					if (permissionOrder) {
						for (var i = 0; i < otherOrderType.length; i++) {
							var optionOrderType = otherOrderType[i];
							actions.push({
								orderType: optionOrderType,
								orderName: this.i18n.labels[optionOrderType]
							});
						}
					} else {
						actions.push({
							orderType: 'MY_PUBLICATIONS',
							orderName: this.i18n.labels['MY_PUBLICATIONS']
						});
					}
					break;
			}

			return actions;
		},

		generatePostHeader: function(data) {
			var obj = {};

			obj.person = {
				personName: data.user.name,
				personAlias: data.user.alias,
				personPage: data.user.page
			};

			if (data.type === 'RECOMMENDATION') {
				obj.verb = this.i18n.labels['recommended'];

				if (!data.linkedObject || !data.linkedObject.objectClass || data.linkedObject.objectClass === 'POST') {
					obj.object = {
						objectType: this.i18n.labels['this.publication'],
						objectUrl: data.linkedObject.url || data.url
					};
				} else if (data.linkedObject && data.linkedObject.objectClass) {
					if (data.linkedObject.objectClass.indexOf('com.totvs.technology.social.relation.entity.Social') !== -1) {
						obj.object = {
							objectType: this.i18n.labels['this.connection'],
							objectUrl: data.linkedObject.url || data.url
						};
					} else if (data.linkedObject.objectClass.indexOf('com.totvs.technology.social.article') !== -1) {
						obj.object = {
							objectType: this.i18n.labels['this.article'],
							objectUrl: '/articleview/' + (data.originShare ? data.originShare.alias : data.user.alias)
								+ '/' + data.variableContent.documentId
						};
					} else if (data.linkedObject.objectClass.indexOf('com.totvs.technology.social.form') !== -1) {
						obj.object = {
							objectType: this.i18n.labels['this.form'],
							objectUrl: data.linkedObject.url || data.url
						};
					} else {
						obj.object = {
							objectType: this.i18n.labels['this.document'],
							objectUrl: data.linkedObject.url || data.url
						};
					}
				} else {
					obj.object = {
						objectType: this.i18n.labels['this.content'],
						objectUrl: data.linkedObject.url || data.url
					};
				}

				if (data.originShare && data.originShare.type === 'COMMUNITY') {
					obj.viaThe = {
						viaTheName: data.originShare.name,
						viaTheAlias: data.originShare.alias,
						viaThePage: data.originShare.page
					};
				}
			}

			if (data.social.type === 'COMMUNITY') {
				obj.place = {
					placeName: data.social.name,
					placeAlias: data.social.alias,
					placePage: data.social.page
				};
			} else if (data.originShare && data.originShare.type === "COMMUNITY") {
				obj.place = {
					placeName: data.originShare.name,
					placeAlias: data.originShare.alias,
					placePage: data.originShare.page
				};
			}

			return obj;
		},

		generateListClass: function(numberActions) {
			if (+numberActions > 0) {
				return 'fs-display-inline-block';
			} else {
				return 'hidden';
			}
		},

		generateTemplateVariableContent: function(data) {
			var obj = {}, documentId, shareMentionVO, that = this;

			obj.thumbEnum = this.thumbEnum;
			obj.replicationServerAccessible = this.replicationServerAccessible;

			if (data.type === 'RECOMMENDATION') {
				obj.isRecommendation = true;
			} else {
				obj.isRecommendation = false;
			}

			// Diferencia se o conteúdo compartilhado é um post ou não.
			if (obj.isRecommendation
				&& (!data.linkedObject || !data.linkedObject.objectClass || data.linkedObject.objectClass === 'POST')) {
				obj.linkedObject = data.linkedObject;
				obj.attachments = data.attachments;

				// Busca o último nível do linkedObject
				this.getLastLinkedObject(obj);

				// Se o post compartilhado possui texto, o mesmo precisa ser formatado.
				if (data.linkedObject && data.linkedObject.text) {
					shareMentionVO = data.shareMentionVO || {};
					obj.originalText = this.generateContentTextFormatted(data.linkedObject.text,
						shareMentionVO.mentions);
				}

				// Se possui linkedObject e o mesmo foi removido retorna.
				if (data.linkedObject && data.linkedObject.removed) {
					// Template para exibição de conteúdo removido.
					obj.tlpName = 'social-timeline-content-removed-template';
					return obj;
				}
				// Se o post compartilhado tiver um link do youtube, retorna.
				else if (obj.linkedObject && obj.linkedObject.youTubeLink) {
					// Template para exibição de vídeo do youtube
					obj.tlpName = 'social-timeline-content-youtube-template';
					obj.formattedLink = obj.linkedObject.link;
					var regex = new RegExp(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/i);
					var result = regex.exec(obj.linkedObject.link);
					if (result && result.length > 0 && result[1]) {
						obj.youtubeVideoId = result[1];
					}
					return obj;
				} else if(obj.linkedObject &&
						  obj.linkedObject.linkedObject &&
						  obj.linkedObject.linkedObject.objectClass &&
					      obj.linkedObject.linkedObject.objectClass.indexOf('com.totvs.technology.social.document') !== -1){

					    obj.linkedObject = obj.linkedObject.linkedObject;
					    obj.documentId = obj.linkedObject.objectClass.split("com.totvs.technology.social.document.")[1];

					if (obj.linkedObject.thumbURL &&
					    this.validateFilesTypes(obj.linkedObject.thumbURL.toLowerCase(), 'validImagesFilesTypes')) {

						if (data.linkedObject.sociableType == "SocialObject") {
							obj.removeText = true;
						}
						obj.attachments = obj.attachments[0].attachments;
						obj.multipleAttachments = obj.attachments.length > 1;
						obj.attachments = JSON.stringify(obj.attachments);
						obj.tlpName = 'social-timeline-content-media-image-template';

					} else if (obj.linkedObject.thumbURL &&
					           obj.linkedObject.description &&
							   this .validateFilesTypes(obj.linkedObject.thumbURL.toLowerCase(), 'validVideosFilesTypes') ||
							   this.validateFilesTypes(obj.linkedObject.description.trim().toLowerCase(), 'validVideosFilesTypes')) {
					    // Template para exibição de vídeos.
						obj.tlpName = 'social-timeline-content-media-video-template';
						obj.videoType = "mp4";
						var thumb = obj.linkedObject.thumbURL.split("/").pop().split("&")[0];
						if (thumb == "flv.png" || thumb == "104.png" || obj.linkedObject.description.split(".").pop().toLowerCase() == "flv") {
							obj.videoType = "flv";
						}
					}
					// Template para exibição de documentos.
					else {
						// Se tiver uma url de origem
						if (data.urlOrigin) {
							// Template para exibição de categoria e galeria da comunidade.
							obj.tlpName = 'social-timeline-content-gallery-template';
							return obj;
						}
						// isFolder (atribuído nesse momento baseando-se com 'contains' no
						// atributo thumbUrl pois o objectType sempre vem como documento).
						obj.isFolder = obj.linkedObject.thumbURL.toLowerCase().indexOf("folder") > -1;
						obj.documentVersion = FLUIGC.utilities.parseVersion(obj.linkedObject.objectId || 1000);
						obj.tlpName = 'social-timeline-content-media-document-template';
					}
					return obj;
				}
				else if (obj.linkedObject &&
				         obj.linkedObject.linkedObject &&
						 obj.linkedObject.linkedObject.objectClass &&
						 obj.linkedObject.linkedObject.objectClass.indexOf('com.totvs.technology.social.article') !== -1) {

					obj.linkedObject.isRecommendation = true;
					obj.linkedObject.originalText = obj.originalText;
					obj.linkedObject.documentId = obj.linkedObject.linkedObject.objectClass.split("com.totvs.technology.social.article.")[1];
					obj.linkedObject.tlpName = 'social-timeline-content-article-template';

					return obj.linkedObject;
				}
				// Se o post compartilhado não tiver anexado nenhuma media retorna o template genérico.
				else {
					// Template para exibição de conteúdo genérico.
					obj.tlpName = 'social-timeline-content-generic-template';
					return obj;
				}
			} else {
				obj.linkedObject = data.linkedObject;
				obj.attachments = data.attachments;
				// Se possui linkedObject e o mesmo foi removido retorna.
				if (obj.linkedObject && obj.linkedObject.removed) {
					// Template para exibição de conteúdo removido.
					obj.tlpName = 'social-timeline-content-removed-template';
					return obj;
				}
				// Se for vídeo do youtube retorna.
				else if (data.youtubeLink) {
					// Template para exibição de vídeo do youtube.
					obj.tlpName = 'social-timeline-content-youtube-template';
					return obj;
				}
			}

			if (obj.linkedObject && (obj.linkedObject.url || data.urlOrigin) && obj.linkedObject.objectId) {
				if (!obj.linkedObject.removed) {
					// Necessário para buscar a url correta do conteúdo.
					obj.linkedObject.url = obj.linkedObject.url || data.urlOrigin;

					// Necessário para buscar o id do documento se existir.
					obj.documentId = obj.linkedObject.objectClass
						? obj.linkedObject.objectClass.match(/(?:.*)\.(.+)/)[1] : '';

					if (obj.linkedObject.objectClass.indexOf('com.totvs.technology.social.document') !== -1) {
						// Template para exibição de imagens.
						if (obj.linkedObject.thumbURL
							&& this
								.validateFilesTypes(obj.linkedObject.thumbURL.toLowerCase(), 'validImagesFilesTypes')) {
							if (data.linkedObject.sociableType == "SocialObject") {
								obj.removeText = true;
							}
							obj.multipleAttachments = obj.attachments.length > 1;
							obj.attachments = JSON.stringify(obj.attachments);

							obj.tlpName = 'social-timeline-content-media-image-template';
							return obj;
						}
						// Template para exibição de vídeos.
						else if (obj.linkedObject.thumbURL
							&& obj.linkedObject.description
							&& this
								.validateFilesTypes(obj.linkedObject.thumbURL.toLowerCase(), 'validVideosFilesTypes')
							|| this.validateFilesTypes(obj.linkedObject.description.trim().toLowerCase(),
								'validVideosFilesTypes')) {

							obj.tlpName = 'social-timeline-content-media-video-template';
							obj.videoType = "mp4";
							var thumb = obj.linkedObject.thumbURL.split("/").pop().split("&")[0];
							if (thumb == "flv.png" || thumb == "104.png" || obj.linkedObject.description.split(".").pop().toLowerCase() == "flv") {
								obj.videoType = "flv";
							}

							return obj;
						}
						// Template para exibição de documentos.
						else {
							// Se tiver uma url de origem
							if (data.urlOrigin) {
								// Template para exibição de categoria e galeria da comunidade.
								obj.tlpName = 'social-timeline-content-gallery-template';
								return obj;
							}
							// isFolder (atribuído nesse momento baseando-se com 'contains' no
							// atributo thumbUrl pois o objectType sempre vem como documento).
							obj.isFolder = obj.linkedObject.thumbURL.toLowerCase().indexOf("folder") > -1;
							obj.documentVersion = FLUIGC.utilities.parseVersion(obj.linkedObject.objectId || 1000);
							obj.tlpName = 'social-timeline-content-media-document-template';
							return obj;
						}
					}
					// Template para exibição de socials.
					else if (obj.linkedObject.objectClass.indexOf('com.totvs.technology.social.relation.entity.Social') !== -1) {
						if (obj.linkedObject.thumbURL) {
							obj.tlpName = 'social-timeline-content-social-template';
							return obj;
						}
					}
					// Template para exibição de artigos.
					else if (obj.linkedObject.objectClass.indexOf('com.totvs.technology.social.article') !== -1) {
						if (data.formattedText !== "") {
							obj.hasShareText = true;
						}
						obj.tlpName = 'social-timeline-content-article-template';

						return obj;
					}

					// Template para resposta de formulários.
					else if (obj.linkedObject.objectClass.indexOf('com.totvs.technology.social.form') !== -1) {
						obj.tlpName = 'social-timeline-content-form-template';
						return obj;
					}
					//Template para compartilhamento texto
					else {
						obj.tlpName = 'social-timeline-content-text-template';
					}
					// Template para exibição de documentos genéricos não tratados.
					if (obj.linkedObject.thumbURL) {
						obj.tlpName = 'social-timeline-content-generic-media-template';
						return obj;
					}
				}
				// Template para exibição de conteúdo removido.
				else {
					obj.tlpName = 'social-timeline-content-removed-template';
					return obj;
				}
			}

			obj.tlpName = false;

			return obj;
		},
		
		getLastLinkedObject: function(obj) {
			while (obj &&
				   obj.linkedObject &&
				   obj.linkedObject.linkedObject &&
				   obj.linkedObject.linkedObject.linkedObject) {
				obj.linkedObject.linkedObject = obj.linkedObject.linkedObject.linkedObject;
			}
			return obj.linkedObject.linkedObject;
		},

		generateContentTextFormatted: function(text, mentions) {
			if (!text) {
				return '';
			}

			text = FLUIGC.utilities.preventXSS(text);
			text = this.formatMentions(text, mentions);
			text = this.formatLink(text);
			text = text.search(/https?:\/\//i) > -1 ? text : this.formatTags(text);
			text = this.formatLineBreak(text);

			return text;
		},

		formatMentions: function(text, mentions) {
			var data = {}, regex, html = '', mention;

			for (mention in mentions) {
				regex = new RegExp('\\@\\[' + mention + '\\]', 'ig');
				data.alias = mention;
				data.name = mentions[mention];
				data.tenantURI = this.tenantURI;
				html = Mustache.render(this.templates['social-timeline-mention-template'], data);
				text = text.replace(regex, html);
			}

			return text;
		},

		formatTags: function(text) {
			var html = Mustache.render(this.templates['social-timeline-tag-template']);
			return text.replace(/(#[à-ú,\p{L}\w]+)/ig, html);
		},

		formatLink: function(text) {
			var html = Mustache.render(this.templates['social-timeline-link-template']);
			if (text.substring(0, 4) == "www.") {
				text = "http://" + text;
			}
			return text.replace(/((((https?|ftp|file):\/\/)|(www))[-A-Zçãõêáéíóú0-9+&@#$\/%?=~_|!:,.;]*[-A-Zçãõêáéíóú0-9+&$@#\/%=~_|])/ig,
				html);
		},

		formatLineBreak: function(text) {
			var html = Mustache.render(this.templates['social-timeline-line-break-template']);
			return text.replace(/\n/g, html);
		},

		validateFilesTypes: function(path, type) {
			var isValidFile = false, len = this[type].length, i = 0;

			for (i; i < len; i++) {
				if (path.indexOf(this[type][i]) !== -1) {
					isValidFile = true;
					break;
				}
			}

			return isValidFile;
		},

		formatUpdateDate: function(date){
			var d = new Date(date);
			return d.toLocaleDateString() + " " + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
		},

		serviceComment: function(id, comment, cb) {
			var options = {
				url: '/api/public/sociable/comment/post',
				contentType: 'application/json',
				dataType: 'json',
				type: 'POST',
				data: {
					sociableId: id,
					comment: comment
				}
			};

			options.data = JSON.stringify(options.data);

			this.baseAjax(options, cb);
		},

		serviceSupport: function(id, cb) {
			var options = {
				url: '/api/public/sociable/like/' + id,
				type: 'POST'
			};

			this.baseAjax(options, cb);
		},

		serviceWatch: function(id, isWatched, cb) {
			var options = {
				url: '/api/public/social/post/notify',
				contentType: 'application/json',
				dataType: 'json',
				type: 'POST',
				data: {
					postId: id
				}
			};

			if (isWatched) {
				options.url = '/api/public/social/post/stopNotify';
			}

			options.data = JSON.stringify(options.data);

			this.baseAjax(options, cb);
		},

		serviceRemove: function(id, type, cb) {
			var options = {
				url: '/api/public/sociable/comment/remove/' + id,
				contentType: 'application/json',
				dataType: 'json',
				type: 'POST'
			};

			if (type === 'post') {
				options.url = '/api/public/social/post/remove';
				options.data = {
					postId: id
				};

				options.data = JSON.stringify(options.data);
			}

			this.baseAjax(options, cb);
		},

		serviceListPosts: function(cb) {
		    var defaultLocation = "Fluig", postInfo = {
               that: this,
               nextCall: cb
            };
            WCMAPI.isReplicationServerAccessible(postInfo, this.serviceListPostsRequest);
		},

		serviceListPostsRequest: function(postInfo, replicationServerAccessible) {
		    postInfo.that.replicationServerAccessible = replicationServerAccessible;
            var that = postInfo.that, lastPostId = $('[data-post-id]:last', that.DOM).data('post-id'), options = {
                url: '/api/public/social/post/listSortedPost/' + that.alias,
                contentType: 'application/json',
                dataType: 'json',
                data: {
                    lastPostId: lastPostId || 0,
                    limit: that.limit || 20,
                    orderingType: that.orderType || 'LAST_UPDATE'
                }
            };
            that.baseAjax(options, postInfo.nextCall);
        },

		serviceFindPost: function(postId, cb, limit) {
			var options = {
				url: '/api/public/social/post/read/post/' + postId,
				contentType: 'application/json',
				dataType: 'json',
				data: {
					limit: limit || 2
				}
			};

			this.baseAjax(options, cb);
		},

		serviceListComments: function(postId, offset, cb, limit) {
			var options = {
				url: '/api/public/sociable/comments/' + postId,
				contentType: 'application/json',
				dataType: 'json',
				data: {
					limit: limit || this.commentsLimit,
					offset: offset || 0
				}
			};

			this.baseAjax(options, cb);
		},

		serviceEditPostOrComment: function(sociable, postId, text, cb) {			
			var data = {
				sociableObjectId: postId,
				text: text
			};
			var options = {
				url: '/api/public/2.0/posts/' + sociable,
				contentType: 'application/json',
				dataType: 'json',
				type: 'POST',
				data: JSON.stringify(data)
			};

			this.baseAjax(options, cb);
		},

		serviceFindComment: function(commentId, cb) {
			var options = {
				url: '/api/public/2.0/posts/findComment/' + commentId,
				contentType: 'application/json',
				dataType: 'json'
			};

			this.baseAjax(options, cb);
		},

		baseAjax: function(options, cb) {
			options = options || {};

			socialGlobal.showLoading();

			$.ajax(options).done(function(data) {
				socialGlobal.hideLoading();
				cb(null, data);
			}).fail(function(xhr, status, text) {
				socialGlobal.hideLoading();
				cb(xhr);
			});
		},

		/***************************************************************************************************************
		 * Todas as funções abaixo são legados e devem ser refatoradas com mais tempo
		 **************************************************************************************************************/

		denounce: function(el, ev) {
			var self = this, sociableId = $('#idSociable').data('sociable-id'), $postSociable, $commentSociable, msgText;

			msgText = $('#label-denounce-message').val();

			if(msgText.length > 255){
				socialGlobal.alert(self.i18n.messages['comment.max.denounce']);
				return;
			}

			if (this.textComplaintValidate(msgText)) {
				return;
			}

			SocialTimeline.rest(SocialAPI.SociableService.DENOUNCE, [sociableId, msgText], function(data) {
				if (data.content) {
					$('#denounceModal').dialog('destroy');
					$postSociable = $('[data-post-id="' + sociableId + '"]', self.DOM);
					$commentSociable = $('[data-comment-id="' + sociableId + '"]', self.DOM);
					$postSociable.remove();
					$commentSociable.remove();
				}
			}, function(oObj, XMLHttpRequest, dataErr, errorThrown, info, self) {
				if (dataErr && dataErr.message) {
					if (socialGlobal.alert) {
						socialGlobal.message({
							type: 'error',
							text: dataErr.message,
							timeout: 3000
						});
					}

				} else {
					alert(dataErr.message);
				}
			});
		},

		textComplaintValidate: function(text) {
			var listWords = text.match(/(\w+){3,}/g) || [];

			if (text === '') {
				socialGlobal.alert(this.i18n.messages['denounce.reason.empty']);
				return true;
			}

			if (listWords.length < 4) {
				socialGlobal.alert(this.i18n.messages['denounce.content.invalid']);
				return true;
			}

			return false;
		}

	});
