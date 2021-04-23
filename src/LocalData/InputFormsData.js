import rolesDB from "./Roles.json"
import inputFieldsDB from "./InputFields.json"
import selectFieldsDB from "./SelectFields.json"
import statusOfPurchase from "./StatusOfPurchase.json";
import activityPerMode from "./ActivityPerMode.json"
import adminActivity from "./AdminActivity.json"

export const fetchAllRoles = () => {
  return rolesDB.data;
}

export const fetchRolesByName = rolesId => {
  const data = rolesDB.data.filter(roles => roles.id === parseInt(rolesId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchStatusOfPurchase = () => {
  return statusOfPurchase.data;
}

export const fetchStatusOfPurchaseByName = statusId => {
  const data = statusOfPurchase.data.filter(status => status.id === parseInt(statusId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllinputFields = () => {
  return inputFieldsDB.inputFields;
}

export const fetchAllSelectFields = () => {
  return selectFieldsDB.selectFields;
}

export const fetchSelectFieldsToBeModified = () => {
  return selectFieldsDB.selectFields;
}

export const fetchActivityPerMode = () => {
  return activityPerMode.data;
}


export const fetchAdminActivity = () => {
  return adminActivity.data;
}

