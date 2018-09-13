var SocialTimelineEdit = SuperWidget
	.extend({

		instanceId: null,
		context: null,
		orderType: null,
		permissionOrder: null,
		quantityPublication: null,
		continueScroll: null,
		enableScroll: null,

		bindings: {
			local: {
				'context': ['change_changeContext'],
				'order-type': ['change_changeOrderType'],
				'permission-order': ['change_changePermissionOrder'],
				'continue-scroll': ['change_changeContinueScroll'],
				'quantity-publication': ['change_changeQuantityPublication'],
				'save-timeline-configuration': ['click_updateTimelinePreferences'],
				'toggle-option': ['click_alterOrder'],
				'form-edit': ['submit_saveForm']
			}
		},

		init: function() {
			this.initContextComplete();
			this.loadTimelineConfig();
		},

		loadTimelineConfig: function() {
			var that = this;
			that.setOrderType();
			that.setPermissionOrder();
			that.setContinueScroll();
			that.setQuantityPublication();
			that.alterContextCommunity();
		},

		//Radio context behavior
		changeContext: function(el, ev) {
			var $el = $(el), value = $el.val();
			this.setContext(value);
		},

		//Radio order behavior
		changeOrderType: function(el, ev) {
			var $el = $(el), value = $el.val();
			this.orderType = value;
		},

		//Check permission behavior
		changePermissionOrder: function(el, ev) {
			var $el = $(el), value = $el.prop('checked');
			this.permissionOrder = value;
		},

		//Check Continue behavior
		changeContinueScroll: function(el, ev) {
			var $el = $(el), value = $el.prop('checked');
			this.continueScroll = value;
		},

		//Check quantity behavior
		changeQuantityPublication: function(el, ev) {
			var $el = $(el), value = $el.val();
			this.quantityPublication = value;
		},

		setContext: function(value, getServerData) {
			if (value != null && value === 'contextCommunity') {
				$('[data-community-details]', this.DOM).removeClass('c-hidden');
				this.context = 'contextCommunity';
			} else {
				$('[data-community-details]', this.DOM).addClass('c-hidden');
				this.context = 'contextAll';
				this.community = null;
			}

			if (getServerData) {
				$('[data-context][value="' + this.context + '"]', this.DOM).prop('checked', true);
			}

		},

		disabledContextCommunity: function() {
			$('[data-context]', this.DOM).prop('disabled', true);
			$('[data-search-community]', this.DOM).prop('disabled', true);
		},

		//Alter the context of community if was a community page disabled the fields
		alterContextCommunity: function() {
			var that = this, aliasCommunity = socialGlobal.getAliasCommunityPage(), isContextCommunity = (aliasCommunity !== null);

			if (isContextCommunity) {
				that.context = 'contextCommunity';
				that.community = aliasCommunity;
			}

			that.setContext(that.context, true);

			this.getCommunity(that.community, function(data) {
				if (data && data.type === "COMMUNITY") {
					that.setCommunity(data.name, that.community);
					if (isContextCommunity) {
						that.disabledContextCommunity();
					}
				}
			});
		},

		setOrderType: function() {
			$('[data-order-type]', this.DOM).find("option[value='" + this.orderType + "']").prop('selected',
				this.orderType);
		},

		setCommunity: function(name, alias) {
			var that = this;
			$('[data-community-details]', that.DOM).find('label small').text(name);
			this.community = alias;
		},

		setPermissionOrder: function(value) {
			$('[data-permission-order]', this.DOM).prop('checked', this.permissionOrder);
		},

		setContinueScroll: function(value) {
			$('[data-continue-scroll]', this.DOM).prop('checked', this.continueScroll);
		},

		setQuantityPublication: function(value) {
			$('[data-quantity-publication]', this.DOM).find("option[value='" + this.quantityPublication + "']").prop(
				'selected', this.quantityPublication);
		},

		//Save
		updateTimelinePreferences: function(el) {
			var that = this;
			var btn = $(el);

			btn.prop('disabled', true);

			if (that.context == "contextCommunity" && that.community == null || that.community == "") {
				FLUIGC.toast({
					title: 'Atenção',
					message: 'Selecione a comunidade para associar o contexto.',
					type: "warning"
				});
				btn.prop('disabled', false);
				return;
			}

			var args = {};
			args['context'] = that.context;
			args['community'] = that.community;
			args['orderType'] = that.orderType;
			args['permissionOrder'] = that.permissionOrder;
			args['continueScroll'] = that.continueScroll;
			args['quantityPublication'] = that.quantityPublication;

			var ret = WCMSpaceAPI.PageService.UPDATEPREFERENCES({
				async: false
			}, that.instanceId, args);
			// Atribui os valores persistidos
			if (ret) {
				FLUIGC.toast({
					message: "Configurações salvas",
					type: "success"
				});
				btn.prop('disabled', false);
			}
		},

		getCommunity: function(value, cb) {
			var that = this;
			if (value !== null && value !== "") {
				var url = '/api/public/social/community/' + value, options = {
					type: 'GET',
					url: url,
					contentType: 'application/json',
					dataType: 'json'
				}

				$.ajax(options).done(function(data) {
					cb(data);
				});
			}
		},

		//Find community by alias
		findCommunity: function(term, cb) {
			// TODO ALTERAR URL DA PESQUISA DE COMUNIDADES (externalizar metodo para API publica) //
			var url = '/api/public/social/community/listCommunities', data = {
				pattern: term,
				limit: 20,
				offset: 0
			}, options = {
				type: 'GET',
				url: url,
				contentType: 'application/json',
				data: data,
				dataType: 'json'
			};

			$.ajax(options).done(function(data) {
				var result = [], obj = {}, data = data.content;

				for ( var i = 0; i < data.length; i++) {
					obj = {};
					obj['label'] = data[i].name;
					obj['value'] = data[i].name;
					obj['alias'] = data[i].alias;
					result.push(obj);
				}
				cb(result);
			}).fail(function(xhr, status, text) {
				cb(xhr);
			});
		},

		//Auto complete function
		initContextComplete: function() {
			var that = this;
			$('[data-search-community]', this.DOM).autocomplete({
				source: function(req, cb) {
					that.findCommunity(req.term, cb);
				},
				select: function(ev, ui) {
					that.setCommunity(ui.item.value, ui.item.alias);
				}
			});
		}

	});
