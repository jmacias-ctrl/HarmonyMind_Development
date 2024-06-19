import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonButtons, IonToolbar, IonList, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonLabel } from '@ionic/react';
import LogoutButton from "../auth/Logout";

interface Learning {
    id: string;
    titulo: string;
    descripcion: string;
    fecha_publicacion: string;
    categoria_learning_id: number;
}

const LearningPage: React.FC = () => {
    const [learningItems, setLearningItems] = useState<Learning[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLearningItems = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/learning');
                if (!response.ok) {
                    throw new Error('Error fetching learning items');
                }
                const data = await response.json();
                setLearningItems(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchLearningItems();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aprendizaje</IonTitle>
                    <IonButtons slot="end">
                        <LogoutButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className="welcomeImage">
                    <img src="/assets/learningImage.jpg" alt="" />
                    <IonCardHeader>
                        <IonCardTitle>¿Qué quieres aprender hoy?</IonCardTitle>
                        <IonCardSubtitle>HarmonyMind</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Revisa Nuestras secciones:
                    </IonCardContent>
                </IonCard>
                {error && <p>Error: {error}</p>}
                <IonList>
                    {learningItems.map((item) => (
                        <IonItem key={item.id}>
                            <IonLabel>
                                <h2>{item.titulo}</h2>
                                <p>{item.descripcion}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default LearningPage;
