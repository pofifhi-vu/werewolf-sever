
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('Một người chơi đã kết nối');
  
  ws.on('message', function incoming(message) {
    console.log('Nhận:', message.toString());
    // Phát lại tin nhắn cho tất cả client khác
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.send('Chào mừng đến Ma Sói Server!');
});

console.log(`Server chạy trên cổng ${PORT}`);
