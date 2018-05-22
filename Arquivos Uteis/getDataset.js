function getDataset() {
    //Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("publisherId", "adm", "adm", ConstraintType.MUST_NOT);
    var c3 = DatasetFactory.createConstraint("documentType", "1", "1", ConstraintType.SHOULD);
    var c4 = DatasetFactory.createConstraint("documentType", "2", "2", ConstraintType.SHOULD);
    var c5 = DatasetFactory.createConstraint("documentDescription", "%teste%", "%teste%", ConstraintType.MUST_NOT);
    c5.setLikeSearch(true);
    var constraints = new Array(c1, c2, c3, c4, c5);

    //Define os campos para ordenação
    var sortingFields = new Array("documentPK.documentId");

    //Busca o dataset
    var dataset = DatasetFactory.getDataset("document", null, constraints, null);

    for (var i = 0; i < dataset.rowsCount; i++) {
        log.info(dataset.getValue(i, "documentPK.documentId"));
    }

    // No Front
    for (var i = 0; i < dataset.values.length; i++) {
        console.log(dataset.values[i]["nomecoluna"]);
    }
}

/*******************************************************************************

No exemplo acima, o código JavaScript faz o acesso ao Dataset "group",
que é um Dataset interno do sistema,
e retorna a quantidade de linhas disponíveis (rowsCount).

O objeto DatasetFactory é a "porta de entrada" para o acesso a qualquer Dataset.

Além de permitir a carga de um Dataset,
ela também permite navegar entre todos os Datasets disponíveis no sistema.

O acesso a um Dataset é feito através do método getDataset do objeto
DatasetFactory, onde seus parâmetros são:
Nome do Dataset: Nome do Dataset a ser buscado;
Campos: Array com os campos do Dataset que serão retornados.
Caso seja informado null, retorna todos os campos do Dataset;
Constraints: Array com os condições de busca do Dataset.
Caso seja informado null, retorna todos os registros do Dataset.
Ordem: Array com os campos para ordenação dos registros do Dataset.
Caso seja informado null,
retorna os registros com a ordenação padrão.
Já para a criação das constraints é utilizado o método createConstraint
do objeto DatasetFactory, onde seus parâmetros são:
Campo: Nome do campo que será filtrado;
Valor Inicial: Valor inicial da faixa de valores do filtro
Valor Final: Valor final da faixa de valores do filtro
Tipo: Tipo da condição, podendo ser:
MUST: indica que todos os registros do Dataset devem satisfazer a esta condição.
SHOULD: indica que os registros do Dataset podem ou não atender à condição.
Esse tipo é mais comum quando se necessita que um mesmo campo tenha valores A ou B
(onde cada um será uma condição de busca com tipo SHOULD).
MUST_NOT: indica que nenhum dos registros pode satisfazer a condição.

*******************************************************************************/