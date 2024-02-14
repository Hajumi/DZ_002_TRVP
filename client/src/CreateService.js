import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const CreateService = ({ tarifId, loadServices, services }) => {
    const [type, setType] = useState('Интернет');
    const [param, setParam] = useState('');
    const [error, setError] = useState('');

    const createService = () => {
        setError(false);
        if (!services.find((service) => service.type === type)) {
            const data = {
                type: type,
                param: param,
                tarif_id: tarifId,
            };
            fetch('http://localhost:8080/api/service', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                loadServices();
            });
            setType('Интернет');
            setParam('');
        } else {
            setError('Услуга с таким типом уже сущесвтует');
            return;
        }
    };

    return (
        <CCol xs={4}>
            <CCard>
                <CCardHeader>Создание услуги</CCardHeader>
                <CCardBody>
                    <CFormSelect
                        label="Тип"
                        className="mb-2"
                        placeholder="Тип"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setError(false);
                        }}
                    >
                        <option value="Интернет">Интернет</option>
                        <option value="Звонки">Звонки</option>
                        <option value="СМС">СМС</option>
                    </CFormSelect>
                    <CFormInput
                        className="mb-2"
                        label="Параметр"
                        value={param}
                        onChange={(e) => {
                            setParam(e.target.value);
                            setError(false);
                        }}
                    />
                    {error && <div className="text-danger pb-2">{error}</div>}
                    <CButton className="text-center" size="sm" onClick={createService}>
                        Создать
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default CreateService;
