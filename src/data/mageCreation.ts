// src/data/mageCreation.ts
// Dados estáticos para o sistema de criação do mago fundador.
// Todas as tradições são propriedades originais do jogo Arkanus.

export type MageOriginId =
  | 'urban_academic'
  | 'rural_folk'
  | 'noble_heir'
  | 'monastic_scholar'
  | 'merchant_traveler'
  | 'unknown_legacy';

export type MageTraditionId =
  | 'green_tower'
  | 'mirror_circle'
  | 'red_flame_order'
  | 'oak_lineage'
  | 'grey_mercury_school'
  | 'veil_brotherhood'
  | 'perfect_body_brotherhood';

export type MageSpecializationId =
  | 'laboratory_researcher'
  | 'erudite_scholar'
  | 'feudal_lord'
  | 'hermetic_diplomat'
  | 'arcane_merchant'
  | 'aura_explorer'
  | 'hermetic_physician'
  | 'certamen_duelist';

export type InitialLaboratoryId =
  | 'ancient_tower'
  | 'converted_chapel'
  | 'forest_sanctum'
  | 'underground_vault'
  | 'coastal_lighthouse';

export type MageAmbitionId =
  | 'found_great_library'
  | 'master_all_forms'
  | 'establish_dynasty'
  | 'discover_lost_art'
  | 'unite_tribunals'
  | 'transcend_mortality';

export type MageVirtueId =
  | 'good_teacher'
  | 'prolific_writer'
  | 'affinity_creo'
  | 'affinity_rego'
  | 'affinity_corpus'
  | 'second_sight'
  | 'wilderness_sense'
  | 'student_of_realm'
  | 'cautious_sorcerer'
  | 'free_study';

export type MageFlawId =
  | 'blatant_gift'
  | 'difficult_longevity'
  | 'overconfident'
  | 'driven'
  | 'reckless'
  | 'hedge_wizard_stigma'
  | 'weak_enchanter';

export interface MageAppearance {
  portrait: 'elder_male' | 'elder_female' | 'middle_male' | 'middle_female' | 'young_male' | 'young_female';
  vestment: 'robes_dark' | 'robes_crimson' | 'robes_grey' | 'scholar_attire' | 'noble_dress';
  symbol: string;
}

export interface MageCreationChoice<TId extends string> {
  id: TId;
  name: string;
  description: string;
  bonuses: { field: string; value: number; label: string }[];
  penalties: { field: string; value: number; label: string }[];
  startingEvents: string[];
  tags: string[];
}

// ── Origens ──────────────────────────────────────────────────────────────────

