<div id="HelloWorld_${instanceId}"
	 class="super-widget wcm-widget-class fluig-style-guide"
	 data-params="HelloWorld.instance({message: 'Hello world'})"
>
	<div ng-app="myApp" ng-controller="customersCtrl">
		<table class="table table-striped">
			<thead>
			<th>Nome do Evento</th>
			<th>Tipo Evento</th>
			<th>Unidade</th>
			<th>Início</th>
			<th>Fim</th>
			<th>Cidade</th>
			</thead>
			<tbody id="rowEventos">
			<tr ng-repeat="evento in eventos">
				<td>{{ evento.TituloEvento }}</td>
				<td>{{ evento.DescProduto }}</td>
				<td>{{ evento.DescUnidadeOrganizacional }}</td>
				<td>{{ evento.PeriodoInicial }}</td>
				<td>{{ evento.PeriodoFinal }}</td>
				<td>{{ evento.NomeCidade }}</td>
			</tr>
			</tbody>
		</table>
	</div>
</div>
