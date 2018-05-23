<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="HelloWorld_${instanceId}"
	 class="super-widget wcm-widget-class fluig-style-guide"
	 data-params="HelloWorld.instance({message: 'Hello world'})"
>
	<style>
		.fluig-style-guide .panel-default>.panel-heading {
			color: #FFF !important;
			background-color: #0080ff!important;
			border-color: #0080ff!important;
		}

		/* .fluig-style-guide #limpaZoomPortaria { */
		/*     border-right: solid 1px #0366c7 !important; */
		/* } */

		.fluig-style-guide .input-group-addon {
			border: 1px solid #0080ff!important;
			background-color: #0080ff!important;
			color: #FFF !important;
		}

		.fluigicon.fluigicon-trash.fluigicon-md {
			line-height: 0px;
		}

		.btn-default {
			border: 1px solid #0080ff!important;
			background-color: #0080ff!important;
			color: #FFF !important;
		}

		.btn-default:hover {
			background-color: #0A8ECC!important;
		}

		button {
			margin-right: .5rem;
		}
	</style>
	<div class="page-content container-fluid">
		<div class="row">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title"><span class="fluigicon fluigicon-flag fluigicon-sm"></span> Filtros</h3>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label for="porRecurso">Recurso</label>
						<input type="email" class="form-control" id="porRecurso" placeholder="">
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<button style="margin: 0.5rem" id="btn-calendar" onclick="changeView('calendar')" class="btn btn-primary active fs-float-right">
				<span class="fluigicon fluigicon-calendar fluigicon-sm"></span>
			</button>

			<button style="margin: 0.5rem" id="btn-lista" onclick="changeView('lista')" class="btn fs-float-right">
				<span class="fluigicon 	fluigicon-list fluigicon-sm"></span>
			</button>
		</div>

		<div class="row">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title"><span class="fluigicon fluigicon-flag fluigicon-sm"></span> Eventos</h3>
				</div>
				<div class="panel-body">
					<div class="viewEv" id="calendar"></div>
					<div class="viewEv hide" id="lista">
						<table class="table table-striped">
							<thead>
							<th>Nome do Evento</th>
							<th>Tipo Evento</th>
							<th>Unidade</th>
							<th>Início</th>
							<th>Fim</th>
							<th>Cidade</th>
							</thead>
							<tbody id="rowEventos"></tbody>
						</table>
					</div>
				</div>
				<!--<div style="margin: 1rem" class="btn-group fs-float-right">-->
				<!--<button type="button" onclick="prevP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-left fluigicon-sm"></span></button>-->
				<!--<button type="button" onclick="nextP()" class="btn btn-default"><span class="fluigicon fluigicon-arrow-right fluigicon-sm"></span></button>-->
				<!--</div>-->

				<!--<button type="button" onclick="editCad()" style="margin: 1rem" class="btn btn-default fs-float-left">Editar meu ramal</button>-->
			</div>
		</div>
	</div>
</div>