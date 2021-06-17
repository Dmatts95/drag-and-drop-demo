import React from 'react'; 
import {useSelector, useDispatch} from 'react-redux'
import {Container,Row,Col, Button} from 'react-bootstrap';
import BuilderRow from '../builder-row/BuilderRow'
import {
    addRow,
    addColumn,
    selectRows
} from './layoutSlice';



const AppLayout = () => {
    const rows = useSelector(selectRows);
    const dispatch = useDispatch();
    console.log(rows);

    return(
        <div>
            <Container>
                {rows.map(row => <BuilderRow key={row.id} rowId={row.id} />)}
                
                {/* {rows.map(row => {
                    return (
                        <Row key={row.id}>
                            {row.columns.length === 0 ? <p>Row</p>:row.columns.map(col => {return(<Col key={col.id}>Column</Col>)})}
                        </Row>
                    );
                })} */}
            </Container>
            <Button
                onClick={() => dispatch(addRow())}
            >
                Add Row
            </Button>
        </div>
    );
}

export default AppLayout;