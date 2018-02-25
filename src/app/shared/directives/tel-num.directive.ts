import {Directive, Input, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[telnum]'
})
export class TelNumDirective {
  constructor(el: ElementRef) {
    //el.nativeElement.style.backgroundColor = 'green';
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(e: KeyboardEvent): boolean {
    if (e.which == 65)
      return false;
    else
      return true
  }
} 