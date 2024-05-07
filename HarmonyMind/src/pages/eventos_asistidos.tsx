import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
const eventos_asistidos: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    ;
    const fetch_posts = () => {
        if (isLoaded==false) {
            console.log('hola')
            fetch(`http://127.0.0.1:8000/api/evento/getassist`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjRjOTk1NTc3NzkwYzAwZjM0OGVmYzU1NDcyMTkwOWIwMGViOGZiODhjMDc3Mzg5ZWQyZDM1MDg0Y2Q1MzU4NjlkYjA3MmFlYWFkNzNhZjIiLCJpYXQiOjE3MTUxMTgxMjUuMDYzNzYxLCJuYmYiOjE3MTUxMTgxMjUuMDYzNzY2LCJleHAiOjE3NDY2NTQxMjQuODYyNjI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.eLyHEpMLssrKUC2V01umMgoLMkK_XZZD8pyGRi5H8mINxVap6WwiRvxkzMGRaXIwTQByCjcD1qBvdL_dKGw-rYlc6S5aQjG2kMo0FSLc9y5_HmvbIu7QZHHxkpzx-0WTA_bbUeze9jLLixtdK5l8Pxmx5Udc8XHlnXAqCwvwOOvbE2zcU3zpjfDBOTFR8korMO2Abi6Dvdrqn0c7IW-r6jjLtyKyuVbEMI37WGWp42K1SMABojtV3CDvqHLx6_sgCI1s7nx4KiSyIa4rxPb8daVOs1yFo8SFo25pDS4AShAMPLwu8rgdzge0lvVvSQf28gKauvgmjamw9nnalnE-moyAov5iOzy0FQIuleSxcm3BFmHcGp2xEHbRF3L-_8PPXVeFJI3hcit5hWqfJVeEoYk_8C1-6TidO4TeUVYqasuyuHnc2lad4gHlBIipmmhFC-nproG4_tTn-xVrI2lO0GgFTzTMypMZik1GLVBTK0_chsDpxrRdO5mLrsCd7YSWuv8jUz9EX6IhWlU6iv0XXW_iHavkUarQkw_jWsIpEWYqURO9-S43231pySRKdy0PLdVYSfugoeZUv6uqGAX1SZjqlTpqm_an_UcUnu6QfoQJyHiaoejXZNC5NVrxPGs4FEjs2M6ayrJMRK24iMdZG_O2jutwSAXjpHotrGITzIU',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((posts) => {
                    setPosts(posts['data']);
                    setLoaded(true)
                });
        }
    };

    function actionSheet(get_detail) {
        if (get_detail['role'] != 'backdrop') {
            fetch(`http://127.0.0.1:8000/api/evento/remove?id_evento=${get_detail['data'].id}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjRjOTk1NTc3NzkwYzAwZjM0OGVmYzU1NDcyMTkwOWIwMGViOGZiODhjMDc3Mzg5ZWQyZDM1MDg0Y2Q1MzU4NjlkYjA3MmFlYWFkNzNhZjIiLCJpYXQiOjE3MTUxMTgxMjUuMDYzNzYxLCJuYmYiOjE3MTUxMTgxMjUuMDYzNzY2LCJleHAiOjE3NDY2NTQxMjQuODYyNjI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.eLyHEpMLssrKUC2V01umMgoLMkK_XZZD8pyGRi5H8mINxVap6WwiRvxkzMGRaXIwTQByCjcD1qBvdL_dKGw-rYlc6S5aQjG2kMo0FSLc9y5_HmvbIu7QZHHxkpzx-0WTA_bbUeze9jLLixtdK5l8Pxmx5Udc8XHlnXAqCwvwOOvbE2zcU3zpjfDBOTFR8korMO2Abi6Dvdrqn0c7IW-r6jjLtyKyuVbEMI37WGWp42K1SMABojtV3CDvqHLx6_sgCI1s7nx4KiSyIa4rxPb8daVOs1yFo8SFo25pDS4AShAMPLwu8rgdzge0lvVvSQf28gKauvgmjamw9nnalnE-moyAov5iOzy0FQIuleSxcm3BFmHcGp2xEHbRF3L-_8PPXVeFJI3hcit5hWqfJVeEoYk_8C1-6TidO4TeUVYqasuyuHnc2lad4gHlBIipmmhFC-nproG4_tTn-xVrI2lO0GgFTzTMypMZik1GLVBTK0_chsDpxrRdO5mLrsCd7YSWuv8jUz9EX6IhWlU6iv0XXW_iHavkUarQkw_jWsIpEWYqURO9-S43231pySRKdy0PLdVYSfugoeZUv6uqGAX1SZjqlTpqm_an_UcUnu6QfoQJyHiaoejXZNC5NVrxPGs4FEjs2M6ayrJMRK24iMdZG_O2jutwSAXjpHotrGITzIU',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((info) => {
                    console.log(info)
                    if (info['success'] == true) {
                        window.location.reload();
                    }
                });
        }
    }

    useEffect(() => {
        fetch_posts();
    }, []);

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tus Eventos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {posts.map((post) => (
                    <IonCard class="ion-padding ion-margin-horizontal" key={post.id}>
                        <IonCardSubtitle><IonText color="dark">Evento N°{post.id} : {post.nombre} </IonText></IonCardSubtitle>
                        <IonText color="dark">
                            <h3>{post.descripcion}</h3>
                        </IonText>
                        <IonText color="dark">
                            <h3>Fecha: {post.fecha}</h3>
                        </IonText>
                        <IonText color="dark">
                            <h3>Organiza: {post.organizador}</h3>
                        </IonText>
                        <IonText color="dark">
                            <h3>Tipo: {post.tipo}</h3>
                        </IonText>
                        <IonText color="dark">
                            <h3>Categoría: {post.categoria}</h3>
                        </IonText>
                        
            
                        <IonButton id={"action_" + post.id}>Faltar</IonButton>
                        <IonActionSheet
                            trigger={"action_" + post.id}
                            header={"¿Seguro que ya no deseas participar en este evento?"}
                            buttons={[
                                {
                                    text: 'Cancelar asistencia',
                                    role: 'destructive',
                                    data: {
                                        action: 'delete',
                                        id: post.id
                                    },
                                },
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    data: {
                                        action: 'cancel',
                                    },
                                },
                            ]} onDidDismiss={({ detail }) => actionSheet(detail)}
                        ></IonActionSheet>

                    </IonCard>
                ))}

                
            </IonContent>

        </IonPage>

    );
};

export default eventos_asistidos;