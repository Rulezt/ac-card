import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit@2.8.0/index.js?module";

const MODE_LABELS = {
  heat: "Riscaldamento", cool: "Raffrescamento", fan_only: "Solo ventilazione",
  dry: "Deumidificazione", off: "Spento", heat_cool: "Auto",
};

const MODE_COLORS = {
  heat: "#f97316", cool: "#60a5fa", fan_only: "#a78bfa",
  dry: "#34d399", off: "#6b7280", heat_cool: "#fbbf24",
};

const MODE_ICONS = {
  heat: "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.95C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5Z",
  cool: "M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M3.5,19.07L5.63,16.95L7.05,18.37L4.93,20.5L3.5,19.07M18.37,18.37L19.07,19.07L20.5,19.07L18.37,16.95L16.95,18.37M11,20H13V23H11V20Z",
  fan_only: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.68,7.29 13.9,8.42 14.58,8.99C15.86,10.08 17.35,9 17.35,9C19.64,7.57 22.22,9.63 21.19,12C20.69,13.17 19.32,13.19 18.53,12.63C17.55,11.95 16.56,12.71 16.45,13.6C16.2,15.5 17.5,16 17.5,16C20.21,16.94 19.63,20.5 17,20.5C15.8,20.5 15.31,19.55 15.44,18.63C15.59,17.55 14.74,16.82 13.85,16.94C11.96,17.2 12,18.5 12,18.5C12,21.21 8.44,21.76 7.5,19.13C7.06,17.93 7.93,17 8.85,16.94C9.93,16.87 10.55,16 10.39,15.09C10.1,13.2 8.5,13.5 8.5,13.5C5.71,14.26 4.08,11.15 6,9.41C6.93,8.57 8.08,9 8.77,9.79C9.52,10.66 10.66,10.34 11.05,9.46C11.82,7.65 10.5,7 10.5,7C7.89,5.87 8.43,2.28 11.06,2.04L12.5,2Z",
  dry: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  off: "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,4H11V13H13",
  heat_cool: "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
};

const MDI = {
  thermometer: "M15,13V5A3,3 0 0,0 9,5V13A5,5 0 1,0 15,13M12,4A1,1 0 0,1 13,5V8H11V5A1,1 0 0,1 12,4Z",
  "water-percent": "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9L15.53,10.06L9.53,16.06L8.47,15M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,13.5A1.25,1.25 0 0,1 15.5,14.75A1.25,1.25 0 0,1 14.25,16A1.25,1.25 0 0,1 13,14.75A1.25,1.25 0 0,1 14.25,13.5Z",
  fan: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.68,7.29 13.9,8.42 14.58,8.99C15.86,10.08 17.35,9 17.35,9C19.64,7.57 22.22,9.63 21.19,12C20.69,13.17 19.32,13.19 18.53,12.63C17.55,11.95 16.56,12.71 16.45,13.6C16.2,15.5 17.5,16 17.5,16C20.21,16.94 19.63,20.5 17,20.5C15.8,20.5 15.31,19.55 15.44,18.63C15.59,17.55 14.74,16.82 13.85,16.94C11.96,17.2 12,18.5 12,18.5C12,21.21 8.44,21.76 7.5,19.13C7.06,17.93 7.93,17 8.85,16.94C9.93,16.87 10.55,16 10.39,15.09C10.1,13.2 8.5,13.5 8.5,13.5C5.71,14.26 4.08,11.15 6,9.41C6.93,8.57 8.08,9 8.77,9.79C9.52,10.66 10.66,10.34 11.05,9.46C11.82,7.65 10.5,7 10.5,7C7.89,5.87 8.43,2.28 11.06,2.04L12.5,2Z",
  "arrow-up-down": "M13,6.99H16L12,3L8,6.99H11V17.01H8L12,21L16,17.01H13V6.99Z",
  "chevron-down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  drag: "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z",
};

