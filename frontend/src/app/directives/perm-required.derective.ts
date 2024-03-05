import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessCheckerService } from '../services/access_checker/access-checker.service';

@Directive({
  selector: '[requiredPerms]',
})
export class PermRequiredDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private accessChecker: AccessCheckerService
  ) {}

  private destroy$ = new Subject<void>();
  private hasView = false;

  @Input() set requiredPerms(permissions: string[]) {
    this.accessChecker
      .hasPerm(permissions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((can: boolean) => {
        if (can && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!can && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
