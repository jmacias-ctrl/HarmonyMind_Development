import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';

const RecommendedVideos: React.FC = () => {
    return (
        <>
            <IonItem>
                <IonLabel>
                    <h3>AutoAyuda 1</h3>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <h3>Autoayuda 2</h3>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <h3>Autoayuda3 3</h3>
                </IonLabel>
            </IonItem>
        </>
    );
};

export default RecommendedVideos;
