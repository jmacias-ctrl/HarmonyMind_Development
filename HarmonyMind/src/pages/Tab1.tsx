import React, { useState, useRef } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonThumbnail } from '@ionic/react';
import { Link } from 'react-router-dom'; 
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import './Tab1.css';

const Tab1: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null);
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
      <IonContent ref={contentRef} fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Aviso</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>HarmonyMind hace uso del estudio de las emociones realizado por el doctor Paul Ekman titulado "El Atlas de las emociones", para más información <a href="https://atlasofemotions.org/#introduction/">haz click aquí</a>. </IonCardContent>
        </IonCard>
        <IonCard color={`${countEstados== 0? 'warning' : 'success'}`}>
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
        <IonCard className='ion-padding ion-margin-top'>
          <IonCardHeader>
            <IonCardTitle>Bienvenido {username}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>¿Qué deseas hacer hoy?

            <IonList>
              <IonItem href="/estado/ver">
                <IonThumbnail slot="start" >
                  <img alt="Bitácora" src="/assets/inicio_iconos/diario.jpg" />
                </IonThumbnail>
                <IonLabel>Ir a mi Bitácora</IonLabel>
              </IonItem>

              <IonItem href="/eventos/ver">
                <IonThumbnail slot="start">
                  <img alt="Eventos" src="/assets/inicio_iconos/eventos.png" />
                </IonThumbnail>
                <IonLabel>Ver Eventos</IonLabel>
              </IonItem>

              <IonItem href="/aprendizajeIndex" >
                <IonThumbnail slot="start">
                  <img alt="Aprendizaje" src="/assets/inicio_iconos/aprendizaje.png" />
                </IonThumbnail>
                <IonLabel>Ir a la Sección de Aprendizaje</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
          <img src="/assets/WelcomeImage.jpg" alt="" />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