const MDI_CUSTOM_ICONS = {
  fire: "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.95C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5Z",
  snowflake: "M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M3.5,19.07L5.63,16.95L7.05,18.37L4.93,20.5L3.5,19.07M18.37,18.37L19.07,19.07L20.5,19.07L18.37,16.95L16.95,18.37M11,20H13V23H11V20Z",
  fan: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.68,7.29 13.9,8.42 14.58,8.99C15.86,10.08 17.35,9 17.35,9C19.64,7.57 22.22,9.63 21.19,12C20.69,13.17 19.32,13.19 18.53,12.63C17.55,11.95 16.56,12.71 16.45,13.6C16.2,15.5 17.5,16 17.5,16C20.21,16.94 19.63,20.5 17,20.5C15.8,20.5 15.31,19.55 15.44,18.63C15.59,17.55 14.74,16.82 13.85,16.94C11.96,17.2 12,18.5 12,18.5C12,21.21 8.44,21.76 7.5,19.13C7.06,17.93 7.93,17 8.85,16.94C9.93,16.87 10.55,16 10.39,15.09C10.1,13.2 8.5,13.5 8.5,13.5C5.71,14.26 4.08,11.15 6,9.41C6.93,8.57 8.08,9 8.77,9.79C9.52,10.66 10.66,10.34 11.05,9.46C11.82,7.65 10.5,7 10.5,7C7.89,5.87 8.43,2.28 11.06,2.04L12.5,2Z",
  water: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  power: "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,4H11V13H13",
  autorenew: "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
  "weather-sunny": "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
  "air-filter": "M4,2H20A2,2 0 0,1 22,4V6C22,6 20,8 20,10C20,12 22,14 22,14V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V14C2,14 4,12 4,10C4,8 2,6 2,6V4A2,2 0 0,1 4,2M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z",
};

const FAN_LABELS = {
  auto: "Auto", low: "Bassa", medium: "Media", high: "Alta", quiet: "Silenziosa",
  "Auto": "Auto", "Level 1": "Velocità 1", "Level 2": "Velocità 2",
  "Level 3": "Velocità 3", "Level 4": "Velocità 4", "Level 5": "Velocità 5", "Quiet": "Silenzioso",
};

const SWING_LABELS = {
  "off": "Spento", "on": "Acceso", "Auto": "Auto", "auto": "Auto",
  "Highest": "Massimo Alto", "High": "Alto", "Middle": "Medio", "Low": "Basso", "Lowest": "Massimo Basso",
  "vertical": "Verticale", "horizontal": "Orizzontale", "both": "Entrambi",
};

