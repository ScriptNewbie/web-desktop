const asciiart = `
                               jack@zettawhit.com
         ,----,                _______________________
       .'   .\`|        .---.
    .'   .'   ;       /. ./|   OS: Zettawhit 12.7 arch RISC-V
  ,---, '    .'   .--'.  ' ;   Host: zettawhit
  |   :     ./   /__./ \\ : |   Kernel: 16.18
  ;   | .'  /.--'.  '   \\' .   Uptime: 10days, 23 hours, 39 mins
  \`---' /  ;/___/ \\ |    ' '   Shell: zsh
    /  ;  / ;   \\  \\;      :   Resolution: 1920x1080
   ;  /  /--,\\   ;  \`      |
  /  /  / .\`| .   \\    .\\  ;
./__;       :  \\   \\   ' \\ |
|   :     .'    :   '  |--"
;   |  .'        \\   \\ ;
\`---'             '---"
`;

const neofetch = (setBashHistory) => {
  setBashHistory((bashHistory) => [...bashHistory, <pre>{asciiart}</pre>]);
};

export default neofetch;
