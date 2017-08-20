import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { DragSource, DropTarget } from 'react-dnd';
import { selectItem, addMessage } from '../actions/editorUi'
import { createSelector } from 'reselect'
import * as classNames from 'classnames'

export type EditWrapperType = 'item' | 'group' | 'layout' | 'none'

export namespace EditWrapper {
  export interface Props {
    id: number,
    index: number,
    parentId?: number,
    pageNo?: number,
    wrapperType: EditWrapperType,

    connectDropTarget?: (target: JSX.Element) => JSX.Element,
    connectDragSource?: (handle: JSX.Element) => JSX.Element,
    connectDragPreview?: (preview: JSX.Element) => JSX.Element,
    isDragging?: boolean,
    isOver?: boolean,

    selectItem?: typeof selectItem,
    isSelected?: boolean,
    addMessage?: typeof addMessage
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

@connect(mapStateToProps, mapDispatchToProps)
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
  handleClick = (e) => {
    // console.log('Click on', this.props.id, e)
    // e.preventDefault();
    if (this.props.wrapperType === 'item') {
      this.props.selectItem(this.props.id)
      this.props.addMessage('success', 'Selected item ' + this.props.id)
    }
  }
  render() {
    const { id, children, wrapperType, pageNo, parentId, index,
      connectDragPreview, connectDragSource, connectDropTarget,
      isDragging, isOver, isSelected } = this.props;

    const classes = classNames([
      'reg-editwrapper',
      'reg-editwrapper--' + wrapperType,
      isSelected && 'reg-editwrapper--selected',
      isOver && 'reg-editwrapper--isover'
    ])
    return connectDragPreview(
      connectDropTarget(
        <div
          className={classes}
          style={{
            opacity: isDragging ? 0 : 1,
            backgroundColor: isOver ? 'red' : 'transparent'
          }}
          onClickCapture={this.handleClick}>
          <div className="reg-editwrapper__outline"></div>
          {wrapperType === 'item' ?
            connectDragSource(
              <div className="reg-editwrapper__content">
                {children}
              </div>) :
            (<div className="reg-editwrapper__content">
              {children}
            </div>)}
          {wrapperType !== 'item' && connectDragSource(
            <div className="reg-editwrapper__handle"></div>
          )}
        </div>
      ))
  }
}

const getItemId = (state, props: EditWrapper.Props) => props.id
const getSelectedItemIds = (state: RootState) => state.editorUi.selectedReglineItems

const getIsSelected = createSelector(
  [getItemId, getSelectedItemIds],
  (id, selectedIds) => selectedIds.indexOf(id) > -1
)

function mapStateToProps(state: RootState, ownProps: EditWrapper.Props) {
  return {
    isSelected: getIsSelected(state, ownProps)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectItem,
    addMessage
  }, dispatch)
}
