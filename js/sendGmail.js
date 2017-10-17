var clientId = '417931309764-8lbup3osb6nlvf4hnq1rlqrvafo81uqj.apps.googleusercontent.com';
var apiKey = 'AIzaSyBIhTJxSG6Pg5T71hKxkmqZuw3TqTpstzk';
var scopes =
'https://www.googleapis.com/auth/gmail.readonly '+
'https://www.googleapis.com/auth/gmail.send';


function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}
function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}
function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}
function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
        loadGmailApi();
    } else {
        // $('#authorize-button').removeClass("hidden");
        // $('#authorize-button').on('click', function(){
        // handleAuthClick();
        // });
    }
}
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', displayInbox);
}

function sendEmail(e)
{
    alert('clicked');
    handleClientLoad();
    $('#send-button').addClass('disabled');
    sendMessage(
    {
      'To': 'bjornedwin@gmail.com',
      'Subject': 'qw-test-email'
    },
   'this is a test email for website',
    formTidy
  );
  alert('end of sendEmail');
  return false;
}

function sendMessage(headers_obj, message, callback)
{
    var email = '';
    alert('inside send message');
    for(var header in headers_obj)
        email += header += ": "+headers_obj[header]+"\r\n";

        email += "\r\n" + message;

        var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'bjornedwin',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });

  return sendRequest.execute(callback);
  alert('end of send message');
}

function formTidy()
{
    alert('wait');
    console.log('inside compose tidy');
    // $('#send-button').removeClass('disabled');
}