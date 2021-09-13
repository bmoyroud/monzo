module.exports = (client) =>
  client.get("/ping/whoami").then((response) => response.data);
