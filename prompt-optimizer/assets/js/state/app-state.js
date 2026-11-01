/**
 * Central Reactive State Manager
 */
class AppState {
  constructor() {
    this.listeners = new Set();
    this.state = {
      mode: 'quick', // 'quick' | 'studio'
      rawPrompt: '',
      targetModel: 'general',
      persona: 'auto',
      tone: 'professional',
      framework: 'RTFC',
      language: 'bilingual',
      cotEnabled: true,
      optimizedPrompt: '',
      history: [],
      apiKey: '',
      isOptimizing: false
    };
  }

  getState() {
    return { ...this.state };
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    });
  }

  addToHistory(item) {
    const updated = [
      { id: Date.now(), timestamp: new Date().toLocaleTimeString('fa-IR'), ...item },
      ...this.state.history.slice(0, 19)
    ];
    this.setState({ history: updated });
  }
}

export const appState = new AppState();