export const MAGE_ORIGINS: MageCreationChoice<MageOriginId>[] = [
  {
    id: 'urban_academic',
    name: 'Acadêmico Urbano',
    description: 'Formado em universidade ou scriptorium. Conhece Latim, Filosofia e as redes de poder eclesiástico.',
    bonuses: [{ field: 'mage.magicTheory', value: 2, label: '+2 Teoria Arcana' }, { field: 'mage.abilities.latin', value: 1, label: '+1 Latim' }],
    penalties: [{ field: 'resources.influencia', value: -5, label: '-5 Influência inicial' }],
    startingEvents: ['Chegou às terras trazendo um grimório de estudante e dois livros de lógica escolástica.'],
    tags: ['intelectual', 'erudito'],
  },
  {
    id: 'rural_folk',
    name: 'Povo Rural',
    description: 'Cresceu em aldeia isolada. Conhece a terra, os ciclos e os espíritos menores.',
    bonuses: [{ field: 'covenant.publicHealth', value: 10, label: '+10 Saúde Pública' }, { field: 'covenant.population', value: 500, label: '+500 População' }],
    penalties: [{ field: 'mage.abilities.latin', value: -1, label: '-1 Latim' }],
    startingEvents: ['Os camponeses da região reconhecem o Mago como protetor ancestral do território.'],
    tags: ['terreno', 'popular'],
  },
  {
    id: 'noble_heir',
    name: 'Herdeiro Nobre',
    description: 'Nasceu em família de elite, mas foi apartado pela Dádiva. Mantém contatos aristocráticos.',
    bonuses: [{ field: 'resources.prata', value: 1000, label: '+1000 Prata' }, { field: 'resources.influencia', value: 10, label: '+10 Influência' }],
    penalties: [{ field: 'covenant.loyalty', value: -10, label: '-10 Lealdade (suspeita de sangue nobre)' }],
    startingEvents: ['Um primo distante envia uma carta reclamando parte das terras por herança.'],
    tags: ['político', 'rico'],
  },
  {
    id: 'monastic_scholar',
    name: 'Erudito Monástico',
    description: 'Formado em mosteiro. Lê Grego, conhece Medicina e possui acesso a scriptorium.',
    bonuses: [{ field: 'library.capacity', value: 20, label: '+20 Capacidade da Biblioteca' }, { field: 'mage.abilities.medicine', value: 1, label: '+1 Medicina' }],
    penalties: [{ field: 'covenant.auraArcana', value: -1, label: '-1 Aura Arcana (formação sacra)' }],
    startingEvents: ['Um irmão leigo jurou lealdade ao Mago e traz consigo cópias de textos raros.'],
    tags: ['erudito', 'sacro'],
  },
  {
    id: 'merchant_traveler',
    name: 'Viajante Mercador',
    description: 'Percorreu rotas comerciais antes de ser encontrado. Conhece mercados, idiomas e pessoas.',
    bonuses: [{ field: 'commerce.routes', value: 1, label: '+1 Rota Comercial inicial' }, { field: 'mage.abilities.bargain', value: 1, label: '+1 Negociação' }],
    penalties: [{ field: 'mage.magicTheory', value: -1, label: '-1 Teoria Arcana' }],
    startingEvents: ['Uma rede de contatos em três cidades oferece crédito e informações ao Mago.'],
    tags: ['comércio', 'viajante'],
  },
  {
    id: 'unknown_legacy',
    name: 'Legado Desconhecido',
    description: 'Origem obscura. Ninguém sabe ao certo de onde veio. Liberdade máxima, mas sem rede de apoio.',
    bonuses: [{ field: 'mage.arts.techniques.vim', value: 2, label: '+2 Vim (magia instintiva)' }],
    penalties: [{ field: 'resources.influencia', value: -10, label: '-10 Influência (sem rede)' }],
    startingEvents: ['Rumores circulam nas tabernas sobre a origem sombria do novo senhor arcano.'],
    tags: ['misterioso', 'flexível'],
  },
];

// ── Tradições ─────────────────────────────────────────────────────────────────

