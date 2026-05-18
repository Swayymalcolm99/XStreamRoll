export const createStreamSocket = (url: string): WebSocket => {
  return new WebSocket(url);
};