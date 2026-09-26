import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

export default function DeepScanScreen({ loading, result, error, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onBack}><Text style={styles.back}>‹ Back</Text></Pressable>
      <Text style={styles.title}>AI Deep Scan</Text>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator color="#2f81f7" size="large" />
          <Text style={styles.loadingText}>Generating adversarial variants…</Text>
        </View>
      )}

      {error && !loading && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {result && !loading && (
        <ScrollView>
          <Text style={styles.sectionTitle}>Novel attack variants that got through</Text>
          {result.variants.map((v, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.variantText}>{v}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Hardened rewrite</Text>
          <View style={styles.card}>
            <Text style={styles.variantText}>{result.hardenedPrompt}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0d1117' },
  back: { color: '#2f81f7', fontSize: 16, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  center: { alignItems: 'center', marginTop: 60 },
  loadingText: { color: '#8a8f98', marginTop: 12 },
  errorText: { color: '#f85149', fontSize: 14, marginTop: 20 },
  sectionTitle: { color: '#fff', fontWeight: '600', fontSize: 15, marginTop: 18, marginBottom: 8 },
  card: { backgroundColor: '#161b22', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#30363d' },
  variantText: { color: '#c9d1d9', fontSize: 14, lineHeight: 20 },
});