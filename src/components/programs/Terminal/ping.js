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

const ping = (setPromptEnabled, print, words) => {
  const ip = randomIp();
  if (!words[1]) return print("Specify ping destination!");
  setPromptEnabled(false);
  let pings = -1;
  print("PING " + words[1] + " (" + ip + "): 56 data bytes");
  const ping = setInterval(() => {
    pings = pings + 1;
    if (pings < 6)
      return print(
        "64 bytes from " +
          ip +
          ": icmp_seq=" +
          pings +
          " ttl=119 time=" +
          Math.round(Math.random() * 10000) / 100 +
          " ms"
      );
    clearInterval(ping);
    print("5 packets transmitted, 5 packets received, 0.0% packet loss");
    setPromptEnabled(true);
  }, 800);

  return;
};

export default ping;
