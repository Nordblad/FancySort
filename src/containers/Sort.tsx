import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ReglineItemList from './ReglineItemList'
import Drawer from './Drawer'
import MessageList from './MessageList'

// import DatePicker from 'antd/lib/date-picker';  // for js
// import 'antd/lib/date-picker/style/css'; 

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
@DragDropContext(HTML5Backend)
export class Sort extends React.Component<App.Props, App.State> {

    render() {
        const { children } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <MessageList />
                    <div className="container" style={{ maxWidth: 600, backgroundColor: 'white', margin: '20px auto' }}>
                        <h1>Drag and drop</h1>
                        <div>
                            <ReglineItemList pageNo={0} />
                        </div>
                    </div>
                </div>
                <Drawer width={300}>
                    <div style={{ backgroundColor: '#333', height: 2000 }}>
                        Drawer content
                        <br />
                    </div>
                </Drawer>
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
