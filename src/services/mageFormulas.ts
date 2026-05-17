import { MageState } from '../types/game';

export function calculateLabTotal(params: {
  mage: MageState;
  technique: string;
  form: string;
  laboratoryQuality: number;
  auraBonus: number;
  materialBonus: number;
  assistantBonus: number;
}) {
  if (!params.mage || !params.mage.characteristics || !params.mage.arts || !params.mage.abilities) return 0;
  
  const techValue = params.mage.arts.techniques[params.technique as keyof typeof params.mage.arts.techniques] || 0;
  const formValue = params.mage.arts.forms[params.form as keyof typeof params.mage.arts.forms] || 0;

  return (
    params.mage.characteristics.intelligence +
    params.mage.abilities.magicTheory +
    techValue +
    formValue +
    params.laboratoryQuality +
    params.auraBonus +
    params.materialBonus +
    params.assistantBonus
  );
}

export function calculateWritingQuality(params: {
  mage: MageState;
  scribeBonus: number;
  binderBonus: number;
  illuminatorBonus: number;
  resonanceBonus: number;
}) {
  if (!params.mage || !params.mage.characteristics || !params.mage.virtues) return 0;

  const goodTeacherBonus = params.mage.virtues.some(v => v.id === 'good_teacher') ? 3 : 0;

  return (
    params.mage.characteristics.communication +
    3 +
    goodTeacherBonus +
    params.scribeBonus +
    params.binderBonus +
    params.illuminatorBonus +
    params.resonanceBonus
  );
}

export function calculateWritingProgress(mage: MageState) {
  if (!mage || !mage.characteristics || !mage.abilities) return 0;
  return mage.characteristics.communication + mage.abilities.latin;
}

export function calculateDuelPower(params: {
  mage: MageState;
  technique: string;
  form: string;
  modifiers?: number;
}) {
  if (!params.mage || !params.mage.arts) return 0;
  
  const techValue = params.mage.arts.techniques[params.technique as keyof typeof params.mage.arts.techniques] || 0;
  const formValue = params.mage.arts.forms[params.form as keyof typeof params.mage.arts.forms] || 0;

  return techValue + formValue + (params.modifiers || 0);
}
