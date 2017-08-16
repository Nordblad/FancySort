import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { DragSource, DropTarget } from 'react-dnd';

export namespace EditWrapper {
  export interface Props {
    id: number,
    index: number,
    parentId?: number,
    pageNo?: number,
    wrapperType: 'item' | 'group' | 'layout',

    connectDropTarget?: (target: JSX.Element) => JSX.Element,
    connectDragSource?: (handle: JSX.Element) => JSX.Element,
    connectDragPreview?: (preview: JSX.Element) => JSX.Element,
    isDragging?: boolean,
    isOver?: boolean
  }

  export interface State {
    /* empty */
  }
}

const itemDragSource = {
  beginDrag(props: EditWrapper.Props) {
    let dndData = {
      id: props.id,
      originalIndex: props.index,
      originalParentId: props.parentId,
      originalPageNo: props.pageNo
    }
    console.log('Begindrag', dndData)
    
    return dndData
  },

  endDrag(props: EditWrapper.Props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      console.log('Didnt drop, return?')
      // props.moveCard(droppedId, originalIndex);
    }
  },
};

const itemDropTarget = {
  // canDrop() {
  //   return false;
  // },

  hover(props: EditWrapper.Props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId, index: overIndex, parentId: overParentId, pageNo: overPageNo } = props;

    if (draggedId === overId) return;


    // if (monitor.isOver({ shallow: true })) {
    //   if (draggedId !== overId) {
    //     console.log('HOVER.', { overId, overIndex, overParentId, overPageNo })
    //   }
    // }

    // if (draggedId === overId || !monitor.isOver({ shallow: true })) {
    //   return
    // }
    // if (draggedId !== overId) {
    //   if (monitor.isOver({ shallow: true })) {

    //   }
    //   // const { index: overIndex } = props.findCard(overId);
    //   // props.moveCard(draggedId, overIndex);
    // }
  },
  // drop(props, monitor) {
  //   console.log('DROP!', props, monitor.getItem())
  //   return { something: 'hello' }
  // }
};

@DropTarget('REGLINEITEM', itemDropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
}))
@DragSource('REGLINEITEM', itemDragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
export default class EditWrapper extends React.Component<EditWrapper.Props, EditWrapper.State> {
  render() {
    const { id, children, wrapperType, pageNo, parentId, index, connectDragPreview, connectDragSource, connectDropTarget, isDragging, isOver } = this.props;
    return connectDragPreview(
      <div className="EditWrapper" style={{ opacity: isDragging ? 0 : 1, backgroundColor: isOver ? 'red' : 'transparent' }}>
        {connectDragSource(<div style={{ backgroundColor: '#333', color: 'white', padding: 4 }}>{wrapperType} - I {index} PNo [{pageNo}] PId [{parentId}]</div>)}
        {connectDropTarget(<div>{children}</div>)}
      </div>
    )
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
