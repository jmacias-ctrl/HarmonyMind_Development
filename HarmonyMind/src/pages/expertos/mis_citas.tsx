import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonItem, IonList, IonThumbnail, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, useIonViewWillEnter, IonButtons } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';
import { personCircle } from 'ionicons/icons';
import LogoutButton from "../auth/Logout";
import { Link } from 'react-router-dom';
import './mis_citas.css';
const mis_citas: React.FC = () => {
    const router = useIonRouter();
    const contentRef = useRef<HTMLIonContentElement>(null);
    const [present, dismiss] = useIonLoading();
    const [isLoading, setLoading] = useState(true)
    const [citas, setCitas] = useState([])
    const [textLoading, setTextLoading] = useState('Recuperando Citas Reservadas')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const { status } = useParams<{ status: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/expert_connection/get_appointments `, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then((res) => {
                    return res.json();
                })
                .catch(error => {
                    setTextLoading('Error al recuperar citas reservadas')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor inténtelo denuevo más tarde.')
                })
                .then((posts) => {
                    setCitas(posts['data'])
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(true)
        fetch_posts();
    });


    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis Citas</IonTitle>
                    <IonButtons slot="end">
                        <LogoutButton />
                    </IonButtons>
                    <IonProgressBar className={`${!isLoading && 'ion-hide'} `} type="indeterminate" id="progressBar"></IonProgressBar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={`${!isLoading && 'ion-hide'}`}>
                    <div className="ion-text-center">
                        <h3>{textLoading}</h3>
                        {subtextLoading}
                    </div>
                </div>
                {citas.map((cita) => (
                    <IonCard key={cita.id} className={`ion-padding ion-margin-bottom`}>
                        <IonCardContent>
                            <IonCardTitle>Cita N°{cita.id}</IonCardTitle>
                            <IonList>
                                <IonItem>
                                    <IonThumbnail className="misCitasThumbnail">
                                        <img alt="Silhouette of mountains" src="/assets/cita.png" />
                                    </IonThumbnail>
                                    <IonGrid className="ion-margin-start">
                                        <IonRow>
                                            <IonCol><IonText>
                                                <h5>{cita.nombre_experto}</h5>
                                            </IonText></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonText>
                                                <h5>{cita.rut_experto}</h5>
                                            </IonText></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonText>
                                                <h5>Modalidad: {cita.modalidad}</h5>
                                            </IonText></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonText color="success">
                                                <h5>Fecha y Hora: {cita.fecha} {cita.hora}</h5>
                                            </IonText></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonButton fill="outline" color="warning">Cancelar</IonButton></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>

        </IonPage>

    );
};

export default mis_citas;
