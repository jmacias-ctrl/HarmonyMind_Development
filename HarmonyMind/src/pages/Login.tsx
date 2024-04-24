import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <IonPage>
      <IonContent>
        <IonInput
          placeholder="Nombre de usuario"
          value={username}
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton onClick={handleLogin}>Iniciar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;