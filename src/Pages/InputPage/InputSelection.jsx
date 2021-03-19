import React, { Component } from "react";

import axiosLocal from "../../AxiosInput";
import { fetchAllSelectFields,
  fetchAllinputFields,
} from "../../LocalData/InputFormsData";

import FuelConsumptionInput from "./InputForms/FuelConsumptionInputForm";
import MachineRegistrationInput from "./InputForms/MachineRegistrationInputForm";
import MaintenanceAndRepairInputForm from "./InputForms/MaintenanceAndRepairInputForm";
import WorkingHoursInputForm from "./InputForms/WorkingHoursInputForm";
import PurchaseRequestsInput from "./InputForms/PurchaseRequestsInputForm";

import { getSelectFields } from "../../Firebase/FetchCollectionsFromFirestore";

import { getEmployeeRowLastId,
  getLastId, getParentLastId,
} from "../../Firebase/FetchLastIdRealtimeDB";

import { getLitersMissing,
  getTankResidual,workedHoursPerMachine,
} from "../../Firebase/FetchLastFuelEntryRealtimeDB";

import { getImage, getNamesOfImages,
} from "../../Firebase/FetchAndUpdateImagesFromStorage";

import { addZero, getDateAndTime } from "./DBObjectElements/GetDateTime";
import { fuelConsumptionInputObject,
  machineRegistrationInputObject,
  maintenanceAndRepairsInputObject,
  workingHoursInputObject,
  purcahseRequestsInputObject,
} from "./DBObjectElements/ObjectsToPostToFirebase";

import Modal from "../../ReusableElements/Modal/Modal";

import { initialState } from "./InitialState";
import { updateAuthUsers } from "../../Firebase/UpdateRowsInRealtimeDB";
import emailSentForNewChildCreated from "../RequestApprovals/EmailSentForNewChildCreated";

class InputSelection extends Component {
  constructor(props) {
    super(props);
    const lastId = getLastId(this.props);
    const lastParentId = getParentLastId(this.props);
    const employeeRowLastId = getEmployeeRowLastId(this.props);
    this.state = {
      submit: true,
      loading: false,
      submitButtonDisabled: "",
      lastParentId: lastParentId.then((res) => res),
      employeeRowLastId: employeeRowLastId.then((res) => res),
      lastId: lastId.then((res) => res),
      disableMultiSelectOption: false,
      stopComponentDidUpdate: false,
      date: new Date(),
      inputFields: fetchAllinputFields(),
      selectFields: fetchAllSelectFields(),
    };
  }

  componentDidMount() {
    getLastId(this.props).then((res, rej) => {
      this.setState({ lastId: res + parseInt(1), error: rej });
    });
    getParentLastId(this.props).then((res, rej) => {
      this.setState({ lastParentId: res, error: rej });
    });
    getEmployeeRowLastId(this.props).then((res, rej) => {
      this.setState({ employeeRowLastId: res + 1, error: rej });
    });

    getTankResidual(this.state.selectedLocationName).then((liters) => {
      this.setState({ tankResidual: parseFloat(liters) });
    });
    getLitersMissing(this.state.selectedLocationName).then((tankNum) => {
      this.setState({ lastTankNumber: parseFloat(tankNum) });
    });
    workedHoursPerMachine(this.state.selectedMachineName).then((hours) => {
      this.setState({ hoursSpentOnLastActivity: parseFloat(hours) });
    });
    getNamesOfImages(this.state.idOfSelectField).then((fullList) => {
      this.setState({ namesOfImages: fullList });
    });
  }

  stopComponentDidUpdate = () => {
    this.setState(({ prevState }) => ({ stopComponentDidUpdate: !prevState }));
  };

