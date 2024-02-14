import { CCard, CCardBody, CButton, CFormInput, CContainer, CRow } from '@coreui/react';
import { useState, useEffect } from 'react';
import Service from './Service';
import CreateService from './CreateService';

const Tarif = ({ item, loadTarifs, tarifs }) => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, [tarifs]);

    useEffect(() => {
        setName(item.name);
    }, [item]);

    const loadServices = () => {
        fetch(`http://localhost:8080/api/tarif_services/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setServices(data);
            });
    };

    const deleteTarif = (id) => {
        fetch(`http://localhost:8080/api/tarif/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadTarifs();
        });
    };

    const editTarif = (id) => {
        const data = { id: id, name: name };
        fetch(`http://localhost:8080/api/tarif`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadTarifs();
            setEdit(false);
        });
    };

    return (
        <CCard className="mb-3" key={item.id}>
            <CCardBody>
                <div className="d-flex">
                    {!edit ? (
                        <span className="pt-1">
                            {item.name} - {item.prof}
                        </span>
                    ) : (
                        <>
                            <CFormInput value={name} className="w-25" onChange={(e) => setName(e.target.value)} />
                        </>
                    )}
                    {!edit ? (
                        <CButton size="sm" className="ms-2" color="warning" onClick={() => setEdit(true)}>
                            Редактировать
                        </CButton>
                    ) : (
                        <CButton size="sm" className="ms-2" color="success" onClick={() => editTarif(item.id)}>
                            Сохранить
                        </CButton>
                    )}
                    <CButton size="sm" className="ms-2" color="danger" onClick={() => deleteTarif(item.id)}>
                        Удалить
                    </CButton>
                </div>
                <hr />
                <CContainer fluid className="p-0 m-0">
                    <CRow>
                        {!!services.length &&
                            services.map((item) => {
                                return (
                                    <Service
                                        key={item.id}
                                        item={item}
                                        loadServices={() => loadServices()}
                                        tarifs={tarifs}
                                        loadTarifs={() => loadTarifs()}
                                    />
                                );
                            })}
                        <CreateService tarifId={item.id} loadServices={() => loadServices()} services={services} />
                    </CRow>
                </CContainer>
            </CCardBody>
        </CCard>
    );
};
export default Tarif;
