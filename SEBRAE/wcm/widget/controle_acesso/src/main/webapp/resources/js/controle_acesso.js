var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        //code
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    }
});

$(document).ready(function () {
   if(top.WCMAPI.userLogin == 'publico.sebrae-go.com.br.1') {
       location.assign('http://fluig.sebraego.com.br/portal/p/1/externos');
   }
});