  componentDidUpdate(prevState) {
    if (prevState.stopComponentDidUpdate !== this.state.stopComponentDidUpdate) {
      getTankResidual(this.state.selectedLocationName).then((liters) => {
        this.setState({ tankResidual: parseFloat(liters) });
      });
      getLitersMissing(this.state.selectedLocationName).then((tankNum) => {
        this.setState({
          lastTankNumber: parseFloat(tankNum),
          stopComponentDidUpdate: prevState.stopComponentDidUpdate,
        });
      });
      workedHoursPerMachine(this.state.selectedMachineName).then((hours) => {
        this.setState({ hoursSpentOnLastActivity: parseFloat(hours) });
      });
      getNamesOfImages(this.state.idOfSelectField).then((fullList) => {
        this.setState({
          namesOfImages: fullList,
          stopComponentDidUpdate: prevState.stopComponentDidUpdate,
        });
      });
    }
  }

  updateId = () => {
    if (this.props.stateProps.selectedActivity !== 3) {
      this.setState({ lastId: parseInt(this.state.lastId) });
    }
    this.setState({
      lastParentId: parseInt(this.state.lastParentId) + parseInt(1),
    });
  };

  onFocusHandler = (idOfSelectField) => {
    getNamesOfImages(parseInt(idOfSelectField)).then((fullList) => {
      this.setState({ namesOfImages: fullList });
    });
  };

  selectFieldsHandler = (
    idOfOptionElement,
    idOfSelectField,
    statename,
    selectedid,
    selectedmachineimage
  ) => {
    this.setState({
      [selectedid]: idOfOptionElement,
      idOfSelectField: idOfSelectField,
    });

    if (idOfOptionElement !== 0) {
      getSelectFields(idOfSelectField).then((selectField) => {
        selectField.filter((id) => {
          if (id.id === idOfOptionElement) {
            this.setState({ [statename]: id.name });
            getImage(
              idOfSelectField,
              idOfOptionElement,
              this.state.namesOfImages,
              id.name
            ).then((res) => this.setState({ [selectedmachineimage]: res }));
          }
          return null;
        });
      });
    }
    if (
      this.props.stateProps.selectedActivity === 3 &&
      this.state.selectedProjectName
    ) {
      getEmployeeRowLastId(this.props).then((res, rej) => {
        this.setState({ employeeRowLastId: res + 1, error: rej });
      });
      getLastId(this.props).then((res, rej) => {
        this.setState({ lastId: res + 1, error: rej });
      });
    } else if (this.props.stateProps.selectedActivity === 4) {
      getLastId(this.props).then((res, rej) => {
        this.setState({ lastId: res + 1, error: rej });
      });
    }
  };

  multiSelectHandler = (value) => {
    this.setState({ selectedMSJobDescriptionId: value });
  };

  inputFieldsHandler = (value, id, statename) => {
    const oneDecimalOnly = value
      .toString()
      .split(".")
      .map((el, i) => (i ? el.split("").slice(0, 1).join("") : el))
      .join(".");

    this.setState({
      [statename]: oneDecimalOnly,
    });
  };

  dateHandler = (value) => {
    const startingDay = value !== null ? addZero(value.getDate()) : null;
    const startingMonth = value !== null ? addZero(value.getMonth() + 1) : null;
    const startingYear = value !== null ? value.getFullYear() : null;
    const final = startingDay + "-" + startingMonth + "-" + startingYear;
    this.setState({ date: final });
  };

  workHoursTableHandler = (workingHours) => {
    let employeesNames = [];
    // put names of employees into an array
    Object.keys(workingHours).forEach(function (key) {
      employeesNames.push(workingHours[key].name);
    });
    this.setState({
      manHours: workingHours,
      nameOfEmployee: employeesNames,
    });
  };

  purchaseRequestTableHandler = (purchaseRequestObject, rowId) => {
    this.setState({ purchase: purchaseRequestObject });
  };

  disableMultiSelectOptionHandler = () => {
    this.setState({ disableMultiSelectOption: true });
  };

