import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonButtons, IonThumbnail } from '@ionic/react';
import { IonText, IonActionSheet, IonIcon, useIonLoading, IonList, IonItem, IonSelect, IonSelectOption, IonRow, IonImg } from '@ionic/react';
import { IonFab, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiOTNhZjlkNjAyNjY2OTYxNDU0NWUyNGU3MDA4NGFmYTVlMzA1MWNjMDAwNDJhNTgxOTZiOWQwYWJkYjBkMjM1YmI4MTE3MTRiYzY2MGZjMzkiLCJpYXQiOjE3MTczNjMxOTUuNjc0NjkxLCJuYmYiOjE3MTczNjMxOTUuNjc0NywiZXhwIjoxNzQ4ODk5MTk0LjI1NDg4NSwic3ViIjoiMSIsInNjb3BlcyI6W119.UACc5zfN9gjSzgEtcqyDoc2H_-2pp41ElWMdXfLBRonqOxw4KIipiUKsTBjKigonKfFxhHHaTcgW6q0Sgl6SHOrdk2JFm0_3kOqOa0KwSd_-q0Pz90shDDqgXLU0z3Gdr7xZDTGPhGyhasoTwrV8QCTe4cC3DS0b8F5bGqWXyVfzfh6Weu2ulb98vomHrtuFDx0lOJYZ-leA1t2rG-cEEj5bHPWPPWFPKzZcvXGfZezOGzseNxJoYYIpKwwWrTtkmHVCD-9anrnfE9oMOKgwDbxd-BcOZT-I1y_KnVOwE5VsUMD6P7Ceb3UEObozggztnqXcdU-2pwUmBk3FR_lTWg8GGipWDfAmtQ84h-RrV1B81UJyNZp-qrRiAUNKwOE2-hkCmATK8EGQt5_er5St5LeQeJU3BuUY7t9-zgpLeDDWf8H-PSKrES8cQJRgau60kROTNpinPsshfwi9-ZLxNbNoaKh0CF30xcIqD2rcbttciKRRxC-RbQZpKQP8HzsRnncVyLBYd9158dl21_wqmv7KAGC9fvgho4vNvV-PKeEjVPaJ0EZMKPAwqI2vtNz_6i3HKsNyjA0a0xIL6yEPjRtJlY_yOdlmHUr1mhKLLr3Txw10ab0jqvZNiZ5al0V4vXd6ejKo7hwDwHsGzChmtYEKMeOMzbzg3spRjmvoUCA',
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
              <IonImg onClick={() => emergency_call()}
                src="https://play-lh.googleusercontent.com/ibGrsOSIungUGH69-cD0PAxoOi2rdYGKd8LDhanme4iGyh2aAXukKXpdpSFbehEk38M"
                alt="boton de pánico"
              ></IonImg>
            </IonRow>

              
              



            </IonContent>

        </IonPage>

    );
};

export default boton_panico;