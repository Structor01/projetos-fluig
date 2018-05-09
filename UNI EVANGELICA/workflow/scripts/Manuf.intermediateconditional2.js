function intermediateconditional2() {


	var adminUser = "adm";
	var adminPass = "adm";
	var colleagueId = hAPI.getCardValue("cbuser")
	var companyId = 1;
	var solic = hAPI.getCardValue("nmSol");



	var NOME_SERVICO = "fluigDashBoardService";
	var CAMINHO_SERVICO = "com.totvs.technology.ecm.dm.ws.ECMDashBoardServiceService";

	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getDashBoardServicePort();
	var summaryRequests = ws.getSummaryRequests(companyId, adminUser, adminPass, colleagueId);
	var pendingRequests = summaryRequests.getNumberOfWorkflowPendingRequests();

	log.info("pendingRequests " + pendingRequests);

	if (pendingRequests > solic) {
		return true;
	}



}