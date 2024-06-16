import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useEffect, useState } from 'react';

const Tab1: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Asumiendo que el nombre de usuario está guardado en localStorage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bienvenido a HarmonyMind</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={`Bienvenido${username ? `, ${username}` : ''}`} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
