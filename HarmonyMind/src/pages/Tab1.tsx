import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonThumbnail } from '@ionic/react';
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import './Tab1.css';

const Tab1: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [textLoading, setTextLoading] = useState('Recuperando Estados')
  const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
  const [countEstados, setCountEstados] = useState(0);
  const [username, setUsername] = useState('none');
  const fetch_posts = () => {
    if (isLoading == true) {
      fetch(`http://127.0.0.1:8000/api/inicio`, {
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
          setTextLoading('Error al recuperar estados')
          setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor intentelo denuevo más tarde.')
        })
        .then((posts) => {
          setCountEstados(posts['countEstados'].count_estados);
          setUsername(posts['username'])
          setLoading(false)
        })

    }
  };
  useIonViewWillEnter(() => {
    setLoading(true)
    fetch_posts();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>HarmonyMind</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Aviso</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>Para la creación de HarmonyMind y el uso de las emociones, se baso en el estudio realizado por el doctor Paul Ekman titulado "El Atlas de las emociones", para más información <a href="https://atlasofemotions.org/#introduction/">haz click aquí</a>. </IonCardContent>
        </IonCard>
        <IonCard className='ion-padding ion-margin-top'>
          <IonCardHeader>
            <IonCardTitle>Bienvenido {username}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>¿Qué deseas hacer hoy?

            <IonList>
              <IonItem href="/estado/ver">
                <IonThumbnail slot="start" >
                  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail>
                <IonLabel>Ver y crear estados</IonLabel>
              </IonItem>

              <IonItem href="/eventos/ver">
                <IonThumbnail slot="start">
                  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail>
                <IonLabel>Ver Eventos</IonLabel>
              </IonItem>

              <IonItem href="#" >
                <IonThumbnail slot="start">
                  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail>
                <IonLabel>Aprendizaje</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonCard color={`${countEstados== 0? 'warning' : 'success'}`}>
          <IonCardHeader>
            <IonCardTitle>Estado</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {
            countEstados == 0 && (
              <p>No has publicado estados en las ultimas 24 horas</p>
                
            )
            
          }
          {
            countEstados > 0 && (
              <p>Has publicado {countEstados} estados en las ultimas 24 horas</p>
            )
            
          }
          
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
