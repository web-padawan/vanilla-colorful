const path = require('path');
const fs = require('fs');

const PLAIN_WEB_TYPES_FILE = 'web-types.json';
const LIT_WEB_TYPES_FILE = 'web-types.lit.json';

function loadAnalysis() {
  const analysisPath = path.resolve('./custom-elements.json');
  try {
    return JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
  } catch (e) {
    throw new Error(
      `Could not find "custom-elements.json". Make sure to run the CEM Analyzer before generating web-types.`
    );
  }
}

function getElementData(moduleInfo) {
  const elementInfo = moduleInfo.declarations[0];

  return {
    name: moduleInfo.exports.find((entry) => entry.kind === 'custom-element-definition').name,
    description: elementInfo.description,
    properties: elementInfo.members.filter((member) => member.kind === 'field' && !!member.type),
    attributes: elementInfo.attributes.filter((attribute) => !!attribute.type),
    events: elementInfo.events
  };
}

function createPlainElementDefinition(elementData) {
  const attributes = elementData.attributes.map((attribute) => ({
    name: attribute.name,
    description: attribute.description,
    value: {
      type: [attribute.type.text]
    }
  }));

  const properties = elementData.properties.map((prop) => ({
    name: prop.name,
    description: prop.description,
    value: {
      type: [prop.type.text]
    }
  }));

  const events = elementData.events.map((event) => ({
    name: event.name,
    description: event.description
  }));

  return {
    name: elementData.name,
    description: elementData.description,
    attributes,
    js: {
      properties,
      events
    }
  };
}

function createPlainWebTypes(packageJson, packageModules) {
  return {
    $schema: 'https://json.schemastore.org/web-types',
    name: packageJson.name,
    version: packageJson.version,
    'description-markup': 'markdown',
    contributions: {
      html: {
        elements: packageModules.map((entry) => createPlainElementDefinition(getElementData(entry)))
      }
    }
  };
}

function createLitElementDefinition(elementData) {
  const propertyAttributes = elementData.properties.map((prop) => ({
    name: `.${prop.name}`,
    description: prop.description,
    value: {
      kind: 'expression'
    }
  }));

  const eventAttributes = elementData.events.map((event) => ({
    name: `@${event.name}`,
    description: event.description,
    value: {
      kind: 'expression'
    }
  }));

  return {
    name: elementData.name,
    description: elementData.description,
    // Declare as extension to plain web type, this also means we don't have to
    // repeat the same stuff from the plain web-types.json again
    extension: true,
    // IntelliJ does not understand Lit template syntax, so
    // effectively everything has to be declared as attribute
    attributes: [...propertyAttributes, ...eventAttributes]
  };
}

function createLitWebTypes(packageJson, modules) {
  return {
    $schema: 'https://json.schemastore.org/web-types',
    name: packageJson.name,
    version: packageJson.version,
    'description-markup': 'markdown',
    framework: 'lit',
    'framework-config': {
      'enable-when': {
        'node-packages': ['lit']
      }
    },
    contributions: {
      html: {
        elements: modules.map((entry) => createLitElementDefinition(getElementData(entry)))
      }
    }
  };
}

/**
 * Create Web-Types definitions to enable IntelliJ IDEA code completion.
 * The definitions are split into two files, one containing "plain" types
 * for the web component, including attributes, properties and events.
 * The other file contains Lit-specific bindings, to bind properties,
 * attributes and events through their respective Lit attribute syntax.
 */
function buildWebTypes() {
  const analysis = loadAnalysis();

  const packageJson = JSON.parse(fs.readFileSync(`./package.json`, 'utf8'));
  const entrypoints = analysis.modules.filter((el) => !el.path.startsWith('lib'));

  const plainWebTypes = createPlainWebTypes(packageJson, entrypoints);
  const plainWebTypesJson = JSON.stringify(plainWebTypes, null, 2);
  fs.writeFileSync(PLAIN_WEB_TYPES_FILE, plainWebTypesJson, 'utf8');

  const litWebTypes = createLitWebTypes(packageJson, entrypoints);
  const litWebTypesJson = JSON.stringify(litWebTypes, null, 2);
  fs.writeFileSync(path.join(LIT_WEB_TYPES_FILE), litWebTypesJson, 'utf8');
}

buildWebTypes();
