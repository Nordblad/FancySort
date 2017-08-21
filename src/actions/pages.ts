function getAllReglineItemsOnPage(state: RootState, pageNo: number) {
    let rootItems = state.pages[pageNo].children
    let kids = rootItems;
    for (var i = 0; i < rootItems.length; i++) {
        kids = [...kids, ...getChildren(state, rootItems[i])]
    }
    return kids
}

function getChildren(state: RootState, id: number) {
    let ids = state.reglineItems[id].childIds
    // console.log('getChildren, id', id, 'children', ids)
    for (var i = 0; i < ids.length; i++) {
        ids = [...ids, ...getChildren(state, ids[i])]
    }
    return ids;
}

function perfectGetChildren(ids: number[]) {
    ids.forEach(id => {
        
    })
}

export function validatePage(pageNo: number) {
    return (dispatch, getState: () => RootState) => {
        console.log('Validating page ' + pageNo)
        let hmm = getAllReglineItemsOnPage(getState(), pageNo)
        console.log('HMM:', hmm)

        // let hmm2 = getChildren(getState(), 5)
        // console.log('HMM2', hmm2)
    }
}