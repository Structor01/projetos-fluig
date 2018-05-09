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


function getMapsData() {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/output?key=AIzaSyArJDvUGpUZ0oO_7aKcfiYwdEMS_rigxRc&input=Goiania',
        dataType: "json",
        type: 'POST'
    }).done(function (data) {
        console.log(data);
    });
}