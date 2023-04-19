import { browser } from '$app/environment';

export class Webcam {
	_stream: MediaStream | null = null;
	_video: HTMLVideoElement;
	_width = 0;
	_height = 0;

	constructor(video: HTMLVideoElement) {
		this._video = video;
		this._video.hidden = true;
	}

	async createStream(): Promise<void> {
		if (!browser) return;
		this._video.setAttribute('autoplay', 'true');
		this._video.setAttribute('playsinline', 'true');
		this._video.setAttribute('muted', 'true');
		const self = this;
		this._video.addEventListener('canplay', (event: Event) => {
			self._width = (event.target as HTMLVideoElement).videoWidth;
			self._height = (event.target as HTMLVideoElement).videoHeight;
		});
		this._video.srcObject = await this._getMediaStream();
		this._video.hidden = false;
	}

	destroyStream(): void {
		if (!this._stream) return;
		this._video.hidden = true;
		this._stream.getTracks().forEach((track) => {
			track.stop();
		});
	}

	makeSnapshot(): string | undefined {
		const canvas = document.createElement('canvas');
		canvas.width = this._width;
		canvas.height = this._height;
		const context = canvas.getContext('2d');
		if (!context) return;
		context.drawImage(this._video, 0, 0, this._width, this._height);
		return canvas.toDataURL('image/png', 1.0);
	}

	_getMediaStream(): Promise<MediaStream> {
		if (this._stream) this.destroyStream();
		return new Promise<MediaStream>((resolve, reject) => {
			navigator.mediaDevices
				.getUserMedia({
					video: {
						facingMode: 'face'
					},
					audio: false
				})
				.then((stream) => {
					this._stream = stream;
					resolve(this._stream);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
