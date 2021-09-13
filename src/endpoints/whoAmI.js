module.exports = (client) => {
  return () => client.get("/ping/whoami").then((response) => response.data);
};
