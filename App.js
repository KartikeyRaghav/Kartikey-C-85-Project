import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';
import { dummyData } from './components/Data';

const extractItemKey = (item) => {
  return item.id.toString();
};

const Item = ({ item, backgroundColor, textColor, deleteItem }) => {
  return (
    <>
      <View style={styles.item}>
        <View style={styles.messageContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </>
  );
};

function renderItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

const App = () => {
  const [data, setData] = useState(dummyData);

  const deleteItem = (itemId) => {
    const newState = [...data];
    const filteredState = newState.filter((item) => item.id !== itemId);
    return setData(filteredState);
  };

  const QuickActions = (index, qaItem) => {
    return (
      <View style={styles.qaContainer}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => deleteItem(qaItem.id)}>
            <Text style={styles.button3Text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwipeableFlatList
        keyExtractor={extractItemKey}
        data={data}
        renderItem={({ item }) => (
          <Item item={item} deleteItem={() => deleteItem} />
        )}
        maxSwipeDistance={80}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        contentContainerStyle={styles.contentContainerStyle}
        shouldBounceOnMount={true}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  },
  item: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  messageContainer: {
    maxWidth: 300,
    backgroundColor: 'black',
  },
  name: {
    fontSize: 40,
    fontWeight: '800',
    color: 'white',
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  button3Text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
