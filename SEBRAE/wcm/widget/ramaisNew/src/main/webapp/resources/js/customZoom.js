/**
 * JS CUSTOM ZOOM
 */

console.log('customZoom.js Loading...');

var MaskEvent = {
		init: function(event) {
			if (typeof fluigjQuery === "undefined" || fluigjQuery === true) {
				if (typeof jQuery != "undefined") {
					this.initFormJs()
				} else {
					var js = document.createElement("script");
					js.type = "text/javascript";
					js.src = "/portal/resources/js/jquery/jquery.js";
					js.onload = importFormJs;
					document.body.appendChild(js)
				}
			} else {
				if (typeof console != "undefined") {
					console.warn("A vari\u00E1vel fluigjQuery foi definida como false! O Jquery n\u00E3o ser\u00E1 importado pelo fluig e funcionalidades como mascar\u00E1 de campos do Fluig estar\u00E3o desabilitadas!")
				}
			}
		},
		initFormJs: function(e) {
			var _this = this;
			var maskInputs = [];
			var inputs = $("[mask]");
			$.each(inputs, function(k, o) {
				maskInputs.push(o)
			});
			if (maskInputs.length) {
				if (!jQuery().mask) {
					loadJs("/portal/resources/js/jquery.mask.min.js", function() {
						_this.initMask(maskInputs)
					})
				} else {
					_this.initMask(maskInputs)
				}
			}
		},
		initMask: function(inputs) {
			$.each(inputs, function(i, obj) {
				var inputMask = $(obj);
				var inputID = inputMask.attr("id");
				var inputName = inputMask.attr("name");
				var maskAttr = inputMask.attr("mask");
				var options = {};
				if (maskAttr.indexOf("#") > -1) {
					options.maxlength = false;
					options.reverse = true
				}
				if (inputID) {
					$("#" + inputID).mask(maskAttr, options)
				} else {
					if (inputName) {
						$("input[type='text'][name='" + inputName + "']").mask(maskAttr, options)
					}
				}
			})
		}
};

function loadJs(src, callback) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = src;
	if (callback) {
		js.onload = callback
	}
	document.body.appendChild(js)
}

function loadCss() {
	var css = '<link rel="stylesheet" type="text/css" href="/portal/resources/style-guide/css/fluig-style-guide-filter.min.css" />';
	$("head").append(css)
}

function loadjQuery(callback) {
	if (!window.fluigjQuery || window.fluigjQuery === true) {
		if (window.jQuery) {
			callback()
		} else {
			loadJs("/portal/resources/js/jquery/jquery.js", callback)
		}
	}
}

function hasZoom() {
	if (location.origin == undefined) {
		location.origin = window.location.protocol + "//" + window.location.host
	}
	var inputs = document.getElementsByTagName("input"),
	hasZoom = false;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "zoom") {
			hasZoom = true;
			break
		}
	}
	if (hasZoom) {
		loadjQuery(function() {
			loadCss();
			if (!FLUIGC || !FLUIGC.filter) {
				$.getScript(location.origin + "/portal/resources/js/mustache/mustache-min.js", function() {
					$.getScript(location.origin + "/portal/resources/style-guide/js/fluig-style-guide.min.js", function() {
						$.getScript(location.origin + "/portal/resources/style-guide/js/fluig-style-guide-filter.min.js", function() {
							loadZoom()
						})
					})
				})
			} else {
				loadZoom()
			}
		})
	}
}

function loadZoomTablename(tablename) {
	$("input[data-zoom]", '[tablename="' + tablename + '"]').each(function() {
		loadZoomForInput(this)
	})
}

function loadZoom() {
	String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
		return this.split(needle).join(replacement)
	};
	$("input[data-zoom]").each(function() {
		if (!$(this).prop("readonly")) {
			loadZoomForInput(this)
		} else {
			$(this).prop("type", "text").addClass("form-control")
		}
	})
}

