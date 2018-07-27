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
    noticias: function() {
        var dt = DatasetFactory.getDataset("dsNoticiasLegado", null, null, null);
        for(var i in dt.values) {
            var v = dt.values[i];
            var pasta = DatasetFactory.getDataset("dsNoticiasCategoriaLegado", null, [
                DatasetFactory.createConstraint("idCategoria", v['idCategoria'], v['idCategoria'], ConstraintType.MUST_NOT)
            ], null);
            pasta = pasta.values[0]['pasta'];
            console.log(v,pasta);
        }
    },
    updateNoticia:function(idNoticia,idFluig) {
        $.ajax({
            type: "post",
            url: "/api/public/2.0/authorize/client/invoke",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                serviceCode: 'Migracao',
                tenantCode: '1',
                endpoint: '/update?c=noticias&f={"idNoticia":'+idNoticia+'}&u={"idFluig":'+idFluig+'}',
                method: 'get'
            }),
            dataType: "json",
            success: function(data){
                return true;
            },
            failure: function(errMsg) {
                return false;
            }
        });
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
    // $('.pageTitle').parent().css('display', 'none');
    // $('.fl-header').css('display', 'none');
    // $('#visualizacaoPagina').css('margin-top','-100px');
    $('.videosW').mouseenter(function (el) {
        $(this).find('.fadeOutVideo').fadeIn('fast');
    });
    $('.videosW').mouseleave(function (el) {
        $(this).find('.fadeOutVideo').fadeOut('fast');
    });

    // if($('#home').hasClass('active')) {
    //     $('#_instance_8311_').hide();
    //     setTimeout(()=>{
    //         var html = '<div id="_instance_8311_" appcode="socialtimeline">'+$('#_instance_8311_').html()+'</div>';
    //         $('#_instance_8311_').remove();
    //         $('#home').html(html);
    //     },2000);
    // }
});

function postArticles() {

}