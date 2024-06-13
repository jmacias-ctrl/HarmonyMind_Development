import React, { useState } from "react";
import { Line, Bar } from 'react-chartjs-2';
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
    const [textLoading, setTextLoading] = useState('Recuperando Estados')
    const [subtextLoading, setSubTextLoading] = useState('Esto puede tomar un tiempo')
    const [stats, setStats] = useState([])
    const [countEstados, setCountEstados] = useState(0);
    const [lastXDays, setLastXDays] = useState([1,2,3,4,5,6,7])
    const [isLoading, setLoading] = useState(true);
    const [dataTristeza, setDataTristeza] = useState([0,0,0,0,0,0,0])
    const [dataFelicidad, setDataFelicidad] = useState([0,0,0,0,0,0,0])
    const [dataIra, setDataIra] = useState([0,0,0,0,0,0,0])
    const [dataSorpresa, setDataSorpresa] = useState([0,0,0,0,0,0,0])
    const [dataDisgusto, setDataDisgusto] = useState([0,0,0,0,0,0,0])
    const [dataMiedo, setDataMiedo] = useState([0,0,0,0,0,0,0])
    const fetch_posts = () => {
        if (isLoading == true) {
            fetch(`http://127.0.0.1:8000/api/publicacion/analisis?dias=${daysAnalysis}`, {
                "method": "GET",
                "headers": {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGUzY2JjZGQ3YzBiOTYyZTEzZWVhOWNjNTg0NDIxZTQ3YWZlZWQ4NGQ2Mzk3MzJhNzg0ZTE4ZGUwYmIwNTExMTlhYmJlZWNjOTRjODEyMmQiLCJpYXQiOjE3MTcyODIwNzQuMTYzNjI3LCJuYmYiOjE3MTcyODIwNzQuMTYzNjMxLCJleHAiOjE3NDg4MTgwNzQuMDY2MzY3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.J_m8LTlYpAp-SEG8X19mqxjJZU0F0pHJlDy4A_DVZRDsiJClo95nZ4Ydzdq7Fwdn2n_8mtMplCtqdwjsBF1a4H7YtbqFBqis4DVWDrBQTTB1YZ0fo750ShyXk-MaZ0h_WzLFWv0SKQKuDoz8inWUYzQCZCiZnIbmWC9SA3cdWp3NR1eXrSUNpC3TI5ZY7OzzoXd15frTgOQcCA-K8jp4dvOSD_FsSc7ZlpcMPef_-If0tDolU8bS-n7LGckf-bXITI0O0q1YidWp-g6w9IXo3x9x2KcIzQi-hEpwoTSLXzkTZ10uhnQcLk367Fs1rHyAFYIjwYbDuBvM_WkvdUmqBCR0iFyP5tERksQfGDc1nFKKk-vwqQxDqRnGdHf5olsiZAxPXUYnySGYgGljVJUfanDy3h-L-RBMbZiS3yh2Xq8qKtC5l1e2eOk3qPaCsVqBCjiRLp2oLWobIa3qPTyHq4-glAh9XEr_X5LXxcWXZ8VFko3QXj--pqLMdHFo9Hy2GrGL41Cz39rPEpbx5NkJgXbBJI-WH-JCkJNALw-V4LpZy2jSsK3Y6WCJMzx5RKdnoXUEVszHy4ya_7AdIBboXfM0nMydF6oKtk3Zf0q2VLoLvXW8GKnuT7QjjYtArf_KVpxFVM3dfjKj9wpbpUwH115Jp71r0AIlNpIvUU1f38w',
                }
            })
                .then((res) => {
                    return res.json();
                })
                .catch(error => {
                    setStats([])
                    setTextLoading('Error al recuperar estados')
                    setSubTextLoading('Hubo problemas al comunicarse con el servidor, por favor intentelo denuevo más tarde.')
                })
                .then((posts) => {
                    dataGraph(posts['data'])
                    setCountEstados(posts['countEstados'].count_estados)
                    setLoading(false)
                })

        }
    };

    useIonViewWillEnter(() => {
        setLoading(true)
        fetch_posts();
        setLastXDays(LastXDays());
        ChartJS.register(CategoryScale);
    }, []);
    function dataGraph(data) {
        var tristeza = new Array(daysAnalysis).fill(0);;
        var felicidad = new Array(daysAnalysis).fill(0);;
        var ira = new Array(daysAnalysis).fill(0);;
        var sorpresa = new Array(daysAnalysis).fill(0);;
        var disgusto = new Array(daysAnalysis).fill(0);;
        var miedo = new Array(daysAnalysis).fill(0);;
        for(var j=0; j<data['length']; j++){
            tristeza[j] = tristeza[j] + parseInt(data[j].tristeza);
            felicidad[j] = felicidad[j] + parseInt(data[j].felicidad);
            ira[j] = ira[j] + parseInt(data[j].ira);
            sorpresa[j] = sorpresa[j] + parseInt(data[j].sorpresa);
            disgusto[j] = disgusto[j] + parseInt(data[j].disgusto);
            miedo[j] = miedo[j] + parseInt(data[j].miedo);
        }
        setDataDisgusto(disgusto)
        setDataFelicidad(felicidad)
        setDataIra(ira)
        setDataMiedo(miedo)
        setDataSorpresa(sorpresa)
        setDataTristeza(tristeza)
    }
    useIonViewWillLeave(() => {
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
        for (var i=0; i<daysAnalysis; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( formatDate(d) )
        }
    
        return(result);
    }

    const DATA_COUNT = 6;
    const NUMBER_CFG = { count: DATA_COUNT, min: 1, max: 100 };
    const data = {
        labels: lastXDays,
        datasets: [
            {
                label: 'Tristeza',
                backgroundColor: "#2771BF",
                borderColor: "#2771BF",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataTristeza,
            },
            {
                label: 'Felicidad',
                backgroundColor: "#F79C21",
                borderColor: "#F79C21",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataFelicidad,
            },
            {
                label: 'Ira',
                backgroundColor: "#FF0202",
                borderColor: "#FF0202",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataIra,
            },
            {
                label: 'Sorpresa',
                backgroundColor: "#02FFDD",
                borderColor: "#02FFDD",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataSorpresa,
            },
            {
                label: 'Miedo',
                backgroundColor: "#5E2DCE",
                borderColor: "#5E2DCE",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataMiedo,
            },
            {
                label: 'Asco',
                backgroundColor: "#64B726",
                borderColor: "#64B726",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: dataDisgusto,
            },
        ],
    };
    function changeDays(days){
        ChartJS.unregister(CategoryScale);
        setDaysAnalysis(days);
        setLoading(true)
        fetch_posts();
        setLastXDays(LastXDays());
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
                    <IonButton slot="end" id="open-picker">Fecha</IonButton>
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
                        <Line data={data} />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default analisis_estado;
