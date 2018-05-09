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
        if(!created) {                                                               for(var i=1;i<=columnCount; i++) {                                                                              newDataset.addColumn(rs.getMetaData().getColumnName(i));                                                               }                                                               created = true;                                               }                                               var Arr = new Array();                                               for(var i=1;i<=columnCount; i++) {                                                               var obj = rs.getObject(rs.getMetaData().getColumnName(i));                                                               if(null!=obj){                                                                              Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();                                                               }                                                               else {                                                                              Arr[i-1] = "null";                                                               }                                               }                                               newDataset.addRow(Arr);                               }                } catch(e) {                               log.info("ERRO==============> " + e.message);                } finally {                               if(stmt != null) stmt.close();                               if(conn != null) conn.close();                                     }			                return newDataset;}
