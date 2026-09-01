import {
  Code2,
  ExternalLink,
  Eye,
  Files,
  FolderOpen,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type {
  FileContent,
  FileNode,
  ProjectRecord,
  SharePublishConfig,
} from '../../shared/types';
import { FileTree } from './FileTree';

interface InspectorProps {
  project: ProjectRecord;
  refreshToken: number;
  onError: (message: string) => void;
}

type InspectorTab = 'preview' | 'files';

export function Inspector({ project, refreshToken, onError }: InspectorProps) {
  const [tab, setTab] = useState<InspectorTab>('preview');
  const [previewUrl, setPreviewUrl] = useState('');
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [shareEndpoint, setShareEndpoint] = useState(
    'http://47.79.240.52/aether-api',
  );
  const [publishToken, setPublishToken] = useState('');
  const [shareConfig, setShareConfig] = useState<SharePublishConfig>();

  const refreshFiles = useCallback(async () => {
    try {
      setFiles(await window.gameAgent.listFiles(project.id));
    } catch (error) {
      onError(toMessage(error));
    }
  }, [onError, project.id]);

  useEffect(() => {
    setPreviewUrl('');
    setSelectedFile(null);
    void refreshFiles();
  }, [project.id, refreshFiles]);

  useEffect(() => {
    void window.gameAgent.loadSharePublishConfig().then((config) => {
      setShareConfig(config);
      setShareEndpoint(config.endpoint);
    });
  }, []);

  useEffect(() => {
    if (project.status === 'completed' || tab === 'files') void refreshFiles();
  }, [refreshFiles, refreshToken, project.status, tab]);

  async function loadPreview() {
    setLoadingPreview(true);
    try {
      const url = await window.gameAgent.startPreview(project.id);
      setPreviewUrl(url);
    } catch (error) {
      onError(`${toMessage(error)}。请先让 Agent 完成构建。`);
    } finally {
      setLoadingPreview(false);
    }
  }

  async function publishGame() {
    if (!shareEndpoint.trim()) {
      onError('请输入分享服务地址。');
      return;
    }
    if (!publishToken.trim() && !shareConfig?.tokenConfigured) {
      onError('请输入发布令牌。');
      return;
    }

    setPublishing(true);
    try {
      if (publishToken.trim()) {
        const config = await window.gameAgent.saveSharePublishToken(publishToken);
        setShareConfig(config);
      }
      const result = await window.gameAgent.publishProject(project.id, {
        endpoint: shareEndpoint,
        token: publishToken,
      });
      setShareUrl(result.url);
      setPublishToken('');
      setShowPublishForm(false);
      try {
        await navigator.clipboard.writeText(result.url);
      } catch {
        // 链接仍会显示在界面中，用户可手动复制。
      }
    } catch (error) {
      onError(toMessage(error));
    } finally {
      setPublishing(false);
    }
  }

  async function openFile(filePath: string) {
    try {
      setSelectedFile(await window.gameAgent.readFile(project.id, filePath));
    } catch (error) {
      onError(toMessage(error));
    }
  }

  return (
    <aside className="inspector">
      <div className="inspector-tabs" role="tablist">
        <button
          className={tab === 'preview' ? 'is-active' : ''}
          onClick={() => setTab('preview')}
        >
          <Eye size={14} />
          预览
        </button>
        <button
          className={tab === 'files' ? 'is-active' : ''}
          onClick={() => setTab('files')}
        >
          <Files size={14} />
          文件
        </button>
      </div>

      {tab === 'preview' ? (
        <div className="preview-pane">
          <div className="preview-toolbar">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <span>
              {previewUrl ? new URL(previewUrl).host : '本地游戏预览'}
            </span>
            <button
              aria-label="刷新预览"
              title="刷新预览"
              disabled={!previewUrl}
              onClick={() => {
                const current = previewUrl;
                setPreviewUrl('');
                requestAnimationFrame(() => setPreviewUrl(current));
              }}
            >
              <RefreshCw size={13} />
            </button>
          </div>
          {previewUrl ? (
            <iframe
              key={previewUrl}
              src={previewUrl}
              title={`${project.name} 游戏预览`}
              sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            />
          ) : (
            <div className="preview-empty">
              <div className="preview-grid" aria-hidden="true" />
              <Eye size={28} />
              <strong>等待可运行版本</strong>
              <p>Agent 完成构建后，可在隔离窗口中直接试玩。</p>
              <button onClick={loadPreview} disabled={loadingPreview}>
                {loadingPreview ? (
                  <RefreshCw className="spin" size={15} />
                ) : (
                  <ExternalLink size={15} />
                )}
                {loadingPreview ? '正在连接' : '载入预览'}
              </button>
            </div>
          )}
          <div className="preview-footer">
            <button
              onClick={() => setShowPublishForm((current) => !current)}
              disabled={publishing}
            >
              {publishing ? (
                <RefreshCw className="spin" size={13} />
              ) : (
                <Upload size={13} />
              )}
              {showPublishForm ? '收起发布' : '发布游戏'}
            </button>
            {showPublishForm ? (
              <div className="share-publish-form">
                <input
                  aria-label="分享服务地址"
                  value={shareEndpoint}
                  onChange={(event) => setShareEndpoint(event.target.value)}
                  placeholder="分享服务地址"
                />
                <input
                  aria-label="发布令牌"
                  type="password"
                  value={publishToken}
                  onChange={(event) => setPublishToken(event.target.value)}
                  placeholder={
                    shareConfig?.tokenConfigured
                      ? '已保存；留空则直接使用'
                      : '首次发布请输入令牌'
                  }
                />
                <button onClick={() => void publishGame()} disabled={publishing}>
                  {publishing ? '上传中…' : '确认发布'}
                </button>
              </div>
            ) : null}
            {shareUrl ? (
              <input
                className="share-url"
                aria-label="游戏分享链接"
                readOnly
                value={shareUrl}
                onFocus={(event) => event.currentTarget.select()}
                onClick={(event) => event.currentTarget.select()}
              />
            ) : null}
            <button
              onClick={() => void window.gameAgent.revealProject(project.id)}
            >
              <FolderOpen size={13} /> 在 Finder 中显示
            </button>
            {previewUrl ? (
              <button onClick={() => void loadPreview()}>
                <RefreshCw size={13} />
                重新检测
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="files-pane">
          <div className="files-toolbar">
            <span>PROJECT FILES</span>
            <button
              aria-label="刷新文件"
              title="刷新文件"
              onClick={() => void refreshFiles()}
            >
              <RefreshCw size={13} />
            </button>
          </div>
          <div className="file-layout">
            <div className="file-tree-pane">
              {files.length ? (
                <FileTree
                  nodes={files}
                  selected={selectedFile?.path}
                  onSelect={openFile}
                />
              ) : (
                <div className="files-empty">暂无文件</div>
              )}
            </div>
            <div className="code-pane">
              {selectedFile ? (
                <>
                  <header>
                    <Code2 size={13} />
                    <span>{selectedFile.path}</span>
                  </header>
                  <pre>
                    <code>{selectedFile.content}</code>
                  </pre>
                  {selectedFile.truncated ? (
                    <small>文件较大，仅显示前 1 MB</small>
                  ) : null}
                </>
              ) : (
                <div className="code-empty">
                  <Code2 size={20} />
                  选择文件查看内容
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function toMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(
    /^Error invoking remote method '[^']+':\s*(?:Error:\s*)?/,
    '',
  );
}
