/*
{
  "xPos": 27,
  "yPos": -58,
  "Nav1": 133, "Nav2": -1, "Nav3": -1, "Nav4": -1,
  "DudeTypes": [ 128, 133, 133, 132 ],
  "% Prob": [ 20, 40, 20, 20 ],
  "AvgShips": 4,
  "Govt": -1,
  "Message": -1,
  "Asteroids": 2,
  "Interference": 0,
  "VisBit": -1,
  "Con1": 136, "Con2": 137, "Con3": 165, "Con4": 164,
  "Con5": -1, "Con6": -1, "Con7": -1, "Con8": -1, 
  "Con9": -1, "Con10": -1, "Con11": -1, "Con12": -1, 
  "Con13": -1, "Con14": -1, "Con15": -1, "Con16": -1
}
*/

class SystemObject extends HTMLElement {
  static tag = this.name.split(/(?=[A-Z])/g).map(v=>v.toLowerCase()).join('-');
  static { customElements.define(this.tag, this); }
  get [Symbol.toStringTag]() { return `HTMLSystemObjectElement`; }

  static get syst() { return app.data.syst; }
  get systName() { return SystemObject.syst[this.systId].Name; }
  get systData() { return SystemObject.syst[this.systId].content; }

  #shadow = null;
  #parent = null;
  #nav = [];

  get nav() { return this.#nav; }

  constructor(parent) {
    super();

    this.#parent = parent;

    this.#shadow = this.attachShadow({mode: 'open'});
    /* setup shadow */
    let nIndex = 1;
    console.log('constructed base system')
  }

  /* setters and getters */

  static get observedAttributes() {
    return [ 'syst-id' ];
  }

  get systId() { return Number(this.getAttribute('syst-id')) || 0; }
  set systId(value) {
    this.setAttribute('syst-id', value);

    for ( let syst of this.#nav ) syst.remove(); 
    this.#nav.length = 0;
    let index = 1;
    while ( true ) {
      let navId = this.systData[`Nav${index++}`];
      if ( navId ) {
        if ( navId != -1 ) {
          const nav = new SpaceObject(this);
          nav.spobId = navId;
          this.#nav.push(nav);
        }
      } else break;
    }
    
    this.#shadow.append(...this.#nav);
  }

  attributeChangedCallback(attribute, oldValue, value) {
    if ( oldValue === value ) return;
    const getter = attribute.split('-').map((v,i) => i?v.slice(0,1).toUpperCase()+v.slice(1):v).join('');
    if ( getter in this ) this[getter] = value;
    else switch (attribute) {
      /* additional attributes with no getters */
      default: console.warn(`no callback for ${attribute}`);
    }
  }

  connectedCallback() {
    /* on append() */
  }

  disconnectedCallback() {
    /* on remove() */
  }

  adoptedCallback() {
    /* on not sure */
  }
};

document[`createSystemObject`] = function () {
  const element = new window['SystemObject']();
    /* do stuff */
    return element;
}

console.log(`<${SystemObject.tag}> now availble and createSystemObject() is available for use.`);