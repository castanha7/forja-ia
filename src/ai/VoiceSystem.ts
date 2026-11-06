export class VoiceSystem {
  private recognition: any
  private isListening = false

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = 'pt-BR'
    }
  }

  startListening(onResult: (text: string) => void, onError: (err: string) => void) {
    if (!this.recognition) {
      onError("Reconhecimento de voz não suportado neste navegador.")
      return
    }
    this.isListening = true
    this.recognition.start()

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      this.isListening = false
    }

    this.recognition.onerror = (event: any) => {
      onError(event.error)
      this.isListening = false
    }

    this.recognition.onend = () => {
      if (this.isListening) this.startListening(onResult, onError)
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop()
      this.isListening = false
    }
  }
}