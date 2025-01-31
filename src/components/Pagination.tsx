interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="px-4 py-2 bg-gray-300">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="px-4 py-2 bg-gray-300">Next</button>
      </div>
    );
  };
  
  export default Pagination;
  