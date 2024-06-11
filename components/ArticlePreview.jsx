import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ArticlePreview = ({ article }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} /> {/* Ou une image par défaut */}
      <Text style={styles.title}>{article.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0AE88',
      },
});
