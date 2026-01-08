import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography, Shadow } from '../constants/theme';
import { Company } from '../types/scenario';

interface Props {
  selectedCompany: Company | null;
  onSelect: (company: Company) => void;
}

// Mock company data - in production, this would come from your backend
const COMPANIES: Company[] = [
  { id: '1', name: 'Google', values: ['Innovation', 'Impact', 'Collaboration'] },
  { id: '2', name: 'Meta', values: ['Move Fast', 'Be Bold', 'Focus on Impact'] },
  { id: '3', name: 'Amazon', values: ['Customer Obsession', 'Ownership', 'Invent and Simplify'] },
  { id: '4', name: 'Microsoft', values: ['Innovation', 'Diversity', 'Corporate Responsibility'] },
  { id: '5', name: 'Apple', values: ['Innovation', 'Privacy', 'Environmental Responsibility'] },
  { id: '6', name: 'Netflix', values: ['Freedom', 'Responsibility', 'Context not Control'] },
  { id: '7', name: 'Tesla', values: ['Innovation', 'Sustainability', 'Excellence'] },
  { id: '8', name: 'Goldman Sachs', values: ['Client Service', 'Integrity', 'Excellence'] },
  { id: '9', name: 'McKinsey', values: ['Client Impact', 'Inclusive', 'Courage'] },
  { id: '10', name: 'Stripe', values: ['Users First', 'Move with Urgency', 'Think Rigorously'] },
];

export const CompanySelector: React.FC<Props> = ({ selectedCompany, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (company: Company) => {
    onSelect(company);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Company</Text>
      
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={selectedCompany ? styles.selectedText : styles.placeholderText}>
          {selectedCompany ? selectedCompany.name : 'Select a company'}
        </Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {selectedCompany && selectedCompany.values && (
        <View style={styles.valuesContainer}>
          {selectedCompany.values.map((value, index) => (
            <View key={index} style={styles.valuePill}>
              <Text style={styles.valueText}>{value}</Text>
            </View>
          ))}
        </View>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Company</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search companies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          <FlatList
            data={filteredCompanies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.companyItem}
                onPress={() => handleSelect(item)}
              >
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{item.name}</Text>
                  {item.values && (
                    <Text style={styles.companyValues}>
                      {item.values.join(' • ')}
                    </Text>
                  )}
                </View>
                {selectedCompany?.id === item.id && (
                  <Text style={styles.selectedIcon}>✓</Text>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadow.small,
  },
  selectedText: {
    ...Typography.body,
    color: Colors.text,
  },
  placeholderText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  arrow: {
    fontSize: 24,
    color: Colors.textLight,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
  },
  valuePill: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  valueText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  closeButton: {
    fontSize: 28,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    paddingVertical: Spacing.md,
  },
  listContent: {
    padding: Spacing.lg,
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  companyValues: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  selectedIcon: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});