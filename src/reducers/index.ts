import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import reglineItems from './reglineItems'
import pages from './pages'
import editorUi from './editorUi'

export default combineReducers<RootState>({
  todos,
  reglineItems,
  pages,
  editorUi
});
