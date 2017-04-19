const expect = require('chai').expect,
      io     = require('socket.io-client'),
      app = require('../test-server/index');

const socketUrl = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

const room = 'lobby'; //using a dummy room

describe('Sockets',  ()=> {
  let client1, client2, client3;

  // testing goodness goes here
  it('should send and receive a message', (done)=> {
    // Set up client1 connection
    client1 = io.connect(socketUrl, options);

    // Set up event listener.  This is the actual test we're running
    client1.on('message', (msg)=>{
      expect(msg).to.equal('test');

      // Disconnect both client connections
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on('connect', () => {
      client1.emit('join room', room);

      // Set up client2 connection
      client2 = io.connect(socketUrl, options);

      client2.on('connect', () =>{

        // Emit event when all clients are connected.
        client2.emit('join room', room);
        client2.emit('message', 'test');
      });

    });
  });

  it('should send and receive a message only to users in the same room', (done) =>{
    client2CallCount = 0;
    client3CallCount = 0;

    client1 = io.connect(socketUrl, options);

    client1.on('connect', () =>{
      client1.emit('join room', room);

      client2 = io.connect(socketUrl, options);
      client2.emit('join room', room);

      client2.on('connect', () =>{

        client3 = io.connect(socketUrl, options);
        client3.emit('join room', 'test');

        client3.on('connect', () =>{
          client1.emit('message', 'test');
        });

        client3.on('message', () => {
          client3CallCount++;
        });
      });

      client2.on('message', ()=> {
        client2CallCount++;
      });
    });

    setTimeout(() =>{
      expect(client2CallCount).to.equal(1);
      expect(client3CallCount).to.equal(0);
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    }, 25);
  });
});
