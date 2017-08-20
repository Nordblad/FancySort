const initialState = {
    page0: {
        children: [1, 2, 3]
    }
}

const formValues = {
    1: { 1: 'Axel' }
}

const formValidationErrors = {
    1: [{ label: 'Minlength', labelParameters: { minLength: 10 } }]
}

const exampleItems = {
    1: { type: 'field', contentReference: 512 },
    2: { type: 'seminar', contentReference: 333 }
}

declare interface SqlStateRowModel {
    id?: number,
    index?: string,
    name: string
}

declare interface ReglineFormValues {
    [personNo: number]: any
}

declare interface ItemTypeDeclaration {
    name: string,
    getValueFromSqlState?: (sqlStateRows: SqlStateRowModel[]) => ReglineFormValues
}

const itemDeclarations: { [name: string]: ItemTypeDeclaration } = {
    field: {
        name: 'field',
        getValueFromSqlState: getFieldValueFromSqlState
    },
    seminar: {
        name: 'seminar'
    }
}

function initFormValues() {
    // foreach item
    let state = { sqlState: [] }
    // Kanske en action-thunk?
    Object.values(exampleItems).forEach(item => {
        const { getValueFromSqlState } = itemDeclarations[item.type]
        let values = getValueFromSqlState(state.sqlState)
    })

}

// Alla formkomponenter:
function getFieldValueFromSqlState(stateRows: any[]): { [personNo: number]: any } {
    // field
    return stateRows.find(r => r.index === 'bleh')
}

function getSqlStateFromFieldValues(values: ReglineFormValues): SqlStateRowModel[] {
    return Object.entries(values).map(([pNo, val], i) => {
        console.log('Turning', val, 'to sqlState for person', pNo)
        return { index: 'Blabla', name: 'hmm', value: val }
    })
}

// Sen skapas nytt sqlState från alla rader med personNo 0 och de nya raderna