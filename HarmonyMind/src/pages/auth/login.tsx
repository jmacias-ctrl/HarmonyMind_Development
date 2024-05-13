import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonButton, IonHeader, IonInput, IonItem, IonList, IonIcon, IonLabel } from '@ionic/react';
import { personOutline, lockClosedOutline, atCircleOutline } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import React, { useState } from "react";
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login exitoso, redirigir al usuario a la página deseada
        console.log('Login exitoso');
      } else {
        // Error en el login, mostrar mensaje de error
        console.error('Error en el login');
      }
    } catch (error) {
      // Error en la solicitud, mostrar mensaje de error
      console.error('Error al enviar solicitud:', error);
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid className='formContainer'>
          <h1>Iniciar Sesión</h1>
          <IonRow class='ola'>
            <IonCol size='12' size-md='7'>
              <form onSubmit={handleSubmit} className='loginForm'>
                <IonInput
                  name="email"
                  placeholder="Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  autofocus
                >
                  <div slot='label'>
                    <IonIcon icon={atCircleOutline}></IonIcon>
                  </div>
                </IonInput>
                <IonInput
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                  <div slot='label'>
                    <IonIcon icon={lockClosedOutline}></IonIcon>
                  </div>
                </IonInput>
                <IonButton type='submit' shape='round' className='button' expand='full'>
                  Iniciar Sesión
                </IonButton>
                <p style={{ textAlign: 'center' }}>¿No tienes cuenta?  
                    <a href="auth/register" className='button-reg'>
                        Regístrate
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

export default Login;
