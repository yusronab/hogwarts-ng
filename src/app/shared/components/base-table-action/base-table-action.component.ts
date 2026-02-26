import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Plus, Pencil, Eye, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-base-table-action',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './base-table-action.component.html',
  styleUrl: './base-table-action.component.css',
})
export class BaseTableActionComponent {
  useCreateButton = input(false);
  useUpdateButton = input(false);
  useDetailButton = input(false);
  useDeleteButton = input(false);

  createClick = output<void>();
  updateClick = output<void>();
  detailClick = output<void>();
  deleteClick = output<void>();

  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Eye = Eye;
  readonly Trash2 = Trash2;
}
