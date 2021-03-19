import React, { useState } from "react";

import "./HomePage.scss";
import SelectReport from "../ReportsPage/SelectReport";
import { RenderForAdmin } from "../../RoleBasedAccessControl/RoleBasedAccessControl";

const HomePage = (props) => {
  const [usersTable, updateUsersTable] = useState(false);

  return (
    <div>
      <div className="home-page">
        <RenderForAdmin stateProps={props.stateProps}>
          <h2 style={{ color: "black", marginTop: "-20px" }}>Hello!</h2>
          <div>
            <h4 style={{ color: "black" }}>
              To see authenticated users and their activities please press the
              button below.
            </h4>
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginBottom: "15px" }}
            onClick={() => updateUsersTable(true)}
          >
            Check Authenticated Users
          </button>

          {usersTable ? (
            <SelectReport
              modal={props.modal}
              stateProps={props.stateProps}
              onClick={props.backButton}
            />
          ) : null}
        </RenderForAdmin>
        {/* - set daily orders for employees */}
      </div>
    </div>
  );
};

export default HomePage;
