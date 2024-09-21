import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFranchiseRegistrationConsultActionAsync, UpdateFranchiseRegistrationConsultActionAsync } from '../../../Redux/ReducerAPI/ConsultationReducer';
import { Modal } from 'antd';

const ConsultationManagement = () => {
    const { franchiseConsult } = useSelector((state) => state.ConsultationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFranchiseRegistrationConsultActionAsync());
  }, []);

  const handleApproveFranchiseRegisById = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      onOk: () => {
        dispatch(UpdateFranchiseRegistrationConsultActionAsync(id));
        // console.log(id)
      },
    });
  };

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
                  <th scope="col">Customer Name</th>
                  <th scope="col" className="text-center">
                    Email
                  </th>
                  <th scope="col" className="text-center">
                    Phone Number
                  </th>
                  <th scope="col" className="text-center">
                    Address
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
                {franchiseConsult && franchiseConsult.length > 0 ? (
                  franchiseConsult.map((consult, index) => (
                    <tr key={consult.id}>
                      <th scope="row" className="ps-0 fw-medium">
                        <span className="table-link1 text-truncate d-block">{index + 1}</span>
                      </th>
                      <td>
                        <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">
                          {consult.cusomterName}
                        </a>
                      </td>
                      <td className="text-center fw-medium">{consult.email}</td>
                      <td className="text-center fw-medium">{consult.phoneNumber}</td>
                      <td className="text-center fw-medium">{consult.address}</td>
                      <td className="text-center fw-medium">{consult.status}</td>
                      <td className="text-center fw-medium">
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleApproveFranchiseRegisById(consult.id)}>Approve</button>
                        <button className="btn btn-sm btn-danger">Reject</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No franchise consultations available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationManagement