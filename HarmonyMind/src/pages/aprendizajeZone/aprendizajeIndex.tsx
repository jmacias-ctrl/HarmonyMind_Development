import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonButton, IonToolbar, IonList,IonButtons, IonItem, IonCard, IonCardHeader,IonCardContent,IonCardTitle,IonCardSubtitle, IonLabel } from '@ionic/react';
import Psicologica from './components/psicologica';
import Relaxation from './components/Relaxation';
import Autoayuda from './components/autoayuda';
import LogoutButton from "../auth/Logout";
import { Link } from 'react-router-dom'; 

const Learning: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aprendizaje</IonTitle>
                    <IonButtons slot="end">
                    <LogoutButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonCard className="welcomeImage">
          <img src="/assets/learningImage.jpg" alt="" />
          <IonCardHeader>
            <IonCardTitle>¿Qué quieres aprender hoy?</IonCardTitle>
            <IonCardSubtitle>HarmonyMind</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Revisa Nuestras secciones:

          </IonCardContent>
        </IonCard>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2>Psicológicas</h2>
                        </IonLabel>
                    </IonItem>
                    <Psicologica />
                    <IonItem>
                        <IonLabel>
                            <h2>Relajación</h2>
                        </IonLabel>
                    </IonItem>
                    <Relaxation />
                    <IonItem>
                        <IonLabel>
                            <h2>Canles Recomendados</h2>
                        </IonLabel>
                    </IonItem>
                    <Autoayuda />
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Learning;