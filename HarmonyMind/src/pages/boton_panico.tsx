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
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");

    const fetch_posts = () => {
      if (isLoaded == false) {
        console.log('hola')
        fetch(`http://127.0.0.1:8000/api/emergency_contact/get`, {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDllZWJhOTIzYTc4OGE5ZTNhYjBjYjYxZDk1YTM3YjEzOTAzZTk0ZjAyYmExZjhkYTA2NGQyOTk4MDc0YWRiYTdhYjUxNDY4NTEzMDhiOWQiLCJpYXQiOjE3MTcyNzkzMDIuOTI1OTI5LCJuYmYiOjE3MTcyNzkzMDIuOTI1OTMzLCJleHAiOjE3NDg4MTUzMDIuMTk3NDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.bMcf1nLtELb4fCRPWIBHHh6Dma0zJfnywb1WFpI70HI6xG5lITwxMNvSjRh2Tz5EBnruQJ_TXoLaneMYz2xZrz_MuRksJCQOPS8Uhra2_uvbp_SHENeJDjcW39Vqg4F9N8ixxyFIdg5Y0ovWjIrez0TxnGwam5GrQ59i9NT8MMH5ZizdDaEWSpplJmkFl3h1goKfu6Kak5UD3CVl1a4hRcsT4uQ0GSQZrlgSDQGI-EwZrD48HO9lyUsGlo2Tqt8JVbxipCNL22XqtN1EaPYuNIvS91_GMHrCZQCaAoCVU4Xu3WAz2vHJANZSO3ZOlOo8qEtQDHthfzMMh7pUIgd_aOICQLsLebbO4u8LYJ4ysgzhg7W3htXXjh8qWJTm2QY12LBOVdbpqGI1DuBddvRZ0sPCBO1wWvdRJc1x4jMhRmnh8nl9Szv-NkO84jZu1wTStuLp7uOCFMH_BIeJrPRAUwSTNVp19G9UdRDgWk1i9za6a_no_AQs2lj8WYaPMAmEoWC5rXYLJ6QPNGzzDNtPltX7JMAORGzDQ7IHrT7BnI1qn0-cL04LcX_4dBmjCntIj2uLEVIOezzkN4p7hGLKqXCM4TyBx-njfc1scg-5ghynIY8WWJHRUUEZTTtqVmBMm7xRhpmOA3S31-BJTGjWIbL-QxB_odEXijeGn6v2L34',
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
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjhiMTYzODRkNjNiY2JmNmYwYzc0MzIyODZhYmQ3YThkNWQwMmNlYzkxMGYyMTMzNjIwNDQzMmU3NDQxMzQ2NTVmOTQyMzNkNmQ5OWNiN2YiLCJpYXQiOjE3MTY4MzcwMTMuNjY1MjE3LCJuYmYiOjE3MTY4MzcwMTMuNjY1MjIxLCJleHAiOjE3NDgzNzMwMTMuNTQxNjg3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.V3nbvNCv8D_FMGvoONYgRGx2s8i58THxoxKcHEusp-epalX0BLKivmWmafslYvPdrtIrA5uDod8JOcWSh1U-ueRcusJ2nZ6RSBrR7yEnAqtNWnsFadtUfB8fTNTsdlfrCS1viJZTl-OFT4eDZMnhikUZaLFsNZn1bxnBEhlxy0mKLQMTmGoWgBmo7UnlL0dJtp9kaid9w6dMSDvoSMhxtPAXPB95Mziw2-AHMpDm3R3TcdLz4uPZiFk2uHv5Zrt0COXrz10e11Exqxdi2FKx1Spj-bp5Pg75XMW5Ij3v8wCNk1HPKBA5l70kjCh3YqJBCv5thaNS-uG1eFiZY0ji4IIFsfM6OhH4fKeEsmesJffhScN_1cbSAoYKM1cns_EXA_4MqEfA9-z7Ui2eDr9dmj2mhUkcXmlGTdJT81uDKL4Zi4wlw-QblEwNQ_s3xQrtQOGBI7wcj4pnKSi8Uqpo4pAiwFAsf0mAhacGVKyD85YIxj2z6NcAVDuFPLImJ7B3HaAXPuRvoj-7h2lms6zs1kTiHo8_WgxZbS8iubi39_T0unrgYlGrmvSNI4b0xsDsnqkBJZSi8F_pZ6TTTWTy82tXY2Ntrl9OEb1i5jY4QeyyDb-hY_MjSK4Z3gnb8NkLGbFQ8tjrYD27IHqoas7sZ9X84G6qAwr7hyvxfIDjJRk',
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
              <IonButton size="large" onClick={() => emergency_call()}>Llamar</IonButton>
              <a href="tel:+1-1800-555-5555" className="button button-positive">Call me</a>
            </IonRow>

              
              



            </IonContent>

        </IonPage>

    );
};

export default boton_panico;