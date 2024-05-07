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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2RhY2IzMjRmNzA2YTFmYWUzMTM2YmM1OGZlZTVkOGM0NjUwMjZiMjNjYWQwMGMxMDNjN2Y3Y2RkNmEwZjM5NTgxNzA3YWY3ZDNkZjUxZWIiLCJpYXQiOjE3MTQ1MjE3NzguODUwMjQsIm5iZiI6MTcxNDUyMTc3OC44NTAyNDMsImV4cCI6MTc0NjA1Nzc3OC43NzI0MTgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iDenrINDElnsv6pvbZnTnIUg1MxeD-iTdpydD7ciLVZ9tm9_UGQ4Wg8IS0lAYF5sGHun2Vz6iqGu71Bm74M8bk6gNGQbvX-IMktUwu8E0KVGty6JT5vHNs3WM45klDbBSUtwY6RmrSMsn2Ep3o_Ua9QEYLz9Gtpo8dcddkCXK1kR0nlSWb8QdbyHAibFLrtwEMQk7w4lffgttjL1VQdIV7QjdkjYtemSBFJO5AElA_8pwtd4bBK-xG_Zks_JNYg0I9IHrhAnCwjudhT-bH5MDnj2b5OHL33eXhuVQEd7VlljVUK7ATUwDhrIwyzJs0YYvLLxuy09sqxfHzPIEVKfPIDZ5qQT6JoseHXvreG1gqbhzplAxXpN-PQUWgjss6OjaQJXxVWDbPzkfYaa4D4V-_L9ExJI4X4QMnbgyWvpm67qxbBrnZ2isRvVeC90W9mwZVD-u7iL88qukRlvx1zTBvVEE3ieICMmbuzZr65gCUCQSk1M8N9BKVsDCihGhrNZEsPld2aCVQ28Zh7KkXAlVqTXOvsNhWhKp71LywHIdXeNuEUMd2mn8mevZE30mSczYv3lm-jYZ709pb3tC9GVRjDvaaDEYi3LAf5HrUI_PRsImkD5aNG8WikQ2U7K4ZzTDR90WhYe8-JeDajX3Qq8HUJrxkReSGlN-tLckTR6E5k',
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
