import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt';

const BROKER_SERVER = 'ws://ec2-13-125-156-5.ap-northeast-2.compute.amazonaws.com:8083/mqtt';

interface Iprops {
    topic: string;
    visible: () => void;
}

export default function MQTT(props: Iprops) {
    const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
    const [messages, setMessages] = useState<String[]>([]);

    useEffect(() => {
        if (!document) return;
        try {
            const client = mqtt.connect(BROKER_SERVER);
            onConnect(client);
        } catch (e) {
            console.error(e);
        }
        return () => {

        }
    }, []);
    const onConnect = (client: mqtt.MqttClient) => {
        client.on('connect', () => setConnectionStatus(true));
        client.subscribe(props.topic);
        client.on('message', (topic, payload, packet) => {
            onMessage(payload.toString());
        });
    }
    const onMessage = (payload: string) => {
        setMessages((prevState) => [...prevState, payload]);
    }
    return (
        <>{!connectionStatus ? null :
            messages.map((message) => (
                <h2 style={{marginLeft: "auto"}} onClick={props.visible}>{message}</h2>
            ))
        }
        </>
    )
}
