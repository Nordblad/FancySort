import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ReglineItemList from './ReglineItemList'
import EditWrapper from './EditWrapper'
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
        <div>Field<input type="text" placeholder={'ID ' + props.item.id} /></div>
    )
}

const Group: React.StatelessComponent<ReglineItemTypeProps> = (props) => (
    <div>
        Group {props.item.id}
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
        const { index, pageNo, parentId } = this.props
        return <EditWrapper wrapperType={'item'} id={item.id} index={index} pageNo={pageNo} parentId={parentId}>{children}</EditWrapper>
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
        console.log('RENDERING ITEM WRAPPER' + id, item)
        return (
            <div className="ReglineItem" style={{ padding: 0, border: '1px solid lightgray' }}>
                {this.getWrapper(item, this.getItemComponent(item))}
            </div>
        );
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
