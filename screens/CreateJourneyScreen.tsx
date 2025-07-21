import { RootStackParamList } from "@/app/(tabs)";
import { styles } from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useJourneys } from "../context/JourneyContext";

type CreateJourneyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateJourney"
>;

const categories = ["fitness", "home", "therapy", "skincare", "other"];

export default function CreateJourneyScreen() {
  const navigation = useNavigation<CreateJourneyScreenNavigationProp>();
  const { addJourney } = useJourneys();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("fitness");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateJourney = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title for your journey");
      return;
    }

    setLoading(true);
    try {
      await addJourney({
        title: title.trim(),
        category,
        photos: [],
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to create journey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Weight Loss Journey"
          maxLength={50}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes about your journey..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateJourney}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Creating..." : "Create Journey"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
