import { RootStackParamList } from "@/app/(tabs)";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useJourneys } from "../context/JourneyContext";
import { styles } from "@/styles/GlobalStyles";

type TimelineScreenRouteProp = RouteProp<RootStackParamList, "Timeline">;

export default function TimelineScreen() {
  const route = useRoute<TimelineScreenRouteProp>();
  const { journeys } = useJourneys();

  const journey = journeys.find((j) => j.id === route.params.journeyId);

  const sortedPhotos =
    journey?.photos.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ) || [];

  if (!journey || sortedPhotos.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="time" size={64} color="#9CA3AF" />
        <Text style={styles.emptyTitle}>No photos in timeline</Text>
        <Text style={styles.emptySubtitle}>
          Add some photos to see your progress timeline
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{journey.title}</Text>
        <Text style={styles.subtitle}>{journey.category}</Text>
      </View>

      <View style={styles.timeline}>
        {sortedPhotos.map((photo, index) => (
          <View key={photo.id} style={styles.timelineItem}>
            <View style={styles.timelineMarker}>
              <View
                style={[
                  styles.typeIndicator,
                  {
                    backgroundColor:
                      photo.type === "before" ? "#EF4444" : "#10B981",
                  },
                ]}
              />
              {index < sortedPhotos.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>

            <View style={styles.timelineContent}>
              <View style={styles.photoHeader}>
                <Text style={styles.photoType}>
                  {photo.type.charAt(0).toUpperCase() + photo.type.slice(1)}
                </Text>
                <Text style={styles.photoTimestamp}>
                  {new Date(photo.timestamp).toLocaleDateString()} at{" "}
                  {new Date(photo.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <Image source={{ uri: photo.uri }} style={styles.timelineImage} />

              {photo.notes && (
                <Text style={styles.photoNotes}>{photo.notes}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
