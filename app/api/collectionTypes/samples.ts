import { CollectionType } from './types';

export const SAMPLE_COLLECTION_TYPE_INFO: CollectionType = {
    id: 1,
    name: 'PROREST',
    description:
        'El PROREST promueve la conservación y restauración de los ecosistemas representativos de las Áreas Naturales Protegidas, así como la protección y conservación de su biodiversidad, mediante el apoyo de estudios técnicos y acciones.',
    restrict_annotation_types: true,
    restrict_event_types: true,
    annotation_tools: [
        {
            id: 2,
            is_active: true,
            annotation_tool: {
                id: 2,
                annotation_type: {
                    id: 2,
                    name: 'Bounding Box',
                    description:
                        'Bounding Box annotation. The annotation consists of four numbers {top, bottom, left, right} which represent the top, botttom, left and right-most coordinates of the bounding box.',
                    icon: '/media/images/annotation_types/bounding_box_UtRF7Uy.png',
                    annotation_schema: {
                        $id: 'http://selia.conabio.gob.mx/schemas/annotation_types/bounding_box.json',
                        type: 'object',
                        title: 'Bounding Box',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        required: ['top', 'bottom', 'left', 'right'],
                        properties: {
                            top: {
                                $id: '#/properties/top',
                                type: 'number',
                                title: 'top',
                                default: 0.0,
                                examples: [1.2],
                            },
                            left: {
                                $id: '#/properties/left',
                                type: 'number',
                                title: 'left',
                                default: 0.0,
                                examples: [1.1],
                            },
                            right: {
                                $id: '#/properties/right',
                                type: 'number',
                                title: 'right',
                                default: 0.0,
                                examples: [2.3],
                            },
                            bottom: {
                                $id: '#/properties/bottom',
                                type: 'number',
                                title: 'bottom',
                                default: 0.0,
                                examples: [1.2],
                            },
                        },
                        definitions: {},
                        description:
                            'Bounding Box annotation. The annotation consists of four numbers {top, bottom, left, right} which represent the top, botttom, left and right-most coordinates of the bounding box.',
                    },
                },
                name: 'Selia Bounding Box Annotator',
                version: '2.1.0',
                logo: null,
                website: 'https://github.com/mbsantiago/selia-bounding-box-annotator',
            },
            javascript_file: '/media/annotators/Selia_Bounding_Box_Annotator_2_1_0._1ATJkUB.js',
        },
    ],
    event_types: [
        {
            id: 1,
            name: 'Animal en Foto',
            description: 'Ocurrencia de animal en una fotografía',
            icon: 'http://localhost:8000/media/images/event_types/animal_en_foto.png',
            term_types: [
                { id: 115, name: 'clase', description: 'Nivel taxonómico: clase', icon: null, is_categorical: true },
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
                { id: 119, name: 'genero', description: 'Nivel taxonómico: genero', icon: null, is_categorical: true },
                {
                    id: 112,
                    name: 'nombre común',
                    description: 'Nivel taxonómico: nombre común',
                    icon: null,
                    is_categorical: true,
                },
                { id: 117, name: 'orden', description: 'Nivel taxonómico: orden', icon: null, is_categorical: true },
            ],
            should_imply: [{ id: 423249, value: 'Animalia', term_type: 111, term_type_name: 'reino' }],
        },
        {
            id: 3,
            name: 'Murci',
            description: 'asdfawef',
            icon: 'http://localhost:8000/media/images/event_types/batnote.png',
            term_types: [
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
                { id: 119, name: 'genero', description: 'Nivel taxonómico: genero', icon: null, is_categorical: true },
                { id: 111, name: 'reino', description: 'Nivel taxonómico: reino', icon: null, is_categorical: true },
            ],
            should_imply: [
                { id: 442420, value: 'Chiroptera', term_type: 117, term_type_name: 'orden' },
                { id: 423249, value: 'Animalia', term_type: 111, term_type_name: 'reino' },
            ],
        },
    ],
};
