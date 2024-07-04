import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { IonContent, IonHeader, IonPage, IonTitle, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import {
    IonModal,
    IonToolbar,
    IonButtons,
    IonButton,
    IonPicker,
    IonText,
} from '@ionic/react';

import {
    useIonViewWillEnter,
    useIonViewWillLeave,
} from "@ionic/react";

import './analisis_estado.css';

const analisis_estado: React.FC = () => {
    const [daysAnalysis, setDaysAnalysis] = useState(7);
    const [estado_de_animo, setEstadoDeAnimo] = useState('tristeza');
    const [value, setValue] = useState<string | number | undefined>('javascript');
    const [textLoading, setTextLoading] = useState('Obteniendo Análisis')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [countEstados, setCountEstados] = useState(0);
    const [lastXDays, setLastXDays] = useState(LastXDays())
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        labels: lastXDays,
        datasets: [
            {
                label: 'Tristeza',
                backgroundColor: "#2771BF",
                borderColor: "#2771BF",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
            {
                label: 'Felicidad',
                backgroundColor: "#F79C21",
                borderColor: "#F79C21",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
            {
                label: 'Ira',
                backgroundColor: "#FF0202",
                borderColor: "#FF0202",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
            {
                label: 'Sorpresa',
                backgroundColor: "#02FFDD",
                borderColor: "#02FFDD",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
            {
                label: 'Miedo',
                backgroundColor: "#5E2DCE",
                borderColor: "#5E2DCE",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
            {
                label: 'Asco',
                backgroundColor: "#64B726",
                borderColor: "#64B726",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [0,0,0,0,0,0,0],
            },
        ],
    })
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://kender.duckdns.org:180/api/publicacion/analisis?dias=${daysAnalysis}`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then((res) => {
                    return res.json();
                })
                .catch(error => {
                    setTextLoading('Error al recuperar estados')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor inténtelo denuevo más tarde.')
                })
                .then((posts) => {
                    console.log(posts['data'])
                    dataGraph(posts['data'])
                    setCountEstados(posts['countEstados'].count_estados)
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(true)
        fetch_posts();
        ChartJS.register(CategoryScale);
    }, []);
    function dataGraph(data) {
        var tristeza = new Array(daysAnalysis).fill(0);;
        var felicidad = new Array(daysAnalysis).fill(0);;
        var ira = new Array(daysAnalysis).fill(0);;
        var sorpresa = new Array(daysAnalysis).fill(0);;
        var disgusto = new Array(daysAnalysis).fill(0);;
        var miedo = new Array(daysAnalysis).fill(0);
        console.log(tristeza)
        var i=daysAnalysis-1
        for(var j=0; j<data['length']; j++){
            tristeza[i] = tristeza[i] + parseInt(data[j].tristeza);
            felicidad[i] = felicidad[i] + parseInt(data[j].felicidad);
            ira[i] = ira[i] + parseInt(data[j].ira);
            sorpresa[i] = sorpresa[i] + parseInt(data[j].sorpresa);
            disgusto[i] = disgusto[i] + parseInt(data[j].disgusto);
            miedo[i] = miedo[i] + parseInt(data[j].miedo);
            i-=1;
        }
        console.log(tristeza)
        setLastXDays(LastXDays());
        setData({
            labels: lastXDays,
            datasets: [
                {
                    label: 'Tristeza',
                    backgroundColor: "#2771BF",
                    borderColor: "#2771BF",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: tristeza,
                },
                {
                    label: 'Felicidad',
                    backgroundColor: "#F79C21",
                    borderColor: "#F79C21",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: felicidad,
                },
                {
                    label: 'Ira',
                    backgroundColor: "#FF0202",
                    borderColor: "#FF0202",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: ira,
                },
                {
                    label: 'Sorpresa',
                    backgroundColor: "#02FFDD",
                    borderColor: "#02FFDD",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: sorpresa,
                },
                {
                    label: 'Miedo',
                    backgroundColor: "#5E2DCE",
                    borderColor: "#5E2DCE",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: miedo,
                },
                {
                    label: 'Asco',
                    backgroundColor: "#64B726",
                    borderColor: "#64B726",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: disgusto,
                },
            ],
        })
    }
    useIonViewWillLeave(() => {
        console.log('test')
        ChartJS.unregister(CategoryScale);
    }, []);

    function formatDate(date){

        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = mm+'/'+dd+'/'+yyyy;
        return date
     }

    function LastXDays () {
        var result = [];
        for (var i=daysAnalysis; i>0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( formatDate(d) )
        }
    
        return(result);
    }
    
    function changeDays(days){
        ChartJS.unregister(CategoryScale);
        setDaysAnalysis(parseInt(days));
        setLoading(true)
        fetch_posts();
        ChartJS.register(CategoryScale);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Análisis de Estados</IonTitle>
                    <IonButton slot="end" id="open-picker" className='ion-hide'>Fecha</IonButton>
                    <IonPicker
                        trigger="open-picker"
                        columns={[
                            {
                                name: 'days',
                                options: [
                                    {
                                        text: '7 Días',
                                        value: '7',
                                    },
                                    {
                                        text: '30 Días',
                                        value: '30',
                                    },
                                    {
                                        text: '90 Días',
                                        value: '90',
                                    },
                                ],
                            },
                        ]}
                        buttons={[
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                            },
                            {
                                text: 'Confirmar',
                                handler: (value) => {
                                    changeDays(value.days.value);
                                },
                            },
                        ]}
                    ></IonPicker>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>

                        <IonCardTitle>Últimos {daysAnalysis} Días</IonCardTitle>

                    </IonCardHeader>

                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="auto">Cantidad de estados publicados:</IonCol>
                                <IonCol>{countEstados}</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="auto">Emoción predominante en los últimos días:</IonCol>
                                <IonCol><div className={`colorPredominante ${estado_de_animo == "ira" && "anger"} ${estado_de_animo == "sorpresa" && "surprise"} ${estado_de_animo == "disgusto" && "disgust"} ${estado_de_animo == "felicidad" && "happiness"} ${estado_de_animo == "tristeza" && "sadness"} ${estado_de_animo == "miedo" && "fear"}`}></div></IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonText>
                            <h3>Gráfico de Emociones</h3>
                        </IonText>
                        <Line data={data} height={250} />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default analisis_estado;
