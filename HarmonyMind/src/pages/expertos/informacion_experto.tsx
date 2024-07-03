import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonItem, IonList, IonThumbnail, IonGrid, IonCol, IonRow, IonCardContent, IonCardSubtitle, useIonViewWillEnter, IonButtons } from '@ionic/react';
import { IonText, IonRadio, IonAlert, IonRadioGroup, useIonLoading } from '@ionic/react';
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
    const [isLoading, setLoading] = useState(true)
    const [textLoading, setTextLoading] = useState('Recuperando información del experto')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [expertoInfo, setExpertoInfo] = useState([])
    const [horarios, setHorarios] = useState([])
    const [horaEscogida, setHora] = useState(-1)
    const { articleId } = useParams<{ articleId: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/expert_connection/get_schedules?expert_id=${match.params.expertoId}`, {
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
                    setTextLoading('Error')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor inténtelo denuevo más tarde.')
                })
                .then((posts) => {
                    console.log(posts)
                    setExpertoInfo(posts['data2'])
                    setHorarios(posts['data'])
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(true)
        fetch_posts();
    });

    function actionSheet(id) {
        console.log("hola")
    }

    interface Horario {
        id: number;
        horario: string;
    }


    const compareWith = (o1: Number, o2: Number) => {
        return o1 === o2;
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
                                            <h1>{expertoInfo.nombre}</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>{expertoInfo.rut}</h1>
                                        </IonText></IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol><IonText>
                                            <h1>{expertoInfo.profesion}</h1>
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
                                onIonChange={(ev) => setHora(ev.detail.value)}
                            >
                                {horarios.map((horario) => (
                                    horario.ocupado==false? (
                                    <IonItem>
                                        <IonRadio key={horario.id} value={horario.id}>
                                            {horario.hora}
                                        </IonRadio>
                                    </IonItem>):""
                                ))}
                            </IonRadioGroup>
                        </IonList>
                        <IonText className="ion-margin-top"><h1>Modalidad: Online mediante zoom</h1></IonText>
                        <IonButton expand="full" id="present-alert">Reservar Hora</IonButton>
                        {
                            horaEscogida == -1 ? (<IonAlert
                                header="Error: No has escogido una hora"
                                trigger="present-alert"
                                buttons={['Aceptar']}
                                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
                            ></IonAlert>) : (<IonAlert
                                header="¿Estas seguro de que quieres reservar una hora?"
                                trigger="present-alert"
                                buttons={[
                                    {
                                        text: 'Canelar',
                                        role: 'cancel',
                                    },
                                    {
                                        text: 'Confirmar',
                                        role: 'confirm',
                                        handler: () => {
                                            fetch(`http://127.0.0.1:8000/api/expert_connection/set_appointment?id_horario=${horaEscogida}`, {
                                                "method": "POST",
                                                "headers": {
                                                    'Accept': 'application/json',
                                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                                }
                                            })
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .catch(error => {
                                                    setTextLoading('Error')
                                                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor inténtelo denuevo más tarde.')
                                                })
                                                .then((posts) => {
                                                    router.push('/citas', 'root', 'replace');
                                                })
                                        },
                                    },
                                ]}
                            ></IonAlert>)
                        }

                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>

    );
};

export default informacion_experto;
