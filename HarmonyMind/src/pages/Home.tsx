import { IonContent, IonHeader, IonPage, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonButton } from '@ionic/react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';
import Toolbar from './components/toolbar';

const Home: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null);
  
  
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent ref={contentRef} scrollEvents={true}>
        <IonCard className="welcomeImage">
          <img src="/assets/WelcomeImage.jpg" alt="" />
          <IonCardHeader>
            <IonCardTitle>Welcome!</IonCardTitle>
            <IonCardSubtitle>HarmonyMind</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Cuentanos sobre tu día:
            <IonButton className="boton-estado" expand='block'>
              <Link to="/estados" className='bitacora'>Ir a bitácora</Link>
            </IonButton>
          </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
