import MyComputer from "./MyComputer";
import Terminal from "./Terminal";
import Skracacz from "./Skracacz";
import FreeBtc from "./FreeBtc";
import Author from "./Author";
import Chat from "./Chat";

import myComputerIcon from "../../icons/computer.png";
import terminalIcon from "../../icons/terminal.png";
import skracaczIcon from "../../icons/shortcut.png";
import chatIcon from "../../icons/chat.png";
import btcIcon from "../../icons/btc.png";
import authorIcon from "../../icons/author.png";

const programs = [
  {
    id: 10,
    name: "Mój komputer",
    icon: myComputerIcon,
    component: MyComputer,
    width: 400,
    height: 100,
    minWidth: 400,
    minHeight: 100,
    allowMultipleInstances: true,
  },
  {
    id: 13,
    name: "Terminal",
    icon: terminalIcon,
    component: Terminal,
    width: 600,
    height: 300,
    minWidth: 540,
    minHeight: 200,
    allowMultipleInstances: true,
  },
  {
    id: 15,
    name: "Skracacz linków",
    icon: skracaczIcon,
    component: Skracacz,
    width: 800,
    height: 470,
    minWidth: 480,
    minHeight: 270,
    allowMultipleInstances: false,
  },
  {
    id: 20,
    name: "Czat",
    icon: chatIcon,
    component: Chat,
    width: 960,
    height: 540,
    allowMultipleInstances: true,
  },
  {
    id: 30,
    name: "Darmowe Bitkojny",
    icon: btcIcon,
    component: FreeBtc,
    width: 960,
    height: 540,
    allowMultipleInstances: true,
  },
  {
    id: 40,
    name: "Strona autora",
    icon: authorIcon,
    component: Author,
    width: 960,
    height: 540,
    allowMultipleInstances: false,
  },
];

export default programs;
