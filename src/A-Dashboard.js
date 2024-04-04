import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign,  faTshirt, faCalendar, faBox } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
const Dashboard = () => {
  return (
    <div className="users-section">
          <h2>ADMIN DASHBOARD</h2>
          <div class="card-container">
            {/* Earnings (Monthly) Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card custom-card monthly-card">
                <div className="card-body">
                  <h5 className="card-title">Earnings (Monthly)</h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        $40,000
                        <FontAwesomeIcon icon={faCalendar} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Earnings (Annual) Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card custom-card annual-card">
                <div className="card-body">
                  <h5 className="card-title">Earnings (Annual)</h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        $215,000
                        <FontAwesomeIcon icon={faDollarSign} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Tasks Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card custom-card tasks-card">
                <div className="card-body">
                  <h5 className="card-title">Products</h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                         4   <FontAwesomeIcon icon={ faTshirt} className="fa-2x text-gray-300"  />
                         </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Pending Requests Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card custom-card requests-card">
                <div className="card-body">
                  <h5 className="card-title">ORDERS</h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        18
                        <FontAwesomeIcon icon={faBox} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Dashboard;
