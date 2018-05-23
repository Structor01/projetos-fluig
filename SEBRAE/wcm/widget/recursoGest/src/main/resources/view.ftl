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
			<!--<div class="panel panel-default">-->
				<!--<div class="panel-heading" onclick="$('#filtros').slideToggle()" style="background: none !important;">-->
					<!--<h3 class="panel-title" style="color: #0080ff!important;"><span class="fluigicon fluigicon-filter fluigicon-sm"></span> Filtros</h3>-->
					<!--<span onclick="$('#filtros').slideToggle()" class="fluigicon fluigicon-pointer-down fluigicon-sm fs-float-right" style="margin-top: -1rem; color: #0080ff!important;"></span>-->
				<!--</div>-->
				<!--<div class="panel-body" id="filtros" style="display: none;">-->
					<!--<div class="form-group col-md-12">-->
						<!--<label for="porRecurso">Recurso</label>-->
						<!--<div class="input-group">-->
							<!--<input type="text" class="form-control" id="porRecurso" placeholder="Digite o nome do recurso pelo qual deseja filtrar.">-->
							<!--<span class="input-group-addon">-->
            					<!--<span class="fluigicon fluigicon-search"></span>-->
        					<!--</span>-->
						<!--</div>-->
					<!--</div>-->
				<!--</div>-->
			<!--</div>-->
		<!--</div>-->

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
			</div>
		</div>
	</div>
	<div id="modalEventos" class="hide">
		<div class="row">
			<div class="form-group col-md-5">
				<label>Recurso</label>
				<input type="text" class="form-control title" value="" readonly>
			</div>
			<div class="form-group col-md-1">
				<label>Qtd.</label>
				<input type="text" class="form-control qtd" value="" readonly>
			</div>
			<div class="form-group col-md-3">
				<label>Início</label>
				<input type="text" class="form-control start" value="" readonly>
			</div>
			<div class="form-group col-md-3">
				<label>Fim</label>
				<input type="text" class="form-control end" value="" readonly>
			</div>

			<div class="panel panel-default recursos fs-clear-both">
				<div class="panel-heading">
					<h3 class="panel-title">
						<span class="fluigicon fluigicon-glass fluigicon-sm"></span> Necessidades no Recurso
					</h3>
				</div>
				<div class="panel-body">
					<ul class="list-group col-md-4">
						<li class="list-group-item disabled">
							Recursos
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcBolachaII">
								<input type="checkbox" id="rcBolacha" name="rcBolacha" value="bolacha"> Bolachas (sal/doce)
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcEquipamentosII">
								<input type="checkbox" id="rcEquipamentos" name="rcEquipamentos" value="equipamentos"> Equipamentos
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcFilmeII">
								<input type="checkbox" id="rcFilme" name="rcFilme" value="filme"> Exibirá Filme
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcSalaII">
								<input type="checkbox" id="rcSala" name="rcSala" value="sala"> Formato de Salas
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcChaII">
								<input type="checkbox" id="rcCha" name="rcCha" value="cha"> Garrafa de Chá
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcCafeII" >
								<input type="checkbox" id="rcCafe" name="rcCafe" value="cafe"> Garrafa de Café
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcParticipanteII">
								<input type="checkbox" id="rcParticipante" name="rcParticipante" value="participante" onclick="ativaRec(this)"> Número de Participante
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcFinalidadeII">
								<input type="checkbox" id="rcFinalidade" name="rcFinalidade" value="finalidade" onclick="ativaRec(this)"> Finalidade
							</label>
						</li>
						<li class="list-group-item">
							<label class="checkbox-inline" id="rcObservacaoII">
								<input type="checkbox" id="rcObservacao" name="rcObservacao" value="observacao" onclick="ativaRec()"> Observação
							</label>
						</li>
					</ul>
					<div class="form-group col-md-8 col-sm-12 fs-float-right" id="rcParticipanteObsII">
						<label for="rcParticipanteObs" class="control-label">Participante</label>
						<textarea class="form-control"id="rcParticipanteObs" name="rcParticipanteObs" rows="3" readonly></textarea>
					</div>
					<div class="form-group col-md-8 col-sm-12 fs-float-right" id="rcFinalidadeObsII">
						<label for="rcFinalidadeObs" class="control-label" >Finalidade</label>
						<textarea class="form-control"id="rcFinalidadeObs" name="rcFinalidadeObs" rows="3" readonly></textarea>
					</div>
					<div class="form-group col-md-8 col-sm-12 fs-float-right" id="rcObservacaoObsII">
						<label for="rcObservacaoObs" class="control-label" >Observação</label>
						<textarea class="form-control"id="rcObservacaoObs" name="rcObservacaoObs" rows="3" readonly></textarea>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>