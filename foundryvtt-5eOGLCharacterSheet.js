const MODULE_ID = "5e-ogl-character-sheet";

// Get modern dnd5e base sheet safely
function getBaseSheet() {
  return game.dnd5e?.applications?.actor?.ActorSheet5eCharacter;
}

// Minimal working sheet
class OGL5eCharacterSheet extends (getBaseSheet() || ActorSheet) {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "actor", "character", "ogl-sheet"],
      width: 800,
      height: 800
    });
  }

  get template() {
    // TEMP: use default sheet template so it renders
    return "systems/dnd5e/templates/actors/character-sheet.html";
  }
}

// Register AFTER everything is ready
Hooks.once("ready", function () {
  console.log("🔥 OGL Sheet (Safe Mode) Registering 🔥");

  const BaseSheet = getBaseSheet();

  if (!BaseSheet) {
    console.error("❌ Could not find dnd5e base sheet");
    return;
  }

  Actors.registerSheet("dnd5e", OGL5eCharacterSheet, {
    types: ["character"],
    makeDefault: false,
    label: "OGL Character Sheet"
  });

  console.log("✅ OGL Sheet Registered");
});
