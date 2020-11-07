import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {GalieloConfirmCodeConfig} from '../../../models';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'gll-confirm-code',
  templateUrl: './galileo-confirm-code.component.html',
  styleUrls: ['./galileo-confirm-code.component.scss']
})
export class GalileoConfirmCodeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gllConfirmCodeContainer') gllConfirmCodeContainer: ElementRef;
  @Input() config: GalieloConfirmCodeConfig = {length: 4};
  @Output() confirmCodeFormChange:
    EventEmitter<{ value: string, complete: boolean }> = new EventEmitter<{ value: string, complete: boolean }>();
  public confirmCodeFormGroup: FormGroup;

  private formSubject: Subject<{ value: string, complete: boolean }> = new Subject<{ value: string, complete: boolean }>();
  private destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit() {
    this.confirmCodeFormGroup = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.confirmCodeFormGroup.addControl(this.getControlName(index), new FormControl());
    }

    this.formSubject.pipe(debounceTime(100), takeUntil(this.destroy$)).subscribe(t => {
      this.confirmCodeFormChange.emit(t);
    });
  }

  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      if (this.gllConfirmCodeContainer) {
        this.gllConfirmCodeContainer.nativeElement.addEventListener('paste', (evt) => this.handlePaste(evt));
        const el: any = this.gllConfirmCodeContainer.nativeElement.getElementsByClassName('code-input')[0];
        if (el && el.focus) {
          el.focus();
        }
      }
    }
  }

  private getControlName(idx) {
    return `ctrl_${idx}`;
  }

  ifLeftArrow(event) {
    return this.ifKeyCode(event, 37);
  }


  ifRightArrow(event) {
    return this.ifKeyCode(event, 39);
  }

  ifBackspaceOrDelete(event) {
    return (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      this.ifKeyCode(event, 8) ||
      this.ifKeyCode(event, 46)
    );
  }

  ifKeyCode(event, targetCode) {
    const key = event.keyCode || event.charCode;
    return key === targetCode;
  }

  onKeyDown($event) {
    const isSpace = this.ifKeyCode($event, 32);
    if (isSpace) {
      return false;
    }
  }

  onKeyUp($event, inputIdx) {
    const nextInputId = `code_${inputIdx + 1}`;
    const prevInputId = `code_${inputIdx - 1}`;
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }


  setSelected(eleId) {
    this.focusTo(eleId);
    const el: any = document.getElementById(eleId);
    if (el && el.setSelectionRange) {
      setTimeout(() => {
        el.setSelectionRange(0, 1);
      }, 0);
    }
  }

  ifValidEntry(event) {
    const inp = String.fromCharCode(event.keyCode);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (this.config.allowKeyCodes && this.config.allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  focusTo(eleId) {
    const el: any = document.getElementById(eleId);
    if (el) {
      el.focus();
    }
  }

  setInputValue(value: any) {
    this.confirmCodeFormGroup.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.confirmCodeFormGroup.get(this.getControlName(idx))) {
        this.confirmCodeFormGroup.get(this.getControlName(idx)).setValue(c);
      }
    });
    if (!this.config.disableAutoFocus) {
      const indexOfElementToFocus = value.length < this.config.length ? value.length : (this.config.length - 1);
      const el: any = this.gllConfirmCodeContainer.nativeElement.getElementsByClassName('code-input')[indexOfElementToFocus];
      if (el && el.focus) {
        el.focus();
      }
    }
    this.rebuildValue();
  }


  rebuildValue() {
    let value = '';
    Object.keys(this.confirmCodeFormGroup.controls).forEach(k => {
      if (this.confirmCodeFormGroup.controls[k].value) {
        value += this.confirmCodeFormGroup.controls[k].value;
      }
    });
    this.formSubject.next({value, complete: value.length === this.config.length});
  }


  handlePaste(e) {
    // @ts-ignore
    const clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = null;
    if (clipboardData) {
      pastedData = clipboardData.getData('Text');
    }
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    this.setInputValue(pastedData);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
