import { theme } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  conversationsList: {
    paddingHorizontal: 0,
    paddingBottom: 80,
  },
  conversationCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "white",
  },
  conversationCardUnread: {
    backgroundColor: "#f9f9f9",
  },
  userImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f0f0f0",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "white",
  },
  conversationInfo: {
    flex: 1,
    justifyContent: "center",
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  userNameUnread: {
    fontWeight: "700",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#ccc",
  },
  timestampUnread: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  productTitle: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  productTitleUnread: {
    color: "#666",
    fontWeight: "500",
  },
  lastMessage: {
    fontSize: 13,
    color: "#999",
  },
  lastMessageUnread: {
    color: "#333",
    fontWeight: "500",
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginLeft: 12,
  },
});
