import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonLabel } from '@ionic/react';
import LogoutButton from "../auth/Logout";
import { Link } from 'react-router-dom'; 
import './learning.css';

const Learning: React.FC = () => {
  const [learnings, setLearnings] = useState<any[]>([]);

  useEffect(() => {
    fetchLearnings();
  }, []);

  const fetchLearnings = () => {
    fetch('http://192.168.1.6:8000/api/learning', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
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

  const renderLearningItems = (categoryId: number, cardColor: string) => {
    const filteredLearnings = learnings.filter(learning => learning.categoria_learning_id === categoryId);

    return (
      <IonCard className={`learningCard ${cardColor}`}>
        <IonCardHeader>
          <IonCardTitle>{getCategoryName(categoryId)}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList className="cardList">
            {filteredLearnings.map(learning => (
              <Link key={learning.id} to={`/learning-detail/${learning.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <IonItem>
                  <IonLabel>{learning.titulo}</IonLabel>
                </IonItem>
              </Link>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  };

  const getCategoryName = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return 'Psicológicas';
      case 2:
        return 'Relajación';
      case 3:
        return 'Canales Recomendados';
      default:
        return 'Otra categoría';
    }
  };

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

        {renderLearningItems(1, 'blueCard')}
        {renderLearningItems(2, 'greenCard')}
        {renderLearningItems(3, 'yellowCard')}
        
      </IonContent>
    </IonPage>
  );
};

export default Learning;