export const MAGE_TRADITIONS: MageCreationChoice<MageTraditionId>[] = [
  {
    id: 'green_tower',
    name: 'Casa da Torre Verde',
    description: 'Tradição de laboratoristas e criadores. Priorizam Creo, Corpus e pesquisa longa. Rivalizam com a Chama Rubra.',
    bonuses: [{ field: 'laboratory.quality', value: 2, label: '+2 Qualidade do Laboratório' }, { field: 'mage.arts.techniques.creo', value: 2, label: '+2 Creo' }],
    penalties: [{ field: 'covenant.security', value: -5, label: '-5 Segurança (reclusos)' }],
    startingEvents: ['Um tratado da Torre Verde chega com instruções sobre o preparo do laboratório fundador.'],
    tags: ['laboratório', 'creo'],
  },
  {
    id: 'mirror_circle',
    name: 'Círculo do Espelho',
    description: 'Especialistas em Intellego e segredos. Tecem redes de informação entre tribunais.',
    bonuses: [{ field: 'mage.arts.techniques.intellego', value: 3, label: '+3 Intellego' }, { field: 'resources.influencia', value: 5, label: '+5 Influência' }],
    penalties: [{ field: 'covenant.loyalty', value: -5, label: '-5 Lealdade (segredos criam desconfiança)' }],
    startingEvents: ['Uma rede de espiões do Círculo oferece informações sobre vizinhos por um preço.'],
    tags: ['espionagem', 'intellego'],
  },
  {
    id: 'red_flame_order',
    name: 'Ordem da Chama Rubra',
    description: 'Guerreiros arcanos. Dominam Ignem e Perdo. Usados em conflitos e disputas de território.',
    bonuses: [{ field: 'mage.arts.forms.ignem', value: 3, label: '+3 Ignem' }, { field: 'covenant.security', value: 15, label: '+15 Segurança' }],
    penalties: [{ field: 'covenant.auraSacra', value: -2, label: '-2 Aura Sacra (reputação violenta)' }],
    startingEvents: ['Um emissário da Ordem chega pedindo apoio em disputa territorial próxima.'],
    tags: ['combate', 'ignem'],
  },
  {
    id: 'oak_lineage',
    name: 'Linhagem do Carvalho',
    description: 'Magos da terra e da floresta. Herbam, Animal e cura. Muito respeitados por camponeses.',
    bonuses: [{ field: 'mage.arts.forms.herbam', value: 2, label: '+2 Herbam' }, { field: 'covenant.publicHealth', value: 15, label: '+15 Saúde Pública' }],
    penalties: [{ field: 'mage.magicTheory', value: -1, label: '-1 Teoria Arcana (tradição oral)' }],
    startingEvents: ['Os anciões da floresta próxima reconhecem o símbolo do Carvalho e oferecem guia.'],
    tags: ['natureza', 'cura'],
  },
  {
    id: 'grey_mercury_school',
    name: 'Escola do Mercúrio Cinzento',
    description: 'Diplomatas e intriguistas. Rego e Mentem. Sempre presentes nos Tribunais Arcanos.',
    bonuses: [{ field: 'mage.arts.techniques.rego', value: 2, label: '+2 Rego' }, { field: 'mage.abilities.law', value: 1, label: '+1 Jurisprudência' }],
    penalties: [{ field: 'covenant.security', value: -10, label: '-10 Segurança (inimigos políticos)' }],
    startingEvents: ['Um tratado de aliança chega assinado por três soberanias vizinhas coordenadas pela Escola.'],
    tags: ['diplomacia', 'rego'],
  },
  {
    id: 'veil_brotherhood',
    name: 'Confraria do Véu',
    description: 'Mestres do oculto e da Imaginem. Operam nas sombras, raramente revelando sua filiação.',
    bonuses: [{ field: 'mage.arts.forms.imaginem', value: 3, label: '+3 Imaginem' }, { field: 'covenant.unrest', value: -10, label: '-10 Agitação (passam despercebidos)' }],
    penalties: [{ field: 'resources.influencia', value: -8, label: '-8 Influência (identidade velada)' }],
    startingEvents: ['Nenhuma outra soberania sabe que o Mago pertence à Confraria — por enquanto.'],
    tags: ['oculto', 'imaginem'],
  },
  {
    id: 'perfect_body_brotherhood',
    name: 'Irmandade do Corpo Perfeito',
    description: 'Físicos e curandeiros arcanos. Corpus e Creo. Muito demandados em epidemias.',
    bonuses: [{ field: 'mage.arts.forms.corpus', value: 3, label: '+3 Corpus' }, { field: 'health.physicians', value: 1, label: '+1 Médico Inicial' }],
    penalties: [{ field: 'covenant.security', value: -5, label: '-5 Segurança (pacifistas)' }],
    startingEvents: ['Uma caravana de doentes chega às portas pedindo o auxílio do renomado curandeiro.'],
    tags: ['cura', 'corpus'],
  },
];

// ── Especializações ──────────────────────────────────────────────────────────