  restartFormHandler = () => {
    this.setState((prevState) => ({
      ...prevState,
      selectedTypeOfHoursId: undefined,
      selectedLocationId: undefined,
      selectedProjectId: undefined,
      selectedMSJobDescriptionId: undefined,
      namesOfEmployees: undefined,
      manHours: undefined,
      disableMultiSelectOption: false,
    }));
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      ...prevState,
      submit: false,
      loading: true,
    }));

    const arrayOfInputObjectsToPostToFirebase = [
      fuelConsumptionInputObject(this.state),
      machineRegistrationInputObject(this.state),
      maintenanceAndRepairsInputObject(this.state),
      workingHoursInputObject(this.state),
      purcahseRequestsInputObject(
        this.state,
        this.props.stateProps.currentUser.email
      ),
    ];
    const checkForActivity =
      arrayOfInputObjectsToPostToFirebase[
        this.props.stateProps.selectedActivity
      ];

    const queryParams =
      "?auth=" +
      this.props.stateProps.tokenId +
      "&auth.token.email=" +
      this.props.stateProps.email;

    const arrayOfURLPostSources = [
      "/fuelConsumptionInput.json" + queryParams,
      "/machineRegistrationInput.json" + queryParams,
      "/maintenanceAndRepairsInput.json" + queryParams,
      "/workingHoursInput.json" + queryParams,
      "/purchaseRequests.json" + queryParams,
    ];

    const URLPostSource =
      arrayOfURLPostSources[this.props.stateProps.selectedActivity];

    if (!isNaN(this.state.lastId)) {
      axiosLocal
        .post(URLPostSource, checkForActivity)
        .then((response) => this.setState({ ...initialState }))
        .catch((error) => this.setState({ ...initialState, error: true }));
    } else {
      throw new Error(
        "last enrty ID couldn't be retrieved from the server, please refresh the page"
      );
    }
    const URLSource = URLPostSource.split(".")[0];

    updateAuthUsers({
        [URLSource + " " + this.state.lastId]:
          "id: " + this.state.lastId + ", " + getDateAndTime()},
      this.props.stateProps);

    if (this.props.stateProps.selectedActivity === 4 &&
      this.props.stateProps.inputForms) {
      emailSentForNewChildCreated(checkForActivity);
    }
  };

  render() {
    // const moduleInProgress = <Modal show={this.props.modal}
    // hide={this.props.modal}>Module Still In Progress</Modal>
    const errorModal = (
      <Modal show={this.state.error} hide={this.props.modal}>
        Network error while posting data to Database, your entry is not
        recorded.
      </Modal>
    );

    const arrayOfProps = {
      stopComponentDidUpdate: this.stopComponentDidUpdate,
      dateHandler: this.dateHandler,
      updateId: this.updateId,
      onClick: this.props.onClick,
      stateProps: this.props.stateProps,
      localState: this.state,
      selectFieldsHandler: this.selectFieldsHandler,
      inputFieldsHandler: this.inputFieldsHandler,
      formHandler: this.formSubmitHandler,
      onFocusHandler: this.onFocusHandler,
    };

    return (
      <div>
        {errorModal}
        {this.props.stateProps.selectedActivity === 0 ? (
          <FuelConsumptionInput {...arrayOfProps} />
        ) : null}

        {this.props.stateProps.selectedActivity === 1 ? (
          <MachineRegistrationInput {...arrayOfProps} />
        ) : null}

        {this.props.stateProps.selectedActivity === 2 ? (
          <MaintenanceAndRepairInputForm {...arrayOfProps} />
        ) : null}

        {this.props.stateProps.selectedActivity === 3 ? (
          <WorkingHoursInputForm
            {...arrayOfProps}
            disableMultiSelectOptionHandler={
              this.disableMultiSelectOptionHandler
            }
            restartFormHandler={this.restartFormHandler}
            multiSelectHandler={this.multiSelectHandler}
            tableRowsHandler={this.workHoursTableHandler}
          />
        ) : null}

        {this.props.stateProps.selectedActivity === 4 ? (
          <PurchaseRequestsInput
            {...arrayOfProps}
            purchaseRequestTableHandler={this.purchaseRequestTableHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default InputSelection;
