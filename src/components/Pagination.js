import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

function Pagination({ totalPages, page, className, pageChange }) {
  return totalPages > 1 ?
    (
      <div className={`pagination ${className}`}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={({ selected }) => pageChange(selected + 1)}
          pageRangeDisplayed={5}
          forcePage={page - 1}
          pageCount={totalPages || 1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className={"paginate_component"}
          pageClassName={"paginate_component_page"}
          activeClassName={"paginate_component_active"}
          previousClassName={"paginate_component_active"}
          nextClassName={"paginate_component_active"}
          disabledClassName={"paginate_component_disable"}
        />

      </div>
    ): null;
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number,
  className: PropTypes.string,
  pageChange: PropTypes.func,
};
Pagination.defaultProps = {
  page: 1,
  className: '',
  pageChange: () => {
  },
};
export default Pagination;





