import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter  } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonTextarea, IonInput, IonRange, IonItem, IonList, IonIcon } from '@ionic/react';
import { snowOutline, sunnyOutline } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {

    const [contenido, setContenido] = useState('');
    const [estado_de_animo, setEstadodeAnimo] = useState(5);
    const router = useIonRouter();

    function crear_publicacion() {

        console.log('contenido: ' + contenido);
        console.log('estado_de_animo: ' + estado_de_animo);

        fetch(`http://127.0.0.1:8000/api/publicacion/create?publicacion=${contenido}&estado_de_animo=${estado_de_animo}`, {
            "method": "POST",
            "headers": {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjRjOTk1NTc3NzkwYzAwZjM0OGVmYzU1NDcyMTkwOWIwMGViOGZiODhjMDc3Mzg5ZWQyZDM1MDg0Y2Q1MzU4NjlkYjA3MmFlYWFkNzNhZjIiLCJpYXQiOjE3MTUxMTgxMjUuMDYzNzYxLCJuYmYiOjE3MTUxMTgxMjUuMDYzNzY2LCJleHAiOjE3NDY2NTQxMjQuODYyNjI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.eLyHEpMLssrKUC2V01umMgoLMkK_XZZD8pyGRi5H8mINxVap6WwiRvxkzMGRaXIwTQByCjcD1qBvdL_dKGw-rYlc6S5aQjG2kMo0FSLc9y5_HmvbIu7QZHHxkpzx-0WTA_bbUeze9jLLixtdK5l8Pxmx5Udc8XHlnXAqCwvwOOvbE2zcU3zpjfDBOTFR8korMO2Abi6Dvdrqn0c7IW-r6jjLtyKyuVbEMI37WGWp42K1SMABojtV3CDvqHLx6_sgCI1s7nx4KiSyIa4rxPb8daVOs1yFo8SFo25pDS4AShAMPLwu8rgdzge0lvVvSQf28gKauvgmjamw9nnalnE-moyAov5iOzy0FQIuleSxcm3BFmHcGp2xEHbRF3L-_8PPXVeFJI3hcit5hWqfJVeEoYk_8C1-6TidO4TeUVYqasuyuHnc2lad4gHlBIipmmhFC-nproG4_tTn-xVrI2lO0GgFTzTMypMZik1GLVBTK0_chsDpxrRdO5mLrsCd7YSWuv8jUz9EX6IhWlU6iv0XXW_iHavkUarQkw_jWsIpEWYqURO9-S43231pySRKdy0PLdVYSfugoeZUv6uqGAX1SZjqlTpqm_an_UcUnu6QfoQJyHiaoejXZNC5NVrxPGs4FEjs2M6ayrJMRK24iMdZG_O2jutwSAXjpHotrGITzIU',
            }
        }
        ).then((response) => response.json())  
        .then((publicacion) => {
            if(publicacion['success']==true){
                router.push('/tab1');
            }else{
                console.log(publicacion)
            }
            
        });
    };

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crear un estado</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard class="ion-padding">
                    <IonCardHeader>
                        <IonCardTitle>Expresa tus sentimientos y pensamientos que tengas en el momento</IonCardTitle>
                    </IonCardHeader>
                    <h3>Contenido</h3>
                    <IonList>
                        <IonItem>
                            <IonTextarea aria-label="Comments" fill="solid" id="contenido" value={contenido} counter={true} maxlength={350} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} caracteres restantes`} onIonChange={(e: any) => setContenido(e.target.value)}></IonTextarea>
                        </IonItem>
                    </IonList>

                    <h3>Estado De Animo</h3>
                    <IonRange aria-label="Temperature" id="estado_de_animo" min={0} max={10} value={estado_de_animo} pin={true} ticks={true} snaps={true} onIonChange={(e: any) => setEstadodeAnimo(e.target.value)}>
                        <IonIcon slot="start" icon={snowOutline}></IonIcon>
                        <IonIcon slot="end" icon={sunnyOutline}></IonIcon>
                    </IonRange>

                    <IonButton class="ion-margin-top" name="buttonCrear" onClick={crear_publicacion}>Crear</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default crear_estado;
