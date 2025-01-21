// import { useState } from "react";
// import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import "./styles.css";
export default function PaginationComponent({page, handlePageChange}) {
//   const [page, setPage] = useState(1);
//   const handleChange = (event, value) => {
//     setPage(value);
//   };

  return (
    <div className="pagination-comp">
      {/* // <Stack spacing={2}> */}
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{
          "& .MuiPaginationItem-text": {
            color: "#fff !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "transparent !important",
          },
          "& .Mui-selected  ": {
            backgroundColor: "var(--blue)",
            borderColor: "var(--blue)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
      />
      {/* // </Stack> */}
    </div>
  );
}


// [0,99]
// page 1 -> [0,10)
// page 2 -> [10, 20)
// page 3 -> [20,30)
// ...
// page 100 -> [90, 100)

// page 1 -> coins.slice(0,10)
// var page = 1
// var initialIndex = (page - 1) * 10
// coins.slice(initialIndex, initialIndex+10)