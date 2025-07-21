import { RootStackParamList } from "@/app/(tabs)";
import { styles } from "@/styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useJourneys } from "../context/JourneyContext";
import { Journey } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { journeys, loading, deleteJourney } = useJourneys();

  const handleDeleteJourney = (journey: Journey) => {
    Alert.alert(
      "Delete Journey",
      `Are you sure you want to delete "${journey.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteJourney(journey.id),
        },
      ]
    );
  };

  const renderJourneyItem = ({ item }: { item: Journey }) => (
    <View style={styles.journeyCard}>
      <View style={styles.journeyInfo}>
        <Text style={styles.journeyTitle}>{item.title}</Text>
        <Text style={styles.journeyCategory}>{item.category}</Text>
        <Text style={styles.journeyMeta}>
          {item.photos.length} photos •{" "}
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.journeyActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("AddPhoto", { journeyId: item.id })
          }
        >
          <Ionicons name="camera" size={20} color="#3B82F6" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("Timeline", { journeyId: item.id })
          }
        >
          <Ionicons name="time" size={20} color="#3B82F6" />
        </TouchableOpacity>

        {item.photos.filter((p) => p.type === "before").length > 0 &&
          item.photos.filter((p) => p.type === "after").length > 0 && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("Compare", { journeyId: item.id })
              }
            >
              <Ionicons name="git-compare" size={20} color="#3B82F6" />
            </TouchableOpacity>
          )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteJourney(item)}
        >
          <Ionicons name="trash" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Journeys</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateJourney")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {journeys.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="journal" size={64} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No journeys yet</Text>
          <Text style={styles.emptySubtitle}>
            Create your first journey to start tracking progress
          </Text>
        </View>
      ) : (
        <FlatList
          data={journeys}
          renderItem={renderJourneyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}
