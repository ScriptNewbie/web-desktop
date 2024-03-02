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
      output("   -cd\t\t - changes directory");
      output(
        "   -cat\t\t - concatenates files and prints on the standard output"
      );
      output("   -ls\t\t - lists directory contents");
      output("   -mkdir\t - makes directories");
      output("   -touch\t - creates files");
      exit();
    };
  }
}

export default Help;