export const MAGE_SPECIALIZATIONS: MageCreationChoice<MageSpecializationId>[] = [
  { id: 'laboratory_researcher', name: 'Laboratorista', description: 'Foca em pesquisa, criação de magias e aprimoramento do laboratório.', bonuses: [{ field: 'laboratory.quality', value: 2, label: '+2 Qualidade de Lab' }], penalties: [], startingEvents: [], tags: ['lab'] },
  { id: 'erudite_scholar', name: 'Erudito', description: 'Coleciona e escreve livros. Melhora biblioteca e escrita.', bonuses: [{ field: 'library.capacity', value: 25, label: '+25 Capacidade Biblioteca' }], penalties: [], startingEvents: [], tags: ['biblioteca'] },
  { id: 'feudal_lord', name: 'Senhor Feudal', description: 'Administra o domínio como nobre. Bônus em lealdade e segurança.', bonuses: [{ field: 'covenant.loyalty', value: 15, label: '+15 Lealdade' }], penalties: [], startingEvents: [], tags: ['governança'] },
  { id: 'hermetic_diplomat', name: 'Diplomata Hermético', description: 'Especialista em relações com Tribunais e outras soberanias.', bonuses: [{ field: 'resources.influencia', value: 15, label: '+15 Influência' }], penalties: [], startingEvents: [], tags: ['diplomacia'] },
  { id: 'arcane_merchant', name: 'Mercador Arcano', description: 'Opera no comércio de Vis e itens arcanos.', bonuses: [{ field: 'resources.prata', value: 800, label: '+800 Prata' }], penalties: [], startingEvents: [], tags: ['comércio'] },
  { id: 'aura_explorer', name: 'Explorador de Auras', description: 'Busca e mapeia fontes de Essência. Reduz risco de explorações.', bonuses: [{ field: 'covenant.auraArcana', value: 2, label: '+2 Aura Arcana' }], penalties: [], startingEvents: [], tags: ['exploração'] },
  { id: 'hermetic_physician', name: 'Médico Hermético', description: 'Trata doenças com magia. Melhora saúde pública.', bonuses: [{ field: 'health.sanitation', value: 15, label: '+15 Saneamento' }], penalties: [], startingEvents: [], tags: ['saúde'] },
  { id: 'certamen_duelist', name: 'Duelista', description: 'Especialista em Certâmen. Resolve disputas pelo duelo arcano.', bonuses: [{ field: 'resources.prestigio', value: 10, label: '+10 Prestígio inicial' }], penalties: [], startingEvents: [], tags: ['combate'] },
];

// ── Virtudes ─────────────────────────────────────────────────────────────────

export const MAGE_VIRTUES: MageCreationChoice<MageVirtueId>[] = [
  { id: 'good_teacher', name: 'Bom Professor', description: '+3 em pontuação de ensino ao escrever livros de qualidade.', bonuses: [{ field: 'library.teachingBonus', value: 3, label: '+3 Qualidade de Ensino' }], penalties: [], startingEvents: [], tags: ['biblioteca'] },
  { id: 'prolific_writer', name: 'Escritor Prolífico', description: 'Conclui transcrições 25% mais rápido.', bonuses: [{ field: 'library.writingSpeed', value: 1, label: '+25% Velocidade de Escrita' }], penalties: [], startingEvents: [], tags: ['biblioteca'] },
  { id: 'affinity_creo', name: 'Afinidade: Creo', description: 'XP em Creo conta dobrado.', bonuses: [{ field: 'mage.arts.techniques.creo', value: 3, label: '+3 Creo inicial' }], penalties: [], startingEvents: [], tags: ['arte'] },
  { id: 'affinity_rego', name: 'Afinidade: Rego', description: 'XP em Rego conta dobrado.', bonuses: [{ field: 'mage.arts.techniques.rego', value: 3, label: '+3 Rego inicial' }], penalties: [], startingEvents: [], tags: ['arte'] },
  { id: 'affinity_corpus', name: 'Afinidade: Corpus', description: 'XP em Corpus conta dobrado.', bonuses: [{ field: 'mage.arts.forms.corpus', value: 3, label: '+3 Corpus inicial' }], penalties: [], startingEvents: [], tags: ['arte'] },
  { id: 'second_sight', name: 'Segunda Visão', description: 'Detecta ilusões e invisíveis automaticamente.', bonuses: [{ field: 'mage.abilities.perception', value: 2, label: '+2 Percepção (visão arcana)' }], penalties: [], startingEvents: [], tags: ['percepção'] },
  { id: 'wilderness_sense', name: 'Sentido Selvagem', description: 'Nunca se perde; reduz risco de exploração de locais.', bonuses: [{ field: 'territory.borderRisk', value: -5, label: '-5 Risco Territorial' }], penalties: [], startingEvents: [], tags: ['exploração'] },
  { id: 'cautious_sorcerer', name: 'Mago Cauteloso', description: 'Falhas catastróficas ocorrem com muito menos frequência.', bonuses: [{ field: 'laboratory.safety', value: 2, label: '+2 Segurança de Lab' }], penalties: [], startingEvents: [], tags: ['lab'] },
  { id: 'free_study', name: 'Estudo Livre', description: 'Aprende mais rápido de fontes não convencionais.', bonuses: [{ field: 'mage.magicTheory', value: 1, label: '+1 Teoria Arcana' }], penalties: [], startingEvents: [], tags: ['erudito'] },
];

