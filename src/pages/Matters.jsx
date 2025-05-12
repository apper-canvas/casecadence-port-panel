import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

export default function Matters() {
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
  const ClockIcon = getIcon('Clock');
  const AlertCircleIcon = getIcon('AlertCircle');
  const CalendarIcon = getIcon('Calendar');
  const TagIcon = getIcon('Tag');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const SlidersIcon = getIcon('Sliders');
  const ArrowDownAZIcon = getIcon('ArrowDownAZ');
  const ArrowDownZAIcon = getIcon('ArrowDownZA');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // State
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [practiceAreaFilter, setPracticeAreaFilter] = useState('all');
  const [sortField, setSortField] = useState('dateOpened');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
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
      associates: ['Jane Wilson', 'Mark Thomas'],
      priority: 'High',
      dueDate: '2023-12-01'
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
      associates: ['Jane Wilson'],
      priority: 'Medium',
      dueDate: '2023-11-15'
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
      associates: ['Mark Thomas'],
      priority: 'Low',
      dueDate: '2023-09-30'
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
      associates: ['Jane Wilson', 'Alex Chen'],
      priority: 'High',
      dueDate: '2023-11-10'
    },
    {
      id: '5',
      title: 'Chang Immigration Petition',
      client: 'Wei Chang',
      status: 'pending',
      practiceArea: 'Immigration',
      dateOpened: '2023-09-22',
      description: 'Family-based immigration petition for permanent residency.',
      lastActivity: '3 days ago',
      totalDocuments: 14,
      associates: ['Alex Chen'],
      priority: 'Medium',
      dueDate: '2023-12-15'
    },
    {
      id: '6',
      title: 'Davidson Property Acquisition',
      client: 'Robert Davidson',
      status: 'active',
      practiceArea: 'Real Estate',
      dateOpened: '2023-10-12',
      description: 'Commercial property acquisition and lease agreements for office space.',
      lastActivity: 'Yesterday',
      totalDocuments: 19,
      associates: ['Mark Thomas', 'Sarah Johnson'],
      priority: 'High',
      dueDate: '2023-11-25'
    },
    {
      id: '7',
      title: 'Martinez Patent Application',
      client: 'Elena Martinez',
      status: 'active',
      practiceArea: 'Intellectual Property',
      dateOpened: '2023-09-05',
      description: 'Utility patent application for innovative software algorithm.',
      lastActivity: '1 week ago',
      totalDocuments: 22,
      associates: ['Michael Lee'],
      priority: 'Medium',
      dueDate: '2024-01-15'
    },
    {
      id: '8',
      title: 'Wilson Tax Assessment',
      client: 'James Wilson',
      status: 'completed',
      practiceArea: 'Tax',
      dateOpened: '2023-08-10',
      dateClosed: '2023-10-05',
      description: 'Corporate tax assessment and planning for fiscal year 2023.',
      lastActivity: '1 month ago',
      totalDocuments: 11,
      associates: ['Sarah Johnson'],
      priority: 'Low',
      dueDate: '2023-10-01'
    }
  ]);
  
  // Practice areas
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
  
  // Filter and sort matters
  const filteredMatters = matters.filter(matter => {
    const matchesSearch = 
      matter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matter.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matter.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || matter.status === statusFilter;
    const matchesPracticeArea = practiceAreaFilter === 'all' || matter.practiceArea === practiceAreaFilter;
    
    return matchesSearch && matchesStatus && matchesPracticeArea;
  }).sort((a, b) => {
    let comparison = 0;
    
    // Sort by field
    if (sortField === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === 'client') {
      comparison = a.client.localeCompare(b.client);
    } else if (sortField === 'dateOpened') {
      comparison = new Date(a.dateOpened) - new Date(b.dateOpened);
    }
    
    // Apply sort direction
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Paginate matters
  const totalPages = Math.ceil(filteredMatters.length / itemsPerPage);
  const paginatedMatters = filteredMatters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle selection
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Handle view matter
  const handleViewMatter = (matterId) => {
    toast.info(`Viewing matter details`, {
      icon: <EyeIcon className="h-5 w-5 text-primary" />
    });
  };
  
  // Handle edit matter
  const handleEditMatter = (matterId) => {
    toast.info(`Opening matter for editing`, {
      icon: <PencilIcon className="h-5 w-5 text-blue-500" />
    });
  };
  
  // Handle delete matter
  const handleDeleteMatter = (matterId) => {
    if (window.confirm('Are you sure you want to delete this matter?')) {
      setMatters(matters.filter(matter => matter.id !== matterId));
      setSelectedItems(selectedItems.filter(id => id !== matterId));
      
      toast.success(`Matter deleted successfully`, {
        icon: <TrashIcon className="h-5 w-5 text-red-500" />
      });
    }
  };
  
  // Batch actions
  const handleBatchAction = (action) => {
    if (selectedItems.length === 0) {
      toast.warning('Please select at least one matter');
      return;
    }
    
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedItems.length} matters?`)) {
        setMatters(matters.filter(matter => !selectedItems.includes(matter.id)));
        toast.success(`${selectedItems.length} matters deleted successfully`);
        setSelectedItems([]);
      }
    } else if (action === 'export') {
      toast.info(`Exporting ${selectedItems.length} matters`);
    }
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
  
  // Animation variants
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };
  
  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <BriefcaseIcon className="h-7 w-7 text-primary" />
                <span>Matters</span>
              </h1>
              <p className="text-surface-600 dark:text-surface-400 mt-1">
                Manage all your legal matters in one place
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => toast.info('Creating new matter')}
                className="btn btn-primary"
              >
                <PlusIcon className="h-4 w-4" />
                <span>New Matter</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Toolbar */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
              <input
                type="search"
                placeholder="Search matters..."
                className="input pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
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
              
              <div className="relative">
                <select
                  className="input appearance-none pr-9"
                  value={practiceAreaFilter}
                  onChange={(e) => setPracticeAreaFilter(e.target.value)}
                >
                  <option value="all">All Practice Areas</option>
                  {practiceAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
              </div>
              
              <button 
                className="btn btn-outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <FilterIcon className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">More Filters</span>
              </button>
            </div>
          </div>
          
          {/* Advanced filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Sort By</label>
                <div className="flex">
                  <div className="relative flex-1">
                    <select
                      className="input appearance-none pr-9 rounded-r-none"
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                    >
                      <option value="dateOpened">Date Opened</option>
                      <option value="title">Matter Title</option>
                      <option value="client">Client Name</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
                  </div>
                  <button
                    className="flex items-center justify-center w-10 border border-surface-300 dark:border-surface-700 border-l-0 bg-white dark:bg-surface-900 rounded-r-md"
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortDirection === 'asc' ? (
                      <ArrowDownAZIcon className="h-4 w-4 text-surface-500" />
                    ) : (
                      <ArrowDownZAIcon className="h-4 w-4 text-surface-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">View Mode</label>
                <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      viewMode === 'card'
                        ? 'bg-white dark:bg-surface-700 shadow-sm'
                        : 'text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-surface-700 shadow-sm'
                        : 'text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Batch Actions</label>
                <div className="flex gap-2">
                  <button
                    className="btn btn-outline flex-1"
                    disabled={selectedItems.length === 0}
                    onClick={() => handleBatchAction('export')}
                  >
                    Export
                  </button>
                  <button
                    className="btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-300 dark:border-red-700 flex-1"
                    disabled={selectedItems.length === 0}
                    onClick={() => handleBatchAction('delete')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Selected items count */}
          {selectedItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <div className="text-sm text-surface-700 dark:text-surface-300">
                <span className="font-medium">{selectedItems.length}</span> {selectedItems.length === 1 ? 'item' : 'items'} selected
              </div>
              <button
                className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light"
                onClick={() => setSelectedItems([])}
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
        
        {/* No results state */}
        {filteredMatters.length === 0 && (
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 p-12 text-center">
            <AlertCircleIcon className="h-12 w-12 mx-auto mb-4 text-surface-400" />
            <h3 className="text-lg font-medium mb-2">No matters found</h3>
            <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-6">
              We couldn't find any matters matching your current filters. Try adjusting your search or create a new matter.
            </p>
            <button className="btn btn-outline" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setPracticeAreaFilter('all');
            }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
        
        {/* Matter Cards */}
        {viewMode === 'card' && filteredMatters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMatters.map((matter, index) => (
              <motion.div
                key={matter.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                className="card group"
              >
                <div className="p-5">
                  <div className="flex items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold truncate" title={matter.title}>
                        {matter.title}
                      </h3>
                      <div className="text-sm text-surface-600 dark:text-surface-400">
                        {matter.client}
                      </div>
                    </div>
                    <StatusBadge status={matter.status} />
                  </div>
                  
                  <div className="text-sm text-surface-600 dark:text-surface-400 mb-2 flex items-center gap-1">
                    <BriefcaseIcon className="h-3.5 w-3.5" />
                    <span>{matter.practiceArea}</span>
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
                
                <div className="flex items-center border-t border-surface-200 dark:border-surface-700">
                  <div className="flex-none p-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary-light"
                      checked={selectedItems.includes(matter.id)}
                      onChange={() => toggleItemSelection(matter.id)}
                    />
                  </div>
                  <div className="flex-1 flex justify-end p-2 gap-3">
                    <button 
                      onClick={() => handleViewMatter(matter.id)}
                      className="p-1 rounded-md text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light hover:bg-surface-100 dark:hover:bg-surface-800"
                      aria-label="View matter"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEditMatter(matter.id)}
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Matter List */}
        {viewMode === 'list' && filteredMatters.length > 0 && (
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-700">
                    <th className="w-10 px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary-light"
                        checked={selectedItems.length > 0 && selectedItems.length === paginatedMatters.length}
                        onChange={() => {
                          if (selectedItems.length === paginatedMatters.length) {
                            setSelectedItems([]);
                          } else {
                            setSelectedItems(paginatedMatters.map(m => m.id));
                          }
                        }}
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Matter</th>
                    <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Client</th>
                    <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Practice Area</th>
                    <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300">Date Opened</th>
                    <th className="px-4 py-3 text-right font-medium text-surface-700 dark:text-surface-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMatters.map((matter, index) => (
                    <motion.tr
                      key={matter.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={listItemVariants}
                      className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/50"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary-light"
                          checked={selectedItems.includes(matter.id)}
                          onChange={() => toggleItemSelection(matter.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{matter.title}</div>
                        <div className="text-xs text-surface-500 dark:text-surface-400 line-clamp-1">
                          {matter.description}
                        </div>
                      </td>
                      <td className="px-4 py-3">{matter.client}</td>
                      <td className="px-4 py-3">{matter.practiceArea}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={matter.status} />
                      </td>
                      <td className="px-4 py-3 text-sm">{matter.dateOpened}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewMatter(matter.id)}
                            className="p-1 rounded-md text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light hover:bg-surface-100 dark:hover:bg-surface-800"
                            aria-label="View matter"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditMatter(matter.id)}
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
          </div>
        )}
        
        {/* Pagination */}
        {filteredMatters.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-surface-600 dark:text-surface-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMatters.length)} of {filteredMatters.length} results
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-surface-200 dark:border-surface-700 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Calculate page numbers to show
                let pageToShow;
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`h-8 min-w-[32px] px-2 rounded-md ${
                      currentPage === pageToShow
                        ? 'bg-primary text-white'
                        : 'border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`}
                  >
                    {pageToShow}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-surface-200 dark:border-surface-700 disabled:opacity-50"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
    </div>
  );
}