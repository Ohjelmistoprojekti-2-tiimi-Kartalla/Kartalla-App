import { StyleSheet } from "react-native";

// valkoinen: #F3F4F4

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  randomButtonContainer: {
    position: "absolute",
    top: 70,
    left: 15,
    alignSelf: "flex-start",
  },
  randomButton: {
    backgroundColor: "#F3F4F4",
    paddingVertical: 4,
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

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#bbdaa4",
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  floatingButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#655252ff",
  },
  markerCallout: {
    height: 40,
    width: 80,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});