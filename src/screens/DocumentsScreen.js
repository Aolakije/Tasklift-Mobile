import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function DocumentsScreen({ navigation }) {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Project Proposal Q4.pdf',
      size: '2.4 MB',
      type: 'pdf',
      uploadedAt: '2024-10-14',
      uploadedBy: 'John Doe',
      uri: null,
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      size: '156 KB',
      type: 'docx',
      uploadedAt: '2024-10-13',
      uploadedBy: 'Jane Smith',
      uri: null,
    },
    {
      id: 3,
      name: 'Budget Spreadsheet.xlsx',
      size: '890 KB',
      type: 'xlsx',
      uploadedAt: '2024-10-12',
      uploadedBy: 'Mike Johnson',
      uri: null,
    },
    {
      id: 4,
      name: 'Design Mockups.zip',
      size: '15.8 MB',
      type: 'zip',
      uploadedAt: '2024-10-11',
      uploadedBy: 'Sarah Lee',
      uri: null,
    },
    {
      id: 5,
      name: 'Presentation Slides.pptx',
      size: '5.2 MB',
      type: 'pptx',
      uploadedAt: '2024-10-10',
      uploadedBy: 'John Doe',
      uri: null,
    },
  ]);

  const [filter, setFilter] = useState('all'); // all, pdf, images, documents

  // Pick a document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept all file types
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        
        // Get file extension
        const extension = file.name.split('.').pop().toLowerCase();
        
        // Add to documents list
        const newDoc = {
          id: Date.now(),
          name: file.name,
          size: formatFileSize(file.size),
          type: extension,
          uploadedAt: new Date().toISOString().split('T')[0],
          uploadedBy: 'You',
          uri: file.uri,
        };

        setDocuments([newDoc, ...documents]);
        Alert.alert('Success', `${file.name} uploaded successfully!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
      console.error(error);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Share document
  const shareDocument = async (document) => {
    try {
      if (document.uri) {
        await Share.share({
          message: `Check out this document: ${document.name}`,
          url: document.uri,
          title: document.name,
        });
      } else {
        await Share.share({
          message: `Document: ${document.name}\nSize: ${document.size}\nUploaded by: ${document.uploadedBy}`,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share document');
    }
  };

  // Delete document
  const deleteDocument = (id) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDocuments(documents.filter(doc => doc.id !== id));
          },
        },
      ]
    );
  };

  // Get file icon
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'document-text';
      case 'docx':
      case 'doc': return 'document';
      case 'xlsx':
      case 'xls': return 'stats-chart';
      case 'pptx':
      case 'ppt': return 'easel';
      case 'zip':
      case 'rar': return 'archive';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'image';
      default: return 'document-outline';
    }
  };

  // Get file color
  const getFileColor = (type) => {
    switch (type) {
      case 'pdf': return COLORS.error;
      case 'docx':
      case 'doc': return '#2563eb';
      case 'xlsx':
      case 'xls': return COLORS.success;
      case 'pptx':
      case 'ppt': return COLORS.warning;
      case 'zip':
      case 'rar': return COLORS.darkGray;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return COLORS.pinkMagenta;
      default: return COLORS.darkGray;
    }
  };

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    if (filter === 'all') return true;
    if (filter === 'pdf') return doc.type === 'pdf';
    if (filter === 'images') return ['jpg', 'jpeg', 'png', 'gif'].includes(doc.type);
    if (filter === 'documents') return ['doc', 'docx', 'txt'].includes(doc.type);
    return true;
  });

  // Storage stats
  const totalSize = documents.reduce((acc, doc) => {
    const size = parseFloat(doc.size);
    const unit = doc.size.split(' ')[1];
    if (unit === 'MB') return acc + size;
    if (unit === 'KB') return acc + size / 1024;
    return acc;
  }, 0);

  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('dashboard')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Documents</Text>
          <TouchableOpacity onPress={pickDocument}>
            <Ionicons name="cloud-upload" size={28} color={COLORS.accentOrange} />
          </TouchableOpacity>
        </View>

        {/* Storage Info */}
        <View style={styles.storageCard}>
          <View style={styles.storageInfo}>
            <Ionicons name="cloud-outline" size={32} color={COLORS.accentOrange} />
            <View style={styles.storageText}>
              <Text style={styles.storageUsed}>{totalSize.toFixed(1)} MB Used</Text>
              <Text style={styles.storageTotal}>of 100 MB</Text>
            </View>
          </View>
          <View style={styles.storageBar}>
            <View style={[styles.storageProgress, { width: `${(totalSize / 100) * 100}%` }]} />
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all', 'pdf', 'images', 'documents'].map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterTab, filter === f && styles.filterTabActive]}
                onPress={() => setFilter(f)}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Documents List */}
        <ScrollView style={styles.documentsList} showsVerticalScrollIndicator={false}>
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => (
              <TouchableOpacity key={doc.id} style={styles.documentCard}>
                <View style={[styles.fileIcon, { backgroundColor: getFileColor(doc.type) }]}>
                  <Ionicons name={getFileIcon(doc.type)} size={28} color={COLORS.white} />
                </View>

                <View style={styles.documentInfo}>
                  <Text style={styles.documentName} numberOfLines={1}>{doc.name}</Text>
                  <View style={styles.documentMeta}>
                    <Text style={styles.documentSize}>{doc.size}</Text>
                    <Text style={styles.documentDot}>•</Text>
                    <Text style={styles.documentDate}>{doc.uploadedAt}</Text>
                  </View>
                  <Text style={styles.documentUploader}>by {doc.uploadedBy}</Text>
                </View>

                <View style={styles.documentActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => shareDocument(doc)}
                  >
                    <Ionicons name="share-outline" size={20} color={COLORS.accentOrange} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => deleteDocument(doc.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={80} color={COLORS.lightGray} />
              <Text style={styles.emptyText}>No documents found</Text>
              <Text style={styles.emptySubtext}>
                {filter !== 'all' ? `No ${filter} files` : 'Upload your first document!'}
              </Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Upload FAB */}
        <TouchableOpacity style={styles.fab} onPress={pickDocument}>
          <LinearGradient
            colors={GRADIENTS.button}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add" size={32} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  storageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: 16,
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  storageText: {
    marginLeft: SPACING.md,
  },
  storageUsed: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  storageTotal: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  storageBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  storageProgress: {
    height: '100%',
    backgroundColor: COLORS.accentOrange,
  },
  filterContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  filterTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterTabActive: {
    backgroundColor: COLORS.accentOrange,
  },
  filterText: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  documentsList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  documentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  fileIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  documentName: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  documentSize: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  documentDot: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
    marginHorizontal: 4,
  },
  documentDate: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  documentUploader: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.5,
    fontStyle: 'italic',
  },
  documentActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    padding: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONTS.medium,
    color: COLORS.lightGray,
    marginTop: SPACING.xs,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});