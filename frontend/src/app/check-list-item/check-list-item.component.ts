import { Component, Input } from '@angular/core';
import { CheckListService } from '../services/check-list.service';

@Component({
  selector: 'app-check-list-item',
  templateUrl: './check-list-item.component.html',
  styleUrls: ['./check-list-item.component.sass'],
})
export class CheckListItemComponent {
  @Input('checkListItem') checkListItem: any;
  constructor(private checkListService: CheckListService) {}
  public updateCheckList = () => {
    if (!this.checkListItem.isFront) {
      return this.checkListService.updateBackEndCheckList({
        ...this.checkListItem,
        isCompleted: !this.checkListItem.isCompleted,
      });
    }
    return this.checkListService.updateFrontEndCheckList({
      ...this.checkListItem,
      isCompleted: !this.checkListItem.isCompleted,
    });
  };
}
