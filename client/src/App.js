import { useState, useEffect } from 'react';
import { CCard, CContainer, CRow, CCol, CCardBody, CCardHeader } from '@coreui/react';
import './App.css';
import CreateTarif from './CreateTarif';
import Tarif from './Tarif';

const App = () => {
    const [tarifs, setTarifs] = useState([]);

    useEffect(() => {
        loadTarifs();
    }, []);

    const loadTarifs = () => {
        fetch('http://localhost:8080/api/tarif', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTarifs(data);
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Салон связи</CCardHeader>
                            <CCardBody>
                                {!!tarifs.length &&
                                    tarifs.map((item) => {
                                        return (
                                            <Tarif
                                                key={item.id}
                                                loadTarifs={() => loadTarifs()}
                                                item={item}
                                                tarifs={tarifs}
                                            />
                                        );
                                    })}
                                <CreateTarif loadTarifs={() => loadTarifs()} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default App;
