import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  TEMP_TESTE = 2


  testGetTemp() {
    // var input: any = document.querySelector('.input-teste')
    // this.TEMP_TESTE = input.value;
    var a: any = 'a'
    this.TEMP_TESTE = a;
  }
}
