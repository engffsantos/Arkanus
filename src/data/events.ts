import { EventTemplate } from '../systems/events/eventTypes';

export const EVENT_DATABASE: EventTemplate[] = [
  {
    id: 'climate_event_1',
    title: 'Evento CLIMATE 1',
    description: 'Um evento da categoria climate acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'climate',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'climate_event_2',
    title: 'Evento CLIMATE 2',
    description: 'Um evento da categoria climate acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'climate',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'climate_event_3',
    title: 'Evento CLIMATE 3',
    description: 'Um evento da categoria climate acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'climate',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'climate_event_4',
    title: 'Evento CLIMATE 4',
    description: 'Um evento da categoria climate acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'climate',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'climate_event_5',
    title: 'Evento CLIMATE 5',
    description: 'Um evento da categoria climate acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'climate',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'political_event_1',
    title: 'Evento POLITICAL 1',
    description: 'Um evento da categoria political acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'political',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'political_event_2',
    title: 'Evento POLITICAL 2',
    description: 'Um evento da categoria political acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'political',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'political_event_3',
    title: 'Evento POLITICAL 3',
    description: 'Um evento da categoria political acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'political',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'political_event_4',
    title: 'Evento POLITICAL 4',
    description: 'Um evento da categoria political acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'political',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'political_event_5',
    title: 'Evento POLITICAL 5',
    description: 'Um evento da categoria political acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'political',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'religious_event_1',
    title: 'Evento RELIGIOUS 1',
    description: 'Um evento da categoria religious acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'religious',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'religious_event_2',
    title: 'Evento RELIGIOUS 2',
    description: 'Um evento da categoria religious acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'religious',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'religious_event_3',
    title: 'Evento RELIGIOUS 3',
    description: 'Um evento da categoria religious acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'religious',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'religious_event_4',
    title: 'Evento RELIGIOUS 4',
    description: 'Um evento da categoria religious acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'religious',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'religious_event_5',
    title: 'Evento RELIGIOUS 5',
    description: 'Um evento da categoria religious acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'religious',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'magical_event_1',
    title: 'Evento MAGICAL 1',
    description: 'Um evento da categoria magical acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'magical',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'magical_event_2',
    title: 'Evento MAGICAL 2',
    description: 'Um evento da categoria magical acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'magical',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'magical_event_3',
    title: 'Evento MAGICAL 3',
    description: 'Um evento da categoria magical acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'magical',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'magical_event_4',
    title: 'Evento MAGICAL 4',
    description: 'Um evento da categoria magical acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'magical',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'magical_event_5',
    title: 'Evento MAGICAL 5',
    description: 'Um evento da categoria magical acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'magical',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'economic_event_1',
    title: 'Evento ECONOMIC 1',
    description: 'Um evento da categoria economic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'economic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'economic_event_2',
    title: 'Evento ECONOMIC 2',
    description: 'Um evento da categoria economic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'economic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'economic_event_3',
    title: 'Evento ECONOMIC 3',
    description: 'Um evento da categoria economic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'economic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'economic_event_4',
    title: 'Evento ECONOMIC 4',
    description: 'Um evento da categoria economic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'economic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'economic_event_5',
    title: 'Evento ECONOMIC 5',
    description: 'Um evento da categoria economic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'economic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'health_event_1',
    title: 'Evento HEALTH 1',
    description: 'Um evento da categoria health acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'health',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'health_event_2',
    title: 'Evento HEALTH 2',
    description: 'Um evento da categoria health acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'health',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'health_event_3',
    title: 'Evento HEALTH 3',
    description: 'Um evento da categoria health acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'health',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'health_event_4',
    title: 'Evento HEALTH 4',
    description: 'Um evento da categoria health acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'health',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'health_event_5',
    title: 'Evento HEALTH 5',
    description: 'Um evento da categoria health acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'health',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'territorial_event_1',
    title: 'Evento TERRITORIAL 1',
    description: 'Um evento da categoria territorial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'territorial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'territorial_event_2',
    title: 'Evento TERRITORIAL 2',
    description: 'Um evento da categoria territorial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'territorial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'territorial_event_3',
    title: 'Evento TERRITORIAL 3',
    description: 'Um evento da categoria territorial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'territorial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'territorial_event_4',
    title: 'Evento TERRITORIAL 4',
    description: 'Um evento da categoria territorial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'territorial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'territorial_event_5',
    title: 'Evento TERRITORIAL 5',
    description: 'Um evento da categoria territorial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'territorial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'diplomatic_event_1',
    title: 'Evento DIPLOMATIC 1',
    description: 'Um evento da categoria diplomatic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'diplomatic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'diplomatic_event_2',
    title: 'Evento DIPLOMATIC 2',
    description: 'Um evento da categoria diplomatic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'diplomatic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'diplomatic_event_3',
    title: 'Evento DIPLOMATIC 3',
    description: 'Um evento da categoria diplomatic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'diplomatic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'diplomatic_event_4',
    title: 'Evento DIPLOMATIC 4',
    description: 'Um evento da categoria diplomatic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'diplomatic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'diplomatic_event_5',
    title: 'Evento DIPLOMATIC 5',
    description: 'Um evento da categoria diplomatic acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'diplomatic',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'laboratory_event_1',
    title: 'Evento LABORATORY 1',
    description: 'Um evento da categoria laboratory acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'laboratory',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'laboratory_event_2',
    title: 'Evento LABORATORY 2',
    description: 'Um evento da categoria laboratory acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'laboratory',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'laboratory_event_3',
    title: 'Evento LABORATORY 3',
    description: 'Um evento da categoria laboratory acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'laboratory',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'laboratory_event_4',
    title: 'Evento LABORATORY 4',
    description: 'Um evento da categoria laboratory acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'laboratory',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'laboratory_event_5',
    title: 'Evento LABORATORY 5',
    description: 'Um evento da categoria laboratory acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'laboratory',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'commercial_event_1',
    title: 'Evento COMMERCIAL 1',
    description: 'Um evento da categoria commercial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'commercial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'commercial_event_2',
    title: 'Evento COMMERCIAL 2',
    description: 'Um evento da categoria commercial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'commercial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'commercial_event_3',
    title: 'Evento COMMERCIAL 3',
    description: 'Um evento da categoria commercial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'commercial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'commercial_event_4',
    title: 'Evento COMMERCIAL 4',
    description: 'Um evento da categoria commercial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'commercial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'commercial_event_5',
    title: 'Evento COMMERCIAL 5',
    description: 'Um evento da categoria commercial acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'commercial',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'conflict_event_1',
    title: 'Evento CONFLICT 1',
    description: 'Um evento da categoria conflict acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'conflict',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'conflict_event_2',
    title: 'Evento CONFLICT 2',
    description: 'Um evento da categoria conflict acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'conflict',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'conflict_event_3',
    title: 'Evento CONFLICT 3',
    description: 'Um evento da categoria conflict acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'conflict',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'conflict_event_4',
    title: 'Evento CONFLICT 4',
    description: 'Um evento da categoria conflict acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'conflict',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'conflict_event_5',
    title: 'Evento CONFLICT 5',
    description: 'Um evento da categoria conflict acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'conflict',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'charter_event_1',
    title: 'Evento CHARTER 1',
    description: 'Um evento da categoria charter acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'charter',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'charter_event_2',
    title: 'Evento CHARTER 2',
    description: 'Um evento da categoria charter acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'charter',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'charter_event_3',
    title: 'Evento CHARTER 3',
    description: 'Um evento da categoria charter acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'charter',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'charter_event_4',
    title: 'Evento CHARTER 4',
    description: 'Um evento da categoria charter acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'charter',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'charter_event_5',
    title: 'Evento CHARTER 5',
    description: 'Um evento da categoria charter acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'charter',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'guild_event_1',
    title: 'Evento GUILD 1',
    description: 'Um evento da categoria guild acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'guild',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'guild_event_2',
    title: 'Evento GUILD 2',
    description: 'Um evento da categoria guild acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'guild',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'guild_event_3',
    title: 'Evento GUILD 3',
    description: 'Um evento da categoria guild acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'guild',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'guild_event_4',
    title: 'Evento GUILD 4',
    description: 'Um evento da categoria guild acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'guild',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'guild_event_5',
    title: 'Evento GUILD 5',
    description: 'Um evento da categoria guild acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'guild',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'aura_event_1',
    title: 'Evento AURA 1',
    description: 'Um evento da categoria aura acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'aura',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'aura_event_2',
    title: 'Evento AURA 2',
    description: 'Um evento da categoria aura acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'aura',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'aura_event_3',
    title: 'Evento AURA 3',
    description: 'Um evento da categoria aura acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'aura',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'aura_event_4',
    title: 'Evento AURA 4',
    description: 'Um evento da categoria aura acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'aura',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
  {
    id: 'aura_event_5',
    title: 'Evento AURA 5',
    description: 'Um evento da categoria aura acaba de ocorrer, exigindo a atenção da Soberania.',
    type: 'aura',
    weight: 10,
    conditions: [],
    choices: [
      {
        id: 'choice_1',
        label: 'Ignorar',
        description: 'Tentar seguir em frente sem agir.',
        effects: [{ target: 'covenant', path: 'unrest', operation: 'add', value: 2, description: 'Descontentamento leve.' }],
        logMessage: 'Decidimos ignorar o ocorrido.'
      },
      {
        id: 'choice_2',
        label: 'Investir Prata',
        description: 'Usar prata para mitigar os danos.',
        cost: { silver: 25 },
        effects: [{ target: 'covenant', path: 'loyalty', operation: 'add', value: 2, description: 'Lealdade comprada.' }],
        logMessage: 'Mitigamos a situação com prata.'
      }
    ]
  },
];
