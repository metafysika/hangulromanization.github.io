import React, { useState, useEffect } from 'react';
import { HANGUL_TRIE } from '../data/hangul.trie.js';
import '../styles/Romanizer.css'; // We'll move styles here

const Romanizer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = (roman) => {
    const hangul = [];
    let node = HANGUL_TRIE;

    for (let i = roman.length - 1; i >= 0; --i) {
      const r = roman[i].toUpperCase();
      let next = node[r];

      if (!next && node["$"]) {
        hangul.push(node["$"]);
        next = HANGUL_TRIE[r];
      }

      if (!next) {
        if (roman[i] !== "-") hangul.push(roman[i]);
        next = HANGUL_TRIE;
      }

      node = next;
    }

    if (node["$"]) hangul.push(node["$"]);
    return hangul.reverse().join("");
  };

  useEffect(() => {
    setOutput(convert(input));
  }, [input]);

  return (
    <div id="title">
      <p style={{ fontWeight: 'bold' }}>
        Converts romanized text to Hangul.&nbsp;&nbsp;
        <span
          className="tooltip"
          data-text="Use a hyphen (-) to separate between syllables if needed. For example, baggeu (바끄) vs bag-geu (박그)."
        >
          <svg id="help" width="16" height="16" viewBox="0 0 48 48">
            <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24ZM24 20C23.3096 20 22.75 20.5596 22.75 21.25V33.75C22.75 34.4404 23.3096 35 24 35C24.6904 35 25.25 34.4404 25.25 33.75V21.25C25.25 20.5596 24.6904 20 24 20ZM24 17C25.1046 17 26 16.1046 26 15C26 13.8954 25.1046 13 24 13C22.8954 13 22 13.8954 22 15C22 16.1046 22.8954 17 24 17Z" />
          </svg>
        </span>
      </p>

      <div id="romanDiv">
        <p style={{ fontWeight: 'bold' }}>Romanized text:</p>
        <textarea
          id="roman"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input Romanized text here."
        />
      </div>

      <div id="hangulDiv">
        <p style={{ fontWeight: 'bold'}}>Hangul text:</p>
        <textarea
          id="hangul"
          value={output}
          readOnly
          placeholder="Hangul output will be displayed here."
        />
      </div>

      <footer id="about">
        <p>
          <span
            className="tooltip"
            data-text="This is an updated version of https://gimite.net/roman2hangul"
          >
            About
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Romanizer;