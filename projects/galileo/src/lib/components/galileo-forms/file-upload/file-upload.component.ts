import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'gll-file-upload',
  template: `
    <div class="file-drop-area d-flex flex-column justify-content-center">
      <div class="small text-center" style="font-weight: 700;">
        {{'dragFileHere' | galileoTranslate | async}}
      </div>
      <div class="text-center mt-1">
        <button class="btn btn-outline-primary btn-sm">
          {{'chooseFile' | galileoTranslate | async}}
        </button>
      </div>
      <div class="text-center text-black-50">
        <span class="file-msg">{{file ? file.name : ('maxFileSize' | galileoTranslate | async) + ': ' + maxFileSizeMb + 'mb'  }}</span>
      </div>
      <input (change)="onChangeFile($event)" class="file-input" type="file" [accept]="accept">
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

  @Input() accept: string;
  @Input() maxFileSizeMb = 5;

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
