import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ReglineItemList from './ReglineItemList'

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        // todos: TodoItemData[];
        // actions: typeof TodoActions;
    }

    export interface State {
        /* empty */
    }
}

// @connect(mapStateToProps, mapDispatchToProps)
export class Sort extends React.Component<App.Props, App.State> {

    render() {
        const { children } = this.props;
        return (
            <div className="container">
                <h1>Drag and drop</h1>
                <div>
                    <ReglineItemList pageNo={0} />
                </div>
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
