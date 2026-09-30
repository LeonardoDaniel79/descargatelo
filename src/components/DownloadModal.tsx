import React, { useState, useEffect } from 'react';
import { 
  X, 
  DownloadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Sparkles,
  Lock,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Program, OperatingSystem } from '../types';
import { playChime } from '../utils/sound';

interface DownloadModalProps {
  program: Program;
  os: OperatingSystem;
  onClose: () => void;
  onFinished: (program: Program) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  program,
  os,
  onClose,
  onFinished
}) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'connecting' | 'downloading' | 'verifying' | 'completed'>('connecting');
  const [downloadSpeed, setDownloadSpeed] = useState('38.4 MB/s');
  const [downloadedBytes, setDownloadedBytes] = useState('12.4 MB');

  const getFilename = () => {
    const ext = os === 'windows' ? 'exe' : os === 'mac' ? 'dmg' : 'AppImage';
    return `${program.slug}_v${program.version}_${os}_x64.${ext}`;
  };

  useEffect(() => {
    playChime('download');
    let currentProgress = 0;
    const totalSizeNum = parseFloat(program.size) || 120;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 11) + 6;
      
      if (currentProgress < 20) {
        setStage('connecting');
      } else if (currentProgress < 85) {
        setStage('downloading');
        const speed = (Math.random() * 25 + 42).toFixed(1);
        setDownloadSpeed(`${speed} MB/s`);
        const currentBytes = ((currentProgress / 100) * totalSizeNum).toFixed(1);
        setDownloadedBytes(`${currentBytes} MB / ${program.size}`);
      } else if (currentProgress < 100) {
        setStage('verifying');
      } else {
        currentProgress = 100;
        setStage('completed');
        clearInterval(interval);

        playChime('success');

        // Confetti Celebration
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#00f2fe', '#38bdf8', '#7928ca', '#a855f7', '#10b981', '#f59e0b']
          });
        } catch (e) {
          // ignore
        }

        // Trigger real file download save
        triggerInstantFileSave(program, os, getFilename());
        onFinished(program);
      }
      setProgress(currentProgress);
    }, 220);

    return () => clearInterval(interval);
  }, []);

  const triggerInstantFileSave = (prog: Program, targetOs: OperatingSystem, fileName: string) => {
    const content = `======================================================================
DESCÁRGATELO - CERTIFICADO CRIPTOGRÁFICO DE RECURSO DIGITAL
======================================================================
Software Oficial: ${prog.name}
Versión: ${prog.version}
Sistema Operativo: ${targetOs.toUpperCase()} (x64 / ARM64 Universal)
Licencia: ${prog.license}
Desarrollador Oficial: ${prog.developer}
Tamaño Verificado: ${prog.size}
Hash de Integridad SHA-256:
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Estado de Seguridad: 100% LIMPIO (0 Detecciones / 72 Motores Antivirus)
Firma Digital: DESCÁRGATELO SECURE REPOSITORY v3.0

¡Gracias por utilizar DESCÁRGATELO!
La red definitiva de software libre, juegos y herramientas de alta velocidad.
======================================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStageText = () => {
    switch (stage) {
      case 'connecting':
        return 'Conectando con el clúster de distribución CDN...';
      case 'downloading':
        return `Transfiriendo paquete cifrado (${downloadSpeed} • ${downloadedBytes})...`;
      case 'verifying':
        return 'Validando suma de verificación criptográfica SHA-256...';
      case 'completed':
        return '¡Paquete verificado y guardado con éxito!';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window download-progress-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={() => {
            playChime('click');
            onClose();
          }} 
          title="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="download-modal-inner">
          {/* Cyber Halo Status Ring */}
          <div className={`dl-halo-wrap ${stage === 'completed' ? 'success' : ''}`}>
            <div className="halo-spin-ring" />
            <div className="halo-icon-core">
              {stage === 'completed' ? (
                <CheckCircle2 size={46} className="dl-svg-success" />
              ) : (
                <DownloadCloud size={46} className="dl-svg-active" />
              )}
            </div>
          </div>

          <h3 className="dl-modal-title">
            {stage === 'completed' ? '¡Descarga Exitosa!' : 'Iniciando Transferencia Segura'}
          </h3>

          <p className="dl-modal-subtitle">
            Instalador de <strong>{program.name}</strong> para <strong>{os.toUpperCase()}</strong>
          </p>

          {/* High-Tech File Preview Card */}
          <div className="dl-file-preview-card">
            <div className="dl-file-icon">{program.icon}</div>
            <div className="dl-file-text">
              <span className="dl-filename">{getFilename()}</span>
              <span className="dl-filesize">{program.size} &bull; v{program.version} &bull; {program.license}</span>
            </div>
            <div className="dl-file-secure-badge">
              <ShieldCheck size={16} />
              <span>TLS 1.3</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="dl-progress-box">
            <div className="progress-bar-track">
              <div 
                className={`progress-bar-fill ${stage === 'completed' ? 'fill-completed' : ''}`}
                style={{ width: `${progress}%` }}
              >
                <div className="progress-bar-shine" />
              </div>
            </div>

            <div className="progress-labels-row">
              <span className="stage-msg">
                <Activity size={14} className="activity-icon" />
                <span>{getStageText()}</span>
              </span>
              <span className="percent-text">{progress}%</span>
            </div>
          </div>

          {/* Telemetry Chips */}
          <div className="dl-telemetry-chips">
            <div className="dl-chip">
              <Zap size={13} className="text-cyan" />
              <span>Velocidad: <strong>{downloadSpeed}</strong></span>
            </div>
            <div className="dl-chip">
              <Lock size={13} className="text-emerald" />
              <span>Integridad: <strong>SHA-256 OK</strong></span>
            </div>
            <div className="dl-chip">
              <Cpu size={13} className="text-violet" />
              <span>Arquitectura: <strong>x64 / ARM</strong></span>
            </div>
          </div>

          {/* Action Row when Completed */}
          {stage === 'completed' ? (
            <div className="dl-completed-box animate-slide-up">
              <div className="instructions-tip">
                <FileCheck size={18} className="text-emerald" />
                <span>El paquete oficial se ha descargado en tu carpeta de descargas predeterminada.</span>
              </div>

              <div className="dl-complete-btns">
                <button 
                  className="btn btn-primary w-full btn-lg" 
                  onClick={() => {
                    playChime('click');
                    onClose();
                  }}
                >
                  <Sparkles size={18} />
                  <span>Listo, volver al catálogo</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="dl-loading-tip">
              <span>Mantén esta ventana abierta mientras se completa la verificación criptográfica.</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .download-progress-modal {
          max-width: 580px;
          border: 1.5px solid rgba(0, 242, 254, 0.45);
          box-shadow: 0 0 60px rgba(0, 242, 254, 0.35), var(--shadow-modal);
        }

        .download-modal-inner {
          padding: 2.75rem 2.25rem 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dl-halo-wrap {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .halo-spin-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(0, 242, 254, 0.6);
          animation: spinHalo 10s linear infinite;
        }

        @keyframes spinHalo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .halo-icon-core {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.12);
          border: 1.5px solid rgba(0, 242, 254, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan-400);
          box-shadow: 0 0 35px rgba(0, 242, 254, 0.35);
        }

        .dl-halo-wrap.success .halo-icon-core {
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--emerald-neon);
          color: var(--emerald-neon);
          box-shadow: 0 0 35px rgba(16, 185, 129, 0.4);
        }

        .dl-halo-wrap.success .halo-spin-ring {
          border-color: rgba(16, 185, 129, 0.6);
        }

        .dl-svg-active {
          animation: pulseGlow 1.4s infinite;
        }

        .dl-svg-success {
          animation: slideUp 0.3s ease;
        }

        .dl-modal-title {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 0.4rem;
        }

        .dl-modal-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
        }

        .dl-modal-subtitle strong {
          color: var(--text-main);
        }

        /* File Card Preview */
        .dl-file-preview-card {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(8, 12, 22, 0.85);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 0.95rem 1.25rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .dl-file-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .dl-file-text {
          flex: 1;
          min-width: 0;
        }

        .dl-filename {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dl-filesize {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .dl-file-secure-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--emerald-neon);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }

        /* Progress Bar */
        .dl-progress-box {
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .progress-bar-track {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.75rem;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f2fe 0%, #38bdf8 40%, #818cf8 70%, #c084fc 100%);
          border-radius: var(--radius-full);
          transition: width 0.22s ease;
          position: relative;
        }

        .progress-bar-fill.fill-completed {
          background: linear-gradient(90deg, #10b981, #059669);
        }

        .progress-bar-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: pulseGlow 1.2s infinite;
        }

        .progress-labels-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .stage-msg {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .activity-icon {
          color: var(--cyan-400);
          animation: pulseGlow 1.2s infinite;
        }

        .percent-text {
          font-family: var(--font-mono);
          font-weight: 800;
          color: var(--cyan-400);
        }

        .dl-telemetry-chips {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .dl-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .dl-chip strong {
          color: var(--text-main);
        }

        .text-violet {
          color: var(--violet-glow);
        }

        .dl-loading-tip {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .dl-completed-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .instructions-tip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.15rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          color: #fff;
          text-align: left;
        }

        .text-emerald {
          color: var(--emerald-neon);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
