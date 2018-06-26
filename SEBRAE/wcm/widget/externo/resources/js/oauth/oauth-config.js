console.log('%c [v.up.0.0.1] oauth-config.js', 'color:gray');

var _authorized = new Object();
var _keys 		= new Object();


var _returnAjax = {
	'api':		'',
	'data': 	{'content': {columns: [], values: []} },
	'mensage': 	'',
	'status':	0,
	'error': 	''
};



function oauthAuthorized(typeOAuth, oauth, request_data, token){
	var aux 	= oauth.toHeader(oauth.authorize(request_data, token));
	//_keys[_hostType][typeOAuth] = null; // Limpando chaves de validação da autenticação;
	return aux;
}

function apiAuthorized(setType, api){

	var arrTypes = {'POST':'', 'GET':''};
	for(var type in arrTypes) {
		if(setType !== undefined){
			if(setType != type){
				continue;
			}
		}

		var _consumerPublic = _keys[_hostType][type].consumerPublic;
		var _consumerSecret = _keys[_hostType][type].consumerSecret;
		var _tokenPublic 	= _keys[_hostType][type].tokenPublic;
		var _tokenSecret 	= _keys[_hostType][type].tokenSecret;
	
		var oauth = OAuth({
			consumer: {
				'public': _consumerPublic, 
				'secret': _consumerSecret
			},
			signature_method: 	 'HMAC-SHA1',
			parameter_seperator: ",",
			nonce_length: 		 6
		});
		
		var token = {
			'public': 	_tokenPublic,
			'secret': 	_tokenSecret
		};
		
		var _url = "http://fluig.sebraego.com.br";
		//var api  = "/api/public/ecm/dataset/datasets";
		if(api !== undefined){
			var auxApi = api;
		} else {
			var auxApi = _keys[_hostType][type].api;
		}
		var request_data = {
			'url': 		_url + auxApi, 
			'method': 	type,
			'data':		''
		};
		
		var auth = {
			'request_data': request_data,
			'oauth': 		oauthAuthorized(type, oauth, request_data, token)	
		};
		arrTypes[type] = auth;
		
		_consumerPublic = null;
		_consumerSecret = null;
		_tokenPublic = null;
		_tokenSecret = null;
		oauth = null;
		token = null;
	}
	return arrTypes;
}


function requestAjax(typeHttp, api, paramObj){
	//console.log('%c ' + arguments.callee.name + ' - ' + typeHttp + ' - ' + api, 'color:green');
	//console.log('paramObj: ', paramObj);
	
	(paramObj === undefined) ? paramObj = '' : '' ;

	var ok = false;
	var rrAjax = null;	
		
		if(typeHttp == 'POST'){
			var auxData = JSON.stringify(paramObj);
			paramObj = '';
		} else if(typeHttp == 'GET'){
			var auxData = '';	
		} else {
			_returnAjax = {};
			//clearInterval(processor);
		}
		
		_authorized[typeHttp] = apiAuthorized(typeHttp, api + paramObj)[typeHttp];


		_returnAjax.api = api;
		
		$.when(
			$.ajax({
				async: 			false,
				contentType:	"application/json",
				type:			_authorized[typeHttp].request_data.method,
				url:			_authorized[typeHttp].request_data.url,
				data:			auxData,
				headers:		_authorized[typeHttp].oauth
				
			}).done(function(dataAjax, textStatus, jqXHR) {
				//console.log('-> requestAjax 3 - 1');
				//console.log("OK: ", dataAjax);
				
				ok = true;
				_returnAjax.data 	= dataAjax;
				_returnAjax.mensage = typeHttp + ' return.';
				_returnAjax.status 	= jqXHR.status;
				_returnAjax.error 	= (!ok);
				//rrAjax = _returnAjax;
				return  _returnAjax;
		
			}).fail(function(jqXHR, textStatus, errorThrown) {
				//console.log('-> requestAjax 3 - 2');				
				var msgErro = typeHttp + ' ERRO Ajax: ' + jqXHR.status + ' - ' + jqXHR.responseText;
				console.log(msgErro);
				
				ok = false;
				_returnAjax.data 	= {'content': {columns: [], values: []} };
				_returnAjax.mensage = msgErro;
				_returnAjax.status 	= jqXHR.status;
				_returnAjax.error 	= (!ok);
				if(ok == false){
					rrAjax = _returnAjax;
					alert( msgErro );
				}
				return  _returnAjax;
			})		
		).then(function( data, textStatus, jqXHR ) {
			//console.log('-> requestAjax 3 - 3');
			rrAjax = _returnAjax;
			if(ok == false){
				alert( 'ERRO: ' + jqXHR.status + ' - ' + jqXHR.responseText );
			}
		});

	return rrAjax;
}