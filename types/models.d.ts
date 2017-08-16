/** TodoMVC model definitions **/

declare interface TodoItemData {
  id?: TodoItemId;
  text?: string;
  completed?: boolean;
}

declare type TodoItemId = number;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type TodoStoreState = TodoItemData[];

// ===

declare interface RootState {
  todos: TodoStoreState,
  reglineItems: ReglineItemState,
  pages: PageState
}

// ===

declare interface ReglineItemModel {
  id: number,
  type: string,
  childIds: number[]
}

declare interface ReglineItemState {
  [id: number]: ReglineItemModel
}

declare interface PageModel {
  id: number,
  children: number[]
}

declare type PageState = PageModel[]