function createDataset(fields, constraints, sortFields) {
  var dataSource = "jdbc/webdeskDS";       
  var newDataset = DatasetBuilder.newDataset();
   var ic = new javax.naming.InitialContext();
   var ds = ic.lookup(dataSource);
   var created = false;
   try {
     var conn = ds.getConnection();
     var stmt = conn.createStatement();
     var rs = stmt.executeQuery("SELECT NR_DOCUMENTO, NR_VERSAO ,DS_PRINCIPAL_DOCUMENTO FROM DOCUMENTO WHERE VERSAO_ATIVA <> '0' AND LOG_APROVADO <> '0' AND NUM_DOCTO_PROPRIED = '0' AND NR_ACESSOS <> '0' ORDER BY NR_DOCUMENTO ASC ");
     var columnCount = rs.getMetaData().getColumnCount();
      while(rs.next()) {
        if(!created) {