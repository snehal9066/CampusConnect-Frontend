import { io } from 'socket.io-client';

// Create a singleton socket instance that can be imported anywhere
// URL points to the backend server (adjust if deployed)
const socket = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;
