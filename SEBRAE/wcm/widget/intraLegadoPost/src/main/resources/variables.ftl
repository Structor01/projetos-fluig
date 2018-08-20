<#assign alias = community!aliasPage>
<#assign style = style!"default">
<#assign limit = quantityPublication!20>
<#assign lastPostId = lastPostId!0><#t>
<#assign commentLimit = -1>
<#assign context = context!"contextAll">
<#assign orderType = orderType!"LAST_UPDATE">
<#assign permissionOrder = permissionOrder!"false">
<#assign quantityPublication = quantityPublication!20>
<#assign continueScroll = continueScroll!"true">
<#assign enableScroll = enableScroll!"true">
<#assign socialAlias = social.alias!"">
<#assign socialName = social.name!"">
<#assign socialType = social.type!"">

<#assign params = '{alias: "${alias!""}", aliasPage: "${aliasPage!""}", community: "${community!}", context: "${context}", continueScroll: ${continueScroll}, enableScroll: ${enableScroll}, instanceId: ${instanceId?c}, limit: ${limit}, locale: "${locale}", orderType: "${orderType}", permissionOrder: ${permissionOrder}, postId: ${p2!0}, quantityPublication: "${quantityPublication}", socialAlias: "${socialAlias}", socialName: "${socialName}", socialType: "${socialType}", style: "${style!"default"}", tenantId: ${tenantId}, tenantURI: "${tenantURI}"}'?html/>
