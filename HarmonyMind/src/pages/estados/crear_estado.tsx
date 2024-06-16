import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonBackButton, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonTextarea, IonButtons, IonRange, IonItem, IonList, useIonToast } from '@ionic/react';
import { snowOutline, sunnyOutline } from 'ionicons/icons';
import { withRouter, useHistory } from "react-router";
import { IonAlert } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {

    const [contenido, setContenido] = useState('');
    const [estado_de_animo, setEstadodeAnimo] = useState(5);
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
            fetch(`http://127.0.0.1:8000/api/publicacion/create?publicacion=${contenido}&estado_de_animo=${estado_de_animo}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWQyNGQ4MjBlMTcwMzYwNDdlMzc4NjUxZTFmNWM2M2M2Y2MwM2E1MjNkZDE1ZjQzYTFlZTZlMmNkMmUzMjg2NTBkMGI2MDI1MzI2ZWIxOGQiLCJpYXQiOjE3MTUyMjYzMTUuNzg5NDcxLCJuYmYiOjE3MTUyMjYzMTUuNzg5NDc1LCJleHAiOjE3NDY3NjIzMTUuNjczMTQ5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Akf3M1EiIxRmVTpMdFk4-97ogH1b-Rrmwvq1-K60k2zBzJ4A8A6g-5cyb7T3udpOOKAnxFuCtNii-l-0iMZmJFRl2gz15ha1ipYHSLqFljoH_eKg53G4T31-hy1gSvUS3SbLmLRNqFwwXPHm_qZMrCkGDxL0Gon8zw1RpI_-pKZNcPel5XO0jaG31cRK2Ga-g-7fnSTG07NyD7sYJvS8b5TVUbrDBf5fD2wJg1MbFP45L1I_lreur-KtslsaUu2GOFRy9BD92Qj17YqibXvQ_zwHwBCZFE3XWs3G3e2QnNvNCaVB4NgN6yHo0DBaT87sQvz3GD9Z0Y2GC6X--WXi6O3Tq809T3md3T03pJjrzCukMvdUAN7IpZhQ8PfBDx8NpqY15pODSiZwZwVHdygRUnha2SOvEhck-b1C6cGc-aRF3U76NdlNUR36g0Ci1p1Ls0pHZkAoWG318ucYfzF1QJVN2pQLHwsK_waoKrDWV2LM77FnEphfe6ST1q2DCpeY5TuY42bppQJwAwLUBQKeGeYlrIVbxvKfwEYgVo-gHj25BT85uZe2_eIvEFuv4eDuBFRFLnx2XKJxyZVMDlJwaBJyDQ6FJ9Q4JrJlZ19fNrx3SIOx0TfACXsfoCeBa7dUEihDGHkUWm1AzvIRrC3lZyFBTKM7SU5ko6p5EF-T_sw',
                }
            }
            ).then((response) => response.json())
                .then((publicacion) => {
                    if (publicacion['success'] == true) {
                        setContenido("");
                        setEstadodeAnimo(5);
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
        }else{
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

                    <h5>Estado de Animo:</h5>
                    <p>Indica del 1 al 10 tu actual estado de animo</p>
                    <IonRange aria-label="Temperature" id="estado_de_animo" min={1} max={10} value={estado_de_animo} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setEstadodeAnimo(e.target.value)}>
                        <h3 slot="start">1</h3>
                        <h3 slot="end">10</h3>
                    </IonRange>

                    <IonButton className="ion-margin-top" name="buttonCrear" id="button_crear" onClick={crear_publicacion}>Crear</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default crear_estado;
