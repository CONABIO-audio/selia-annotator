import { Item } from './types';

export const SAMPLE_ITEM_INFO: Item = {
    id: 2,
    item_type: {
        id: 1,
        name: 'Foto pasiva',
        icon: 'http://localhost:8000/media/images/item_types/passive_photo.png',
        event_types: [
            {
                id: 1,
                name: 'Animal en Foto',
                description: 'Ocurrencia de animal en una fotografía',
                icon: 'http://localhost:8000/media/images/event_types/animal_en_foto.png',
                term_types: [
                    {
                        id: 115,
                        name: 'clase',
                        description: 'Nivel taxonómico: clase',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 120,
                        name: 'especie',
                        description: 'Nivel taxonómico: especie',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 118,
                        name: 'familia',
                        description: 'Nivel taxonómico: familia',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 119,
                        name: 'genero',
                        description: 'Nivel taxonómico: genero',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 112,
                        name: 'nombre común',
                        description: 'Nivel taxonómico: nombre común',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 117,
                        name: 'orden',
                        description: 'Nivel taxonómico: orden',
                        icon: null,
                        is_categorical: true,
                    },
                ],
                should_imply: [
                    {
                        id: 423249,
                        value: 'Animalia',
                        term_type: 111,
                        term_type_name: 'reino',
                    },
                ],
            },
            {
                id: 2,
                name: 'Planta en Foto',
                description: 'Ocurrencia de planta en una fotografía',
                icon: 'http://localhost:8000/media/images/event_types/planta_en_foto.png',
                term_types: [
                    {
                        id: 115,
                        name: 'clase',
                        description: 'Nivel taxonómico: clase',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 120,
                        name: 'especie',
                        description: 'Nivel taxonómico: especie',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 118,
                        name: 'familia',
                        description: 'Nivel taxonómico: familia',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 119,
                        name: 'genero',
                        description: 'Nivel taxonómico: genero',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 112,
                        name: 'nombre común',
                        description: 'Nivel taxonómico: nombre común',
                        icon: null,
                        is_categorical: true,
                    },
                    {
                        id: 117,
                        name: 'orden',
                        description: 'Nivel taxonómico: orden',
                        icon: null,
                        is_categorical: true,
                    },
                ],
                should_imply: [
                    {
                        id: 423250,
                        value: 'Plantae',
                        term_type: 111,
                        term_type_name: 'reino',
                    },
                ],
            },
        ],
    },
    licence: {
        id: 1,
        is_active: true,
        licence_type: {
            id: 1,
            name: 'Abierta',
            can_view: true,
            can_download: true,
            can_annotate: true,
            years_valid_for: 9999,
        },
        created_by: {
            id: 1,
            username: 'admin',
            first_name: 'Santiago',
            last_name: 'Martínez',
            email: 'mb.santiago@hotmail.com',
        },
        created_on: '2019-11-25T00:30:01.289010-06:00',
        modified_by: null,
        modified_on: '2020-01-17T23:13:00.909150-06:00',
    },
    item_file:
        'http://localhost:8000/media/items/1/1/1/a5e0210d3c51edb77f382b1952a6ec1a87ff9a00f275ecd1db5ebc9214ce9b82_4Xflqgf.jpe',
    media_info: {},
    tags: [],
    metadata: {},
    captured_on: '2019-11-30T15:32:35.954649-06:00',
    ready_event_types: [],
    collection: {
        id: 1,
        name: 'Prueba',
        collection_type: 1,
    },
    created_by: {
        id: 1,
        username: 'admin',
        first_name: 'Santiago',
        last_name: 'Martínez',
        email: 'mb.santiago@hotmail.com',
    },
    modified_by: null,
    created_on: '2019-11-30T15:32:35.986999-06:00',
    modified_on: '2019-11-30T15:32:36.047605-06:00',
};
