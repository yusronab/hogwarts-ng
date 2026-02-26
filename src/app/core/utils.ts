import { FormGroup } from '@angular/forms';

export function isCurrentMeeting(start: string, end: string) {
  const now = new Date();

  const [startH, startM] = start.split(':');
  const [endH, endM] = end.split(':');

  const startTime = new Date();
  startTime.setHours(Number(startH), Number(startM), 0);

  const endTime = new Date();
  endTime.setHours(Number(endH), Number(endM), 0);

  return now >= startTime && now <= endTime;
}

export function buildExpiredAt(date?: string, hourEnd?: string) {
  if (!date || !hourEnd) return null;

  // format: 2026-02-16 17:00:00
  const combined = `${date}T${hourEnd}`;
  return new Date(combined);
}

export function formatDate(dateString: string | null) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export function formatDateTime(dateString: string | null) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  return `${datePart} - ${timePart}`;
}

export function isInvalid(form: FormGroup, controlName: string): boolean {
  const control = form.get(controlName);
  return !!(control && control.touched && control.invalid);
}

export function getErrorMessage(form: FormGroup, controlName: string): string {
  const control = form.get(controlName);
  if (!control || !control.touched) return '';

  if (control.errors?.['required']) {
    return 'Field ini wajib diisi';
  }

  if (control.errors?.['email']) {
    return 'Format email tidak valid';
  }

  if (control.errors?.['minlength']) {
    return `Minimal ${control.errors['minlength'].requiredLength} karakter`;
  }

  return '';
}
