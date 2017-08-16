import * as React from 'react'
import ReglineItem, { ReglineItemTypeProps } from './ReglineItem'
import Placeholder from './Placeholder'

const Columns: React.StatelessComponent<ReglineItemTypeProps> = (props) => (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
            {/* <div>Column</div> */}
            {props.item.childIds.length > 0 ? <ReglineItem id={props.item.childIds[0]} index={0} parentId={props.item.id} /> : <Placeholder />}
        </div>
        <div style={{ flex: 1 }}>
            {/* <div>Column</div> */}
            {props.item.childIds.length > 1 ? <ReglineItem id={props.item.childIds[1]} index={1} parentId={props.item.id} /> : <Placeholder />}
        </div>
    </div>
)

export default Columns