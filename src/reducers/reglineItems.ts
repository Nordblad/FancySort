const initialTestData: ReglineItemState = {
    // 1: { id: 1, type: 'Field', childIds: [] },
    // 2: { id: 2, type: 'Group', childIds: [3, 4] },
    // 3: { id: 3, type: 'Field', childIds: [] },
    // 4: { id: 4, type: 'Field', childIds: [] },
    // 5: { id: 5, type: 'Columns', childIds: [10] },
    // 6: { id: 6, type: 'Field', childIds: [] },
    // 7: { id: 7, type: 'Field', childIds: [] },
    // 8: { id: 8, type: 'Field', childIds: [] },
    // 9: { id: 9, type: 'Field', childIds: [] },
    // 10: { id: 10, type: 'Group', childIds: [6, 8, 9] },

    1: { id: 1, type: 'Group', childIds: [2, 3, 4] },
    2: { id: 2, type: 'Field', childIds: [] },
    3: { id: 3, type: 'Field', childIds: [] },
    4: { id: 4, type: 'Field', childIds: [] },

    5: { id: 5, type: 'Group', childIds: [6, 8, 9] }, // TblPerson group

    6: { id: 6, type: 'Columns', childIds: [10, 11, 12] },
    10: { id: 10, type: 'Field', childIds: [] },
    11: { id: 11, type: 'Field', childIds: [] },

    8: { id: 8, type: 'Field', childIds: [] },
    9: { id: 9, type: 'Field', childIds: [] },
    12: { id: 12, type: 'Field', childIds: [] },
}

const reglineItems = (state: ReglineItemState = initialTestData, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export default reglineItems