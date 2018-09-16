import { Component, OnInit } from '@angular/core';
import { platform } from "os";
import {faSquare, faWindowMinimize} from "@fortawesome/free-regular-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ElectronService} from "../../providers/electron.service";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  public osClass;
  public windowMinimize;
  public windowMaximize;
  public windowClose;

  constructor(private electron:ElectronService) {
    this.windowMinimize = faWindowMinimize;
    this.windowMaximize = faSquare;
    this.windowClose = faTimes;
  }

  ngOnInit() {
    switch (platform()) {
      case "darwin":
        this.osClass = "mac";
        break;
      default:
        this.osClass = "other";
    }
    console.log(this.osClass);
  }

  public isMac():boolean{
    return platform() === 'darwin';
  }

  public isOther():boolean{
    return !this.isMac();
  }

  public minimize():void{
    this.electron.remote.BrowserWindow.getFocusedWindow().minimize();
  }

  public maximize():void{
    this.electron.remote.BrowserWindow.getFocusedWindow().maximize();
  }

  public close():void{
    this.electron.remote.getCurrentWindow().close();
  }
}
