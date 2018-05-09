var MyDataTable = SuperWidget.extend({

	myTable: null,
	mydata: [],
	tableData: null,

	bindings: {
		local: {
			'datatable-add-row': ['click_addRow'],
			'datatable-del-row': ['click_delRow'],
			'datatable-edit-row': ['click_editRow'],
			'datatable-show-column': ['click_showColumn'],
			'datatable-hide-column': ['click_hideColumn'],
			'datatable-reload': ['click_reload'],
			'datatable-selected': ['click_selected'],
			'update-row': ['click_updaterow']

		},
		global: {}
	},

	init: function() {
		this.loadTable();
	},

    loadTable: function() {
    var that = this;
    var datasetReturned = DatasetFactory.getDataset("dsVagas", null, null, null);
    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
        var records = datasetReturned.values;
        for ( var index in records) {
            var record = records[index];
            that.mydata.push({
                vagas: record.VAGAS,
            });
        }
    }
    that.myTable = FLUIGC.datatable('#idtable' + "_" + that.instanceId, {
        dataRequest: that.mydata,
        renderContent: ['vagas'],
        header: [{
            'title': 'Vagas',
            'dataorder': 'name',
            'size': 'col-md-12'
        }],
        search: {
            enabled: false,
        },
        scroll: {
            target: ".target",
            enabled: true
        },
        actions: {
            enabled: false,
        },
        navButtons: {
            enabled: false,
        },
        draggable: {
            enabled: false
        },
    }, function(err, data) {
        if (err) {
            FLUIGC.toast({
                message: err,
                type: 'danger'
            });
        }
    });
    that.myTable.on('fluig.datatable.loadcomplete', function() {
        if (!that.tableData) {
            that.tableData = that.myTable.getData();
        }
    });
},

	addRow: function(el, ev) {
		var row = {
			id: "11",
			name: "Santa Catarina",
			uf: "SC"
		};

		this.myTable.addRow(0, row);
	},

	delRow: function(el, ev) {
		var itemsToRemove = this.myTable.selectedRows();

		if (itemsToRemove.length > 0) {
			for (var i = 0; i <= itemsToRemove.length; i++) {
				this.myTable.removeRow(this.myTable.selectedRows()[0]);
			}
		}

		FLUIGC.toast({
			title: '',
			message: "Removed element",
			type: 'success'
		});

	},

	editRow: function(el, ev) {
		var row = this.myTable.getRow(this.myTable.selectedRows()[0]);
		this.myTable.updateRow(this.myTable.selectedRows()[0], row, '.template_datatable_edit');
		$('#datatable-input-id').val(row.id);
		$('#datatable-input-name').val(row.name);
		$('#datatable-input-uf').val(row.uf);

		$('[data-datatable-edit-row]').prop("disabled", true);

	},

	updaterow: function(el, ev) {
		var editedRow = {
			id: $('#datatable-input-id').val(),
			name: $('#datatable-input-name').val(),
			uf: $('#datatable-input-uf').val()
		};
		this.myTable.updateRow(this.myTable.selectedRows()[0], editedRow);

		$('[data-datatable-edit-row]').prop("disabled", false);

		FLUIGC.toast({
			title: '',
			message: "Edited!",
			type: 'success'
		});
	},

	showColumn: function(el, ev) {
		var index = 1;
		this.myTable.showColumn(index);
	},

	hideColumn: function(el, ev) {
		var index = 1;
		this.myTable.hideColumn(index);
	},

	reload: function(el, ev) {
		this.myTable.reload();
	},

	selected: function(el, ev) {
		var index = this.myTable.selectedRows()[0];
		var selected = this.myTable.getRow(index);
		FLUIGC.toast({
			title: '',
			message: "{\"id\" :" + selected.id + ", \"name\" :" + selected.name + " , \"uf\" :" + selected.uf + "}",
			type: 'success'
		});

	}

});
