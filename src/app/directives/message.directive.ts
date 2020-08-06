import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective {

  @Input("appMessage") title: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') mouseEntro(){
    this.seeDescription(this.title);
  }

  @HostListener('mouseleave') mouseSale(){
    this.seeDescription(null);
  }

  private seeDescription(title: string ){
    if (title){
      if (this.elementRef.nativeElement.childNodes[0].currentSrc.includes('assets/img/noimage.png')){
        let innerHTML = this.elementRef.nativeElement.childNodes[1].innerHTML;
        if (!innerHTML.includes('Titulo')){
          innerHTML = `Titulo: ${title} - ${innerHTML}`;
          this.elementRef.nativeElement.childNodes[1].innerHTML = innerHTML;
        }
      }
    }
    this.elementRef.nativeElement.style.backgroundColor = title ? '#343a40' : title;
    this.elementRef.nativeElement.childNodes[1].style.color = title ? 'red' : title;
    this.elementRef.nativeElement.childNodes[1].lastChild.style.color = title ? 'goldenrod' : title;
  }

}
