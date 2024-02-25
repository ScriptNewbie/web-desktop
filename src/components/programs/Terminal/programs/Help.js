import Program from "./Program";

class Help extends Program {
  constructor(output, exit) {
    super();
    this.onStart = (args) => {
      output("Available commands:");
      output("   -exit\t - closes terminal");
      output("   -clear\t - clears terminal");
      output("   -ping\t - checks the connection to given host");
      output("   -node\t - runs JS code");
      output("   -neofetch\t - prints system specification");
      exit();
    };
  }
}

export default Help;