// ── Defeitos ──────────────────────────────────────────────────────────────────

export const MAGE_FLAWS: MageCreationChoice<MageFlawId>[] = [
  { id: 'blatant_gift', name: 'Dádiva Gritante', description: 'Animais e pessoas sentem sua magia imediatamente. Relações sociais penalizadas.', bonuses: [], penalties: [{ field: 'covenant.loyalty', value: -15, label: '-15 Lealdade' }], startingEvents: ['Os servos da soberania tremem na presença do Mago.'], tags: ['social'] },
  { id: 'difficult_longevity', name: 'Longevidade Difícil', description: 'A poção da longevidade custa mais Vis e esforço de laboratório.', bonuses: [], penalties: [{ field: 'laboratory.quality', value: -1, label: '-1 Qualidade de Lab (eficiência reduzida)' }], startingEvents: [], tags: ['lab'] },
  { id: 'overconfident', name: 'Arrogante', description: 'Tende a subestimar oponentes. Pode gerar conflitos desnecessários.', bonuses: [], penalties: [{ field: 'resources.influencia', value: -5, label: '-5 Influência' }], startingEvents: ['Um rival ofendido jura retaliação após uma humilhação pública.'], tags: ['social'] },
  { id: 'driven', name: 'Obcecado', description: 'Persegue a ambição com fervor incontrolável. Ignora outros aspectos da gestão.', bonuses: [], penalties: [{ field: 'covenant.publicHealth', value: -5, label: '-5 Saúde Pública (negligência)' }], startingEvents: [], tags: ['comportamento'] },
  { id: 'reckless', name: 'Imprudente', description: 'Age sem medir consequências em situações de pressão.', bonuses: [], penalties: [{ field: 'laboratory.safety', value: -2, label: '-2 Segurança de Lab' }], startingEvents: [], tags: ['comportamento'] },
  { id: 'hedge_wizard_stigma', name: 'Estigma de Feiticeiro Vulgar', description: 'Outros magos tratam você com condescendência por sua origem ou métodos.', bonuses: [], penalties: [{ field: 'resources.prestigio', value: -10, label: '-10 Prestígio' }], startingEvents: ['No primeiro Tribunal, outros magos questionam sua linhagem publicamente.'], tags: ['social'] },
  { id: 'weak_enchanter', name: 'Encantador Fraco', description: 'Criação de itens arcanos custa o dobro do esforço de laboratório.', bonuses: [], penalties: [{ field: 'laboratory.quality', value: -2, label: '-2 Qualidade de Lab (encantamentos)' }], startingEvents: [], tags: ['lab'] },
];

// ── Laboratórios Iniciais ─────────────────────────────────────────────────────

export const INITIAL_LABORATORIES: MageCreationChoice<InitialLaboratoryId>[] = [
  { id: 'ancient_tower', name: 'Torre Ancestral', description: 'Alta e imponente. Boa aura, mas exige manutenção constante.', bonuses: [{ field: 'laboratory.level', value: 1, label: '+1 Nível de Lab' }, { field: 'covenant.auraArcana', value: 1, label: '+1 Aura Arcana' }], penalties: [{ field: 'covenant.expensesPerSeason', value: 50, label: '+50 Despesas/Estação' }], startingEvents: [], tags: ['aura'] },
  { id: 'converted_chapel', name: 'Capela Convertida', description: 'Antiga capelinha desativada, re-consagrada à magia.', bonuses: [{ field: 'laboratory.safety', value: 2, label: '+2 Segurança' }], penalties: [{ field: 'covenant.auraSacra', value: -1, label: '-1 Aura Sacra' }], startingEvents: [], tags: ['segurança'] },
  { id: 'forest_sanctum', name: 'Santuário Florestal', description: 'Laboratório oculto na floresta. Difícil de encontrar por inimigos.', bonuses: [{ field: 'territory.borderRisk', value: -10, label: '-10 Risco Territorial' }, { field: 'covenant.auraEncantada', value: 2, label: '+2 Aura Encantada' }], penalties: [{ field: 'laboratory.quality', value: -1, label: '-1 Qualidade (condições rústicas)' }], startingEvents: [], tags: ['oculto'] },
  { id: 'underground_vault', name: 'Cofre Subterrâneo', description: 'Câmara abaixo da fortaleza. Extremamente segura.', bonuses: [{ field: 'laboratory.safety', value: 4, label: '+4 Segurança' }, { field: 'covenant.security', value: 5, label: '+5 Segurança do Domínio' }], penalties: [{ field: 'laboratory.quality', value: -2, label: '-2 Qualidade (sem luz natural)' }], startingEvents: [], tags: ['segurança'] },
  { id: 'coastal_lighthouse', name: 'Farol Costeiro', description: 'Em promontório à beira-mar. Excelente para Auram e observação.', bonuses: [{ field: 'mage.arts.forms.auram', value: 2, label: '+2 Auram' }, { field: 'commerce.routeBonus', value: 1, label: '+1 Rota Comercial (acesso marítimo)' }], penalties: [{ field: 'covenant.security', value: -10, label: '-10 Segurança (exposição)' }], startingEvents: [], tags: ['auram'] },
];

