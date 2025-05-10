import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

export default function MainFeature() {
  // Create icon components
  const BriefcaseIcon = getIcon('Briefcase');
  const UsersIcon = getIcon('Users');
  const PlusIcon = getIcon('Plus');
  const ChevronDownIcon = getIcon('ChevronDown');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const EyeIcon = getIcon('Eye');
  const PencilIcon = getIcon('Pencil');
  const TrashIcon = getIcon('Trash');
  const ClipboardIcon = getIcon('Clipboard');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ClockIcon = getIcon('Clock');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  
  // Form states
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [editMatter, setEditMatter] = useState(null);
  
  // Form states for new matter
  const [newMatter, setNewMatter] = useState({
    title: '',
    client: '',
    practiceArea: '',
    description: '',
  });
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  // Mock matters data
  const [matters, setMatters] = useState([
    {
      id: '1',
      title: 'Johnson v. Smith',
      client: 'Robert Johnson',
      status: 'active',
      practiceArea: 'Litigation',
      dateOpened: '2023-09-15',
      description: 'Personal injury case regarding automobile accident on Highway 101.',
      lastActivity: '2 hours ago',
      totalDocuments: 24,
      associates: ['Jane Wilson', 'Mark Thomas']
    },
    {
      id: '2',
      title: 'Martin Estate Planning',
      client: 'Sarah Martin',
      status: 'pending',
      practiceArea: 'Estate Planning',
      dateOpened: '2023-10-05',
      description: 'Comprehensive estate planning including will, trusts, and power of attorney.',
      lastActivity: 'Yesterday',
      totalDocuments: 8,
      associates: ['Jane Wilson']
    },
    {
      id: '3',
      title: 'Williams Incorporation',
      client: 'David Williams',
      status: 'completed',
      practiceArea: 'Corporate',
      dateOpened: '2023-08-22',
      dateClosed: '2023-10-11',
      description: 'Business incorporation and initial corporate document preparation.',
      lastActivity: '3 weeks ago',
      totalDocuments: 16,
      associates: ['Mark Thomas']
    },
    {
      id: '4',
      title: 'Garcia Divorce Proceedings',
      client: 'Maria Garcia',
      status: 'active',
      practiceArea: 'Family Law',
      dateOpened: '2023-10-01',
      description: 'Divorce case including child custody and asset division negotiations.',
      lastActivity: 'Today',
      totalDocuments: 31,
      associates: ['Jane Wilson', 'Alex Chen']
    },
  ]);
  
  // Practice area options
  const practiceAreas = [
    'Litigation',
    'Corporate',
    'Estate Planning',
    'Family Law',
    'Immigration',
    'Real Estate',
    'Tax',
    'Intellectual Property',
    'Criminal Defense'
  ];
  
  // Clients options
  const clients = [
    'Robert Johnson',
    'Sarah Martin',
    'David Williams',
    'Maria Garcia',
    'Alex Chen',
    'Patricia Moore',
    'James Wilson'
  ];
  
  // Filter matters based on search and status
  const filteredMatters = matters.filter(matter => {
    const matchesSearch = 
      matter.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      matter.client.toLowerCase().includes(filterValue.toLowerCase()) ||
      matter.practiceArea.toLowerCase().includes(filterValue.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || matter.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle create matter form submission
  const handleCreateMatter = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = {};
    if (!newMatter.title.trim()) validationErrors.title = "Matter title is required";
    if (!newMatter.client) validationErrors.client = "Client is required";
    if (!newMatter.practiceArea) validationErrors.practiceArea = "Practice area is required";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Create new matter
    const createdMatter = {
      id: Date.now().toString(),
      ...newMatter,
      dateOpened: new Date().toISOString().split('T')[0],
      status: 'active',
      lastActivity: 'Just now',
      totalDocuments: 0,
      associates: []
    };
    
    // Add to matters list
    setMatters([createdMatter, ...matters]);
    
    // Reset form and close modal
    setNewMatter({
      title: '',
      client: '',
      practiceArea: '',
      description: '',
    });
    setErrors({});
    setShowCreateModal(false);
    
    // Show success notification
    toast.success("Matter created successfully", {
      icon: <BriefcaseIcon className="h-5 w-5 text-green-500" />
    });
  };
  
  // Handle input change for new matter form
  const handleEditMatter = (matter) => {
    setEditMatter({
      id: matter.id,
      title: matter.title,
      client: matter.client,
      practiceArea: matter.practiceArea,
      description: matter.description || '',
    });
    setShowEditModal(true);
    setSelectedMatter(null); // Close view modal if open
  };
  
  const handleUpdateMatter = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = {};
    if (!editMatter.title.trim()) validationErrors.title = "Matter title is required";
    if (!editMatter.client) validationErrors.client = "Client is required";
    if (!editMatter.practiceArea) validationErrors.practiceArea = "Practice area is required";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Update the matter in the array
    const updatedMatters = matters.map(matter => 
      matter.id === editMatter.id 
        ? { ...matter, ...editMatter, lastActivity: 'Just now' }
        : matter
    );
    
    setMatters(updatedMatters);
    setShowEditModal(false);
    setErrors({});
    
    toast.success("Matter updated successfully");
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatter({
      ...newMatter,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle input change for edit matter form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMatter({
      ...editMatter,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle matter deletion
  const handleDeleteMatter = (matterId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this matter? This action cannot be undone.")) {
      setMatters(matters.filter(matter => matter.id !== matterId));
      
      // Show success notification
      toast.success("Matter deleted successfully", {
        icon: <TrashIcon className="h-5 w-5 text-red-500" />
      });
    }
  };
  
  // Handle view matter details
  const handleViewMatter = (matter) => {
    setSelectedMatter(matter);
    toast.info(`Viewing ${matter.title}`, {
      icon: <EyeIcon className="h-5 w-5 text-blue-500" />
    });
  };
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', label: 'Active' },
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pending' },
      completed: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', label: 'Completed' },
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };
  
  // Define animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-primary" />
          <span>Matters</span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* View toggle */}
          <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-surface-700 shadow-sm'
                  : 'text-surface-700 dark:text-surface-300'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-surface-700 shadow-sm'
                  : 'text-surface-700 dark:text-surface-300'
              }`}
            >
              List
            </button>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">New Matter</span>
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
          <input
            type="search"
            placeholder="Search matters..."
            className="input pl-9 w-full"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select
              className="input appearance-none pr-9"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
          </div>
          
          <button className="btn btn-outline">
            <FilterIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">More Filters</span>
          </button>
        </div>
      </div>
      
      {/* No results message */}
      {filteredMatters.length === 0 && (
        <div className="text-center py-12 bg-surface-50 dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700">
          <AlertCircleIcon className="mx-auto h-10 w-10 text-surface-400" />
          <h3 className="mt-4 text-lg font-medium">No matters found</h3>
          <p className="mt-2 text-surface-500 dark:text-surface-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button 
            onClick={() => {
              setFilterValue('');
              setStatusFilter('all');
            }}
            className="mt-4 btn btn-outline"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Matter Cards View */}
      {viewMode === 'card' && filteredMatters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatters.map((matter, index) => (
            <motion.div
              key={matter.id}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={listItemVariants}
              className="card group hover:shadow-soft"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold truncate flex-1" title={matter.title}>
                    {matter.title}
                  </h3>
                  <StatusBadge status={matter.status} />
                </div>
                
                <div className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <UsersIcon className="h-3.5 w-3.5" />
                    <span>{matter.client}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon className="h-3.5 w-3.5" />
                    <span>{matter.practiceArea}</span>
                  </div>
                </div>
                
                <p className="text-sm text-surface-700 dark:text-surface-300 line-clamp-2 mb-4">
                  {matter.description}
                </p>
                
                <div className="flex justify-between items-center text-xs text-surface-500 dark:text-surface-400">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" />
                    <span>{matter.lastActivity}</span>
                  </div>
                  <div>Documents: {matter.totalDocuments}</div>
                </div>
              </div>
              
              <div className="p-3 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleViewMatter(matter)}
                    className="flex items-center gap-1 text-xs font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span>View</span>
                  </button>
                  
                  <button 
                    onClick={() => handleEditMatter(matter)}
                    className="flex items-center gap-1 text-xs font-medium text-surface-700 dark:text-surface-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  
                  <button 
                    onClick={() => handleDeleteMatter(matter.id)}
                    className="flex items-center gap-1 text-xs font-medium text-surface-700 dark:text-surface-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Matter List View */}
      {viewMode === 'list' && filteredMatters.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Matter</th>
                <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Client</th>
                <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Practice Area</th>
                <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Status</th>
                <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Last Activity</th>
                <th className="px-4 py-3 text-right font-medium text-surface-700 dark:text-surface-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatters.map((matter, index) => (
                <motion.tr
                  key={matter.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listItemVariants}
                  className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{matter.title}</div>
                    <div className="text-xs text-surface-500 dark:text-surface-400">
                      Opened: {matter.dateOpened}
                    </div>
                  </td>
                  <td className="px-4 py-3">{matter.client}</td>
                  <td className="px-4 py-3">{matter.practiceArea}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={matter.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
                    {matter.lastActivity}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewMatter(matter)}
                        className="p-1 rounded-md text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light hover:bg-surface-100 dark:hover:bg-surface-800"
                        aria-label="View matter"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleEditMatter(matter)}
                        className="p-1 rounded-md text-surface-600 dark:text-surface-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                        aria-label="Edit matter"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteMatter(matter.id)}
                        className="p-1 rounded-md text-surface-600 dark:text-surface-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                        aria-label="Delete matter"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Create Matter Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold">Create New Matter</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateMatter} className="p-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1.5">
                    Matter Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newMatter.title}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter matter title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="client" className="block text-sm font-medium mb-1.5">
                    Client*
                  </label>
                  <div className="relative">
                    <select
                      id="client"
                      name="client"
                      value={newMatter.client}
                      onChange={handleInputChange}
                      className={`input w-full appearance-none pr-9 ${errors.client ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select client</option>
                      {clients.map(client => (
                        <option key={client} value={client}>{client}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
                  </div>
                  {errors.client && (
                    <p className="mt-1 text-sm text-red-500">{errors.client}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="practiceArea" className="block text-sm font-medium mb-1.5">
                    Practice Area*
                  </label>
                  <div className="relative">
                    <select
                      id="practiceArea"
                      name="practiceArea"
                      value={newMatter.practiceArea}
                      onChange={handleInputChange}
                      className={`input w-full appearance-none pr-9 ${errors.practiceArea ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select practice area</option>
                      {practiceAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
                  </div>
                  {errors.practiceArea && (
                    <p className="mt-1 text-sm text-red-500">{errors.practiceArea}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1.5">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newMatter.description}
                    onChange={handleInputChange}
                    className="input w-full min-h-[100px]"
                    placeholder="Enter matter description"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="ml-1">Create Matter</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Edit Matter Modal */}
      {showEditModal && editMatter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold">Edit Matter</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateMatter} className="p-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium mb-1.5">
                    Matter Title*
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={editMatter.title}
                    onChange={handleEditInputChange}
                    className={`input w-full ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter matter title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="edit-client" className="block text-sm font-medium mb-1.5">
                    Client*
                  </label>
                  <div className="relative">
                    <select
                      id="edit-client"
                      name="client"
                      value={editMatter.client}
                      onChange={handleEditInputChange}
                      className={`input w-full appearance-none pr-9 ${errors.client ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select client</option>
                      {clients.map(client => (
                        <option key={client} value={client}>{client}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
                  </div>
                  {errors.client && (
                    <p className="mt-1 text-sm text-red-500">{errors.client}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="edit-practiceArea" className="block text-sm font-medium mb-1.5">
                    Practice Area*
                  </label>
                  <div className="relative">
                    <select
                      id="edit-practiceArea"
                      name="practiceArea"
                      value={editMatter.practiceArea}
                      onChange={handleEditInputChange}
                      className={`input w-full appearance-none pr-9 ${errors.practiceArea ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select practice area</option>
                      {practiceAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
                  </div>
                  {errors.practiceArea && (
                    <p className="mt-1 text-sm text-red-500">{errors.practiceArea}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium mb-1.5">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editMatter.description}
                    onChange={handleEditInputChange}
                    className="input w-full min-h-[100px]"
                    placeholder="Enter matter description"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="ml-1">Update Matter</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      
      {/* Matter view interaction */}
      {selectedMatter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl bg-white dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                <span>Matter Details</span>
              </h3>
              <button 
                onClick={() => setSelectedMatter(null)}
                className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left column */}
                <div className="w-full md:w-1/3">
                  <div className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">Summary</h4>
                      <StatusBadge status={selectedMatter.status} />
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-surface-500 dark:text-surface-400">Client</div>
                        <div className="font-medium">{selectedMatter.client}</div>
                      </div>
                      
                      <div>
                        <div className="text-surface-500 dark:text-surface-400">Practice Area</div>
                        <div className="font-medium">{selectedMatter.practiceArea}</div>
                      </div>
                      
                      <div>
                        <div className="text-surface-500 dark:text-surface-400">Date Opened</div>
                        <div className="font-medium">{selectedMatter.dateOpened}</div>
                      </div>
                      
                      {selectedMatter.dateClosed && (
                        <div>
                          <div className="text-surface-500 dark:text-surface-400">Date Closed</div>
                          <div className="font-medium">{selectedMatter.dateClosed}</div>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-surface-500 dark:text-surface-400">Associates</div>
                        <div className="font-medium">
                          {selectedMatter.associates.length > 0 
                            ? selectedMatter.associates.join(', ')
                            : 'None assigned'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column */}
                <div className="flex-1">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{selectedMatter.title}</h2>
                      <p className="text-surface-600 dark:text-surface-400">
                        {selectedMatter.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px] p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700">
                        <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 mb-1">
                          <ClipboardIcon className="h-4 w-4" />
                          <span>Documents</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedMatter.totalDocuments}</div>
                      </div>
                      
                      <div className="flex-1 min-w-[200px] p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700">
                        <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 mb-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>Last Activity</span>
                        </div>
                        <div className="text-xl font-semibold">{selectedMatter.lastActivity}</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleEditMatter(selectedMatter)}
                          className="btn btn-outline"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="ml-1">Edit</span>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedMatter(null);
                            handleDeleteMatter(selectedMatter.id);
                          }}
                          className="btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-300 dark:border-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="ml-1">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}