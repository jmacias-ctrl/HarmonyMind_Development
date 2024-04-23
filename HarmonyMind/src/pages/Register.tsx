import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC= () =>{
    return(
    <IonPage>
        <IonHeader>
            Hello
        </IonHeader>
        <IonContent className='ion-padding'>
            <div className='circle1'>
            </div>
            ionic is cool 
        </IonContent>
    </IonPage>
    
    )
}

export default Home;
