import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
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
import { ellipse, logOut, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { useState, useEffect } from 'react'; // Importar useState y useEffect
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
import VistaEstadosComponent from './pages/estados/ver_estados';

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
          <Route>
            {isLogged ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/eventos">
                    <EventosComponents />
                  </Route>
                  <Route exact path="/estados">
                    <VistaEstadosComponent />
                  </Route>
                  <Route exact path="/tab2">
                    <Tab2 />
                  </Route>
                  <Route path="/tab3">
                    <Tab3 />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/tab1" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="ver_eventos" href="/eventos">
                    <IonIcon aria-hidden="true" icon={ellipse} />
                    <IonLabel>Eventos</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={ellipse} />
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


