<#import "/wcm.ftl" as wcm/>
<!-- <@wcm.header/> -->
<!-- WCM Wrapper content -->
<!-- <div class="wcm-wrapper-content"> -->

    <!--<@wcm.menu />-->

	<!-- Wrapper -->
	<div class="wcm-all-content">
		<div id="wcm-content" class="clearfix wcm-background">
    	    <!--WIDGETS DO LAYOUT -->
        
        	<!-- Onde deverá estar a barra de formatação -->
        <#if pageRender.isEditMode()=true>
            <div name="formatBar" id="formatBar"></div>
            <!-- Div geral -->
            <!-- Há CSS distinto para Edição/Visualização -->
            <div id="edicaoPagina" class="clearfix">
        <#else>
            <div id="visualizacaoPagina" class="clearfix">
        </#if>
                <!-- Slot 1 -->
                <div class="editable-slot slotfull layout-1-1" id="slotFull1">
                    <@wcm.renderSlot id="SlotA" editableSlot="true"/>
                </div>

                <!-- Slot 2 -->
                <div class="editable-slot slotfull layout-1-1" id="slotFull2">
                	<div id="institucional" class="super-widget fluig-style-guide">
                		<div class="page-content container-fluid">
							<div class="row">
								<div class="col-md-12 col-xs-12">
									<style>
									  /* Note: Try to remove the following lines to see the effect of CSS positioning */
									  .affix {
									      top: 70px;
									  }
									  .wcm_title_widget{
									  		display : none;	
									  }
			<!-- 						  .wcm_corpo_widget_single iframe{ -->
			<!-- 						  		height : 100% !important;  -->
									  		
			<!-- 						  } -->
								  	</style>
<!-- 									<div class="clearfix visible-xs-block"></div> -->
					   				<!-- Nav tabs -->
									<ul class="nav nav-tabs nav-ellipsis" role="tablist" id="myTab">
									    <li class="active" style="width: 15%"><a href="#sobre" role="tab" data-toggle="tab"><span class="fluigicon fluigicon-company"></span> Sobre</a></li>
									    <li style="width: 15%"><a href="#documentos" role="tab" data-toggle="tab"><span class="fluigicon fluigicon-files"></span> Documentos</a></li>
									    <li style="width: 15%"><a href="#ondeEstamos" role="tab" data-toggle="tab"><span class="fluigicon fluigicon-globe"></span> Onde Estamos</a></li>
									    <li style="width: 15%"><a href="#diretoriaConselho" role="tab" data-toggle="tab"><span class="fluigicon fluigicon-group"></span> Diretoria e Conselho</a></li>
									</ul>
									<!-- Tab panes -->
									<div class="tab-content">
									    <div class="tab-pane fade in active" id="sobre">
									    	<div class="container-fluid">
											  <div class="row">
											    <nav class="col-sm-2">
											      <ul class="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205">
											        <div class="btn-group-vertical">
														<a href="#pnSobre" role="button" class="btn btn-default">Sobre</a>
														<a href="#pnMissao" role="button" class="btn btn-default">Missão</a>
														<a href="#pnMeta" role="button" class="btn btn-default">Meta</a>
														<a href="#pnCompromisso" role="button" class="btn btn-default">Nosso Compromisso</a>
														<a href="#pnHistoria" role="button" class="btn btn-default">Nossa História</a>
													</div>
											      </ul>
											    </nav>
											    <div class="col-sm-10">   
											      	<div class="panel panel-default" id="pnSobre">
													    <div class="panel-heading">Sobre</div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull10">
											                    <@wcm.renderSlot id="SlotA10" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnMissao">
													    <div class="panel-heading">
													        <h3 class="panel-title">Missão</h3>
													    </div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull11">
											                    <@wcm.renderSlot id="SlotA11" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnMeta">
													    <div class="panel-heading">Meta</div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull12">
											                    <@wcm.renderSlot id="SlotA12" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnCompromisso">
													    <div class="panel-heading">
													        <h3 class="panel-title">Nosso Compromisso</h3>
													    </div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull13">
											                    <@wcm.renderSlot id="SlotA13" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnHistoria">
													    <div class="panel-heading">
													        <h3 class="panel-title">Nossa História</h3>
													    </div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull14">
											                    <@wcm.renderSlot id="SlotA14" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
											    </div>
											  </div>
											</div>    
										</div>
									    <div class="tab-pane fade" id="documentos">Documentos: Organograma/Certificações/Videos/Mapa Estratégico/Projeto e Atividades</div>
									    <div class="tab-pane fade" id="ondeEstamos">
											<div class="container-fluid">
											  <div class="row">
											    <nav class="col-sm-2">
											      <ul class="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205">
											        <div class="btn-group-vertical">
											        	<a href="#pnOnde" role="button" class="btn btn-default">Onde Estamos</a>
														<a href="#pnUnidade" role="button" class="btn btn-default">Unidades Regionais</a>
														<a href="#pnMapa" role="button" class="btn btn-default">Mapa de Atuação</a>
													</div>
											      </ul>
											    </nav>
											    <div class="col-sm-10">   
											      	<div class="panel panel-default" id="pnOnde">
													    <div class="panel-heading">Onde Estamos</div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull20">
											                    <@wcm.renderSlot id="SlotB20" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnUnidade">
													    <div class="panel-heading">
													        <h3 class="panel-title">Unidades Regionais</h3>
													    </div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull21">
											                    <@wcm.renderSlot id="SlotB21" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnMapa">
													    <div class="panel-heading">Mapa de Atuação</div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull22">
											                    <@wcm.renderSlot id="SlotB22" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
											    </div>
											  </div>
											</div>
								<!-- 	    Estará: Onde Estamos/Unidades Regionais/Mapa de Atuação -->
									    </div>
									    <div class="tab-pane fade" id="diretoriaConselho">
									    	<div class="container-fluid">
											  <div class="row">
											    <nav class="col-sm-2">
											      <ul class="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205">
											        <div class="btn-group-vertical">
														<a href="#pnDiretoria" role="button" class="btn btn-default">Diretoria Executiva</a>
														<a href="#pnUnidades" role="button" class="btn btn-default">Conselho Deliberativo</a>
													</div>
											      </ul>
											    </nav>
											    <div class="col-sm-10">   
											      	<div class="panel panel-default" id="pnDiretoria">
													    <div class="panel-heading">Diretoria Executiva</div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull30">
											                    <@wcm.renderSlot id="SlotC30" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
													<div class="panel panel-default" id="pnUnidade">
													    <div class="panel-heading">
													        <h3 class="panel-title">Conselho Deliberativo</h3>
													    </div>
													    <div class="panel-body">
													        <div class="editable-slot slotfull layout-1-1" id="slotFull31">
											                    <@wcm.renderSlot id="SlotC31" editableSlot="true" decorator="true"/>
											                </div>
													    </div>
													</div>
											    </div>
											  </div>
								<!-- 	    Estará: Diretoria Executiva/Conselho Deliberativo -->
									    </div>
									</div>
									
										<script type="text/javascript">
										    $('#myTab a').click(function (e) {
											  e.preventDefault()
											  $(this).tab('show')
											})
										</script>
									</div>
									<!--tabcontat -->
                				</div>
               				</div>
           				</div>
        			</div>
       			</div>

                <!-- Slot 3 -->
                <div class="editable-slot slotfull layout-1-1" id="slotFull3">
                    <@wcm.renderSlot id="SlotC" editableSlot="true" decorator="true"/>
                </div>

            </div>

<!--             <@wcm.footer layoutuserlabel="wcm.layoutdefault.user" /> -->
		</div>
	</div>
</div>
