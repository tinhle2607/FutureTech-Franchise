import React from "react";

const franchises = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    location: "123 Street center",
    submissionDate: "2024/09/17",
    status: "Pending",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    location: "456 Avenue corner",
    submissionDate: "2024/09/16",
    status: "Approved",
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    location: "789 District zone",
    submissionDate: "2024/09/15",
    status: "Rejected",
  },
];

const FranchiseManagement = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Pending approval franchise</h5>
          <div className="table-responsive">
            <table className="table text-nowrap align-middle mb-0">
              <thead>
                <tr className="border-2 border-bottom border-primary border-0">
                  <th scope="col" className="ps-0">
                    No
                  </th>
                  <th scope="col">Full Name</th>
                  <th scope="col" className="text-center">
                    Location
                  </th>
                  <th scope="col" className="text-center">
                    Submission Date
                  </th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
              {franchises.map((franchise, index) => (
                  <tr key={franchise.id}>
                    <th scope="row" className="ps-0 fw-medium">
                      <span className="table-link1 text-truncate d-block">{index + 1}</span>
                    </th>
                    <td>
                      <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">
                        {franchise.fullName}
                      </a>
                    </td>
                    <td className="text-center fw-medium">{franchise.location}</td>
                    <td className="text-center fw-medium">{franchise.submissionDate}</td>
                    <td className="text-center fw-medium">{franchise.status}</td>
                    <td className="text-center fw-medium">
                      <button className="btn btn-sm btn-success me-2">Approve</button>
                      <button className="btn btn-sm btn-danger">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseManagement;
