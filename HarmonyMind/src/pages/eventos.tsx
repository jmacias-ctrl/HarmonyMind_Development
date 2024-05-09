import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
const eventos: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    // variables de evento
    const [event, setEvent ] = useState('');
    const [desc, setDesc ] = useState('');
    const [date, setDate ] = useState('');
    const [org, setOrg ] = useState('');
    const [type, setType ] = useState('');
    const [category, setCategory ] = useState('');
    
    const fetch_posts = () => {
        if (isLoaded==false) {
            console.log('hola')
            fetch(`http://127.0.0.1:8000/api/evento/get`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDBlYjkyZjBiNTBlM2E4NTE1NjFkYmExOTAxNWMxOTQyZTZkOTBmMzEyZTdhNTg0ZTk3NWQzODdiOTIwNzliZjhmZjBmYjFjMzA1MmZmNWEiLCJpYXQiOjE3MTUyMDQ5MDMuMDI5NzA3LCJuYmYiOjE3MTUyMDQ5MDMuMDI5NzExLCJleHAiOjE3NDY3NDA5MDIuNjU5MTI2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.XvRQ-lmCtNmjLI-d5TbGDUI4JfrAUd9p7WunG6nAj92vDrAwW_7UPor6S0Cs6UOUtIxq8CoW2wZjj8H4zI6N0FxCERsEYZPwR24YbkJouB_nNMTDYQsjP8SndR4TOMc4dLukgWDE-mY55Qqfcc2cjJ7iUdRg9irYqufXNCC0o6-guzXZvYFSsUV0d4WE_SKKBgIu8KDgaLjniSX6uybCVq93AzKHXqq1lSPz_I3g2csa4GYKunN0qGmnGInwOAK_WhwQ26BmzK32H1_MfDy3LtxwGdn_VkDr28y4SRNmJetID26QRBNU_P76UQqyUTf1GaBo9JgdJBO8jx3fpJIRRp2gcOPcDOWA7wx0HTgsEsAsQ1n2OEWAsihNynghtPUepXQkXDqGqp9lyZPyQH1e4ctxCkPPFIEiDicyKlUt4WbYluBbH_oaudYC35jCcBgqyVSR48VV1LNbm4TTkY8MW3SlwdUjHqKcglAutqqBofUASfOCW1qmfMWRNXghnB3T_QTtmlDLiDFxcZTOkj-S0qaTVCBXGLlds3ByK3SCdCx0lj-WCZan07foaOOoQnxVX-Tc-U9Ps2PoMPN_GZ44TgUZ3jK5q-PjTJuAwAvgMWjezXIZgVeFaDsmnvDASdmBoKxsAAzdS5rePDT_5n5UO5LKpm8PsTymnnkZv7X0ZY4',
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
            fetch(`http://127.0.0.1:8000/api/evento/assign?id_evento=${get_detail['data'].id}`, {
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

    function modalControl(info){
        if(isOpen==false){
            setEvent(info.nombre);
            setDesc(info.descripcion);
            setDate(info.fecha);
            setOrg(info.organizador);
            setType(info.tipo);
            setCategory(info.categoria);
            setIsOpen(true);
        }else{
            setIsOpen(false);
        }
    }

    useEffect(() => {
        fetch_posts();
    }, []);

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Eventos disponibles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {posts.map((post) => (
                    <IonCard class="ion-padding ion-margin-horizontal" key={post.id}>
                        <IonThumbnail>
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonCardSubtitle><IonText color="dark">{post.nombre} </IonText></IonCardSubtitle>
                        <IonText color="dark">
                            <h3>Fecha: {post.fecha}</h3>
                        </IonText>
                        <IonButton onClick={() => modalControl(post)}> Detalles</IonButton>
                        
            
                        <IonButton color="success" id={"action_" + post.id}>Asistir</IonButton>
                        <IonActionSheet
                            trigger={"action_" + post.id}
                            header={"¿Deseas asistir a este evento?"}
                            buttons={[
                                {
                                    text: 'Asistir',
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

                        <IonModal isOpen={isOpen}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>{event}</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent className="ion-padding">
          
                                <p>
                                    {desc}
                                </p>
                                <h3>Fecha: {date}</h3>
                                <h3>Organiza: {org}</h3>
                                <h3>Tipo: {type}</h3>
                                <h3>Categoría: {category}</h3>
                            </IonContent>
                        </IonModal>

                
            </IonContent>

        </IonPage>

    );
};

export default eventos;