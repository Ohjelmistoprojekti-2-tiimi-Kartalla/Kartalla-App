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
});