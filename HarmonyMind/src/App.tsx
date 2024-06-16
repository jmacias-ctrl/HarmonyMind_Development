import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonViewDidEnter,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, create, logOut, calendar, call, person } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import eventos from './pages/eventos';
import eventos_asistidos from './pages/eventos_asistidos';
import crear_estado from './pages/estados/crear_estado';
import ver_estados from './pages/estados/ver_estados';
import analisis_estado from './pages/estados/analisis_estado';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { useState, useEffect } from 'react'; // Importar useState y useEffect
import boton_panico from './pages/boton_panico';
import perfil from './pages/perfil';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useAuth } from './pages/auth/useAuth';
import EventosComponents from './pages/eventos';

setupIonicReact();

const App: React.FC = () => {
  const { isLogged, logout } = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/logout" render={() => {
            logout()
            return <Redirect to="/login" />
          }} exact={true} />
          <Route>
            {isLogged ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/estado/crear" component={crear_estado} />
                  <Route exact path="/estado/ver:status?" component={ver_estados} />
                  <Route exact path="/estado/analisis" component={analisis_estado} />
                  <Route exact path="/eventos/ver" component={eventos} />
                  <Route exact path="/eventos/assist" component={eventos_asistidos} />
                  <Route exact path="/inicio">
                    <Route path="/button" component={boton_panico} />
                    <Route path="/perfil" component={perfil} />
                    <Tab1 />
                  </Route>
                  <Route exact path="/eventos">
                    <EventosComponents />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/inicio" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="inicio" href="/">
                    <IonIcon aria-hidden="true" icon={home} />
                    <IonLabel>Inicio</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="ver_estados" href="/estado/ver">
                    <IonIcon aria-hidden="true" icon={create} />
                    <IonLabel>Estados</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="ver_eventos" href="/eventos">
                    <IonIcon aria-hidden="true" icon={calendar} />
                    <IonLabel>Eventos</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="boton_panico" href="/button">
                    <IonIcon aria-hidden="true" icon={call} />
                    <IonLabel>SOS</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon aria-hidden="true" icon={person} />
                    <IonLabel>Perfil</IonLabel>
                  </IonTabButton>
                  <IonTabButton href="/logout">
                    <IonIcon aria-hidden="true" icon={logOut} />
                    <IonLabel>Cerrar Sesión</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;


