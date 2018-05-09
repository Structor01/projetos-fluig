function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
	var filtro = "";

	if (constraints != null){
		for (var c = 0; c < constraints.length; c++){

			if(filtro != ""){
				filtro += " OR ";
			}

			if (constraints[c].fieldName == "ID_EMPRESA"){
				filtro += " ID_EMPRESA = " + constraints[c].initialValue;
				log.warn("=====Debbug===== filtro: " + constraints[c].initialValue);
			}

			if (constraints[c].fieldName == "NOME_EMPRESA"){
				filtro += " NOME LIKE '%" + constraints[c].initialValue + "%'";
				log.warn("=====Debbug===== filtro: " + constraints[c].initialValue);
			}

		}
	}

//	if(filtro == ""){
//		return newDataset;
//	}

    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var myQuery = "select emp.id_empresa as id_empresa, " +
    					" emp.nome as nome_empresa " +
    		" from ms.empresa emp " +
    		" where emp.id_empresa not in (11, 27, 28, 101, 102) " +
    		( filtro != "" ? ( " AND " + filtro ) : ( "" ) ) + "" +
    		" order by emp.nome ";
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
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
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
