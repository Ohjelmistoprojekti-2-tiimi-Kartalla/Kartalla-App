import { Platform, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

// valkoinen: #F3F4F4
// tumman vihreä: #0E1815
// vihreä: #1A2E2C
// harmaa: #BEC8C8
// beige: #E8E2DA


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E2C',
  },
  map: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0E1815'
  },

  // MapScreen buttons
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
  filterButtonContainer: {
    position: "absolute",
    top: 70,
    right: 15,
    alignSelf: "flex-start",
  },
  filterButton: {
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

  distanceTextContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
    zIndex: 1000,
  },

  distanceText: {
    fontSize: 16,
    color: "#0E1815",
    backgroundColor: "#E8E2DA",
    padding: 15
    ,
    borderRadius: 10,
  },

  settingsTitle: {
    fontSize: 18,
    color: "#F3F4F4",
    margin: 20,
  },

  settingsText: {
    fontSize: 16,
    color: "#F3F4F4",
    marginLeft: 20,
    marginTop: 10,
    alignSelf: "center",
  },

  saveButton: {
    backgroundColor: "#E8E2DA",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: "#0E1815",
    fontWeight: "600",
  },

  savedText: {
    marginTop: 40,
    color: "#E8E2DA",
    alignSelf: "center",
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

  // FilterModal styles
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContent: {
    backgroundColor: '#F3F4F4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#0E1815',
  },
  filterModalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2b4c49ff',
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  filterOptionButton: {
    backgroundColor: '#e1e9e9ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    minWidth: '45%',
  },
  filterOptionButtonActive: {
    backgroundColor: '#E8E2DA',
    borderColor: '#1A2E2C',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#0E1815',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterOptionTextActive: {
    color: '#1A2E2C',
    fontWeight: '700',
  },
  filterModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  filterActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterClearButton: {
    backgroundColor: '#e1e9e9ff',
  },
  filterClearButtonText: {
    color: '#0E1815',
    fontSize: 16,
    fontWeight: '600',
  },
  filterApplyButton: {
    backgroundColor: '#1A2E2C',
  },
  filterApplyButtonText: {
    color: '#F3F4F4',
    fontSize: 16,
    fontWeight: '600',
  },

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

  //ActionButtons styles
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  primaryButtonVisited: {
    backgroundColor: '#2e7d32',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },


  //Amenities styles

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  amenityCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },



  //Description styles
  description: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },




  //LocationCard styles

  locationcard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2f26',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 8,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#6b8b7f',
  },
  icon: {
    padding: 16,
  },



  //metaInfo styles
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },


  //TabSwitcher styles
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#1a2f26',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    marginTop: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2d4a3e',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6b8b7f',
  },
  activeTabText: {
    color: '#fff',
  },


  //TitleSection styles
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,193,7,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '600',
  },



  //DestinationDetails styles
  destinationDetailContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  destinationDetailHeroSection: {
    position: 'relative',
    height: 320,
  },
  destinationDetailHeroImage: {
    width: screenWidth,
    height: 320,
    resizeMode: 'cover',
  },
  destinationDetailFloatingBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
  },
  destinationDetailFloatingActions: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  destinationDetailactionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  destinationDetaildotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  destinationDetailDot: {
    height: 6,
    borderRadius: 3,
  },
  destinationDetailActiveDot: {
    width: 20,
    backgroundColor: '#fff',
  },
  destinationDetailInactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  destinationDetailContent: {
    padding: 24,
  },
  destinationDetailTitleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  destinationDetailTitle: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginRight: 12,
  },
  destinationDetailRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,193,7,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  destinationDetailRatingText: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '600',
  },
  destinationDetailMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  destinationDetailMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  destinationDetailMetaText: {
    color: '#888',
    fontSize: 14,
  },
  destinationDetailDescription: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  destinationDetailSectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  destinationDetailAmenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  destinationDetailAmenityCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  destinationDetailAmenityIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationDetailAmenityText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  destinationDetailButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  destinationDetailSecondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  destinationDetailSecondaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  destinationDetailPrimaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  destinationDetailPrimaryButtonVisited: {
    backgroundColor: '#2e7d32',
  },
  destinationDetailPrimaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  destinationDetailModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  destinationDetailCloseModalButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationDetailFullscreenImage: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain',
  },
  destinationDetailModalDotsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  destinationDetailInfo: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  destinationDetailImageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  destinationDetailHeaderImage: {
    width: screenWidth,
    height: 180,
    borderRadius: 16,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 10,
  },


});