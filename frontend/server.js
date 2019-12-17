var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '65084',
  key: '7afc0d0c81a8443b3933',
  secret: '44185a799c4ca5a1258c',
  cluster: 'mt1',
  useTLS: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
