import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#bbdaa4",    
    paddingVertical: 4,            
    paddingHorizontal: 14,         
    borderRadius: 30,             
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#655252ff",
    fontSize: 14,               
    fontWeight: "bold",
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
markerCallout:{
  height:40,
  width:80,
  
}

});