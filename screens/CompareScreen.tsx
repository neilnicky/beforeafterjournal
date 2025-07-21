import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useJourneys } from "../context/JourneyContext";
import { PhotoEntry } from "../types";
import { styles } from "@/styles/GlobalStyles";
import { RootStackParamList } from "@/app/(tabs)";

type CompareScreenRouteProp = RouteProp<RootStackParamList, "Compare">;

const { width: screenWidth } = Dimensions.get("window");

export default function CompareScreen() {
  const route = useRoute<CompareScreenRouteProp>();
  const { journeys } = useJourneys();
  const [viewMode, setViewMode] = useState<"side-by-side" | "slider">(
    "side-by-side"
  );
  const [selectedBeforeIndex, setSelectedBeforeIndex] = useState(0);
  const [selectedAfterIndex, setSelectedAfterIndex] = useState(0);

  const journey = journeys.find((j) => j.id === route.params.journeyId);

  const beforePhotos = useMemo(
    () =>
      journey?.photos
        .filter((p) => p.type === "before")
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ) || [],
    [journey]
  );

  const afterPhotos = useMemo(
    () =>
      journey?.photos
        .filter((p) => p.type === "after")
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ) || [],
    [journey]
  );

  if (!journey || beforePhotos.length === 0 || afterPhotos.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="images" size={64} color="#9CA3AF" />
        <Text style={styles.emptyTitle}>No photos to compare</Text>
        <Text style={styles.emptySubtitle}>
          You need at least one <i> before</i> and one <i>after</i> photo to
          compare
        </Text>
      </View>
    );
  }

  const selectedBefore = beforePhotos[selectedBeforeIndex];
  const selectedAfter = afterPhotos[selectedAfterIndex];

  const renderPhotoSelector = (
    photos: PhotoEntry[],
    selectedIndex: number,
    onSelect: (index: number) => void,
    type: "before" | "after"
  ) => (
    <View style={styles.photoSelector}>
      <Text style={styles.selectorTitle}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Photos
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.map((photo, index) => (
          <TouchableOpacity
            key={photo.id}
            style={[
              styles.thumbnailButton,
              selectedIndex === index && styles.thumbnailButtonActive,
            ]}
            onPress={() => onSelect(index)}
          >
            <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
            <Text style={styles.thumbnailDate}>
              {new Date(photo.timestamp).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{journey.title}</Text>
        <View style={styles.viewModeSelector}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              viewMode === "side-by-side" && styles.modeButtonActive,
            ]}
            onPress={() => setViewMode("side-by-side")}
          >
            <Text
              style={[
                styles.modeButtonText,
                viewMode === "side-by-side" && styles.modeButtonTextActive,
              ]}
            >
              Side by Side
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderPhotoSelector(
        beforePhotos,
        selectedBeforeIndex,
        setSelectedBeforeIndex,
        "before"
      )}
      {renderPhotoSelector(
        afterPhotos,
        selectedAfterIndex,
        setSelectedAfterIndex,
        "after"
      )}

      <View style={styles.comparisonContainer}>
        <View style={styles.photoComparison}>
          <View style={styles.photoContainer}>
            <Text style={styles.photoLabel}>Before</Text>
            <Image
              source={{ uri: selectedBefore.uri }}
              style={styles.comparisonImage}
            />
            <Text style={styles.photoDate}>
              {new Date(selectedBefore.timestamp).toLocaleDateString()}
            </Text>
            {selectedBefore.notes && (
              <Text style={styles.photoNotes}>{selectedBefore.notes}</Text>
            )}
          </View>

          <View style={styles.photoContainer}>
            <Text style={styles.photoLabel}>After</Text>
            <Image
              source={{ uri: selectedAfter.uri }}
              style={styles.comparisonImage}
            />
            <Text style={styles.photoDate}>
              {new Date(selectedAfter.timestamp).toLocaleDateString()}
            </Text>
            {selectedAfter.notes && (
              <Text style={styles.photoNotes}>{selectedAfter.notes}</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
