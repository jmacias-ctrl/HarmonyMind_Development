import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonProgressBar, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading } from '@ionic/react';
import { IonFab, IonGrid, IonRow, IonCol, IonFabButton, useIonToast } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';
import { ellipsisVertical } from 'ionicons/icons';

import './ver_estados.css';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [toastCreate] = useIonToast();
    const { status } = useParams<{ status: string }>();
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/publicacion/get`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2RhY2IzMjRmNzA2YTFmYWUzMTM2YmM1OGZlZTVkOGM0NjUwMjZiMjNjYWQwMGMxMDNjN2Y3Y2RkNmEwZjM5NTgxNzA3YWY3ZDNkZjUxZWIiLCJpYXQiOjE3MTQ1MjE3NzguODUwMjQsIm5iZiI6MTcxNDUyMTc3OC44NTAyNDMsImV4cCI6MTc0NjA1Nzc3OC43NzI0MTgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iDenrINDElnsv6pvbZnTnIUg1MxeD-iTdpydD7ciLVZ9tm9_UGQ4Wg8IS0lAYF5sGHun2Vz6iqGu71Bm74M8bk6gNGQbvX-IMktUwu8E0KVGty6JT5vHNs3WM45klDbBSUtwY6RmrSMsn2Ep3o_Ua9QEYLz9Gtpo8dcddkCXK1kR0nlSWb8QdbyHAibFLrtwEMQk7w4lffgttjL1VQdIV7QjdkjYtemSBFJO5AElA_8pwtd4bBK-xG_Zks_JNYg0I9IHrhAnCwjudhT-bH5MDnj2b5OHL33eXhuVQEd7VlljVUK7ATUwDhrIwyzJs0YYvLLxuy09sqxfHzPIEVKfPIDZ5qQT6JoseHXvreG1gqbhzplAxXpN-PQUWgjss6OjaQJXxVWDbPzkfYaa4D4V-_L9ExJI4X4QMnbgyWvpm67qxbBrnZ2isRvVeC90W9mwZVD-u7iL88qukRlvx1zTBvVEE3ieICMmbuzZr65gCUCQSk1M8N9BKVsDCihGhrNZEsPld2aCVQ28Zh7KkXAlVqTXOvsNhWhKp71LywHIdXeNuEUMd2mn8mevZE30mSczYv3lm-jYZ709pb3tC9GVRjDvaaDEYi3LAf5HrUI_PRsImkD5aNG8WikQ2U7K4ZzTDR90WhYe8-JeDajX3Qq8HUJrxkReSGlN-tLckTR6E5k',
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
                    setPosts(posts['data']);
                    setLoading(false)
                })

        }
    };

    function actionSheet(get_detail) {
        if (get_detail['role'] != 'backdrop') {
            fetch(`http://127.0.0.1:8000/api/publicacion/delete?id_publicacion=${get_detail['data'].id}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2RhY2IzMjRmNzA2YTFmYWUzMTM2YmM1OGZlZTVkOGM0NjUwMjZiMjNjYWQwMGMxMDNjN2Y3Y2RkNmEwZjM5NTgxNzA3YWY3ZDNkZjUxZWIiLCJpYXQiOjE3MTQ1MjE3NzguODUwMjQsIm5iZiI6MTcxNDUyMTc3OC44NTAyNDMsImV4cCI6MTc0NjA1Nzc3OC43NzI0MTgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iDenrINDElnsv6pvbZnTnIUg1MxeD-iTdpydD7ciLVZ9tm9_UGQ4Wg8IS0lAYF5sGHun2Vz6iqGu71Bm74M8bk6gNGQbvX-IMktUwu8E0KVGty6JT5vHNs3WM45klDbBSUtwY6RmrSMsn2Ep3o_Ua9QEYLz9Gtpo8dcddkCXK1kR0nlSWb8QdbyHAibFLrtwEMQk7w4lffgttjL1VQdIV7QjdkjYtemSBFJO5AElA_8pwtd4bBK-xG_Zks_JNYg0I9IHrhAnCwjudhT-bH5MDnj2b5OHL33eXhuVQEd7VlljVUK7ATUwDhrIwyzJs0YYvLLxuy09sqxfHzPIEVKfPIDZ5qQT6JoseHXvreG1gqbhzplAxXpN-PQUWgjss6OjaQJXxVWDbPzkfYaa4D4V-_L9ExJI4X4QMnbgyWvpm67qxbBrnZ2isRvVeC90W9mwZVD-u7iL88qukRlvx1zTBvVEE3ieICMmbuzZr65gCUCQSk1M8N9BKVsDCihGhrNZEsPld2aCVQ28Zh7KkXAlVqTXOvsNhWhKp71LywHIdXeNuEUMd2mn8mevZE30mSczYv3lm-jYZ709pb3tC9GVRjDvaaDEYi3LAf5HrUI_PRsImkD5aNG8WikQ2U7K4ZzTDR90WhYe8-JeDajX3Qq8HUJrxkReSGlN-tLckTR6E5k',
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

    useEffect(() => {
        console.log(status);
        if (status == "true") {
            toastCreate({
                message: '¡Estado creado de manera correcta!',
                duration: 1500,
                position: 'bottom',
            });
        } else if (status == "false") {
            toastCreate({
                message: 'No se ha podido crear el estado',
                duration: 1500,
                position: 'bottom',
            });
        }
        fetch_posts();
    }, []);
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tus Estados</IonTitle>
                    <IonProgressBar className={`${!isLoading && 'ion-hide'}`} type="indeterminate" id="progressBar"></IonProgressBar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={`${!isLoading && 'ion-hide'}`}>
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
                                    <IonButton class="ion-float-right" id={"action_" + post.id} shape="round" size="small" fill="clear"><IonIcon icon={ellipsisVertical} slot="icon-only"></IonIcon></IonButton>
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
                            trigger={"action_" + post.id}
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
                    <IonFabButton onClick={() => { router.push('/estado/crear'); }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>

        </IonPage>

    );
};

export default crear_estado;
