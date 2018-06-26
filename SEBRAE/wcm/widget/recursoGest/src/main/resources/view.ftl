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
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="viewEv" id="calendar"></div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="panel panel-warning">
					<div class="panel-heading">
						<span class="fluigicon fluigicon-warning-sign fluigicon-sm"></span> Aprovações Pendentes
					</div>
					<div class="panel-body">
						<table class="table" id="tableAprova">
							<th>Recurso</th>
							<th>Início</th>
							<th>Fim</th>
						</table>
					</div>
				</div>
				<div class="fs-clear-both panel panel-success">
					<div class="panel-heading">
						<span class="fluigicon fluigicon-warning-sign fluigicon-sm"></span> Aprovações Pendentes
					</div>
					<div class="panel-body">
						<table class="table" id="tableAprovado">
							<th>Recurso</th>
							<th>Início</th>
							<th>Fim</th>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="modalEventos" class="hide">
		<div class="panel-body">
			<div class="row">
				<div class="form-group col-md-3">
					<label>Data Solicitação</label>
					<div class="input-group">
						<input type="text" class="form-control dtSolicitacao" readonly>
						<div class="input-group-addon">
							<span class="fluigicon fluigicon-calendar"></span>
						</div>
					</div>
				</div>
				<div class="form-group col-md-4">
					<label>Solicitante</label>
					<input type="text" class="form-control solicitante" readonly>
					<input type="hidden" class="form-control solicitanteId" readonly>
				</div>
				<div class="form-group col-md-5">
					<label>Solicitante Informado</label>
					<input type="text" class="form-control solicitanteInformado" readonly />
				</div>
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
									<input type="checkbox" id="rcBolacha" name="rcBolacha" value="bolacha" disabled> Bolachas (sal/doce)
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcEquipamentosII">
									<input type="checkbox" id="rcEquipamentos" name="rcEquipamentos" value="equipamentos" disabled> Equipamentos
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcFilmeII">
									<input type="checkbox" id="rcFilme" name="rcFilme" value="filme" disabled> Exibirá Filme
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcSalaII">
									<input type="checkbox" id="rcSala" name="rcSala" value="sala" disabled> Formato de Salas
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcChaII">
									<input type="checkbox" id="rcCha" name="rcCha" value="cha" disabled> Garrafa de Chá
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcCafeII" >
									<input type="checkbox" id="rcCafe" name="rcCafe" value="cafe" disabled> Garrafa de Café
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcParticipanteII" >
									<input type="checkbox" id="rcParticipante" name="rcParticipante" disabled value="participante" onclick="ativaRec(this)"> Número de Participante
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcFinalidadeII" >
									<input type="checkbox" id="rcFinalidade" name="rcFinalidade" disabled value="finalidade" onclick="ativaRec(this)"> Finalidade
								</label>
							</li>
							<li class="list-group-item">
								<label class="checkbox-inline" id="rcObservacaoII" >
									<input type="checkbox" id="rcObservacao" name="rcObservacao" disabled value="observacao" onclick="ativaRec()"> Observação
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
</div>