// ── Ambições ──────────────────────────────────────────────────────────────────

export const MAGE_AMBITIONS: MageCreationChoice<MageAmbitionId>[] = [
  { id: 'found_great_library', name: 'Fundar a Grande Biblioteca', description: 'Construir a maior coleção de conhecimento arcano do tribunal.', bonuses: [{ field: 'library.capacity', value: 50, label: '+50 Capacidade Biblioteca (ambição motiva investimento)' }], penalties: [], startingEvents: [], tags: ['biblioteca'] },
  { id: 'master_all_forms', name: 'Dominar Todas as Formas', description: 'Atingir nível 10 em todas as dez Formas arcanas.', bonuses: [{ field: 'mage.arts.forms.vim', value: 1, label: '+1 Vim (foco nas formas)' }], penalties: [], startingEvents: [], tags: ['arte'] },
  { id: 'establish_dynasty', name: 'Estabelecer uma Dinastia', description: 'Garantir que a soberania persista por gerações.', bonuses: [{ field: 'covenant.loyalty', value: 10, label: '+10 Lealdade (propósito claro)' }], penalties: [], startingEvents: [], tags: ['governança'] },
  { id: 'discover_lost_art', name: 'Redescobrir Arte Perdida', description: 'Encontrar e restaurar uma arte arcana esquecida.', bonuses: [{ field: 'mage.magicTheory', value: 1, label: '+1 Teoria Arcana' }], penalties: [], startingEvents: [], tags: ['pesquisa'] },
  { id: 'unite_tribunals', name: 'Unir os Tribunais', description: 'Tornar-se o árbitro reconhecido entre fações rivais.', bonuses: [{ field: 'resources.influencia', value: 10, label: '+10 Influência' }], penalties: [], startingEvents: [], tags: ['diplomacia'] },
  { id: 'transcend_mortality', name: 'Transcender a Mortalidade', description: 'Vencer o envelhecimento e atingir a Apoteose Hermética.', bonuses: [{ field: 'mage.warping', value: 0, label: 'Foco em longevidade (longo prazo)' }], penalties: [], startingEvents: [], tags: ['pesquisa'] },
];

// ── Configuração completa de criação ─────────────────────────────────────────

export interface MageCreationConfig {
  // Identidade
  mageName: string;
  title: string;
  age: number;
  originRegion: string;
  personalSymbol: string;
  // Aparência
  appearance: MageAppearance;
  // Escolhas
  origin: MageOriginId;
  tradition: MageTraditionId;
  specialization: MageSpecializationId;
  initialLaboratory: InitialLaboratoryId;
  ambition: MageAmbitionId;
  virtues: [MageVirtueId, MageVirtueId];
  flaw: MageFlawId;
  // Atributos (10 pts distribuídos, -1 a +3)
  characteristics: {
    intelligence: number;
    communication: number;
    perception: number;
    presence: number;
    strength: number;
    stamina: number;
    dexterity: number;
    quickness: number;
  };
  // Artes (1 principal T=5, 1 principal F=5, 2 sec=3, 3 menores=1)
  arts: {
    primaryTechnique: string;
    primaryForm: string;
    secondaryArts: string[];
    minorArts: string[];
  };
}
