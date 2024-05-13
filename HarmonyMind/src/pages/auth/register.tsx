import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonButton, IonHeader, IonInput, IonItem, IonList, IonIcon } from '@ionic/react';
import { personOutline, lockClosedOutline, atCircleOutline } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import React, { useState } from "react";
import './register.css';


const Register: React.FC = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  
    return (
      <IonPage>
        <IonContent className='ion-padding'>
          <IonGrid className='formContainer'>
            <h1>Registro</h1>
            <IonRow class='ola'>
              <IonCol size="12" size-md="7">
                <form onSubmit={handleSubmit} className='loginForm'>
                  <IonInput placeholder="Ingrese correo" autofocus>
                    <div slot='label'>
                      <IonIcon icon={atCircleOutline}></IonIcon>
                    </div>
                  </IonInput>
                  <IonInput placeholder="Ingrese nombre de Usuario">
                    <div slot='label'>
                      <IonIcon icon={personOutline}></IonIcon>
                    </div>
                  </IonInput>
                  <IonInput placeholder="Ingrese contraseña" type="password">
                    <div slot='label'>
                      <IonIcon icon={lockClosedOutline}></IonIcon>
                    </div>
                  </IonInput>
                  <IonInput placeholder="Confirmar contraseña" type="password" autocomplete="new-password">
                    <div slot='label'>
                      <IonIcon icon={lockClosedOutline}></IonIcon>
                    </div>
                  </IonInput>
                  <IonButton type='submit' shape='round' className='button' expand='full'>
                    Registrarse
                  </IonButton>
                  <p style={{ textAlign: 'center' }}>¿Ya tienes cuenta?
                    <a href="auth/login" className='button-reg'>
                      Inicia Sesión
                    </a>
                  </p>
                </form>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  