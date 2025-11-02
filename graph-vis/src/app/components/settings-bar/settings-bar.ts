import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings-bar',
  standalone: true,
  templateUrl: './settings-bar.html',
  styleUrl: './settings-bar.scss',
})
export class SettingsBar {
  isDarkMode = false;

  toggleDarkMode() {

    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      console.log('Dark mode enabled');
    } else {
      document.body.classList.remove('dark-mode');
      console.log('Dark mode disabled');
    }
  }

}
