import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonSelect, IonSelectOption, IonRow, IonImg, IonAlert } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { SMS } from "@awesome-cordova-plugins/sms/ngx";

import './boton_panico.css';
const boton_panico: React.FC = () => {

  const [contact, setContact] = useState(1);
  const [posts, setPosts] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [name, setName]= useState("name");
  const [email, setEmail]= useState("");
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("https://wa.me/15551234567?text=Alerta%20{contact}%20ha%20activado%20la%20señal%20de%20pánico");

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
                setEmail(posts.data.email)
                setContacts(posts["data2"])
                setName(posts.data.name)
                
            });

    }
    };

    
    


    function emergency_call(){
      console.log('start');
      console.log(contacts.length)
      
      if (contacts.length == 0) {
        setMessage("tel:*4141")
      } else {
        console.log("Contactos")
        contacts.map((contact) => (

          setMessage("https://wa.me/"+contact.number+"?text=Alerta,%20"+name+"%20ha%20activado%20la%20señal%20de%20pánico")
          //setMessage("sms:+"+contact.number+"&body=Alerta,%20"+name+"%20ha%20activado%20la%20señal%20de%20pánico")

        ))
      }
      
    }

    useEffect(() => {
      emergency_call();
   }, [name]);



    
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
              
              <a href={message} target="_blank">
              <IonImg class="panicButton"
                src="https://play-lh.googleusercontent.com/ibGrsOSIungUGH69-cD0PAxoOi2rdYGKd8LDhanme4iGyh2aAXukKXpdpSFbehEk38M"
                alt="boton de pánico"
              ></IonImg></a>

            </IonRow>

              
              



            </IonContent>

        </IonPage>

    );
};

export default boton_panico;