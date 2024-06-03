import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonInput } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
const perfil: React.FC = () => {

  const [contact, setContact] = useState(1);
  const [posts, setPosts] = useState({});
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [number, setNumber]= useState("");

    const fetch_posts = () => {
      if (isLoaded == false) {
        console.log('hola')
        
        fetch(`http://127.0.0.1:8000/api/emergency_contact/get`, {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiOTNhZjlkNjAyNjY2OTYxNDU0NWUyNGU3MDA4NGFmYTVlMzA1MWNjMDAwNDJhNTgxOTZiOWQwYWJkYjBkMjM1YmI4MTE3MTRiYzY2MGZjMzkiLCJpYXQiOjE3MTczNjMxOTUuNjc0NjkxLCJuYmYiOjE3MTczNjMxOTUuNjc0NywiZXhwIjoxNzQ4ODk5MTk0LjI1NDg4NSwic3ViIjoiMSIsInNjb3BlcyI6W119.UACc5zfN9gjSzgEtcqyDoc2H_-2pp41ElWMdXfLBRonqOxw4KIipiUKsTBjKigonKfFxhHHaTcgW6q0Sgl6SHOrdk2JFm0_3kOqOa0KwSd_-q0Pz90shDDqgXLU0z3Gdr7xZDTGPhGyhasoTwrV8QCTe4cC3DS0b8F5bGqWXyVfzfh6Weu2ulb98vomHrtuFDx0lOJYZ-leA1t2rG-cEEj5bHPWPPWFPKzZcvXGfZezOGzseNxJoYYIpKwwWrTtkmHVCD-9anrnfE9oMOKgwDbxd-BcOZT-I1y_KnVOwE5VsUMD6P7Ceb3UEObozggztnqXcdU-2pwUmBk3FR_lTWg8GGipWDfAmtQ84h-RrV1B81UJyNZp-qrRiAUNKwOE2-hkCmATK8EGQt5_er5St5LeQeJU3BuUY7t9-zgpLeDDWf8H-PSKrES8cQJRgau60kROTNpinPsshfwi9-ZLxNbNoaKh0CF30xcIqD2rcbttciKRRxC-RbQZpKQP8HzsRnncVyLBYd9158dl21_wqmv7KAGC9fvgho4vNvV-PKeEjVPaJ0EZMKPAwqI2vtNz_6i3HKsNyjA0a0xIL6yEPjRtJlY_yOdlmHUr1mhKLLr3Txw10ab0jqvZNiZ5al0V4vXd6ejKo7hwDwHsGzChmtYEKMeOMzbzg3spRjmvoUCA',
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((posts) => {
                setPosts(posts["data"]);
                setLoaded(true);
                setContacts(posts["data2"])
                setName(posts.data.name)
                setEmail(posts.data.email)
                
                
            });

      }
    };


    
    useEffect(() => {
        fetch_posts();
    }, []);

    function contactAdd(new_contact){
      console.log('start');
      fetch(`http://127.0.0.1:8000/api/emergency_contact/add?number=${new_contact}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiOTNhZjlkNjAyNjY2OTYxNDU0NWUyNGU3MDA4NGFmYTVlMzA1MWNjMDAwNDJhNTgxOTZiOWQwYWJkYjBkMjM1YmI4MTE3MTRiYzY2MGZjMzkiLCJpYXQiOjE3MTczNjMxOTUuNjc0NjkxLCJuYmYiOjE3MTczNjMxOTUuNjc0NywiZXhwIjoxNzQ4ODk5MTk0LjI1NDg4NSwic3ViIjoiMSIsInNjb3BlcyI6W119.UACc5zfN9gjSzgEtcqyDoc2H_-2pp41ElWMdXfLBRonqOxw4KIipiUKsTBjKigonKfFxhHHaTcgW6q0Sgl6SHOrdk2JFm0_3kOqOa0KwSd_-q0Pz90shDDqgXLU0z3Gdr7xZDTGPhGyhasoTwrV8QCTe4cC3DS0b8F5bGqWXyVfzfh6Weu2ulb98vomHrtuFDx0lOJYZ-leA1t2rG-cEEj5bHPWPPWFPKzZcvXGfZezOGzseNxJoYYIpKwwWrTtkmHVCD-9anrnfE9oMOKgwDbxd-BcOZT-I1y_KnVOwE5VsUMD6P7Ceb3UEObozggztnqXcdU-2pwUmBk3FR_lTWg8GGipWDfAmtQ84h-RrV1B81UJyNZp-qrRiAUNKwOE2-hkCmATK8EGQt5_er5St5LeQeJU3BuUY7t9-zgpLeDDWf8H-PSKrES8cQJRgau60kROTNpinPsshfwi9-ZLxNbNoaKh0CF30xcIqD2rcbttciKRRxC-RbQZpKQP8HzsRnncVyLBYd9158dl21_wqmv7KAGC9fvgho4vNvV-PKeEjVPaJ0EZMKPAwqI2vtNz_6i3HKsNyjA0a0xIL6yEPjRtJlY_yOdlmHUr1mhKLLr3Txw10ab0jqvZNiZ5al0V4vXd6ejKo7hwDwHsGzChmtYEKMeOMzbzg3spRjmvoUCA',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((info) => {
                    console.log(info)
                    if (info['success'] == true) {
                      window.location.reload();
                    }
                });
      
      
    };

    function contactDelete(new_contact){
      console.log('start');
      fetch(`http://127.0.0.1:8000/api/emergency_contact/delete?number=${new_contact}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiOTNhZjlkNjAyNjY2OTYxNDU0NWUyNGU3MDA4NGFmYTVlMzA1MWNjMDAwNDJhNTgxOTZiOWQwYWJkYjBkMjM1YmI4MTE3MTRiYzY2MGZjMzkiLCJpYXQiOjE3MTczNjMxOTUuNjc0NjkxLCJuYmYiOjE3MTczNjMxOTUuNjc0NywiZXhwIjoxNzQ4ODk5MTk0LjI1NDg4NSwic3ViIjoiMSIsInNjb3BlcyI6W119.UACc5zfN9gjSzgEtcqyDoc2H_-2pp41ElWMdXfLBRonqOxw4KIipiUKsTBjKigonKfFxhHHaTcgW6q0Sgl6SHOrdk2JFm0_3kOqOa0KwSd_-q0Pz90shDDqgXLU0z3Gdr7xZDTGPhGyhasoTwrV8QCTe4cC3DS0b8F5bGqWXyVfzfh6Weu2ulb98vomHrtuFDx0lOJYZ-leA1t2rG-cEEj5bHPWPPWFPKzZcvXGfZezOGzseNxJoYYIpKwwWrTtkmHVCD-9anrnfE9oMOKgwDbxd-BcOZT-I1y_KnVOwE5VsUMD6P7Ceb3UEObozggztnqXcdU-2pwUmBk3FR_lTWg8GGipWDfAmtQ84h-RrV1B81UJyNZp-qrRiAUNKwOE2-hkCmATK8EGQt5_er5St5LeQeJU3BuUY7t9-zgpLeDDWf8H-PSKrES8cQJRgau60kROTNpinPsshfwi9-ZLxNbNoaKh0CF30xcIqD2rcbttciKRRxC-RbQZpKQP8HzsRnncVyLBYd9158dl21_wqmv7KAGC9fvgho4vNvV-PKeEjVPaJ0EZMKPAwqI2vtNz_6i3HKsNyjA0a0xIL6yEPjRtJlY_yOdlmHUr1mhKLLr3Txw10ab0jqvZNiZ5al0V4vXd6ejKo7hwDwHsGzChmtYEKMeOMzbzg3spRjmvoUCA',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((info) => {
                    console.log(info)
                    if (info['success'] == true) {
                      window.location.reload();
                    }
                });
      
      
    };

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil del usuario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonList lines="full">
              <IonItem>
                <IonLabel>Nombre: {name}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Email: {email}</IonLabel>
              </IonItem>

              <IonItem>
                <IonInput slot="start" label="Nuevo contacto" placeholder="Ingrese aquí" onIonChange={(e: any) => setNumber(e.target.value)}></IonInput>
                <IonButton slot="start" color="success" onClick={() => contactAdd(number)}><IonIcon icon={add}></IonIcon></IonButton>
              </IonItem>

              <IonItem>

                <IonList lines="full">
                {contacts.map((contact) => (
                    <IonItem>
                    <IonLabel>{contact.number}</IonLabel>
                    <IonButton slot="end" color="danger" onClick={() => contactDelete(contact.number)}><IonIcon icon={trash}></IonIcon></IonButton>
                  </IonItem>
                ))}

                </IonList>

              </IonItem>
            </IonList>
            

              
            

            </IonContent>
            

        </IonPage>

    );
};

export default perfil;