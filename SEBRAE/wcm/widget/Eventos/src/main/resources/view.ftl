<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
	 data-params="HelloWorld.instance({message: 'Hello world'})">
	<style>
		.fluig-style-guide .panel-default>.panel-heading {
			color: #FFF !important;
			background-color: #0080ff!important;
			border-color: #0080ff!important;
		}


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
	<div class="fluig-style-guide">
		<div class="container-fluid">
			<div class="row">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Dados do Contato</h3>
					</div>
					<div class="panel-body">
						<div class="form-group col-md-6">
							<label for="nomeEvento">Nome do Evento</label>
							<input type="text" class="form-control" id="nomeEvento" name="nomeEvento" placeholder="Favor informar o nome do evento.">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
	<link rel="stylesheet" type="text/css" href="/portal/resources/css/fluig-style-guide-filter.min.css">
	<script src="/portal/resources/js/fluig-style-guide-filter.min.js"></script>
	<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArJDvUGpUZ0oO_7aKcfiYwdEMS_rigxRc&libraries=places&callback=initAutocomplete" async defer></script>
	<script>
        function initAutocomplete() {
            // $.ajax({
            //     url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAdqvu1A54w8hW1KQriE6Li38bLG5AET88&input=Paris&types=geocode",
            //     type: "GET",
            //     dataType: 'jsonp',
            //     cache: false
            // }).done(function( data ) {
            //     if ( console && console.log ) {
            //         console.log( "Sample of data:", data.slice( 0, 100 ) );
            //     }
            // });
		alert('test');
            // $.ajax({
            //     url:"https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyBTJSJx5RHWfAOsZnpHVn2gONfACdSxHno&callback=initMap",
            //     dataType: 'jsonp',
            //     type: 'GET',
            //     success:function(data){
            //         alert(JSON.stringify(data));
            //     },
            //     error:function(data){
            //         alert(JSON.stringify(data));
            //     }
            // });
        }
	</script>
</div>
