export interface Pageable<T> {
  content: T[];
  pageable: Page
  totalElements: number;
}
interface Page{

  size: number;
  number: number;
  totalPages:number
}
