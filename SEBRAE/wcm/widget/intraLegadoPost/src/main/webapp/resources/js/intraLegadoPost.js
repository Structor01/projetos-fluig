var Legado = SuperWidget.extend({
    message: null,
    init: function () {

    },
    videos: function() {
        var dt = DatasetFactory.getDataset("dsVideosLegado", null, null, null);
        return dt.values;
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
    $('.pageTitle').parent().css('display', 'none');
    $('.fl-header').css('display', 'none');
    $('#visualizacaoPagina').css('margin-top','-100px');
});