import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonCardHeader, IonCardSubtitle, useIonViewWillEnter } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { IonFab, IonGrid, IonRow, IonCol, IonFabButton, useIonToast } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';
import { ellipsisVertical } from 'ionicons/icons';

import './ver_estados.css';
import ExploreContainer from '../../components/ExploreContainer';

const VistaEstadosComponent: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [hideText, setHideText] = useState(false)
    const [didCreate, setDidCreate] = useState(false)
    const [toastCreate] = useIonToast();
    const { status } = useParams<{ status: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/publicacion/get`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWQyNGQ4MjBlMTcwMzYwNDdlMzc4NjUxZTFmNWM2M2M2Y2MwM2E1MjNkZDE1ZjQzYTFlZTZlMmNkMmUzMjg2NTBkMGI2MDI1MzI2ZWIxOGQiLCJpYXQiOjE3MTUyMjYzMTUuNzg5NDcxLCJuYmYiOjE3MTUyMjYzMTUuNzg5NDc1LCJleHAiOjE3NDY3NjIzMTUuNjczMTQ5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Akf3M1EiIxRmVTpMdFk4-97ogH1b-Rrmwvq1-K60k2zBzJ4A8A6g-5cyb7T3udpOOKAnxFuCtNii-l-0iMZmJFRl2gz15ha1ipYHSLqFljoH_eKg53G4T31-hy1gSvUS3SbLmLRNqFwwXPHm_qZMrCkGDxL0Gon8zw1RpI_-pKZNcPel5XO0jaG31cRK2Ga-g-7fnSTG07NyD7sYJvS8b5TVUbrDBf5fD2wJg1MbFP45L1I_lreur-KtslsaUu2GOFRy9BD92Qj17YqibXvQ_zwHwBCZFE3XWs3G3e2QnNvNCaVB4NgN6yHo0DBaT87sQvz3GD9Z0Y2GC6X--WXi6O3Tq809T3md3T03pJjrzCukMvdUAN7IpZhQ8PfBDx8NpqY15pODSiZwZwVHdygRUnha2SOvEhck-b1C6cGc-aRF3U76NdlNUR36g0Ci1p1Ls0pHZkAoWG318ucYfzF1QJVN2pQLHwsK_waoKrDWV2LM77FnEphfe6ST1q2DCpeY5TuY42bppQJwAwLUBQKeGeYlrIVbxvKfwEYgVo-gHj25BT85uZe2_eIvEFuv4eDuBFRFLnx2XKJxyZVMDlJwaBJyDQ6FJ9Q4JrJlZ19fNrx3SIOx0TfACXsfoCeBa7dUEihDGHkUWm1AzvIRrC3lZyFBTKM7SU5ko6p5EF-T_sw',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .catch(error => {
                    setPosts([])
                    setTextLoading('Error al recuperar estados')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor intentelo denuevo más tarde.')
                })
                .then((posts) => {
                    if (posts['data'].length == 0) {
                        setTextLoading('No tienes estados creados')
                        setSubTextLoading('Haz click en el boton + y crea un estado con tus pensamientos del momento')
                    } else {
                        setPosts(posts['data']);
                        setHideText(true)
                    }
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(true)
        setHideText(false)
        fetch_posts();
    });

    function actionSheet(get_detail) {
        if (get_detail['role'] != 'backdrop') {
            fetch(`http://127.0.0.1:8000/api/publicacion/delete?id_publicacion=${get_detail['data'].id}`, {
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

                    if (info['success'] == true) {
                        window.location.reload();
                    }
                });
        }
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tus Estados</IonTitle>
                    <IonProgressBar className={`${!isLoading && 'ion-hide'}`} type="indeterminate" id="progressBar"></IonProgressBar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={`${hideText && 'ion-hide'}`}>
                    <div class="ion-text-center">
                        <h3>{textLoading}</h3>
                        {subtextLoading}
                    </div>
                </div>
                {posts.map((post) => (
                    <IonCard class="estadosCard ion-padding ion-margin-horizontal " key={post.id}>
                        <IonCardSubtitle>
                            <IonRow>
                                <IonCol size="auto">
                                    <IonText color="dark">Estado N°{post.numero} </IonText>
                                </IonCol>
                                <IonCol>
                                    <IonButton class="ion-float-right" id={"action_es_" + post.id} shape="round" size="small" fill="clear"><IonIcon icon={ellipsisVertical} slot="icon-only"></IonIcon></IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardSubtitle>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="auto">
                                    <div class="fechaDiv">
                                        <span class="textDiaMes">{post.dia}<br />{post.mes}</span> <br />
                                        <span class="textAnio">{post.año}</span>
                                    </div>
                                </IonCol>
                                <IonCol><p class="textPub">{post.publicacion}</p></IonCol>
                            </IonRow>
                        </IonGrid>
                        <div class="ion-text-center">
                            <IonText color="dark">
                                <h6>Estado de Animo</h6>
                            </IonText>
                            <IonProgressBar value={post.estado_de_animo / 10}></IonProgressBar>
                        </div>
                        <IonActionSheet
                            trigger={"action_es_" + post.id}
                            header={"¿Deseas hacer alguna acción en tu estado n°" + post.numero + "?"}
                            buttons={[
                                {
                                    text: 'Eliminar',
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

                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton onClick={() => { setDidCreate(true); router.push('/estado/crear'); }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>

        </IonPage>

    );
};

export default VistaEstadosComponent;
