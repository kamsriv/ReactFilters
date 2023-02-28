import { Label } from '@mui/icons-material';
import { Box, Checkbox, Modal, Typography, useScrollTrigger } from '@mui/material';
import React from 'react';

function FiltersModal(props: any) {
    const [isOpen, setModalState] = React.useState(props.modalState);
    let columns: string[] = props.colNames;
    const handleClose = () => {
        setModalState(false);
    }

    return (
        <Modal id="modal_filter" open={isOpen} onClose={handleClose}>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Select appropriate option(s) to filter
                </Typography>
                <div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {columns.map((col: string,idx: number) => { return <Box key={`box_${idx}`}><Checkbox key={`cbx_${idx}`} value={col}></Checkbox><Label>{col}</Label></Box>})}
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
}

export default FiltersModal;