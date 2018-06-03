<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

<div
		id="HelloWorld_${instanceId}"
		class="super-widget wcm-widget-class fluig-style-guide"
		data-params="HelloWorld.instance({message: 'Hello world'})">

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

	<div class="form-group" style="position:absolute; top: 0; right: 0; margin: 1rem 2rem;">
		<button class="btn-default btn" onclick="filtrarEv()"><span class="fluigicon fluigicon-filter fluigicon-sm"></span> Filtrar Eventos</button>
	</div>

	<div class="page-content container-fluid">
		<div class="row">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="col-md-12">
						<div class="viewEv" id="calendar"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="hide" id="modalEventos">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title"><span class="fluigicon fluigicon-flag fluigicon-sm"></span> Dados do Contato</h3>
			</div>
			<div class="panel-body">
				<div class="form-group col-md-2">
					<label for="codSAS">Código do Evento</label>
					<input type="text" class="form-control" id="codSAS" name="codSAS" placeholder="Favor informar o nome do evento.">
				</div>
				<div class="form-group col-md-6">
					<label for="nomeEvento">Nome do Evento</label>
					<input type="text" class="form-control" id="nomeEvento" name="nomeEvento" placeholder="Favor informar o nome do evento.">
				</div>
				<div class="form-group col-md-4">
					<label for="nomeEvento">Nome do Local</label>
					<input type="text" class="form-control" id="nomeLocal" name="nomeLocal">
				</div>
				<div class="form-group col-md-12">
					<label for="endereco">Endereço</label>
					<input type="text" class="form-control" id="endereco" name="endereco">
				</div>
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
				</div>
				<div class="col-md-6" style="padding: 0">
					<label for="unidadeVinculada">Unidade Vinculada</label>
					<input type="text" class="form-control" id="unidadeVinculada" name="unidadeVinculada">
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
				<label for="dtInicio">Data de Início</label>
				<div class="input-group date" onclick="dateSet(this)">
					<input type="text" class="form-control dateReserva" id="dtInicio" name="dtInicio">
					<div class="input-group-addon">
						<span class="fluigicon fluigicon-calendar" onclick="dateSet(this)"></span>
					</div>
				</div>
			</li>
			<li class="list-group-item">
				<label for="dtFinal">Data de Término</label>
				<div class="input-group date">
					<input type="text" class="form-control dateReserva" id="dtFinal" name="dtFinal">
					<div class="input-group-addon" onclick="dateSet(this)">
						<span class="fluigicon fluigicon-calendar"></span>
					</div>
				</div>
			</li>
		</ul>
	</div>

	<div class="hide" id="modalFiltros">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="form-group col-md-8">
					<label>Título do Evento</label>
					<div class="input-group">
						<input class="form-control eventTitle" placeholder="Filtre pelo Título do Evento" name="eventTitle" value="">
						<div class="input-group-addon">
							<span class="fluigicon fluigicon-search"></span>
						</div>
					</div>
				</div>
				<div class="form-group col-md-4">
					<label>Tipo do Evento</label>
					<!--<input class="form-control" name="eventType" value="">-->
					<select class="form-control eventType" name="eventType">
						<option value="">Filtre por Tipo de Evento</option>
					</select>
				</div>
				<div class="form-group col-md-4">
					<label>Unidade Vinculada</label>
					<!--<input class="form-control" name="eventCity" value="">-->
					<select class="form-control eventUnidade" name="eventUnidade">
						<option value="">Filtre por Unidade Vinculada</option>
					</select>
				</div>
				<div class="form-group col-md-4">
					<label>Estado</label>
					<!--<input class="form-control" name="eventCity" value="">-->
					<select class="form-control eventState" name="eventState">
						<option value="">Filtre por Estado</option>
					</select>
				</div>
				<div class="form-group col-md-4">
					<label>Cidade</label>
					<!--<input class="form-control" name="eventCity" value="">-->
					<select class="form-control eventCity" name="eventCity"  disabled>
						<option value="">Filtre por Cidade</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>