import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { SharedService } from 'src/app/services/shared.service';
import { IAsset } from '../../Forms/Models/iasset';
import { IAssetTransaction } from '../../Forms/Models/iasset-transaction';
import { IVendor } from '../../Forms/Models/ivendor';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @Input() public param = '';
  @Input() public aList: IAsset[] = [];
  @Input() public vList: IVendor[] = [];
  @Input() public aFlag: boolean = false;
  @Input() public vFlag: boolean = false;
  list: any[] = [];
  type: string = 'assets';
  constructor(
    private sharedService: SharedService,
    private appService: ApplicationService,
    private activeModel: NgbActiveModal,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.param);
    if (this.aFlag) {
      from(this.aList)
        .pipe(filter((a) => a.tyape === this.param))
        .subscribe((result: IAsset) => {
          this.list.push(result);
        });
    }
    if (this.vFlag) {
      from(this.vList)
        .pipe(filter((v) => v.name === this.param))
        .subscribe((vId) => {
          console.log(vId.id);
          from(this.aList)
            .pipe(filter((a) => a.vendorId === Number(vId.id)))
            .subscribe((res) => {
              console.log('in subscribe');
              this.list.push(res);
            });
        });
    }
  }

  closePopUp() {
    this.activeModel.close();
  }
}
