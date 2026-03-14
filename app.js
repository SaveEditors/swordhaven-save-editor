const autoDetectInput = document.getElementById("autoDetectInput");
const chooseFolderBtn = document.getElementById("chooseFolderBtn");
const selectedFolderLabel = document.getElementById("selectedFolderLabel");
const exportBtn = document.getElementById("exportBtn");
const revertAllBtn = document.getElementById("revertAllBtn");
const resetBtn = document.getElementById("resetBtn");

const statusEl = document.getElementById("status");
const savePathHint = document.getElementById("savePathHint");
const summaryStrip = document.getElementById("summaryStrip");
const warningCount = document.getElementById("warningCount");
const modifiedList = document.getElementById("modifiedList");

const viewTabs = document.getElementById("viewTabs");
const coreView = document.getElementById("coreView");
const recordsView = document.getElementById("recordsView");
const mapsView = document.getElementById("mapsView");

const recordFilter = document.getElementById("recordFilter");
const quickAccessBar = document.getElementById("quickAccessBar");
const entryList = document.getElementById("entryList");

const saveFields = document.getElementById("saveFields");
const playerFields = document.getElementById("playerFields");

const statsMeta = document.getElementById("statsMeta");
const statsFilter = document.getElementById("statsFilter");
const statsMismatchToggle = document.getElementById("statsMismatchToggle");
const statsSyncToggle = document.getElementById("statsSyncToggle");
const statsCopySaveBtn = document.getElementById("statsCopySaveBtn");
const statsCopyPlayerBtn = document.getElementById("statsCopyPlayerBtn");
const statsReloadBtn = document.getElementById("statsReloadBtn");
const statsTable = document.getElementById("statsTable");

const inventoryTree = document.getElementById("inventoryTree");
const inventoryStatus = document.getElementById("inventoryStatus");
const inventoryFilter = document.getElementById("inventoryFilter");
const inventoryAddBtn = document.getElementById("inventoryAddBtn");
const inventoryQuickActions = document.getElementById("inventoryQuickActions");
const questTree = document.getElementById("questTree");
const questStatus = document.getElementById("questStatus");

const qaRevealAllBtn = document.getElementById("qaRevealAllBtn");
const qaFogAllBtn = document.getElementById("qaFogAllBtn");
const qaClearDecalsBtn = document.getElementById("qaClearDecalsBtn");
const qaSyncStatsBtn = document.getElementById("qaSyncStatsBtn");

const recordTitle = document.getElementById("recordTitle");
const recordSubtitle = document.getElementById("recordSubtitle");
const recordRevertBtn = document.getElementById("recordRevertBtn");
const recordSearch = document.getElementById("recordSearch");
const recordInspector = document.getElementById("recordInspector");
const rawJsonArea = document.getElementById("rawJsonArea");
const rawApplyBtn = document.getElementById("rawApplyBtn");
const rawFormatBtn = document.getElementById("rawFormatBtn");
const rawReloadBtn = document.getElementById("rawReloadBtn");
const rawStatus = document.getElementById("rawStatus");

const fowSelect = document.getElementById("fowSelect");
const fowMeta = document.getElementById("fowMeta");
const fowStats = document.getElementById("fowStats");
const fowCanvas = document.getElementById("fowCanvas");
const fowPreviewMeta = document.getElementById("fowPreviewMeta");
const revealAllBtn = document.getElementById("revealAllBtn");
const fogAllBtn = document.getElementById("fogAllBtn");
const invertBtn = document.getElementById("invertBtn");
const fowResetViewBtn = document.getElementById("fowResetViewBtn");
const regionX = document.getElementById("regionX");
const regionY = document.getElementById("regionY");
const regionW = document.getElementById("regionW");
const regionH = document.getElementById("regionH");
const regionValue = document.getElementById("regionValue");
const applyRegionBtn = document.getElementById("applyRegionBtn");

const clearDecalsToggle = document.getElementById("clearDecalsToggle");
const decalsMeta = document.getElementById("decalsMeta");
const decalsList = document.getElementById("decalsList");

const utf8Decoder = new TextDecoder("utf-8", { fatal: false });
const utf8Encoder = new TextEncoder();

const SAVE_CORE_KEYS = [
  "player_name",
  "player_bio",
  "worldTime",
  "realTime",
  "battleExp",
  "worldmap_id",
  "worldPos_x",
  "worldPos_y",
  "worldmap_nexthunt",
  "difficult",
  "ironman",
  "paused",
  "save_version",
];

const PLAYER_CORE_KEYS = [
  "name",
  "class",
  "character",
  "proto",
  "active",
  "damage",
  "ap",
  "relationship",
  "fraction",
  "civicsociety",
  "beard",
  "hair",
  "hairColor",
  "voiceasset",
  "constitution_fat",
  "constitution_height",
  "constitution_strength",
];

const RECORD_SELECTION_PREFERENCE = [
  "save.dat",
  "player.dat",
  "entities.dat",
  "info.dat",
  "dh.dat",
];

const ATTRIBUTE_KEYS = [
  "strength",
  "attention",
  "endurance",
  "personality",
  "intellect",
  "dexterity",
  "luck",
];

const SKILL_MILESTONES = [50, 75, 100, 150, 199, 200];
const DEFAULT_SAVE_PATH = String.raw`Windows save path: %USERPROFILE%\AppData\LocalLow\AtomTeam\Swordhaven`;

const FIELD_GUIDE = {
  player_name: "Display name shown in the save profile.",
  player_bio: "Free-form biography text. This is one of the few fields where open text is expected.",
  worldTime: "In-game time counter stored as a numeric string.",
  realTime: "Real time/session counter stored as a numeric string.",
  battleExp: "Battle experience pool stored as a numeric string.",
  worldmap_id: "Current world map node. Safer to choose a discovered level id than to type a new one.",
  worldPos_x: "Current world position X coordinate stored as a string float.",
  worldPos_y: "Current world position Y coordinate stored as a string float.",
  worldmap_nexthunt: "Encounter timer/counter. Keep numeric-string formatting.",
  difficult: "Difficulty setting stored as a numeric string. Community posts say difficulty can be changed on the fly; numeric labels remain inferred.",
  ironman: "Ironman flag stored as a string boolean.",
  paused: "Pause flag stored as a string boolean.",
  save_version: "Save schema version. Changing this is rarely useful.",
  level: "For save.dat this is the current area/level id, not the character level. Use an observed level id.",
  class: "Entity class discriminator. For player.dat this should normally stay Character.",
  character: "Character archetype id. Use observed ids from the loaded corpus.",
  proto: "Prototype id. Use observed ids from the loaded corpus to avoid broken references.",
  active: "Activation flag stored as a string boolean.",
  damage: "Current damage string. Keep within plausible combat values.",
  ap: "Current action points string.",
  relationship: "Relationship value string.",
  fraction: "Faction id. Use an observed faction string.",
  civicsociety: "Social group id. Use an observed value.",
  beard: "Appearance preset. Use an observed beard preset.",
  hair: "Appearance preset. Use an observed hair preset.",
  hairColor: "Appearance color preset. Use an observed color preset.",
  voiceasset: "Voice asset path. Use an observed voice asset path.",
  constitution_fat: "Body morph float string.",
  constitution_height: "Body morph float string.",
  constitution_strength: "Body morph float string.",
  behavior: "Logic behavior id. Use an observed behavior id.",
  caps: "Meaning still unresolved from file inspection. In the sampled player save the observed value is Player, so do not treat this as currency without confirming in game.",
  lastRoudTime: "Last round time counter stored as a numeric string.",
  quickpanelmainindex: "Selected quickslot index stored as a numeric string.",
};

const ATTRIBUTE_GUIDE = {
  strength: "Used heavily for melee damage and equipment handling in community build discussions.",
  attention: "High Attention is commonly recommended for hidden loot and awareness checks.",
  endurance: "Community discussions tie this to survivability and carry load.",
  personality: "Dialogue-centric attribute used for many social routes.",
  intellect: "Often recommended for broader skill coverage and intelligence checks.",
  dexterity: "Commonly discussed for dodge and agile melee/ranged builds.",
  luck: "Community reports tie this to dodge and special event variance.",
};

const SKILL_GUIDE = {
  MartialArts: "Unarmed skill. Perk tiers observed at 50/75/100/150/199.",
  BladedWeapons: "Blade skill. Perk tiers observed at 50/75/100/150/199.",
  AxesMaces: "Axes and maces skill. Perk tiers observed at 50/75/100/150/199.",
  SpearsHalberds: "Spears and halberds skill. Perk tiers observed at 50/75/100/150/199.",
  RangedWeapons: "Ranged skill. Community guides lean on this for safer early fights.",
  Intimidation: "Main-character dialogue/world check skill.",
  Persuasion: "Main-character dialogue/world check skill.",
  Bluff: "Main-character dialogue/world check skill.",
  Haggling: "Trade and pricing skill.",
  Outdoorsmanship: "Steam discussion explicitly calls out a rank-1 bonus at 50.",
  Stealth: "Sneak skill. Often paired with Pickpocketing or ranged play.",
  Lockpicking: "Steam discussions mention black chests at 199 lockpicking.",
  Pickpocketing: "Theft skill. Often paired with stealth.",
  Crafting: "Crafting/upgrade skill. Perk tiers observed in save perk ids.",
  Medicine: "Healing skill. Perk tiers observed in save perk ids.",
};

function createEmptyState() {
  return {
    sourceType: null,
    sourceName: "",
    order: [],
    entries: new Map(),
    jsonEntries: new Map(),
    parseErrors: new Map(),
    fow: new Map(),
    decals: new Map(),
    originalEntries: new Map(),
    warnings: [],
    decalsMode: "ignore",
    selectedRecord: null,
    catalog: null,
  };
}

const ui = {
  activeView: "core",
  rawLoadedFor: null,
  recordMode: "auto",
  entityLevel: "",
  entityName: "",
  entityClass: "all",
  worldPinsFile: "",
  dhCharacter: "",
  infoLogic: "",
};

const fowView = {
  zoom: 1,
  panX: 0,
  panY: 0,
  dragging: false,
  lastName: null,
  lastRender: null,
  dragStart: { x: 0, y: 0, panX: 0, panY: 0 },
};

let state = createEmptyState();

function createEmptyCatalog() {
  return {
    byKey: new Map(),
    byField: new Map(),
    levelIds: new Set(),
    protoIds: new Set(),
    behaviorIds: new Set(),
    fractionIds: new Set(),
    characterIds: new Set(),
    hair: new Set(),
    beard: new Set(),
    hairColor: new Set(),
    voiceasset: new Set(),
    itemClasses: new Set(),
    skillKeys: new Set(),
    perks: new Set(),
  };
}

function addCatalogValue(map, key, value) {
  if (value === undefined || value === null) return;
  const stringValue = String(value);
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(stringValue);
}

function collectCatalogScalars(fileName, value, path, catalog) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectCatalogScalars(fileName, item, [...path, index], catalog));
    return;
  }
  if (typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      collectCatalogScalars(fileName, item, [...path, key], catalog);
    });
    return;
  }

  const key = path[path.length - 1];
  if (typeof key === "string") {
    addCatalogValue(catalog.byKey, key, value);
    addCatalogValue(catalog.byField, `${fileName}:${pathToLabel(path)}`, value);
  }
}

function buildValueCatalog(jsonEntries) {
  const catalog = createEmptyCatalog();
  jsonEntries.forEach((root, fileName) => {
    collectCatalogScalars(fileName, root, [], catalog);
    if (fileName === "save.dat") {
      Object.keys(root.stats?.skills || {}).forEach((key) => catalog.skillKeys.add(key));
      (root.stats?.perks || []).forEach((perk) => catalog.perks.add(perk));
    }
    if (fileName === "player.dat" && Array.isArray(root)) {
      root.forEach((player) => {
        if (!player || typeof player !== "object") return;
        if (player.proto) catalog.protoIds.add(player.proto);
        if (player.behavior) catalog.behaviorIds.add(player.behavior);
        if (player.fraction) catalog.fractionIds.add(player.fraction);
        if (player.character) catalog.characterIds.add(player.character);
        if (player.hair) catalog.hair.add(player.hair);
        if (player.beard) catalog.beard.add(player.beard);
        if (player.hairColor) catalog.hairColor.add(player.hairColor);
        if (player.voiceasset) catalog.voiceasset.add(player.voiceasset);
        (player.inventory || []).forEach((item) => {
          if (!item || typeof item !== "object") return;
          if (item.proto) catalog.protoIds.add(item.proto);
          if (item.class) catalog.itemClasses.add(item.class);
        });
      });
    }
    if (fileName === "entities.dat" && root && typeof root === "object") {
      Object.entries(root).forEach(([levelId, entities]) => {
        catalog.levelIds.add(levelId);
        if (!entities || typeof entities !== "object") return;
        Object.values(entities).forEach((entity) => {
          if (!entity || typeof entity !== "object") return;
          if (entity.proto) catalog.protoIds.add(entity.proto);
          if (entity.behavior) catalog.behaviorIds.add(entity.behavior);
          if (entity.fraction) catalog.fractionIds.add(entity.fraction);
          if (entity.character) catalog.characterIds.add(entity.character);
          if (entity.hair) catalog.hair.add(entity.hair);
          if (entity.beard) catalog.beard.add(entity.beard);
          if (entity.hairColor) catalog.hairColor.add(entity.hairColor);
          if (entity.voiceasset) catalog.voiceasset.add(entity.voiceasset);
          if (entity.class) catalog.itemClasses.add(entity.class);
        });
      });
    }
    if (fileName === "info.dat" && root && typeof root === "object") {
      Object.values(root).forEach((logic) => {
        if (logic?.levelId) catalog.levelIds.add(logic.levelId);
      });
    }
  });
  return catalog;
}

