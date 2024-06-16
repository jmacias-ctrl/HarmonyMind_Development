import React, { useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonButton, IonInput, IonIcon, IonItem, IonLabel, IonModal } from '@ionic/react';
import { personOutline, lockClosedOutline, atCircleOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { Redirect } from 'react-router-dom';
import './register.css';

interface RegisterFormState {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    error: string | null;
    showPassword: boolean;
}

const Register: React.FC = () => {
    const [formState, setFormState] = useState<RegisterFormState>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        error: null,
        showPassword: false,
    });

    const [showModal, setShowModal] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const handleChange = (e: CustomEvent) => {
        const { name, value } = (e.target as HTMLInputElement); // Obtener el nombre y valor del input
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleTogglePasswordVisibility = () => {
        setFormState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, username, password, confirmPassword } = formState;

        if (password.trim() !== confirmPassword.trim()) {
            setFormState(prevState => ({ ...prevState, error: 'Las contraseñas no coinciden' }));
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
                setShowModal(true);
            } else {
                const data = await response.json();
                setFormState(prevState => ({ ...prevState, error: data.message || 'Error en el registro' }));
            }
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            setFormState(prevState => ({ ...prevState, error: 'Error al enviar solicitud' }));
        }
    };

    const handleModalDismiss = () => {
        setShowModal(false);
        setRedirectToLogin(true);
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
                                {formState.error && (
                                    <IonItem lines="none" className="error-message">
                                        <IonLabel color="danger">{formState.error}</IonLabel>
                                    </IonItem>
                                )}
                                <IonItem>
                                    <IonIcon icon={atCircleOutline} slot="start" />
                                    <IonInput
                                        placeholder="Ingrese correo"
                                        name="email"
                                        value={formState.email}
                                        onIonChange={handleChange}
                                        autofocus
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonIcon icon={personOutline} slot="start" />
                                    <IonInput
                                        placeholder="Ingrese nombre de Usuario"
                                        name="username"
                                        value={formState.username}
                                        onIonChange={handleChange}
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    <IonInput
                                        placeholder="Ingrese contraseña"
                                        name="password"
                                        type={formState.showPassword ? "text" : "password"}
                                        value={formState.password}
                                        onIonChange={handleChange}
                                    />
                                    <IonIcon
                                        icon={formState.showPassword ? eyeOutline : eyeOffOutline}
                                        slot="end"
                                        onClick={handleTogglePasswordVisibility}
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    <IonInput
                                        placeholder="Confirmar contraseña"
                                        name="confirmPassword"
                                        type={formState.showPassword ? "text" : "password"}
                                        value={formState.confirmPassword}
                                        onIonChange={handleChange}
                                    />
                                    <IonIcon
                                        icon={formState.showPassword ? eyeOutline : eyeOffOutline}
                                        slot="end"
                                        onClick={handleTogglePasswordVisibility}
                                    />
                                </IonItem>
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
                <IonModal isOpen={showModal} onDidDismiss={handleModalDismiss}>
                    <IonContent className='ion-padding'>
                        <h2>Usuario creado exitosamente</h2>
                        <IonButton expand="full" onClick={handleModalDismiss}>Aceptar</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Register;

