import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonBackButton, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonTextarea, IonButtons, IonRange, IonItem, IonList, IonIcon } from '@ionic/react';
import { snowOutline, sunnyOutline } from 'ionicons/icons';
import { withRouter, useHistory } from "react-router";
import { IonAlert } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {

    const [contenido, setContenido] = useState('');
    const [estado_de_animo, setEstadodeAnimo] = useState(5);
    const history = useHistory();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();


    const markTouched = () => {
        setIsTouched(true);
    };

    function crear_publicacion() {

        console.log('contenido: ' + contenido);
        console.log('estado_de_animo: ' + estado_de_animo);

        if (contenido.length > 0) {
            setIsValid(true)
            fetch(`http://127.0.0.1:8000/api/publicacion/create?publicacion=${contenido}&estado_de_animo=${estado_de_animo}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2RhY2IzMjRmNzA2YTFmYWUzMTM2YmM1OGZlZTVkOGM0NjUwMjZiMjNjYWQwMGMxMDNjN2Y3Y2RkNmEwZjM5NTgxNzA3YWY3ZDNkZjUxZWIiLCJpYXQiOjE3MTQ1MjE3NzguODUwMjQsIm5iZiI6MTcxNDUyMTc3OC44NTAyNDMsImV4cCI6MTc0NjA1Nzc3OC43NzI0MTgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iDenrINDElnsv6pvbZnTnIUg1MxeD-iTdpydD7ciLVZ9tm9_UGQ4Wg8IS0lAYF5sGHun2Vz6iqGu71Bm74M8bk6gNGQbvX-IMktUwu8E0KVGty6JT5vHNs3WM45klDbBSUtwY6RmrSMsn2Ep3o_Ua9QEYLz9Gtpo8dcddkCXK1kR0nlSWb8QdbyHAibFLrtwEMQk7w4lffgttjL1VQdIV7QjdkjYtemSBFJO5AElA_8pwtd4bBK-xG_Zks_JNYg0I9IHrhAnCwjudhT-bH5MDnj2b5OHL33eXhuVQEd7VlljVUK7ATUwDhrIwyzJs0YYvLLxuy09sqxfHzPIEVKfPIDZ5qQT6JoseHXvreG1gqbhzplAxXpN-PQUWgjss6OjaQJXxVWDbPzkfYaa4D4V-_L9ExJI4X4QMnbgyWvpm67qxbBrnZ2isRvVeC90W9mwZVD-u7iL88qukRlvx1zTBvVEE3ieICMmbuzZr65gCUCQSk1M8N9BKVsDCihGhrNZEsPld2aCVQ28Zh7KkXAlVqTXOvsNhWhKp71LywHIdXeNuEUMd2mn8mevZE30mSczYv3lm-jYZ709pb3tC9GVRjDvaaDEYi3LAf5HrUI_PRsImkD5aNG8WikQ2U7K4ZzTDR90WhYe8-JeDajX3Qq8HUJrxkReSGlN-tLckTR6E5k',
                }
            }
            ).then((response) => response.json())
                .then((publicacion) => {
                    if (publicacion['success'] == true) {
                        setContenido("");
                        setEstadodeAnimo(5);
                        history.push('/estado/vertrue');
                    } else {
                        console.log(publicacion)
                    }

                });
        }

        setIsValid(false)
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
                <IonCard class="ion-padding">
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

                    <IonButton class="ion-margin-top" name="buttonCrear" id="button_crear" onClick={crear_publicacion}>Crear</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default crear_estado;
