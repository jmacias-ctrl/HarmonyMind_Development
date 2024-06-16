import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import LogoutButton from "./auth/Logout";

interface Evento {
    id: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    organizador: string;
    tipo: string;
    categoria: string;
}

const eventosMock: Evento[] = [{
    id: "1",
    nombre: "soy un evento",
    descripcion: "descripcion evento",
    fecha: new Date().toLocaleDateString(),
    organizador: "dame calses",
    tipo: 'Reunión Psicológica',
    categoria: "7"
}]


const EventosComponents: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>(eventosMock)
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const fetch_posts = () => {
        if (isLoaded == false) {
            fetch(`http://127.0.0.1:8000/api/evento/get`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWQyNGQ4MjBlMTcwMzYwNDdlMzc4NjUxZTFmNWM2M2M2Y2MwM2E1MjNkZDE1ZjQzYTFlZTZlMmNkMmUzMjg2NTBkMGI2MDI1MzI2ZWIxOGQiLCJpYXQiOjE3MTUyMjYzMTUuNzg5NDcxLCJuYmYiOjE3MTUyMjYzMTUuNzg5NDc1LCJleHAiOjE3NDY3NjIzMTUuNjczMTQ5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Akf3M1EiIxRmVTpMdFk4-97ogH1b-Rrmwvq1-K60k2zBzJ4A8A6g-5cyb7T3udpOOKAnxFuCtNii-l-0iMZmJFRl2gz15ha1ipYHSLqFljoH_eKg53G4T31-hy1gSvUS3SbLmLRNqFwwXPHm_qZMrCkGDxL0Gon8zw1RpI_-pKZNcPel5XO0jaG31cRK2Ga-g-7fnSTG07NyD7sYJvS8b5TVUbrDBf5fD2wJg1MbFP45L1I_lreur-KtslsaUu2GOFRy9BD92Qj17YqibXvQ_zwHwBCZFE3XWs3G3e2QnNvNCaVB4NgN6yHo0DBaT87sQvz3GD9Z0Y2GC6X--WXi6O3Tq809T3md3T03pJjrzCukMvdUAN7IpZhQ8PfBDx8NpqY15pODSiZwZwVHdygRUnha2SOvEhck-b1C6cGc-aRF3U76NdlNUR36g0Ci1p1Ls0pHZkAoWG318ucYfzF1QJVN2pQLHwsK_waoKrDWV2LM77FnEphfe6ST1q2DCpeY5TuY42bppQJwAwLUBQKeGeYlrIVbxvKfwEYgVo-gHj25BT85uZe2_eIvEFuv4eDuBFRFLnx2XKJxyZVMDlJwaBJyDQ6FJ9Q4JrJlZ19fNrx3SIOx0TfACXsfoCeBa7dUEihDGHkUWm1AzvIRrC3lZyFBTKM7SU5ko6p5EF-T_sw',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((posts: { success: boolean, data: Evento[] }) => {
                    console.log(posts)
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
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWQyNGQ4MjBlMTcwMzYwNDdlMzc4NjUxZTFmNWM2M2M2Y2MwM2E1MjNkZDE1ZjQzYTFlZTZlMmNkMmUzMjg2NTBkMGI2MDI1MzI2ZWIxOGQiLCJpYXQiOjE3MTUyMjYzMTUuNzg5NDcxLCJuYmYiOjE3MTUyMjYzMTUuNzg5NDc1LCJleHAiOjE3NDY3NjIzMTUuNjczMTQ5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Akf3M1EiIxRmVTpMdFk4-97ogH1b-Rrmwvq1-K60k2zBzJ4A8A6g-5cyb7T3udpOOKAnxFuCtNii-l-0iMZmJFRl2gz15ha1ipYHSLqFljoH_eKg53G4T31-hy1gSvUS3SbLmLRNqFwwXPHm_qZMrCkGDxL0Gon8zw1RpI_-pKZNcPel5XO0jaG31cRK2Ga-g-7fnSTG07NyD7sYJvS8b5TVUbrDBf5fD2wJg1MbFP45L1I_lreur-KtslsaUu2GOFRy9BD92Qj17YqibXvQ_zwHwBCZFE3XWs3G3e2QnNvNCaVB4NgN6yHo0DBaT87sQvz3GD9Z0Y2GC6X--WXi6O3Tq809T3md3T03pJjrzCukMvdUAN7IpZhQ8PfBDx8NpqY15pODSiZwZwVHdygRUnha2SOvEhck-b1C6cGc-aRF3U76NdlNUR36g0Ci1p1Ls0pHZkAoWG318ucYfzF1QJVN2pQLHwsK_waoKrDWV2LM77FnEphfe6ST1q2DCpeY5TuY42bppQJwAwLUBQKeGeYlrIVbxvKfwEYgVo-gHj25BT85uZe2_eIvEFuv4eDuBFRFLnx2XKJxyZVMDlJwaBJyDQ6FJ9Q4JrJlZ19fNrx3SIOx0TfACXsfoCeBa7dUEihDGHkUWm1AzvIRrC3lZyFBTKM7SU5ko6p5EF-T_sw',
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

    function modalControl(evento: Evento) {
        if (isOpen == false) {
            setSelectedEvento(evento)
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
                    <IonTitle>Eventos disponibles</IonTitle>
                    <IonButtons slot="end">
                    <LogoutButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton size="default" routerLink="/eventos/assist">Mis Eventos</IonButton>
                {eventos.map((post) => (
                    <IonCard className="ion-padding ion-margin-horizontal" key={post.id}>
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
                            <IonTitle>{selectedEvento?.nombre}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">

                        <p>{selectedEvento?.descripcion}</p>
                        <h3>Fecha: {selectedEvento?.fecha}</h3>
                        <h3>Organiza: {selectedEvento?.organizador}</h3>
                        <h3>Tipo: {selectedEvento?.tipo}</h3>
                        <h3>Categoría: {selectedEvento?.categoria}</h3>
                    </IonContent>
                </IonModal>


            </IonContent>

        </IonPage>

    );
};

export default EventosComponents;