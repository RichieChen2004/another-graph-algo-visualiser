import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './components/board/board';
import { ActionBar } from './components/action-bar/action-bar';
import { NavBar } from './components/nav-bar/nav-bar';
import { SettingsBar } from './components/settings-bar/settings-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Board, ActionBar, NavBar, SettingsBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('graph-vis');
}
