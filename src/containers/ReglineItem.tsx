import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ReglineItemList from './ReglineItemList'
import EditWrapper, { EditWrapperType } from './EditWrapper'
import Columns from './Columns'

export namespace ReglineItem {
    export interface Props {
        id: number,
        item?: ReglineItemModel,
        index: number,
        pageNo?: number,
        parentId?: number
    }

    export interface State {
        /* empty */
    }
}

export interface ReglineItemTypeProps {
    item: ReglineItemModel
}

const Field = (props: ReglineItemTypeProps) => {
    return (
        <div style={{ display: 'flex' }}>
            <label style={{ flex: 1, padding: 10, textAlign: 'right' }}>
                Field
            </label>
            <div style={{ flex: 1, padding: 10 }}>
                <input
                    style={{ display: 'block' }}
                    type="text"
                    placeholder={'ID ' + props.item.id} />
            </div>
        </div>
    )
}

const Group: React.StatelessComponent<ReglineItemTypeProps> = (props) => (
    <div className="reg-itemgroup">
        <ReglineItemList childItemIds={props.item.childIds} parentId={props.item.id} />
    </div>
)

declare interface ItemTypeDeclaration {
    component: React.StatelessComponent<ReglineItemTypeProps>
}
const itemTypes = {
    Field: {

    }
}

@connect(mapStateToProps)
export default class ReglineItem extends React.Component<ReglineItem.Props, ReglineItem.State> {
    getWrapper = (item: ReglineItemModel, children): JSX.Element => {
        // if EditMode
        const { index, pageNo, parentId } = this.props // och EditMode
        let wrapperType: EditWrapperType = 'none'
        if (item.type === 'Field') wrapperType = 'item'
        else if (item.type === 'Group') wrapperType = 'group'
        else if (item.type === 'Columns') wrapperType = 'layout'
        return <EditWrapper wrapperType={wrapperType} id={item.id} index={index} pageNo={pageNo} parentId={parentId}>{children}</EditWrapper>
    }

    getItemComponent = (item: ReglineItemModel): JSX.Element => {
        const { index, pageNo, parentId } = this.props
        if (item.type === 'Field') return <Field item={item} />
        if (item.type === 'Group') return <Group item={item} />
        if (item.type === 'Columns') return <Columns item={item} />
        return <div>UNKONWN ITEM</div>
    }

    render() {
        const { id, item } = this.props;
        // console.log('RENDERING ITEM WRAPPER' + id, item)
        return this.getWrapper(item, this.getItemComponent(item))
    }
}

function mapStateToProps(state: RootState, ownProps: ReglineItem.Props) {
    return {
        item: state.reglineItems[ownProps.id]
    };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions as any, dispatch)
//   };
// }
