import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonItem, IonList, IonThumbnail, IonGrid, IonCol, IonRow, IonCardContent, IonCardSubtitle, useIonViewWillEnter, IonButtons } from '@ionic/react';
import { IonText, IonRadio, IonRadioGroup, useIonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import { personCircle } from 'ionicons/icons';
import { RouteComponentProps } from "react-router-dom";
import LogoutButton from "../auth/Logout";
import { Link } from 'react-router-dom';
import './informacion_experto.css';

interface UserDetailPageProps
    extends RouteComponentProps<{
        expertoId: string;
    }> { }
const informacion_experto: React.FC<UserDetailPageProps> = ({ match }) => {
    const router = useIonRouter();
    const contentRef = useRef<HTMLIonContentElement>(null);
    const [present, dismiss] = useIonLoading();
    const [isLoading, setLoading] = useState(false)
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const { articleId } = useParams<{ articleId: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/publicacion/get`, {
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
                    setTextLoading('Error al recuperar estados')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor inténtelo denuevo más tarde.')
                })
                .then((posts) => {
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(false)
        fetch_posts();
    });

    function actionSheet(id) {
        console.log("hola")
    }

    interface Horario {
        id: number;
        horario: string;
    }

    const horarios: Horario[] = [
        {
            id: 1,
            horario: '9:30pm',
        },
        {
            id: 2,
            horario: '10:30pm',
        },
        {
            id: 3,
            horario: '11:30pm',
        },
        {
            id: 4,
            horario: '12:30pm',
        },
    ];

    const compareWith = (o1: Horario, o2: Horario) => {
        return o1.id === o2.id;
    };

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Información del Experto</IonTitle>
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
                <IonCard className={`${isLoading && 'ion-hide'} ion-padding ion-margin-bottom`}>
                    <IonGrid>
                        <IonRow className="ion-align-items-center ion-justify-content-center">
                            <IonThumbnail >
                                <img alt="Silhouette of mountains" src="/assets/user.jpg" />
                            </IonThumbnail>
                        </IonRow>
                    </IonGrid>
                    <IonCardContent >
                        <IonList>
                            <IonItem>

                                <IonGrid className="ion-margin-start ion-justify-content-center ion-align-items-center ion-text-center">
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Armando Casas</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>12.293.830-9</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Psicólogo</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard className={`${isLoading && 'ion-hide'} ion-padding ion-margin-bottom`}>
                    <IonCardContent>
                        <IonText><h1>Disponibilidad</h1></IonText>
                        <IonList className="ion-margin-bottom">
                            <IonRadioGroup
                                compareWith={compareWith}
                                onIonChange={(ev) => console.log('Current value:', JSON.stringify(ev.detail.value))}
                            >
                                {horarios.map((horario) => (
                                    <IonItem>
                                        <IonRadio key={horario.id} value={horario}>
                                            {horario.horario}
                                        </IonRadio>
                                    </IonItem>
                                ))}
                            </IonRadioGroup>
                        </IonList>
                        <IonText className="ion-margin-top"><h1>Modalidad: Online mediante zoom</h1></IonText>
                        <IonButton expand="full">Reservar Hora</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>

    );
};

export default informacion_experto;
