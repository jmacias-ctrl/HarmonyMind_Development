import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonItem, IonList, IonThumbnail, IonGrid, IonCol, IonRow, IonCardContent, IonCardSubtitle, useIonViewWillEnter, IonButtons } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';
import { personCircle } from 'ionicons/icons';
import LogoutButton from "../auth/Logout";
import { Link } from 'react-router-dom';
import './conectar_expertos.css';
const conectar_expertos: React.FC = () => {
    const router = useIonRouter();
    const contentRef = useRef<HTMLIonContentElement>(null);
    const [present, dismiss] = useIonLoading();
    const [isLoading, setLoading] = useState(false)
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [hideText, setHideText] = useState(false)
    const [didCreate, setDidCreate] = useState(false)
    const [noDiary, setNoDiary] = useState(true);
    const { status } = useParams<{ status: string }>();
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
        setNoDiary(true)
        setHideText(false)
        fetch_posts();
    });

    function actionSheet(id) {
        console.log("hola")
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Conexión con Expertos</IonTitle>
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
                <IonCard className={`${isLoading && 'ion-hide'} ion-padding ion-margin-bottom`} button onClick={()=>{actionSheet(1)}}>
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonThumbnail>
                                    <img alt="Silhouette of mountains" src="/assets/user.jpg" />
                                </IonThumbnail>
                                <IonGrid className="ion-margin-start">
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Armando Casas</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Psicólogo</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText color="success">
                                            <h1>Disponible</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard className={`${isLoading && 'ion-hide'} ion-padding ion-margin-bottom`} button onClick={()=>{actionSheet(1)}}>
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonThumbnail>
                                    <img alt="Silhouette of mountains" src="/assets/user.jpg" />
                                </IonThumbnail>
                                <IonGrid className="ion-margin-start">
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Ernesto Ramirez</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>Terapeuta</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText color="danger">
                                            <h1>No Disponible</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>

    );
};

export default conectar_expertos;
