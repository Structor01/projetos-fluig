var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        initClient();
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    }
});


var GoogleAuth; // Google Auth object.
function initClient() {
    gapi.client.init({
        // 'apiKey': 'AIzaSyAO6jV7GnpsTDage-I73SfKBr_uM5JpE2s',
        'clientId': '495696357922-bmr7f91euvdengak62mh6segkcr2ha46.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/analytics.readonly',
        // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
    });
}

var isAuthorized;
var currentApiRequest;

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
function sendAuthorizedApiRequest(requestDetails) {
    currentApiRequest = requestDetails;
    if (isAuthorized) {
        // Make API request
        // gapi.client.request(requestDetails)

        // Reset currentApiRequest variable.
        currentApiRequest = {};
    } else {
        GoogleAuth.signIn();
    }
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        isAuthorized = true;
        if (currentApiRequest) {
            sendAuthorizedApiRequest(currentApiRequest);
        }
    } else {
        isAuthorized = false;
    }
}

// Example 2: Use gapi.client.request(args) function
var request = gapi.client.request({
    'method': 'GET',
    'path': '/drive/v3/about',
    'params': {'fields': 'user'}
});
// Execute the API request.
request.execute(function(response) {
    console.log(response);
});

var VIEW_ID = '132972049';
function queryReports() {
    gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
            reportRequests: [
                {
                    viewId: VIEW_ID,
                    dateRanges: [
                        {
                            startDate: '7daysAgo',
                            endDate: 'today'
                        }
                    ],
                    metrics: [
                        {
                            expression: 'ga:sessions'
                        }
                    ]
                }
            ]
        }
    }).then(displayResults, console.error.bind(console));
}

function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
}