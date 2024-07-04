import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonLabel, IonLoading, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';

const LearningDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [learning, setLearning] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLearningDetails(id);
  }, [id]);

  const fetchLearningDetails = (id: string) => {
    fetch(`http://localhost:8000/api/learning/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLearning(data.data); // Assuming the API response structure is { success: true, data: { learning details } }
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the learning details!', error);
        setLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de Aprendizaje</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message={'Cargando datos...'} />
        
        {Object.keys(learning).length > 0 ? ( // Check if learning object is not empty
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{learning.titulo}</IonCardTitle>
              <IonCardSubtitle>{learning.fecha_publicacion}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>{learning.descripcion}</IonLabel>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>No se encontraron detalles de aprendizaje</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        )}
        
      </IonContent>
    </IonPage>
  );
};

export default LearningDetail;
