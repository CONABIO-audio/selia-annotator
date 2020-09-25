import { Annotation } from './types';

export const SAMPLE_ANNOTATION_INFO: Annotation = {
    id: 1,
    item: 1,
    annotation_type: 2,
    event_type: 2,
    annotation: { top: 834.6708984375, left: 173.2738494873047, right: 446.75244140625, bottom: 688.9158325195312 },
    labels: [
        { id: 566566, value: 'Equisetopsida', term_type: 115, term_type_name: 'clase' },
        { id: 599758, value: 'Dendropanax arboreus', term_type: 120, term_type_name: 'especie' },
        { id: 566815, value: 'Araliaceae', term_type: 118, term_type_name: 'familia' },
        { id: 570360, value: 'Dendropanax', term_type: 119, term_type_name: 'genero' },
        { id: 599766, value: 'murciélago', term_type: 112, term_type_name: 'nombre común' },
        { id: 566608, value: 'Apiales', term_type: 117, term_type_name: 'orden' },
    ],
    annotation_tool: 1,
    visualizer: 1,
    visualizer_configuration: {
        transformMatrix: {
            a: 1.3309999704360962,
            b: 0,
            c: 0,
            d: 1.3309999704360962,
            e: 111.3725089430809,
            f: -765.9469782114029,
        },
    },
    certainty: 'M',
    quality: 'M',
    commentaries: '',
    created_by: {
        id: 1,
        username: 'admin',
        first_name: 'Santiago',
        last_name: 'Martínez',
        email: 'mb.santiago@hotmail.com',
    },
    created_on: '2019-11-26T13:33:18.441776-06:00',
    modified_by: {
        id: 1,
        username: 'admin',
        first_name: 'Santiago',
        last_name: 'Martínez',
        email: 'mb.santiago@hotmail.com',
    },
    modified_on: '2019-11-26T13:44:15.512164-06:00',
};