function setStatus(message, kind = "", codeOverride = "") {
  const codeMap = {
    "": "IDLE",
    loading: "SCANNING",
    good: "READY",
    warn: "WARNING",
    error: "ERROR",
  };
  const code = codeOverride || codeMap[kind] || "STATUS";
  statusEl.className = kind ? `status status-main ${kind}` : "status status-main";
  statusEl.replaceChildren();
  const codeEl = document.createElement("span");
  codeEl.className = "status-code";
  codeEl.textContent = code;
  const messageEl = document.createElement("span");
  messageEl.className = "status-text";
  messageEl.textContent = message;
  statusEl.appendChild(codeEl);
  statusEl.appendChild(messageEl);
}

function isJsonEditable(name) {
  return name.endsWith(".dat") || name.endsWith(".pins") || name.endsWith(".wmap");
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(2)} ${units[index]}`;
}

function decodeUtf8(bytes) {
  return utf8Decoder.decode(bytes);
}

function encodeUtf8(text) {
  return utf8Encoder.encode(text);
}

function readUtf16LE(view, offset, length) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += String.fromCharCode(view.getUint16(offset + i * 2, true));
  }
  return out;
}

async function gunzip(buffer) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("DecompressionStream not available. Use a Chromium-based browser.");
  }
  const stream = new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).arrayBuffer();
}

async function gzip(buffer) {
  if (typeof CompressionStream === "undefined") {
    throw new Error("CompressionStream not available. Use a Chromium-based browser.");
  }
  const stream = new Blob([buffer]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Response(stream).arrayBuffer();
}

function crc32(bytes) {
  let crc = 0 ^ -1;
  for (let i = 0; i < bytes.length; i += 1) {
    let c = (crc ^ bytes[i]) & 0xff;
    for (let bit = 0; bit < 8; bit += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ -1) >>> 0;
}

function parseArchiveEntries(buffer) {
  const view = new DataView(buffer);
  const entries = [];
  let offset = 0;
  while (offset + 4 <= view.byteLength) {
    const nameLength = view.getUint32(offset, true);
    offset += 4;
    if (!nameLength) break;
    const nameBytes = nameLength * 2;
    if (offset + nameBytes + 4 > view.byteLength) break;
    const name = readUtf16LE(view, offset, nameLength);
    offset += nameBytes;
    const dataLength = view.getUint32(offset, true);
    offset += 4;
    if (offset + dataLength > view.byteLength) break;
    const data = new Uint8Array(buffer, offset, dataLength);
    offset += dataLength;
    entries.push({ name, path: name, data: new Uint8Array(data) });
  }
  return entries;
}

function parseJsonEntry(entry, errors) {
  try {
    return JSON.parse(decodeUtf8(entry.data));
  } catch (error) {
    errors.set(entry.name, `${entry.name} failed JSON parse: ${error.message}`);
    return null;
  }
}

function countFowBytes(data) {
  let zero = 0;
  let ff = 0;
  let other = 0;
  for (let i = 0; i < data.length; i += 1) {
    const value = data[i];
    if (value === 0) zero += 1;
    else if (value === 255) ff += 1;
    else other += 1;
  }
  return { zero, ff, other };
}

function parseFow(entry) {
  if (entry.data.byteLength < 8) {
    return { name: entry.name, error: "Invalid FOW header" };
  }
  const view = new DataView(entry.data.buffer, entry.data.byteOffset, entry.data.byteLength);
  const width = view.getUint32(0, true);
  const height = view.getUint32(4, true);
  const data = entry.data.subarray(8);
  return {
    name: entry.name,
    width,
    height,
    data,
    expected: width * height,
    counts: countFowBytes(data),
    previewCanvas: null,
    previewW: 0,
    previewH: 0,
    previewScale: 1,
    error: data.length !== width * height ? "Header size mismatch" : null,
  };
}

function parseDecals(entry) {
  if (entry.data.byteLength < 8) {
    return { name: entry.name, error: "Invalid decals header" };
  }
  const view = new DataView(entry.data.buffer, entry.data.byteOffset, entry.data.byteLength);
  const version = view.getUint32(0, true);
  const sectionCount = view.getUint32(4, true);
  const sections = [];
  let offset = 8;
  let lengthOk = true;
  for (let i = 0; i < sectionCount; i += 1) {
    if (offset + 8 > entry.data.byteLength) {
      lengthOk = false;
      break;
    }
    const type = view.getUint32(offset, true);
    const count = view.getUint32(offset + 4, true);
    offset += 8;
    const bytes = count * 64;
    if (offset + bytes > entry.data.byteLength) {
      lengthOk = false;
      break;
    }
    offset += bytes;
    sections.push({ type, count });
  }
  if (offset !== entry.data.byteLength) {
    lengthOk = false;
  }
  return { name: entry.name, version, sectionCount, sections, lengthOk, error: null };
}

function createEntrySnapshot(entry) {
  return {
    name: entry.name,
    path: entry.path,
    data: new Uint8Array(entry.data),
    originalCrc: crc32(entry.data),
    modified: false,
  };
}

function getEditableRecordNames(target = state) {
  return target.order.filter((name) => target.jsonEntries.has(name));
}

function normalizeEntries(entries, meta) {
  const next = createEmptyState();
  next.sourceType = meta.sourceType;
  next.sourceName = meta.sourceName;
  next.decalsMode = state.decalsMode;

  const ordered = meta.sourceType === "progress"
    ? entries.slice().sort((a, b) => a.name.localeCompare(b.name))
    : entries.slice();

  ordered.forEach((entry) => {
    const snapshot = createEntrySnapshot(entry);
    next.order.push(snapshot.name);
    next.entries.set(snapshot.name, snapshot);
    next.originalEntries.set(snapshot.name, {
      name: snapshot.name,
      path: snapshot.path,
      data: new Uint8Array(snapshot.data),
    });
  });

  next.order.forEach((name) => {
    const entry = next.entries.get(name);
    if (!entry) return;
    if (isJsonEditable(name)) {
      const parsed = parseJsonEntry(entry, next.parseErrors);
      if (parsed !== null) next.jsonEntries.set(name, parsed);
    }
    if (name.endsWith(".fow")) next.fow.set(name, parseFow(entry));
    if (name.endsWith(".decals")) next.decals.set(name, parseDecals(entry));
  });

  next.catalog = buildValueCatalog(next.jsonEntries);

  const editable = getEditableRecordNames(next);
  const preferred = RECORD_SELECTION_PREFERENCE.find((name) => editable.includes(name));
  next.selectedRecord = editable.includes(state.selectedRecord)
    ? state.selectedRecord
    : (preferred || editable[0] || null);
  return next;
}

function getEntry(name) {
  return state.entries.get(name) || null;
}

function getJsonRoot(name) {
  return state.jsonEntries.get(name) || null;
}

function refreshEntryClassification(name) {
  const entry = getEntry(name);
  if (!entry) return;

  state.parseErrors.delete(name);
  if (isJsonEditable(name)) {
    const parsed = parseJsonEntry(entry, state.parseErrors);
    if (parsed !== null) state.jsonEntries.set(name, parsed);
    else state.jsonEntries.delete(name);
  }

  if (name.endsWith(".fow")) state.fow.set(name, parseFow(entry));
  if (name.endsWith(".decals")) state.decals.set(name, parseDecals(entry));
  state.catalog = buildValueCatalog(state.jsonEntries);
}

function markEntryModified(name) {
  const entry = getEntry(name);
  if (!entry) return;
  entry.modified = crc32(entry.data) !== entry.originalCrc;
}

function serializeJsonRoot(name) {
  const entry = getEntry(name);
  const root = getJsonRoot(name);
  if (!entry) return;
  entry.data = encodeUtf8(JSON.stringify(root));
  markEntryModified(name);
  refreshEntryClassification(name);
}

function setJsonRoot(name, value) {
  state.jsonEntries.set(name, value);
  serializeJsonRoot(name);
  state.catalog = buildValueCatalog(state.jsonEntries);
  rebuildWarnings();
  renderAll();
}

function getValueAtPath(root, path) {
  let current = root;
  for (let i = 0; i < path.length; i += 1) {
    current = current[path[i]];
  }
  return current;
}

function setValueAtPath(root, path, value) {
  if (!path.length) return value;
  let current = root;
  for (let i = 0; i < path.length - 1; i += 1) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
  return root;
}

function pathToLabel(path) {
  if (!path.length) return "(root)";
  return path.map((part) => (typeof part === "number" ? `[${part}]` : part)).join(".").replace(/\.\[/g, "[");
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function looksBooleanString(value) {
  return typeof value === "string" && /^(true|false)$/i.test(value);
}

function looksNumericString(value) {
  return typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim());
}

function uniqueSorted(values) {
  return Array.from(values).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function getObservedValues(fileName, path, key) {
  const values = new Set();
  const fieldPath = `${fileName}:${pathToLabel(path)}`;
  if (state.catalog?.byField?.has(fieldPath)) {
    state.catalog.byField.get(fieldPath).forEach((value) => values.add(value));
  }
  if (key && state.catalog?.byKey?.has(key)) {
    state.catalog.byKey.get(key).forEach((value) => values.add(value));
  }
  return uniqueSorted(values);
}

function getRangeSpec(fileName, path, currentValue) {
  const key = path[path.length - 1];
  if (!looksNumericString(currentValue)) return {};
  if (path.includes("skills")) {
    return { min: 0, max: 200, step: "1", note: "Official March 10, 2026 patch notes state the maximum skill value is 200." };
  }
  if (ATTRIBUTE_KEYS.includes(key)) {
    return { min: 1, step: "1", note: ATTRIBUTE_GUIDE[key] || "Primary attribute stored as a numeric string." };
  }
  if (["freeSkillPoints", "freeStatPoints", "freeSpecPoints", "xp", "level", "battleExp", "caps", "ap", "damage", "relationship", "quickpanelmainindex"].includes(key)) {
    return { min: 0, step: "1" };
  }
  if (["worldPos_x", "worldPos_y", "constitution_fat", "constitution_height", "constitution_strength"].includes(key)) {
    return { step: "0.01" };
  }
  return { step: "1" };
}

function getFieldDescriptor(fileName, path, currentValue) {
  const key = path[path.length - 1];
  const observed = typeof key === "string" ? getObservedValues(fileName, path, key) : [];
  const descriptor = {
    kind: "text",
    options: [],
    help: [],
    badges: [],
    observed,
    min: undefined,
    max: undefined,
    step: undefined,
  };

  if (typeof key === "string" && FIELD_GUIDE[key]) descriptor.help.push(FIELD_GUIDE[key]);
  const range = getRangeSpec(fileName, path, currentValue);
  if (range.note) descriptor.help.push(range.note);
  if (range.min !== undefined) descriptor.min = range.min;
  if (range.max !== undefined) descriptor.max = range.max;
  if (range.step !== undefined) descriptor.step = range.step;

  if (path.includes("skills") && typeof key === "string" && SKILL_GUIDE[key]) {
    descriptor.help.unshift(SKILL_GUIDE[key]);
  }

  if (looksBooleanString(currentValue)) {
    descriptor.kind = "select";
    descriptor.options = [
      { value: "false", label: "false" },
      { value: "true", label: "true" },
    ];
    descriptor.badges.push("string boolean");
    return descriptor;
  }

  if (typeof currentValue === "boolean") {
    descriptor.kind = "select";
    descriptor.options = [
      { value: "false", label: "false" },
      { value: "true", label: "true" },
    ];
    descriptor.badges.push("boolean");
    return descriptor;
  }

  if (typeof currentValue === "string" && (currentValue.length > 120 || currentValue.includes("\n") || key === "player_bio")) {
    descriptor.kind = "textarea";
    descriptor.badges.push("free text");
    return descriptor;
  }

  if (fileName === "save.dat" && key === "difficult") {
    descriptor.kind = "select";
    descriptor.options = ["0", "1", "2"].map((value) => ({ value, label: value }));
    descriptor.help.push("Community posts refer to three difficulties and say the setting can be changed during play. Numeric labels remain inferred.");
    descriptor.badges.push("enum");
    return descriptor;
  }

  const exactOptionMap = {
    worldmap_id: state.catalog?.levelIds,
    level: state.catalog?.levelIds,
    hair: state.catalog?.hair,
    beard: state.catalog?.beard,
    hairColor: state.catalog?.hairColor,
    voiceasset: state.catalog?.voiceasset,
    fraction: state.catalog?.fractionIds,
    behavior: state.catalog?.behaviorIds,
    proto: state.catalog?.protoIds,
    character: state.catalog?.characterIds,
    class: state.catalog?.itemClasses,
  };
  const exactOptions = exactOptionMap[key];
  if (exactOptions && exactOptions.size) {
    const values = uniqueSorted(exactOptions);
    descriptor.options = values.map((value) => ({ value, label: value }));
    descriptor.kind = values.length <= 24 ? "select" : "datalist";
    descriptor.badges.push(`observed ${values.length}`);
    return descriptor;
  }

  if (looksNumericString(currentValue)) {
    descriptor.kind = "number";
    descriptor.badges.push("numeric string");
    if (descriptor.max !== undefined) descriptor.badges.push(`max ${descriptor.max}`);
    return descriptor;
  }

  if (observed.length > 1 && observed.length <= 18 && observed.every((value) => value.length <= 80)) {
    descriptor.kind = "select";
    descriptor.options = observed.map((value) => ({ value, label: value }));
    descriptor.badges.push(`observed ${observed.length}`);
    return descriptor;
  }

  if (observed.length > 1 && observed.length <= 80 && observed.every((value) => value.length <= 120)) {
    descriptor.kind = "datalist";
    descriptor.options = observed.map((value) => ({ value, label: value }));
    descriptor.badges.push(`observed ${observed.length}`);
    return descriptor;
  }

  return descriptor;
}

let editorControlId = 0;

function castEditorValue(rawValue, currentValue) {
  if (typeof currentValue === "number") return Number(rawValue);
  if (typeof currentValue === "boolean") return rawValue === "true";
  if (currentValue === null && rawValue === "") return null;
  return rawValue;
}

function createRichScalarEditor(fileName, path, currentValue, onCommit) {
  const descriptor = getFieldDescriptor(fileName, path, currentValue);
  if (descriptor.options.length && !descriptor.options.some((option) => option.value === String(currentValue ?? ""))) {
    descriptor.options.unshift({ value: String(currentValue ?? ""), label: String(currentValue ?? "") });
  }
  const wrapper = document.createElement("div");
  wrapper.className = "contextual-editor";

  let control;
  if (descriptor.kind === "select") {
    control = document.createElement("select");
    descriptor.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      control.appendChild(opt);
    });
    control.value = String(currentValue ?? "");
  } else if (descriptor.kind === "textarea") {
    control = document.createElement("textarea");
    control.value = currentValue ?? "";
  } else {
    control = document.createElement("input");
    if (descriptor.kind === "number") {
      control.type = "number";
      if (descriptor.min !== undefined) control.min = String(descriptor.min);
      if (descriptor.max !== undefined) control.max = String(descriptor.max);
      if (descriptor.step !== undefined) control.step = descriptor.step;
    } else {
      control.type = "text";
    }
    control.value = currentValue ?? "";
    if (descriptor.kind === "datalist") {
      editorControlId += 1;
      const listId = `editor-list-${editorControlId}`;
      control.setAttribute("list", listId);
      const list = document.createElement("datalist");
      list.id = listId;
      descriptor.options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option.value;
        list.appendChild(opt);
      });
      wrapper.appendChild(list);
    }
  }
  control.addEventListener("change", () => onCommit(castEditorValue(control.value, currentValue)));
  wrapper.appendChild(control);

  if (descriptor.observed.length > 1) {
    const known = document.createElement("div");
    known.className = "known-values";
    known.textContent = "Observed values: ";
    descriptor.observed.slice(0, 6).forEach((value) => {
      const code = document.createElement("code");
      code.textContent = value;
      known.appendChild(code);
    });
    if (descriptor.observed.length > 6) {
      const tail = document.createElement("span");
      tail.textContent = `+${descriptor.observed.length - 6} more`;
      known.appendChild(tail);
    }
    wrapper.appendChild(known);
  }

  if (descriptor.help.length) {
    const help = document.createElement("div");
    help.className = "field-help";
    help.textContent = descriptor.help.join(" ");
    wrapper.appendChild(help);
  }

  return { element: wrapper, descriptor };
}

function findNonStringScalars(value, path = "") {
  const matches = [];
  if (typeof value === "number" || typeof value === "boolean") {
    matches.push(path || "(root)");
    return matches;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      matches.push(...findNonStringScalars(item, `${path}[${index}]`));
    });
    return matches;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      matches.push(...findNonStringScalars(item, path ? `${path}.${key}` : key));
    });
  }
  return matches;
}

function countStatMismatches() {
  const saveStats = getJsonRoot("save.dat")?.stats;
  const playerStats = getJsonRoot("player.dat")?.[0]?.stats;
  if (!saveStats || !playerStats) return 0;
  const keys = new Set([...Object.keys(saveStats), ...Object.keys(playerStats)]);
  let mismatches = 0;
  keys.forEach((key) => {
    if (saveStats[key] !== playerStats[key]) mismatches += 1;
  });
  return mismatches;
}

function rebuildWarnings() {
  const warnings = [...state.parseErrors.values()];
  const mismatchCount = countStatMismatches();
  if (mismatchCount) warnings.push(`Stats mismatch count: ${mismatchCount}`);
  state.fow.forEach((fow, name) => {
    if (fow.error) warnings.push(`${name}: ${fow.error}`);
  });
  state.decals.forEach((decals, name) => {
    if (!decals.lengthOk) warnings.push(`${name}: decals length mismatch`);
  });
  state.jsonEntries.forEach((root, name) => {
    const invalid = findNonStringScalars(root);
    if (invalid.length) warnings.push(`${name}: non-string scalar at ${invalid[0]}`);
  });
  state.warnings = warnings;
}

function modifiedEntries() {
  return state.order.filter((name) => getEntry(name)?.modified);
}

function renderMetrics() {
  summaryStrip.textContent = state.sourceType
    ? `${state.sourceType.toUpperCase()} · ${state.sourceName}  |  Editable ${getEditableRecordNames().length}  |  Modified ${modifiedEntries().length}  |  FOW ${state.fow.size}  |  Decals ${state.decals.size}`
    : "No save loaded.";
  exportBtn.disabled = !state.sourceType;
  exportBtn.textContent = modifiedEntries().length
    ? `Export Edited Save (${modifiedEntries().length})`
    : "Export Edited Save";
  revertAllBtn.disabled = modifiedEntries().length === 0;
  savePathHint.textContent = `${DEFAULT_SAVE_PATH}  |  Live working folder: Progress  |  Archive slots: Save_*.as`;
}

function renderWarnings() {
  if (!state.warnings.length) {
    warningCount.textContent = "No warnings.";
    warningCount.className = "status inline-status";
    return;
  }
  const critical = state.warnings.some((warning) =>
    !warning.startsWith("Stats mismatch count:")
  );
  warningCount.textContent = `${critical ? "Warnings" : "Advisory"}: ${state.warnings[0]}`;
  warningCount.className = critical ? "status inline-status error" : "status inline-status";
}

function renderModifiedPills() {
  modifiedList.innerHTML = "";
  modifiedEntries().forEach((name) => {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = name;
    modifiedList.appendChild(pill);
  });
}

function renderEntryList() {
  entryList.innerHTML = "";
  state.order.forEach((name) => {
    const entry = getEntry(name);
    if (!entry) return;
    const row = document.createElement("div");
    row.className = "simple-item";
    const label = document.createElement("div");
    label.textContent = name;
    const meta = document.createElement("div");
    meta.className = "simple-meta";
    meta.textContent = formatBytes(entry.data.byteLength);
    row.appendChild(label);
    row.appendChild(meta);
    entryList.appendChild(row);
  });
}

function summarizeRecord(name) {
  const value = getJsonRoot(name);
  if (Array.isArray(value)) return `${value.length}`;
  if (value && typeof value === "object") return `${Object.keys(value).length}`;
  return "1";
}

function renderRecordList() {
  const query = recordFilter.value.trim().toLowerCase();
  const names = getEditableRecordNames().filter((name) => name.toLowerCase().includes(query));
  quickAccessBar.innerHTML = "";

  const shortcuts = [
    { label: "Quests", fileName: "save.dat", mode: "quest" },
    { label: "Entities", fileName: "entities.dat", mode: "entities" },
    { label: "World Map", fileName: "WorldMap.wmap", mode: "worldmap" },
    { label: "Highlights", fileName: "dh.dat", mode: "dh" },
    { label: "Blueprints", fileName: "info.dat", mode: "info" },
  ].filter((item) => state.jsonEntries.has(item.fileName));

  shortcuts.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `record-item${state.selectedRecord === item.fileName && ui.recordMode === item.mode ? " active" : ""}`;
    row.addEventListener("click", () => {
      state.selectedRecord = item.fileName;
      ui.recordMode = item.mode;
      ui.activeView = "records";
      ui.rawLoadedFor = null;
      renderAll();
    });
    row.innerHTML = `<div><div>${item.label}</div><div class="record-meta">${item.fileName}</div></div>`;
    quickAccessBar.appendChild(row);
  });

  names.forEach((name) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `record-item${state.selectedRecord === name ? " active" : ""}`;
    row.addEventListener("click", () => {
      state.selectedRecord = name;
      ui.rawLoadedFor = null;
      if (name === "save.dat") {
        ui.recordMode = "quest";
        ui.activeView = "records";
      } else if (name === "entities.dat") {
        ui.recordMode = "entities";
        ui.activeView = "records";
      } else if (name === "WorldMap.wmap" || name.endsWith(".pins")) {
        ui.recordMode = "worldmap";
        ui.activeView = "records";
      } else if (name === "dh.dat") {
        ui.recordMode = "dh";
        ui.activeView = "records";
      } else if (name === "info.dat") {
        ui.recordMode = "info";
        ui.activeView = "records";
      } else if (name === "player.dat") {
        ui.recordMode = "auto";
        ui.activeView = "core";
      } else if (name.endsWith(".fow") || name.endsWith(".decals")) {
        ui.recordMode = "auto";
        ui.activeView = "maps";
      } else {
        ui.recordMode = "auto";
        ui.activeView = "records";
      }
      renderAll();
    });

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.textContent = name;
    const meta = document.createElement("div");
    meta.className = "record-meta";
    meta.textContent = getEntry(name)?.modified ? "Modified" : "Clean";
    left.appendChild(title);
    left.appendChild(meta);

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = summarizeRecord(name);

    row.appendChild(left);
    row.appendChild(badge);
    quickAccessBar.appendChild(row);
  });
}

function renderViewTabs() {
  const buttons = Array.from(viewTabs.querySelectorAll("button"));
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === ui.activeView);
  });
  coreView.classList.toggle("active", ui.activeView === "core");
  recordsView.classList.toggle("active", ui.activeView === "records");
  mapsView.classList.toggle("active", ui.activeView === "maps");
}

function renderScalarFieldGrid(container, fileName, root, preferredKeys, basePath = []) {
  container.innerHTML = "";
  if (!root || typeof root !== "object") {
    container.textContent = "No data loaded.";
    return;
  }

  const scalarKeys = Object.keys(root).filter((key) => {
    const value = root[key];
    return value === null || typeof value !== "object";
  });

  const ordered = [];
  preferredKeys.forEach((key) => {
    if (scalarKeys.includes(key)) ordered.push(key);
  });
  scalarKeys.sort().forEach((key) => {
    if (!ordered.includes(key)) ordered.push(key);
  });

  ordered.forEach((key) => {
    const card = document.createElement("div");
    card.className = `field-card${String(root[key]).length > 70 ? " full" : ""}`;
    const current = root[key];
    const head = document.createElement("div");
    head.className = "field-card-head";
    const labelBlock = document.createElement("div");
    labelBlock.className = "field-card-label";
    const title = document.createElement("div");
    title.className = "field-card-title";
    title.textContent = key;
    const name = document.createElement("div");
    name.className = "field-card-name";
    name.textContent = key.replace(/_/g, " ");
    labelBlock.appendChild(title);
    labelBlock.appendChild(name);
    head.appendChild(labelBlock);

    const { element, descriptor } = createRichScalarEditor(fileName, [...basePath, key], current, (nextValue) => {
      const fileRoot = getJsonRoot(fileName);
      if (!fileRoot) return;
      setValueAtPath(fileRoot, [...basePath, key], nextValue);
      setJsonRoot(fileName, fileRoot);
    });

    if (descriptor.badges.length) {
      const badgeRow = document.createElement("div");
      badgeRow.className = "badge-row";
      descriptor.badges.forEach((badgeText) => {
        const badge = document.createElement("span");
        badge.className = "badge subtle";
        badge.textContent = badgeText;
        badgeRow.appendChild(badge);
      });
      head.appendChild(badgeRow);
    }

    card.appendChild(head);
    card.appendChild(element);
    container.appendChild(card);
  });
}

function collectStats() {
  const saveStats = getJsonRoot("save.dat")?.stats || null;
  const playerStats = getJsonRoot("player.dat")?.[0]?.stats || null;
  const keys = new Set();
  if (saveStats) Object.keys(saveStats).forEach((key) => keys.add(key));
  if (playerStats) Object.keys(playerStats).forEach((key) => keys.add(key));
  return { saveStats, playerStats, keys: Array.from(keys).sort() };
}

function createStatInput(currentValue, { min = 0, max, step = "1" } = {}, onCommit) {
  const input = document.createElement("input");
  input.type = "number";
  input.value = currentValue ?? "";
  input.min = String(min);
  input.step = step;
  if (max !== undefined) input.max = String(max);
  input.addEventListener("change", () => onCommit(input.value));
  return input;
}

function renderStats() {
  statsTable.innerHTML = "";
  const { saveStats, playerStats, keys } = collectStats();
  if (!saveStats && !playerStats) {
    statsMeta.textContent = "Stats not available.";
    return;
  }

  const filter = statsFilter.value.trim().toLowerCase();
  const mismatchOnly = statsMismatchToggle.checked;
  let mismatchCount = 0;
  const syncStatsField = (target, key, value, isSkill = false) => {
    if (target === "save" && saveStats) {
      if (isSkill) saveStats.skills[key] = value;
      else saveStats[key] = value;
      if (statsSyncToggle.checked && playerStats) {
        if (isSkill) playerStats.skills[key] = value;
        else playerStats[key] = value;
      }
      setJsonRoot("save.dat", getJsonRoot("save.dat"));
      if (playerStats) setJsonRoot("player.dat", getJsonRoot("player.dat"));
      return;
    }
    if (target === "player" && playerStats) {
      if (isSkill) playerStats.skills[key] = value;
      else playerStats[key] = value;
      if (statsSyncToggle.checked && saveStats) {
        if (isSkill) saveStats.skills[key] = value;
        else saveStats[key] = value;
      }
      setJsonRoot("player.dat", getJsonRoot("player.dat"));
      if (saveStats) setJsonRoot("save.dat", getJsonRoot("save.dat"));
    }
  };

  const renderCardSection = (titleText, keysToRender, hintLookup = {}) => {
    const section = document.createElement("section");
    section.className = "stats-section";
    const title = document.createElement("h3");
    title.textContent = titleText;
    section.appendChild(title);
    const grid = document.createElement("div");
    grid.className = "stats-card-grid";
    keysToRender.forEach((key) => {
      const saveValue = saveStats ? saveStats[key] : "";
      const playerValue = playerStats ? playerStats[key] : "";
      const mismatch = saveValue !== playerValue;
      if (mismatch) mismatchCount += 1;
      if (mismatchOnly && !mismatch) return;
      if (filter && !key.toLowerCase().includes(filter)) return;

      const card = document.createElement("div");
      card.className = `stat-card${mismatch ? " mismatch" : ""}`;
      const head = document.createElement("div");
      head.className = "field-card-head";
      const copy = document.createElement("div");
      copy.className = "stat-copy";
      const name = document.createElement("div");
      name.className = "stat-title";
      name.textContent = key;
      const hint = document.createElement("div");
      hint.className = "stat-hint";
      hint.textContent = hintLookup[key] || FIELD_GUIDE[key] || "Stored as a numeric string.";
      copy.appendChild(name);
      copy.appendChild(hint);
      head.appendChild(copy);
      card.appendChild(head);

      const inputs = document.createElement("div");
      inputs.className = "stat-card-inputs";
      const saveInput = createStatInput(saveValue, { min: 0 }, (value) => syncStatsField("save", key, value));
      const playerInput = createStatInput(playerValue, { min: 0 }, (value) => syncStatsField("player", key, value));
      saveInput.disabled = !saveStats;
      playerInput.disabled = !playerStats;
      inputs.appendChild(saveInput);
      inputs.appendChild(playerInput);
      card.appendChild(inputs);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    statsTable.appendChild(section);
  };

  renderCardSection("Attributes", ATTRIBUTE_KEYS, ATTRIBUTE_GUIDE);
  renderCardSection("Progress Pools", ["level", "xp", "freeStatPoints", "freeSkillPoints", "freeSpecPoints"]);

  const section = document.createElement("section");
  section.className = "stats-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Skills";
  section.appendChild(sectionTitle);

  const skillKeys = uniqueSorted(new Set([
    ...Object.keys(saveStats?.skills || {}),
    ...Object.keys(playerStats?.skills || {}),
  ]));
  let shownCount = 0;

  skillKeys.forEach((key) => {
    const saveValue = saveStats?.skills?.[key] ?? "";
    const playerValue = playerStats?.skills?.[key] ?? "";
    const mismatch = saveValue !== playerValue;
    if (mismatch) mismatchCount += 1;
    if (mismatchOnly && !mismatch) return;
    if (filter && !key.toLowerCase().includes(filter)) return;
    shownCount += 1;

    const row = document.createElement("div");
    row.className = `stats-row${mismatch ? " mismatch" : ""}`;

    const label = document.createElement("div");
    label.className = "stat-copy";
    const name = document.createElement("div");
    name.className = "stat-title";
    name.textContent = key;
    const hint = document.createElement("div");
    hint.className = "stat-hint";
    hint.textContent = SKILL_GUIDE[key] || "Skill stored as a numeric string.";
    label.appendChild(name);
    label.appendChild(hint);

    const saveInput = createStatInput(saveValue, { min: 0, max: 200 }, (value) => syncStatsField("save", key, value, true));
    saveInput.disabled = !saveStats;
    const playerInput = createStatInput(playerValue, { min: 0, max: 200 }, (value) => syncStatsField("player", key, value, true));
    playerInput.disabled = !playerStats;

    const milestones = document.createElement("div");
    milestones.className = "milestone-row";
    const current = Math.max(Number(saveValue || 0), Number(playerValue || 0));
    SKILL_MILESTONES.forEach((milestoneValue) => {
      const chip = document.createElement("span");
      chip.className = `milestone${current >= milestoneValue ? " hit" : ""}`;
      chip.textContent = milestoneValue === 200 ? "cap 200" : milestoneValue;
      milestones.appendChild(chip);
    });

    row.appendChild(label);
    row.appendChild(saveInput);
    row.appendChild(playerInput);
    row.appendChild(milestones);
    section.appendChild(row);
  });
  statsTable.appendChild(section);

  statsMeta.textContent = `Attributes and pools mirror into save.dat and player.dat. Skills show official cap 200 and observed perk tiers 50/75/100/150/199. Visible skill rows: ${shownCount}. Mismatches: ${mismatchCount}.`;
}

function searchMatchesNode(label, value, query) {
  if (!query) return true;
  if (String(label).toLowerCase().includes(query)) return true;

  if (value === null) return "null".includes(query);
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value).toLowerCase().includes(query);
  }

  if (Array.isArray(value)) {
    return value.some((item, index) => searchMatchesNode(index, item, query));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).some(([key, item]) => searchMatchesNode(key, item, query));
  }

  return false;
}

function createTreeMeta(value) {
  const meta = document.createElement("div");
  meta.className = "tree-meta";
  const badge = document.createElement("span");
  badge.className = "tree-badge";

  if (Array.isArray(value)) badge.textContent = `array · ${value.length}`;
  else if (value && typeof value === "object") badge.textContent = `object · ${Object.keys(value).length}`;
  else if (value === null) badge.textContent = "null";
  else badge.textContent = typeof value;

  meta.appendChild(badge);
  return meta;
}

function createScalarEditor(fileName, path, currentValue, onCommit) {
  return createRichScalarEditor(fileName, path, currentValue, onCommit).element;
}

function onChangeAtPath(fileName, path, nextValue) {
  const root = getJsonRoot(fileName);
  if (!root) return;
  setValueAtPath(root, path, nextValue);
  setJsonRoot(fileName, root);
}

function renderTreeNode(container, value, options) {
  const { fileName, label, path, query, depth, onChange } = options;
  if (!searchMatchesNode(label, value, query)) return;

  if (value === null || typeof value !== "object") {
    const row = document.createElement("div");
    row.className = "tree-row";

    const header = document.createElement("div");
    header.className = "tree-row-header";
    const key = document.createElement("div");
    key.className = "tree-key";
    key.textContent = label;
    const pathEl = document.createElement("div");
    pathEl.className = "tree-path";
    pathEl.textContent = `${fileName} · ${pathToLabel(path)}`;
    header.appendChild(key);
    header.appendChild(pathEl);

    row.appendChild(header);
    row.appendChild(createTreeMeta(value));
    row.appendChild(createScalarEditor(fileName, path, value, onChange));
    container.appendChild(row);
    return;
  }

  const details = document.createElement("details");
  details.className = "tree-group";
  details.open = depth < 1 || Boolean(query);

  const summary = document.createElement("summary");
  const key = document.createElement("div");
  key.className = "tree-key";
  key.textContent = label;
  summary.appendChild(key);
  summary.appendChild(createTreeMeta(value));
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "tree-group-body";
  details.appendChild(body);

  const renderChildren = () => {
    body.innerHTML = "";
    const entries = Array.isArray(value)
      ? value.map((item, index) => [index, item])
      : Object.entries(value);

    entries.forEach(([childKey, childValue]) => {
      renderTreeNode(body, childValue, {
        fileName,
        label: String(childKey),
        path: [...path, childKey],
        query,
        depth: depth + 1,
        onChange: (next) => onChangeAtPath(fileName, [...path, childKey], next),
      });
    });
  };

  if (details.open) renderChildren();
  details.addEventListener("toggle", () => {
    if (details.open && !body.childElementCount) renderChildren();
  });

  container.appendChild(details);
}

function renderTree(container, fileName, value, query, basePath = []) {
  container.innerHTML = "";
  if (value === undefined || value === null) {
    container.textContent = "No data available.";
    return;
  }
  renderTreeNode(container, value, {
    fileName,
    label: "(root)",
    path: basePath,
    query: query.trim().toLowerCase(),
    depth: 0,
    onChange: (next) => {
      const fileRoot = getJsonRoot(fileName);
      if (basePath.length === 0) {
        setJsonRoot(fileName, next);
        return;
      }
      if (!fileRoot) return;
      setValueAtPath(fileRoot, basePath, next);
      setJsonRoot(fileName, fileRoot);
    },
  });
}

function loadRawEditor(force = false) {
  const name = state.selectedRecord;
  const entry = name ? getEntry(name) : null;
  if (!entry) {
    rawJsonArea.value = "";
    rawStatus.textContent = "";
    ui.rawLoadedFor = null;
    return;
  }
  if (!force && ui.rawLoadedFor === name) return;
  rawJsonArea.value = decodeUtf8(entry.data);
  rawStatus.textContent = "";
  ui.rawLoadedFor = name;
}

function createInspectorSection(title, subtitle = "") {
  const section = document.createElement("section");
  section.className = "record-section";
  const head = document.createElement("div");
  head.className = "surface-head compact";
  const copy = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = title;
  copy.appendChild(h3);
  if (subtitle) {
    const meta = document.createElement("div");
    meta.className = "subtle-text";
    meta.textContent = subtitle;
    copy.appendChild(meta);
  }
  head.appendChild(copy);
  section.appendChild(head);
  return section;
}

function renderQuestRecord() {
  const saveRoot = getJsonRoot("save.dat");
  const quests = saveRoot?.quest || {};
  const query = recordSearch.value.trim().toLowerCase();
  const rows = Object.entries(quests).filter(([questId, questState]) =>
    !query || questId.toLowerCase().includes(query) || JSON.stringify(questState).toLowerCase().includes(query)
  );

  recordTitle.textContent = "Quest State";
  recordSubtitle.textContent = `${rows.length} quest entries`;
  recordInspector.innerHTML = "";

  if (!rows.length) {
    recordInspector.textContent = "No quest entries match the current filter.";
    return;
  }

  const section = document.createElement("section");
  section.className = "quest-list";

  rows.forEach(([questId, questState]) => {
    const row = document.createElement("div");
    row.className = "quest-record";

    const copy = document.createElement("div");
    copy.className = "quest-copy";
    const title = document.createElement("div");
    title.className = "stat-title";
    title.textContent = questId;
    const meta = document.createElement("div");
    meta.className = "stat-hint";
    meta.textContent = "Edit quest state and timestamps directly.";
    copy.appendChild(title);
    copy.appendChild(meta);
    row.appendChild(copy);

    Object.keys(questState).sort().forEach((key) => {
      const card = document.createElement("div");
      card.className = "field-card";
      const label = document.createElement("div");
      label.className = "field-card-title";
      label.textContent = key;
      card.appendChild(label);
      const editor = createRichScalarEditor("save.dat", ["quest", questId, key], questState[key], (next) => {
        const root = getJsonRoot("save.dat");
        if (!root?.quest?.[questId]) return;
        root.quest[questId][key] = next;
        setJsonRoot("save.dat", root);
      });
      card.appendChild(editor.element);
      row.appendChild(card);
    });

    section.appendChild(row);
  });

  recordInspector.appendChild(section);
}

function renderWorldMapRecord() {
  const worldRoot = getJsonRoot("WorldMap.wmap");
  const worldKey = worldRoot ? Object.keys(worldRoot)[0] : null;
  const locations = worldKey ? (worldRoot[worldKey]?.locations || {}) : {};
  const pinFiles = getEditableRecordNames().filter((name) => name.endsWith(".pins")).sort();
  if (!pinFiles.includes(ui.worldPinsFile)) ui.worldPinsFile = pinFiles[0] || "";
  const pins = ui.worldPinsFile ? (getJsonRoot(ui.worldPinsFile) || []) : [];
  const query = recordSearch.value.trim().toLowerCase();

  recordTitle.textContent = "World Map";
  recordSubtitle.textContent = `${Object.keys(locations).length} locations · ${pins.length} pins`;
  recordInspector.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "record-workspace";

  const unlocks = createInspectorSection("Unlocked Locations", "Toggle discovered world map locations.");
  const unlockList = document.createElement("div");
  unlockList.className = "world-location-list";
  Object.keys(locations).sort().filter((key) => !query || key.toLowerCase().includes(query)).forEach((locationId) => {
    const row = document.createElement("div");
    row.className = "world-location-row";
    const copy = document.createElement("div");
    copy.className = "quest-copy";
    const title = document.createElement("div");
    title.className = "stat-title";
    title.textContent = locationId;
    copy.appendChild(title);
    row.appendChild(copy);
    row.appendChild(createRichScalarEditor("WorldMap.wmap", [worldKey, "locations", locationId], locations[locationId], (next) => {
      const root = getJsonRoot("WorldMap.wmap");
      if (!root?.[worldKey]?.locations) return;
      root[worldKey].locations[locationId] = next;
      setJsonRoot("WorldMap.wmap", root);
    }).element);
    unlockList.appendChild(row);
  });
  unlocks.appendChild(unlockList);
  wrapper.appendChild(unlocks);

  const pinsSection = createInspectorSection("Map Pins", ui.worldPinsFile || "No .pins file loaded");
  const pinsToolbar = document.createElement("div");
  pinsToolbar.className = "record-toolbar";
  const pinSelectField = document.createElement("label");
  pinSelectField.className = "field";
  pinSelectField.innerHTML = "<span>Pin file</span>";
  const pinSelect = document.createElement("select");
  pinFiles.forEach((fileName) => {
    const option = document.createElement("option");
    option.value = fileName;
    option.textContent = fileName;
    pinSelect.appendChild(option);
  });
  pinSelect.value = ui.worldPinsFile;
  pinSelect.addEventListener("change", () => {
    ui.worldPinsFile = pinSelect.value;
    renderRecordEditor();
  });
  pinSelectField.appendChild(pinSelect);
  const addPinBtn = document.createElement("button");
  addPinBtn.textContent = "Add Pin";
  addPinBtn.addEventListener("click", () => {
    if (!ui.worldPinsFile) return;
    const nextPins = getJsonRoot(ui.worldPinsFile) || [];
    nextPins.push({
      Name: "pins.new_pin",
      Position: { x: "0", y: "0" },
      Icon: "0",
      Loc: "true",
    });
    setJsonRoot(ui.worldPinsFile, nextPins);
  });
  pinsToolbar.appendChild(pinSelectField);
  pinsToolbar.appendChild(addPinBtn);
  pinsSection.appendChild(pinsToolbar);

  const pinsList = document.createElement("div");
  pinsList.className = "pins-list";
  pins.forEach((pin, index) => {
    if (query && !JSON.stringify(pin).toLowerCase().includes(query)) return;
    const row = document.createElement("div");
    row.className = "pin-row";

    row.appendChild(createRichScalarEditor(ui.worldPinsFile, [index, "Name"], pin.Name ?? "", (next) => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins[index].Name = next;
      setJsonRoot(ui.worldPinsFile, nextPins);
    }).element);
    row.appendChild(createRichScalarEditor(ui.worldPinsFile, [index, "Position", "x"], pin.Position?.x ?? "0", (next) => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins[index].Position.x = next;
      setJsonRoot(ui.worldPinsFile, nextPins);
    }).element);
    row.appendChild(createRichScalarEditor(ui.worldPinsFile, [index, "Position", "y"], pin.Position?.y ?? "0", (next) => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins[index].Position.y = next;
      setJsonRoot(ui.worldPinsFile, nextPins);
    }).element);
    row.appendChild(createRichScalarEditor(ui.worldPinsFile, [index, "Icon"], pin.Icon ?? "0", (next) => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins[index].Icon = next;
      setJsonRoot(ui.worldPinsFile, nextPins);
    }).element);
    row.appendChild(createRichScalarEditor(ui.worldPinsFile, [index, "Loc"], pin.Loc ?? "true", (next) => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins[index].Loc = next;
      setJsonRoot(ui.worldPinsFile, nextPins);
    }).element);

    const removeBtn = document.createElement("button");
    removeBtn.className = "ghost";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const nextPins = getJsonRoot(ui.worldPinsFile);
      nextPins.splice(index, 1);
      setJsonRoot(ui.worldPinsFile, nextPins);
    });
    row.appendChild(removeBtn);
    pinsList.appendChild(row);
  });
  pinsSection.appendChild(pinsList);
  wrapper.appendChild(pinsSection);

  recordInspector.appendChild(wrapper);
}

function renderDhRecord() {
  const dhRoot = getJsonRoot("dh.dat");
  const db = dhRoot?.textHighlightingDB || {};
  const characters = Object.keys(db).sort();
  if (!characters.includes(ui.dhCharacter)) ui.dhCharacter = characters[0] || "";
  const active = ui.dhCharacter ? (db[ui.dhCharacter] || {}) : {};
  const query = recordSearch.value.trim().toLowerCase();
  const rows = Object.entries(active).filter(([stringId, hash]) =>
    !query || stringId.toLowerCase().includes(query) || String(hash).toLowerCase().includes(query)
  );

  recordTitle.textContent = "Dialogue Highlights";
  recordSubtitle.textContent = `${characters.length} characters · ${rows.length} highlight ids`;
  recordInspector.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "record-workspace";

  const toolbar = document.createElement("div");
  toolbar.className = "record-toolbar";
  const charField = document.createElement("label");
  charField.className = "field";
  charField.innerHTML = "<span>Character</span>";
  const charSelect = document.createElement("select");
  characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character;
    option.textContent = character;
    charSelect.appendChild(option);
  });
  charSelect.value = ui.dhCharacter;
  charSelect.addEventListener("change", () => {
    ui.dhCharacter = charSelect.value;
    renderRecordEditor();
  });
  charField.appendChild(charSelect);
  toolbar.appendChild(charField);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Highlight";
  addBtn.addEventListener("click", () => {
    if (!ui.dhCharacter) return;
    const root = getJsonRoot("dh.dat");
    const target = root.textHighlightingDB[ui.dhCharacter] || {};
    let nextId = 1;
    while (target[String(nextId)] !== undefined) nextId += 1;
    target[String(nextId)] = "0";
    root.textHighlightingDB[ui.dhCharacter] = target;
    setJsonRoot("dh.dat", root);
  });
  toolbar.appendChild(addBtn);
  wrapper.appendChild(toolbar);

  const section = createInspectorSection(ui.dhCharacter || "No character", "String id to highlight-hash mapping.");
  const list = document.createElement("div");
  list.className = "dh-list";
  rows.forEach(([stringId, hash]) => {
    const row = document.createElement("div");
    row.className = "dh-row";
    row.appendChild(createRichScalarEditor("dh.dat", ["textHighlightingDB", ui.dhCharacter, stringId], stringId, (next) => {
      const root = getJsonRoot("dh.dat");
      const bucket = root.textHighlightingDB[ui.dhCharacter];
      const value = bucket[stringId];
      delete bucket[stringId];
      bucket[next] = value;
      setJsonRoot("dh.dat", root);
    }).element);
    row.appendChild(createRichScalarEditor("dh.dat", ["textHighlightingDB", ui.dhCharacter, stringId], hash, (next) => {
      const root = getJsonRoot("dh.dat");
      root.textHighlightingDB[ui.dhCharacter][stringId] = next;
      setJsonRoot("dh.dat", root);
    }).element);
    const removeBtn = document.createElement("button");
    removeBtn.className = "ghost";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const root = getJsonRoot("dh.dat");
      delete root.textHighlightingDB[ui.dhCharacter][stringId];
      setJsonRoot("dh.dat", root);
    });
    row.appendChild(removeBtn);
    list.appendChild(row);
  });
  section.appendChild(list);
  wrapper.appendChild(section);
  recordInspector.appendChild(wrapper);
}

function renderInfoRecord() {
  const infoRoot = getJsonRoot("info.dat") || {};
  const logicKeys = Object.keys(infoRoot).sort();
  if (!logicKeys.includes(ui.infoLogic)) ui.infoLogic = logicKeys[0] || "";
  const query = recordSearch.value.trim().toLowerCase();
  const filteredLogicKeys = logicKeys.filter((logicKey) =>
    !query || logicKey.toLowerCase().includes(query) || JSON.stringify(infoRoot[logicKey]).toLowerCase().includes(query)
  );
  if (!filteredLogicKeys.includes(ui.infoLogic)) ui.infoLogic = filteredLogicKeys[0] || "";
  const current = ui.infoLogic ? infoRoot[ui.infoLogic] : null;

  recordTitle.textContent = "Level Blueprints";
  recordSubtitle.textContent = `${logicKeys.length} logic entries`;
  recordInspector.innerHTML = "";

  const workspace = document.createElement("div");
  workspace.className = "entity-workspace";

  const list = document.createElement("div");
  list.className = "entity-list";
  filteredLogicKeys.forEach((logicKey) => {
    const item = infoRoot[logicKey];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `record-item${ui.infoLogic === logicKey ? " active" : ""}`;
    button.addEventListener("click", () => {
      ui.infoLogic = logicKey;
      renderRecordEditor();
    });
    button.innerHTML = `<div><div>${logicKey}</div><div class="record-meta">${item.levelId} · ${item.initialList?.length || 0} entries</div></div>`;
    list.appendChild(button);
  });
  workspace.appendChild(list);

  const details = document.createElement("div");
  details.className = "record-workspace";
  if (!current) {
    details.textContent = "Pick a logic entry.";
  } else {
    const metaSection = createInspectorSection(ui.infoLogic, "Bootstrap blueprint entry from info.dat.");
    const grid = document.createElement("div");
    grid.className = "field-grid";
    metaSection.appendChild(grid);
    renderScalarFieldGrid(grid, "info.dat", current, ["levelId", "levelName"], [ui.infoLogic]);
    details.appendChild(metaSection);

    const initialSection = createInspectorSection("Initial List", `${current.initialList?.length || 0} bootstrap entities`);
    const toolbar = document.createElement("div");
    toolbar.className = "record-toolbar";
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Initial Entry";
    addBtn.addEventListener("click", () => {
      const root = getJsonRoot("info.dat");
      root[ui.infoLogic].initialList = root[ui.infoLogic].initialList || [];
      root[ui.infoLogic].initialList.push("NewEntity");
      setJsonRoot("info.dat", root);
    });
    toolbar.appendChild(addBtn);
    initialSection.appendChild(toolbar);

    const listWrap = document.createElement("div");
    listWrap.className = "initial-list";
    (current.initialList || []).forEach((entryName, index) => {
      if (query && !entryName.toLowerCase().includes(query) && !ui.infoLogic.toLowerCase().includes(query)) return;
      const row = document.createElement("div");
      row.className = "initial-row";
      const indexEl = document.createElement("div");
      indexEl.className = "inventory-index";
      indexEl.textContent = `#${index}`;
      row.appendChild(indexEl);
      row.appendChild(createRichScalarEditor("info.dat", [ui.infoLogic, "initialList", index], entryName, (next) => {
        const root = getJsonRoot("info.dat");
        root[ui.infoLogic].initialList[index] = next;
        setJsonRoot("info.dat", root);
      }).element);
      const removeBtn = document.createElement("button");
      removeBtn.className = "ghost";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        const root = getJsonRoot("info.dat");
        root[ui.infoLogic].initialList.splice(index, 1);
        setJsonRoot("info.dat", root);
      });
      row.appendChild(removeBtn);
      listWrap.appendChild(row);
    });
    initialSection.appendChild(listWrap);
    details.appendChild(initialSection);
  }
  workspace.appendChild(details);
  recordInspector.appendChild(workspace);
}

