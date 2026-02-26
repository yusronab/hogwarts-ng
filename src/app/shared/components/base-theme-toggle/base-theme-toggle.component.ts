import { Component, effect, signal } from '@angular/core';
import { LucideAngularModule, MoonIcon, SunIcon } from 'lucide-angular';

@Component({
  selector: 'app-base-theme-toggle',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './base-theme-toggle.component.html',
  styleUrl: './base-theme-toggle.component.css',
})
export class BaseThemeToggleComponent {
  readonly MoonIcon = MoonIcon;
  readonly SunIcon = SunIcon;

  theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;

    if (saved) {
      this.setTheme(saved);
    } else {
      // detect system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    effect(() => {
      localStorage.setItem('theme', this.theme());
    });
  }

  toggle() {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private setTheme(mode: 'light' | 'dark') {
    this.theme.set(mode);

    const html = document.documentElement;

    if (mode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
