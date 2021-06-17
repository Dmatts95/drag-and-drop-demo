import React, {useState, useEffect, useRef} from 'react';
import {Row,Button} from 'react-bootstrap';
import {FaPlus, FaMinus, FaTrash, FaArrowsAlt} from 'react-icons/fa';
import './builderRow.css';
import {useSelector, useDispatch} from 'react-redux'
import BuilderColumn from '../build-column/BuilderColumn';
import {
    addRow,
    addColumn,
    removeRow,
    removeColumn,
    selectRowById,
    selectLastRowId,
    selectRowsLength
} from '../layout/layoutSlice';

import {useDrag} from 'react-dnd-html5-backend';


const BuilderRow = ({rowId}) => {
    const dispatch = useDispatch();

    const {columns} = useSelector(selectRowById(rowId));
    const rowSize = useSelector(selectRowsLength);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const useHandleClickOutside = (ref) => {
        useEffect(()=>{
            const handleClickEvent = (event) => {
                if(ref.current && !ref.current.contains(event.target)){
                    setShowDeleteConfirm(false)
                }
            }
            document.addEventListener('mousedown',handleClickEvent);
            return  () => {
                document.removeEventListener('mousedown', handleClickEvent)
            }
        },[ref])
    }


    const AddColBtn = () => {
        return(
            <Button 
                className='add-col'
                onClick={() => dispatch(addColumn({rowId: rowId}))}
                variant='success'
            ><FaPlus/></Button>
        );
    }

    const RemoveColBtn = () => {
        return(
            <Button 
                className='remove-col'
                onClick={() => dispatch(removeColumn({rowId: rowId}))}
                variant='danger'
            ><FaMinus/></Button>
        );
    }

    const AddRowBtn = () => {
        return(
            <Button 
                className='add-row'
                onClick={() => dispatch(addRow())}
                variant='secondary'
            ><FaPlus/></Button>
        );
    }

    const RemoveRowBtn = () => {
        return(
            <Button 
                className='remove-row'
                onClick={() => setShowDeleteConfirm(true)}
                variant='danger'
                disabled={showDeleteConfirm}
            ><FaTrash/></Button>
        );
    }
    const RemoveRowConfirmBtn = () => {
        const clickRef = useRef(null);
        useHandleClickOutside(clickRef);

        return(
            
                <Button
                    className='remove-row-confirm'
                    onClick={() => dispatch(removeRow({rowId: rowId}))}
                    variant='danger'
                    ref={clickRef}
                >Confirm</Button>
            
        );
    }

    const DragRowBtn = () => {
        return(
            <Button 
            className='drag-row'
            onClick={() => console.log('dragging')}
            variant='dark'
        ><FaArrowsAlt/></Button>
        );
    }

    return(
        <Row className='my-4'>
            <AddColBtn />
            <RemoveColBtn />
            <RemoveRowBtn />
            {rowSize > 1 && <DragRowBtn />}
            {showDeleteConfirm && <RemoveRowConfirmBtn />}

            {columns.map(col => <BuilderColumn key={`${rowId}${col.id}`} />)}
            {rowId === useSelector(selectLastRowId) && <AddRowBtn />}
        </Row>
    ); 
}

export default BuilderRow; 