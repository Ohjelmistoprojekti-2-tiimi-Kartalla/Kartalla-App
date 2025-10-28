import { Platform, StyleSheet } from "react-native";

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
  line: {
    borderWidth: 0.5,
    borderColor: '#bbbbbb',
    width: '100%',
    marginVertical: 20,
  },
  commentButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 50 : 20
  },
  commentInputContainer: {
  },
  textArea: {
    textAlignVertical: 'top',
    height: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  details: {
  },
  centeredViewComment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    fontSize: 18,
    paddingLeft: 5,
    paddingVertical: 5,
  },
  CommentComponentContainer: {
    width: "100%",
    marginBottom: 20
  },
});