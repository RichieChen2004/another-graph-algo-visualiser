import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './components/board/board';
import { ActionBar } from './components/action-bar/action-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Board, ActionBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('graph-vis');
}
