import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import reglineItems from './reglineItems'
import pages from './pages'

export default combineReducers<RootState>({
  todos,
  reglineItems,
  pages
});
