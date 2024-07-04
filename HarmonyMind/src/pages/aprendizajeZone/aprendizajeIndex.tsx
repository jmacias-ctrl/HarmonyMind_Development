import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LearningList: React.FC = () => {
  const [learnings, setLearnings] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchLearnings();
  }, []);

  const fetchLearnings = () => {
    fetch('http://localhost:8000/api/learning', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLearnings(data);
      })
      .catch(error => {
        console.error('There was an error fetching the learnings!', error);
      });
  };

  const handleItemClick = (id: number) => {
    history.push(`/learning-detail/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Learnings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {learnings.map((learning) => (
            <IonItem key={learning.id} onClick={() => handleItemClick(learning.id)}>
              <IonLabel>{learning.titulo}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LearningList;

