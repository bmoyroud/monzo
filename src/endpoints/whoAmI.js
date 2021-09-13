module.exports = (client) => {
  return () => client.get("/ping/whoami");
};