function renderEntitiesRecord() {
  const entitiesRoot = getJsonRoot("entities.dat");
  const levels = Object.keys(entitiesRoot || {}).sort();
  if (!levels.includes(ui.entityLevel)) ui.entityLevel = levels[0] || "";
  const levelEntities = entitiesRoot?.[ui.entityLevel] || {};
  const classes = uniqueSorted(new Set(Object.values(levelEntities).map((entity) => entity?.class).filter(Boolean)));
  if (ui.entityClass !== "all" && !classes.includes(ui.entityClass)) ui.entityClass = "all";

  const query = recordSearch.value.trim().toLowerCase();
  const matches = Object.entries(levelEntities).filter(([entityName, entity]) => {
    if (!entity) return false;
    if (ui.entityClass !== "all" && entity.class !== ui.entityClass) return false;
    return !query || entityName.toLowerCase().includes(query) || JSON.stringify(entity).toLowerCase().includes(query);
  });
  if (!matches.some(([entityName]) => entityName === ui.entityName)) ui.entityName = matches[0]?.[0] || "";

  recordTitle.textContent = "Entities";
  recordSubtitle.textContent = `${levels.length} levels · ${matches.length} entities in view`;
  recordInspector.innerHTML = "";

  const toolbar = document.createElement("div");
  toolbar.className = "record-toolbar entity-toolbar";
  const levelField = document.createElement("label");
  levelField.className = "field";
  levelField.innerHTML = "<span>Level</span>";
  const levelSelect = document.createElement("select");
  levels.forEach((levelId) => {
    const option = document.createElement("option");
    option.value = levelId;
    option.textContent = levelId;
    levelSelect.appendChild(option);
  });
  levelSelect.value = ui.entityLevel;
  levelSelect.addEventListener("change", () => {
    ui.entityLevel = levelSelect.value;
    ui.entityName = "";
    renderRecordEditor();
  });
  levelField.appendChild(levelSelect);

  const classField = document.createElement("label");
  classField.className = "field";
  classField.innerHTML = "<span>Class</span>";
  const classSelect = document.createElement("select");
  [{ value: "all", label: "All classes" }, ...classes.map((value) => ({ value, label: value }))].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    classSelect.appendChild(option);
  });
  classSelect.value = ui.entityClass;
  classSelect.addEventListener("change", () => {
    ui.entityClass = classSelect.value;
    ui.entityName = "";
    renderRecordEditor();
  });
  classField.appendChild(classSelect);

  const meta = document.createElement("div");
  meta.className = "status inline-status";
  meta.textContent = `${matches.length} matches`;

  toolbar.appendChild(levelField);
  toolbar.appendChild(classField);
  toolbar.appendChild(meta);
  recordInspector.appendChild(toolbar);

  const bulkBar = document.createElement("div");
  bulkBar.className = "record-toolbar bulk-actions-bar";
  const applyToMatches = (mutator, statusText) => {
    const root = getJsonRoot("entities.dat");
    if (!root?.[ui.entityLevel]) return;
    matches.forEach(([entityName]) => {
      const entity = root[ui.entityLevel][entityName];
      if (entity) mutator(entity);
    });
    setJsonRoot("entities.dat", root);
    setStatus(statusText, "good");
  };

  const activateBtn = document.createElement("button");
  activateBtn.textContent = "Activate Matches";
  activateBtn.addEventListener("click", () => applyToMatches((entity) => {
    if (entity.active !== undefined) entity.active = "true";
  }, `Activated ${matches.length} matching entities.`));

  const deactivateBtn = document.createElement("button");
  deactivateBtn.className = "ghost";
  deactivateBtn.textContent = "Deactivate Matches";
  deactivateBtn.addEventListener("click", () => applyToMatches((entity) => {
    if (entity.active !== undefined) entity.active = "false";
  }, `Deactivated ${matches.length} matching entities.`));

  const openBtn = document.createElement("button");
  openBtn.className = "ghost";
  openBtn.textContent = "Open Doors/Chests";
  openBtn.addEventListener("click", () => applyToMatches((entity) => {
    if (entity.open !== undefined) entity.open = "true";
  }, `Opened doors/chests in ${matches.length} matching entities.`));

  const resetAttemptsBtn = document.createElement("button");
  resetAttemptsBtn.className = "ghost";
  resetAttemptsBtn.textContent = "Reset Attempts";
  resetAttemptsBtn.addEventListener("click", () => applyToMatches((entity) => {
    if (entity.isAttempted !== undefined) entity.isAttempted = "false";
    if (entity.touch !== undefined) entity.touch = "false";
  }, `Reset attempt flags in ${matches.length} matching entities.`));

  bulkBar.appendChild(activateBtn);
  bulkBar.appendChild(deactivateBtn);
  bulkBar.appendChild(openBtn);
  bulkBar.appendChild(resetAttemptsBtn);
  recordInspector.appendChild(bulkBar);

  const workspace = document.createElement("div");
  workspace.className = "entity-workspace";
  const list = document.createElement("div");
  list.className = "entity-list";
  matches.forEach(([entityName, entity]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `record-item${ui.entityName === entityName ? " active" : ""}`;
    button.addEventListener("click", () => {
      ui.entityName = entityName;
      renderRecordEditor();
    });
    const copy = document.createElement("div");
    copy.innerHTML = `<div>${entityName}</div><div class="record-meta">${entity.class || "Entity"} · ${entity.proto || ""}</div>`;
    button.appendChild(copy);
    list.appendChild(button);
  });
  workspace.appendChild(list);

  const detailWrap = document.createElement("div");
  detailWrap.className = "record-workspace";
  const currentEntity = ui.entityName ? levelEntities[ui.entityName] : null;
  if (!currentEntity) {
    detailWrap.textContent = "Pick an entity from the list.";
  } else {
    const scalars = createInspectorSection(ui.entityName, `${currentEntity.class || "Entity"} · ${currentEntity.proto || ""}`);
    const fieldGrid = document.createElement("div");
    fieldGrid.className = "field-grid";
    scalars.appendChild(fieldGrid);
    renderScalarFieldGrid(fieldGrid, "entities.dat", currentEntity, [
      "class",
      "active",
      "proto",
      "name",
      "behavior",
      "fraction",
      "civicsociety",
      "open",
      "touch",
      "lockLevel",
      "minDiceThrow",
      "count",
    ], [ui.entityLevel, ui.entityName]);
    detailWrap.appendChild(scalars);

    ["transform", "inventory", "stats", "keywords", "status_effects", "weapon", "shield", "cloak"].forEach((sectionKey) => {
      if (currentEntity[sectionKey] === undefined) return;
      const section = createInspectorSection(sectionKey, `entities.dat · ${ui.entityLevel}.${ui.entityName}.${sectionKey}`);
      const body = document.createElement("div");
      body.className = "tree-root";
      section.appendChild(body);
      renderTree(body, "entities.dat", currentEntity[sectionKey], recordSearch.value, [ui.entityLevel, ui.entityName, sectionKey]);
      detailWrap.appendChild(section);
    });
  }
  workspace.appendChild(detailWrap);
  recordInspector.appendChild(workspace);
}

