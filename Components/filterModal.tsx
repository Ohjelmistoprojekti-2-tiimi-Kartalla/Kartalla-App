import React, { useState } from 'react';
import {Modal,View, Text, TouchableOpacity, Pressable,} from 'react-native';
import { styles } from '../styles';

export type FilterOption = {
    id: string;
    label: string;
    minKm: number;
    maxKm: number;
};

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApplyFilter: (filter: FilterOption | null) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({visible, onClose, onApplyFilter}) => {
    const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);

    const filterOptions: FilterOption[] = [
        { id: 'under3', label: 'Alle 3 km', minKm: 0, maxKm: 3 },
        { id: '3to5', label: '3-5 km', minKm: 3, maxKm: 5 },
        { id: '5to10', label: '5-10 km', minKm: 5, maxKm: 10 },
        { id: 'over10', label: 'Yli 10 km', minKm: 10, maxKm: Infinity },
    ];

    const handleFilterSelect = (filter: FilterOption) => {
        setSelectedFilter(filter);
    };

    const applyFilter = () => {
        if (selectedFilter) {
            onApplyFilter(selectedFilter);
        }
        onClose();
    };

    const clearFilter = () => {
        setSelectedFilter(null);
        onApplyFilter(null);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.filterModalOverlay}
                onPress={onClose}
            >
                <Pressable style={styles.filterModalContent} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.filterModalTitle}>Suodata kohteita</Text>
                    <Text style={styles.filterModalSubtitle}>Reitin pituus</Text>

                    <View style={styles.filterOptionsContainer}>
                        {filterOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.filterOptionButton,
                                    selectedFilter?.id === option.id && styles.filterOptionButtonActive,
                                ]}
                                onPress={() => handleFilterSelect(option)}
                            >
                                <Text
                                    style={[
                                        styles.filterOptionText,
                                        selectedFilter?.id === option.id && styles.filterOptionTextActive,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.filterModalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.filterActionButton, styles.filterClearButton]}
                            onPress={clearFilter}
                        >
                            <Text style={styles.filterClearButtonText}>Tyhjennä</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.filterActionButton, styles.filterApplyButton]}
                            onPress={applyFilter}
                        >
                            <Text style={styles.filterApplyButtonText}>Käytä</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default FilterModal;