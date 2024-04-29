import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonButton,IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonTextarea, IonInput, IonRange, IonItem, IonList, IonIcon } from '@ionic/react';
import { snowOutline, sunnyOutline } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
const crear_estado: React.FC = () => {

    //const [contenido, setContenido] = useState('')

    function crear_publicacion(){
        console.log("test")
    };

    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crear un estado</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard class="ion-padding">
                    <IonCardHeader>
                        <IonCardTitle>Expresa tus sentimientos y pensamientos que tengas en el momento</IonCardTitle>
                    </IonCardHeader>
                    <h3>Contenido</h3>
                    <IonList>
                        <IonItem>
                            <IonTextarea aria-label="Comments" fill="solid" name="contenido"></IonTextarea>
                        </IonItem>
                    </IonList>
                    
                    <h3>Estado De Animo</h3>
                    <IonRange aria-label="Temperature" name="estado_de_animo" min={0} max={10} value={5} pin={true} ticks={true} snaps={true}>
                        <IonIcon slot="start" icon={snowOutline}></IonIcon>
                        <IonIcon slot="end" icon={sunnyOutline}></IonIcon>
                    </IonRange>

                    <IonButton class="ion-margin-top" name="buttonCrear" onClick={crear_publicacion()}>Crear</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default crear_estado;
