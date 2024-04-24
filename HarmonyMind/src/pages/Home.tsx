import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const handleGoToLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={handleGoToLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;