function renderRecordEditor() {
  const name = state.selectedRecord;
  const root = name ? getJsonRoot(name) : null;
  recordRevertBtn.disabled = !name;

  if (!name || !root) {
    recordTitle.textContent = "Structured Record Editor";
    recordSubtitle.textContent = "Pick an editable record from the browser.";
    recordInspector.innerHTML = "";
    loadRawEditor(true);
    return;
  }

  const entry = getEntry(name);
  if (ui.recordMode === "quest" || name === "save.dat") {
    renderQuestRecord();
  } else if (ui.recordMode === "worldmap" || name === "WorldMap.wmap" || name.endsWith(".pins")) {
    renderWorldMapRecord();
  } else if (ui.recordMode === "entities" || name === "entities.dat") {
    renderEntitiesRecord();
  } else if (ui.recordMode === "dh" || name === "dh.dat") {
    renderDhRecord();
  } else if (ui.recordMode === "info" || name === "info.dat") {
    renderInfoRecord();
  } else {
    recordTitle.textContent = name;
    recordSubtitle.textContent = `${formatBytes(entry.data.byteLength)} · ${entry.modified ? "Modified" : "Clean"}`;
    renderTree(recordInspector, name, root, recordSearch.value);
  }
  loadRawEditor();
}

function commitInventory(inventory) {
  const playerRoot = getJsonRoot("player.dat");
  if (!Array.isArray(playerRoot) || !playerRoot[0]) return;
  playerRoot[0].inventory = inventory;
  setJsonRoot("player.dat", playerRoot);
}

