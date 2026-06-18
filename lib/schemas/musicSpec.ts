import { z } from 'zod';

export const MusicSpecSchema = z.object({
  id: z.string(),
  title: z.string().default('Untitled MusicSpec'),
  createdAt: z.string(),
  updatedAt: z.string(),
  intent: z.object({
    task: z.enum(['create', 'enhance', 'analyze', 'rewrite', 'arrange', 'evaluate']),
    description: z.string().min(1, 'Describe the musical idea.'),
    emotionalGoal: z.array(z.string()).default([]),
    audienceOrUseCase: z.string().optional(),
  }),
  style: z.object({
    primaryGenre: z.string().min(1, 'Primary genre is required.'),
    secondaryGenres: z.array(z.string()).default([]),
    era: z.string().optional(),
    culturalOrRegionalInfluence: z.array(z.string()).default([]),
    avoidDirectArtistImitation: z.boolean().default(true),
    descriptiveStyleTraits: z.array(z.string()).default([]),
  }),
  theory: z.object({
    key: z.string().optional(),
    mode: z.string().optional(),
    scale: z.array(z.string()).default([]),
    bpm: z.number().min(30).max(240).optional(),
    meter: z.string().default('4/4'),
    chordProgression: z.array(z.string()).default([]),
    harmonicRhythm: z.string().optional(),
    modulationPlan: z.string().optional(),
    circleOfFifthsRelationship: z.string().optional(),
  }),
  rhythm: z.object({
    groove: z.string().optional(),
    swing: z.string().optional(),
    drumFeel: z.string().optional(),
    percussionElements: z.array(z.string()).default([]),
    syncopationLevel: z.enum(['low', 'medium', 'high']).optional(),
  }),
  arrangement: z.object({
    songStructure: z.array(z.string()).default([]),
    sectionEnergyCurve: z.record(z.string(), z.string()).default({}),
    transitions: z.array(z.string()).default([]),
    callAndResponse: z.boolean().optional(),
    breakdowns: z.array(z.string()).default([]),
  }),
  instrumentation: z.object({
    drums: z.array(z.string()).default([]), bass: z.array(z.string()).default([]), harmonicInstruments: z.array(z.string()).default([]), melodicInstruments: z.array(z.string()).default([]), orchestral: z.array(z.string()).default([]), vocals: z.array(z.string()).default([]), synths: z.array(z.string()).default([]), soundDesign: z.array(z.string()).default([]),
  }),
  lyrics: z.object({ language: z.string().default('English'), theme: z.string().optional(), pointOfView: z.string().optional(), rhymeDensity: z.string().optional(), hookConcept: z.string().optional(), prohibitedContent: z.array(z.string()).default([]) }).optional(),
  production: z.object({ sonicPalette: z.array(z.string()).default([]), mixTraits: z.array(z.string()).default([]), masteringTarget: z.string().optional(), spatialDesign: z.string().optional(), texture: z.array(z.string()).default([]) }),
  constraints: z.object({ mustInclude: z.array(z.string()).default([]), mustAvoid: z.array(z.string()).default([]), negativePrompt: z.array(z.string()).default([]), platformLimits: z.record(z.string(), z.union([z.string(), z.number()])).default({}) }),
  outputs: z.object({ universalPrompt: z.string().optional(), platformPrompt: z.string().optional(), apiPayload: z.unknown().optional(), evaluationReport: z.string().optional() }).default({}),
});
export type MusicSpec = z.infer<typeof MusicSpecSchema>;
export const chip = (value?: string) => (value ?? '').split(',').map((x) => x.trim()).filter(Boolean);
export const createDefaultMusicSpec = (): MusicSpec => ({
  id: crypto.randomUUID(), title: 'Dark Latin Trap Freedom Anthem', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  intent: { task: 'create', description: 'A cinematic freedom anthem for AI music generation.', emotionalGoal: ['defiant', 'militant', 'triumphant'], audienceOrUseCase: 'sync-ready anthem' },
  style: { primaryGenre: 'Latin trap', secondaryGenres: ['cinematic hip-hop'], culturalOrRegionalInfluence: ['Latin brass'], avoidDirectArtistImitation: true, descriptiveStyleTraits: ['dark', 'epic', 'street-orchestral'] },
  theory: { key: 'F minor', mode: 'Aeolian', scale: ['F','G','Ab','Bb','C','Db','Eb'], bpm: 96, meter: '4/4', chordProgression: ['Fm','Db','Eb','C'], harmonicRhythm: 'one chord per bar' },
  rhythm: { groove: 'half-time trap bounce', swing: 'light 57% hat swing', drumFeel: 'heavy 808 kick with crisp snare', percussionElements: ['clave accents','low tom fills'], syncopationLevel: 'medium' },
  arrangement: { songStructure: ['Intro','Verse','Hook','Verse 2','Bridge','Final Hook'], sectionEnergyCurve: { Intro: 'low', Verse: 'medium', Hook: 'high', Bridge: 'medium-high' }, transitions: ['riser into hook','choir swell bridge'], callAndResponse: true, breakdowns: ['drum-drop before final hook'] },
  instrumentation: { drums: ['808 kick','trap hats','snare'], bass: ['distorted 808'], harmonicInstruments: ['minor piano stabs'], melodicInstruments: ['mariachi-style brass phrases'], orchestral: ['low strings','choir swells'], vocals: ['defiant lead vocal','chant hook'], synths: ['gritty saw risers'], soundDesign: ['impacts','reverse cymbals'] },
  lyrics: { language: 'English', theme: 'freedom and equality', pointOfView: 'first-person plural', rhymeDensity: 'medium', hookConcept: 'chantable liberation slogan', prohibitedContent: ['copyrighted lyric imitation'] },
  production: { sonicPalette: ['dark','cinematic','gritty'], mixTraits: ['wide brass','centered vocal','controlled sub'], masteringTarget: 'loud streaming master with headroom', spatialDesign: 'deep stage with focused low-end', texture: ['analog grit','choir air'] },
  constraints: { mustInclude: ['explosive chant hook'], mustAvoid: ['bright pop polish','parody mariachi','soft drums'], negativePrompt: ['cheerful mood','thin bass'], platformLimits: { suno: 1000 } }, outputs: {}
});
