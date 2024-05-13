import { IonContent, IonGrid, IonPage, IonRow, IonCol,IonButton, 
  IonHeader, IonInput, IonItem, IonList,  
  IonIcon} from '@ionic/react';
  import { personOutline,lockClosedOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid className='formContainer'>
            <h1>Iniciar Sesión</h1>
          <IonRow>
            <IonCol size='12' size-md='7'>
              <form action="" className='loginForm'>
                <IonInput
                name='Username'
                className='inputFields'
                >
                   <div slot='label'>
                    <IonIcon icon={personOutline}></IonIcon>
                    </div> 
                </IonInput>
                <IonInput
                name='Nombre' 
                type='password'
                className='inputFields'
                > 
                <div slot='label'>
                  <IonIcon icon={lockClosedOutline}></IonIcon>
                </div>
                </IonInput>
                  <IonButton shape='round'className='button' expand='full'>
                      Iniciar Sesión
                  </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
    </IonContent>
  </IonPage>


  );
};

export default Tab1;
