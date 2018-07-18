function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset(); 
    var dataSource = "/jdbc/MigracaoDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var myQuery = "SELECT * FROM `view_blog_post`";
    log.info("QUERY: " + myQuery);
    try {
        var conn = ds.getConnection();
        log.info('--Conn ' + conn);
        var stmt = conn.createStatement();
        log.info('--stmt ' + stmt);
        var rs = stmt.executeQuery(myQuery);
        log.info('--rs ' + rs);
        var columnCount = rs.getMetaData().getColumnCount();
        log.info('--columnCount ' + columnCount);
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