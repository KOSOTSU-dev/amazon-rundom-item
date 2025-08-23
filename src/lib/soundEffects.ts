// 効果音生成ユーティリティ
class SoundEffects {
	private audioContext: AudioContext | null = null;

	// AudioContextの初期化
	private initAudioContext(): AudioContext {
		if (!this.audioContext) {
			this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		}
		return this.audioContext;
	}

	// ドラムロール音を生成
	generateDrumroll(duration: number = 2000): Promise<void> {
		return new Promise((resolve) => {
			try {
				const audioContext = this.initAudioContext();
				const oscillator = audioContext.createOscillator();
				const gainNode = audioContext.createGain();
				
				oscillator.connect(gainNode);
				gainNode.connect(audioContext.destination);
				
				// ドラムロールの音色設定
				oscillator.type = 'sawtooth';
				oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
				oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + duration);
				
				// 音量エンベロープ
				gainNode.gain.setValueAtTime(0, audioContext.currentTime);
				gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
				gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
				
				oscillator.start(audioContext.currentTime);
				oscillator.stop(audioContext.currentTime + duration);
				
				oscillator.onended = () => resolve();
			} catch (error) {
				console.log('ドラムロール生成エラー:', error);
				resolve();
			}
		});
	}

	// 当選音（ファンファーレ）を生成
	generateFanfare(): Promise<void> {
		return new Promise((resolve) => {
			try {
				const audioContext = this.initAudioContext();
				const oscillator = audioContext.createOscillator();
				const gainNode = audioContext.createGain();
				
				oscillator.connect(gainNode);
				gainNode.connect(audioContext.destination);
				
				// ファンファーレの音色設定
				oscillator.type = 'sine';
				
				// メロディー: ド-ミ-ソ-ド
				const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
				const noteDuration = 0.3;
				const currentTime = audioContext.currentTime;
				
				notes.forEach((frequency, index) => {
					oscillator.frequency.setValueAtTime(frequency, currentTime + index * noteDuration);
				});
				
				// 音量エンベロープ
				gainNode.gain.setValueAtTime(0, currentTime);
				gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.05);
				gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + notes.length * noteDuration);
				
				oscillator.start(currentTime);
				oscillator.stop(currentTime + notes.length * noteDuration);
				
				oscillator.onended = () => resolve();
			} catch (error) {
				console.log('当選音生成エラー:', error);
				resolve();
			}
		});
	}

	// ルーレット回転音を生成
	generateSpinSound(duration: number = 100): Promise<void> {
		return new Promise((resolve) => {
			try {
				const audioContext = this.initAudioContext();
				const oscillator = audioContext.createOscillator();
				const gainNode = audioContext.createGain();
				
				oscillator.connect(gainNode);
				gainNode.connect(audioContext.destination);
				
				// 短いクリック音
				oscillator.type = 'square';
				oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
				
				gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
				gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
				
				oscillator.start(audioContext.currentTime);
				oscillator.stop(audioContext.currentTime + duration);
				
				oscillator.onended = () => resolve();
			} catch (error) {
				console.log('回転音生成エラー:', error);
				resolve();
			}
		});
	}

	// 音声コンテキストを一時停止
	suspend(): void {
		if (this.audioContext && this.audioContext.state === 'running') {
			this.audioContext.suspend();
		}
	}

	// 音声コンテキストを再開
	resume(): void {
		if (this.audioContext && this.audioContext.state === 'suspended') {
			this.audioContext.resume();
		}
	}
}

// シングルトンインスタンス
export const soundEffects = new SoundEffects(); 