function renderInventoryQuickActions(inventory) {
  inventoryQuickActions.innerHTML = "";
  if (!Array.isArray(inventory)) return;

  const wrap = document.createElement("div");
  wrap.className = "record-toolbar inventory-actions-bar";

  const classField = document.createElement("label");
  classField.className = "field";
  classField.innerHTML = "<span>Preset class</span>";
  const classSelect = document.createElement("select");
  uniqueSorted(state.catalog?.itemClasses || new Set()).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    classSelect.appendChild(option);
  });
  if (!classSelect.options.length) {
    const option = document.createElement("option");
    option.value = "Item";
    option.textContent = "Item";
    classSelect.appendChild(option);
  }
  classField.appendChild(classSelect);

  const protoField = document.createElement("label");
  protoField.className = "field";
  protoField.innerHTML = "<span>Preset proto</span>";
  const protoInput = document.createElement("input");
  protoInput.type = "text";
  protoInput.placeholder = "BL_Swd_WeatheredSword, AL_P_LightHealingPotion...";
  editorControlId += 1;
  const listId = `inventory-preset-${editorControlId}`;
  protoInput.setAttribute("list", listId);
  const protoList = document.createElement("datalist");
  protoList.id = listId;
  uniqueSorted(state.catalog?.protoIds || new Set()).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    protoList.appendChild(option);
  });
  protoField.appendChild(protoInput);
  protoField.appendChild(protoList);

  const countField = document.createElement("label");
  countField.className = "field";
  countField.innerHTML = "<span>Count</span>";
  const countInput = document.createElement("input");
  countInput.type = "number";
  countInput.min = "1";
  countInput.step = "1";
  countInput.value = "1";
  countField.appendChild(countInput);

  const addPresetBtn = document.createElement("button");
  addPresetBtn.textContent = "Add Preset";
  addPresetBtn.addEventListener("click", () => {
    inventory.push({
      class: classSelect.value || "Item",
      proto: protoInput.value.trim(),
      count: String(Math.max(1, Number(countInput.value) || 1)),
    });
    commitInventory(inventory);
  });

  const stackBtn = document.createElement("button");
  stackBtn.className = "ghost";
  stackBtn.textContent = "Stack Duplicates";
  stackBtn.addEventListener("click", () => {
    const merged = [];
    const byKey = new Map();
    inventory.forEach((item) => {
      const key = `${item.class || ""}::${item.proto || ""}`;
      const count = Number(item.count || 0);
      if (byKey.has(key)) {
        byKey.get(key).count = String((Number(byKey.get(key).count || 0) + count));
      } else {
        const clone = cloneValue(item);
        clone.count = String(Number(clone.count || 0));
        byKey.set(key, clone);
        merged.push(clone);
      }
    });
    commitInventory(merged);
  });

  const removeZeroBtn = document.createElement("button");
  removeZeroBtn.className = "ghost";
  removeZeroBtn.textContent = "Remove Zero Count";
  removeZeroBtn.addEventListener("click", () => {
    commitInventory(inventory.filter((item) => Number(item.count || 0) > 0));
  });

  const sortBtn = document.createElement("button");
  sortBtn.className = "ghost";
  sortBtn.textContent = "Sort Inventory";
  sortBtn.addEventListener("click", () => {
    const sorted = inventory.slice().sort((a, b) => {
      const classCmp = String(a.class || "").localeCompare(String(b.class || ""));
      if (classCmp) return classCmp;
      return String(a.proto || "").localeCompare(String(b.proto || ""), undefined, { numeric: true, sensitivity: "base" });
    });
    commitInventory(sorted);
  });

  wrap.appendChild(classField);
  wrap.appendChild(protoField);
  wrap.appendChild(countField);
  wrap.appendChild(addPresetBtn);
  wrap.appendChild(stackBtn);
  wrap.appendChild(removeZeroBtn);
  wrap.appendChild(sortBtn);
  inventoryQuickActions.appendChild(wrap);
}

