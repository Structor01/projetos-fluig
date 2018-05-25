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
		<!--<div class="row">-->
			<!--<button style="margin: 0.5rem" id="btn-calendar" onclick="changeView('calendar')" class="btn btn-primary active fs-float-right">-->
				<!--<span class="fluigicon fluigicon-calendar fluigicon-sm"></span>-->
			<!--</button>-->

			<!--<button style="margin: 0.5rem" id="btn-lista" onclick="changeView('lista')" class="btn fs-float-right">-->
				<!--<span class="fluigicon 	fluigicon-list fluigicon-sm"></span>-->
			<!--</button>-->
		<!--</div>-->
		<div class="row">
			<div class="panel panel-default">
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

	<div class="hide" id="modalEventos">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title"><span class="fluigicon fluigicon-flag fluigicon-sm"></span> Dados do Contato</h3>
			</div>
			<div class="panel-body">
				<div class="form-group col-md-6">
					<label for="nomeEvento">Nome do Evento</label>
					<input type="text" class="form-control" id="nomeEvento" name="nomeEvento" placeholder="Favor informar o nome do evento.">
				</div>
				<div class="form-group col-md-6">
					<label for="nomeEvento">Nome do Local</label>
					<input type="text" class="form-control" id="nomeLocal" name="nomeLocal">
				</div>
				<!--<div class="form-group col-md-12">-->
					<!--<input id="pac-input" class="controls" type="text"-->
						   <!--placeholder="Enter a location">-->
					<!--<div id="map"></div>-->
					<!--<div id="infowindow-content">-->
						<!--<span id="place-name"  class="title"></span><br>-->
						<!--Place ID <span id="place-id"></span><br>-->
						<!--<span id="place-address"></span>-->
					<!--</div>-->
				<!--</div>-->
				<div class="form-group col-md-12">
					<label for="endereco">Endereço</label>
					<input type="text" class="form-control" id="endereco" name="endereco">
				</div>
				<!--<div class="form-group col-md-4">-->
					<!--<button type="button" onclick="$('#map').toggle()" id="btn-esconder" style="margin: 0.5rem" class="btn btn-primary fs-float-right btn-sm">Esconder/Mostrar Mapa</button>-->
					<!--<a href="#" class="btn btn-info fs-float-right fs-float-right hide" style="margin: 0.5rem" target="_blank" id="rotas" role="button"><span class="fluigicon fluigicon-map-marker fluigicon-sm"></span> Rotas</a>-->
				<!--</div>-->
			</div>
		</div>
		<ul class="list-group col-md-8">
			<li class="list-group-item disabled">
				Detalhes
			</li>
			<li class="list-group-item row" style="margin: 0; margin-bottom: -1px">
				<div class="col-md-6" style="padding: 0; padding-right:15px">
					<label for="tipoEvento">Tipo de Evento</label>
					<input type="text" class="form-control" id="tipoEvento" name="tipoEvento">
					<!--<select class="form-control" name="tipoEvento" id="tipoEvento">-->
						<!--<option value="">Selecione</option>-->
					<!--</select>-->
				</div>
				<div class="col-md-6" style="padding: 0">
					<label for="unidadeVinculada">Unidade Vinculada</label>
					<input type="text" class="form-control" id="unidadeVinculada" name="unidadeVinculada">
					<!--<select class="form-control" name="unidadeVinculada" id="unidadeVinculada">-->
						<!--<option value="">Selecione</option>-->
					<!--</select>-->
				</div>
			</li>
			<li class="list-group-item row" style="margin: 0; margin-bottom: -1px">
				<div class="col-md-8" style="padding: 0; padding-right:15px">
					<label for="responsavel">Responsável</label>
					<input type="text" class="form-control" id="responsavel" name="responsavel" placeholder="Favor informar o nome do evento.">
				</div>
				<div class="col-md-4" style="padding: 0">
					<label for="valorInscricao">Valor de Inscrição</label>
					<div class="input-group">
						<span class="input-group-addon">R$</span>
						<input type="text" class="form-control money" id="valorInscricao" name="valorInscricao">
					</div>
				</div>
			</li>
			<li class="list-group-item row" style="margin: 0; margin-bottom: -1px">
				<div class="col-md-6" style="padding: 0; padding-right:15px">
					<label for="telefone">Telefone</label>
					<input type="text" class="form-control telefone" id="telefone" name="telefone">
				</div>
				<div class="col-md-6" style="padding: 0">
					<label for="email">E-mail</label>
					<input type="text" class="form-control" id="email" name="email">
				</div>
			</li>
			<li class="list-group-item">
				<label for="telefone">Público Alvo</label>
				<textarea type="text" rows="3" class="form-control" id="publicoAlvo" name="publicoAlvo"></textarea>
			</li>
			<li class="list-group-item">
				<label for="telefone">Observação</label>
				<textarea type="text" rows="3" class="form-control" id="observacao" name="observacao"></textarea>
			</li>
		</ul>
		<ul class="list-group col-md-4">
			<li class="list-group-item disabled">
				Horários do Eventos
			</li>
			<li class="list-group-item">
				<label for="dtSolicitacao">Data de Início</label>
				<div class="input-group date" onclick="dateSet(this)">
					<input type="text" class="form-control dateReserva" id="dtInicio" name="dtInicio">
					<div class="input-group-addon">
						<span class="fluigicon fluigicon-calendar" onclick="dateSet(this)"></span>
					</div>
				</div>
			</li>
			<li class="list-group-item">
				<label for="dtSolicitacao">Data de Término</label>
				<div class="input-group date">
					<input type="text" class="form-control dateReserva" id="dtFinal" name="dtFinal">
					<div class="input-group-addon" onclick="dateSet(this)">
						<span class="fluigicon fluigicon-calendar"></span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>