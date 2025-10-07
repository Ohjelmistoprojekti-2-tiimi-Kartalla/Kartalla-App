import { StyleSheet } from "react-native";

// valkoinen: #F3F4F4
// tumman vihreä: #0E1815
// vihreä: #1A2E2C
// harmaa: #BEC8C8
// beige: #E8E2DA


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0E1815'
  },
  randomButtonContainer: {
    position: "absolute",
    top: 70,
    left: 60,
    alignSelf: "flex-start",
  },
  randomButton: {
    backgroundColor: "#F3F4F4",
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 40,
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  myLocationButtonContainer: {
    position: "absolute",
    top: 70,
    left: 15,
    alignSelf: "flex-start",
  },
  myLocationButton: {
    backgroundColor: "#F3F4F4",
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 40,
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  searchBar: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  /// ModalCard styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#F3F4F4",
    borderRadius: 12,
    padding: 16,
  },
  cardImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontSize: 18, color: "#0E1815", fontWeight: "bold", marginBottom: 6 },
  cardAddress: { fontSize: 14, color: "#555", marginBottom: 12 },
  viewButton: {
    backgroundColor: "#1A2E2C",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButtonText: { color: "#F3F4F4", fontWeight: "600" },
});