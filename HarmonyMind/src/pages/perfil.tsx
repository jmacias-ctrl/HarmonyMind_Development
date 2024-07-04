import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonInput } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import LogoutButton from "./auth/Logout";
import { Link } from 'react-router-dom';
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
        
        fetch(`http://192.168.1.6:8000/api/emergency_contact/get`, {
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
      fetch(`http://192.168.1.6:8000/api/emergency_contact/add?number=56${new_contact}`, {
                "method": "POST",
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
                      window.location.reload();
                    }
                });
      
      
    };

    function contactDelete(new_contact){
      console.log(new_contact);
      fetch(`http://192.168.1.6:8000/api/emergency_contact/delete?id=${new_contact}`, {
                "method": "POST",
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
                    <IonButtons slot="end">
                        <LogoutButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonList lines="full">
              <IonItem>
                <IonInput label="Nombre: " value={name} labelPlacement="stacked" readonly={true}></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="Email: " value={email} labelPlacement="stacked" readonly={true}></IonInput>
              </IonItem>

              <IonItem>
              <IonLabel>Contactos:</IonLabel>
    
              </IonItem>

              <IonItem>

                <IonList lines="full">
                <IonItem>
                <IonInput slot="start" labelPlacement="stacked" label="Nuevo contacto: (+56)"  type="tel" minlength={9} maxlength={9} placeholder="Ingrese aquí" onIonChange={(e: any) => setNumber(e.target.value)}></IonInput>
                <IonButton slot="start" color="success" disabled={buttonState} onClick={() => contactAdd(number)}><IonIcon icon={add}></IonIcon></IonButton>
              </IonItem>
                {contacts.map((contact) => (
                    <IonItem>
                    <IonLabel>+{contact.number}</IonLabel>
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