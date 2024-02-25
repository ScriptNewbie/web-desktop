import Program from "./Program";

const randomOctet = () => {
  return Math.round(Math.random() * 255);
};

const randomIp = () => {
  let ip = "";
  for (let i = 0; i < 4; ++i) {
    ip = ip + randomOctet() + (i === 3 ? "" : ".");
  }
  return ip;
};

class Ping extends Program {
  constructor(output, exit) {
    super();
    this.onStart = (args) => {
      const ip = randomIp();
      if (!args[0]) {
        output("Specify ping destination!");
        return exit();
      }
      let pings = -1;
      output("PING " + args[0] + " (" + ip + "): 56 data bytes");
      const ping = setInterval(() => {
        pings = pings + 1;
        if (pings < 6)
          return output(
            "64 bytes from " +
              ip +
              ": icmp_seq=" +
              pings +
              " ttl=119 time=" +
              Math.round(Math.random() * 10000) / 100 +
              " ms"
          );
        clearInterval(ping);
        output("5 packets transmitted, 5 packets received, 0.0% packet loss");
        exit();
      }, 800);
    };
  }
}

export default Ping;
