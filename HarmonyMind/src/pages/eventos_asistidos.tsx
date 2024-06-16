import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonBackButton, useIonLoading } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
const eventos_asistidos: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    // variables de evento
    const [event, setEvent] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [org, setOrg] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');

    const fetch_posts = () => {
        if (isLoaded == false) {
            console.log('hola')
            fetch(`http://127.0.0.1:8000/api/evento/getassist`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjBjMTkzMWJjMDFjMWM0YWUxZjFkYjg3Y2VkMDc2MTI0YTkzM2EzNmE2ZjQ4MzY3NWEzNzA1MDU5MTRhMjljZDVlYmY4ZWFhMTg1MGYyNDciLCJpYXQiOjE3MTU2NDY4NzQuMzA4MjI3LCJuYmYiOjE3MTU2NDY4NzQuMzA4MjM1LCJleHAiOjE3NDcxODI4NzIuMTUyOTA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dI2a7iFnmCPrAke48JMdX7W8uG5TfkRtI7nEnFpsG8DxuH1dzGYq_CVklCuQBfBdHe6mYZ09N5zdPgnu-iZX_DbQgYG_1tbUtca31VtRk7g-VUhlMOpQ45nsiE3czNTCaEOiIXuA99Y313z2mM5_twfI3s99Ze4j85FRIMZ-5Ppo9S9aU8Z8Z95wXH-lRkS9eBRfywBIWLLpxL5UvD8bg8PmseByKznHlkgDl1cKpgYwTJLV1tBHfBGTXhzhgafdhDfyQ4w4tJzanMSCWdFzjj5YrzxFSO2E-_k7qtQ4YyeQPeoK_Bx7ekg9w-tRCrwVs73Abko5JPJzi5ex4j4m4URDsVuRk87z0MrzK-Kvxf5yV6NJ-JfTi3nQ6lEnX6eiFrE7n8RR35PjXhjMpBAY8iteZ62cp-XuIwAqbhj_nmfJXHE35a_zl5EuzCf_HOkKjBscMWww68Q63q1Z6aB00ozOSR_1KGGNMbL0BaRMijxSaVrpEcB4-5z4sTPyiPr3y3QkHLOjmQoo5MzfMRz7194tVZtgG2QWjt4Vf3l03wyY__2osujFakPjZ76BAHvq9YLIsbWN84s7-XgDAu1ACEu92eshe6CIuks8dsT3CzJjPr-onsHKxGHbTy6KYb_3PTEeKHRMRWY-Euz6krQ9okFJwEJEcBwBWNt_XrkZPUI',
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
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjBjMTkzMWJjMDFjMWM0YWUxZjFkYjg3Y2VkMDc2MTI0YTkzM2EzNmE2ZjQ4MzY3NWEzNzA1MDU5MTRhMjljZDVlYmY4ZWFhMTg1MGYyNDciLCJpYXQiOjE3MTU2NDY4NzQuMzA4MjI3LCJuYmYiOjE3MTU2NDY4NzQuMzA4MjM1LCJleHAiOjE3NDcxODI4NzIuMTUyOTA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dI2a7iFnmCPrAke48JMdX7W8uG5TfkRtI7nEnFpsG8DxuH1dzGYq_CVklCuQBfBdHe6mYZ09N5zdPgnu-iZX_DbQgYG_1tbUtca31VtRk7g-VUhlMOpQ45nsiE3czNTCaEOiIXuA99Y313z2mM5_twfI3s99Ze4j85FRIMZ-5Ppo9S9aU8Z8Z95wXH-lRkS9eBRfywBIWLLpxL5UvD8bg8PmseByKznHlkgDl1cKpgYwTJLV1tBHfBGTXhzhgafdhDfyQ4w4tJzanMSCWdFzjj5YrzxFSO2E-_k7qtQ4YyeQPeoK_Bx7ekg9w-tRCrwVs73Abko5JPJzi5ex4j4m4URDsVuRk87z0MrzK-Kvxf5yV6NJ-JfTi3nQ6lEnX6eiFrE7n8RR35PjXhjMpBAY8iteZ62cp-XuIwAqbhj_nmfJXHE35a_zl5EuzCf_HOkKjBscMWww68Q63q1Z6aB00ozOSR_1KGGNMbL0BaRMijxSaVrpEcB4-5z4sTPyiPr3y3QkHLOjmQoo5MzfMRz7194tVZtgG2QWjt4Vf3l03wyY__2osujFakPjZ76BAHvq9YLIsbWN84s7-XgDAu1ACEu92eshe6CIuks8dsT3CzJjPr-onsHKxGHbTy6KYb_3PTEeKHRMRWY-Euz6krQ9okFJwEJEcBwBWNt_XrkZPUI',
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

    function modalControl(info) {
        if (isOpen == false) {
            setEvent(info.nombre);
            setDesc(info.descripcion);
            setDate(info.fecha);
            setOrg(info.organizador);
            setType(info.tipo);
            setCategory(info.categoria);
            setIsOpen(true);
        } else {
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
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Tus Eventos</IonTitle>
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
                        <IonButton color="danger" id={"action_" + post.id}>Faltar</IonButton>
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

export default eventos_asistidos;