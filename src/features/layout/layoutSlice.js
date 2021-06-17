import { createSlice } from '@reduxjs/toolkit'
import {RED_COMPONENT,GREEN_COMPONENT,BLUE_COMPONENT} from '../component/types';

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        rowCount:0, 
        colCount:0,
        rows: []
    },

    reducers: {
        addRow: state => {
            const newRowEntry = {
                id: state.rowCount,
                columns: []
            };
            
            state.lastMadeRowIndex = state.rowCount; 
            state.rowCount += 1;
            state.rows.push(newRowEntry);
        },
        addColumn: (state, action) => {
            const {rowId} = action.payload;
            const rowIndex = state.rows.findIndex(row => row.id === rowId); 

            const newColEntry = {
                id: state.colCount, 
                component: {}
            }
            state.colCount += 1; 
            if(state.rows !== undefined && state.rows.length > 0 && rowIndex < state.rows.length)
                state.rows[rowIndex].columns.push(newColEntry);
            else
                console.log('Row index out of bounds.');
        },
        removeColumn: (state, action) => {
            const {rowId} = action.payload;
            const rowIndex = state.rows.findIndex(row => row.id === rowId); 
            state.rows[rowIndex].columns.pop(); 
        },

        removeRow: (state, action) => {
            const {rowId} = action.payload;
            const rowIndex = state.rows.findIndex(row => row.id === rowId); 
            state.rows.splice(rowIndex,1); 
        }
    }
})

export const selectLastRowId = (state) => state.layout.rows[state.layout.rows.length - 1].id;

export const selectRowById = (id) => (state) => state.layout.rows.find(row => row.id === id);

export const selectRows = (state) => state.layout.rows;
export const selectRowsLength = (state) => state.layout.rows.length;

export const {addRow, addColumn, removeRow, removeColumn} = layoutSlice.actions;

export default layoutSlice.reducer;