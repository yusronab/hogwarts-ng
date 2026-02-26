import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-base-chip-status',
  standalone: true,
  imports: [],
  templateUrl: './base-chip-status.component.html',
  styleUrl: './base-chip-status.component.css',
})
export class BaseChipStatusComponent {
  status = input<string>('');

  private readonly STATUS: Record<string, string> = {
    DIBATALKAN: 'dibatalkan',
    MENUNGGU_WALI_KELAS: 'menunggu wali kelas',
    DITOLAK: 'ditolak',
    SELESAI: 'selesai',
    MENUNGGU_GURU_BK: 'menunggu guru bk',
    DIPROSES_GURU_BK: 'diproses guru bk',
    PRESENT: 'present',
    EXCUSED: 'excused',
    SICK: 'sick',
    ABSENT: 'absent',
    NULL: 'null',
    SP1: 'sp1',
    SP2: 'sp2',
    SP3: 'sp3',
    PLANNED: 'planned',
    ONGOING: 'ongoing',
    FINISHED: 'finished',
    REPORTED: 'reported',
  };

  private readonly MAPPED_STATUS: Record<string, string> = {
    DIBATALKAN: 'Dibatalkan',
    MENUNGGU_WALI_KELAS: 'Menunggu Wali Kelas',
    DITOLAK: 'Ditolak',
    SELESAI: 'Selesai',
    MENUNGGU_GURU_BK: 'Menunggu Guru BK',
    DIPROSES_GURU_BK: 'Diproses Guru BK',
    PRESENT: 'Hadir',
    EXCUSED: 'Ijin',
    SICK: 'Sakit',
    ABSENT: 'Alfa',
    NULL: 'Alfa',
    SP1: 'SP 1',
    SP2: 'SP 2',
    SP3: 'SP 3',
    PLANNED: 'Terjadwal',
    ONGOING: 'Sedang Berlangsung',
    FINISHED: 'Selesai',
    REPORTED: 'Dikirim ke BK',
  };

  readonly lowerCaseStatus = computed(() => this.status()?.toLowerCase() || '');

  readonly variant = computed(() => {
    const s = this.lowerCaseStatus();

    switch (s) {
      case this.STATUS['DIBATALKAN']:
      case this.STATUS['DITOLAK']:
      case this.STATUS['ABSENT']:
      case this.STATUS['NULL']:
        return 'danger';

      case this.STATUS['MENUNGGU_WALI_KELAS']:
        return 'primary';

      case this.STATUS['MENUNGGU_GURU_BK']:
        return 'olive';

      case this.STATUS['DIPROSES_GURU_BK']:
        return 'magenta';

      case this.STATUS['EXCUSED']:
        return 'purple';

      case this.STATUS['SICK']:
        return 'orange';

      case this.STATUS['SELESAI']:
      case this.STATUS['PRESENT']:
        return 'success';

      case this.STATUS['SP1']:
        return 'sp1';

      case this.STATUS['SP2']:
        return 'sp2';

      case this.STATUS['SP3']:
        return 'sp3';

      case this.STATUS['PLANNED']:
        return 'planned';

      case this.STATUS['ONGOING']:
        return 'ongoing';

      case this.STATUS['FINISHED']:
        return 'finished';

      case this.STATUS['REPORTED']:
        return 'reported';

      default:
        return 'default';
    }
  });

  readonly displayText = computed(() => {
    const upper = this.status()?.toUpperCase() || '';
    return this.MAPPED_STATUS[upper] || this.status();
  });
}
