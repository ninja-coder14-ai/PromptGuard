import React, { useState } from 'react';
import InputScreen from './screens/InputScreen';
import ScanResultScreen from './screens/ScanResultScreen';
import DeepScanScreen from './screens/DeepScanScreen';
import { scanPrompt, overallRisk, deepScan } from './utils/scanner';

async function checkEntitlement() {
  return false;
}

export default function App() {
  const [screen, setScreen] = useState('input');
  const [promptText, setPromptText] = useState('');
  const [matches, setMatches] = useState([]);
  const [isEntitled, setIsEntitled] = useState(false);
  const [deepLoading, setDeepLoading] = useState(false);
  const [deepResult, setDeepResult] = useState(null);
  const [deepError, setDeepError] = useState(null);

  async function handleScan(text) {
    setPromptText(text);
    setMatches(scanPrompt(text));
    setIsEntitled(await checkEntitlement());
    setScreen('result');
  }

  async function handleDeepScan() {
    const entitled = await checkEntitlement();
    if (!entitled) {
      alert('Deep scan is a Pro feature. Wire the RevenueCat paywall here.');
      return;
    }
    setScreen('deep');
    setDeepLoading(true);
    setDeepError(null);
    try {
      const result = await deepScan(promptText, entitled);
      setDeepResult(result);
    } catch (e) {
      setDeepError(e.message);
    } finally {
      setDeepLoading(false);
    }
  }

  return (
    <>
      {screen === 'input' && <InputScreen onScan={handleScan} />}
      {screen === 'result' && (
        <ScanResultScreen
          matches={matches}
          risk={overallRisk(matches)}
          isEntitled={isEntitled}
          onDeepScan={handleDeepScan}
          onBack={() => setScreen('input')}
        />
      )}
      {screen === 'deep' && (
        <DeepScanScreen
          loading={deepLoading}
          result={deepResult}
          error={deepError}
          onBack={() => setScreen('result')}
        />
      )}
    </>
  );
}