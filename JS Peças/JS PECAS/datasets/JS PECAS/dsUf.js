function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	var dataSource = "/jdbc/FluigDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	log.info("QUERY: " + myQuery);
	var filtro = "";

	if (constraints != null){
		for (var c = 0; c < constraints.length; c++){
			if(filtro != ""){
				filtro += " OR ";
			}

			if (constraints[c].fieldName == "DESCRICAO_UF"){
				var cons = constraints[c].initialValue
				filtro += " est.descricao LIKE '%" + cons.toUpperCase() +"%'";
				log.warn("=====Debbug===== filtro: " + cons.toUpperCase());
			}
		}
	}

	var myQuery = "select est.uf, " +
	" est.descricao as descricao_uf, " +
	" est.id_regiao, " +
	" re.descricao as descricao_regiao" +
	" from ms.estado est, " +
	" ms.regiao re " +
	" where est.id_regiao = re.id_regiao " +
	( filtro != "" ? ( " AND " + filtro ) : ( "" ) ) + "" +
	" order by est.uf ";
	
	

	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				}
				created = true;
			}
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj) {
					Arr[i - 1] = rs
					.getObject(rs.getMetaData().getColumnName(i))
					.toString();
				} else {
					Arr[i - 1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
	} catch (e) {
		log.error("ERRO==============> " + e.message);
	} finally {
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
	}
	return newDataset;
}
