import { describe, expect, it } from 'vitest';
import { normalizeTypographicDashes } from '../src/main/settingsNormalize.js';

describe('normalizeTypographicDashes', () => {
  it('keeps plain ASCII model names unchanged', () => {
    expect(normalizeTypographicDashes('wan2.5-t2i-preview')).toBe(
      'wan2.5-t2i-preview',
    );
  });

  it('converts non-breaking hyphens to ASCII hyphens', () => {
    expect(normalizeTypographicDashes('qwen3\u2011vl\u2011plus')).toBe(
      'qwen3-vl-plus',
    );
  });

  it('converts en/em dashes and minus signs', () => {
    expect(
      normalizeTypographicDashes('a\u2013b\u2014c\u2212d\u2010e'),
    ).toBe('a-b-c-d-e');
  });
});
