import { useState } from 'react';
import { CCard, CCardBody, CFormInput, CButton, CCardHeader } from '@coreui/react';

const CreateTarif = ({ loadTarifs }) => {
    const [name, setName] = useState('');

    const createTarif = () => {
        const data = {
            name: name,
        };
        fetch('http://localhost:8080/api/tarif', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadTarifs();
        });
        setName('');
    };

    return (
        <CCard>
            <CCardHeader>Создание тарифа</CCardHeader>
            <CCardBody className="d-flex">
                <CFormInput placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
                <CButton className="ms-3" onClick={createTarif}>
                    Создать
                </CButton>
            </CCardBody>
        </CCard>
    );
};

export default CreateTarif;
