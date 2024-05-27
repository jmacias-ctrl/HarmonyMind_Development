import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonSelect, IonSelectOption, IonRow } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
const boton_panico: React.FC = () => {

  const [contact, setContact] = useState(1);
  const [posts, setPosts] = useState({});
  const [isLoaded, setLoaded] = useState(false);

    const fetch_posts = () => {
      if (isLoaded == false) {
        console.log('hola')
        fetch(`http://127.0.0.1:8000/api/emergency_contact/get`, {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDE4ZGRmNjg4YjVlZWNiOGUyN2YyNWE0YTE4NzJjMGVkODk0NWU4ZWM4ZjlhZGJjNDlhYjMwNmQ2NzBmZTJmNTNjZWE1ZjE1YWQzM2MzMmEiLCJpYXQiOjE3MTY3NTYxMDcuODAyMDk4LCJuYmYiOjE3MTY3NTYxMDcuODAyMTAxLCJleHAiOjE3NDgyOTIxMDcuMzczNzEzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VDW5-L4Mp7vIgcFvWddZAxQrBVn2UyptqQfLyjcuMtr-guVycup5SvhGnmPSa1FXmxOwRQo4eS8yeHxQADU60WHCk-T3KwGo_lN1OZt-MhDgHfU_3tHNSEoRvoP539bYxZ8ZnQ42BQkCRBQgxqgljtyc6WUiIAEybjgNzkmsvbSYFB8poE4W0JZPprNl0gEEIET544o4oEOhv7npeofwkIm6RvyvzgZ3X-lFosfJAaIs3IfQZd7J4RijF6tN7Fr849f9PnCYiVUZHMPXKxtRibEFCEin1bbZkF4bUb6X7F1Cz_5F3qcD25SCj5NY6Y84nGw7upigu6x6KsU8wDfh1Ooe2MHTdX6GzJRmAi6RVmNbIlU16-ATBRAFIv87bsau45uW5Cw2SQMt8PrU7f7sPL8OcGPY9hxUYb_KQZkx10H8BLz43FtnRTm-FWD_vhXxtPA6jRlGHeUUoax4sNZahMOC2_YnjIHuDN0PufemMeD0w0Y3IcIcWP75iT8m3rXtWVY-MAIz6RSrxpq9AkEoAYwmYoY45P6BbVQDnRvE1jxWTlkxRnaCy2FFavspAA5bqGxRdA2o60HypgKXh1ZuIqRleGuYwZR-aPU2MgNhsy0CEQbuvzWczYgT3CcVIXMUBMrcEzHQvonm6z5xtYi8PkaTYY7Bc6wXdcD2bspX0fg',
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((posts) => {
                setPosts(posts);
                setLoaded(true);
                setContact(posts.data.emergency_contact)
            });

    }
    };

    function emergency_call(){
      console.log('start');
      
      switch(contact){
        case 1:
          console.log("Línea de Prevención de Suicidio");
          break;
        
        case 2:
          console.log("Carabineros");
          break;

        case 3:
          console.log("Otro");
          break;
      }
      
    }

    function contactUpdate(new_contact){
      console.log('start');
      fetch(`http://127.0.0.1:8000/api/emergency_contact/update?contact=${new_contact}`, {
                "method": "PATCH",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDE4ZGRmNjg4YjVlZWNiOGUyN2YyNWE0YTE4NzJjMGVkODk0NWU4ZWM4ZjlhZGJjNDlhYjMwNmQ2NzBmZTJmNTNjZWE1ZjE1YWQzM2MzMmEiLCJpYXQiOjE3MTY3NTYxMDcuODAyMDk4LCJuYmYiOjE3MTY3NTYxMDcuODAyMTAxLCJleHAiOjE3NDgyOTIxMDcuMzczNzEzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VDW5-L4Mp7vIgcFvWddZAxQrBVn2UyptqQfLyjcuMtr-guVycup5SvhGnmPSa1FXmxOwRQo4eS8yeHxQADU60WHCk-T3KwGo_lN1OZt-MhDgHfU_3tHNSEoRvoP539bYxZ8ZnQ42BQkCRBQgxqgljtyc6WUiIAEybjgNzkmsvbSYFB8poE4W0JZPprNl0gEEIET544o4oEOhv7npeofwkIm6RvyvzgZ3X-lFosfJAaIs3IfQZd7J4RijF6tN7Fr849f9PnCYiVUZHMPXKxtRibEFCEin1bbZkF4bUb6X7F1Cz_5F3qcD25SCj5NY6Y84nGw7upigu6x6KsU8wDfh1Ooe2MHTdX6GzJRmAi6RVmNbIlU16-ATBRAFIv87bsau45uW5Cw2SQMt8PrU7f7sPL8OcGPY9hxUYb_KQZkx10H8BLz43FtnRTm-FWD_vhXxtPA6jRlGHeUUoax4sNZahMOC2_YnjIHuDN0PufemMeD0w0Y3IcIcWP75iT8m3rXtWVY-MAIz6RSrxpq9AkEoAYwmYoY45P6BbVQDnRvE1jxWTlkxRnaCy2FFavspAA5bqGxRdA2o60HypgKXh1ZuIqRleGuYwZR-aPU2MgNhsy0CEQbuvzWczYgT3CcVIXMUBMrcEzHQvonm6z5xtYi8PkaTYY7Bc6wXdcD2bspX0fg',
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
            <IonRow class="ion-justify-content-center">
            <IonList>
                <IonItem >
                  <IonSelect label="Contacto de Emergencia" labelPlacement="start" value={contact} onIonChange={(e) => contactUpdate(e.detail.value)}>
                    
                    <IonSelectOption value={1} >Linea de Prevención de Suicidio</IonSelectOption>
                    <IonSelectOption value={2}>Carabineros</IonSelectOption>
                    <IonSelectOption value={3}>Otro</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </IonRow>

            <IonRow class="ion-justify-content-center">
              <IonButton size="large" onClick={() => emergency_call()}>Llamar</IonButton>
              <a href="tel:+1-1800-555-5555" className="button button-positive">Call me</a>
            </IonRow>

              
              



            </IonContent>

        </IonPage>

    );
};

export default boton_panico;