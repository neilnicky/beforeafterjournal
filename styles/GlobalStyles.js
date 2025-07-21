import { StyleSheet } from "react-native";

// Styles for all screens
export const styles = StyleSheet.create({
  // HomeScreen styles
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 20,
  },
  journeyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  journeyInfo: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  journeyCategory: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
    marginBottom: 4,
  },
  journeyMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  journeyActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },

  // CreateJourneyScreen styles
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  categoryText: {
    fontSize: 14,
    color: "#6B7280",
  },
  categoryTextActive: {
    color: "white",
  },
  createButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  createButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // AddPhotoScreen styles
  imagePickerButton: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderContainer: {
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 16,
    color: "#9CA3AF",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  typeText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  typeTextActive: {
    color: "white",
  },
  saveButton: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  saveButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // CompareScreen styles
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textTransform: "capitalize",
  },
  viewModeSelector: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 4,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modeButtonActive: {
    backgroundColor: "white",
  },
  modeButtonText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  modeButtonTextActive: {
    color: "#1F2937",
  },
  photoSelector: {
    margin: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  thumbnailButton: {
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  thumbnailButtonActive: {
    borderColor: "#3B82F6",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  thumbnailDate: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  comparisonContainer: {
    margin: 20,
  },
  photoComparison: {
    flexDirection: "row",
    gap: 12,
  },
  photoContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    paddingVertical: 8,
    backgroundColor: "#1F2937",
  },
  comparisonImage: {
    width: "100%",
    height: 250,
  },
  photoDate: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    padding: 8,
  },
  photoNotes: {
    fontSize: 14,
    color: "#4B5563",
    padding: 12,
    paddingTop: 0,
    fontStyle: "italic",
  },

  // TimelineScreen styles
  timeline: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timelineMarker: {
    alignItems: "center",
    marginRight: 16,
  },
  typeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoHeader: {
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  photoType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  photoTimestamp: {
    fontSize: 12,
    color: "#6B7280",
  },
  timelineImage: {
    width: "100%",
    height: 200,
  },
});
