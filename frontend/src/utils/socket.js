import { io } from 'socket.io-client';
const socket = io('http://localhost:5001/', {
  withCredentials: true,
});

socket.on('reconnect_attempt', () => {
  console.log('Reconnecting...');
});

socket.on('reconnect', () => {
  console.log('Reconnected successfully');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

export default socket;