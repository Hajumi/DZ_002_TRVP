import { CCol, CCardBody, CCard, CButton, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const Service = ({ item, loadServices, tarifs, loadTarifs }) => {
    const [selectedTarif, setSelectedTarif] = useState('');
    const [error, setError] = useState(false);

    const deleteService = () => {
        fetch(`http://localhost:8080/api/service/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadServices();
        });
    };

    const editService = () => {
        fetch(`http://localhost:8080/api/tarif_services/${selectedTarif}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data.find((service) => service.type === item.type)) {
                    const data = {
                        id: item.id,
                        type: item.type,
                        param: item.param,
                        tarif_id: selectedTarif,
                    };
                    fetch(`http://localhost:8080/api/service`, {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then((result) => {
                        loadTarifs();
                    });
                } else {
                    setError(true);
                }
            });
    };

    return (
        <CCol xs={4} className="pb-3">
            <CCard>
                <CCardBody>
                    <div>Тип: {item.type}</div>
                    <div>Параметр: {item.param}</div>
                    <hr />
                    <CFormSelect
                        label="Куда перенести?"
                        onChange={(e) => {
                            setSelectedTarif(e.target.value);
                            setError(false);
                        }}
                        invalid={error}
                    >
                        <option value=""> </option>
                        {tarifs
                            .filter((tarif) => {
                                return tarif.id !== item.tarif_id;
                            })
                            .map((tarif) => {
                                return (
                                    <option key={tarif.id} value={tarif.id}>
                                        {tarif.name}
                                    </option>
                                );
                            })}
                    </CFormSelect>
                    {error && <div className="text-danger">Услуга с таким типом уже существует</div>}
                    <CButton className="mt-2 me-2" size="sm" onClick={() => editService()}>
                        Перенести
                    </CButton>
                    <CButton className="mt-2" size="sm" color="danger" onClick={() => deleteService()}>
                        Удалить
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Service;
