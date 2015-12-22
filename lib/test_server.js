var testServer = require('express')();

testServer.post('/login/oauth/access_token', function(req, res) {
  res.json({access_token: 'success'});
});
testServer.get('/user', function(req, res) {
  res.json({login: 'someguy'});
});
testServer.post('/user/repos', function(req, res) {
  res.json({msg: 'bravo', full_name: 'dummy', name: 'course', description: 'test'});
});
testServer.post('/login/oauth/access_token', function(req, res) {
  res.json({access_token: '123token'});
});
testServer.get('/user', function(req, res) {
  res.json({login: 'someguy'});
});
testServer.get('/repos/dabellator/dummy/contents/example/example.md', function(req, res) {
  res.json({content: 'I0phdmFTY3JpcHQ6IEFuIGVpZ2h0IHdlZWsgY291cnNlIG92ZXIgdGhlIE1FQU4gc3RhY2suDQoNCiMjV2VlayAxDQojIyNEYXkgMQ0KIyMjI0NvZGU6IFNpbXBsZSBUZXN0IGFuZCBNb2R1bGFyIFBhcnJlcm5zDQojIyMjI1J1YnJpYzogMTANCiMjIyNSZWFkOiBCYXNpYyBUZXN0aW5nIFdpdGggTW9jaGEvQ2hhaQ0KIyMjIyNSdWJyaWM6IDU='});
});
testServer.post('/orgs/JavaScript/repos', function(req, res) {
  res.json({name: 'name', description: 'description', url: 'url'});
});
testServer.put('/repos/dummy/contents/:path', function(req, res) {
  res.json({msg: 'received'});
});
var server = testServer.listen(5000, function() {
  console.log('ready to test');
});
module.exports = server;

