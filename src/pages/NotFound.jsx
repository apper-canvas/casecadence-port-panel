import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  // Create icon components
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');

  return (
    <motion.div 
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
            <AlertTriangleIcon className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center gap-2 mx-auto"
        >
          <HomeIcon className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </motion.div>
  );
}