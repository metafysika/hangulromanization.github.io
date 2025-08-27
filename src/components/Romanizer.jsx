import React, { useState, useEffect } from 'react';
import {
  Textarea,
  Text,
  Tooltip,
  Card,
  tokens,
  Button,
  makeStyles,
  shorthands,
  useFluent,
} from '@fluentui/react-components';
import { HANGUL_TRIE } from '../data/hangul.trie.js';
import './Romanizer.css';

// Theme-aware styles using makeStyles and tokens
const useStyles = makeStyles({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: '32px',
    maxWidth: '960px',
    margin: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    boxShadow: tokens.shadow16,
    boxSizing: 'border-box',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '16px',
  },
  card: {
    flex: 1,
    width: '100%',
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow8,
    boxSizing: 'border-box',
  },
  label: {
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
  },
  textarea: {
    width: '100%',
    height: '100%',
    marginTop: '8px',
    fontSize: '16px',
    padding: '12px',
    minHeight: '120px',
    touchAction: 'manipulation',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  clearButton: {
    marginTop: '12px',
    alignSelf: 'flex-end',
  },
  footer: {
    marginTop: '32px',
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },
});

const Romanizer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const styles = useStyles();
  const { theme } = useFluent();

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
    <div className={styles.root}>
      <Text size={600} weight="semibold" style={{ marginBottom: '16px' }}>
        Romanization → Hangul Converter
      </Text>
      <br />
      <Text size={300} style={{ marginBottom: '24px', color: tokens.colorNeutralForeground3 }}>
        Converts romanized text to Hangul.
      </Text>
      <br /><br />
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <Tooltip content="Use a hyphen (-) to separate syllables. E.g., baggeu (바끄) vs bag-geu (박그)">
            <Text weight="semibold" className={styles.label}>Romanized Text</Text>
          </Tooltip>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Romanized Korean here"
            resize="vertical"
            className={styles.textarea}
          />
        </Card>

        <Card className={styles.card}>
          <Text weight="semibold" className={styles.label}>Hangul Output</Text>
          <Textarea
            value={output}
            readOnly
            placeholder="Hangul output will appear here"
            resize="vertical"
            className={styles.textarea}
          />
        </Card>
      </div>
    <Button
        appearance="secondary"
        disabled={!input}
        onClick={() => {
            setInput('');
            setOutput('');
        }}
        className={styles.clearButton}
    >
        Clear
    </Button>
    <Button
        appearance="primary"
        disabled={!output}
        style={{ marginLeft: '8px' }}
        onClick={() => {
        navigator.clipboard.writeText(output);
        }}
        className={styles.clearButton}
    >
        Copy
    </Button>

    <br /><br />
    <Text size={200} className={styles.footer}>
        Inspired by <a href="https://gimite.net/roman2hangul" target="_blank" rel="noopener noreferrer">gimite.net/roman2hangul</a>
    </Text>
    </div>
  );
};

export default Romanizer;