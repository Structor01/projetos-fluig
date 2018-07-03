var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        var mostraAnalytics, mostraRec = false;

        var constraints = new Array(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", top.WCMAPI.userCode, top.WCMAPI.userCode, ConstraintType.MUST));
        var groups = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
        if(top.WCMAPI.userCode == 'F775') mostraAnalytics = true;
        groups.map(res=>{
           var r = res.values;
            r['groupId'].indexOf('REC-') > -1 ? mostraRec = true : false;
        });

        if(mostraAnalytics) {
            $('.iconAnalytics').removeClass('hide');
        }

        if(mostraAnalytics) {
            $('.iconRecurso').removeClass('hide');
        }
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