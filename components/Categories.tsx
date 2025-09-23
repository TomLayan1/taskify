import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { CATEGORYDEMO } from '../data'
import { CategoryDemoType } from '../interface'

export default function Categories() {
  const categories: CategoryDemoType[] = CATEGORYDEMO;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CATEGORIES</Text>
      <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
          renderItem={({ item }) => {
            return (
              <View style={styles.categoryType}>
                <Text style={styles.task}>{item.taskCount} tasks</Text>
                <Text style={styles.categoryName}>{item.categoryName}</Text>
                <View style={styles.progressOut}>
                  <View style={[styles.progressIn, { width: `${item.taskCount}%`}]}></View>
                </View>
              </View>
            )
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginBottom: 23
  },
  title: {
    color: "#e8ff54",
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 20
  },
  contentContainer: {
    // gap: 13
  },
  categoryType: {
    backgroundColor: "#292828ff",
    paddingVertical: 19,
    paddingHorizontal: 15,
    width: 180,
    borderRadius: 20,
    borderColor: "#ffffff",
    borderWidth: 0.2
  },
  task: {
    color: "#e8ff54",
    fontSize: 14,
    fontWeight: "200",
    marginBottom: 8
  },
  categoryName: {
    color: "white",
    fontSize: 24,
    marginBottom: 13
  },
  progressOut: {
    backgroundColor: "#000000",
    width: "100%",
    height: 2
  },
  progressIn: {
    height: "100%",
    backgroundColor: "#e8ff54"
  }
})