import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonSkeletonText, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, useIonViewWillEnter } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { IonFab, IonGrid, IonRow, IonCol, IonFabButton, useIonToast } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';
import { ellipsisVertical } from 'ionicons/icons';

import './ver_estados.css';
import './boxColor_Emotion.css';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [hideText, setHideText] = useState(false)
    const [didCreate, setDidCreate] = useState(false)
    const [recomendacion, setRecomendacion] = useState('none')
    const [toastCreate] = useIonToast();
    const [estado_de_animo, setEstadoDeAnimo] = useState("")
    const [noDiary, setNoDiary] = useState(true);
    const [numEstados, setNumEstados] = useState(0);
    const { status } = useParams<{ status: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/publicacion/get`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUzY2JjZGQ3YzBiOTYyZTEzZWVhOWNjNTg0NDIxZTQ3YWZlZWQ4NGQ2Mzk3MzJhNzg0ZTE4ZGUwYmIwNTExMTlhYmJlZWNjOTRjODEyMmQiLCJpYXQiOjE3MTcyODIwNzQuMTYzNjI3LCJuYmYiOjE3MTcyODIwNzQuMTYzNjMxLCJleHAiOjE3NDg4MTgwNzQuMDY2MzY3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.J_m8LTlYpAp-SEG8X19mqxjJZU0F0pHJlDy4A_DVZRDsiJClo95nZ4Ydzdq7Fwdn2n_8mtMplCtqdwjsBF1a4H7YtbqFBqis4DVWDrBQTTB1YZ0fo750ShyXk-MaZ0h_WzLFWv0SKQKuDoz8inWUYzQCZCiZnIbmWC9SA3cdWp3NR1eXrSUNpC3TI5ZY7OzzoXd15frTgOQcCA-K8jp4dvOSD_FsSc7ZlpcMPef_-If0tDolU8bS-n7LGckf-bXITI0O0q1YidWp-g6w9IXo3x9x2KcIzQi-hEpwoTSLXzkTZ10uhnQcLk367Fs1rHyAFYIjwYbDuBvM_WkvdUmqBCR0iFyP5tERksQfGDc1nFKKk-vwqQxDqRnGdHf5olsiZAxPXUYnySGYgGljVJUfanDy3h-L-RBMbZiS3yh2Xq8qKtC5l1e2eOk3qPaCsVqBCjiRLp2oLWobIa3qPTyHq4-glAh9XEr_X5LXxcWXZ8VFko3QXj--pqLMdHFo9Hy2GrGL41Cz39rPEpbx5NkJgXbBJI-WH-JCkJNALw-V4LpZy2jSsK3Y6WCJMzx5RKdnoXUEVszHy4ya_7AdIBboXfM0nMydF6oKtk3Zf0q2VLoLvXW8GKnuT7QjjYtArf_KVpxFVM3dfjKj9wpbpUwH115Jp71r0AIlNpIvUU1f38w',
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
                    setNumEstados(posts['count'])
                    if (parseInt(posts['count']) > 0) {
                        var max_emotion = Object.keys(posts['emociones']).reduce(function (a, b) { return posts['emociones'][a] > posts['emociones'][b] ? a : b })
                        setNoDiary(false)
                        setEstadoDeAnimo(max_emotion)
                        setRecomendacion(posts['recomendacion'])
                    }
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
        setNoDiary(true)
        setHideText(false)
        fetch_posts();
    });

    function actionSheet(get_detail) {
        if (get_detail['role'] != 'backdrop') {
            fetch(`http://127.0.0.1:8000/api/publicacion/delete?id_publicacion=${get_detail['data'].id}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUzY2JjZGQ3YzBiOTYyZTEzZWVhOWNjNTg0NDIxZTQ3YWZlZWQ4NGQ2Mzk3MzJhNzg0ZTE4ZGUwYmIwNTExMTlhYmJlZWNjOTRjODEyMmQiLCJpYXQiOjE3MTcyODIwNzQuMTYzNjI3LCJuYmYiOjE3MTcyODIwNzQuMTYzNjMxLCJleHAiOjE3NDg4MTgwNzQuMDY2MzY3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.J_m8LTlYpAp-SEG8X19mqxjJZU0F0pHJlDy4A_DVZRDsiJClo95nZ4Ydzdq7Fwdn2n_8mtMplCtqdwjsBF1a4H7YtbqFBqis4DVWDrBQTTB1YZ0fo750ShyXk-MaZ0h_WzLFWv0SKQKuDoz8inWUYzQCZCiZnIbmWC9SA3cdWp3NR1eXrSUNpC3TI5ZY7OzzoXd15frTgOQcCA-K8jp4dvOSD_FsSc7ZlpcMPef_-If0tDolU8bS-n7LGckf-bXITI0O0q1YidWp-g6w9IXo3x9x2KcIzQi-hEpwoTSLXzkTZ10uhnQcLk367Fs1rHyAFYIjwYbDuBvM_WkvdUmqBCR0iFyP5tERksQfGDc1nFKKk-vwqQxDqRnGdHf5olsiZAxPXUYnySGYgGljVJUfanDy3h-L-RBMbZiS3yh2Xq8qKtC5l1e2eOk3qPaCsVqBCjiRLp2oLWobIa3qPTyHq4-glAh9XEr_X5LXxcWXZ8VFko3QXj--pqLMdHFo9Hy2GrGL41Cz39rPEpbx5NkJgXbBJI-WH-JCkJNALw-V4LpZy2jSsK3Y6WCJMzx5RKdnoXUEVszHy4ya_7AdIBboXfM0nMydF6oKtk3Zf0q2VLoLvXW8GKnuT7QjjYtArf_KVpxFVM3dfjKj9wpbpUwH115Jp71r0AIlNpIvUU1f38w',
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
                    <IonProgressBar className={`${!isLoading && 'ion-hide'} `} type="indeterminate" id="progressBar"></IonProgressBar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={`${!isLoading && 'ion-hide'}`}>
                    <div className="ion-text-center">
                        <h3>{textLoading}</h3>
                        {subtextLoading}
                    </div>
                </div>
                <IonCard className={`${isLoading && 'ion-hide'} ion-padding`}>
                    {noDiary && (
                        <IonCardContent>

                            <IonGrid>
                                <IonRow>
                                    <IonCol><h3>No has publicado estados en los ultimos 7 días</h3></IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="auto"><IonButton color="tertiary" onClick={() => { router.push('/estado/analisis'); }}>Ver Análisis</IonButton></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    )}
                    {!noDiary && (
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol><h3>Has publicado {numEstados} estados en los ultimos 7 días</h3></IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="auto"><h4>Color Predominante:</h4></IonCol>
                                    <IonCol><div className={`colorPredominante ${estado_de_animo == "ira" && "anger"} ${estado_de_animo == "sorpresa" && "surprise"} ${estado_de_animo == "disgusto" && "disgust"} ${estado_de_animo == "felicidad" && "happiness"} ${estado_de_animo == "tristeza" && "sadness"} ${estado_de_animo == "miedo" && "fear"}`}></div></IonCol>
                                </IonRow>
                            </IonGrid>
                            <IonButton color="tertiary" onClick={() => { router.push('/estado/analisis'); }}>Ver Análisis</IonButton>
                        </IonCardContent>

                    )}
                </IonCard>
                {
                    !noDiary && (
                        <IonCard>
                            <IonCardHeader>
                                <h4>Consejos y Motivaciones</h4>
                            </IonCardHeader>
                            <IonCardContent>
                                <h5>{recomendacion}</h5>
                            </IonCardContent>
                        </IonCard>

                    )
                }
                {posts.map((post) => (
                    <IonCard className="estadosCard ion-padding ion-margin-horizontal " key={post.id}>
                        <IonCardSubtitle>
                            <IonRow>
                                <IonCol size="auto">
                                    <IonText color="dark">Estado N°{post.numero} </IonText>
                                </IonCol>
                                <IonCol>
                                    <IonButton className="ion-float-right" id={"action_es_" + post.id} shape="round" size="small" fill="clear"><IonIcon icon={ellipsisVertical} slot="icon-only"></IonIcon></IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardSubtitle>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="auto">
                                    <div className="fechaDiv">
                                        <span className="textDiaMes">{post.dia}<br />{post.mes}</span> <br />
                                        <span className="textAnio">{post.año}</span>
                                    </div>
                                </IonCol>
                                <IonCol><p className="textPub">{post.publicacion}</p></IonCol>
                            </IonRow>
                        </IonGrid>
                        <div className="ion-text-center">
                            <IonProgressBar value={1} className={`${post.estado_de_animo == "ira" && "anger"} ${post.estado_de_animo == "sorpresa" && "surprise"} ${post.estado_de_animo == "disgusto" && "disgust"} ${post.estado_de_animo == "felicidad" && "happiness"} ${post.estado_de_animo == "tristeza" && "sadness"} ${post.estado_de_animo == "miedo" && "fear"}`}></IonProgressBar>
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

export default crear_estado;
