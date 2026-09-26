import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView } from 'react-native';

export default function InputScreen({ onScan }) {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PromptGuard</Text>
      <Text style={styles.subtitle}>
        Paste a system prompt or user-input string. We'll check it for known
        jailbreak and prompt-injection patterns.
      </Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Paste your prompt here..."
        placeholderTextColor="#8a8f98"
        value={text}
        onChangeText={setText}
      />

      <Pressable
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        disabled={!text.trim()}
        onPress={() => onScan(text)}
      >
        <Text style={styles.buttonText}>Scan Prompt</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0d1117' },
  title: { fontSize: 28, fontWeight: '700', color: '#fff', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#8a8f98', marginTop: 8, marginBottom: 20, lineHeight: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: '#161b22',
  },
  button: {
    backgroundColor: '#2f81f7',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  buttonDisabled: { backgroundColor: '#30363d' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});