import type { MusicSpec } from '@/lib/schemas/musicSpec';

const join = (a?: string[]) => a?.filter(Boolean).join(', ') || 'unspecified';
const artistRisk = /\b(like|in the style of|sounds like|as if|copy)\b/i;
const vague = /\b(cool|good|nice|vibe|stuff|something|modern|unique)\b/i;

export type Target = 'universal' | 'suno' | 'elevenlabs' | 'lyria' | 'json';
export type QaFinding = { level: 'warning' | 'error' | 'info'; title: string; detail: string };

export function universalPrompt(spec: MusicSpec) {
  return `${spec.style.descriptiveStyleTraits.join(' ')} ${spec.style.primaryGenre} for ${spec.intent.audienceOrUseCase || 'music generation'}, ${spec.theory.bpm ?? 'target'} BPM, ${spec.theory.key || 'clear tonal center'} ${spec.theory.mode || ''}, ${spec.theory.meter}. Emotional goal: ${join(spec.intent.emotionalGoal)}. Harmony: ${join(spec.theory.chordProgression)} with ${spec.theory.harmonicRhythm || 'clear section movement'}. Rhythm: ${spec.rhythm.groove || 'defined groove'}, ${spec.rhythm.drumFeel || 'intentional drums'}, ${spec.rhythm.swing || 'straight feel'}, percussion ${join(spec.rhythm.percussionElements)}. Instrumentation: drums ${join(spec.instrumentation.drums)}, bass ${join(spec.instrumentation.bass)}, harmony ${join(spec.instrumentation.harmonicInstruments)}, melody ${join(spec.instrumentation.melodicInstruments)}, orchestral ${join(spec.instrumentation.orchestral)}, synths ${join(spec.instrumentation.synths)}, vocals ${join(spec.instrumentation.vocals)}. Arrangement: ${join(spec.arrangement.songStructure)}; transitions ${join(spec.arrangement.transitions)}; breakdowns ${join(spec.arrangement.breakdowns)}. Lyrics: ${spec.lyrics?.language || 'English'} ${spec.lyrics?.theme || 'theme-led'} vocal with ${spec.lyrics?.hookConcept || 'memorable hook'}. Production: ${join(spec.production.sonicPalette)} palette, ${join(spec.production.mixTraits)}, ${spec.production.spatialDesign || 'balanced stereo image'}, ${spec.production.masteringTarget || 'streaming-ready master'}. Must include ${join(spec.constraints.mustInclude)}. Avoid ${join([...spec.constraints.mustAvoid, ...spec.constraints.negativePrompt])}.`.replace(/\s+/g, ' ').trim();
}
export const compressPrompt = (spec: MusicSpec, limit = 1000) => {
  const text = universalPrompt(spec);
  if (text.length <= limit) return text;
  const compact = `${spec.style.descriptiveStyleTraits.join(' ')} ${spec.style.primaryGenre}, ${spec.theory.bpm ?? ''} BPM, ${spec.theory.key ?? ''} ${spec.theory.mode ?? ''}. ${join(spec.intent.emotionalGoal)}. ${join([...spec.instrumentation.drums, ...spec.instrumentation.bass, ...spec.instrumentation.melodicInstruments, ...spec.instrumentation.orchestral, ...spec.instrumentation.vocals, ...spec.instrumentation.synths])}. ${join(spec.arrangement.songStructure)}. Avoid ${join([...spec.constraints.mustAvoid, ...spec.constraints.negativePrompt])}.`;
  return compact.slice(0, Math.max(0, limit - 1)).trim();
};
export function compileForTarget(spec: MusicSpec, target: Target) {
  if (target === 'json') return JSON.stringify(spec, null, 2);
  if (target === 'suno') return compressPrompt(spec, Number(spec.constraints.platformLimits.suno || 1000));
  if (target === 'elevenlabs') return `Production instruction: ${universalPrompt(spec)} Keep arrangement coherent, avoid direct artist imitation, and render vocals/instruments as original performances.`;
  if (target === 'lyria') return `Scene and composition direction: ${spec.intent.description}. Musical camera: ${universalPrompt(spec)} Emphasize section contrast, texture, and cinematic motion.`;
  return universalPrompt(spec);
}
export function qaMusicSpec(spec: MusicSpec): QaFinding[] {
  const f: QaFinding[] = [];
  if (!spec.theory.bpm) f.push({ level: 'warning', title: 'Missing BPM', detail: 'Add a tempo so platform prompts avoid vague pacing.' });
  if (!spec.theory.key || !spec.theory.mode) f.push({ level: 'warning', title: 'Incomplete tonality', detail: 'Specify key and mode for stronger harmony control.' });
  if (spec.theory.chordProgression.length < 2) f.push({ level: 'warning', title: 'Thin harmony', detail: 'Add at least two chords or a drone strategy.' });
  if (vague.test(spec.intent.description)) f.push({ level: 'info', title: 'Vague language', detail: 'Replace broad mood words with concrete groove, instrument, and mix terms.' });
  const instruments = Object.values(spec.instrumentation).flat().length;
  if (instruments > 18) f.push({ level: 'warning', title: 'Overloaded instrumentation', detail: `${instruments} instrument layers may crowd the mix; assign entrances by section.` });
  const allText = JSON.stringify(spec);
  if (spec.style.avoidDirectArtistImitation && artistRisk.test(allText)) f.push({ level: 'error', title: 'Artist imitation risk', detail: 'Translate artist references into descriptive traits before compiling.' });
  const sunoLimit = Number(spec.constraints.platformLimits.suno || 1000);
  if (compileForTarget(spec, 'suno').length > sunoLimit) f.push({ level: 'error', title: 'Platform limit', detail: `Suno prompt exceeds ${sunoLimit} characters.` });
  if (/trap/i.test(spec.style.primaryGenre) && (spec.theory.bpm ?? 0) > 180) f.push({ level: 'warning', title: 'Tempo conflict', detail: 'Trap prompts above 180 BPM may be interpreted as double-time; clarify feel.' });
  return f;
}
