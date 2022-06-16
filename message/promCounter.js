module.exports = (nameValue = "stream", helpValue = "stream") => {   
  const client = require("prom-client")
  
  const Counter = client.Counter;
  const counter = new Counter({
    name:nameValue,
    help:helpValue,
    labelNames: ["code"],
  });
  return counter
}
