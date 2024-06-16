import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';

const Psychological: React.FC = () => {
    return (
        <>
            <IonItem>
                <IonLabel>
                    <h3><a href="https://link-to-article-1.com" target="_blank" rel="noopener noreferrer">Artículo 1 sobre Psicología</a></h3>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <h3><a href="https://link-to-article-2.com" target="_blank" rel="noopener noreferrer">Artículo 2 sobre Psicología</a></h3>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <h3><a href="https://link-to-article-3.com" target="_blank" rel="noopener noreferrer">Artículo 3 sobre Psicología</a></h3>
                </IonLabel>
            </IonItem>
        </>
    );
};

export default Psychological;