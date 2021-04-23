import React from "react";
import { shallow } from "enzyme"

import HomePage from "../../Pages/HomePage/HomePage"
import SelectReport from "../../Pages/ReportsPage/SelectReport";

const setup = () => {
  return shallow(<HomePage />)
}

describe("HomePage", () => {
  let wrapper;
  beforeEach(() => {
   wrapper = setup()
  })

  it("<HomePage />, it should not render users table unless button clicked", () => {
    wrapper.find(<SelectReport />)
    expect(wrapper).toEqual({})
  })
  it("<HomePage />, change state to true on button click", () => {
    wrapper.find("button").simulate('click')
    expect(wrapper).toBeTruthy()
  })
})
