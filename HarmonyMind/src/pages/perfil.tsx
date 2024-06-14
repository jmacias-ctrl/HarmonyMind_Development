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
  const [buttonState, setButtonState]= useState(true);

    const fetch_posts = () => {
      if (isLoaded == false) {
        console.log('hola')
        
        fetch(`http://127.0.0.1:8000/api/emergency_contact/get`, {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY2ZGY4NGIyMGQ1OGNmNTZmMjRjYWFiMTY3YmQxOTliOGZlMjFmYTNiYTc2ZTFhYWVkY2E3NDBhNTAxN2I5MTViMDE0NzFjYTYyNjE3M2U5IiwiaWF0IjoxNzE4MjMyMzA0LjMwNTMzLCJuYmYiOjE3MTgyMzIzMDQuMzA1MzM0LCJleHAiOjE3NDk3NjgzMDMuNDA5NDA4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Mbg32oi0E4kpwprmcDY0Rx7PlHwEXS8vPThf1Q7TlfK2W8uPWmEChGiNlvRkwXBOlyXuAAwvXA4kOO1phYAvFoBWbA3RwX7AK-B8nb0_6wp79jJ3n2BaI-JMw909uDR0fgRr5uerTYBbn5ZQ0aXrYTuDQcQDce9wFa4702iGrczwbgt9Lnn4mLMHD8-OeuAbch5foV3Hp3TdbVc2bzfl5BP84u6KGUaJFLZPJkAcQRftq4zGnhea_mIlHZjvyGUOlo1c5o3to-avN0gAgjrYztNgy1BJkEWDXzl6FwS05cNGJyHSmKWPI0XWc-vYcmK0ErUqLg6ysflV7pcXfdh61EpSXcD60oj7njNF15G82KAc6S0pkV89nYDBy7Ld62kEZPXJZC8H-IaiOB4odNRNLhaH0giMu5vVH-kT-pqZJcC1ULjyF_x5JY6CRlN6h30wZaA4cnoAGLs0kuduE6tKXvnT9-GRKt_RVGtU1mB1NIAIV3bWQwsGU5Z1CBzBS__tWBZEX05s66Pk1N8esWj5xK4W-tMYb9CfFGVaSxFIYPuuDzNdufKQPxaPnm8B0SvThm0veoyKcTWlhbFJsbBr85lW_0wkgH9KCQ6_j6pHuF0a_OdcP4TGRD9m7SHwnnKyrf9dTs-Pou5fPtfzL4IeJmbcx7Y2Y8VZ0UGLj3G7Pi4',
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
      fetch(`http://127.0.0.1:8000/api/emergency_contact/add?number=%2b56${new_contact}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY2ZGY4NGIyMGQ1OGNmNTZmMjRjYWFiMTY3YmQxOTliOGZlMjFmYTNiYTc2ZTFhYWVkY2E3NDBhNTAxN2I5MTViMDE0NzFjYTYyNjE3M2U5IiwiaWF0IjoxNzE4MjMyMzA0LjMwNTMzLCJuYmYiOjE3MTgyMzIzMDQuMzA1MzM0LCJleHAiOjE3NDk3NjgzMDMuNDA5NDA4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Mbg32oi0E4kpwprmcDY0Rx7PlHwEXS8vPThf1Q7TlfK2W8uPWmEChGiNlvRkwXBOlyXuAAwvXA4kOO1phYAvFoBWbA3RwX7AK-B8nb0_6wp79jJ3n2BaI-JMw909uDR0fgRr5uerTYBbn5ZQ0aXrYTuDQcQDce9wFa4702iGrczwbgt9Lnn4mLMHD8-OeuAbch5foV3Hp3TdbVc2bzfl5BP84u6KGUaJFLZPJkAcQRftq4zGnhea_mIlHZjvyGUOlo1c5o3to-avN0gAgjrYztNgy1BJkEWDXzl6FwS05cNGJyHSmKWPI0XWc-vYcmK0ErUqLg6ysflV7pcXfdh61EpSXcD60oj7njNF15G82KAc6S0pkV89nYDBy7Ld62kEZPXJZC8H-IaiOB4odNRNLhaH0giMu5vVH-kT-pqZJcC1ULjyF_x5JY6CRlN6h30wZaA4cnoAGLs0kuduE6tKXvnT9-GRKt_RVGtU1mB1NIAIV3bWQwsGU5Z1CBzBS__tWBZEX05s66Pk1N8esWj5xK4W-tMYb9CfFGVaSxFIYPuuDzNdufKQPxaPnm8B0SvThm0veoyKcTWlhbFJsbBr85lW_0wkgH9KCQ6_j6pHuF0a_OdcP4TGRD9m7SHwnnKyrf9dTs-Pou5fPtfzL4IeJmbcx7Y2Y8VZ0UGLj3G7Pi4',
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
      console.log(new_contact);
      fetch(`http://127.0.0.1:8000/api/emergency_contact/delete?id=${new_contact}`, {
                "method": "POST",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY2ZGY4NGIyMGQ1OGNmNTZmMjRjYWFiMTY3YmQxOTliOGZlMjFmYTNiYTc2ZTFhYWVkY2E3NDBhNTAxN2I5MTViMDE0NzFjYTYyNjE3M2U5IiwiaWF0IjoxNzE4MjMyMzA0LjMwNTMzLCJuYmYiOjE3MTgyMzIzMDQuMzA1MzM0LCJleHAiOjE3NDk3NjgzMDMuNDA5NDA4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Mbg32oi0E4kpwprmcDY0Rx7PlHwEXS8vPThf1Q7TlfK2W8uPWmEChGiNlvRkwXBOlyXuAAwvXA4kOO1phYAvFoBWbA3RwX7AK-B8nb0_6wp79jJ3n2BaI-JMw909uDR0fgRr5uerTYBbn5ZQ0aXrYTuDQcQDce9wFa4702iGrczwbgt9Lnn4mLMHD8-OeuAbch5foV3Hp3TdbVc2bzfl5BP84u6KGUaJFLZPJkAcQRftq4zGnhea_mIlHZjvyGUOlo1c5o3to-avN0gAgjrYztNgy1BJkEWDXzl6FwS05cNGJyHSmKWPI0XWc-vYcmK0ErUqLg6ysflV7pcXfdh61EpSXcD60oj7njNF15G82KAc6S0pkV89nYDBy7Ld62kEZPXJZC8H-IaiOB4odNRNLhaH0giMu5vVH-kT-pqZJcC1ULjyF_x5JY6CRlN6h30wZaA4cnoAGLs0kuduE6tKXvnT9-GRKt_RVGtU1mB1NIAIV3bWQwsGU5Z1CBzBS__tWBZEX05s66Pk1N8esWj5xK4W-tMYb9CfFGVaSxFIYPuuDzNdufKQPxaPnm8B0SvThm0veoyKcTWlhbFJsbBr85lW_0wkgH9KCQ6_j6pHuF0a_OdcP4TGRD9m7SHwnnKyrf9dTs-Pou5fPtfzL4IeJmbcx7Y2Y8VZ0UGLj3G7Pi4',
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

    useEffect(() => {
      if (number.length == 9) {
        setButtonState(false);
      }else {
        setButtonState(true);
      }
   }, [number]);

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
              <IonLabel>Contactos:</IonLabel>
    
              </IonItem>

              <IonItem>

                <IonList lines="full">
                <IonItem>
                <IonInput slot="start" label="Nuevo contacto: (+56)"  type="tel" minlength={9} maxlength={9} placeholder="Ingrese aquí" onIonChange={(e: any) => setNumber(e.target.value)}></IonInput>
                <IonButton slot="start" color="success" disabled={buttonState} onClick={() => contactAdd(number)}><IonIcon icon={add}></IonIcon></IonButton>
              </IonItem>
                {contacts.map((contact) => (
                    <IonItem>
                    <IonLabel>{contact.number}</IonLabel>
                    <IonButton slot="end" color="danger" onClick={() => contactDelete(contact.id)}><IonIcon icon={trash}></IonIcon></IonButton>
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