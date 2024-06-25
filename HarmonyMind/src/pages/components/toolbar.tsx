import { IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import React from 'react';
import LogoutButton from '../auth/Logout';
import { logoGithub } from 'ionicons/icons';

const Toolbar: React.FC = () => {
    return(
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle slot="end">HarmonyMind</IonTitle>
            <IonButtons slot="end">
            <LogoutButton />
            </IonButtons>
        </IonToolbar>
    );
};

export default Toolbar;