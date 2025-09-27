import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type TimePickerProps = {
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimePicker({ setTime, setIsEditing }: TimePickerProps) {
  const [hours, setHours] = useState<number>(12);
  const [minutes, setMinutes] = useState<number>(0);
  const [timeOfDay, setTimeOfDay] = useState<"AM" | "PM">("AM")


  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const toggleTimeOfDay = () => {
    setTimeOfDay(prev => prev === "AM" ? "PM" : "AM")
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        {/* Hours */}
        <View style={styles.section}>
          <Pressable onPress={() => setHours((h) => (h % 12) + 1)}>
            <Text style={styles.arrow}>▲</Text>
          </Pressable>
          <Text style={styles.time}>{formatTime(hours)}</Text>
          <Pressable onPress={() => setHours((h) => (h - 2 + 12) % 12 + 1)}>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        <Text style={styles.colon}>:</Text>

        {/* Minutes */}
        <View style={styles.section}>
          <Pressable onPress={() => setMinutes((m) => (m + 1) % 60)}>
            <Text style={styles.arrow}>▲</Text>
          </Pressable>
          <Text style={styles.time}>{formatTime(minutes)}</Text>
          <Pressable onPress={() => setMinutes((m) => (m - 1 + 60) % 60)}>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        {/* Time of Day */}
        <View style={styles.timeOfDaySection}>
          <Pressable onPress={toggleTimeOfDay}>
            <Text style={styles.arrow}>▲</Text>
          </Pressable>
          <Text style={styles.timeOfDay}>{timeOfDay}</Text>
          <Pressable onPress={toggleTimeOfDay}>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>
      </View>

      {/* Confirm Button */}
      <Pressable
        style={styles.confirmBtn}
        onPress={() => {setTime(`${formatTime(hours)}:${formatTime(minutes)} ${timeOfDay}`), setIsEditing(false)}}
      >
        <Text style={styles.confirmText}>Set Time</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    alignItems: "center",
  },
  arrow: {
    color: "white",
    fontSize: 25,
  },
  time: {
    color: "white",
    fontSize: 40,
    marginVertical: 5,
    fontWeight: "bold",
  },
  timeOfDaySection: {
    alignItems: "center",
    marginLeft: 10
  },
  timeOfDay: {
    color: "white",
    fontSize: 34,
    marginVertical: 5,
    fontWeight: "bold",
  },
  colon: {
    color: "white",
    fontSize: 40,
    marginHorizontal: 10,
  },
  confirmBtn: {
    backgroundColor: "#24ac5fff",
    marginLeft: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmText: {
    color: "#000000",
    fontSize: 16,
  },
})