function svg(path, color = "currentColor", size = 22) {
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
      .header-right { display: flex; align-items: center; gap: 12px; }
      .sensor-item { display: flex; align-items: center; gap: 4px; font-size: 13px; color: #9ca3af; }
      .temp-section { text-align: center; margin-bottom: 20px; }
      .mode-label { font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
      .temp-controls { display: flex; align-items: center; justify-content: center; gap: 20px; }
      .temp-btn { background: #2c2c2e; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .temp-btn:active { opacity: 0.6; }
      .temp-value { font-size: 52px; font-weight: 300; letter-spacing: -2px; }
      .modes { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
      .mode-btn { background: #2c2c2e; border: 1px solid #3f3f3f; padding: 10px 14px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .mode-btn:active { opacity: 0.6; }
      .selects { display: grid; gap: 10px; }
      .select-box { background: #2c2c2e; border-radius: 10px; padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px; }
      .select-box:active { opacity: 0.7; }
      .select-info { flex: 1; min-width: 0; }
      .select-label { font-size: 11px; color: #9ca3af; margin-bottom: 3px; }
      .select-value { font-size: 13px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .popup-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; align-items: center; justify-content: center; }
      .popup-overlay.open { display: flex; }
      .popup-sheet { background: #2c2c2e; border-radius: 16px; width: 90%; max-width: 400px; padding: 16px; max-height: 70vh; overflow-y: auto; }
      .popup-handle { display: none; }
      .popup-title { font-size: 14px; font-weight: 500; color: #9ca3af; margin-bottom: 12px; text-align: center; }
      .popup-item { display: flex; align-items: center; width: 100%; background: #3a3a3c; border: none; color: white; padding: 14px 16px; margin-bottom: 8px; border-radius: 10px; font-size: 15px; text-align: left; cursor: pointer; box-sizing: border-box; }
      .popup-item:active { opacity: 0.6; }
      .popup-item.active { background: #1d4ed8; }
      .popup-close { display: block; width: 100%; background: #3a3a3c; border: none; color: #9ca3af; padding: 14px; border-radius: 10px; font-size: 15px; cursor: pointer; margin-top: 4px; }
    `;
  }

  setConfig(config) {
    if (!config.climate_entity) throw new Error("climate_entity è obbligatorio");
    this._config = config;
  }

  getCardSize() { return 4; }
  static getConfigElement() { return document.createElement("ac-card-editor"); }
  static getStubConfig() {
    return {
      climate_entity: "",
      name: "Climatizzatore",
      show_fan: true,
      show_swing: true,
      show_temperature: true,
      show_humidity: true,
      modes_order: [],
      hidden_modes: [],
    };
  }

  get _climate() { return this.hass?.states[this._config?.climate_entity]; }
  get _tempSensor() { return this._config?.temperature_entity ? this.hass?.states[this._config.temperature_entity] : null; }
  get _powerSensor() { return this._config?.power_entity ? this.hass?.states[this._config.power_entity] : null; }
  get _humSensor() { return this._config?.humidity_entity ? this.hass?.states[this._config.humidity_entity] : null; }
  get _fanEntity() { return this._config?.fan_entity ? this.hass?.states[this._config.fan_entity] : null; }
  get _swingEntity() { return this._config?.swing_entity ? this.hass?.states[this._config.swing_entity] : null; }

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

  _setFan(option) {
    if (this._fanEntity) {
      this.hass.callService("select", "select_option", { entity_id: this._config.fan_entity, option });
    } else {
      this.hass.callService("climate", "set_fan_mode", { entity_id: this._config.climate_entity, fan_mode: option });
    }
    this._popupOpen = false;
  }

  _setSwing(option) {
    if (this._swingEntity) {
      this.hass.callService("select", "select_option", { entity_id: this._config.swing_entity, option });
    } else {
      this.hass.callService("climate", "set_swing_mode", { entity_id: this._config.climate_entity, swing_mode: option });
    }
    this._popupOpen = false;
  }

  _openPopup(type) { this._popupType = type; this._popupOpen = true; }
  _closePopup(e) { if (e.target === e.currentTarget) this._popupOpen = false; }

  render() {
    if (!this._climate) return html``;

    const cfg = this._config;
    const climate = this._climate;
    const tempSensor = this._tempSensor;
    const humSensor = this._humSensor;
    const powerSensor = this._powerSensor;
    const fanEntity = this._fanEntity;
    const swingEntity = this._swingEntity;

    const targetTemp = climate.attributes.temperature || 24;
    const hvacMode = climate.state;
    const cardName = cfg.name || "Climatizzatore";
    const hiddenModes = cfg.hidden_modes || [];

    const fanModes = fanEntity ? fanEntity.attributes.options : (climate.attributes.fan_modes || []);
    const fanMode = fanEntity ? fanEntity.state : climate.attributes.fan_mode;
    const swingModes = swingEntity ? swingEntity.attributes.options : (climate.attributes.swing_modes || []);
    const swingMode = swingEntity ? swingEntity.state : climate.attributes.swing_mode;

    const availableModes = climate.attributes.hvac_modes || ["off"];
    const modesOrder = cfg.modes_order || [];
    const orderedModes = modesOrder.length > 0
      ? [...modesOrder.filter(m => availableModes.includes(m)), ...availableModes.filter(m => !modesOrder.includes(m))]
      : availableModes;
    const visibleModes = orderedModes.filter(m => !hiddenModes.includes(m));

    const modeCustomCfg = cfg.mode_custom || {};
    const activeColor = (modeCustomCfg[hvacMode]?.color) || MODE_COLORS[hvacMode] || "#60a5fa";
    const isFanPopup = this._popupType === "fan";
    const popupOptions = isFanPopup ? fanModes : swingModes;
    const popupLabels = isFanPopup ? FAN_LABELS : SWING_LABELS;
    const popupCurrent = isFanPopup ? fanMode : swingMode;
    const popupTitle = isFanPopup ? "Velocità fan" : "Aletta verticale";

    const showFan = cfg.show_fan !== false && fanModes.length > 0;
    const showSwing = cfg.show_swing !== false && swingModes.length > 0;
    const selectCount = (showFan ? 1 : 0) + (showSwing ? 1 : 0);

    return html`
      <div class="card">
        <div class="header">
          <div class="header-left">
            ${svg((modeCustomCfg[hvacMode]?.icon && MDI_CUSTOM_ICONS[modeCustomCfg[hvacMode].icon]) || MODE_ICONS[hvacMode] || MODE_ICONS.off, activeColor, 20)}
            ${cardName}
          </div>
          <div class="header-right">
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
              <div style="display:flex;gap:12px;">
                ${tempSensor && cfg.show_temperature !== false ? html`
                  <span class="sensor-item">${svg(MDI.thermometer, "#f87171", 16)} ${parseFloat(tempSensor.state).toFixed(1)}°C</span>` : ""}
                ${humSensor && cfg.show_humidity !== false ? html`
                  <span class="sensor-item">${svg(MDI["water-percent"], "#60a5fa", 16)} ${parseFloat(humSensor.state).toFixed(0)}%</span>` : ""}
              </div>
              ${powerSensor ? html`
                <span class="sensor-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#fbbf24"><path d="M11.5,1L2,6V12C2,17.55 6.08,22.74 12,24C17.92,22.74 22,17.55 22,12V6L11.5,1M11.5,3.18L20,7.3V12C20,16.54 16.6,20.89 11.5,22.03C6.4,20.89 4,16.54 4,12V7.3L11.5,3.18M13,16H11V18H13V16M13,6H11V14H13V6"/></svg>
                  ${parseFloat(powerSensor.state).toFixed(0)} W
                </span>` : ""}
            </div>
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
          ${visibleModes.map(m => {
            const active = hvacMode === m;
            const custom = modeCustomCfg[m] || {};
            const color = custom.color || MODE_COLORS[m] || "#6b7280";
            const iconPath = (custom.icon && MDI_CUSTOM_ICONS[custom.icon]) || MODE_ICONS[m] || MODE_ICONS.off;
            return html`
              <button class="mode-btn" title="${MODE_LABELS[m] || m}"
                style="${active ? `background:${color}22;border-color:${color};` : "border-color:#3f3f3f;"}"
                @click=${() => this._setMode(m)}>
                ${svg(iconPath, active ? color : "#6b7280", 22)}
              </button>`;
          })}
        </div>

        ${selectCount > 0 ? html`
          <div class="selects" style="grid-template-columns:${selectCount === 2 ? "1fr 1fr" : "1fr"}">
            ${showFan ? html`
              <div class="select-box" @click=${() => this._openPopup("fan")}>
                ${svg(MDI.fan, "#a78bfa", 20)}
                <div class="select-info">
                  ${cfg.show_fan_label !== false ? html`<div class="select-label">Velocità fan</div>` : ""}
                  <div class="select-value">${FAN_LABELS[fanMode] || fanMode}</div>
                </div>
                ${svg(MDI["chevron-down"], "#6b7280", 16)}
              </div>` : ""}
            ${showSwing ? html`
              <div class="select-box" @click=${() => this._openPopup("swing")}>
                ${svg(MDI["arrow-up-down"], "#34d399", 20)}
                <div class="select-info">
                  ${cfg.show_swing_label !== false ? html`<div class="select-label">Aletta verticale</div>` : ""}
                  <div class="select-value">${SWING_LABELS[swingMode] || swingMode}</div>
                </div>
                ${svg(MDI["chevron-down"], "#6b7280", 16)}
              </div>` : ""}
          </div>` : ""}
      </div>

      <div class="popup-overlay ${this._popupOpen ? "open" : ""}" @click=${this._closePopup}>
        <div class="popup-sheet">
          <div class="popup-handle"></div>
          <div class="popup-title">${popupTitle}</div>
          ${popupOptions.map(o => html`
            <button class="popup-item ${o === popupCurrent ? "active" : ""}"
              @click=${() => isFanPopup ? this._setFan(o) : this._setSwing(o)}>
              ${popupLabels[o] || o}
            </button>`)}
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
      _dragIndex: { state: true },
    };
  }

  setConfig(config) { this._config = { ...config }; }

  _fire(config) {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  _set(key, value) {
    const c = { ...this._config };
    if (value === "" || value == null) delete c[key];
    else c[key] = value;
    this._config = c;
    this._fire(c);
  }

  _toggleMode(mode) {
    const hidden = this._config.hidden_modes || [];
    this._set("hidden_modes", hidden.includes(mode) ? hidden.filter(m => m !== mode) : [...hidden, mode]);
  }

  _onDragStart(e, index) {
    this._dragIndex = index;
    e.dataTransfer.effectAllowed = "move";
  }

  _onDragOver(e, index) {
    e.preventDefault();
    if (this._dragIndex === index) return;
    const climate = this.hass?.states[this._config?.climate_entity];
    const availableModes = climate?.attributes?.hvac_modes || [];
    const modesOrder = this._config.modes_order?.length > 0
      ? [...this._config.modes_order]
      : [...availableModes];
    const dragged = modesOrder[this._dragIndex];
    modesOrder.splice(this._dragIndex, 1);
    modesOrder.splice(index, 0, dragged);
    this._dragIndex = index;
    this._set("modes_order", modesOrder);
  }

  _onDragEnd() { this._dragIndex = null; }

  _setModeCustom(mode, key, value) {
    const modeCustom = { ...(this._config.mode_custom || {}) };
    modeCustom[mode] = { ...(modeCustom[mode] || {}), [key]: value };
    this._set("mode_custom", modeCustom);
  }

  _toggleSection(e) {
    const header = e.currentTarget;
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".section-arrow");
    body.classList.toggle("open");
    arrow.classList.toggle("open");
  }

  render() {
    if (!this.hass) return html``;
    const cfg = this._config || {};
    const hidden = cfg.hidden_modes || [];
    const climate = cfg.climate_entity ? this.hass.states[cfg.climate_entity] : null;
    const availableModes = climate?.attributes?.hvac_modes || [];
    const modesOrder = cfg.modes_order?.length > 0
      ? [...cfg.modes_order.filter(m => availableModes.includes(m)), ...availableModes.filter(m => !cfg.modes_order.includes(m))]
      : availableModes;

    return html`
      <style>
        .editor { font-family: sans-serif; }
        .section { border: 1px solid var(--divider-color); border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
        .section-header { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; background: var(--secondary-background-color); user-select: none; }
        .section-header svg { flex-shrink: 0; }
        .section-title { flex: 1; font-size: 13px; font-weight: 500; color: var(--primary-text-color); }
        .section-arrow { transition: transform 0.2s; color: var(--secondary-text-color); }
        .section-arrow.open { transform: rotate(180deg); }
        .section-body { padding: 12px 16px; display: none; }
        .section-body.open { display: block; }
        .row { margin-bottom: 14px; }
        .row:last-child { margin-bottom: 0; }
        label.row-label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; }
        input[type=text], input[type=number] { width: 100%; padding: 8px; border: 1px solid var(--divider-color); border-radius: 6px; font-size: 14px; box-sizing: border-box; background: var(--card-background-color); color: var(--primary-text-color); }
        .temp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .temp-row label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; }
        .toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-radius: 6px; background: var(--card-background-color); border: 1px solid var(--divider-color); font-size: 13px; }
        .modes-list { display: flex; flex-direction: column; gap: 6px; }
        .mode-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--card-background-color); border: 1px solid var(--divider-color); font-size: 13px; cursor: grab; user-select: none; }
        .mode-item.dragging { opacity: 0.4; }
        .mode-item.hidden-mode { opacity: 0.4; }
        .drag-handle { color: var(--secondary-text-color); cursor: grab; display: flex; }
        .mode-name { flex: 1; }
        .eye-btn { background: none; border: none; cursor: pointer; padding: 2px; display: flex; align-items: center; color: var(--secondary-text-color); }
        .eye-btn:hover { color: var(--primary-text-color); }
      </style>
      <div class="editor">

        <!-- GENERALE -->
        <div class="section">
          <div class="section-header" @click=${e => this._toggleSection(e)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary-text-color)"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>
            <span class="section-title">Generale</span>
            <svg class="section-arrow open" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </div>
          <div class="section-body open">
            <div class="row">
              <label class="row-label">Nome card</label>
              <input type="text" .value=${cfg.name || "Climatizzatore"} @change=${e => this._set("name", e.target.value)}>
            </div>
            <div class="row">
              <label class="row-label">Entità climate *</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.climate_entity || ""} .includeDomains=${["climate"]}
                allow-custom-entity @value-changed=${e => this._set("climate_entity", e.detail.value)}></ha-entity-picker>
            </div>
            <div class="temp-row">
              <div><label>Temperatura minima</label>
                <input type="number" .value=${cfg.min_temp || 16} @change=${e => this._set("min_temp", parseInt(e.target.value))}></div>
              <div><label>Temperatura massima</label>
                <input type="number" .value=${cfg.max_temp || 30} @change=${e => this._set("max_temp", parseInt(e.target.value))}></div>
            </div>
          </div>
        </div>

        <!-- SENSORI -->
        <div class="section">
          <div class="section-header" @click=${e => this._toggleSection(e)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary-text-color)"><path d="M15,13V5A3,3 0 0,0 9,5V13A5,5 0 1,0 15,13M12,4A1,1 0 0,1 13,5V8H11V5A1,1 0 0,1 12,4Z"/></svg>
            <span class="section-title">Sensori</span>
            <svg class="section-arrow" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </div>
          <div class="section-body">
            <div class="row">
              <label class="row-label">Sensore temperatura</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.temperature_entity || ""} .includeDomains=${["sensor"]}
                allow-custom-entity @value-changed=${e => this._set("temperature_entity", e.detail.value)}></ha-entity-picker>
            </div>
            <div class="row">
              <label class="row-label">Sensore umidità</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.humidity_entity || ""} .includeDomains=${["sensor"]}
                allow-custom-entity @value-changed=${e => this._set("humidity_entity", e.detail.value)}></ha-entity-picker>
            </div>
            <div class="row">
              <label class="row-label">Sensore consumo (W)</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.power_entity || ""} .includeDomains=${["sensor"]}
                allow-custom-entity @value-changed=${e => this._set("power_entity", e.detail.value)}></ha-entity-picker>
            </div>
          </div>
        </div>

        <!-- ENTITÀ SELECT -->
        <div class="section">
          <div class="section-header" @click=${e => this._toggleSection(e)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary-text-color)"><path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.68,7.29 13.9,8.42 14.58,8.99C15.86,10.08 17.35,9 17.35,9C19.64,7.57 22.22,9.63 21.19,12C20.69,13.17 19.32,13.19 18.53,12.63C17.55,11.95 16.56,12.71 16.45,13.6C16.2,15.5 17.5,16 17.5,16C20.21,16.94 19.63,20.5 17,20.5C15.8,20.5 15.31,19.55 15.44,18.63C15.59,17.55 14.74,16.82 13.85,16.94C11.96,17.2 12,18.5 12,18.5C12,21.21 8.44,21.76 7.5,19.13C7.06,17.93 7.93,17 8.85,16.94C9.93,16.87 10.55,16 10.39,15.09C10.1,13.2 8.5,13.5 8.5,13.5C5.71,14.26 4.08,11.15 6,9.41C6.93,8.57 8.08,9 8.77,9.79C9.52,10.66 10.66,10.34 11.05,9.46C11.82,7.65 10.5,7 10.5,7C7.89,5.87 8.43,2.28 11.06,2.04L12.5,2Z"/></svg>
            <span class="section-title">Entità select</span>
            <svg class="section-arrow" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </div>
          <div class="section-body">
            <div class="row">
              <label class="row-label">Velocità fan (select esterno)</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.fan_entity || ""} .includeDomains=${["select"]}
                allow-custom-entity @value-changed=${e => this._set("fan_entity", e.detail.value)}></ha-entity-picker>
            </div>
            <div class="row">
              <label class="row-label">Swing verticale (select esterno)</label>
              <ha-entity-picker .hass=${this.hass} .value=${cfg.swing_entity || ""} .includeDomains=${["select"]}
                allow-custom-entity @value-changed=${e => this._set("swing_entity", e.detail.value)}></ha-entity-picker>
            </div>
          </div>
        </div>

        <!-- VISIBILITÀ -->
        <div class="section">
          <div class="section-header" @click=${e => this._toggleSection(e)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary-text-color)"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"/></svg>
            <span class="section-title">Visibilità controlli</span>
            <svg class="section-arrow" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </div>
          <div class="section-body">
            <div class="toggle-grid" style="grid-template-columns:1fr 1fr;">
              <div class="toggle-row">
                <span>Velocità fan</span>
                <ha-switch .checked=${cfg.show_fan !== false} @change=${e => this._set("show_fan", e.target.checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span>Etichetta velocità fan</span>
                <ha-switch .checked=${cfg.show_fan_label !== false} @change=${e => this._set("show_fan_label", e.target.checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span>Aletta verticale</span>
                <ha-switch .checked=${cfg.show_swing !== false} @change=${e => this._set("show_swing", e.target.checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span>Etichetta aletta verticale</span>
                <ha-switch .checked=${cfg.show_swing_label !== false} @change=${e => this._set("show_swing_label", e.target.checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span>Temperatura</span>
                <ha-switch .checked=${cfg.show_temperature !== false} @change=${e => this._set("show_temperature", e.target.checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span>Umidità</span>
                <ha-switch .checked=${cfg.show_humidity !== false} @change=${e => this._set("show_humidity", e.target.checked)}></ha-switch>
              </div>
            </div>
          </div>
        </div>

        <!-- MODALITÀ -->
        ${modesOrder.length > 0 ? html`
        <div class="section">
          <div class="section-header" @click=${e => this._toggleSection(e)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary-text-color)"><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/></svg>
            <span class="section-title">Ordine modalità</span>
            <svg class="section-arrow" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </div>
          <div class="section-body">
            <div style="font-size:12px;color:var(--secondary-text-color);margin-bottom:10px;">Trascina per riordinare • Occhio per nascondere</div>
            <div class="modes-list">
              ${modesOrder.map((m, i) => {
                const modeCustom = (cfg.mode_custom || {})[m] || {};
                const modeColor = modeCustom.color || MODE_COLORS[m] || "#6b7280";
                const modeIcon = modeCustom.icon || m;
                const modeIconPath = MDI_CUSTOM_ICONS[modeIcon] || MODE_ICONS[m] || MODE_ICONS.off;
                return html`
                <div class="mode-item ${this._dragIndex === i ? "dragging" : ""} ${hidden.includes(m) ? "hidden-mode" : ""}"
                  draggable="true"
                  @dragstart=${e => this._onDragStart(e, i)}
                  @dragover=${e => this._onDragOver(e, i)}
                  @dragend=${this._onDragEnd}>
                  <button class="eye-btn" title="${hidden.includes(m) ? "Mostra" : "Nascondi"}" @click=${() => this._toggleMode(m)}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="${hidden.includes(m)
                        ? 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z'
                        : 'M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z'}"/>
                    </svg>
                  </button>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="${modeColor}" style="flex-shrink:0"><path d="${modeIconPath}"/></svg>
                  <span class="mode-name">${MODE_LABELS[m] || m}</span>
                  <input type="color" value="${modeColor}" title="Colore"
                    style="width:28px;height:28px;border:none;border-radius:4px;cursor:pointer;padding:0;background:none;flex-shrink:0;"
                    @change=${e => this._setModeCustom(m, "color", e.target.value)}>
                  <select style="background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:4px;padding:3px;font-size:11px;max-width:90px;"
                    @change=${e => this._setModeCustom(m, "icon", e.target.value)}>
                    ${Object.keys(MDI_CUSTOM_ICONS).map(k => html`<option value="${k}" ?selected=${modeIcon === k}>${k}</option>`)}
                  </select>
                  <span class="drag-handle">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="${MDI.drag}"/></svg>
                  </span>
                </div>`;
              })}
            </div>
          </div>
        </div>` : ""}

      </div>
    `;
  }
}

customElements.define("ac-card", AcCard);
customElements.define("ac-card-editor", AcCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type: "ac-card", name: "AC Card", description: "Card personalizzata per condizionatore" });