function renderInventoryTable(inventory) {
  inventoryTree.innerHTML = "";
  const query = inventoryFilter.value.trim().toLowerCase();
  const filtered = inventory
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !query || JSON.stringify(item).toLowerCase().includes(query));

  if (!filtered.length) {
    inventoryTree.textContent = query ? "No inventory rows match the current filter." : "Inventory is empty.";
    return;
  }

  filtered.forEach(({ item, index }) => {
    const row = document.createElement("div");
    row.className = "inventory-row";

    const head = document.createElement("div");
    head.className = "inventory-row-head";
    const indexEl = document.createElement("div");
    indexEl.className = "inventory-index";
    indexEl.textContent = `#${index}`;
    const meta = document.createElement("div");
    meta.className = "inventory-meta";
    meta.textContent = item.class || "item";
    head.appendChild(indexEl);
    head.appendChild(meta);

    const classEditor = createRichScalarEditor("player.dat", [0, "inventory", index, "class"], item.class ?? "", (next) => {
      inventory[index].class = next;
      commitInventory(inventory);
    }).element;

    const protoEditor = createRichScalarEditor("player.dat", [0, "inventory", index, "proto"], item.proto ?? "", (next) => {
      inventory[index].proto = next;
      commitInventory(inventory);
    }).element;

    const countEditor = createRichScalarEditor("player.dat", [0, "inventory", index, "count"], item.count ?? "1", (next) => {
      inventory[index].count = next;
      commitInventory(inventory);
    }).element;

    const duplicateBtn = document.createElement("button");
    duplicateBtn.className = "ghost";
    duplicateBtn.textContent = "Duplicate";
    duplicateBtn.addEventListener("click", () => {
      inventory.splice(index + 1, 0, cloneValue(item));
      commitInventory(inventory);
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "ghost";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      inventory.splice(index, 1);
      commitInventory(inventory);
    });

    const actions = document.createElement("div");
    actions.className = "inventory-actions";
    actions.appendChild(duplicateBtn);
    actions.appendChild(removeBtn);

    row.appendChild(head);
    row.appendChild(classEditor);
    row.appendChild(protoEditor);
    row.appendChild(countEditor);
    row.appendChild(actions);
    inventoryTree.appendChild(row);
  });
}

