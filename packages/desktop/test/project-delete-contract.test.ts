import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const projectRail = readFileSync(
  new URL('../src/renderer/components/ProjectRail.tsx', import.meta.url),
  'utf8',
);
const appSource = readFileSync(
  new URL('../src/renderer/App.tsx', import.meta.url),
  'utf8',
);
const mainSource = readFileSync(
  new URL('../src/main/main.ts', import.meta.url),
  'utf8',
);
const preload = readFileSync(
  new URL('../src/main/preload.cts', import.meta.url),
  'utf8',
);
const types = readFileSync(
  new URL('../src/shared/types.ts', import.meta.url),
  'utf8',
);
const store = readFileSync(
  new URL('../src/main/store.ts', import.meta.url),
  'utf8',
);
const projectManager = readFileSync(
  new URL('../src/main/projectManager.ts', import.meta.url),
  'utf8',
);

describe('项目删除功能契约', () => {
  it('渲染层提供删除入口', () => {
    expect(projectRail).toContain('onDelete: (project: ProjectRecord) => void');
    expect(projectRail).toContain('aria-label={`删除项目 ${project.name}`}');
    expect(appSource).toContain('await window.gameAgent.deleteProject(project.id)');
  });

  it('IPC 与预加载桥暴露删除通道', () => {
    expect(types).toContain('deleteProject(projectId: string): Promise<void>;');
    expect(preload).toContain("ipcRenderer.invoke('project:delete', projectId)");
    expect(mainSource).toContain("secureHandle('project:delete'");
  });

  it('持久化与运行时支持删除', () => {
    expect(store).toContain('async deleteProject(id: string)');
    expect(projectManager).toContain('async stopPreview(projectId: string)');
  });
});
