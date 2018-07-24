var Legado = SuperWidget.extend({
    message: null,
    init: function () {

    },
    categoriaVideos: [],
    videos: function() {
        var dt = DatasetFactory.getDataset("dsVideosLegado", null, null, null);
        var categorias = [];
        for(var i in dt.values) {
            if(categorias.indexOf(dt.values[i]['nmCategoria']) == -1) {
                categorias.push(dt.values[i]['nmCategoria']);
            }
        }

        Legado.categoriaVideos = categorias;
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

function filtraVideos(e) {
    var value = $(e).val();
    $('.videosW').show();
    if(value != 'Categoria')
    $('.videosW').each(function () {
       var cat = $(this).find('.subtitle').html();
       if(cat != value) $(this).hide();
    });
}

$(document).ready(function () {
    $('.pageTitle').parent().css('display', 'none');
    $('.fl-header').css('display', 'none');
    $('#visualizacaoPagina').css('margin-top','-100px');
});