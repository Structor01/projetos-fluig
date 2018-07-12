// ***********************************************************************************
// Função para criar dataset que possibilita a busca de dados diretamente no 
// SQL
// ***********************************************************************************
// Data: 05/09/2014
// Autor: Murilo Cantharino - TOTVS BA
// ***********************************************************************************
// Parâmetros:
// -----------------------------------------------------------------------------------
// fields : Array contendo a query (consulta) a ser passada ao dataset
// constraints : não utilizado
// sortFields : não utilizado
// ***********************************************************************************
function createDataset(fields, constraints, sortFields) {

    var minhaQuery = fields[0];
	var dataSource = fields[1];       

	var newDataset = DatasetBuilder.newDataset();
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
	   var conn = ds.getConnection();
	   var stmt = conn.createStatement();
	   //conn.setAutoCommit(false); 
	   var rs = stmt.executeQuery(minhaQuery);
	   var columnCount = rs.getMetaData().getColumnCount();
	   while(rs.next()) {
		   if(!created) {
			   for(var i=1;i<=columnCount; i++) {
				  newDataset.addColumn(rs.getMetaData().getColumnName(i));
			   }
			   created = true;
		   }
		   var Arr = new Array();
		   for(var i=1;i<=columnCount; i++) {
			   var obj = rs.getObject(rs.getMetaData().getColumnName(i));
			   if(null!=obj){
			  	  Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
			   }
			   else {
				  Arr[i-1] = "null";
			   }
		   }
		   newDataset.addRow(Arr);
	   }
	} catch(e) {
	   log.info("ERRO==============> " + e.message);
	} finally {
	   if(stmt != null) stmt.close();
	   if(conn != null) conn.close();
	   if(rs != null ) rs.close();
	}
	return newDataset;
}
