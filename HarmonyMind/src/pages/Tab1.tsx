import { IonContent, IonGrid, IonPage, IonRow, IonCol,IonButton, 
  IonHeader, IonInput, IonItem, IonList,  
  IonIcon} from '@ionic/react';
  import { personOutline,lockClosedOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
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
        <ExploreContainer name="Bienvenido" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
