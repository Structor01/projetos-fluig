//var images = [
//    {
//        src: 'http://fluig.sebraego.com.br/externo/resources/images/img1.jpg',
//        alt: 'First image',
//        title: 'First image',
//        description: 'First image description',
//        linktarget: '_blank',
//        linkhref: 'http://www.fluig.com',
//        linktext: 'fluig'
//    },
//    {
//        src: 'http://fluig.sebraego.com.br/externo/resources/images/img1.jpg',
//        alt: 'Second image',
//        title: 'Second image',
//        description: 'Second image description',
//        linktarget: '_blank',
//        linkhref: 'http://style.fluig.com',
//        linktext: 'Style Guide'
//    }
//];
var images = [
    {
        src: 'http://fluig.sebraego.com.br/externo/resources/images/telefone.png'
    }
];
 
var settings = {
    id: 'myFluigCarouselExample',
    images: images,
    indicators: true,
    startIndex: 0,
    interval: 5000
};
 
var carousel = FLUIGC.carousel('#carousel-example-generic', settings);

carousel.on('fluig.carousel.slide', function(){
    // Do something
});