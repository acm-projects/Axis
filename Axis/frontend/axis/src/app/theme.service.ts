import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isLight = new BehaviorSubject<boolean>(false);
  readonly isLight$ = this._isLight.asObservable();

  setLightMode(isLight: boolean) {
    this._isLight.next(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  toggle() {
    const next = !this._isLight.getValue();
    this.setLightMode(next);
  }

  loadInitial() {
    const saved = localStorage.getItem('theme');
    this._isLight.next(saved === 'light');
  }
}
