import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'gll-file-upload',
  template: `
    <div class="file-drop-area">
      <span class="fake-btn">{{'chooseFile' | galileoTranslate | async}}</span>
      <span class="file-msg">{{file ? file.name : 'orDragAndDrop' | galileoTranslate | async }}</span>
      <input (change)="onChangeFile($event)" class="file-input" type="file">
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ],
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements ControlValueAccessor {

  public onChange: any = Function.prototype;

  public onTouched: any = Function.prototype;

  public file = null;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.file = obj;
    }
  }

  onChangeFile($event: any) {
    const t: FileList = $event.target.files;
    if (t.length > 0) {
      this.file = t.item(0);
      this.onChange(this.file);
    }
  }

}
