import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, X, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface FakePlayerProps {
  movie: {
    title: string;
    backdrop: string;
  };
  onClose: () => void;
}

const FakePlayer: React.FC<FakePlayerProps> = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showCenterControls, setShowCenterControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const totalDuration = 8130; // 2h 15min 30s em segundos (fake)
  const progressRef = useRef<number | undefined>();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Funções para fullscreen
  const enterFullscreen = async () => {
    if (document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.warn('Fullscreen não suportado ou falhou:', error);
      }
    }
  };

  const exitFullscreen = async () => {
    if (document.exitFullscreen && document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.warn('Erro ao sair do fullscreen:', error);
      }
    }
  };

  // Funções para orientação
  const lockLandscape = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock('landscape');
      } catch (error) {
        console.warn('Não foi possível bloquear orientação landscape:', error);
      }
    }
  };

  const unlockOrientation = async () => {
    if (screen.orientation && screen.orientation.unlock) {
      try {
        await screen.orientation.unlock();
      } catch (error) {
        console.warn('Erro ao desbloquear orientação:', error);
      }
    }
  };

  // Detectar orientação
  const checkOrientation = () => {
    const portrait = window.innerHeight > window.innerWidth;
    setIsPortrait(portrait);
  };

  // Buffering inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBuffering(false);
      setIsPlaying(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Progresso automático
  useEffect(() => {
    if (isPlaying && !isBuffering) {
      progressRef.current = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          setCurrentTime(Math.floor((newProgress / 100) * totalDuration));
          return newProgress;
        });
      }, 100);
    } else {
      if (progressRef.current) {
        window.clearInterval(progressRef.current);
      }
    }
    return () => {
      if (progressRef.current) {
        window.clearInterval(progressRef.current);
      }
    };
  }, [isPlaying, isBuffering]);

  // Esconder controles após inatividade
  useEffect(() => {
    const resetControlsTimeout = () => {
      setShowControls(true);
      setShowCenterControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowCenterControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetControlsTimeout();
    const handleMouseLeave = () => {
      setShowControls(false);
      setShowCenterControls(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resetControlsTimeout();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Mostrar controles centrais quando pausado
  useEffect(() => {
    if (!isPlaying && !isBuffering) {
      setShowCenterControls(true);
    }
  }, [isPlaying, isBuffering]);

  // ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fullscreen e orientação ao montar
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      enterFullscreen();
      lockLandscape();
    }

    // Detectar mudanças de orientação
    const handleOrientationChange = () => {
      checkOrientation();
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    checkOrientation(); // Checar inicial

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      unlockOrientation();
      exitFullscreen();
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    const newProgress = (newTime / totalDuration) * 100;
    setCurrentTime(newTime);
    setProgress(newProgress);
  };

  const skipForward = () => {
    const newTime = Math.min(totalDuration, currentTime + 10);
    const newProgress = (newTime / totalDuration) * 100;
    setCurrentTime(newTime);
    setProgress(newProgress);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = Math.floor((newProgress / 100) * totalDuration);
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isBuffering) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white text-lg">Carregando vídeo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Vídeo simulado */}
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer"
        onDoubleClick={togglePlayPause}
      >
        <img
          src={movie.backdrop}
          alt={movie.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            isPlaying ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Overlay para orientação portrait */}
      {isPortrait && (
        <div className="absolute inset-0 bg-black z-60 flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <RotateCcw size={64} className="text-white mx-auto animate-pulse" />
            <h2 className="text-white text-2xl font-bold">Gire o dispositivo</h2>
            <p className="text-white/80 text-lg">Para uma melhor experiência de visualização</p>
          </div>
        </div>
      )}

      {/* Título no topo */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-white text-xl font-bold">{movie.title}</h1>
      </div>

      {/* Controles Centrais */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${
          showCenterControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-8">
          <button
            onClick={skipBackward}
            className="text-white hover:text-primary transition-all duration-200 hover:scale-110 drop-shadow-lg"
            title="Voltar 10 segundos"
          >
            <SkipBack size={32} />
          </button>
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-primary transition-all duration-200 hover:scale-110 bg-white/10 rounded-full p-4 hover:bg-white/20 drop-shadow-lg"
          >
            {isPlaying ? <Pause size={48} /> : <Play size={48} fill="currentColor" />}
          </button>
          <button
            onClick={skipForward}
            className="text-white hover:text-primary transition-all duration-200 hover:scale-110 drop-shadow-lg"
            title="Avançar 10 segundos"
          >
            <SkipForward size={32} />
          </button>
        </div>
      </div>

      {/* Controles */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Barra de progresso */}
        <div
          className="w-full bg-gray-600 h-2 rounded mb-4 relative cursor-pointer hover:h-3 transition-all duration-200"
          onClick={handleProgressClick}
          data-testid="progress-bar"
        >
          <div
            className="bg-primary h-full rounded transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controles inferiores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={skipBackward}
              className="text-white/70 hover:text-white transition-colors"
              title="Voltar 10 segundos"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlayPause}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={skipForward}
              className="text-white/70 hover:text-white transition-colors"
              title="Avançar 10 segundos"
            >
              <SkipForward size={16} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <Volume2 size={16} />
            </button>
            <span className="text-white/70 text-sm">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakePlayer;