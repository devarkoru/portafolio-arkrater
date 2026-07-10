import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  
  projects = [
    { image: '/images/retro_platformer.png', name: 'Retro Game', description: 'A classic arcade-style game', link: '#' },
    { image: '/images/neon_racer.png', name: 'Synth Wave', description: 'Music player with retro vibes', link: '#' },
    { image: '/images/pixel_rpg.png', name: 'Pixel Art', description: 'Create your own pixel masterpiece', link: '#' },
    { image: '/images/space_invaders.png', name: 'Time Machine', description: 'Travel through digital decades', link: '#' },
    { image: '/images/cyber_chat.png', name: 'Cyber Chat', description: 'Retro-styled chat application', link: '#' },
    { image: '/images/dungeon_crawler.png', name: 'Neon Dreams', description: 'Visual experiments with neon', link: '#' }
  ];

  activeDemo: string | null = null;
  showCabinet = false;
  cleanups: (() => void)[] = [];

  // Platformer state
  platformerLoopId: any = null;
  platScore = 0;
  platHighScore = 0;
  platGameOver = false;

  // SynthWave state
  synthOsc: any = null;
  synthAudioCtx: any = null;
  synthAnalyser: any = null;
  synthGainNode: any = null;
  synthWaveformLoopId: any = null;
  selectedWaveType: OscillatorType = 'sine';
  notes: { [key: string]: number } = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25
  };
  noteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  keyboardNoteMapping: { [key: string]: string } = {
    'Digit1': 'C4', 'Digit2': 'D4', 'Digit3': 'E4', 'Digit4': 'F4',
    'Digit5': 'G4', 'Digit6': 'A4', 'Digit7': 'B4', 'Digit8': 'C5'
  };
  activeNote: string | null = null;

  // PixelArt state
  pixelGrid: string[] = [];
  selectedPixelColor = '#00ff00';
  isDrawingPixel = false;
  pixelPalette = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0000', '#9400d3', 'rgba(0,0,0,0)'];

  // SpaceInvaders state
  invadersLoopId: any = null;
  invScore = 0;
  invHighScore = 0;
  invGameOver = false;

  // CyberChat state
  chatInput = '';
  chatHistory: { text: string, sender: 'user' | 'system' }[] = [];

  // Particle state
  particleLoopId: any = null;
  particleGravity = 0.05;
  particleSpeed = 3;
  particleTheme = 'cyberpunk';

  openDemo(name: string) {
    this.activeDemo = name;
    this.showCabinet = true;
    this.playSynthSound(523.25, 'sine', 0.2); // Entry beep
    this.initDemo();
    this.cdr.detectChanges();
  }

  closeDemo() {
    this.playSynthSound(261.63, 'sine', 0.15); // Exit beep
    this.stopLoops();
    this.activeDemo = null;
    this.showCabinet = false;
    this.cdr.detectChanges();
  }

  stopLoops() {
    this.cleanups.forEach(cleanup => {
      try {
        cleanup();
      } catch (e) {
        console.error('Cleanup error', e);
      }
    });
    this.cleanups = [];
  }

  ngOnDestroy() {
    this.stopLoops();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  playSynthSound(freq: number, type: OscillatorType = 'sine', duration: number = 0.1) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may fail due to autoplay restriction
    }
  }

  initDemo() {
    this.stopLoops();
    setTimeout(() => {
      if (this.activeDemo === 'Retro Game') {
        this.initPlatformer();
      } else if (this.activeDemo === 'Synth Wave') {
        this.initSynthWaveCanvas();
      } else if (this.activeDemo === 'Pixel Art') {
        this.initPixelArt();
      } else if (this.activeDemo === 'Time Machine') {
        this.initSpaceInvaders();
      } else if (this.activeDemo === 'Cyber Chat') {
        this.initChat();
      } else if (this.activeDemo === 'Neon Dreams') {
        this.initParticles();
      }
    }, 100);
  }

  // 1. Retro Game (Platformer)
  initPlatformer() {
    const canvas = document.getElementById('platformerCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.platScore = 0;
    this.platGameOver = false;
    
    const player = {
      x: 40,
      y: 140,
      width: 20,
      height: 20,
      vy: 0,
      gravity: 0.6,
      jumpForce: -9,
      isGrounded: false
    };

    let obstacles: { x: number, width: number, height: number, speed: number }[] = [];
    let spawnTimer = 0;
    let gameLoopActive = true;

    const jump = () => {
      if (player.isGrounded && !this.platGameOver) {
        player.vy = player.jumpForce;
        player.isGrounded = false;
        this.playSynthSound(150, 'triangle', 0.15);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    canvas.onclick = () => {
      if (this.platGameOver) {
        this.initPlatformer();
      } else {
        jump();
      }
    };

    const updateAndDraw = () => {
      if (!gameLoopActive) return;

      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 180);
      ctx.lineTo(canvas.width, 180);
      ctx.stroke();

      if (!this.platGameOver) {
        player.vy += player.gravity;
        player.y += player.vy;

        if (player.y >= 160) {
          player.y = 160;
          player.vy = 0;
          player.isGrounded = true;
        }

        spawnTimer--;
        if (spawnTimer <= 0) {
          const height = 15 + Math.random() * 25;
          const width = 12 + Math.random() * 10;
          obstacles.push({
            x: canvas.width,
            width: width,
            height: height,
            speed: 3 + this.platScore * 0.05
          });
          spawnTimer = 90 + Math.random() * 80;
        }

        ctx.fillStyle = '#ff00ff';
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x -= obs.speed;

          ctx.beginPath();
          ctx.moveTo(obs.x, 180);
          ctx.lineTo(obs.x + obs.width / 2, 180 - obs.height);
          ctx.lineTo(obs.x + obs.width, 180);
          ctx.closePath();
          ctx.fill();
          
          const px = player.x;
          const py = player.y;
          const pw = player.width;
          const ph = player.height;

          if (px < obs.x + obs.width &&
              px + pw > obs.x &&
              py + ph > 180 - obs.height) {
            this.platGameOver = true;
            this.playSynthSound(80, 'sawtooth', 0.4);
            if (this.platScore > this.platHighScore) {
              this.platHighScore = this.platScore;
            }
          }

          if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
            this.platScore++;
            this.playSynthSound(440, 'sine', 0.05);
          }
        }

        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#ff00ff';
        ctx.font = '20px "Press Start 2P", VT323, Courier';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, 80);
        ctx.fillStyle = '#00ff00';
        ctx.font = '14px VT323, Courier';
        ctx.fillText('CLICK SCREEN TO RESTART', canvas.width / 2, 120);
      }

      ctx.fillStyle = '#00ff00';
      ctx.font = '16px VT323, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${this.platScore}`, 10, 25);
      ctx.textAlign = 'right';
      ctx.fillText(`HI: ${this.platHighScore}`, canvas.width - 10, 25);

      this.platformerLoopId = requestAnimationFrame(updateAndDraw);
    };

    this.cleanups.push(() => {
      gameLoopActive = false;
      cancelAnimationFrame(this.platformerLoopId);
      window.removeEventListener('keydown', handleKeyDown);
    });

    updateAndDraw();
  }

  // 2. Synth Wave (Audio & Waveform Visualizer)
  initSynthWaveCanvas() {
    const canvas = document.getElementById('synthCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let visualizerActive = true;

    const drawWave = () => {
      if (!visualizerActive) return;
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ff00ff';
      ctx.shadowColor = '#ff00ff';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      if (this.synthAnalyser) {
        const bufferLength = this.synthAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.synthAnalyser.getByteTimeDomainData(dataArray);

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
      } else {
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i++) {
          const y = canvas.height / 2 + Math.sin(i * 0.05 + Date.now() * 0.01) * 3;
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      this.synthWaveformLoopId = requestAnimationFrame(drawWave);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = this.keyboardNoteMapping[e.code];
      if (note && this.activeNote !== note) {
        e.preventDefault();
        this.playNote(note);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const note = this.keyboardNoteMapping[e.code];
      if (note && this.activeNote === note) {
        this.stopNote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    this.cleanups.push(() => {
      visualizerActive = false;
      cancelAnimationFrame(this.synthWaveformLoopId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      this.stopNote();
      if (this.synthAudioCtx) {
        this.synthAudioCtx.close();
        this.synthAudioCtx = null;
      }
    });

    drawWave();
  }

  playNote(note: string) {
    this.activeNote = note;
    const freq = this.notes[note];

    try {
      if (!this.synthAudioCtx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.synthAudioCtx = new AudioCtx();
        this.synthAnalyser = this.synthAudioCtx.createAnalyser();
        this.synthAnalyser.fftSize = 2048;
      }

      if (this.synthOsc) {
        this.synthOsc.stop();
        this.synthOsc.disconnect();
      }

      this.synthOsc = this.synthAudioCtx.createOscillator();
      this.synthGainNode = this.synthAudioCtx.createGain();
      
      this.synthOsc.type = this.selectedWaveType;
      this.synthOsc.frequency.setValueAtTime(freq, this.synthAudioCtx.currentTime);

      this.synthGainNode.gain.setValueAtTime(0, this.synthAudioCtx.currentTime);
      this.synthGainNode.gain.linearRampToValueAtTime(0.2, this.synthAudioCtx.currentTime + 0.05);

      this.synthOsc.connect(this.synthGainNode);
      this.synthGainNode.connect(this.synthAnalyser);
      this.synthAnalyser.connect(this.synthAudioCtx.destination);

      this.synthOsc.start();
    } catch (e) {
      console.warn('Audio Context start failed', e);
    }
  }

  stopNote() {
    this.activeNote = null;
    if (this.synthGainNode && this.synthAudioCtx) {
      const currentG = this.synthGainNode.gain.value;
      this.synthGainNode.gain.setValueAtTime(currentG, this.synthAudioCtx.currentTime);
      this.synthGainNode.gain.exponentialRampToValueAtTime(0.001, this.synthAudioCtx.currentTime + 0.3);
      const oscToStop = this.synthOsc;
      setTimeout(() => {
        try {
          if (oscToStop) {
            oscToStop.stop();
            oscToStop.disconnect();
          }
        } catch (err) {}
      }, 300);
      this.synthOsc = null;
      this.synthGainNode = null;
    }
  }

  // 3. Pixel Art (Painter Tool)
  initPixelArt() {
    this.pixelGrid = Array(256).fill('rgba(0,0,0,0)');
  }

  paintPixel(index: number) {
    this.pixelGrid[index] = this.selectedPixelColor;
    if (this.selectedPixelColor !== 'rgba(0,0,0,0)') {
      this.playSynthSound(600, 'sine', 0.03);
    } else {
      this.playSynthSound(300, 'sine', 0.03);
    }
  }

  clearPixelGrid() {
    this.pixelGrid = Array(256).fill('rgba(0,0,0,0)');
    this.playSynthSound(200, 'sawtooth', 0.2);
  }

  downloadPixelArt() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 256, 256);

    const cellSize = 16;
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const idx = r * 16 + c;
        const color = this.pixelGrid[idx];
        if (color !== 'rgba(0,0,0,0)') {
          ctx.fillStyle = color;
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pixel_art.png';
    link.href = dataUrl;
    link.click();
    this.playSynthSound(800, 'sine', 0.15);
  }

  // 4. Time Machine (Space Invaders)
  initSpaceInvaders() {
    const canvas = document.getElementById('spaceCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.invScore = 0;
    this.invGameOver = false;

    let shipX = canvas.width / 2 - 15;
    const shipY = 260;
    const shipWidth = 30;
    const shipHeight = 12;
    const shipSpeed = 5;

    let leftPressed = false;
    let rightPressed = false;
    let lasers: { x: number, y: number, width: number, height: number, speed: number }[] = [];
    
    let invaders: { x: number, y: number, width: number, height: number, alive: boolean }[] = [];
    const rows = 3;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        invaders.push({
          x: 35 + c * 40,
          y: 40 + r * 25,
          width: 20,
          height: 12,
          alive: true
        });
      }
    }

    let invaderDirection = 1;
    let invaderSpeed = 1;
    let invaderStepDown = false;
    let fireCooldown = 0;
    let invadersGameActive = true;

    const fire = () => {
      if (fireCooldown <= 0 && !this.invGameOver) {
        lasers.push({
          x: shipX + shipWidth / 2 - 1.5,
          y: shipY,
          width: 3,
          height: 8,
          speed: 6
        });
        fireCooldown = 20;
        this.playSynthSound(300, 'square', 0.1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        leftPressed = true;
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        rightPressed = true;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        fire();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') leftPressed = false;
      if (e.code === 'ArrowRight') rightPressed = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      shipX = mouseX - shipWidth / 2;
      if (shipX < 0) shipX = 0;
      if (shipX > canvas.width - shipWidth) shipX = canvas.width - shipWidth;
    };

    canvas.onclick = () => {
      if (this.invGameOver) {
        this.initSpaceInvaders();
      } else {
        fire();
      }
    };

    const updateAndDraw = () => {
      if (!invadersGameActive) return;

      ctx.fillStyle = '#050010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!this.invGameOver) {
        if (leftPressed && shipX > 0) shipX -= shipSpeed;
        if (rightPressed && shipX < canvas.width - shipWidth) shipX += shipSpeed;

        if (fireCooldown > 0) fireCooldown--;

        ctx.fillStyle = '#00ffff';
        ctx.fillRect(shipX, shipY, shipWidth, shipHeight);
        ctx.fillRect(shipX + shipWidth/2 - 4, shipY - 6, 8, 6);

        ctx.fillStyle = '#ffff00';
        for (let i = lasers.length - 1; i >= 0; i--) {
          const l = lasers[i];
          l.y -= l.speed;
          ctx.fillRect(l.x, l.y, l.width, l.height);

          let hit = false;
          for (let j = 0; j < invaders.length; j++) {
            const inv = invaders[j];
            if (inv.alive &&
                l.x < inv.x + inv.width &&
                l.x + l.width > inv.x &&
                l.y < inv.y + inv.height &&
                l.y + l.height > inv.y) {
              inv.alive = false;
              hit = true;
              this.invScore += 10;
              this.playSynthSound(120, 'sawtooth', 0.15);
              break;
            }
          }

          if (hit || l.y < 0) {
            lasers.splice(i, 1);
          }
        }

        let reachedEdge = false;
        let anyAlive = false;
        
        for (let inv of invaders) {
          if (inv.alive) {
            anyAlive = true;
            inv.x += invaderSpeed * invaderDirection;
            if (inv.x <= 10 || inv.x >= canvas.width - inv.width - 10) {
              reachedEdge = true;
            }
            if (inv.y + inv.height >= shipY) {
              this.invGameOver = true;
              this.playSynthSound(60, 'sawtooth', 0.5);
            }
          }
        }

        if (reachedEdge) {
          invaderDirection *= -1;
          invaderStepDown = true;
        }

        if (invaderStepDown) {
          for (let inv of invaders) {
            if (inv.alive) {
              inv.y += 10;
            }
          }
          invaderStepDown = false;
          invaderSpeed += 0.1;
        }

        ctx.fillStyle = '#ff00ff';
        for (let inv of invaders) {
          if (inv.alive) {
            ctx.fillRect(inv.x, inv.y, inv.width, inv.height);
            ctx.fillStyle = '#050010';
            ctx.fillRect(inv.x + 4, inv.y + 4, 3, 3);
            ctx.fillRect(inv.x + inv.width - 7, inv.y + 4, 3, 3);
            ctx.fillStyle = '#ff00ff';
          }
        }

        if (!anyAlive) {
          invaderSpeed = 1.2 + this.invScore * 0.005;
          invaderDirection = 1;
          invaders = [];
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              invaders.push({
                x: 35 + c * 40,
                y: 40 + r * 25,
                width: 20,
                height: 12,
                alive: true
              });
            }
          }
          this.playSynthSound(700, 'sine', 0.3);
        }

      } else {
        ctx.fillStyle = '#ff00ff';
        ctx.font = '20px "Press Start 2P", VT323, Courier';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, 100);
        ctx.fillStyle = '#00ff00';
        ctx.font = '14px VT323, Courier';
        ctx.fillText('CLICK SCREEN TO RESTART', canvas.width / 2, 150);
        if (this.invScore > this.invHighScore) {
          this.invHighScore = this.invScore;
        }
      }

      ctx.fillStyle = '#00ff00';
      ctx.font = '16px VT323, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${this.invScore}`, 10, 20);
      ctx.textAlign = 'right';
      ctx.fillText(`HI: ${this.invHighScore}`, canvas.width - 10, 20);

      this.invadersLoopId = requestAnimationFrame(updateAndDraw);
    };

    this.cleanups.push(() => {
      invadersGameActive = false;
      cancelAnimationFrame(this.invadersLoopId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    });

    updateAndDraw();
  }

  // 5. Cyber Chat (Terminal Console)
  initChat() {
    this.chatHistory = [
      { text: 'SYSTEM INTERFACE V1.0 - ACTIVE', sender: 'system' },
      { text: 'Enter "help" for a list of available systems.', sender: 'system' },
    ];
  }

  sendChatMessage() {
    const query = this.chatInput.trim().toLowerCase();
    if (!query) return;

    this.chatHistory.push({ text: `> ${this.chatInput}`, sender: 'user' });
    this.chatInput = '';
    this.playSynthSound(400, 'sine', 0.04);

    setTimeout(() => {
      let reply = '';
      if (query === 'help') {
        reply = 'Commands: help, about, joke, clear, hello, matrix';
      } else if (query === 'about') {
        reply = 'Claudio Nunez (Arkrater) - Fullstack Software Developer & Retro Gamer. 8+ years building apps and games.';
      } else if (query === 'joke') {
        const jokes = [
          "Why do programmers wear glasses? Because they can't C#!",
          "There are 10 kinds of people: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, it's a hardware problem!",
          "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'"
        ];
        reply = jokes[Math.floor(Math.random() * jokes.length)];
      } else if (query === 'clear') {
        this.chatHistory = [];
        this.playSynthSound(250, 'sawtooth', 0.1);
        return;
      } else if (query === 'hello' || query === 'hi') {
        reply = 'Hello user! Welcome to the mainframe. Ready to explore?';
      } else if (query === 'matrix') {
        reply = 'Waking up the Matrix... Follow the white rabbit... 🐇';
        this.playSynthSound(1000, 'square', 0.5);
      } else {
        reply = `Command "${query}" not recognized. Type "help" for systems.`;
      }

      this.chatHistory.push({ text: reply, sender: 'system' });
      this.playSynthSound(500, 'sine', 0.08);

      setTimeout(() => {
        const term = document.getElementById('terminalHistory');
        if (term) term.scrollTop = term.scrollHeight;
      }, 50);
    }, 300);
  }

  // 6. Neon Dreams (Mouse/Touch Particles)
  initParticles() {
    const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
    }[] = [];

    const themes: { [theme: string]: string[] } = {
      cyberpunk: ['#ff00ff', '#00ffff', '#ffff00', '#ff0055'],
      matrix: ['#00ff00', '#00aa00', '#88ff88', '#22ff22'],
      synthwave: ['#ff5e00', '#9400d3', '#ff007f', '#ff00a0'],
      fire: ['#ff3300', '#ff9900', '#ffff00', '#ff0000']
    };

    let drawActive = true;

    const spawnParticles = (x: number, y: number) => {
      const colorList = themes[this.particleTheme] || themes['cyberpunk'];
      const count = 4;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * this.particleSpeed;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 5,
          color: colorList[Math.floor(Math.random() * colorList.length)],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.02
        });
      }
      if (Math.random() < 0.2) {
        this.playSynthSound(800 + Math.random() * 400, 'sine', 0.02);
      }
    };

    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnParticles(x, y);
    };

    canvas.ontouchmove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        spawnParticles(x, y);
      }
    };

    const updateAndDraw = () => {
      if (!drawActive) return;

      ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += this.particleGravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      this.particleLoopId = requestAnimationFrame(updateAndDraw);
    };

    this.cleanups.push(() => {
      drawActive = false;
      cancelAnimationFrame(this.particleLoopId);
    });

    updateAndDraw();
  }
}
