import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export namespace ItemWrapper {
  export interface Props {
    id: number
  }

  export interface State {
    /* empty */
  }
}

export default class ItemWrapper extends React.Component<ItemWrapper.Props, ItemWrapper.State> {

  render() {
    const { id } = this.props;
    return (
      <div className="ItemWrapper" style={{ padding: 20, boxShadow: '0 0 0 1px darkslategray' }}>
        ITEM: {id}
      </div>
    );
  }
}

// function mapStateToProps(state: RootState) {
//   return {
//     todos: state.todos
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions as any, dispatch)
//   };
// }
