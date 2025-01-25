import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable()
export class TablePaginatorIntl extends MatPaginatorIntl {


  constructor() {
    super();
    this.itemsPerPageLabel = 'ilość na stronę'
    this.nextPageLabel = 'Następna strona';
    this.previousPageLabel = 'Poprzednia strona';
    this.firstPageLabel = 'Pierwsza strona';
    this.lastPageLabel = 'Ostatnia strona';

    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 na ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} na ${length}`;
    }
  }

}
