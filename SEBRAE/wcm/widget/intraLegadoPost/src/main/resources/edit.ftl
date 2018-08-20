<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide">
    <#assign context = context!"contextAll">
    <#assign orderType = orderType!"LAST_UPDATE">
    <#assign permissionOrder = permissionOrder!"false">
    <#assign quantityPublication = quantityPublication!20>
    <#assign continueScroll = continueScroll!"true">
    <#assign enableScroll = enableScroll!"true">

    <#assign params = '{instanceId: ${instanceId?c}, pageCode: "${pageCode!""}", context: "${context!}", aliasPage: "${aliasPage!""}", community: "${community!}", orderType: "${orderType!}", permissionOrder: ${permissionOrder!}, quantityPublication: "${quantityPublication!}", continueScroll: ${continueScroll!}}'?html/>

    <div id="socialtimelineedit_${instanceId?c}" class="wcm-widget-class super-widget fluig-style-guide"	data-params="SocialTimelineEdit.instance(${params})">
        <div class="panel panel-default">
            <div class="panel-body">
                <form role="form" name="editTimelineForm" data-form-edit>
                    <fieldset>
                        <legend>${i18n.getTranslation('context')}</legend>
                        <div class="form-group">
                            <label class="radio-inline">
                                <input type="radio" name="context" value="contextAll" data-context>
                                ${i18n.getTranslation('all')}
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="context" value="contextCommunity" data-context>
                                ${i18n.getTranslation('community')}
                            </label>
                            <div data-community-details>
                                <label>${i18n.getTranslation('selected.community')}: <small></small></label>
                                <input type="text" class="form-control ui-autocomplete-input" placeholder="${i18n.getTranslation('enter.community')}" data-search-community>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>${i18n.getTranslation('ordenation')}</legend>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="quantityPublication">${i18n.getTranslation('options.ordenation')}</label>
                                    <select class="form-control" name="quantityPublication" data-order-type>
                                        <option value="CREATION_DATE">${i18n.getTranslation('last.publications')}</option>
                                        <option value="LAST_UPDATE">${i18n.getTranslation('recently.publication')}</option>
                                        <option value="MORE_LIKE">${i18n.getTranslation('more.like')}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="" data-permission-order>
                                    ${i18n.getTranslation('alter.order.user')}
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>${i18n.getTranslation('pagination')}</legend>
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="" data-continue-scroll>
                                    ${i18n.getTranslation('continue.scroll')}
                                </label>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="quantityPublication">${i18n.getTranslation('quantity.publication')}</label>
                                    <select class="form-control" name="quantityPublication" data-quantity-publication>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="pull-right">
                        <button type="button" class="btn btn-primary" data-loading-text="Loading..." data-save-timeline-configuration>${i18n.getTranslation('save')}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
