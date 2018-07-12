var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        var constraints = new Array(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", top.WCMAPI.userCode, top.WCMAPI.userCode, ConstraintType.MUST));
        var groups = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
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
    $('#all-slots-right').css('width', '50%');
    $('#divSlot1').css('width', '50%');
});