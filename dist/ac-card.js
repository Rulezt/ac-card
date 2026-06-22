import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit@2.8.0/index.js?module";

const MODES = [
  { value: "heat", label: "Riscaldamento", icon: "🔥" },
  { value: "cool", label: "Raffrescamento", icon: "❄️" },
  { value: "fan_only", label: "Solo ventilazione", icon: "💨" },
  { value: "dry", label: "Deumidificazione", icon: "💧" },
  { value: "off", label: "Spento", icon: "⏻" },
  { value: "heat_cool", label: "Auto", icon: "🔄" },
];

const MODE_LABELS = {
  heat: "Riscaldamento", cool: "Raffrescamento", fan_only: "Solo ventilazione",
  dry: "Deumidificazione", off: "Spento", heat_cool: "Auto",
};

const FAN_LABELS = {
  Auto: "Auto", "Level 1": "Velocità 1", "Level 2": "Velocità 2",
  "Level 3": "Velocità 3", "Level 4": "Velocità 4", "Level 5": "Velocità 5", Quiet: "Silenzioso",
};

const SWING_LABELS = {
  Auto: "Auto", Highest: "Aletta Massimo Alto", High: "Aletta Alta",
  Middle: "Aletta Media", Low: "Aletta Bassa", Lowest: "Aletta Massimo Basso",
};

const EDITOR_FIELDS = [
  { key: "climate_entity", label: "Entità climate *", domain: "climate" },
  { key: "temperature_entity", label: "Sensore temperatura", domain: "sensor" },
  { key: "humidity_entity", label: "Sensore umidità", domain: "sensor" },
  { key: "fan_entity", label: "Entità velocità fan", domain: "select" },
  { key: "swing_entity", label: "Entità swing verticale", domain: "select" },
];

