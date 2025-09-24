import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type DropdownPropsType = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

type DropdownType = {
  label: string,
  value: string
}

// Dropdown data
const data:DropdownType[] = [
  { label: 'Business', value: 'Business' },
  { label: 'School', value: 'School' },
  { label: 'Family', value: 'Family' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Health', value: 'Health' },
];

export default function DropDown({ setCategory}: DropdownPropsType) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={styles.label}></Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fieldTitle}>Category</Text>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Select category"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategory(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 23
  },
  fieldTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#292828ff",
    borderColor: "#000000",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 14,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#a49d9dff"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#ffffff"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
})