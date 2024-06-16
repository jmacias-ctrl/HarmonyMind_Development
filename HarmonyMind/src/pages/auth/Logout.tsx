import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useAuth } from './useAuth'; // Ajusta esta ruta según tu estructura de proyecto
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login'); // Redirigir a la página de inicio de sesión después del logout
    };

    return (
        <IonButton onClick={handleLogout}>
            <IonIcon slot="icon-only" icon={logOut} />
        </IonButton>
    );
};

export default LogoutButton;
