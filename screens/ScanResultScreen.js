import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView } from 'react-native';

const SEVERITY_COLOR = { high: '#f85149', medium: '#d29922', low: '#3fb950', clean: '#3fb950' };

export default function ScanResultScreen({ matches, risk, isEntitled, onDeepScan, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onBack}><Text style={styles.back}>‹ Back</Text></Pressable>

      <View style={[styles.riskBanner, { borderColor: SEVERITY_COLOR[risk] }]}>
        <Text style={[styles.riskText, { color: SEVERITY_COLOR[risk] }]}>
          {risk === 'clean' ? 'No known patterns matched' : `${risk.toUpperCase()} risk`}
        </Text>
        <Text style={styles.riskCount}>{matches.length} pattern(s) matched</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {matches.map((m) => (
          <View key={m.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>{m.label}</Text>
              <Text style={[styles.badge, { color: SEVERITY_COLOR[m.severity] }]}>{m.severity}</Text>
            </View>
            <Text style={styles.cardDesc}>{m.description}</Text>
            <Text style={styles.cardFix}>Fix: {m.fixSuggestion}</Text>
          </View>
        ))}

        {matches.length === 0 && (
          <Text style={styles.emptyState}>
            No matches from the static library. Run a deep scan for AI-generated
            adversarial testing beyond known patterns.
          </Text>
        )}
      </ScrollView>

      <Pressable style={styles.deepScanButton} onPress={onDeepScan}>
        <Text style={styles.deepScanText}>
          {isEntitled ? 'Run AI Deep Scan' : 'Unlock AI Deep Scan (Pro)'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0d1117' },
  back: { color: '#2f81f7', fontSize: 16, marginBottom: 12 },
  riskBanner: { borderWidth: 1.5, borderRadius: 10, padding: 14, marginBottom: 16 },
  riskText: { fontSize: 18, fontWeight: '700' },
  riskCount: { color: '#8a8f98', fontSize: 13, marginTop: 4 },
  card: { backgroundColor: '#161b22', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#30363d' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: '#fff', fontWeight: '600', fontSize: 15, flex: 1 },
  badge: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  cardDesc: { color: '#8a8f98', fontSize: 13, marginTop: 6, lineHeight: 18 },
  cardFix: { color: '#3fb950', fontSize: 13, marginTop: 8, lineHeight: 18 },
  emptyState: { color: '#8a8f98', fontSize: 14, textAlign: 'center', marginTop: 30, lineHeight: 20 },
  deepScanButton: { backgroundColor: '#2f81f7', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  deepScanText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});