import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export const PastTrades = ({ trades }) => { // trades est un tableau d'objets représentant les trocs
  return (
    <FlatList
      data={trades}
      renderItem={({ item }) => (
        <View style={styles.tradeItem}>
          <Text>Article échangé : {item.articleName}</Text>
          <Text>Avec : {item.otherUserName}</Text>
          <Text>Date : {item.date}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id} 
    />
  );
};

const styles = StyleSheet.create({
  // ... vos styles
});