// ─── MAIN CARD ───────────────────────────────────────────────────────────────
class AcCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _popupOpen: { state: true },
      _popupType: { state: true },
    };
  }

  static get styles() {
    return css`
      :host { display: block; position: relative; }
      .card { background: #1c1c1e; border-radius: 16px; padding: 20px; color: white; font-family: sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      .header-left { font-size: 15px; font-weight: 500; }
      .header-right { font-size: 13px; color: #9ca3af; }
      .temp-section { text-align: center; margin-bottom: 20px; }
      .mode-label { font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
      .temp-controls { display: flex; align-items: center; justify-content: center; gap: 20px; }
      .temp-btn { background: #2c2c2e; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .temp-btn:active { opacity: 0.6; }
      .temp-value { font-size: 52px; font-weight: 500; }
      .modes { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
      .mode-btn { background: #2c2c2e; border: 1px solid #3f3f3f; color: #9ca3af; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 18px; line-height: 1; }
      .mode-btn.active { background: #1d4ed8; border-color: #3b82f6; color: white; }
      .mode-btn:active { opacity: 0.6; }
      .selects { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .selects.single { grid-template-columns: 1fr; }
      .select-box { background: #2c2c2e; border-radius: 10px; padding: 10px; cursor: pointer; }
      .select-box:active { opacity: 0.7; }
      .select-label { font-size: 11px; color: #9ca3af; margin-bottom: 4px; }
      .select-value { font-size: 13px; color: white; display: flex; justify-content: space-between; align-items: center; }
      .select-arrow { color: #9ca3af; font-size: 10px; }
      .popup-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; align-items: flex-end; justify-content: center; }
      .popup-overlay.open { display: flex; }
      .popup-sheet { background: #2c2c2e; border-radius: 16px 16px 0 0; width: 100%; max-width: 500px; padding: 16px; max-height: 70vh; overflow-y: auto; }
      .popup-title { font-size: 14px; font-weight: 500; color: #9ca3af; margin-bottom: 12px; text-align: center; }
      .popup-item { display: block; width: 100%; background: #3a3a3c; border: none; color: white; padding: 14px 16px; margin-bottom: 8px; border-radius: 10px; font-size: 15px; text-align: left; cursor: pointer; }
      .popup-item:active { opacity: 0.6; }
      .popup-item.active { background: #1d4ed8; }
      .popup-close { display: block; width: 100%; background: #3a3a3c; border: none; color: #9ca3af; padding: 14px; border-radius: 10px; font-size: 15px; cursor: pointer; margin-top: 4px; }
      .popup-close:active { opacity: 0.6; }
    `;
  }

  setConfig(config) {
    if (!config.climate_entity) throw new Error("climate_entity è obbligatorio");
    this._config = config;
  }

  getCardSize() { return 4; }

  static getConfigElement() { return document.createElement("ac-card-editor"); }

  static getStubConfig() {
    return { climate_entity: "", name: "Climatizzatore", hvac_modes: ["heat", "cool", "fan_only", "dry", "off"] };
  }

  get _climate() { return this.hass?.states[this._config?.climate_entity]; }
  get _fanSelect() { return this._config?.fan_entity ? this.hass?.states[this._config.fan_entity] : null; }
  get _swingSelect() { return this._config?.swing_entity ? this.hass?.states[this._config.swing_entity] : null; }
  get _tempSensor() { return this._config?.temperature_entity ? this.hass?.states[this._config.temperature_entity] : null; }
  get _humSensor() { return this._config?.humidity_entity ? this.hass?.states[this._config.humidity_entity] : null; }

  _setTemp(delta) {
    const cur = this._climate?.attributes?.temperature || 24;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.climate_entity,
      temperature: Math.min(this._config.max_temp || 30, Math.max(this._config.min_temp || 16, cur + delta)),
    });
  }

  _setMode(mode) {
    this.hass.callService("climate", "set_hvac_mode", { entity_id: this._config.climate_entity, hvac_mode: mode });
  }

  _setOption(entityId, option) {
    this.hass.callService("select", "select_option", { entity_id: entityId, option });
    this._popupOpen = false;
  }

  _openPopup(type) { this._popupType = type; this._popupOpen = true; }
  _closePopup(e) { if (e.target === e.currentTarget) this._popupOpen = false; }

  render() {
    if (!this._climate) return html``;

    const cfg = this._config;
    const climate = this._climate;
    const fanSelect = this._fanSelect;
    const swingSelect = this._swingSelect;
    const tempSensor = this._tempSensor;
    const humSensor = this._humSensor;

    const targetTemp = climate.attributes.temperature || 24;
    const hvacMode = climate.state;
    const allowedModes = cfg.hvac_modes || ["heat", "cool", "fan_only", "dry", "off"];
    const cardName = cfg.name || "Climatizzatore";
    const fanLevel = fanSelect?.state;
    const swingV = swingSelect?.state;
    const fanOptions = fanSelect?.attributes?.options || [];
    const swingOptions = swingSelect?.attributes?.options || [];

    const parts = [];
    if (tempSensor) parts.push(`${parseFloat(tempSensor.state).toFixed(1)}°C`);
    if (humSensor) parts.push(`${parseFloat(humSensor.state).toFixed(0)}%`);

    const popupOptions = this._popupType === "fan" ? fanOptions : swingOptions;
    const popupLabels = this._popupType === "fan" ? FAN_LABELS : SWING_LABELS;
    const popupCurrent = this._popupType === "fan" ? fanLevel : swingV;
    const popupEntityId = this._popupType === "fan" ? cfg.fan_entity : cfg.swing_entity;
    const popupTitle = this._popupType === "fan" ? "Velocità fan" : "Aletta verticale";

    return html`
      <div class="card">
        <div class="header">
          <div class="header-left">${cardName}</div>
          <div class="header-right">${parts.join(" | ")}</div>
        </div>

        <div class="temp-section">
          <div class="mode-label">${MODE_LABELS[hvacMode] || hvacMode}</div>
          <div class="temp-controls">
            <button class="temp-btn" @click=${() => this._setTemp(-1)}>−</button>
            <span class="temp-value">${targetTemp}°C</span>
            <button class="temp-btn" @click=${() => this._setTemp(1)}>+</button>
          </div>
        </div>

        <div class="modes">
          ${MODES.filter(m => allowedModes.includes(m.value)).map(m => html`
            <button class="mode-btn ${hvacMode === m.value ? "active" : ""}" title="${m.label}" @click=${() => this._setMode(m.value)}>
              ${m.icon}
            </button>
          `)}
        </div>

        ${fanSelect || swingSelect ? html`
          <div class="selects ${fanSelect && swingSelect ? "" : "single"}">
            ${fanSelect ? html`
              <div class="select-box" @click=${() => this._openPopup("fan")}>
                <div class="select-label">Velocità fan</div>
                <div class="select-value">
                  <span>${FAN_LABELS[fanLevel] || fanLevel}</span>
                  <span class="select-arrow">▼</span>
                </div>
              </div>` : ""}
            ${swingSelect ? html`
              <div class="select-box" @click=${() => this._openPopup("swing")}>
                <div class="select-label">Aletta verticale</div>
                <div class="select-value">
                  <span>${SWING_LABELS[swingV] || swingV}</span>
                  <span class="select-arrow">▼</span>
                </div>
              </div>` : ""}
          </div>` : ""}
      </div>

      <div class="popup-overlay ${this._popupOpen ? "open" : ""}" @click=${this._closePopup}>
        <div class="popup-sheet">
          <div class="popup-title">${popupTitle}</div>
          ${popupOptions.map(o => html`
            <button class="popup-item ${o === popupCurrent ? "active" : ""}" @click=${() => this._setOption(popupEntityId, o)}>
              ${popupLabels[o] || o}
            </button>
          `)}
          <button class="popup-close" @click=${() => this._popupOpen = false}>Annulla</button>
        </div>
      </div>
    `;
  }
}

