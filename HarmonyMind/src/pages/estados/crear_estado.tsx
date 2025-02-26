import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonBackButton, IonButton, IonCardHeader, IonGrid, IonCol, IonRow, IonCardTitle } from '@ionic/react';
import { IonTextarea, IonButtons, IonRange, IonItem, IonList, useIonToast } from '@ionic/react';
import { snowOutline, sunnyOutline } from 'ionicons/icons';
import { withRouter, useHistory } from "react-router";
import { IonAlert } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';



const CrearPublicacionComponent: React.FC = () => {

    const [contenido, setContenido] = useState('');
    const [tristeza, setTristeza] = useState(0);
    const [felicidad, setFelicidad] = useState(0);
    const [disgusto, setDisgusto] = useState(0);
    const [ira, setIra] = useState(0);
    const [miedo, setMiedo] = useState(0);
    const [sorpresa, setSorpresa] = useState(0);
    const history = useHistory();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [toastCreate] = useIonToast();

    const markTouched = () => {
        setIsTouched(true);
    };

    function crear_publicacion() {

        if (contenido.length > 0) {
            setIsValid(true)
            fetch(`http://127.0.0.1:8000/api/publicacion/create?publicacion=${contenido}&tristeza=${tristeza}&felicidad=${felicidad}&disgusto=${disgusto}&ira=${ira}&miedo=${miedo}&sorpresa=${sorpresa}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
            ).then((response) => response.json())
                .then((publicacion) => {
                    if (publicacion['success'] == true) {
                        setContenido("");
                        setTristeza(0);
                        setFelicidad(0);
                        setDisgusto(0);
                        setIra(0);
                        setMiedo(0);
                        setSorpresa(0);
                        toastCreate({
                            message: '¡Estado creado de manera correcta!',
                            duration: 1500,
                            position: 'bottom',
                        });
                        history.push('/estado/ver');
                    } else {
                        toastCreate({
                            message: 'No se pudo crear el estado',
                            duration: 1500,
                            position: 'bottom',
                        });
                    }

                });
        } else {
            setIsValid(false)
        }


    };

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Crear un estado</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className="ion-padding">
                    <IonCardHeader>
                        <IonCardTitle>Expresa tus sentimientos y pensamientos que tengas en el momento aqui</IonCardTitle>
                    </IonCardHeader>
                    <h3>Contenido del Estado:</h3>
                    <IonList>
                        <IonItem>
                            <IonTextarea
                                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                aria-label="Comments"
                                fill="solid"
                                id="contenido"
                                value={contenido}
                                counter={true}
                                maxlength={255}
                                errorText="Su estado debe contener mas de un carácter."
                                onIonBlur={() => markTouched()}
                                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} caracteres restantes`}
                                onIonChange={(e: any) => setContenido(e.target.value)}></IonTextarea>
                        </IonItem>
                    </IonList>
                    <h3>Emociones:</h3>
                    <span>Indica del 1 al 10 tus emociones del momento:</span>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Tristeza:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="tristeza" min={1} max={10} value={tristeza} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setTristeza(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Felicidad:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="felicidad" min={1} max={10} value={felicidad} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setFelicidad(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Disgusto:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="disgusto" min={1} max={10} value={disgusto} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setDisgusto(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Ira:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="ira" min={1} max={10} value={ira} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setIra(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Miedo:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="miedo" min={1} max={10} value={miedo} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setMiedo(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-align-self-center" size="auto"><h6>Sorpresa:</h6></IonCol>
                            <IonCol className="ion-align-self-center">
                                <IonRange id="sorpresa" min={1} max={10} value={sorpresa} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setSorpresa(e.target.value)}>
                                    <h5 slot="start">1</h5>
                                    <h5 slot="end">10</h5>
                                </IonRange>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton className="ion-margin-top" name="buttonCrear" id="button_crear" onClick={crear_publicacion}>Crear</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default CrearPublicacionComponent;
