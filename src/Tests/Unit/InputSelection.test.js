import React from "react";
import { shallow } from "enzyme"


import InputSelection from "../../Pages/InputPage/InputSelection";
import { getSelectFields } from "../../Firebase/FetchCollectionsFromFirestore";

const props = {
  stateProps: {
   selectedActivity: undefined
 }
}

const setup = () => {
  return shallow(<InputSelection {...props}/>)
}


describe("InputSelection", () => {
  let wrapper;
  beforeEach(() => {
   wrapper = setup()
  })

  it("<InputSelection />, renders without error", () => {
    expect(wrapper.length).toBe(1)
  })
})

describe(`Mocking fetch`, () => {

  it(`get selection fields' values from collections`, () => {
    expect.assertions(1)
    getSelectFields(0).then(resolve => {
      return new Promise.resolve(
        expect(resolve.count).toEqual(undefined)
      )
    })
  })
})