// ─── EDITOR ──────────────────────────────────────────────────────────────────
class AcCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) { this._config = { ...config }; }

  _fire(config) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  _updateConfig(key, value) {
    const newCfg = { ...this._config };
    if (value === "" || value == null) delete newCfg[key];
    else newCfg[key] = value;
    this._config = newCfg;
    this._fire(newCfg);
  }

  render() {
    const cfg = this._config || {};
    const selectedModes = cfg.hvac_modes || ["heat", "cool", "fan_only", "dry", "off"];

    return html`
      <style>
        .editor { padding: 4px; }
        .row { margin-bottom: 16px; }
        .row label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; }
        input[type=text], input[type=number] { width: 100%; padding: 8px; border: 1px solid var(--divider-color); border-radius: 6px; font-size: 14px; box-sizing: border-box; background: var(--card-background-color); color: var(--primary-text-color); }
        .temp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        .temp-row label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; }
        h4 { margin: 16px 0 8px; font-size: 12px; color: var(--secondary-text-color); text-transform: uppercase; }
        .modes-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .mode-check { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }
      </style>
      <div class="editor">
        <div class="row">
          <label>Nome card</label>
          <input type="text" .value=${cfg.name || "Climatizzatore"} @change=${e => this._updateConfig("name", e.target.value)}>
        </div>
        ${EDITOR_FIELDS.map(f => html`
          <div class="row">
            <label>${f.label}</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${cfg[f.key] || ""}
              .includeDomains=${[f.domain]}
              allow-custom-entity
              @value-changed=${e => this._updateConfig(f.key, e.detail.value)}
            ></ha-entity-picker>
          </div>
        `)}
        <div class="temp-row">
          <div>
            <label>Temperatura minima</label>
            <input type="number" .value=${cfg.min_temp || 16} @change=${e => this._updateConfig("min_temp", parseInt(e.target.value))}>
          </div>
          <div>
            <label>Temperatura massima</label>
            <input type="number" .value=${cfg.max_temp || 30} @change=${e => this._updateConfig("max_temp", parseInt(e.target.value))}>
          </div>
        </div>
        <h4>Modalità da mostrare</h4>
        <div class="modes-grid">
          ${MODES.map(m => html`
            <label class="mode-check">
              <input type="checkbox" .checked=${selectedModes.includes(m.value)}
                @change=${e => {
                  const checked = selectedModes.includes(m.value)
                    ? selectedModes.filter(x => x !== m.value)
                    : [...selectedModes, m.value];
                  this._updateConfig("hvac_modes", checked);
                }}>
              ${m.icon} ${m.label}
            </label>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define("ac-card", AcCard);
customElements.define("ac-card-editor", AcCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type: "ac-card", name: "AC Card", description: "Card personalizzata per condizionatore" });
