import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonSelect, IonSelectOption, IonRow, IonImg } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';

import './boton_panico.css';
const boton_panico: React.FC = () => {

  const [contact, setContact] = useState(1);
  const [posts, setPosts] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [contacts, setContacts] = useState([]);

    const fetch_posts = () => {
      if (isLoaded == false) {
        console.log('hola')
        fetch(`http://127.0.0.1:8000/api/emergency_contact/get`, {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((posts) => {
                setPosts(posts["data"]);
                setLoaded(true);
                console.log("nombre usuario:")
                console.log(posts.data.name)
                setName(posts.data.name)
                setEmail(posts.data.email)
                setContacts(posts["data2"])
            });

    }
    };

    function emergency_call(){
      console.log('start');
      
      if (contacts.length == 0) {
        console.log("Linea de Prevención de Suicidio")
      } else {
        console.log("Contactos")
        contacts.map((contact) => (
  
          console.log(contact.number)

      ))
    }
      
    }

    function contactUpdate(new_contact){
      console.log('start');
      fetch(`http://127.0.0.1:8000/api/emergency_contact/update?contact=${new_contact}`, {
                "method": "PATCH",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((info) => {
                    console.log(info)
                    if (info['success'] == true) {
                      setContact(new_contact);
                    }
                });
      
      
    }



    
    useEffect(() => {
        fetch_posts();
    }, []);

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Llamada de emergencia</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            <IonRow class="vertical-center ion-justify-content-center">
              <IonImg class="panicButton" onClick={() => emergency_call()}
                src="https://play-lh.googleusercontent.com/ibGrsOSIungUGH69-cD0PAxoOi2rdYGKd8LDhanme4iGyh2aAXukKXpdpSFbehEk38M"
                alt="boton de pánico"
              ></IonImg>
            </IonRow>

              
              



            </IonContent>

        </IonPage>

    );
};

export default boton_panico;