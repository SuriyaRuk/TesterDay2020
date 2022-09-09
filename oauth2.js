export const options = {
iterations: 1000000,
vus: 1000,
duration: '60m',
teardownTimeout: '30s',
  noConnectionReuse: false,
  insecureSkipTLSVerify: true
};

export default function() {
  let name = random()
  const url = '://172.31.0.1'
  let data_create_app = JSON.stringify({
    'name': name,
    'client_id': name,
    'client_secret': name,
    'redirect_uris': ['http://127.0.0.1']
  })
  let data_get_acess_token = JSON.stringify({
    'client_id': name,
    'client_secret': name,
    'grant_type': 'client_credentials',
    'scope': 'read',
    'authenticated_userid': 'oauth2',
    'provision_key': 'IqhedHSPXt9Osxa48ouRgX18FjHEB4On'
  })

  CreateApp(url, data_create_app)
  let access_token = GetAccessToken(url, data_get_acess_token)
  CheckAccessToken(url, access_token)

}

function random() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function CreateApp(url, data) {
  const res = http.post('http' + url + '/admin/consumers/oauth2/oauth2', data, { headers: { 'Content-Type': 'application/json' } });
  /*
  console.log('request header = ' + JSON.stringify(res.request.headers))
  console.log('request body = ' + JSON.stringify(res.request.body))
  console.log('response header = ' + JSON.stringify(res.headers))
  console.log('response body = ' + JSON.stringify(res.json()))
  */
}

function GetAccessToken(url, data) {
  const res = http.post('https' + url + '/oauth2/token', data, { headers: { 'Content-Type': 'application/json' } });
  /*
  console.log('request header = ' + JSON.stringify(res.request.headers))
  console.log('request body = ' + JSON.stringify(res.request.body))
  console.log('response header = ' + JSON.stringify(res.headers))
  console.log('response body = ' + JSON.stringify(res.json()))
  */
  return res.json().access_token
}

function CheckAccessToken(url, data) {
  const res = http.get('http' + url, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data } });
  /*
  console.log('request header = ' + JSON.stringify(res.request.headers))
  console.log('request body = ' + JSON.stringify(res.request.body))
  console.log('response header = ' + JSON.stringify(res.headers))
  console.log('response body = ' + JSON.stringify(res.json()))
  */
}
