import React, { useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonButton, IonInput, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personOutline, lockClosedOutline, atCircleOutline } from 'ionicons/icons';
import { Redirect, Link } from 'react-router-dom';
import './login.css';
import { useAuth } from "./useAuth";

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        name: string;
        token: string;
    };
}

const Login: React.FC = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://kender.duckdns.org:180/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log('response', response);

            if (response.ok) {
                const data = await response.json() as LoginResponse;
                login(data.data.token); 
                setRedirectToHome(true);
            } else {
                const responseJson = await response.json() as LoginResponse;
                setError(responseJson.message);
            }
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            setError('Error al enviar solicitud');
        }
    };

    if (redirectToHome) {
        return <Redirect to="/home"/>;
    }

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonGrid className='formContainer'>
                    <h1>Iniciar Sesión</h1>
                    <IonRow className='ola'>
                        <IonCol size='12' size-md='7'>
                            <form onSubmit={handleSubmit} className='loginForm'>
                                {error && (
                                    <IonItem lines="none" className="error-message">
                                        <IonLabel color="danger">{error}</IonLabel>
                                    </IonItem>
                                )}
                                <IonItem>
                                    <IonIcon icon={atCircleOutline} slot="start" />
                                    <IonInput
                                        name="email"
                                        placeholder="correo@gmail.com"
                                        value={email}
                                        onIonChange={(e) => setEmail(e.detail.value!)}
                                        autofocus
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    <IonInput
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onIonChange={(e) => setPassword(e.detail.value!)}
                                    />
                                </IonItem>
                                <IonButton type='submit' shape='round' className='button' expand='full'>
                                    Iniciar Sesión
                                </IonButton>
                                <p style={{ textAlign: 'center' }}>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
