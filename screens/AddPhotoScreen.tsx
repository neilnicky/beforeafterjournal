import { RootStackParamList } from "@/app/(tabs)";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useJourneys } from "../context/JourneyContext";
import { styles } from "../styles/GlobalStyles";

type AddPhotoScreenRouteProp = RouteProp<RootStackParamList, "AddPhoto">;
type AddPhotoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddPhoto"
>;

export default function AddPhotoScreen() {
  const navigation = useNavigation<AddPhotoScreenNavigationProp>();
  const route = useRoute<AddPhotoScreenRouteProp>();
  const { addPhotoToJourney } = useJourneys();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState<"before" | "after">("before");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async (source: "camera" | "library") => {
    const permissionResult =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Permission to access camera/photos is required!"
      );
      return;
    }

    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert("Select Image", "Choose how to add your photo", [
      { text: "Camera", onPress: () => pickImage("camera") },
      { text: "Photo Library", onPress: () => pickImage("library") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSavePhoto = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    setLoading(true);
    try {
      await addPhotoToJourney(route.params.journeyId, {
        uri: imageUri,
        type: photoType,
        timestamp: new Date().toISOString(),
        notes: notes.trim() || undefined,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={showImagePicker}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="camera" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderText}>Tap to add photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Photo Type</Text>
        <View style={styles.typeContainer}>
          {(["before", "after"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                photoType === type && styles.typeButtonActive,
              ]}
              onPress={() => setPhotoType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  photoType === type && styles.typeTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes about this photo..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSavePhoto}
          disabled={loading || !imageUri}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Photo"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
