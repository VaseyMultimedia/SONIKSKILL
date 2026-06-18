import { describe, expect, it } from 'vitest';
import { createDefaultMusicSpec, MusicSpecSchema } from '@/lib/schemas/musicSpec';
import { compileForTarget, compressPrompt, qaMusicSpec } from '@/lib/music/compiler';

describe('Music Intelligence MVP', () => {
  it('parses a complete MusicSpec', () => {
    expect(MusicSpecSchema.parse(createDefaultMusicSpec()).title).toContain('Anthem');
  });
  it('compiles platform outputs', () => {
    const spec = createDefaultMusicSpec();
    expect(compileForTarget(spec, 'universal')).toContain('Latin trap');
    expect(compileForTarget(spec, 'json')).toContain('chordProgression');
  });
  it('compresses under 1000 characters', () => {
    expect(compressPrompt(createDefaultMusicSpec(), 1000).length).toBeLessThanOrEqual(1000);
  });
  it('flags missing musical details', () => {
    const spec = createDefaultMusicSpec();
    spec.theory.bpm = undefined;
    expect(qaMusicSpec(spec).some((x) => x.title === 'Missing BPM')).toBe(true);
  });
});
