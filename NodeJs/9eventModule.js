const event = require('events')
let ev =new event.EventEmitter();
ev.on('myEvent',(data)=>{//you can create ev.once to call event once and ev.of to unregister the event
    console.log(data);
})
ev.emit('myEvent', 'call emit method to file myEvent')