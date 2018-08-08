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
    img: [],
    updateNoticia: function(data, draft) {
        return new Promise(resolve=>{
            var options = {
                url: 'http://fluig.sebraego.com.br/api/public/2.0/communities/articles/update',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST'
            };

            options.data = {
                "id": data.content['id'],
                "description": data.content['description'],
                "keyWord":"",
                "version":data.content['version'],
                "content":data.content['content'],
                "alias":"intranet-legado",
                "categoryId":data.content['categoryId'],
                "expires":false,
                "articleCoverVO":data.content['articleCoverVO'],
                "draft":draft,
                "topicId":"1",
                "userNotify":false,
                "attachments":[]
            };
            options.data = JSON.stringify(options.data);
            $.ajax(options).done(function(data) {
                resolve(data);
            });
        });
    },
    updateCover: function(r,v) {
        Legado.img.push(v['nmMidiaOriginal']);
        return new Promise(resolve => {
            var options = {
                url: 'http://fluig.sebraego.com.br/api/public/2.0/communities/articles/get/intranet-legado/'+r,
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET'
            };

            $.ajax(options).done(function(data) {
                data.content['img'] = Legado.img[0];
                Legado.img.shift();

                var c = [{
                    "_field" : "documentDescription",
                    "_initialValue": data.content['img'],
                    "_finalValue" : data.content['img'],
                    "_type": 1, "_likeSearch": false
                },{
                    "_field" : "activeVersion",
                    "_initialValue": true,
                    "_finalValue" :true,
                    "_type": 1, "_likeSearch": false
                }];

                Legado.getDataset(c, 'document', ['documentDescription','documentPK.documentId'], data).then(r=>{
                    if(r[0]['content']['values']['length'] > 0) {
                        Legado.updateNoticia(data, true).then(data=>{
                            var options = {
                                url: 'http://fluig.sebraego.com.br/api/public/2.0/communities/articles/changeCover',
                                contentType: 'application/json',
                                dataType: 'json',
                                type: 'POST'
                            };
                            options.data = {
                                "id": data.content['id'],
                                "description": data.content['description'],
                                "keyWord":"",
                                "version":data.content['version'],
                                "content":data.content['content'],
                                "alias":"intranet-legado",
                                "categoryId":data.content['categoryId'],
                                "expires":false,
                                "articleCoverVO":{"pictureName":null,"pictureId":r[0]['content']['values'][0]['documentPK.documentId']},
                                "draft":true,
                                "topicId":"1",
                                "userNotify":false,
                                "attachments":[]
                            };
                            options.data = JSON.stringify(options.data);
                            $.ajax(options).done(function(data) {
                                var img = new Image();
                                img.src = "http://fluig.sebraego.com.br"+data.content.covers.cover_image_original;
                                img.onload = function() {
                                    var obj = {};
                                    obj['h'] = img.height;
                                    obj['w'] = img.width;
                                    obj['type'] = img.src.split('.').pop();
                                    var options = {
                                        url: 'http://fluig.sebraego.com.br/api/public/2.0/communities/articles/update',
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        type: 'POST'
                                    };
                                    options.data = {
                                        "id": data.content['id'],
                                        "description": data.content['description'],
                                        "keyWord":"",
                                        "version":data.content['version'],
                                        "content":data.content['content'],
                                        "alias":"intranet-legado",
                                        "categoryId":data.content['categoryId'],
                                        "expires":false,
                                        "articleCoverVO": {
                                            "width":obj['w'],
                                            "height":parseFloat(obj['w'] / 5),
                                            "coordinateX":0,
                                            "coordinateY":0,
                                            "windowWidth":1280,
                                            "windowHeight":703,
                                            "boxData":{
                                                "left":0,
                                                "top":0,
                                                "width":1127,
                                                "height":225.4},
                                            "canvasData":{
                                                "left":0,
                                                "top":-(obj['h']/2.5),
                                                "width":1127,
                                                "height":1577.2911963882618
                                            },
                                            "pictureName":null,
                                            "pictureId": r[0]['content']['values'][0]['documentPK.documentId']
                                        },
                                        "draft":false,
                                        "topicId":"1",
                                        "userNotify":false,
                                        "attachments":[]
                                    };

                                    options.data = JSON.stringify(options.data);
                                    $.ajax(options).done(function(data) {
                                        resolve(data);
                                    })
                                };
                            });
                        });
                    } else {
                        Legado.updateNoticia(data, false).then(r=>{
                            resolve('Não há imagem');
                        });
                    }
                });
            })
        })
    },
    noticias: function(categoria) {
        $.ajax({
            type: "post",
            url: "/api/public/2.0/authorize/client/invoke",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                serviceCode: 'Migracao',
                tenantCode: '1',
                endpoint: '/select?c=noticias&f=%7B%22idCategoria%22:' + categoria + '%7D&s=idNoticia&o=1',
                method: 'get'
            }),
            dataType: "json",
            success: function(data){
                var len = JSON.parse(data.content.result).length;
                var idx = 0;
                for(var i in JSON.parse(data.content.result)) {
                    var v = JSON.parse(data.content.result);
                    v = v[i];

                    var c = [{
                        "_field" : "documentDescription",
                        "_initialValue": v['nmTitulo'] + ' [' +disarrangeData(v['dataPublicacao'])+']',
                        "_finalValue" :v['nmTitulo'] + ' [' +disarrangeData(v['dataPublicacao'])+']',
                        "_type": 1, "_likeSearch": false
                    },{
                        "_field" : "activeVersion",
                        "_initialValue": true,
                        "_finalValue" :true,
                        "_type": 1, "_likeSearch": false
                    }];

                    Legado.getDataset(c,"document",['documentDescription','documentPK.documentId'], v).then(r=>{
                        console.log(r);
                        if(r[0].content.values.length == 0) {
                            var pasta = DatasetFactory.getDataset("dsNoticiasCategoriaLegado", null, [
                                DatasetFactory.createConstraint("idCategoria", r[1]['idCategoria'], r[1]['idCategoria'], ConstraintType.MUST)
                            ], null);
                            pasta = pasta.values[0]['pasta'];

                            Legado.createNoticia(pasta, r[1]['txConteudo'], r[1]['nmTitulo'], r[1]['dataPublicacao']).then(r => {
                            }).catch(err => {
                                console.log(err)
                            });
                        } else {
                            Legado.updateCover(r[0].content.values[0]['documentPK.documentId'], r[1]).then(r=>{
                                console.log(r);
                            });
                        }

                        console.log(r[1]['nmTitulo'], pasta);
                    });

                    idx++;
                    console.log('progresso', (idx*100)/len);
                }
            },
            failure: function(errMsg) {
                resolve(errMsg);
            }
        });
    },
    getDataset(constraints, name, fields,v) {
        return new Promise(resolve => {
            var options = {
                url: '/api/public/ecm/dataset/datasets',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST'
            };

            options.data ={
                name:name,
                "fields" : fields,
                constraints:constraints
            }

            options.data = JSON.stringify(options.data);
            $.ajax(options).done(function(data) {
                resolve([data , v]);
            })
        })
    },
    deleteNoticia(documentId) {
        return new Promise(resolve => {
            var options = {
                url: '/api/public/2.0/communities/articles/get/intranet-legado/53406',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST'
            };

            options.data ={}

            options.data = JSON.stringify(options.data);
            $.ajax(options).done(function(data) {
                resolve(data);
            })
        })
    },
    createNoticia: function(categoriaId,body,title,date) {
        return new Promise(resolve => {
            var options = {
                url: '/api/public/2.0/communities/articles/create',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST'
            };

            options.data ={
                "id":"",
                "description":title + ' [' +disarrangeData(date)+']',
                "keyWord":"",
                "version":null,
                "content":
                    "<html>\n<head>\n\t<title>"+title+"</title>\n\t<style type=\"text/css\">" +
                    "body{padding: 10px !important; word-wrap: break-word !important;}\n\t</style>\n\t<link href=\"/style-guide/css/fluig-style-guide.min.css\" " +
                    "rel=\"stylesheet\" type=\"text/css\" />\n\t<link href=\"/style-guide/css/fluig-style-guide-player.min.css\" rel=\"stylesheet\" type=\"text/css\" />" +
                    "<script src=\"/portal/resources/js/jquery/jquery.js\"></script><script src=\"/portal/resources/js/jquery/jquery-ui.min.js\"></script>" +
                    "<script src=\"/portal/resources/js/mustache/mustache-min.js\"></script><script src=\"/portal/resources/style-guide/js/fluig-style-guide.min.js\">" +
                    "</script>\n</head>\n<body class=\"fluig-style-guide\">"+body+"</body>\n</html>\n",
                "alias":"intranet-legado",
                "categoryId":categoriaId,
                "expires":false,
                "articleCoverVO":
                    {"pictureName":null,"pictureId":null},
                "draft":false,
                "topicId":"1",
                "userNotify":false,
                "attachments":[]
            }

            options.data = JSON.stringify(options.data);
            $.ajax(options).done(function(data) {
                resolve(data);
            })
        })
    },
    // updateNoticia:function(idNoticia,idFluig) {
    //     return new Promise(resolve => {
    //         $.ajax({
    //             type: "post",
    //             url: "/api/public/2.0/authorize/client/invoke",
    //             contentType: "application/json; charset=utf-8",
    //             data: JSON.stringify({
    //                 serviceCode: 'Migracao',
    //                 tenantCode: '1',
    //                 endpoint: '/update?c=noticias&f=%7B%22idNoticia%22:'+idNoticia+'%7D&u=%7B%22idFluig%22:'+idFluig+'%7D',
    //                 method: 'get'
    //             }),
    //             dataType: "json",
    //             success: function(data){
    //                 resolve(data)
    //             },
    //             failure: function(errMsg) {
    //                 resolve(errMsg);
    //             }
    //         });
    //     })
    // },
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
});

function disarrangeData(e) {
    var date = e.split('T');
    date = date[0].split('-');
    var hora = e.split('T')[1];
    date = date[2]+'/'+date[1]+'/'+date[0];
    return date;
}