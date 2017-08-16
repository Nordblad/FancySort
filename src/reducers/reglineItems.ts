const initialTestData: ReglineItemState = {
    1: { id: 1, type: 'Field', childIds: [] },
    2: { id: 2, type: 'Group', childIds: [3, 4] },
    3: { id: 3, type: 'Field', childIds: [] },
    4: { id: 4, type: 'Field', childIds: [] },
    5: { id: 5, type: 'Columns', childIds: [6] },
    6: { id: 6, type: 'Field', childIds: [] },
    // 7: { id: 7, type: 'Field', children: [] },
}

const reglineItems = (state: ReglineItemState = initialTestData, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export default reglineItems