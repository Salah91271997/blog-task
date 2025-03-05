// shared/components/empty-state/empty-state.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input() title = 'No data found';
  @Input() message = 'There are no items to display at this time.';
  @Input() icon = 'pi pi-inbox';
}