function loadZoomForInput(input) {
	if ($(input).parents("[tablename]").length > 0 && $(input).closest("tr").index() < 1) {
		return
	}
	var $zoom = $(input),
	zoomOptions = JSON.parse($zoom.data("zoom").replaceAll("'", '"')),
	searchField = "";
	$zoom.removeAttr("data-zoom");
	var dataZoomInstance = "data-zoom_" + $zoom.attr("name");
	window[dataZoomInstance] = zoomOptions;
	var settings = createSettings(zoomOptions, searchField);
	searchField = settings.displayKey;
	var instance = "filter_" + $zoom.attr("name");
	var referenceName = "input[name=" + $zoom.attr("name") + "]";
	window[instance] = FLUIGC.filter(referenceName, settings);
	$(referenceName).attr("filter-instance", instance).attr("display-key", searchField);
	var inputValue = $(input).val();
	if (inputValue != "") {
		var item = {};
		item[searchField] = inputValue;
		window[instance].add(item)
	}
	window[instance].on("fluig.filter.item.added", function(data) {
		if (typeof(setSelectedZoomItem) === "function") {
			data.item.inputName = $zoom.attr("name");
			data.item.inputId = $zoom.attr("id");
			setSelectedZoomItem(data.item)
		}
	});
	var events = "fluig.filter.cursorchanged fluig.filter.opened fluig.filter.closed fluig.filter.selected fluig.filter.filterd fluig.filter.beforeItemAdd fluig.filter.itemAdded fluig.filter.beforeItemUpdate fluig.filter.itemUpdated fluig.filter.beforeItemRemove fluig.filter.itemRemoved fluig.filter.maxTags fluig.filter.focus fluig.filter.blur fluig.filter.loadComplete";
	window[instance].on(events, function(ev) {
		var evNameSpace = ev.namespace.replace(".", "").replace("filter", ""),
		evName = "onfilter" + evNameSpace.toLowerCase(),
		$input = $(ev.currentTarget).find(".tt-input")[0],
		trigger = $zoom.attr(evName);
		(new Function("el", "ev", trigger))($input, ev)
	})
}

function reloadZoomFilterValues(inputName, filterValues) {
	var dataZoomInstance = "data-zoom_" + inputName;
	var zoomOptions = window[dataZoomInstance];
	zoomOptions.filterValues = filterValues;
	var searchField = "";
	var settings = createSettings(zoomOptions, searchField);
	var filterInstance = "filter_" + inputName;
	window[filterInstance].reload(settings)
}

function createSettings(zoomOptions, searchField) {
	var resultFields, header;
	if (zoomOptions.displayKey) {
		searchField = zoomOptions.displayKey
	} else {
		searchField = zoomOptions.fields[0].field
	}
	var orderField = "";
	if (zoomOptions.fields) {
		resultFields = [];
		header = [];
		for (var i in zoomOptions.fields) {
			var column = zoomOptions.fields[i];
			resultFields.push(column.field);
			var columnHeader = {
					title: column.label
			};
			if (column.standard) {
				columnHeader.standard = Boolean(column.standard);
				orderField = column.field + "_ASC"
			}
			header.push(columnHeader)
		}
	}
	var filterFields = [];
	if (zoomOptions.filterValues) {
		var filterValues = zoomOptions.filterValues.split(",");
		if (filterValues && filterValues.length >= 2) {
			for (var j = 0; j < filterValues.length; j = j + 2) {
				if (filterValues[j] && filterValues[j + 1]) {
					filterFields.push(filterValues[j]);
					filterFields.push(filterValues[j + 1])
				}
			}
		}
	}
	var json = {
			searchField: searchField,
			filterFields: filterFields,
			resultFields: resultFields
	};
	var link = location.origin + "/ecm/api/rest/ecm/dataset/datasetZoom/";
	if (zoomOptions.cardDatasetId) {
		link = location.origin + "/ecm/api/rest/ecm/dataset/cardDatasetValues/";
		json.cardDatasetId = zoomOptions.cardDatasetId
	} else {
		json.datasetId = zoomOptions.datasetId
	}
	var strJson = encodeURI(JSON.stringify(json));
	link += strJson;
	var settings = {
			source: {
				url: link,
				contentType: "application/json",
				root: "content",
				pattern: "",
				limit: 300,
				offset: 0,
				patternKey: "pattern",
				limitkey: "limit",
				offsetKey: "offset",
				order: orderField
			},
			displayKey: searchField,
			searchTimeout: zoomOptions.searchTimeout || 500,
			minLength: zoomOptions.minLength || 3,
			style: {
				autocompleteTagClass: "tag-gray",
				tableSelectedLineClass: "info",
				templateTipMessage: ".ecm-zoom-results"
			},
			table: {
				header: header,
				renderContent: resultFields
			},
			navButtons: {
				enabled: false
			},
			initDisabled: zoomOptions.initDisabled === "true"
	};
	if (zoomOptions.templateTag) {
		settings.style.templateTag = zoomOptions.templateTag
	}
	if (zoomOptions.templateSuggestion) {
		settings.style.templateSuggestion = zoomOptions.templateSuggestion
	}
	return settings
}

