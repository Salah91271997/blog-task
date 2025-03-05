import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private messageService: MessageService) {}

  private show(config: {
    severity: string;
    summary: string;
    detail: string;
    life?: number;
    sticky?: boolean;
  }): void {
    this.messageService.add({
      severity: config.severity,
      summary: config.summary,
      detail: config.detail,
      life: config.life || 3000,
      sticky: config.sticky || false,
    });
  }

  showSuccess(detail: string, summary: string = 'Success'): void {
    this.show({ severity: 'success', summary, detail });
  }

  showInfo(detail: string, summary: string = 'Information'): void {
    this.show({ severity: 'info', summary, detail });
  }

  showWarning(detail: string, summary: string = 'Warning'): void {
    this.show({ severity: 'warn', summary, detail });
  }

  showError(detail: string, summary: string = 'Error'): void {
    this.show({ severity: 'error', summary, detail });
  }

  clearAll(): void {
    this.messageService.clear();
  }
}
