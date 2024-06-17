import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/auth/login'; 
import Register from './pages/auth/register';
import { useState } from 'react';

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

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/login">
              {isLoggedIn ? <Redirect to="/tab1" /> : <Login onLogin={handleLogin} />}
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/">
              {isLoggedIn ? (
                <IonTabs>
                  <IonRouterOutlet>
                    <Route exact path="/tab1" component={Tab1} />
                    <Route exact path="/tab2" component={Tab2} />
                    <Route exact path="/tab3" component={Tab3} />
                    <Route exact path="/" render={() => <Redirect to="/tab1" />} />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                      <IonIcon aria-hidden="true" icon={triangle} />
                      <IonLabel>Tab 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="ver_eventos" href="/eventos/ver">
                      <IonIcon aria-hidden="true" icon={ellipse} />
                      <IonLabel>Eventos</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
