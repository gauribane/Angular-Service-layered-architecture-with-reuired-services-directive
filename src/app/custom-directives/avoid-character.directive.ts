import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAvoidCharacter]'
})
export class AvoidCharacterDirective {
  regexStr = '[0-9]';
  alphaNum = '[a-zA-Z0-9]'

  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
 console.log("event",event);
    if (event.key.toLowerCase() == 'e' || event.code == 'Equal' || event.code == 'Minus')
      return false;
    else if(!(new RegExp(this.regexStr).test(event.key)))  
    return false;
    else if(event.keyCode == 32)
    return false;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    return false;
  }


}
