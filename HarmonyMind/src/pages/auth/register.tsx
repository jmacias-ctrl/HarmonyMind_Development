import React, { useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonButton, IonInput, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personOutline, lockClosedOutline, atCircleOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { Redirect } from 'react-router-dom';
import './register.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.trim() !== confirmPassword.trim()) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name: username, password, password_confirmation: confirmPassword }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setRedirectToLogin(true);
            } else {
                const data = await response.json();
                setError(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            setError('Error al enviar solicitud');
        }
    };

    if (redirectToLogin) {
        return <Redirect to="/auth/login" />;
    }

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonGrid className='formContainer'>
                    <h1>Registro</h1>
                    <IonRow>
                        <IonCol size='12' size-md='7'>
                            <form onSubmit={handleSubmit} className='loginForm'>
                                {error && (
                                    <IonItem lines="none" className="error-message">
                                        <IonLabel color="danger">{error}</IonLabel>
                                    </IonItem>
                                )}
                                <IonInput
                                    placeholder="Ingrese correo"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                    autofocus
                                >
                                    <div slot='start'>
                                        <IonIcon icon={atCircleOutline}></IonIcon>
                                    </div>
                                </IonInput>
                                <IonInput
                                    placeholder="Ingrese nombre de Usuario"
                                    value={username}
                                    onIonChange={(e) => setUsername(e.detail.value!)}
                                >
                                    <div slot='start'>
                                        <IonIcon icon={personOutline}></IonIcon>
                                    </div>
                                </IonInput>
                                <IonInput
                                    placeholder="Ingrese contraseña"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                >
                                    <div slot='start'>
                                        <IonIcon icon={lockClosedOutline}></IonIcon>
                                    </div>
                                    <div slot='end' onClick={() => setShowPassword(!showPassword)}>
                                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline}></IonIcon>
                                    </div>
                                </IonInput>
                                <IonInput
                                  placeholder="Confirmar contraseña"
                                  type={showPassword ? "text" : "password"}
                                  value={confirmPassword}
                                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                              >
                                  <div slot='start'>
                                      <IonIcon icon={lockClosedOutline}></IonIcon>
                                  </div>
                                  <div slot='end' onClick={() => setShowPassword(!showPassword)}>
                                      <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline}></IonIcon>
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


