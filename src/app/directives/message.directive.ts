import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective {

  @Input("appMessage") description: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') mouseEntro(){
    this.seeDescription(this.description);
  }

  @HostListener('mouseleave') mouseSale(){
    this.seeDescription();
  }

  private seeDescription(description?: string ){
    let tag = '';
    if (description){
      if (this.elementRef.nativeElement.childNodes.length === 1){
        tag = `${this.elementRef.nativeElement.innerHTML}<small>${description}</small>`;
        this.elementRef.nativeElement.innerHTML = tag;
        this.elementRef.nativeElement.style.backgroundColor = '#343a40';
        this.elementRef.nativeElement.style.color = 'red';
      }
    }
    else{
      if (this.elementRef.nativeElement.childNodes.length > 1){
        tag = this.elementRef.nativeElement.childNodes[0].outerHTML;
        this.elementRef.nativeElement.innerHTML = tag;
        this.elementRef.nativeElement.style.backgroundColor = null;
      }
    }
  }

}