var _this = this;
var ECM = ECM || {};
document.addEventListener("DOMContentLoaded", function(e) {
	if (ECM.fluigForms) {
		return
	}
	ECM.fluigForms = {};
	_this.MaskEvent.init(e);
	hasZoom()
}, false);

importFormJs = function(e) {
	maskInputs = [];
	var inputs = document.getElementsByTagName("input");
	var count = 0;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].hasAttribute("mask")) {
			maskInputs[count++] = inputs[i]
		}
	}
	if (maskInputs.length) {
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.src = "/portal/resources/js/jquery.mask.min.js";
		js.onload = loadMask;
		document.body.appendChild(js)
	}
};

loadMask = function(e) {
	for (var i = 0; i < maskInputs.length; i++) {
		if (maskInputs[i].id != undefined && maskInputs[i].id != "") {
			$("#" + maskInputs[i].id).mask(maskInputs[i].getAttribute("mask"))
		} else {
			if (maskInputs[i].name != undefined) {
				var mask = maskInputs[i].getAttribute("mask");
				var options = {};
				if (mask.indexOf("#") > -1) {
					options.maxlength = false;
					options.reverse = true
				}
				$("input[type='text'][name='" + maskInputs[i].name + "']").mask(mask, options)
			}
		}
	}
};

hideFields = function(fields) {
	if (Array.isArray(fields)) {
		for (var i = 0; i < fields.length; i++) {
			hideFields(fields[i])
		}
	} else {
		$("#" + fields).css("display", "none")
	}
};

showFields = function(fields) {
	if (Array.isArray(fields)) {
		for (var i = 0; i < fields.length; i++) {
			showFields(fields[i])
		}
	} else {
		$("#" + fields).css("display", "block")
	}
};

if (!parent.WCMAPI._isMobile()) {
	function openInputFile(elementId, parameter) {
		var element = parent.document.getElementById(elementId);
		if (element && document.createEvent) {
			element.setAttribute("data-on-camera", "true");
			if (parameter) {
				element.setAttribute("data-file-name-camera", parameter)
			}
			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, false);
			element.dispatchEvent(event)
		}
	}
	JSInterface = {};
	JSInterface.showCamera = function(parameter) {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments != null) {
			tabAttachments.click();
			if (parent.WCMAPI.isIe9()) {
				$(".ecm-navigation-silverlight", parent.document).show("fade");
				$(".ecm-navigation-silverlight", parent.document).css("top", 0);
				$("#ecm-navigation-silverlight", parent.document).attr("data-on-camera", "true");
				$("#ecm-navigation-silverlight", parent.document).attr("data-file-name-camera", parameter);
				$(parent.document).on("keyup", this.actionKeyup)
			} else {
				openInputFile("ecm-navigation-inputFile-clone", parameter)
			}
		}
	}
};

function substringMatcher(strs) {
	return function findMatches(q, cb) {
		var matches, substrRegex;
		matches = [];
		substrRegex = new RegExp(q, 'i');

		$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
				matches.push({
					code: str[0],
					description: str[1]
				});
			}else if(substrRegex.toString().indexOf("%") > 0 && substrRegex.toString().length == 4){
				matches.push({
					code: str[0],
					description: str[1]
				});
			}
		});
		cb(matches);
	};
}

function ZoomContratoEmpresa(aVinculo){
	var zoomContratoEmpresa = new Array(); 
	var codEmpresa = "";

	for(var i = 0; i < aVinculo.length; i++){   
		if(codEmpresa != aVinculo[i][0]){
			codEmpresa = aVinculo[i][2];
			zoomContratoEmpresa.push(new Array(
					aVinculo[i][0], 
					aVinculo[i][2]
			));
		}     
	}

	var zoom = FLUIGC.autocomplete('#zoomContratoEmpresa', {
		source: substringMatcher(zoomContratoEmpresa),
		name: 'empresa',
		displayKey: 'description',
		tagClass: 'tag-gray',
		type: 'tagAutocomplete'
	});

	zoom.on('fluig.autocomplete.selected', function(ev) {
		$("#codContratoEmpresa").val(ev.item.code)
	}); 

	zoom.on('fluig.autocomplete.itemRemoved', function(ev) {
		$("#codContratoEmpresa").val("");
	});
}