function renderInventoryAndQuest() {
  const inventory = getJsonRoot("player.dat")?.[0]?.inventory;
  if (inventory === undefined) {
    inventoryQuickActions.innerHTML = "";
    inventoryTree.textContent = "Inventory not available.";
    inventoryStatus.textContent = "player.dat inventory missing.";
  } else {
    inventoryStatus.textContent = "Table editor with observed proto and class ids from the loaded corpus.";
    renderInventoryQuickActions(inventory);
    renderInventoryTable(inventory);
  }

  const quest = getJsonRoot("save.dat")?.quest;
  if (quest === undefined) {
    questTree.textContent = "Quest state not available.";
    questStatus.textContent = "save.dat quest missing.";
  } else {
    questStatus.textContent = "Structured quest editor.";
    renderTree(questTree, "save.dat", quest, "", ["quest"]);
  }
}

function renderCoreEditors() {
  renderScalarFieldGrid(saveFields, "save.dat", getJsonRoot("save.dat"), SAVE_CORE_KEYS, []);
  const playerRoot = getJsonRoot("player.dat");
  renderScalarFieldGrid(playerFields, "player.dat", Array.isArray(playerRoot) ? playerRoot[0] : null, PLAYER_CORE_KEYS, [0]);
  renderStats();
  renderInventoryAndQuest();
}

function renderFowList() {
  const names = Array.from(state.fow.keys()).sort();
  fowSelect.innerHTML = "";
  if (!names.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No FOW files";
    fowSelect.appendChild(option);
    return;
  }
  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    fowSelect.appendChild(option);
  });
  if (!names.includes(fowSelect.value)) fowSelect.value = names[0];
}

function resetFowView() {
  fowView.zoom = 1;
  fowView.panX = 0;
  fowView.panY = 0;
  fowView.lastRender = null;
}

function ensureFowPreview(fow) {
  if (fow.previewCanvas) return;

  const maxSize = 512;
  const scale = Math.max(1, Math.ceil(Math.max(fow.width, fow.height) / maxSize));
  const previewW = Math.ceil(fow.width / scale);
  const previewH = Math.ceil(fow.height / scale);
  const canvas = document.createElement("canvas");
  canvas.width = previewW;
  canvas.height = previewH;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(previewW, previewH);
  let cursor = 0;

  for (let y = 0; y < previewH; y += 1) {
    const srcY = y * scale;
    for (let x = 0; x < previewW; x += 1) {
      const srcX = x * scale;
      const value = fow.data[srcY * fow.width + srcX];
      const color = value === 0 ? 232 : value === 255 ? 38 : 127;
      image.data[cursor] = color;
      image.data[cursor + 1] = color;
      image.data[cursor + 2] = color;
      image.data[cursor + 3] = 255;
      cursor += 4;
    }
  }

  ctx.putImageData(image, 0, 0);
  fow.previewCanvas = canvas;
  fow.previewW = previewW;
  fow.previewH = previewH;
  fow.previewScale = scale;
}

function sizeFowCanvas() {
  const rect = fowCanvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const fallbackHeight = clamp(Math.floor(width * 0.72), 340, 720);
  const measuredHeight = Math.floor(rect.height || fallbackHeight);
  const height = clamp(measuredHeight, 340, 720);
  if (fowCanvas.width !== width || fowCanvas.height !== height) {
    fowCanvas.width = width;
    fowCanvas.height = height;
  }
  return { width, height };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function renderFowPreview(name) {
  const ctx = fowCanvas.getContext("2d");
  const { width, height } = sizeFowCanvas();
  ctx.clearRect(0, 0, width, height);

  if (!name || !state.fow.has(name)) {
    fowPreviewMeta.textContent = "Preview not available.";
    fowMeta.textContent = "No FOW loaded.";
    fowStats.textContent = "";
    return;
  }

  const fow = state.fow.get(name);
  if (!fow || fow.error) {
    fowPreviewMeta.textContent = "Preview not available.";
    fowMeta.textContent = `${name} · invalid`;
    fowStats.textContent = fow?.error || "";
    return;
  }

  if (fowView.lastName !== name) {
    resetFowView();
    fowView.lastName = name;
  }

  ensureFowPreview(fow);
  const baseScale = Math.min(width / fow.previewW, height / fow.previewH);
  const drawW = fow.previewW * baseScale * fowView.zoom;
  const drawH = fow.previewH * baseScale * fowView.zoom;
  const originX = (width - drawW) / 2 + fowView.panX;
  const originY = (height - drawH) / 2 + fowView.panY;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(fow.previewCanvas, originX, originY, drawW, drawH);

  fowView.lastRender = {
    width,
    height,
    previewW: fow.previewW,
    previewH: fow.previewH,
    baseScale,
    originX,
    originY,
  };

  fowMeta.textContent = `${name} · ${fow.width} × ${fow.height}`;
  fowStats.textContent = `0x00 ${fow.counts.zero} · 0xFF ${fow.counts.ff} · other ${fow.counts.other}`;
  fowPreviewMeta.textContent = `Preview ${fow.previewW} × ${fow.previewH} · source scale ${fow.previewScale}x · zoom ${fowView.zoom.toFixed(2)}x`;
}

function renderDecals() {
  decalsMeta.textContent = state.decals.size
    ? `Mode: ${state.decalsMode === "clear" ? "clear on export" : "ignore"}`
    : "No decals loaded.";
  decalsList.innerHTML = "";
  Array.from(state.decals.values()).forEach((decals) => {
    const row = document.createElement("div");
    row.className = "simple-item";
    const left = document.createElement("div");
    left.textContent = `${decals.name} · v${decals.version}`;
    const right = document.createElement("div");
    right.className = "simple-meta";
    right.textContent = decals.sections.map((section) => `t${section.type}:${section.count}`).join("  ");
    row.appendChild(left);
    row.appendChild(right);
    decalsList.appendChild(row);
  });
}

function renderAll() {
  rebuildWarnings();
  renderMetrics();
  renderWarnings();
  renderModifiedPills();
  renderViewTabs();
  renderRecordList();
  renderEntryList();
  renderCoreEditors();
  renderRecordEditor();
  renderFowList();
  renderFowPreview(fowSelect.value);
  renderDecals();
}

function getArchiveRank(file) {
  const match = file.name.match(/save_(\d+)_v(\d+)/i);
  if (!match) return { version: 0, slot: 0, size: file.size };
  return {
    version: Number(match[2]) || 0,
    slot: Number(match[1]) || 0,
    size: file.size,
  };
}

function getProgressName(file, hasProgressSegment) {
  const raw = (file.webkitRelativePath || file.name).replace(/\\/g, "/");
  if (hasProgressSegment) {
    const lower = raw.toLowerCase();
    const index = lower.lastIndexOf("/progress/");
    if (index !== -1) return raw.slice(index + 10);
    if (lower.startsWith("progress/")) return raw.slice(9);
  }
  return raw.split("/").pop();
}

async function loadArchive(file) {
  setStatus("Scanning archive payload...", "loading");
  const compressed = await file.arrayBuffer();
  const inflated = await gunzip(compressed);
  const entries = parseArchiveEntries(inflated);
  state = normalizeEntries(entries, { sourceType: "archive", sourceName: file.name });
  ui.rawLoadedFor = null;
  ui.recordMode = "auto";
  ui.entityLevel = "";
  ui.entityName = "";
  ui.entityClass = "all";
  ui.worldPinsFile = "";
  ui.dhCharacter = "";
  ui.infoLogic = "";
  selectedFolderLabel.textContent = `Loaded archive: ${file.name}`;
  renderAll();
  setStatus(`Archive loaded · ${file.name} · ${entries.length} entries.`, "good");
}

async function loadProgressFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) {
    setStatus("No files in selected folder.", "error");
    return;
  }

  setStatus("Scanning Progress files...", "loading");
  const hasProgressSegment = files.some((file) => {
    const lower = (file.webkitRelativePath || "").toLowerCase();
    return lower.includes("/progress/") || lower.startsWith("progress/");
  });

  const entries = [];
  for (const file of files) {
    const rel = (file.webkitRelativePath || "").replace(/\\/g, "/").toLowerCase();
    const isProgress = !hasProgressSegment || rel.includes("/progress/") || rel.startsWith("progress/");
    if (!isProgress) continue;
    const data = new Uint8Array(await file.arrayBuffer());
    const name = getProgressName(file, hasProgressSegment);
    entries.push({ name, path: `Progress/${name}`, data });
  }

  state = normalizeEntries(entries, { sourceType: "progress", sourceName: "Progress" });
  ui.rawLoadedFor = null;
  ui.recordMode = "auto";
  ui.entityLevel = "";
  ui.entityName = "";
  ui.entityClass = "all";
  ui.worldPinsFile = "";
  ui.dhCharacter = "";
  ui.infoLogic = "";
  selectedFolderLabel.textContent = `Loaded Progress (${entries.length} files)`;
  renderAll();
  setStatus(`Progress loaded · ${entries.length} files.`, "good");
}

async function loadAutoDetect(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) {
    setStatus("No files in selected folder.", "error");
    return;
  }

  const archives = files.filter((file) => file.name.toLowerCase().endsWith(".as"));
  const progressFiles = files.filter((file) => {
    const rel = (file.webkitRelativePath || "").replace(/\\/g, "/").toLowerCase();
    return rel.includes("/progress/") || rel.startsWith("progress/");
  });

  if (progressFiles.length) {
    await loadProgressFiles(progressFiles);
    setStatus(`Progress detected and loaded · ${progressFiles.length} files.`, "good");
    return;
  }

  if (archives.length) {
    const sorted = archives.slice().sort((a, b) => {
      const rankA = getArchiveRank(a);
      const rankB = getArchiveRank(b);
      if (rankA.version !== rankB.version) return rankB.version - rankA.version;
      if (rankA.slot !== rankB.slot) return rankB.slot - rankA.slot;
      return rankB.size - rankA.size;
    });
    await loadArchive(sorted[0]);
    selectedFolderLabel.textContent = `Detected archive: ${sorted[0].name}`;
    return;
  }

  setStatus("No Swordhaven save payload detected.", "error");
}

function buildArchiveBuffer(entries) {
  const chunks = [];
  let total = 0;

  entries.forEach((entry) => {
    const nameLength = entry.name.length;
    const header = new ArrayBuffer(8 + nameLength * 2);
    const view = new DataView(header);
    view.setUint32(0, nameLength, true);
    for (let i = 0; i < nameLength; i += 1) {
      view.setUint16(4 + i * 2, entry.name.charCodeAt(i), true);
    }
    view.setUint32(4 + nameLength * 2, entry.data.byteLength, true);
    const headerBytes = new Uint8Array(header);
    chunks.push(headerBytes, entry.data);
    total += headerBytes.byteLength + entry.data.byteLength;
  });

  const buffer = new Uint8Array(total);
  let offset = 0;
  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return buffer.buffer;
}

function buildZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  entries.forEach((entry) => {
    const nameBytes = encodeUtf8(entry.path);
    const crc = crc32(entry.data);

    const localHeader = new ArrayBuffer(30 + nameBytes.length);
    const localView = new DataView(localHeader);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint16(12, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, entry.data.byteLength, true);
    localView.setUint32(22, entry.data.byteLength, true);
    localView.setUint16(26, nameBytes.length, true);
    new Uint8Array(localHeader, 30, nameBytes.length).set(nameBytes);
    localParts.push(new Uint8Array(localHeader), entry.data);

    const centralHeader = new ArrayBuffer(46 + nameBytes.length);
    const centralView = new DataView(centralHeader);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint16(14, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, entry.data.byteLength, true);
    centralView.setUint32(24, entry.data.byteLength, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint32(42, offset, true);
    new Uint8Array(centralHeader, 46, nameBytes.length).set(nameBytes);
    centralParts.push(new Uint8Array(centralHeader));

    offset += localHeader.byteLength + entry.data.byteLength;
  });

  const centralOffset = offset;
  let centralSize = 0;
  centralParts.forEach((part) => {
    centralSize += part.byteLength;
    offset += part.byteLength;
  });

  const endHeader = new ArrayBuffer(22);
  const endView = new DataView(endHeader);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, entries.length, true);
  endView.setUint16(10, entries.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, centralOffset, true);

  const buffer = new Uint8Array(offset + endHeader.byteLength);
  let cursor = 0;
  localParts.forEach((part) => {
    buffer.set(part, cursor);
    cursor += part.byteLength;
  });
  centralParts.forEach((part) => {
    buffer.set(part, cursor);
    cursor += part.byteLength;
  });
  buffer.set(new Uint8Array(endHeader), cursor);
  return buffer.buffer;
}

