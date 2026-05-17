import fs from 'fs';
import path from 'path';

const types = [
  'climate', 'political', 'religious', 'magical', 'economic', 
  'health', 'territorial', 'diplomatic', 'laboratory', 
  'commercial', 'conflict', 'charter', 'guild', 'aura'
];

let eventsStr = `import { EventTemplate } from '../systems/events/eventTypes';\n\n`;
eventsStr += `export const EVENT_DATABASE: EventTemplate[] = [\n`;

let idCounter = 1;
for (const type of types) {
  for (let i = 1; i <= 5; i++) {
    const evId = `${type}_event_${i}`;
    eventsStr += `  {
    id: '${evId}',
    title: 'Evento ${type.toUpperCase()} ${i}',
    description: 'Um evento da categoria ${type} acaba de ocorrer, exigindo a atenção da Soberania.',
    type: '${type}',
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
  },\n`;
  }
}

eventsStr += `];\n`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/events.ts'), eventsStr);
console.log('Generated 70 events in src/data/events.ts');
