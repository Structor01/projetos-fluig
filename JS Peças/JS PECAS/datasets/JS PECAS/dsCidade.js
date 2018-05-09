function createDataset(fields, constraints, sortFields) {

	log.info('---- DEBUG ---- dsCidade INICIO');
	var newDataset = DatasetBuilder.newDataset();

	var filtro = "";

	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++) {
			/*if (filtro != "") {
			filtro += " OR ";
		}*/
			var cons = constraints[c].initialValue;

			if (constraints[c].fieldName == "UF") {
				filtro += " cid.uf = '" + cons.toUpperCase() + "'";
				log.warn("=====Debbug===== filtro: "
						+ constraints[c].initialValue);
			}

			if (constraints[c].fieldName == "DESCRICAO_CIDADE") {
				filtro += " cid.descricao like '%" +  cons.toUpperCase() + "%'";
				log.warn("=====Debbug===== filtro: "
						+ constraints[c].initialValue);
			}
		}
	}
	var dataSource = "/jdbc/FluigDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	var myQuery = " select cid.id_cidade as codigo, "
		+ " cid.descricao as descricao_cidade, "
		+ " cid.uf as uf "
		+ " from ms.cidade cid, "
		+ " ms.estado est " + " where cid.uf = est.uf "
		+ (filtro != "" ? (" AND " + filtro) : ("")) + ""
		+ " order by cid.descricao ";

	log.info("QUERY: " + myQuery);

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



function defineStructure() {
	log.info("--OFFLINE-- defineStructure");	
	
	addColumn("CODIGO");
	addColumn("DESCRICAO_CIDADE");
	addColumn("UF");

	log.info("--OFFLINE-- defineStructure addColumn");
	setKey(new Array( "CODIGO"));
	addIndex(new Array( "CODIGO"));

	log.info("--OFFLINE-- defineStructure FIM");

}

function onSync(lastSyncDate){
	log.info("--OFFLINE-- onSync ");

	var dataset = DatasetBuilder.newDataset();
	log.info("--OFFLINE-- dataset: "+dataset);

	var newerDataset = createDataset();
	log.info("--OFFLINE-- newerDataset: "+newerDataset);

	var olderDataset = DatasetFactory.getDataset("dsCidade", null, null, null);
	log.info("--OFFLINE-- olderDataset: "+olderDataset);

	var ifNull = function(value, ifNullValue){
		return value == null || value == "" ? ifNullValue : value;
	}

	if(newerDataset != null){
		var updated = new Array();
		for(var i = 0; i < newerDataset.rowsCount; i++){
			dataset.addOrUpdateRow(new Array(
					ifNull(newerDataset.getValue(i,"CODIGO"),""),
					ifNull(newerDataset.getValue(i,"DESCRICAO_CIDADE"),""),
					ifNull(newerDataset.getValue(i,"UF"),"")
			));
			updated.push(newerDataset.getValue(i,"CODIGO"));
			log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
		}

		if(olderDataset != null){
			for(var i = 0; i < olderDataset.rowsCount; i++){
				if(updated.indexOf(olderDataset.getValue(i,"CODIGO") == -1)){
					dataset.deleteRow(new Array(						
						ifNull(olderDataset.getValue(i,"CODIGO"),""),
					ifNull(olderDataset.getValue(i,"DESCRICAO_CIDADE"),""),
					ifNull(olderDataset.getValue(i,"UF"),"")	
					));
				}
			}
		}
	}

	log.info("--OFFLINE-- return dataset: "+dataset);
	log.info("--OFFLINE-- onSync FIM");
	return dataset;
}


function onMobileSync(user) {
	log.warn("--MOBILE-- dsCidade.js - onMobileSync");

	var sortingFields = new Array();

	var fields = new Array(
			"CODIGO",
			"DESCRICAO_CIDADE",
			"UF"
	);
	
	var constraints = new Array();

	var result = {
			'fields' : fields,
			'constraints' : constraints,
			'sortingFields' : sortingFields
	};

	log.warn("--MOBILE-- dsCidade.js - fim onMobileSync");
	return result;
}
