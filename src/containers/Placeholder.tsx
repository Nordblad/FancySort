import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export namespace Placeholder {
  export interface Props {
    // id: number,
    // index: number,
    // parentId?: number,
    // pageNo?: number,
    // type: 'item' | 'group' | 'layout'
  }

  export interface State {
    /* empty */
  }
}

export default class Placeholder extends React.Component<Placeholder.Props, Placeholder.State> {
  render() {
    // const { id, children, type, pageNo, parentId, index } = this.props;
    return (
      <div className="Placeholder" style={{ backgroundColor: '#F5F5F5', border: '1px dashed darkslategray' }}>
        DROP STUFF HERE
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
