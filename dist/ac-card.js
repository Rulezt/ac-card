import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit@2.8.0/index.js?module";

const MODES = [
  { value: "heat", label: "Riscaldamento", icon: "mdi:fire", color: "#f97316" },
  { value: "cool", label: "Raffrescamento", icon: "mdi:snowflake", color: "#60a5fa" },
  { value: "fan_only", label: "Solo ventilazione", icon: "mdi:fan", color: "#a78bfa" },
  { value: "dry", label: "Deumidificazione", icon: "mdi:water", color: "#34d399" },
  { value: "off", label: "Spento", icon: "mdi:power", color: "#6b7280" },
  { value: "heat_cool", label: "Auto", icon: "mdi:autorenew", color: "#fbbf24" },
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

function mdiIcon(path, color = "currentColor", size = 24) {
  return html`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}"><path d="${path}"/></svg>`;
}

const MDI_PATHS = {
  "mdi:fire": "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.95C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5Z",
  "mdi:snowflake": "M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M3.5,19.07L5.63,16.95L7.05,18.37L4.93,20.5L3.5,19.07M18.37,18.37L19.07,19.07L20.5,19.07L18.37,16.95L16.95,18.37M11,20H13V23H11V20Z",
  "mdi:fan": "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.68,7.29 13.9,8.42 14.58,8.99C15.86,10.08 17.35,9 17.35,9C19.64,7.57 22.22,9.63 21.19,12C20.69,13.17 19.32,13.19 18.53,12.63C17.55,11.95 16.56,12.71 16.45,13.6C16.2,15.5 17.5,16 17.5,16C20.21,16.94 19.63,20.5 17,20.5C15.8,20.5 15.31,19.55 15.44,18.63C15.59,17.55 14.74,16.82 13.85,16.94C11.96,17.2 12,18.5 12,18.5C12,21.21 8.44,21.76 7.5,19.13C7.06,17.93 7.93,17 8.85,16.94C9.93,16.87 10.55,16 10.39,15.09C10.1,13.2 8.5,13.5 8.5,13.5C5.71,14.26 4.08,11.15 6,9.41C6.93,8.57 8.08,9 8.77,9.79C9.52,10.66 10.66,10.34 11.05,9.46C11.82,7.65 10.5,7 10.5,7C7.89,5.87 8.43,2.28 11.06,2.04L12.5,2Z",
  "mdi:water": "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  "mdi:power": "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,4H11V13H13",
  "mdi:autorenew": "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
  "mdi:thermometer": "M15,13V5A3,3 0 0,0 9,5V13A5,5 0 1,0 15,13M12,4A1,1 0 0,1 13,5V8H11V5A1,1 0 0,1 12,4Z",
  "mdi:water-percent": "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9L15.53,10.06L9.53,16.06L8.47,15M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,13.5A1.25,1.25 0 0,1 15.5,14.75A1.25,1.25 0 0,1 14.25,16A1.25,1.25 0 0,1 13,14.75A1.25,1.25 0 0,1 14.25,13.5Z",
  "mdi:chevron-down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  "mdi:air-conditioner": "M6,12H18M6,12L9,9M6,12L9,15M18,12L15,9M18,12L15,15M4,4H20V8H4V4M4,16H20V20H4V16",
};

function icon(name, color = "currentColor", size = 22) {
  const path = MDI_PATHS[name];
  if (!path) return html``;
  return html`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" style="flex-shrink:0"><path d="${path}"/></svg>`;
}

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
      .header-left { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; }
      .header-right { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #9ca3af; }
      .sensor-item { display: flex; align-items: center; gap: 4px; }
      .temp-section { text-align: center; margin-bottom: 20px; }
      .mode-label { font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
      .temp-controls { display: flex; align-items: center; justify-content: center; gap: 20px; }
      .temp-btn { background: #2c2c2e; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.1s; }
      .temp-btn:active { opacity: 0.6; }
      .temp-value { font-size: 52px; font-weight: 300; letter-spacing: -2px; }
      .modes { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
      .mode-btn { background: #2c2c2e; border: 1px solid #3f3f3f; color: #6b7280; padding: 10px 14px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
      .mode-btn:active { opacity: 0.6; }
      .mode-btn.active { border-color: transparent; }
      .selects { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .selects.single { grid-template-columns: 1fr; }
      .select-box { background: #2c2c2e; border-radius: 10px; padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: opacity 0.1s; }
      .select-box:active { opacity: 0.7; }
      .select-info { flex: 1; min-width: 0; }
      .select-label { font-size: 11px; color: #9ca3af; margin-bottom: 3px; }
      .select-value { font-size: 13px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .popup-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; align-items: flex-end; justify-content: center; }
      .popup-overlay.open { display: flex; }
      .popup-sheet { background: #2c2c2e; border-radius: 16px 16px 0 0; width: 100%; max-width: 500px; padding: 16px; max-height: 70vh; overflow-y: auto; }
      .popup-handle { width: 36px; height: 4px; background: #4b5563; border-radius: 2px; margin: 0 auto 16px; }
      .popup-title { font-size: 14px; font-weight: 500; color: #9ca3af; margin-bottom: 12px; text-align: center; }
      .popup-item { display: flex; align-items: center; width: 100%; background: #3a3a3c; border: none; color: white; padding: 14px 16px; margin-bottom: 8px; border-radius: 10px; font-size: 15px; text-align: left; cursor: pointer; transition: opacity 0.1s; gap: 10px; box-sizing: border-box; }
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

    const activeMode = MODES.find(m => m.value === hvacMode);

    const popupOptions = this._popupType === "fan" ? fanOptions : swingOptions;
    const popupLabels = this._popupType === "fan" ? FAN_LABELS : SWING_LABELS;
    const popupCurrent = this._popupType === "fan" ? fanLevel : swingV;
    const popupEntityId = this._popupType === "fan" ? cfg.fan_entity : cfg.swing_entity;
    const popupTitle = this._popupType === "fan" ? "Velocità fan" : "Aletta verticale";

    return html`
      <div class="card">
        <div class="header">
          <div class="header-left">
            ${icon("mdi:air-conditioner", activeMode?.color || "#60a5fa", 20)}
            ${cardName}
          </div>
          <div class="header-right">
            ${tempSensor ? html`<span class="sensor-item">${icon("mdi:thermometer", "#f87171", 16)} ${parseFloat(tempSensor.state).toFixed(1)}°C</span>` : ""}
            ${humSensor ? html`<span class="sensor-item">${icon("mdi:water-percent", "#60a5fa", 16)} ${parseFloat(humSensor.state).toFixed(0)}%</span>` : ""}
          </div>
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
            <button
              class="mode-btn ${hvacMode === m.value ? "active" : ""}"
              title="${m.label}"
              style="${hvacMode === m.value ? `background: ${m.color}22; border-color: ${m.color};` : ""}"
              @click=${() => this._setMode(m.value)}
            >
              ${icon(m.icon, hvacMode === m.value ? m.color : "#6b7280", 22)}
            </button>
          `)}
        </div>

        ${fanSelect || swingSelect ? html`
          <div class="selects ${fanSelect && swingSelect ? "" : "single"}">
            ${fanSelect ? html`
              <div class="select-box" @click=${() => this._openPopup("fan")}>
                ${icon("mdi:fan", "#a78bfa", 20)}
                <div class="select-info">
                  <div class="select-label">Velocità fan</div>
                  <div class="select-value">${FAN_LABELS[fanLevel] || fanLevel}</div>
                </div>
                ${icon("mdi:chevron-down", "#6b7280", 16)}
              </div>` : ""}
            ${swingSelect ? html`
              <div class="select-box" @click=${() => this._openPopup("swing")}>
                ${icon("mdi:water", "#34d399", 20)}
                <div class="select-info">
                  <div class="select-label">Aletta verticale</div>
                  <div class="select-value">${SWING_LABELS[swingV] || swingV}</div>
                </div>
                ${icon("mdi:chevron-down", "#6b7280", 16)}
              </div>` : ""}
          </div>` : ""}
      </div>

      <div class="popup-overlay ${this._popupOpen ? "open" : ""}" @click=${this._closePopup}>
        <div class="popup-sheet">
          <div class="popup-handle"></div>
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
                @change=${() => {
                  const checked = selectedModes.includes(m.value)
                    ? selectedModes.filter(x => x !== m.value)
                    : [...selectedModes, m.value];
                  this._updateConfig("hvac_modes", checked);
                }}>
              ${m.label}
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
