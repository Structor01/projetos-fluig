<#attempt>

<#--<form class="form-system social-share">
	<input type="hidden" id="idSociable" data-sociable-id = ${sociableId} />
	<p class="form-row">
		<label for="label-share-to">${i18n.getTranslation('confirm.message.denounce')}</label>
	</p>
	<p class="form-row">
		<textarea id="label-denounce-message" class="field-message"></textarea>
	</p>
	<input id="denounce-post" data-denounce-post class="btn btn-action fr" type="submit" id="inpt-submit" value="${i18n.getTranslation('denounce')}">
</form>-->



<div id="denounceModal" class="denounce-modal">
	<form class="totvs-form">
		<input type="hidden" id="idSociable" data-sociable-id="${sociableId}" />
		<label for="label-denounce-message">${i18n.getTranslation('describe.report.abuse.reason')}</label>
		<textarea id="label-denounce-message" class="textarea-report-abuse"></textarea>
		<small class="text-help color-required">${i18n.getTranslation('reason.minimum.length')}</small>
	</form>
	<button id="inpt-submit" class="totvs-btn-action fr" data-denounce-post>${i18n.getTranslation('report.abuse')}</button>
</div>

<#recover>
	<#include "/social_error.ftl">
</#attempt>