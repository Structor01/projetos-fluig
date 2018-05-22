var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
            this.verificaResponsavel();
        },
    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },
    verificaResponsavel: function () {
        alert(top.WCMAPI.userEmail);
        // var email = top.WCMAPI.userEmail;
        var email = 'liliane.almeida@sebraego.com.br';

        var dataset = DatasetFactory.getDataset(
            "sebrae_cadastra_recursos",
            null,
            [DatasetFactory.createConstraint("cdResponsavelRecurso", email, email, ConstraintType.MUST)],
            null);
        if(dataset && dataset.values.length > 0) {
            for(var i in dataset.values) {

            }
        } else {
            alert("Não há recursos sob sua responsabilidade!");
        }
    }
});