import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem } from '@ionic/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LearningDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [learning, setLearning] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/learning/${id}`)
      .then(response => {
        setLearning(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the learning!', error);
      });
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Learning Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {learning && (
          <>
            <IonItem>
              <IonLabel>Título: {learning.titulo}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Descripción: {learning.descripcion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Fecha de Publicación: {learning.fecha_publicacion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Categoría: {learning.categoria_learning_id}</IonLabel>
            </IonItem>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LearningDetail;