function prepareExportEntries() {
  return state.order.map((name) => {
    const entry = getEntry(name);
    let data = entry.data;
    if (state.decalsMode === "clear" && name.endsWith(".decals")) {
      const cleared = new Uint8Array(8);
      const view = new DataView(cleared.buffer);
      const decals = state.decals.get(name);
      view.setUint32(0, decals?.version || 1, true);
      view.setUint32(4, 0, true);
      data = cleared;
    }
    return {
      name,
      path: state.sourceType === "progress" ? `Progress/${name}` : name,
      data,
    };
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function revertFile(name) {
  const original = state.originalEntries.get(name);
  const entry = getEntry(name);
  if (!original || !entry) return;
  entry.data = new Uint8Array(original.data);
  entry.modified = false;
  refreshEntryClassification(name);
  if (state.selectedRecord === name) ui.rawLoadedFor = null;
  rebuildWarnings();
  renderAll();
  setStatus(`Reverted ${name}.`, "good");
}

function revertAll() {
  const entries = state.order.map((name) => {
    const original = state.originalEntries.get(name);
    return {
      name: original.name,
      path: original.path,
      data: new Uint8Array(original.data),
    };
  });
  const sourceType = state.sourceType;
  const sourceName = state.sourceName;
  const decalsMode = state.decalsMode;
  state = normalizeEntries(entries, { sourceType, sourceName });
  state.decalsMode = decalsMode;
  ui.rawLoadedFor = null;
  ui.recordMode = "auto";
  ui.entityLevel = "";
  ui.entityName = "";
  ui.entityClass = "all";
  ui.worldPinsFile = "";
  ui.dhCharacter = "";
  ui.infoLogic = "";
  renderAll();
  setStatus("Reverted all changes.", "good");
}

function updateFowAfterMutation(name) {
  const fow = state.fow.get(name);
  if (!fow || fow.error) return;
  fow.counts = countFowBytes(fow.data);
  fow.previewCanvas = null;
  markEntryModified(name);
  rebuildWarnings();
  renderAll();
}

function applyFowToSelected(value) {
  const name = fowSelect.value;
  const fow = state.fow.get(name);
  if (!fow || fow.error) return;
  fow.data.fill(value);
  updateFowAfterMutation(name);
  setStatus(`Applied ${value === 0 ? "reveal" : "fog"} to ${name}.`, "good");
}

function invertSelectedFow() {
  const name = fowSelect.value;
  const fow = state.fow.get(name);
  if (!fow || fow.error) return;
  for (let i = 0; i < fow.data.length; i += 1) {
    fow.data[i] = fow.data[i] === 0 ? 255 : 0;
  }
  updateFowAfterMutation(name);
  setStatus(`Inverted ${name}.`, "good");
}

function applyRegionFill() {
  const name = fowSelect.value;
  const fow = state.fow.get(name);
  if (!fow || fow.error) return;

  const x = Number(regionX.value);
  const y = Number(regionY.value);
  const width = Number(regionW.value);
  const height = Number(regionH.value);
  const fill = Number(regionValue.value);

  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
    setStatus("Region values must be valid positive numbers.", "error");
    return;
  }
  if (x < 0 || y < 0 || x + width > fow.width || y + height > fow.height) {
    setStatus("Region must fit inside the selected FOW dimensions.", "error");
    return;
  }

  for (let row = y; row < y + height; row += 1) {
    const rowStart = row * fow.width + x;
    fow.data.fill(fill, rowStart, rowStart + width);
  }

  updateFowAfterMutation(name);
  setStatus(`Applied region fill to ${name}.`, "good");
}

function applyFowToAllFiles(fill) {
  state.fow.forEach((fow, name) => {
    if (fow.error) return;
    fow.data.fill(fill);
    fow.counts = countFowBytes(fow.data);
    fow.previewCanvas = null;
    markEntryModified(name);
  });
  rebuildWarnings();
  renderAll();
  setStatus(`Applied ${fill === 0 ? "reveal" : "fog"} to all FOW files.`, "good");
}

function syncStats(direction) {
  const saveRoot = getJsonRoot("save.dat");
  const playerRoot = getJsonRoot("player.dat");
  if (!saveRoot?.stats || !playerRoot?.[0]?.stats) {
    setStatus("Stats not available in both save.dat and player.dat.", "error");
    return;
  }

  if (direction === "save-to-player") {
    playerRoot[0].stats = cloneValue(saveRoot.stats);
    setJsonRoot("player.dat", playerRoot);
  } else {
    saveRoot.stats = cloneValue(playerRoot[0].stats);
    setJsonRoot("save.dat", saveRoot);
  }
  setStatus("Stats synchronized.", "good");
}

chooseFolderBtn.addEventListener("click", () => autoDetectInput.click());

autoDetectInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files || []);
  const samplePath = files[0]?.webkitRelativePath || files[0]?.name || "";
  const pathBits = samplePath.replace(/\\/g, "/").split("/");
  selectedFolderLabel.textContent = files.length
    ? `Selected: ${pathBits[0] || samplePath} (${files.length} files scanned)`
    : "No folder selected.";
  loadAutoDetect(event.target.files).catch((error) => setStatus(`Auto detect failed: ${error.message}`, "error"));
});

viewTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]");
  if (!button) return;
  ui.activeView = button.dataset.view;
  renderAll();
});

recordFilter.addEventListener("input", () => renderRecordList());
recordSearch.addEventListener("input", () => renderRecordEditor());

statsFilter.addEventListener("input", () => renderStats());
statsMismatchToggle.addEventListener("change", () => renderStats());
statsCopySaveBtn.addEventListener("click", () => syncStats("save-to-player"));
statsCopyPlayerBtn.addEventListener("click", () => syncStats("player-to-save"));
statsReloadBtn.addEventListener("click", () => renderStats());
inventoryFilter.addEventListener("input", () => renderInventoryAndQuest());
inventoryAddBtn.addEventListener("click", () => {
  const inventory = getJsonRoot("player.dat")?.[0]?.inventory;
  if (!Array.isArray(inventory)) return;
  inventory.push({ class: "Item", proto: "", count: "1" });
  commitInventory(inventory);
});

qaRevealAllBtn.addEventListener("click", () => applyFowToAllFiles(0));
qaFogAllBtn.addEventListener("click", () => applyFowToAllFiles(255));
qaClearDecalsBtn.addEventListener("click", () => {
  clearDecalsToggle.checked = true;
  state.decalsMode = "clear";
  renderDecals();
  setStatus("Decals will be cleared on export.", "good");
});
qaSyncStatsBtn.addEventListener("click", () => syncStats("save-to-player"));

revealAllBtn.addEventListener("click", () => applyFowToSelected(0));
fogAllBtn.addEventListener("click", () => applyFowToSelected(255));
invertBtn.addEventListener("click", invertSelectedFow);
applyRegionBtn.addEventListener("click", applyRegionFill);
fowSelect.addEventListener("change", () => {
  fowView.lastName = null;
  renderFowPreview(fowSelect.value);
});

clearDecalsToggle.addEventListener("change", () => {
  state.decalsMode = clearDecalsToggle.checked ? "clear" : "ignore";
  renderDecals();
});

recordRevertBtn.addEventListener("click", () => {
  if (state.selectedRecord) revertFile(state.selectedRecord);
});

rawReloadBtn.addEventListener("click", () => {
  loadRawEditor(true);
  rawStatus.textContent = "Reloaded from current state.";
});

rawFormatBtn.addEventListener("click", () => {
  try {
    rawJsonArea.value = JSON.stringify(JSON.parse(rawJsonArea.value), null, 2);
    rawStatus.textContent = "Formatted.";
  } catch (error) {
    rawStatus.textContent = `Parse error: ${error.message}`;
  }
});

rawApplyBtn.addEventListener("click", () => {
  if (!state.selectedRecord) return;
  try {
    const parsed = JSON.parse(rawJsonArea.value);
    const invalid = findNonStringScalars(parsed);
    if (invalid.length) {
      rawStatus.textContent = `Non-string scalar at ${invalid[0]}`;
      return;
    }
    setJsonRoot(state.selectedRecord, parsed);
    ui.rawLoadedFor = state.selectedRecord;
    rawStatus.textContent = "Applied.";
  } catch (error) {
    rawStatus.textContent = `Parse error: ${error.message}`;
  }
});

revertAllBtn.addEventListener("click", revertAll);

exportBtn.addEventListener("click", async () => {
  if (!state.sourceType) return;
  try {
    const entries = prepareExportEntries();
    if (state.sourceType === "archive") {
      const archiveBuffer = buildArchiveBuffer(entries);
      const compressed = await gzip(archiveBuffer);
      const filename = `${state.sourceName.replace(/\.as$/i, "")}_edited.as`;
      downloadBlob(new Blob([compressed], { type: "application/gzip" }), filename);
      setStatus(`Exported ${filename}.`, "good");
      return;
    }

    const zipBuffer = buildZip(entries);
    downloadBlob(new Blob([zipBuffer], { type: "application/zip" }), "Progress_edited.zip");
    setStatus("Exported Progress_edited.zip.", "good");
  } catch (error) {
    setStatus(`Export failed: ${error.message}`, "error");
  }
});

resetBtn.addEventListener("click", () => {
  state = createEmptyState();
  ui.activeView = "core";
  ui.rawLoadedFor = null;
  ui.recordMode = "auto";
  ui.entityLevel = "";
  ui.entityName = "";
  ui.entityClass = "all";
  ui.worldPinsFile = "";
  ui.dhCharacter = "";
  ui.infoLogic = "";
  autoDetectInput.value = "";
  selectedFolderLabel.textContent = "No folder selected.";
  recordFilter.value = "";
  recordSearch.value = "";
  inventoryFilter.value = "";
  clearDecalsToggle.checked = false;
  rawJsonArea.value = "";
  rawStatus.textContent = "";
  fowView.lastName = null;
  resetFowView();
  renderAll();
  setStatus("Awaiting save folder selection.", "", "IDLE");
});

fowCanvas.addEventListener("wheel", (event) => {
  if (!state.fow.has(fowSelect.value) || !fowView.lastRender) return;
  event.preventDefault();
  const nextZoom = clamp(fowView.zoom * (event.deltaY < 0 ? 1.1 : 0.9), 0.5, 8);
  if (nextZoom === fowView.zoom) return;

  const last = fowView.lastRender;
  const prevScale = last.baseScale * fowView.zoom;
  const nextScale = last.baseScale * nextZoom;
  const worldX = (event.offsetX - last.originX) / prevScale;
  const worldY = (event.offsetY - last.originY) / prevScale;
  const nextOriginX = event.offsetX - worldX * nextScale;
  const nextOriginY = event.offsetY - worldY * nextScale;
  const nextDrawW = last.previewW * nextScale;
  const nextDrawH = last.previewH * nextScale;

  fowView.zoom = nextZoom;
  fowView.panX = nextOriginX - (last.width - nextDrawW) / 2;
  fowView.panY = nextOriginY - (last.height - nextDrawH) / 2;
  renderFowPreview(fowSelect.value);
});

fowCanvas.addEventListener("pointerdown", (event) => {
  if (!state.fow.has(fowSelect.value)) return;
  fowView.dragging = true;
  fowCanvas.classList.add("dragging");
  fowCanvas.setPointerCapture(event.pointerId);
  fowView.dragStart = {
    x: event.clientX,
    y: event.clientY,
    panX: fowView.panX,
    panY: fowView.panY,
  };
});

fowCanvas.addEventListener("pointermove", (event) => {
  if (!fowView.dragging) return;
  fowView.panX = fowView.dragStart.panX + (event.clientX - fowView.dragStart.x);
  fowView.panY = fowView.dragStart.panY + (event.clientY - fowView.dragStart.y);
  renderFowPreview(fowSelect.value);
});

function stopFowDrag(event) {
  if (!fowView.dragging) return;
  fowView.dragging = false;
  fowCanvas.classList.remove("dragging");
  if (event?.pointerId !== undefined) fowCanvas.releasePointerCapture(event.pointerId);
}

fowCanvas.addEventListener("pointerup", stopFowDrag);
fowCanvas.addEventListener("pointercancel", stopFowDrag);
fowResetViewBtn.addEventListener("click", () => {
  resetFowView();
  renderFowPreview(fowSelect.value);
});
window.addEventListener("resize", () => renderFowPreview(fowSelect.value));

renderAll();
setStatus("Awaiting save folder selection.", "", "IDLE");
