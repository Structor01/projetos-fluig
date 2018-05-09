<script>
$(document).ready(function() {
	$('.panel-body').hide();

	$('.panel-heading').click(function() {
		$('.panel-body').slideToggle("fast");
	});

	$('#divSlot1').css('width', '70%');
	$('#all-slots-right').css('width', '30%');
});
</script>
<style>
#widget-body {
	position: absolute;
	z-index:1000;
	background:white;
	box-shadow: 0 6px 12px rgba(0,0,0,.175);
	border: 1px solid rgba(0,0,0,.15);
	margin: 0;
	border-radius: 4px;
	margin-top: 5px;
	float:left;
}
</style>
<div id="Links_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
data-params="Links.instance()">
<div class="row">
	<div class="col-md-12">
		<div style="float:left;" class="panel panel-primary">
			<div class="panel-heading fs-cursor-pointer">
				<h3 class="panel-title"><span class="fluigicon fluigicon-link fluigicon-sm"></span> Links <span class="caret"></span></h3>
			</div>
			<div id="widget-body" class="panel-body">
				<ul class="nav nav-pills nav-stacked">
					<li>
						<a href="http://bi.crememel.com.br:8585/qlikview">BI – Qlikview</a>
					</li>
					<li>
						<a href="https://mail.crememel.com.br">E-Mail</a>
					</li>
					<li>
						<a target="_blank" href="http://protheus.crememel.com.br:8010">Protheus</a>
					</li>
					<li>
						<a target="_blank" href="https://scm.crememel.com.br/scm/pscmb/">SCM</a>
					</li>
					<li>
						<a target="_blank" href="http://newadm.crememel.com.br/">NewADM</a>
					</li>
					<li>
						<a target="_blank" href="http://srvfly.crememel.com.br:8080/flytelecom/index.html">Srv Fly</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">FERRAMENTAS SICOM <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="http://sicom.crememel.com.br/gps">MONITOR GPS</a></li>
							<li><a href="http://sicom.crememel.com.br/sicomweb">SICOM WEB</a></li>
							<li><a href="http://sicom.crememel.com.br/4sweb">4SWEB</a></li>
						</ul>
					</li>
					<li>
						<a target="_blank" href="https://suporte.crememel.com.br/glpi">SUPORTE TI</a>
					</li>
					<li>
						<a target="_blank" href="http://192.168.145.100/webponto/">WebPonto</a>
					</li>
					<li>
						<a href="http://newacesso.crememel.com.br:8091/WebApp/Login.aspx">NewAcesso</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">NF-e <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="http://ndd.crememel.com.br/eFormseMonitor/Account/Login">Forms Monitor</a></li>
							<li><a href="http://ndd.crememel.com.br/eFormsColdweb/Account/Login">eCold Web</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
