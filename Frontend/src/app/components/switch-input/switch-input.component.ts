import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css'],
})
export class SwitchInputComponent implements OnInit {
  @Input() label!: string;
  @Input() info!: string;
  @Input() isSwitched: boolean;

  constructor() {
    this.isSwitched = false;
  }

  ngOnInit(): void {}
}
