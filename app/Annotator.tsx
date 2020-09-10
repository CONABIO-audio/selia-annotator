import React, { useEffect, useState } from 'react';

import APIClient from './api/index';
import { Item, Annotation } from './types';

const client = new APIClient();

const Annotator: React.FunctionComponent<{}> = () => {
    const [itemInfo, setItemInfo] = useState<Item | null>();
    const [annotations, setAnnotations] = useState<Array<Annotation> | null>();

    useEffect(() => {
        client.getItemInfo(35).then((response) => {
            setItemInfo(response.data);
        });

        client.getAnnotations(35).then((response) => {
            setAnnotations(response.data);
        });
    }, []);

    if (itemInfo === null || annotations === null) {
        return <div>ESPERA</div>;
    }

    return (
        <div>
            <h1>----ITEM INFO-----</h1>
            <div>{JSON.stringify(itemInfo)}</div>
            <h1>----ANNOTATION INFO-----</h1>
            <div>{JSON.stringify(annotations)}</div>
        </div>
    );
};

export default Annotator;
