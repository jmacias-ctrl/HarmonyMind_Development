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
            fetch(`http://192.168.1.6:8000/api/evento/getassist`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            fetch(`http://192.168.1.6:8000/api/evento/remove?id_evento=${get_detail['data'].id}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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