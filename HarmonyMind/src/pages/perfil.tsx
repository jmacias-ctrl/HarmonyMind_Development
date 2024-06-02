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
                setContacts(posts["data2"])
                console.log(posts.data2)
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
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDllZWJhOTIzYTc4OGE5ZTNhYjBjYjYxZDk1YTM3YjEzOTAzZTk0ZjAyYmExZjhkYTA2NGQyOTk4MDc0YWRiYTdhYjUxNDY4NTEzMDhiOWQiLCJpYXQiOjE3MTcyNzkzMDIuOTI1OTI5LCJuYmYiOjE3MTcyNzkzMDIuOTI1OTMzLCJleHAiOjE3NDg4MTUzMDIuMTk3NDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.bMcf1nLtELb4fCRPWIBHHh6Dma0zJfnywb1WFpI70HI6xG5lITwxMNvSjRh2Tz5EBnruQJ_TXoLaneMYz2xZrz_MuRksJCQOPS8Uhra2_uvbp_SHENeJDjcW39Vqg4F9N8ixxyFIdg5Y0ovWjIrez0TxnGwam5GrQ59i9NT8MMH5ZizdDaEWSpplJmkFl3h1goKfu6Kak5UD3CVl1a4hRcsT4uQ0GSQZrlgSDQGI-EwZrD48HO9lyUsGlo2Tqt8JVbxipCNL22XqtN1EaPYuNIvS91_GMHrCZQCaAoCVU4Xu3WAz2vHJANZSO3ZOlOo8qEtQDHthfzMMh7pUIgd_aOICQLsLebbO4u8LYJ4ysgzhg7W3htXXjh8qWJTm2QY12LBOVdbpqGI1DuBddvRZ0sPCBO1wWvdRJc1x4jMhRmnh8nl9Szv-NkO84jZu1wTStuLp7uOCFMH_BIeJrPRAUwSTNVp19G9UdRDgWk1i9za6a_no_AQs2lj8WYaPMAmEoWC5rXYLJ6QPNGzzDNtPltX7JMAORGzDQ7IHrT7BnI1qn0-cL04LcX_4dBmjCntIj2uLEVIOezzkN4p7hGLKqXCM4TyBx-njfc1scg-5ghynIY8WWJHRUUEZTTtqVmBMm7xRhpmOA3S31-BJTGjWIbL-QxB_odEXijeGn6v2L34',
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
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDllZWJhOTIzYTc4OGE5ZTNhYjBjYjYxZDk1YTM3YjEzOTAzZTk0ZjAyYmExZjhkYTA2NGQyOTk4MDc0YWRiYTdhYjUxNDY4NTEzMDhiOWQiLCJpYXQiOjE3MTcyNzkzMDIuOTI1OTI5LCJuYmYiOjE3MTcyNzkzMDIuOTI1OTMzLCJleHAiOjE3NDg4MTUzMDIuMTk3NDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.bMcf1nLtELb4fCRPWIBHHh6Dma0zJfnywb1WFpI70HI6xG5lITwxMNvSjRh2Tz5EBnruQJ_TXoLaneMYz2xZrz_MuRksJCQOPS8Uhra2_uvbp_SHENeJDjcW39Vqg4F9N8ixxyFIdg5Y0ovWjIrez0TxnGwam5GrQ59i9NT8MMH5ZizdDaEWSpplJmkFl3h1goKfu6Kak5UD3CVl1a4hRcsT4uQ0GSQZrlgSDQGI-EwZrD48HO9lyUsGlo2Tqt8JVbxipCNL22XqtN1EaPYuNIvS91_GMHrCZQCaAoCVU4Xu3WAz2vHJANZSO3ZOlOo8qEtQDHthfzMMh7pUIgd_aOICQLsLebbO4u8LYJ4ysgzhg7W3htXXjh8qWJTm2QY12LBOVdbpqGI1DuBddvRZ0sPCBO1wWvdRJc1x4jMhRmnh8nl9Szv-NkO84jZu1wTStuLp7uOCFMH_BIeJrPRAUwSTNVp19G9UdRDgWk1i9za6a_no_AQs2lj8WYaPMAmEoWC5rXYLJ6QPNGzzDNtPltX7JMAORGzDQ7IHrT7BnI1qn0-cL04LcX_4dBmjCntIj2uLEVIOezzkN4p7hGLKqXCM4TyBx-njfc1scg-5ghynIY8WWJHRUUEZTTtqVmBMm7xRhpmOA3S31-BJTGjWIbL-QxB_odEXijeGn6v2L34',
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
                <IonInput label="Nuevo contacto" placeholder="Ingrese aquí" onIonChange={(e: any) => setNumber(e.target.value)}></IonInput>
                <IonButton onClick={() => contactAdd(number)}>Agregar contacto</IonButton>
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