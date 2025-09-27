import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useTaskifyStore } from '../taskifyStore';

export default function Categories() {
  const { getCategoryCounts } = useTaskifyStore();
  const categories = getCategoryCounts();
  console.log("Categories: ", categories.length);

  return (
    <>
      {
        categories.length > 0 &&
        <View style={styles.container}>
          <Text style={styles.title}>CATEGORIES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(item => (
              <View key={item.id} style={styles.categoryType}>
                <Text style={styles.task}>{item.taskCount} tasks</Text>
                <Text style={styles.categoryName}>{item.categoryName}</Text>
                <View style={styles.progressOut}>
                  <View style={[styles.progressIn, { width: `${item.taskCount}%`}]}></View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginBottom: 23
  },
  title: {
    color: "#24ac5fff",
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 20
  },
  categoryType: {
    backgroundColor: "#292828ff",
    paddingVertical: 19,
    paddingHorizontal: 15,
    width: 180,
    borderRadius: 20,
    borderColor: "#ffffff",
    borderWidth: 0.2,
    marginRight: 22
  },
  task: {
    color: "#24ac5fff",
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
    backgroundColor: "#24ac5fff"
  }
})