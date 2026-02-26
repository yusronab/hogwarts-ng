import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
import { BaseAvatarComponent } from '../../components/base-avatar/base-avatar.component';
import { AuthBootstrapService } from '../../../core/services/auth-bootstrap.service';
import { BaseThemeToggleComponent } from '../../components/base-theme-toggle/base-theme-toggle.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../features/auth/state/auth.selectors';

@Component({
  selector: 'app-layout-siswa',
  standalone: true,
  imports: [
    RouterOutlet,
    BaseThemeToggleComponent,
    RouterLink,
    BaseAvatarComponent,
  ],
  templateUrl: './layout-siswa.component.html',
  styleUrl: './layout-siswa.component.css',
})
export class LayoutSiswaComponent {
  private alert = inject(AlertService);
  private router = inject(Router);
  private bootstrap = inject(AuthBootstrapService);
  private store = inject(Store);
  private el = inject(ElementRef);

  open = false;

  readonly user = this.store.selectSignal(selectUser);

  constructor() {
    this.bootstrap.refreshProfile();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  onLogout() {
    this.alert.confirm({
      title: 'Konfirmasi',
      description: 'Apakah kamu yakin keluar dari akun ini?',
      textPositive: 'Yakin',
      onConfirm: () => {
        localStorage.removeItem('hw_token');
        localStorage.removeItem('hw_user');
        this.router.navigate(['/login'], { replaceUrl: true });
      },
    });
  }

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this.open = !this.open;
  }
}
